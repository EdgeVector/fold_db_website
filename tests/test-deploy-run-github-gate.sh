#!/usr/bin/env bash
# deploy-run.sh must deploy a GitHub main commit only when ci-required is
# success on it; never on pending, none, or failure.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$SCRIPT_DIR/../.lastgit/deploy-run.sh"
T="$(mktemp -d "${TMPDIR:-/tmp}/deploy-run-gate.XXXXXX")"
trap 'rm -rf "$T"' EXIT
git init -q --bare -b main "$T/remote.git"
git clone -q "$T/remote.git" "$T/seed" 2>/dev/null
( cd "$T/seed" && git config user.email t@example.com && git config user.name t \
  && echo a > f && git add f && git commit -q -m one && git push -q origin HEAD:main )
mkdir -p "$T/bin"
cat > "$T/bin/curl" <<'STUB'
#!/bin/sh
case "$(cat "$GATE_FILE")" in
  none) echo '{"check_runs":[]}' ;;
  pending) echo '{"check_runs":[{"name":"ci-required","status":"in_progress","conclusion":null}]}' ;;
  failure) echo '{"check_runs":[{"name":"ci-required","status":"completed","conclusion":"failure"}]}' ;;
  success) echo '{"check_runs":[{"name":"ci-required","status":"completed","conclusion":"success"}]}' ;;
esac
STUB
chmod +x "$T/bin/curl"
fail=0
run() { # $1 = gate answer; prints deploy-run output
  echo "$1" > "$T/gate"
  PATH="$T/bin:$PATH" GATE_FILE="$T/gate" HOME="$T/home" \
    FOLD_DB_WEBSITE_DEPLOY_REMOTE="$T/remote.git" FOLD_DB_WEBSITE_DEPLOY_STATE="$T/state" \
FOLD_DB_WEBSITE_DEPLOY_ONCE=1 FOLD_DB_WEBSITE_DEPLOY_DRY_RUN=1 \
    bash "$SCRIPT" fold_db_website 2>&1
}
expect() { # $1 answer, $2 pattern
  local out; out="$(run "$1")"
  if printf '%s' "$out" | grep -q "$2"; then echo "PASS ($1): $2"; else echo "FAIL ($1): wanted '$2', got: $out" >&2; fail=1; fi
}
mkdir -p "$T/home"
expect pending "waiting"
expect none "waiting"
expect failure "FAILED"
rm -f "$T/state/failed.oid"
expect success "DRY RUN: would deploy"
exit "$fail"
