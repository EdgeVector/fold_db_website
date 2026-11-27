#!/bin/sh
# LastDB installer for macOS on Apple Silicon (and Linux, when a release exists for it).
#
# Steps, in order:
#   1. Check the system, the tools this script uses, and bun. Check that no other
#      LastDB is installed or running. Nothing changes before these checks pass.
#   2. Fetch the stable release list for this machine over HTTPS. Pick the newest
#      active entry, download its archive, check the archive's sha256, and unpack it
#      into a fresh temporary folder. Nothing is installed yet.
#   3. Run "lastdb service install" from that folder. That first lastdb verifies the
#      release list's signature against the key built into it, and refuses to install
#      if the check fails. It sets up the LastDB service and the update job.
#      If LastDB is already installed this way, skip the install. This script never upgrades.
#   4. Run lastdb status, then check GET /health over the Unix socket.
#   5. Install the starter apps (brain, lastsecrets) with lastdb app install.
#   6. Check each starter app with lastdb app status --check.
#   7. Print RESULT: PASS, RESULT: CONSENT NEEDED, or RESULT: FAIL.
#
# Where the release comes from:
#   https://lastdb-app-registry-prod-152335099025.s3.us-east-1.amazonaws.com/v1/node/stable/<target>.json
#   <target> is aarch64-apple-darwin, x86_64-unknown-linux-gnu, or aarch64-unknown-linux-gnu.
#   The script reads at most 256 KiB, follows no redirect for the list, and uses HTTPS only.
#   The archive comes from the GitHub release the list names. The list cannot name any other host.
#   This script cannot check the list's signature (a shell has no Ed25519 check). It
#   checks the archive's sha256 against the list, and the lastdb inside the archive then
#   checks the signature before it installs anything. No option changes where the list is read from.
#
# Updates:
#   After the install, LastDB updates itself. See "lastdb upgrade --help" and
#   https://thelastdb.com/upgrading. Re-running this script does not upgrade LastDB.
#
# Homebrew is a second way to install:
#       brew install edgevector/lastdb/lastdb
#       lastdb service install
#   After "lastdb service install", LastDB updates itself with "lastdb upgrade".
#   "brew upgrade lastdb" then only refreshes the installer copy. If Homebrew already
#   installed LastDB, this script stops and tells you to run "lastdb service install".
#
# Consent:
#   lastdb app install does not prompt for input. Without consent, it prints the
#   install plan to stderr and exits with an error. This script never answers
#   for you. Review the printed plan, then run:
#       sh install.sh --accept-install
#   Pass --accept-install only after you have read the plan.
#
# Side effects:
#   - "lastdb service install" writes a LaunchAgent (macOS) or a systemd user unit (Linux)
#     that runs ~/.lastdb/current/lastdbd, links ~/.local/bin/lastdb to ~/.lastdb/current/lastdb,
#     and adds the update check to the app-registry job. It never moves your data.
#     It sets up the home folder: $LASTDB_HOME if set, otherwise ~/.lastdb.
#   - Clones each app source from its git repository into ~/.local/share/lastdb-apps/<app>/.
#   - Creates command symlinks in ~/.local/bin (brain, brain-mcp, lastsecrets).
#   - On macOS, the first app install writes and loads a LaunchAgent,
#     ~/Library/LaunchAgents/com.edgevector.lastdb-app-registry.plist. It upgrades the
#     apps on the stable channel and checks for LastDB updates every hour.
#     Remove it with the steps at https://thelastdb.com/#install.
#   - App install runs each app's prepare step with bun. That is why this script checks for it.
#   - This script does not edit shell profiles and does not install bun.
#   - Search is not a starter app. LastSeek replaces it and is not in the App Registry yet.
#
# Idempotent: running it again skips steps that are already done.

set -eu

usage() {
    cat <<'EOF'
usage: sh install.sh [--accept-install]

Installs LastDB from the signed stable release list and starts it as a service,
then installs the starter apps (brain, lastsecrets).

  --accept-install   consent to the starter app install plan (read it first)
  -h, --help         show this text

After the install, LastDB updates itself: see "lastdb upgrade --help" and
https://thelastdb.com/upgrading.

Homebrew is a second way to install:
    brew install edgevector/lastdb/lastdb
    lastdb service install
EOF
}

