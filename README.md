# LastDB Website

Marketing site for **LastDB** — the local database you build your own tool stack on; apps (Brain, Kanban, …) are thin clients. Live at **[thelastdb.com](https://thelastdb.com)**.

## Pages

| Path | Purpose |
|------|---------|
| `/` | What it is + **install** (primary CTA) |
| `/explore/` | Interactive system guide and layer diagram |
| `/apps` | What each app does |
| `/start` | Daily loop + agent MCP/skills (after install) |
| `/about` | Product thesis |
| `/developer` | Socket API for builders |
| `/blog` | Engineering writing |
| `/llms.txt` | Plain-text install map for agents |

## Local development

```bash
npm install
npm run dev        # http://localhost:5175
```

Production build (includes **prerender** so agents/curl get real HTML without JS):

```bash
npm run build      # vite build && node scripts/prerender.mjs
npm run preview
```

## Deploy

**GitHub `main` is the production deploy path** for `thelastdb.com`
(`https://github.com/EdgeVector/fold_db_website`, since 2026-09-30).

| Step | Who |
|------|-----|
| Review + merge gate | GitHub PR + `ci-required` (`.github/workflows/ci-required.yml`; body `.lastgit/ci.sh`: `npm ci` + `npm run build`; the tests are deleted, Tom 2026-10-09) |
| Production publish | LaunchAgent `com.edgevector.github-deploy-fold-db-website` runs `.lastgit/deploy-run.sh`. It polls GitHub `main`. On a new tip with a green `ci-required` check run it runs `.lastgit/deploy-prod.sh` (`vercel deploy --prod` of that tip) |

The watcher runs from a dedicated deploy checkout at
`~/.local/state/edgevector/fold-db-website-deploy/checkout`. When `main` moves,
the watcher advances that checkout and re-execs itself if `deploy-run.sh`
changed. Install or re-point it (once per machine that should publish). This
STARTS the watcher, and its first poll deploys `main` if `ci-required` is green:

```bash
# Token in LastSecrets (not keychain): https://vercel.com/account/tokens
export PATH="$HOME/.bun/bin:$PATH"
printf '%s' "$(pbpaste)" | lastsecrets put lastgit-vercel-token \
  --label "Vercel deploy token for fold_db_website" \
  --provider vercel --purpose lastgit-fold-db-website-deploy-prod \
  --env prod --value-stdin
bash .lastgit/install-deploy-launchd.sh
```

Manual deploy from a checkout of the commit you want: `bash .lastgit/deploy-prod.sh`.
Dry run (decide only): `FOLD_DB_WEBSITE_DEPLOY_ONCE=1 FOLD_DB_WEBSITE_DEPLOY_DRY_RUN=1 bash .lastgit/deploy-run.sh`.

Optional env: `VERCEL_SCOPE` (default `shiba4lifes-projects`), `VERCEL_PROJECT` (default `fold_db`, the project that owns thelastdb.com).

`vercel.json` has `"git": { "deploymentEnabled": false }` — GitHub pushes do not
trigger Vercel. Production deploys only via `deploy-prod`. A green `ci-required`
is not a deploy; look at the watcher log:
`~/.local/state/edgevector/fold-db-website-deploy/logs/launchd.log`.

Static prerendered routes under `dist/<path>/index.html` are served before the SPA rewrite.

## Browser Error Reporting

The site initializes Sentry only when `VITE_SENTRY_DSN` is present at build time.
Keep the DSN in LastSecrets and inject it into the deploy environment at the
point of use. The production deploy script defaults to
`lastsecrets://obs-sentry-dsn-javascript-react` when `VITE_SENTRY_DSN` is not
already set.

Recommended deploy env:

```bash
VITE_SENTRY_DSN=<from LastSecrets>
VITE_SENTRY_ENVIRONMENT=production
VITE_SENTRY_RELEASE=<deployed commit sha>
```

The browser SDK is configured with `sendDefaultPii=false`; event payloads also
strip user fields, cookies, headers, request bodies, query strings, and URL
fragments before send.

Preview smoke:

```bash
VITE_SENTRY_DSN=<from LastSecrets> VITE_SENTRY_ENVIRONMENT=preview \
VITE_SENTRY_RELEASE=<preview commit sha> VITE_SENTRY_SMOKE=1 npm run build
```

Deploy that preview and open `/?sentry-smoke=1`; Sentry should receive
`fold_db_website.sentry_smoke` for the preview environment.

## Source of truth

GitHub `EdgeVector/fold_db_website` is the source of truth and the merge gate
(`ci-required`). The LastGit and Forgejo copies are frozen. The scheduled
`download-counts.yml` workflow runs daily on GitHub Actions.

## Related

- Install: https://thelastdb.com/#install
- Homebrew: `brew install edgevector/lastdb/lastdb` — [homebrew-lastdb](https://github.com/EdgeVector/homebrew-lastdb)
- Public apps: [EdgeVector on GitHub](https://github.com/EdgeVector)

## Interactive guide

`public/explore/` contains the standalone interactive guide. Its architecture review uses
LastDB revision `5ae38bc21450322a3988c0cb5c7af268ab640acc` from 7 November 2026.
The guide includes 139 parts and 511 named connections, reviewed through 1002 commits
after the original October 21 source. Format 14 and API 30 use complete conditional
records, explicit keys, and one record revision. Replacements preserve blob and inline attachments
unless explicitly changed; fields and metadata still require the complete desired state.
The guide covers the 64 KiB record cap, 256 MiB warm limit, required-file schemas,
mutate file input, 64 KiB inline attachments, exact-revision hydration, deletion, and removal of field history. Queries return markers; inline bytes stay in separate record-home rows and outside the warm set.

Dedicated shared homes separate device-private state from shared records and files.
New running snapshots clear hidden versions before retaining the original encrypted files for R2/B2 upload. Existing captures retain their exact bytes. A recovery journal
protects writes across those homes. New shared writers must restore before binding;
only an explicit initial publisher can initialize before a snapshot exists.
The disk overview retains four steps and expandable detail groups.

Commands use lastdb backup for ordinary backup and restore, and lastdb admin
for maintenance and shared setup. Bound DEV homes can enable automatic shared sync:
the daemon uploads changes, receives peer records, and lets the publisher schedule
snapshots. Defaults are one minute for changes and one day for snapshots. Shared
sync is off by default; missing history still requires manual returning-writer recovery.
The six-writer automatic DEV run at 3c69cad6 passed source-free recovery. Lifecycle,
conflict, and retention jobs at 024eb691 verified rejoin, opposite replay orders,
and stable settled storage after 24 overwrites.
Lifecycle, conflict, retention, and automatic shared DEV cases are scheduled daily at 10:53 UTC, with cleanup at minute 17
of each hour. Admission waits up to eight minutes for the latest required checks
on the exact accepted source. A cleanup-only result does not qualify recovery.
Shared definitions now travel in snapshots and writer logs, without a schema-service lookup. Later local writes require explicit schema admission. The four-case DEV suite passed at 9335052e; the later automatic case at 290a847e and reclamation case at 5ae38bc2 failed. These older results do not qualify every new change.
All app installs use the managed path. The local-development and unmanaged installers are removed. Managed app updates report an individual failure and continue checking the
remaining apps. Saved unsupported private catalog locators stay blocked.

Ordinary PROD recovery remains evidenced at ebd09268 with format 14/API 30 and the
release switch off. Shared DEV results do not qualify shared PROD recovery.
Older homes need their matching program; there is no in-place conversion.

Use a normal anchor to `/explore/#diagram`. The guide owns its hash routes
and does not use the React router. Vite copies these public assets into the
website output. The explicit Vercel routes preserve direct entry with or
without the final slash. Asset paths are absolute under `/explore/`.

The public copy replaces local owner notes with a public design summary.
It excludes local database measurements, internal agent instructions, Sites
identity, and deployment receipts. The source date remains visible; publication
does not imply a new architecture review or enabled cloud delivery.

For changes, update the source files here and use the normal PR build gate.
Check the diagram and a selected part in the browser at desktop and mobile sizes.
Keep raw browser output outside this repository.

The disk diagram opens with four write steps and expandable groups for reads,
large files, space management, and backup/setup. All 25 disk explanations remain
available through these groups, search, and direct links. Part selection shows
only that part and up to six neighbors; the explanation retains every named
connection. Other area overviews reveal connections only after selection.

Apps & services opens with six responsibility groups instead of a single large grid:
local requests, schema definitions, app installation, app publishing, search and
change feeds, and cloud access/sharing. Open a group to see its parts. A selected
part keeps the focused connection view; clearing it returns to its group. The
breadcrumb returns to the six-group overview. Search and existing part URLs
select the owning group automatically; group URLs use
`#diagram/services/group/<group-id>`. Groups organize navigation and do not add
system parts or imply that every contained path is enabled.
