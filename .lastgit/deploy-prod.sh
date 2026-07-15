#!/usr/bin/env bash
# LastGit post-merge production deploy for fold_db_website (context: deploy-prod).
# Watches refs/heads/main only via deploy-run.sh — never runs on feature branches.
#
# Auth (first match wins):
#   1. $VERCEL_TOKEN
#   2. macOS keychain service `lastgit-vercel-token`
#      security add-generic-password -s lastgit-vercel-token -a "$USER" -w '<token>'
#
# Optional:
#   VERCEL_SCOPE / keychain `lastgit-vercel-scope`  (default: shiba4lifes-projects)
#   VERCEL_PROJECT / keychain `lastgit-vercel-project` (default: fold_db_website)
#   LASTGIT_DEPLOY_SKIP_VERCEL=1  — build only (for dry runs)
#
# Deploys the **checked-out tree** from the LastGit CI scratch clone (not a
# GitHub rebuild). Mirror to GitHub can still run for public clone; this is the
# path that publishes thelastdb.com when the watcher is installed.
set -euo pipefail
cd "$(dirname "$0")/.."

OID="${LASTGIT_CI_OID:-$(git rev-parse HEAD 2>/dev/null || echo unknown)}"
echo "== [fold_db_website deploy-prod] oid=$OID =="

if [ "${DEPLOY_FREEZE:-}" = "true" ]; then
  echo "DEPLOY_FREEZE=true — skip deploy"
  exit 0
fi

keychain_get() {
  local service="$1"
  security find-generic-password -s "$service" -w 2>/dev/null || true
}

TOKEN="${VERCEL_TOKEN:-}"
if [ -z "$TOKEN" ]; then
  TOKEN="$(keychain_get lastgit-vercel-token)"
fi
if [ -z "$TOKEN" ]; then
  echo "FAIL: no Vercel token. Set VERCEL_TOKEN or:" >&2
  echo "  security add-generic-password -U -s lastgit-vercel-token -a \"\$USER\" -w '<vercel-token>'" >&2
  echo "Create a token at https://vercel.com/account/tokens (scope: deploy this project)." >&2
  exit 1
fi

SCOPE="${VERCEL_SCOPE:-$(keychain_get lastgit-vercel-scope)}"
SCOPE="${SCOPE:-shiba4lifes-projects}"
PROJECT="${VERCEL_PROJECT:-$(keychain_get lastgit-vercel-project)}"
PROJECT="${PROJECT:-fold_db_website}"

export PATH="${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:${PATH}"
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

echo "== vercel deploy --prod (scope=$SCOPE project=$PROJECT) =="
# Link non-interactively then deploy the current directory as production.
# --yes skips confirmations; --token is the only supported CI auth.
vercel link --yes --token="$TOKEN" --scope="$SCOPE" --project="$PROJECT" >/dev/null
vercel deploy --prod --yes --token="$TOKEN" --scope="$SCOPE"

echo "lastgit fold_db_website deploy-prod PASSED"