ACCEPT_INSTALL=0
for arg in "$@"; do
    case "$arg" in
        --accept-install)
            ACCEPT_INSTALL=1
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "unknown argument: $arg" >&2
            usage >&2
            echo "RESULT: FAIL"
            exit 2
            ;;
    esac
done

NODE_INDEX="https://lastdb-app-registry-prod-152335099025.s3.us-east-1.amazonaws.com/v1/node"
CHANNEL="stable"
STARTER_APPS="brain lastsecrets"
LASTDB_DIR="${LASTDB_HOME:-$HOME/.lastdb}"
SOCKET="$LASTDB_DIR/data/folddb.sock"
LASTDB="$LASTDB_DIR/current/lastdb"
LIST_MAX_BYTES=262144
ARCHIVE_MAX_BYTES=1073741824
TMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/lastdb-install.XXXXXX")
trap 'rm -rf "$TMP_DIR"' EXIT HUP INT TERM

fail() {
    echo "error: $*" >&2
    echo "RESULT: FAIL"
    exit 1
}

# Print the sha256 of a file.
sha256_of() {
    if command -v shasum >/dev/null 2>&1; then
        shasum -a 256 "$1" | cut -d ' ' -f 1
    else
        sha256sum "$1" | cut -d ' ' -f 1
    fi
}

# Print each release object of a list file on its own line. The walk counts braces and
# skips braces inside strings, so a reason text cannot split an entry.
split_releases() {
    tr -d '\n\r' < "$1" | awk '
    BEGIN { depth = 0; instr = 0; esc = 0; buf = "" }
    {
        n = length($0)
        for (i = 1; i <= n; i++) {
            c = substr($0, i, 1)
            if (depth >= 2) buf = buf c
            if (instr) {
                if (esc) esc = 0
                else if (c == "\\") esc = 1
                else if (c == "\"") instr = 0
                continue
            }
            if (c == "\"") instr = 1
            else if (c == "{") { depth++; if (depth == 2) buf = c }
            else if (c == "}") { if (depth == 2) { print buf; buf = "" } depth-- }
        }
    }'
}

# json_string <key> <text>: print the value of "key":"value". Fail unless the key
# appears exactly once.
json_string() {
    found=$(printf '%s\n' "$2" | grep -o "\"$1\"[[:space:]]*:[[:space:]]*\"[^\"]*\"") || return 1
    [ "$(printf '%s\n' "$found" | wc -l | tr -d ' ')" -eq 1 ] || return 1
    printf '%s\n' "$found" | sed 's/^"[^"]*"[[:space:]]*:[[:space:]]*"//; s/"$//'
}

# json_number <key> <text>: print the value of "key":123. Fail unless exactly one.
json_number() {
    found=$(printf '%s\n' "$2" | grep -o "\"$1\"[[:space:]]*:[[:space:]]*[0-9][0-9]*") || return 1
    [ "$(printf '%s\n' "$found" | wc -l | tr -d ' ')" -eq 1 ] || return 1
    printf '%s\n' "$found" | sed 's/^"[^"]*"[[:space:]]*:[[:space:]]*//'
}

node_healthy() {
    curl --fail --silent --max-time 3 --unix-socket "$SOCKET" http://localhost/health 2>/dev/null \
        | grep -q '"status":"ok"'
}

# 1. Preflight checks. Nothing is installed before these pass.
echo "Checking this machine"
case "$(uname -s)/$(uname -m)" in
    Darwin/arm64) TARGET="aarch64-apple-darwin" ;;
    Linux/x86_64) TARGET="x86_64-unknown-linux-gnu" ;;
    Linux/aarch64|Linux/arm64) TARGET="aarch64-unknown-linux-gnu" ;;
    *) fail "LastDB has no release for $(uname -s) on $(uname -m). macOS on Apple Silicon is supported." ;;
esac
for tool in curl tar awk grep sed tr wc cut; do
    command -v "$tool" >/dev/null 2>&1 || fail "$tool is required by this script and was not found."
