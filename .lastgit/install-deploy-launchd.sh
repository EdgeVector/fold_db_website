#!/usr/bin/env bash
# Install LaunchAgent: GitHub main (green ci-required) -> Vercel production for thelastdb.com.
#
# The plist runs .lastgit/deploy-run.sh from a dedicated deploy checkout of
# https://github.com/EdgeVector/fold_db_website.git (default
# ~/.local/state/edgevector/fold-db-website-deploy/checkout). The watcher advances
# that checkout itself and re-execs when the script changes.
#
# Running this installer STARTS the watcher. Its first poll deploys GitHub main to
# production if ci-required is green on it (no cursor exists yet). It also retires
# the pre-2026-09-30 LastGit-keyed label (com.edgevector.lastgit-deploy-fold-db-website).
#
# Requires LastSecrets: lastsecrets://lastgit-vercel-token (see .lastgit/deploy-prod.sh).
set -euo pipefail
LABEL=com.edgevector.github-deploy-fold-db-website
OLD_LABEL=com.edgevector.lastgit-deploy-fold-db-website
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
STATE="$HOME/.local/state/edgevector/fold-db-website-deploy"
LOGDIR="$STATE/logs"
REMOTE="https://github.com/EdgeVector/fold_db_website.git"
mkdir -p "$LOGDIR"
ROOT="${FOLD_DB_WEBSITE_DEPLOY_ROOT:-$STATE/checkout}"
if [ ! -d "$ROOT/.git" ]; then
  git clone -q "$REMOTE" "$ROOT"
fi
origin="$(git -C "$ROOT" config --get remote.origin.url 2>/dev/null || true)"
case "$origin" in
  https://github.com/EdgeVector/fold_db_website|https://github.com/EdgeVector/fold_db_website.git) ;;
  *) echo "refusing: $ROOT origin is not the GitHub fold_db_website repo" >&2; exit 2 ;;
esac
git -C "$ROOT" fetch -q --no-tags origin '+refs/heads/main:refs/remotes/origin/main'
git -C "$ROOT" checkout -q --detach refs/remotes/origin/main
ENTRY="$ROOT/.lastgit/deploy-run.sh"
chmod +x "$ENTRY" "$ROOT/.lastgit/deploy-prod.sh" || true
cat >"$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$ENTRY</string>
    <string>fold_db_website</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key><string>$HOME</string>
    <key>PATH</key><string>$HOME/.local/bin:$HOME/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    <key>FOLD_DB_WEBSITE_DEPLOY_STATE</key><string>$STATE</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>30</integer>
  <key>StandardOutPath</key><string>$LOGDIR/launchd.log</string>
  <key>StandardErrorPath</key><string>$LOGDIR/launchd.log</string>
</dict>
</plist>
PL
# Retire the LastGit-keyed watcher: it can never see a GitHub merge.
launchctl bootout "gui/$(id -u)/$OLD_LABEL" 2>/dev/null || true
launchctl disable "gui/$(id -u)/$OLD_LABEL" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
# A label left disabled by an earlier `launchctl disable` rejects bootstrap with
# an opaque "5: Input/output error"; enable BEFORE bootstrap.
launchctl enable "gui/$(id -u)/$LABEL" 2>/dev/null || true
sleep 2
launchctl bootstrap "gui/$(id -u)" "$PLIST" 2>/dev/null || launchctl load -w "$PLIST"
echo "installed $LABEL"
echo "Logs: $LOGDIR/launchd.log"
