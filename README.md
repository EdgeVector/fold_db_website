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

## Browser privacy

The website has no signup form or payment form. Local LastDB use needs no account.
The browser sends no PostHog events or Sentry reports. The source excludes both SDKs.
The site uses local font fallbacks and sends no Google Fonts requests.
The guide stores only the IDs of opened sections in browser local storage.

The daily download-count routine sends aggregate GitHub release asset counts to PostHog.
Its identifiers name release assets, not visitors or accounts.
It does not receive browser requests, checkout data, or visitor identifiers.

The site host still receives network requests. Provider access logs and their retention
need a separate operational review before a claim of no personal information storage.
The source alone does not prove the deployed site's behavior.

The deploy script still resolves legacy Sentry environment values. The browser source
does not read those values and cannot start either SDK from them.

## Source of truth

GitHub `EdgeVector/fold_db_website` is the source of truth and the merge gate
(`ci-required`). The LastGit and Forgejo copies are frozen. The scheduled
`download-counts.yml` workflow runs daily on GitHub Actions.

## Related

- Install: https://thelastdb.com/#install
- Homebrew: `brew install edgevector/lastdb/lastdb` — [homebrew-lastdb](https://github.com/EdgeVector/homebrew-lastdb)
- Public apps: [EdgeVector on GitHub](https://github.com/EdgeVector)

## Interactive guide

`public/explore/` contains the standalone guide from Sites source revision
`4b2686d09121481e4424070650ded9d0c9541c1a`. Its architecture review uses LastDB
revision `feeaf6e6e7bf612715c2bc400bc2dd15ed1f055e` from 26 October 2026.
The guide includes 91 parts and 216 named connections.
The disk view describes run homes only. Cloud backup preserves their native files.

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
