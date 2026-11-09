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
(`ci-required`). The scheduled
`download-counts.yml` workflow runs daily on GitHub Actions.

## Related

- Install: https://thelastdb.com/#install
- Homebrew: `brew install edgevector/lastdb/lastdb` — [homebrew-lastdb](https://github.com/EdgeVector/homebrew-lastdb)
- Public apps: [EdgeVector on GitHub](https://github.com/EdgeVector)

## Interactive guide

`public/explore/` contains the standalone interactive guide. Its architecture review uses
LastDB revision `32ba40cfdc8458ce130b4ba8c485b1a93ffe5606` from 8 November 2026.
It covers 143 parts and 539 connections, reviewed through 1073 commits after October 21.
Format 14 and API 31 use complete records, explicit keys, and one record revision.
A shared replacement naming an accepted definition preserves stored fields outside that
definition. Omitted declared fields and metadata still disappear. The SDK remembers the
ID returned by schema declaration and sends it with later mutations.

Personal backup uploads blob versions separately. Restore starts with an empty blob home;
a later file request verifies and downloads its selected version. A missing local file
without saved credentials returns “sign in to fetch this file”. Older restored records can
name cloud versions that have since been released. The DEV operation at `4132e14a` passed
with each restored home signed in as its own device and automatic backup off.
The earlier PROD pass at `ebd09268` predates this layout and does not qualify it.

Guest snapshot staging has an explicit `lastdb admin shared stage-guest` command.
It verifies a publisher-signed stream permission and an independent accepted snapshot.
It can read one exact primary key and its inline bytes after staging the whole snapshot.
The private workspace has no owner identity, credentials, restore receipt, or runnable home.
Invitation delivery and the account-authenticated recipient command remain unconnected.
Guest service deployment and a successful end-to-end operation are not established.
Local file references keep an existing file outside LastDB and check its hash on reads.
Their personal cloud upload path is incomplete; the guide describes the source gap and
does not claim recoverable backup. Reads and sealing remain capped at 512 MiB.

Shared sync remains DEV-only. The four-case operation at `24258e5b` passed, including
the declared-field preservation rules. These are generated DEV results, not shared PROD
qualification. This 24-commit review also covers API 31’s removal of the retired
native-index search route, removal of unused switches and backup memory reserves,
and schema lookup renaming. Warm-set limits, disk format, and flush-before-ack remain
unchanged. Older homes still need their matching program.

The disk diagram retains four steps and expandable detail groups. Apps & services opens
with six responsibility groups, covering all 38 service parts. One selected part shows
its nearby connections while its explanation retains the full list.

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
