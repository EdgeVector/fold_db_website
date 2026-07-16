#!/usr/bin/env bash
# LastGit post-merge production deploy for fold_db_website (context: deploy-prod).
# Watches refs/heads/main only via deploy-run.sh — never runs on feature branches.
#
# Auth (first match wins for the token value):
#   1. $VERCEL_TOKEN
#   2. lastsecrets get lastgit-vercel-token
#      printf '%s' "$TOKEN" | lastsecrets put lastgit-vercel-token \
#        --label "Vercel deploy token" --provider vercel \
#        --purpose lastgit-fold-db-website-deploy-prod --env prod --value-stdin
#
# Token is NEVER placed on process argv (shows in `ps`). We write a short-lived
# vercel global-config auth.json (mode 0600) instead. Vercel CLI 50.x only
# honors VERCEL_TOKEN *after* the credentials gate, so env-only auth fails
# when auth.json is empty — file auth is the reliable path.
#
# Browser Sentry env is intentionally resolved before the build and deployed via
# Vercel's prebuilt output path. A plain `vercel deploy` rebuilds in Vercel's
# cloud and can drop LastSecrets-sourced VITE_* values that only exist in this
# local deploy process.
#
# Optional env:
#   VERCEL_SCOPE   (default shiba4lifes-projects)
#   VERCEL_PROJECT (default fold_db — the project that owns thelastdb.com;
#                  NOT fold_db_website, which is a separate empty alias project)
#   VERCEL_DEPLOY_GIT_AUTHOR_EMAIL / VERCEL_DEPLOY_GIT_AUTHOR_NAME
#     Override for the scratch attribution commit (defaults to Tom's GitHub
#     noreply, which is a Vercel team member). Required because Vercel blocks
#     deploys whose HEAD author is lastgit-merge@lastdb.local (TEAM_ACCESS_REQUIRED).
#   VITE_SENTRY_DSN / VITE_SENTRY_ENVIRONMENT / VITE_SENTRY_RELEASE
#     Browser error reporting env. If VITE_SENTRY_DSN is unset, this script
#     reads lastsecrets://obs-sentry-dsn-javascript-react as the current web
#     Sentry project DSN.
#   LASTGIT_DEPLOY_SKIP_VERCEL=1 — build only
#
# Deploys the checked-out LastGit CI tree via vercel CLI (not GitHub auto-deploy).
set -euo pipefail
cd "$(dirname "$0")/.."

OID="${LASTGIT_CI_OID:-$(git rev-parse HEAD 2>/dev/null || echo unknown)}"
echo "== [fold_db_website deploy-prod] oid=$OID =="

if [ "${DEPLOY_FREEZE:-}" = "true" ]; then
  echo "DEPLOY_FREEZE=true — skip deploy"
  exit 0
fi

export PATH="${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:${PATH}"

lastsecrets_get() {
  local slug="$1"
  local bin=""
  if command -v lastsecrets >/dev/null 2>&1; then
    bin=lastsecrets
  elif [ -x "${HOME}/.bun/bin/lastsecrets" ]; then
    bin="${HOME}/.bun/bin/lastsecrets"
  else
    return 1
  fi
  "$bin" get "$slug" 2>/dev/null || return 1
}

TOKEN="${VERCEL_TOKEN:-}"
if [ -z "$TOKEN" ]; then
  TOKEN="$(lastsecrets_get lastgit-vercel-token || true)"
fi
if [ -z "$TOKEN" ]; then
  echo "FAIL: no Vercel token. Put it in LastSecrets (no keychain):" >&2
  echo "  export PATH=\"\$HOME/.bun/bin:\$PATH\"" >&2
  echo "  printf '%s' \"\$(pbpaste)\" | lastsecrets put lastgit-vercel-token \\" >&2
  echo "    --label \"Vercel deploy token\" --provider vercel \\" >&2
  echo "    --purpose lastgit-fold-db-website-deploy-prod --env prod --value-stdin" >&2
  exit 1
fi

