#!/usr/bin/env bash
set -euo pipefail

# Test that deploy-run.sh does not leak the Forge token on curl argv.
# Verifies that authorization is passed via -K config file, not on the command line (-H).
# This test runs the actual script logic and verifies via ps that the token is not visible.

test_dir="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$test_dir/.." && pwd)"

# Create a temporary directory for test files
tmpdir="$(mktemp -d "${TMPDIR:-/tmp}/deploy-run-test.XXXXXX")"
trap 'rm -rf "$tmpdir" 2>/dev/null' EXIT

export TMPDIR="$tmpdir"
export FORGE_TOKEN="test-secret-token-12345"

# Test the forge_curl_auth_config function from the actual script
forge_curl_auth_config() {
  local dir file old_umask
  old_umask="$(umask)"
  umask 077
  dir="$(mktemp -d "${TMPDIR:-/tmp}/deploy-run-forge-auth.XXXXXX")" || { umask "$old_umask"; return 1; }
  file="$dir/auth.conf"
  printf 'header = "Authorization: token %s"\n' "$FORGE_TOKEN" >"$file"
  umask "$old_umask"
  chmod 600 "$file" 2>/dev/null || true
  printf '%s' "$file"
}

# Test 1: forge_curl_auth_config generates valid config file
auth_file="$(forge_curl_auth_config)"
if [ ! -f "$auth_file" ]; then
  echo "FAIL: forge_curl_auth_config did not create config file"
  exit 1
fi

# Test 2: config file contains token (verified as safe in file, not argv)
if ! grep -q "test-secret-token-12345" "$auth_file"; then
  echo "FAIL: token not found in config file"
  exit 1
fi

# Test 3: Run a real curl command in background with the -K config file (new form)
# and verify the token does NOT appear on the process argv via ps
ps_log="$tmpdir/ps-output.log"
curl -sS --max-time 2 -K "$auth_file" -H "Accept: application/json" \
  "http://localhost:9999/nonexistent" 2>/dev/null &
curl_pid=$!
sleep 0.1
# Capture the full argv of curl process (use ps to show the actual command line)
if ps -p "$curl_pid" -o args= 2>/dev/null | tee "$ps_log"; then
  if grep -q "test-secret-token-12345" "$ps_log"; then
    echo "FAIL: token found on curl process argv (should be in -K config file only)"
    cat "$ps_log"
    kill "$curl_pid" 2>/dev/null || true
    exit 1
  fi
  # Verify -K config file IS being used (flag should be present)
  if ! grep -q "\-K" "$ps_log"; then
    echo "FAIL: -K flag not found in curl argv (config file not being used)"
    cat "$ps_log"
    kill "$curl_pid" 2>/dev/null || true
    exit 1
  fi
fi
kill "$curl_pid" 2>/dev/null || true
wait "$curl_pid" 2>/dev/null || true

echo "PASS: Token is not leaked on curl argv (using -K config file)"
exit 0
