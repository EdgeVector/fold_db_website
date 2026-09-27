#!/usr/bin/env bash
# Supervise the LastGit post-merge deploy-prod watcher for fold_db_website.
#
# LastGit owns the complete deploy cycle: it watches refs/heads/main, leases
# each deploy-prod run, clones the exact commit, runs .lastgit/deploy-prod.sh,
# and stores the deploy-prod status in LastDB. This wrapper only keeps the
# watcher alive under launchd.
set -euo pipefail

REPO="${1:-fold_db_website}"
case "$REPO" in
  -*|"")
    echo "deploy-run: invalid repo arg '$REPO' (expected a bare repo name, got a flag or empty string)" >&2
    exit 2
    ;;
esac

CONTEXT="${LASTGIT_DEPLOY_CONTEXT:-deploy-prod}"
REF="${LASTGIT_DEPLOY_REF:-refs/heads/main}"
TIMEOUT_MS="${LASTGIT_DEPLOY_TIMEOUT_MS:-1800000}"

# Prefer the installed host-track binary. A checkout-local lastgit can be
# incomplete while its source tree changes and can fail before it starts CI.
export PATH="${HOME}/.local/bin:${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${PATH}"
export LASTGIT_SOCKET="${LASTGIT_SOCKET:-${HOME}/.lastdb/data/folddb.sock}"
export LASTGIT_SCHEMA_MAP="${LASTGIT_SCHEMA_MAP:-$HOME/.lastgit/schema-map.json}"

LOG_DIR="${LASTGIT_DEPLOY_LOG_DIR:-$HOME/.lastgit/deploy-$REPO}"
mkdir -p "$LOG_DIR"
export LASTGIT_CI_SCRATCH="${LASTGIT_CI_SCRATCH:-$LOG_DIR/scratch}"
echo "deploy-run: repo=$REPO context=$CONTEXT ref=$REF logs=$LOG_DIR"

WATCH_PID=""
stop() {
  [ -n "$WATCH_PID" ] && kill "$WATCH_PID" 2>/dev/null || true
}
trap 'stop; exit 0' INT TERM

start_watch() {
  # --keep-alive matches the launchd supervisor contract. Current LastGit
  # exits a ref watcher after all matching change requests close; this flag
  # keeps the single watcher attached to main between deploys.
  lastgit ci watch --repo "$REPO" --context "$CONTEXT" --ref "$REF" \
    --timeout-ms "$TIMEOUT_MS" --max-concurrency 1 --keep-alive \
    --state-file "$LOG_DIR/deploy.cursor" \
    >>"$LOG_DIR/deploy.log" 2>&1 &
  WATCH_PID=$!
}

start_watch
echo "pid=$WATCH_PID"
while true; do
  watch_status=0
  wait "$WATCH_PID" || watch_status=$?
  echo "deploy-run: watch pid=$WATCH_PID exited status=$watch_status; restarting" >>"$LOG_DIR/deploy.log"
  sleep 2
  start_watch
done
