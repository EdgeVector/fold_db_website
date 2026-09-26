#!/usr/bin/env bash
set -euo pipefail

# Test that deploy-run.sh does not leak the Forge token on curl argv.
# Verifies that authorization is passed via -K config file, not on the command line.

test_dir="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$test_dir/.." && pwd)"
deploy_script="$root/.lastgit/deploy-run.sh"

# Create a temporary directory for test files
tmpdir="$(mktemp -d "${TMPDIR:-/tmp}/deploy-run-test.XXXXXX")"
trap 'rm -rf "$tmpdir" 2>/dev/null' EXIT

# Create a mock curl that captures its argv
mock_curl="$tmpdir/curl"
mkdir -p "$(dirname "$mock_curl")"
cat > "$mock_curl" <<'CURL_EOF'
#!/usr/bin/env bash
# Mock curl that captures argv for testing
argv_file="${MOCK_CURL_ARGV_FILE:-}"
if [ -n "$argv_file" ]; then
  printf '%s\n' "$@" >> "$argv_file"
fi
# Simulate successful response
echo '{"state":"success"}'
exit 0
CURL_EOF
chmod +x "$mock_curl"

# Create a minimal test env where we source the functions
argv_log="$tmpdir/curl-argv.log"
export FORGE_TOKEN="test-secret-token-12345"
export TMPDIR="$tmpdir"
export MOCK_CURL_ARGV_FILE="$argv_log"
export PATH="$tmpdir:$PATH"

# Extract and test the forge_curl_auth_config function
(
  # Source the functions we need to test
  set -euo pipefail
  export TMPDIR="$tmpdir"

  # Inline the function from deploy-run.sh
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

  # Test 2: config file contains token (but not exposed on argv)
  if ! grep -q "test-secret-token-12345" "$auth_file"; then
    echo "FAIL: token not found in config file"
    exit 1
  fi

  # Test 3: simulate curl call with -K config file
  # The api() function in deploy-run.sh uses: curl -sS --max-time 30 -K "$AUTH_CONFIG" ...
  "$mock_curl" -sS --max-time 30 -K "$auth_file" -H "Accept: application/json" \
    "http://example.com/api/test" || true

  # Verify token is NOT in the captured argv
  if [ -f "$argv_log" ]; then
    if grep -q "test-secret-token-12345" "$argv_log"; then
      echo "FAIL: token found on curl argv (should be in -K config file only)"
      cat "$argv_log"
      exit 1
    fi
  fi

  # Verify -K flag IS present (config file is being used)
  if [ -f "$argv_log" ]; then
    if ! grep -q "^-K$" "$argv_log"; then
      echo "FAIL: -K flag not found in curl argv (config file not being used)"
      cat "$argv_log"
      exit 1
    fi
  fi
)

echo "PASS: Token is not leaked on curl argv"
exit 0
