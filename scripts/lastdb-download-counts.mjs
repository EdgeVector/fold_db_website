#!/usr/bin/env node
// LastDB download-count funnel: GitHub Releases -> PostHog.
//
// GitHub's per-asset `download_count` is a running cumulative total, not an
// event stream, so this is a "snapshot over time" funnel rather than a
// per-download event feed. On each run we:
//   1. read the per-asset download_count for every release of the LastDB
//      distribution repo (default EdgeVector/homebrew-lastdb),
//   2. compute the delta vs. the value we recorded on the previous run
//      (persisted in a state file — STATE_FILE env, defaulting to
//      scripts/lastdb-download-counts.state.json; the scheduled workflow
//      points STATE_FILE at an Actions-cache-backed path since the branch
//      ruleset forbids committing the snapshot back to main),
//   3. emit one PostHog `lastdb_download_count_snapshot` event per tracked
//      DMG asset, plus a `lastdb_download_count_rollup` total event, so
//      PostHog can chart cumulative counts and computed deltas.
//
// Designed to run from a scheduled GitHub Action (see
// .github/workflows/download-counts.yml) with the default GITHUB_TOKEN for
// the API read and POSTHOG_API_KEY for the capture call. It has no runtime
// dependencies and uses Node 20's built-in fetch.
//
// Env:
//   GITHUB_TOKEN     (optional) bumps the unauthenticated rate limit; the
//                    releases endpoint is public so this is not required.
//   GITHUB_REPOSITORY_OWNER / RELEASES_REPO  override the source repo.
//   POSTHOG_API_KEY  PostHog project write key (falls back to the public
//                    project token below if unset).
//   POSTHOG_HOST     (optional) defaults to https://us.i.posthog.com.
//   STATE_FILE       (optional) path to the cross-run snapshot file; defaults
//                    to scripts/lastdb-download-counts.state.json.
//   DRY_RUN=1        compute + print, but do not POST to PostHog and do not
//                    write the state file.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const RELEASES_REPO = process.env.RELEASES_REPO || "EdgeVector/homebrew-lastdb";
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
// Public PostHog project token (project 310814) — safe to commit; it is the
// same write-only ingest token shipped in the site's client analytics.
const POSTHOG_PUBLIC_TOKEN = "phc_gMzYLqfT6baay4Ve4q00PVRcCy4xUv3pCsQjreIt5aS";
const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY || POSTHOG_PUBLIC_TOKEN;
const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

const STATE_PATH =
  process.env.STATE_FILE || join(__dirname, "lastdb-download-counts.state.json");

// Only the user-facing LastDB installers are part of the download funnel.
// We deliberately skip .sig / SHA256SUMS / latest.json / dev / legacy-FoldDB
// assets so the funnel measures real product installs.
const ASSET_RE = /^LastDB.*\.(dmg|tar\.gz)$/i;
// app.tar.gz is the Tauri updater bundle, not a user download — exclude it.
const ASSET_EXCLUDE_RE = /\.app\.tar\.gz$/i;

function archOf(name) {
  if (/aarch64|arm64/i.test(name)) return "aarch64";
  if (/x86_64|x64|amd64/i.test(name)) return "x86_64";
  return "unknown";
}

function kindOf(name) {
  if (/\.dmg$/i.test(name)) return "dmg";
  if (/\.tar\.gz$/i.test(name)) return "tarball";
  return "other";
}

async function fetchReleases(repo) {
  const headers = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "lastdb-download-counts",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`GitHub API ${res.status} for ${url}: ${body.slice(0, 300)}`);
    }
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

async function loadState() {
  try {
    const raw = await readFile(STATE_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { assets: {} };
  }
}

async function captureBatch(events) {
  if (DRY_RUN) {
    console.log(`[dry-run] would POST ${events.length} event(s) to PostHog`);
    return;
  }
  const res = await fetch(`${POSTHOG_HOST}/batch/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ api_key: POSTHOG_API_KEY, batch: events }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`PostHog capture ${res.status}: ${body.slice(0, 300)}`);
  }
}

async function main() {
  console.log(`Fetching releases for ${RELEASES_REPO} ...`);
  const releases = await fetchReleases(RELEASES_REPO);
  console.log(`  ${releases.length} release(s) found`);

  const prev = await loadState();
  const nextState = { assets: {}, updated_at: new Date().toISOString() };
  const events = [];
  const timestamp = new Date().toISOString();

  let grandTotal = 0;
  let grandDelta = 0;
  const rows = [];

  for (const rel of releases) {
    const tag = rel.tag_name;
    for (const asset of rel.assets || []) {
      if (!ASSET_RE.test(asset.name) || ASSET_EXCLUDE_RE.test(asset.name)) continue;
      const key = `${tag}/${asset.name}`;
      const count = asset.download_count || 0;
      const prevCount = prev.assets?.[key]?.count ?? null;
      const delta = prevCount == null ? 0 : Math.max(0, count - prevCount);

      nextState.assets[key] = { count, tag, name: asset.name };
      grandTotal += count;
      grandDelta += delta;

      const arch = archOf(asset.name);
      const kind = kindOf(asset.name);
      rows.push({ key, count, delta, firstSeen: prevCount == null });

      events.push({
        event: "lastdb_download_count_snapshot",
        // Stable distinct_id per asset so PostHog graphs each asset as a
        // single evolving entity rather than one person per snapshot.
        distinct_id: `lastdb-asset:${key}`,
        properties: {
          asset: asset.name,
          tag,
          arch,
          kind,
          count,
          delta_since_last: delta,
          first_seen: prevCount == null,
          repo: RELEASES_REPO,
          $process_person_profile: false,
        },
        timestamp,
      });
    }
  }

  // Rollup total across all tracked assets.
  events.push({
    event: "lastdb_download_count_rollup",
    distinct_id: "lastdb-downloads:rollup",
    properties: {
      total_count: grandTotal,
      total_delta_since_last: grandDelta,
      tracked_assets: rows.length,
      repo: RELEASES_REPO,
      $process_person_profile: false,
    },
    timestamp,
  });

  // Print a human-readable summary.
  rows.sort((a, b) => b.count - a.count);
  console.log("\nPer-asset download counts:");
  for (const r of rows) {
    const d = r.firstSeen ? "(first seen)" : `(+${r.delta})`;
    console.log(`  ${String(r.count).padStart(6)}  ${d.padEnd(12)}  ${r.key}`);
  }
  console.log(
    `\nTotal across ${rows.length} tracked asset(s): ${grandTotal} (+${grandDelta} since last run)`,
  );

  await captureBatch(events);
  console.log(`\nEmitted ${events.length} PostHog event(s).`);

  if (DRY_RUN) {
    console.log("[dry-run] state file not written.");
  } else {
    await writeFile(STATE_PATH, JSON.stringify(nextState, null, 2) + "\n");
    console.log(`State written to ${STATE_PATH}`);
  }
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
