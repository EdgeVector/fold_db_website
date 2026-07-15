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
# Optional env:
#   VERCEL_SCOPE   (default shiba4lifes-projects)
#   VERCEL_PROJECT (default fold_db — the project that owns thelastdb.com;
#                  NOT fold_db_website, which is a separate empty alias project)
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

command -v npm >/dev/null || { echo "FAIL: npm missing" >&2; exit 1; }
command -v vercel >/dev/null || { echo "FAIL: vercel CLI missing (npm i -g vercel)" >&2; exit 1; }
command -v python3 >/dev/null || { echo "FAIL: python3 missing (used to write auth.json)" >&2; exit 1; }

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

echo "== vercel deploy --prod (scope=$SCOPE project=$PROJECT) =="
# Link + deploy using the private global-config (token not on argv / not in env).
vercel link --yes --scope="$SCOPE" --project="$PROJECT" --global-config="$CFG" >/dev/null
vercel deploy --prod --yes --scope="$SCOPE" --global-config="$CFG"

echo "lastgit fold_db_website deploy-prod PASSED"