SCOPE="${VERCEL_SCOPE:-shiba4lifes-projects}"
# Live domain thelastdb.com is attached to project "fold_db" (Vite site).
# "fold_db_website" is a separate Vercel project without that domain.
PROJECT="${VERCEL_PROJECT:-fold_db}"
# Vercel team seat check uses HEAD commit author email.
DEPLOY_GIT_AUTHOR_EMAIL="${VERCEL_DEPLOY_GIT_AUTHOR_EMAIL:-4220945+shiba4life@users.noreply.github.com}"
DEPLOY_GIT_AUTHOR_NAME="${VERCEL_DEPLOY_GIT_AUTHOR_NAME:-Tom Tang}"

command -v npm >/dev/null || { echo "FAIL: npm missing" >&2; exit 1; }
command -v vercel >/dev/null || { echo "FAIL: vercel CLI missing (npm i -g vercel)" >&2; exit 1; }
command -v python3 >/dev/null || { echo "FAIL: python3 missing (used to write auth.json)" >&2; exit 1; }
export npm_config_cache="${npm_config_cache:-${TMPDIR:-/tmp}/fold-db-website-npm-cache}"

if [ -z "${VITE_SENTRY_DSN:-}" ]; then
  VITE_SENTRY_DSN="$(lastsecrets_get obs-sentry-dsn-javascript-react || true)"
  export VITE_SENTRY_DSN
fi
if [ -n "${VITE_SENTRY_DSN:-}" ]; then
  export VITE_SENTRY_ENVIRONMENT="${VITE_SENTRY_ENVIRONMENT:-production}"
  export VITE_SENTRY_RELEASE="${VITE_SENTRY_RELEASE:-$OID}"
else
  echo "WARN: no VITE_SENTRY_DSN; building without browser Sentry" >&2
fi

echo "== npm ci =="
npm ci

echo "== npm run build =="
npm run build

if [ "${LASTGIT_DEPLOY_SKIP_VERCEL:-}" = "1" ]; then
  echo "LASTGIT_DEPLOY_SKIP_VERCEL=1 — build only, no vercel deploy"
  exit 0
fi

# Ephemeral vercel global config: token in auth.json (0600), never on argv.
CFG="$(mktemp -d "${TMPDIR:-/tmp}/vercel-deploy-cfg.XXXXXX")"
cleanup() { rm -rf "$CFG"; }
trap cleanup EXIT

python3 - "$CFG" "$TOKEN" <<'PY'
import json, pathlib, stat, sys
cfg, token = pathlib.Path(sys.argv[1]), sys.argv[2]
cfg.mkdir(parents=True, exist_ok=True)
auth = cfg / "auth.json"
auth.write_text(json.dumps({"token": token}) + "\n")
auth.chmod(stat.S_IRUSR | stat.S_IWUSR)
PY
# Drop token from this shell after writing the file.
unset TOKEN
unset VERCEL_TOKEN

# Vercel blocks production deploys when HEAD author is not a team member
# (e.g. lastgit-merge@lastdb.local on merge commits). Scratch trees only:
# empty attribution commit so CLI meta uses a known team email.
HEAD_EMAIL="$(git log -1 --format='%ae' 2>/dev/null || true)"
case "$HEAD_EMAIL" in
  *@users.noreply.github.com|tomtang2@gmail.com|"$DEPLOY_GIT_AUTHOR_EMAIL")
    echo "== git author ok ($HEAD_EMAIL) — no attribution commit =="
    ;;
  *)
    echo "== git author '$HEAD_EMAIL' not a Vercel team email — empty attribution commit =="
    git -c user.email="$DEPLOY_GIT_AUTHOR_EMAIL" -c user.name="$DEPLOY_GIT_AUTHOR_NAME" \
      commit --allow-empty -m "deploy-prod: Vercel team attribution (oid $OID)" >/dev/null
    ;;
esac

echo "== vercel build --prod (scope=$SCOPE project=$PROJECT) =="
# Link + deploy using the private global-config (token not on argv / not in env).
vercel link --yes --scope="$SCOPE" --project="$PROJECT" --global-config="$CFG" >/dev/null
vercel build --prod --yes --scope="$SCOPE" --global-config="$CFG"

