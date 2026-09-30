#!/usr/bin/env bash
# Post-merge production deploy watcher for fold_db_website (thelastdb.com), keyed to GitHub main.
#
# Polls github.com/EdgeVector/fold_db_website. When main has a new commit and the
# `ci-required` check run on that exact commit is `success`, it checks out the
# commit in a dedicated deploy checkout and runs .lastgit/deploy-prod.sh (vercel prod deploy) from it.
# A failed gate is logged once and never retried for that commit. A pending
# gate is polled again. Replaces the LastGit `lastgit ci watch` loop (moved to
# GitHub 2026-09-30).
#
# The repo is public: git fetch and the check-run read need no credential.
# The Vercel token is read by deploy-prod.sh from LastSecrets. No token is stored here.
#
# Env (all optional):
#   FOLD_DB_WEBSITE_DEPLOY_REMOTE   git remote URL (default https://github.com/EdgeVector/fold_db_website.git)
#   FOLD_DB_WEBSITE_DEPLOY_SLUG     GitHub owner/name for the check-run read (default EdgeVector/fold_db_website)
#   FOLD_DB_WEBSITE_DEPLOY_STATE    state dir (default ~/.local/state/edgevector/fold-db-website-deploy)
#   FOLD_DB_WEBSITE_DEPLOY_ONCE=1   run one poll and exit
#   FOLD_DB_WEBSITE_DEPLOY_DRY_RUN=1  decide and log, but do not run deploy-prod.sh
#   FOLD_DB_WEBSITE_DEPLOY_POLL_S   poll seconds (default 120; unauthenticated API limit is 60/h)
set -euo pipefail

REPO="${1:-fold_db_website}"
case "$REPO" in
  -*|"")
    echo "deploy-run: invalid repo arg '$REPO' (expected a bare repo name, got a flag or empty string)" >&2
    exit 2
    ;;
esac

export PATH="${PATH}:${HOME}/.local/bin:${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
REMOTE="${FOLD_DB_WEBSITE_DEPLOY_REMOTE:-https://github.com/EdgeVector/$REPO.git}"
SLUG="${FOLD_DB_WEBSITE_DEPLOY_SLUG:-EdgeVector/$REPO}"
STATE="${FOLD_DB_WEBSITE_DEPLOY_STATE:-$HOME/.local/state/edgevector/fold-db-website-deploy}"
CHECKOUT="$STATE/checkout"
CURSOR="$STATE/deployed.oid"
FAILED="$STATE/failed.oid"
POLL_S="${FOLD_DB_WEBSITE_DEPLOY_POLL_S:-120}"

log() { printf '%s deploy-run: %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }

# Print the conclusion of the ci-required check run on $1: success, failure, pending, or none.
gate_state() {
  local oid="$1" body
  body="$(curl -fsS --max-time 20 -H 'Accept: application/vnd.github+json' \
    "https://api.github.com/repos/$SLUG/commits/$oid/check-runs?per_page=100")" || { echo error; return 0; }
  printf '%s' "$body" | jq -r '[.check_runs[] | select(.name == "ci-required")] | if length == 0 then "none" else (map(if .status != "completed" then "pending" else .conclusion end) | if any(. == "pending") then "pending" elif all(. == "success") then "success" else "failure" end) end' || echo error
}

poll_once() {
  mkdir -p "$STATE"
  if [ ! -d "$CHECKOUT/.git" ]; then
    git clone -q "$REMOTE" "$CHECKOUT" || return 1
  fi
  git -C "$CHECKOUT" fetch -q --no-tags origin '+refs/heads/main:refs/remotes/origin/main' || return 1
  local oid deployed="" failed=""
  oid="$(git -C "$CHECKOUT" rev-parse refs/remotes/origin/main)"
  [ -f "$CURSOR" ] && deployed="$(cat "$CURSOR")"
  [ -f "$FAILED" ] && failed="$(cat "$FAILED")"
  if [ "$oid" = "$deployed" ]; then return 0; fi
  if [ "$oid" = "$failed" ]; then return 0; fi

  local state
  state="$(gate_state "$oid")"
  case "$state" in
    success) ;;
    failure)
      log "ci-required FAILED on $oid; not deploying"
      printf '%s\n' "$oid" > "$FAILED"
      return 0 ;;
    *)
      log "ci-required is '$state' on $oid; waiting"
      return 0 ;;
  esac

  git -C "$CHECKOUT" checkout -q --detach "$oid"
  git -C "$CHECKOUT" clean -ffdxq
  if [ "${FOLD_DB_WEBSITE_DEPLOY_DRY_RUN:-0}" = "1" ]; then
    log "DRY RUN: would deploy $oid (ci-required success)"
    return 0
  fi
  log "deploying $oid (ci-required success)"
  if LASTGIT_CI_OID="$oid" bash "$CHECKOUT/.lastgit/deploy-prod.sh"; then
    printf '%s\n' "$oid" > "$CURSOR"
    log "deployed $oid"
  else
    log "deploy-prod.sh FAILED for $oid; will retry next poll"
  fi
}

main() {
  log "repo=$REPO remote=$SLUG state=$STATE"
  if [ "${FOLD_DB_WEBSITE_DEPLOY_ONCE:-0}" = "1" ]; then
    poll_once
    exit 0
  fi
  local self_sum
  self_sum="$(cksum < "$0")"
  while true; do
    poll_once || log "poll failed (network or auth); retrying"
    sleep "$POLL_S"
    # This script lives in a checkout that the poll advances. Re-exec on change.
    if [ "$(cksum < "$0")" != "$self_sum" ]; then
      log "script changed on disk; re-exec"
      exec "$0" "$@"
    fi
  done
}
main "$@"
