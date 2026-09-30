#!/usr/bin/env bash
# Merge gate body for fold_db_website. Run by .github/workflows/ci-required.yml (job `build`).
set -euo pipefail
cd "$(dirname "$0")/.."

export npm_config_cache="${npm_config_cache:-${TMPDIR:-/tmp}/fold-db-website-npm-cache}"

echo "== install =="
npm ci

echo "== build =="
npm run build

echo "ci gate PASSED"
