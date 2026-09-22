#!/usr/bin/env bash
# Install LaunchAgent: forge main → Vercel production for fold_db_website.
#
# Run it from a forge-tracking checkout (origin = http://localhost:3300/EdgeVector/
# fold_db_website.git, branch main): the plist points at THIS checkout's
# .lastgit/deploy-run.sh, and deploy-run.sh keeps that checkout fast-forwarded to
# main and re-execs itself when it changes. Do not run it from a worktree that
# will be removed, or from a clone that does not track the forge.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
origin="$(git -C "$ROOT" remote get-url origin 2>/dev/null || true)"
case "$origin" in
  *localhost:3300/EdgeVector/fold_db_website*|*127.0.0.1:3300/EdgeVector/fold_db_website*) ;;
  *) echo "refusing: $ROOT origin is '$origin', not the forge repo (see header)" >&2; exit 2 ;;
esac
LABEL=com.edgevector.lastgit-deploy-fold-db-website
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
LOGDIR="$HOME/.lastgit/deploy-fold_db_website"
mkdir -p "$LOGDIR"
cat >"$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$ROOT/.lastgit/deploy-run.sh</string>
    <string>fold_db_website</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key><string>$HOME</string>
    <key>PATH</key><string>$HOME/.local/bin:$HOME/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    <key>LASTGIT_SOCKET</key><string>$HOME/.lastdb/data/folddb.sock</string>
    <key>LASTGIT_SCHEMA_MAP</key><string>$HOME/.lastgit/schema-map.json</string>
    <key>LASTGIT_DEPLOY_CONTEXT</key><string>deploy-prod</string>
    <key>LASTGIT_DEPLOY_LOG_DIR</key><string>$LOGDIR</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>30</integer>
  <key>StandardOutPath</key><string>$LOGDIR/launchd.log</string>
  <key>StandardErrorPath</key><string>$LOGDIR/launchd.log</string>
</dict>
</plist>
PL
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl unload "$PLIST" 2>/dev/null || true
# A label left disabled by an earlier `launchctl disable` rejects bootstrap with
# an opaque "5: Input/output error"; enable BEFORE bootstrap. bootout is
# asynchronous, so give the old instance a moment to go away. The `load -w`
# fallback stays for older macOS.
launchctl enable "gui/$(id -u)/$LABEL" 2>/dev/null || true
sleep 2
launchctl bootstrap "gui/$(id -u)" "$PLIST" 2>/dev/null || launchctl load -w "$PLIST"
echo "installed $LABEL"
echo "Requires LastSecrets: lastsecrets://lastgit-vercel-token (see .lastgit/deploy-prod.sh)"
