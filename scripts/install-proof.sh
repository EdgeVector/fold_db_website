#!/usr/bin/env bash
# Runs the public install path on a clean Apple Silicon machine and checks that
# the commands the site prints do what the site says.
#
# This is an operational check of the real product path, run by
# .github/workflows/install-proof.yml on a fresh runner. Do not run it on a
# machine that already has LastDB: it installs LastDB, writes records, and then
# removes the install.
#
# Raw command output stays under $RUNNER_TEMP. The job summary gets one row per
# step. Nothing here is committed.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${RUNNER_TEMP:-${TMPDIR:-/tmp}}/install-proof"
SUMMARY="${GITHUB_STEP_SUMMARY:-$OUT/summary.md}"
SOCK="$HOME/.lastdb/data/folddb.sock"
mkdir -p "$OUT"
export PATH="$HOME/.local/bin:$PATH"

failures=0
findings=0

row() { printf '| %s | %s | %s |\n' "$1" "$2" "$3" >> "$SUMMARY"; }

# step <name> <expected exit> <output must contain, or ''> -- <command...>
step() {
    local name="$1" want_rc="$2" want_text="$3"
    shift 4
    local slug log rc=0
    slug="$(printf '%s' "$name" | tr -c 'A-Za-z0-9' '_')"
    log="$OUT/$slug.log"
    echo "::group::$name"
    "$@" >"$log" 2>&1 || rc=$?
    tail -n 60 "$log"
    echo "::endgroup::"
    if [ "$rc" -ne "$want_rc" ]; then
        row "$name" "FAIL" "exit $rc, expected $want_rc"
        failures=$((failures + 1))
        return 1
    fi
    if [ -n "$want_text" ] && ! grep -qF -- "$want_text" "$log"; then
        row "$name" "FAIL" "output lacks: $want_text"
        failures=$((failures + 1))
        return 1
    fi
    row "$name" "pass" "exit $rc"
    return 0
}

finding() {
    row "$1" "FINDING" "$2"
    findings=$((findings + 1))
    echo "::warning::$1: $2"
}

api() {
    # api <METHOD> <path> [json body]
    if [ "$#" -ge 3 ]; then
        curl -sS --max-time 30 --unix-socket "$SOCK" -X "$1" "http://localhost$2" \
            -H "Content-Type: application/json" -d "$3"
    else
        curl -sS --max-time 30 --unix-socket "$SOCK" -X "$1" "http://localhost$2"
    fi
}

{
    echo "## Public install on a clean runner"
    echo
    echo "Runner: $(sw_vers -productName) $(sw_vers -productVersion), $(uname -m). Source: \`${GITHUB_SHA:-local}\`."
    echo
    echo "| Step | Result | Detail |"
    echo "|---|---|---|"
} >> "$SUMMARY"

# 0. The machine must be clean, or the run proves nothing.
if command -v lastdb >/dev/null 2>&1 || [ -e "$HOME/.lastdb" ]; then
    row "clean machine" "FAIL" "lastdb or ~/.lastdb already present"
    echo "This machine already has LastDB. Refusing to run." >&2
    exit 1
fi
row "clean machine" "pass" "no lastdb, no ~/.lastdb"

# 1. First run: installs LastDB, prints the app plan, stops for consent.
step "install.sh first run" 3 "RESULT: CONSENT NEEDED" -- sh "$REPO_ROOT/public/install.sh"

# 2. Second run: the user consents; apps install and check healthy.
step "install.sh --accept-install" 0 "RESULT: PASS" -- sh "$REPO_ROOT/public/install.sh" --accept-install

step "lastdb status" 0 "" -- lastdb status
step "lastdb app list" 0 "brain" -- lastdb app list
lastdb --version > "$OUT/version.txt" 2>&1 || true
row "installed release" "info" "$(head -n 1 "$OUT/version.txt")"

# 3. What the site says the install changes.
for cmd in lastdb brain lastsecrets; do
    if command -v "$cmd" >/dev/null 2>&1; then
        row "command on PATH: $cmd" "pass" "$(command -v "$cmd")"
    else
        row "command on PATH: $cmd" "FAIL" "not found"
        failures=$((failures + 1))
    fi
done
if [ -x "$HOME/.lastdb/current/lastdbd" ]; then
    row "daemon in current" "pass" "~/.lastdb/current/lastdbd"
else
    row "daemon in current" "FAIL" "~/.lastdb/current/lastdbd missing"
    failures=$((failures + 1))
fi
if [ -d "$HOME/.local/share/lastdb-apps/brain" ]; then
    row "apps folder" "pass" "~/.local/share/lastdb-apps/brain exists"
else
    row "apps folder" "FAIL" "~/.local/share/lastdb-apps/brain missing"
    failures=$((failures + 1))
