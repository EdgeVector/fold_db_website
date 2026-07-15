#!/usr/bin/env bash
# Supervise LastGit deploy-prod for fold_db_website (main only).
set -euo pipefail
REPO="${1:-fold_db_website}"
CONTEXT="${LASTGIT_DEPLOY_CONTEXT:-deploy-prod}"
REF="${LASTGIT_DEPLOY_REF:-refs/heads/main}"
TIMEOUT_MS="${LASTGIT_DEPLOY_TIMEOUT_MS:-1800000}"
export PATH="${HOME}/code/edgevector/lastgit/bin:${HOME}/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:${PATH}"
export LASTGIT_SOCKET="${LASTGIT_SOCKET:-$HOME/.lastgit/code/data/folddb.sock}"
export LASTGIT_SCHEMA_MAP="${LASTGIT_SCHEMA_MAP:-$HOME/.lastgit/schema-map.json}"
LOG_DIR="${LASTGIT_DEPLOY_LOG_DIR:-$HOME/.lastgit/deploy-$REPO}"
mkdir -p "$LOG_DIR"
echo "deploy-run: repo=$REPO context=$CONTEXT ref=$REF logs=$LOG_DIR"
WATCH_PID=""
stop() { [ -n "$WATCH_PID" ] && kill "$WATCH_PID" 2>/dev/null || true; }
trap 'stop; exit 0' INT TERM
start_watch() {
  lastgit ci watch --repo "$REPO" --context "$CONTEXT" --ref "$REF" \
    --timeout-ms "$TIMEOUT_MS" --max-concurrency 1 \
    --state-file "$LOG_DIR/deploy.cursor" --scratch-dir "$LOG_DIR/scratch" \
    >>"$LOG_DIR/deploy.log" 2>&1 &
  WATCH_PID=$!
}
start_watch
echo "pid=$WATCH_PID"
while true; do
  sleep 5
  kill -0 "$WATCH_PID" 2>/dev/null || { sleep 2; start_watch; }
done
