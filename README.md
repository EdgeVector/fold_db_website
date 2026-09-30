# LastDB Website

Marketing site for **LastDB** — the local database you build your own tool stack on; apps (Brain, Kanban, …) are thin clients. Live at **[thelastdb.com](https://thelastdb.com)**.

## Pages

| Path | Purpose |
|------|---------|
| `/` | What it is + **install** (primary CTA) |
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
| Review + merge gate | GitHub PR + `ci-required` (`.github/workflows/ci-required.yml`; body `.lastgit/ci.sh`: `npm ci` + `npm run build`) |
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