fi

PLIST="$HOME/Library/LaunchAgents/com.edgevector.lastdb-app-registry.plist"
if [ -f "$PLIST" ]; then
    row "background upgrade job" "pass" "plist written"
    prog="$(/usr/libexec/PlistBuddy -c 'Print :ProgramArguments:0' "$PLIST" 2>/dev/null || true)"
    if [ -n "$prog" ] && [ ! -x "$prog" ]; then
        finding "upgrade job program" "the job runs $prog, which does not exist on this machine"
    else
        row "upgrade job program" "pass" "$prog"
    fi
else
    row "background upgrade job" "FAIL" "plist missing"
    failures=$((failures + 1))
fi

# 4. Brain, as the home and Apps pages show it.
step "brain init" 0 "" -- brain init
step "brain concept new" 0 "" -- brain concept new hello --title "Hello" --body "my first note"
step "brain get" 0 "my first note" -- brain get hello
step "brain ask" 0 "" -- brain ask "first note"

# 5. LastSecrets, as the Apps page shows it. The value is a throwaway string.
step "lastsecrets init" 0 "" -- lastsecrets init
put_secret() {
    printf '%s' "not-a-real-secret" | lastsecrets put my-api-token \
        --label "My API token" --provider example --purpose demo --env dev --value-stdin
}
step "lastsecrets put" 0 "" -- put_secret
step "lastsecrets ref" 0 "lastsecrets://" -- lastsecrets ref my-api-token
step "lastsecrets list" 0 "redacted" -- lastsecrets list

# 6. The socket requests from the home page and the Developer guide.
step "GET /health" 0 '"status":"ok"' -- api GET /health

step "declare schema" 0 "" -- api POST /api/schemas/declare '{
    "namespace": "notes",
    "schema": {
      "name": "note",
      "schema_type": "Hash",
      "record_keys": {
        "primary": { "kind": "hash" },
        "alternates": { "by_tag": { "kind": "hash" } }
      },
      "fields": ["id", "tag", "body"],
      "field_types": { "id": "String", "tag": "String", "body": "String" }
    }
  }'

step "write record" 0 "" -- api POST /api/mutation '{
    "type": "mutation",
    "schema": "notes/note",
    "record": { "id": "n1", "tag": "work", "body": "Ship the page" },
    "key_value": { "hash": "n1", "range": null },
    "alternates": { "by_tag": { "hash": "work", "range": null } },
    "mutation_type": "create",
    "expected": { "type": "absent" }
  }'

step "read by primary key" 0 "Ship the page" -- api POST /api/query '{"schema_name":"notes/note","filter":{"HashKey":"n1"}}'
step "read by alternate key" 0 "Ship the page" -- api POST /api/query '{"schema_name":"notes/note","filter":{"HashKey":"work"},"key_name":"by_tag"}'
step "list keys" 0 "n1" -- api GET "/api/list?schema=notes/note&limit=2"
step "read with no key is refused" 0 "full_schema_scan_not_allowed" -- api POST /api/query '{"schema_name":"notes/note"}'

step "lastdb get" 0 "Ship the page" -- lastdb get notes/note --key-hash n1
step "lastdb get-keys" 0 "n1" -- lastdb get-keys notes/note --limit 2

# 7. The removal steps from the home page. The data folder must survive.
remove_it() {
    # Chained, so one failed line fails the step.
    launchctl bootout "gui/$(id -u)/com.edgevector.lastdb-app-registry" &&
        rm "$HOME/Library/LaunchAgents/com.edgevector.lastdb-app-registry.plist" &&
        rm -rf "$HOME/.local/share/lastdb-apps" "$HOME/.local/state/lastdb-app-registry" &&
        launchctl bootout "gui/$(id -u)/com.edgevector.lastdbd" &&
        rm "$HOME/Library/LaunchAgents/com.edgevector.lastdbd.plist" &&
        rm "$HOME/.local/bin/lastdb" &&
        rm -rf "$HOME/.lastdb/programs" "$HOME/.lastdb/upgrade" &&
        rm "$HOME/.lastdb/current" "$HOME/.lastdb/previous"
}
step "remove it" 0 "" -- remove_it
if [ -d "$HOME/.lastdb" ]; then
    row "data folder kept" "pass" "~/.lastdb still present"
else
    row "data folder kept" "FAIL" "~/.lastdb is gone"
    failures=$((failures + 1))
fi
# Forget cached command paths, or bash still reports the removed program.
hash -r
if command -v lastdb >/dev/null 2>&1; then
    finding "lastdb after removal" "still on PATH at $(command -v lastdb)"
fi

{
    echo
    echo "**$failures failed, $findings findings.** Raw output stays on the runner."
} >> "$SUMMARY"

[ "$failures" -eq 0 ]
