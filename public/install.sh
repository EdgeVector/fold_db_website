#!/bin/sh
# LastDB installer for macOS on Apple Silicon.
#
# Steps, in order:
#   1. Check macOS, arm64, Homebrew, and bun.
#   2. Install LastDB with the Homebrew formula edgevector/lastdb/lastdb.
#      If LastDB is already installed, skip the install. This script never upgrades.
#   3. Start the Homebrew service: brew services start lastdb.
#   4. Run lastdb status, then check GET /health over the Unix socket.
#   5. Install the starter apps (brain, lastsecrets) with lastdb app install.
#   6. Check each starter app with lastdb app status --check.
#   7. Print RESULT: PASS, RESULT: CONSENT NEEDED, or RESULT: FAIL.
#
# Consent:
#   lastdb app install does not prompt for input. Without consent, it prints the
#   install plan to stderr and exits with an error. This script never answers
#   for you. Review the printed plan, then run:
#       sh install.sh --accept-install
#   Pass --accept-install only after you have read the plan.
#
# Side effects confirmed from the LastDB source (lastdb_node/src/bin/lastdb/app_registry_index/):
#   - Clones each app source from its git repository into ~/.local/share/lastdb-apps/<app>/.
#   - Creates command symlinks in ~/.local/bin (brain, brain-mcp, lastsecrets).
#   - On macOS, the first app install writes and loads a LaunchAgent,
#     ~/Library/LaunchAgents/com.edgevector.lastdb-app-registry.plist. It runs
#     "lastdb app upgrade --all" every 60 seconds, so apps update on their own
#     from the stable channel. Remove it with the steps at https://thelastdb.com/#install.
#   - App install runs each app's prepare step with bun. That is why this script checks for it.
#   - This script does not edit shell profiles and does not install bun.
#   - Search is not a starter app. LastSeek replaces it and is not in the App Registry yet.
#
# Idempotent: running it again skips steps that are already done.

set -eu

ACCEPT_INSTALL=0
for arg in "$@"; do
    case "$arg" in
        --accept-install)
            ACCEPT_INSTALL=1
            ;;
        -h|--help)
            echo "usage: sh install.sh [--accept-install]"
            exit 0
            ;;
        *)
            echo "unknown argument: $arg" >&2
            echo "usage: sh install.sh [--accept-install]" >&2
            echo "RESULT: FAIL"
            exit 2
            ;;
    esac
done

FORMULA="edgevector/lastdb/lastdb"
STARTER_APPS="brain lastsecrets"
SOCKET="$HOME/.lastdb/data/folddb.sock"
TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/lastdb-install.XXXXXX")
trap 'rm -rf "$TMP_DIR"' EXIT HUP INT TERM

fail() {
    echo "error: $*" >&2
    echo "RESULT: FAIL"
    exit 1
}

# 1. Preflight checks. Nothing is installed before these pass.
echo "Checking this Mac"
if [ "$(uname -s)" != "Darwin" ]; then
    fail "LastDB needs macOS. This system reports $(uname -s)."
fi
if [ "$(uname -m)" != "arm64" ]; then
    fail "LastDB needs Apple Silicon (uname -m arm64). This Mac reports $(uname -m)."
fi
if ! command -v brew >/dev/null 2>&1; then
    fail "Homebrew is required. Install it from https://brew.sh, open a new terminal, and run this script again."
fi
# The app prepare steps run "bun install".
# The app install passes PATH through, so bun must be on PATH.
# This script does not install it.
if ! command -v bun >/dev/null 2>&1; then
    fail "bun is required by the brain and lastsecrets app installs. Install bun, open a new terminal, and run this script again."
fi

# 2. Install LastDB. Skip if Homebrew already has it. Never upgrade here.
echo "Installing LastDB"
if brew list --versions lastdb >/dev/null 2>&1; then
    echo "LastDB is already installed. Skipping brew install. This script does not upgrade LastDB."
else
    brew install "$FORMULA" || fail "brew install $FORMULA failed."
fi

# 3. Start the service. brew services creates the launch agent from the
# formula's service block. Starting a running service is safe.
echo "Starting the LastDB service"
brew services start lastdb || fail "brew services start lastdb failed."

# 4. Check the node. The daemon can take a few seconds to bind the socket.
# Retry for up to 60 seconds, then fail.
echo "Waiting for the LastDB health endpoint on $SOCKET"
health_ok=0
attempt=0
while [ "$attempt" -lt 30 ]; do
    if curl --fail --silent --show-error --max-time 5 \
        --unix-socket "$SOCKET" http://localhost/health > "$TMP_DIR/health.json" 2>/dev/null; then
        if grep -q '"status":"ok"' "$TMP_DIR/health.json"; then
            health_ok=1
            break
        fi
    fi
    attempt=$((attempt + 1))
    sleep 2
done
if [ "$health_ok" -ne 1 ]; then
    fail "LastDB did not return status ok on /health within 60 seconds. Check: brew services list"
fi
echo "Health: ok"

echo "Running lastdb status"
lastdb status || fail "lastdb status failed."

# 5. Install the starter apps through the App Registry.
# This script never passes --accept-install on its own. Only the user's flag does.
install_app() {
    app=$1
    out="$TMP_DIR/$app.install.out"
    err="$TMP_DIR/$app.install.err"
    rc=0
    if [ "$ACCEPT_INSTALL" -eq 1 ]; then
        lastdb app install "$app" --accept-install >"$out" 2>"$err" || rc=$?
    else
        lastdb app install "$app" >"$out" 2>"$err" || rc=$?
    fi
    cat "$err" >&2
    if [ "$rc" -ne 0 ]; then
        if grep -q 'accept-install' "$err"; then
            # Not a failure: LastDB is installed and running. The apps wait for consent.
            echo "LastDB is installed and running. App $app needs your consent before it installs."
            echo "The install plan is printed above. Review it, then run: sh install.sh --accept-install"
            echo "RESULT: CONSENT NEEDED"
            exit 3
        fi
        fail "lastdb app install $app failed with exit $rc."
    fi
    echo "Installed app: $app"
}

echo "Installing starter apps: $STARTER_APPS"
for app in $STARTER_APPS; do
    install_app "$app"
done

# 6. Check each starter app. --check runs the app's probe steps.
status_app() {
    app=$1
    out="$TMP_DIR/$app.status.out"
    err="$TMP_DIR/$app.status.err"
    rc=0
    lastdb app status "$app" --check >"$out" 2>"$err" || rc=$?
    if [ "$rc" -ne 0 ] || ! grep -q '"state": "current"' "$out"; then
        cat "$err" >&2
        fail "app $app is not current and healthy. Run: lastdb app status $app --check"
    fi
    echo "App status: $app is current"
}

for app in $STARTER_APPS; do
    status_app "$app"
done

# Notice only. The script does not change the PATH.
case ":$PATH:" in
    *":$HOME/.local/bin:"*) ;;
    *) echo "note: $HOME/.local/bin is not on PATH in this shell. Add it to your shell profile yourself if brain is not found." ;;
esac

echo "Installed: LastDB (lastdb, lastdbd) and apps brain, lastsecrets."
echo "RESULT: PASS"
