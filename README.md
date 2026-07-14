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

Vercel (`vercel.json`). Pushes to `main` deploy automatically. Domain: `thelastdb.com`. Static prerendered routes under `dist/<path>/index.html` are served before the SPA rewrite.

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
