# LastDB Website

Marketing site for **LastDB** — a local encrypted database with apps (Brain, Kanban, …) as thin clients. Live at **[thelastdb.com](https://thelastdb.com)**.

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

**LastGit is the production deploy path** for `thelastdb.com`.

| Step | Who |
|------|-----|
| Review + merge gate | LastGit CR + `.lastgit/ci.sh` (`npm ci` + `npm run build`) |
| Production publish | LastGit watcher context **`deploy-prod`** → `.lastgit/deploy-prod.sh` → `vercel deploy --prod` of the **checked-out tree** |
| Public mirror | GitHub (`EdgeVector/fold_db_website`) via `.lastgit/sync-github-mirror.sh` |

Install the deploy watcher (once per machine that should publish):

```bash
# Vercel token: https://vercel.com/account/tokens
security add-generic-password -U -s lastgit-vercel-token -a "$USER" -w '<token>'
.lastgit/install-deploy-launchd.sh   # com.edgevector.lastgit-deploy-fold-db-website
```

Optional overrides (env or keychain services `lastgit-vercel-scope` / `lastgit-vercel-project`):
`VERCEL_SCOPE` (default `shiba4lifes-projects`), `VERCEL_PROJECT` (default `fold_db_website`).

`vercel.json` still describes the project. GitHub→Vercel auto-deploy may still fire when the mirror updates `main`; that is a backup, not the source of truth. Prefer fixing deploy failures in LastGit logs under `~/.lastgit/deploy-fold_db_website/`.

Static prerendered routes under `dist/<path>/index.html` are served before the SPA rewrite.

## Source of truth

This repository is homed at `lastdb:///fold_db_website`. LastGit change requests
and `.lastgit/ci.sh` are the merge gate; GitHub is a read-only public mirror for
clone and browse workflows. Repo-local GitHub Actions are intentionally inert.

Mirror sync is handled by `.lastgit/sync-github-mirror.sh`, optionally installed
as `com.edgevector.lastgit-mirror-fold-db-website` with
`.lastgit/install-mirror-launchd.sh`.

## Related

- Install: https://thelastdb.com/#install
- Homebrew: `brew install edgevector/lastdb/lastdb` — [homebrew-lastdb](https://github.com/EdgeVector/homebrew-lastdb)
- Public apps: [EdgeVector on GitHub](https://github.com/EdgeVector)
