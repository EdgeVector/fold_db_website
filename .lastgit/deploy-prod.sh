#!/usr/bin/env bash
# LastGit post-merge production deploy for fold_db_website (context: deploy-prod).
# Watches refs/heads/main only via deploy-run.sh — never runs on feature branches.
#
# Auth (first match wins):
#   1. $VERCEL_TOKEN
#   2. lastsecrets get lastgit-vercel-token
#      printf '%s' "$TOKEN" | lastsecrets put lastgit-vercel-token \
#        --label "Vercel deploy token" --provider vercel \
#        --purpose lastgit-fold-db-website-deploy-prod --env prod --value-stdin
#   3. (optional) macOS keychain service lastgit-vercel-token — avoided; LastSecrets preferred
#
# Optional env: VERCEL_SCOPE (default shiba4lifes-projects), VERCEL_PROJECT (fold_db_website)
# LASTGIT_DEPLOY_SKIP_VERCEL=1 — build only
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
PROJECT="${VERCEL_PROJECT:-fold_db_website}"

command -v npm >/dev/null || { echo "FAIL: npm missing" >&2; exit 1; }
command -v vercel >/dev/null || { echo "FAIL: vercel CLI missing (npm i -g vercel)" >&2; exit 1; }

echo "== npm ci =="
npm ci

echo "== npm run build =="
npm run build

if [ "${LASTGIT_DEPLOY_SKIP_VERCEL:-}" = "1" ]; then
  echo "LASTGIT_DEPLOY_SKIP_VERCEL=1 — build only, no vercel deploy"
  exit 0
fi

# Export for Vercel CLI (never put token on argv — shows in ps).
export VERCEL_TOKEN="$TOKEN"
unset TOKEN

echo "== vercel deploy --prod (scope=$SCOPE project=$PROJECT) =="
# Link + deploy; CLI reads VERCEL_TOKEN from the environment.
vercel link --yes --scope="$SCOPE" --project="$PROJECT" >/dev/null
vercel deploy --prod --yes --scope="$SCOPE"

echo "lastgit fold_db_website deploy-prod PASSED"