done
if ! command -v shasum >/dev/null 2>&1 && ! command -v sha256sum >/dev/null 2>&1; then
    fail "shasum or sha256sum is required to check the download and neither was found."
fi
# The app prepare steps run "bun install".
# The app install passes PATH through, so bun must be on PATH.
# This script does not install it.
if ! command -v bun >/dev/null 2>&1; then
    fail "bun is required by the brain and lastsecrets app installs. Install bun, open a new terminal, and run this script again."
fi

if [ -e "$LASTDB_DIR/current/lastdb" ]; then
    INSTALLED=1
else
    INSTALLED=0
    # Never put a second service next to a LastDB that someone else set up.
    if node_healthy; then
        fail "A LastDB node is already running at $SOCKET, and it does not run from $LASTDB_DIR/current. This script will not install a second one. To let it update itself, run: lastdb service adopt --label <its service label>. See https://thelastdb.com/upgrading."
    fi
    if command -v brew >/dev/null 2>&1 && brew list --versions lastdb >/dev/null 2>&1; then
        fail "Homebrew already installed LastDB. Run: lastdb service install   (if the brew service is running: lastdb service adopt --label homebrew.mxcl.lastdb). Then run this script again to add the apps."
    fi
fi

# 2. Fetch, check, and unpack the release. Skip if LastDB already runs from the updater's layout.
if [ "$INSTALLED" -eq 1 ]; then
    echo "LastDB is already installed. Skipping the download. This script does not upgrade LastDB: it updates itself, or run lastdb upgrade."
else
    echo "Fetching the $CHANNEL release list for $TARGET"
    LIST="$TMP_DIR/list.json"
    curl --fail --silent --show-error --proto '=https' --tlsv1.2 --max-redirs 0 \
        --max-filesize "$LIST_MAX_BYTES" --max-time 30 --retry 2 \
        -o "$LIST" "$NODE_INDEX/$CHANNEL/$TARGET.json" \
        || fail "could not read the release list at $NODE_INDEX/$CHANNEL/$TARGET.json."
    grep -q '"kind"[[:space:]]*:[[:space:]]*"lastdb-node"' "$LIST" \
        && grep -q "\"channel\"[[:space:]]*:[[:space:]]*\"$CHANNEL\"" "$LIST" \
        && grep -q "\"target\"[[:space:]]*:[[:space:]]*\"$TARGET\"" "$LIST" \
        || fail "the release list is not the $CHANNEL list for $TARGET."

    split_releases "$LIST" > "$TMP_DIR/releases.txt"
    VERSION=""
    while IFS= read -r entry; do
        status=$(json_string status "$entry") || continue
        [ "$status" = "active" ] || continue
        VERSION=$(json_string version "$entry") || fail "the newest active release has no single version."
        ARCHIVE_URL=$(json_string archive_url "$entry") || fail "release $VERSION has no single archive_url."
        ARCHIVE_SHA=$(json_string archive_sha256 "$entry") || fail "release $VERSION has no single archive_sha256."
        ARCHIVE_BYTES=$(json_number archive_bytes "$entry") || fail "release $VERSION has no single archive_bytes."
        break
    done < "$TMP_DIR/releases.txt"
    [ -n "$VERSION" ] || fail "the $CHANNEL list for $TARGET has no active release."

    # The list is data. Check each field against the shape the contract allows before use.
    printf '%s\n' "$VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$' \
        || fail "release version '$VERSION' is not a stable version number."
    printf '%s\n' "$ARCHIVE_SHA" | grep -Eq '^[0-9a-f]{64}$' \
        || fail "release $VERSION has a malformed archive_sha256."
    printf '%s\n' "$ARCHIVE_URL" \
        | grep -Eq "^https://github\\.com/EdgeVector/(lastdb|homebrew-lastdb)/releases/download/[A-Za-z0-9._-]+/lastdb-$TARGET\\.tar\\.gz\$" \
        || fail "release $VERSION names an archive outside the allowed GitHub releases."
    if [ "$ARCHIVE_BYTES" -lt 1 ] || [ "$ARCHIVE_BYTES" -gt "$ARCHIVE_MAX_BYTES" ]; then
        fail "release $VERSION has an archive size outside 1 byte to $ARCHIVE_MAX_BYTES bytes."
    fi

    echo "Downloading LastDB $VERSION"
    ARCHIVE="$TMP_DIR/lastdb-$TARGET.tar.gz"
    curl --fail --silent --show-error --location --proto '=https' --proto-redir '=https' --tlsv1.2 \
        --max-redirs 5 --max-filesize "$ARCHIVE_BYTES" --max-time 900 --retry 2 \
        -o "$ARCHIVE" "$ARCHIVE_URL" \
        || fail "could not download $ARCHIVE_URL."
    [ "$(wc -c < "$ARCHIVE" | tr -d ' ')" -eq "$ARCHIVE_BYTES" ] \
        || fail "the download is not the size the list gives ($ARCHIVE_BYTES bytes)."
    [ "$(sha256_of "$ARCHIVE")" = "$ARCHIVE_SHA" ] \
        || fail "the download does not match the sha256 in the release list. Nothing was installed."
    echo "Checked the archive sha256"

    # The archive holds exactly two regular files at its top level: lastdb and lastdbd.
    tar -tzf "$ARCHIVE" | sed 's|^\./||' | sort > "$TMP_DIR/members.txt" \
        || fail "the archive cannot be read."
    printf 'lastdb\nlastdbd\n' | cmp -s - "$TMP_DIR/members.txt" \
        || fail "the archive does not hold exactly lastdb and lastdbd."
    if tar -tvzf "$ARCHIVE" | grep -v '^-' >/dev/null; then
        fail "the archive holds something other than regular files."
    fi
    STAGE="$TMP_DIR/stage"
    mkdir "$STAGE"
    tar -xzf "$ARCHIVE" -C "$STAGE" || fail "could not unpack the archive."
    [ -f "$STAGE/lastdb" ] && [ -f "$STAGE/lastdbd" ] && [ ! -L "$STAGE/lastdb" ] && [ ! -L "$STAGE/lastdbd" ] \
        || fail "the unpacked archive is not two regular files."
    chmod 0755 "$STAGE/lastdb" "$STAGE/lastdbd"

    # 3. Install. This is the first change to the machine. The lastdb in the archive verifies
    # the list signature with its pinned key and stops if the check fails.
    echo "Running lastdb service install (it checks the signed release list first)"
    "$STAGE/lastdb" service install || fail "lastdb service install failed. Its message is above. Re-running this script is safe."
