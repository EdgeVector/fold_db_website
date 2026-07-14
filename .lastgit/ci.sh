#!/usr/bin/env bash
# LastGit merge gate for fold_db_website.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== install =="
npm ci

echo "== build =="
npm run build

echo "lastgit ci gate PASSED"