echo "== vercel deploy --prebuilt --prod (scope=$SCOPE project=$PROJECT) =="
extract_vercel_deployment_ref() {
  grep -Eo 'https://[^[:space:]]+\.vercel\.app' "$1" | tail -n 1
}

is_transient_vercel_failure() {
  grep -Eqi 'read ETIMEDOUT|ETIMEDOUT|ECONNRESET|EAI_AGAIN|ENOTFOUND|socket hang up|network timeout|fetch failed' "$1"
}

VERCEL_DEPLOYMENT_REF=""
run_vercel_deploy_prebuilt() {
  local attempts="${VERCEL_DEPLOY_ATTEMPTS:-6}"
  local retry_delay_secs="${VERCEL_DEPLOY_RETRY_DELAY_SECS:-10}"
  local attempt=1
  local rc=0
  local out=""

  while [ "$attempt" -le "$attempts" ]; do
    if [ "$attempt" -gt 1 ]; then
      echo "== retry vercel deploy --prebuilt attempt $attempt/$attempts =="
    fi

    out="$(mktemp "${TMPDIR:-/tmp}/vercel-deploy-output.XXXXXX")"
    set +e
    vercel deploy --prebuilt --prod --yes --no-wait --skip-domain --archive=tgz \
      --meta "lastgitOid=$OID" \
      --scope="$SCOPE" --global-config="$CFG" 2>&1 | tee "$out"
    rc="${PIPESTATUS[0]}"
    set -e

    if [ "$rc" -eq 0 ]; then
      VERCEL_DEPLOYMENT_REF="$(extract_vercel_deployment_ref "$out")"
      if [ -z "$VERCEL_DEPLOYMENT_REF" ]; then
        echo "FAIL: Vercel deploy succeeded but no deployment URL was found in output" >&2
        rm -f "$out"
        return 1
      fi
      rm -f "$out"
      return 0
    fi

    if is_transient_vercel_failure "$out" && [ "$attempt" -lt "$attempts" ]; then
      echo "WARN: transient Vercel deploy network failure; retrying ($attempt/$attempts)" >&2
      rm -f "$out"
      sleep "$retry_delay_secs"
      attempt=$((attempt + 1))
      continue
    fi

    rm -f "$out"
    return "$rc"
  done
}
run_vercel_deploy_prebuilt

echo "== vercel promote $VERCEL_DEPLOYMENT_REF (scope=$SCOPE project=$PROJECT) =="
run_vercel_promote() {
  local attempts="${VERCEL_PROMOTE_ATTEMPTS:-3}"
  local retry_delay_secs="${VERCEL_PROMOTE_RETRY_DELAY_SECS:-10}"
  local promote_timeout="${VERCEL_PROMOTE_TIMEOUT:-5m}"
  local attempt=1
  local rc=0
  local out=""

  while [ "$attempt" -le "$attempts" ]; do
    if [ "$attempt" -gt 1 ]; then
      echo "== retry vercel promote attempt $attempt/$attempts =="
    fi

    out="$(mktemp "${TMPDIR:-/tmp}/vercel-promote-output.XXXXXX")"
    set +e
    vercel promote "$VERCEL_DEPLOYMENT_REF" --yes --timeout="$promote_timeout" \
      --scope="$SCOPE" --global-config="$CFG" 2>&1 | tee "$out"
    rc="${PIPESTATUS[0]}"
    set -e

    if [ "$rc" -eq 0 ]; then
      rm -f "$out"
      return 0
    fi

    if is_transient_vercel_failure "$out" && [ "$attempt" -lt "$attempts" ]; then
      echo "WARN: transient Vercel promote network failure; retrying ($attempt/$attempts)" >&2
      rm -f "$out"
      sleep "$retry_delay_secs"
      attempt=$((attempt + 1))
      continue
    fi

    rm -f "$out"
    return "$rc"
  done
}
run_vercel_promote

echo "lastgit fold_db_website deploy-prod PASSED"