fi

# 4. Check the node. The daemon can take a few seconds to bind the socket.
# Retry for up to 60 seconds, then fail.
echo "Waiting for the LastDB health endpoint on $SOCKET"
health_ok=0
attempt=0
while [ "$attempt" -lt 30 ]; do
    if node_healthy; then
        health_ok=1
        break
    fi
    attempt=$((attempt + 1))
    sleep 2
done
if [ "$health_ok" -ne 1 ]; then
    fail "LastDB did not return status ok on /health within 60 seconds. Check: lastdb status"
fi
echo "Health: ok"

echo "Running lastdb status"
"$LASTDB" status || fail "lastdb status failed."

# 5. Install the starter apps through the App Registry.
# This script never passes --accept-install on its own. Only the user's flag does.
install_app() {
    app=$1
    out="$TMP_DIR/$app.install.out"
    err="$TMP_DIR/$app.install.err"
    rc=0
    if [ "$ACCEPT_INSTALL" -eq 1 ]; then
        "$LASTDB" app install "$app" --accept-install >"$out" 2>"$err" || rc=$?
    else
        "$LASTDB" app install "$app" >"$out" 2>"$err" || rc=$?
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
    "$LASTDB" app status "$app" --check >"$out" 2>"$err" || rc=$?
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
    *) echo "note: $HOME/.local/bin is not on PATH in this shell. Add it to your shell profile yourself if lastdb or brain is not found." ;;
esac

echo "Installed: LastDB (lastdb, lastdbd) and apps brain, lastsecrets."
echo "LastDB updates itself. Run lastdb upgrade --status to see its upgrade state."
echo "RESULT: PASS"
