# LastDB Website

The official marketing website for **LastDB — The Last Database**, an
experimental self-managing database designed to outlive applications.
Live at **[thelastdb.com](https://thelastdb.com)**.

## 🌐 Overview

A React + Vite single-page app deployed to Vercel. It explains the
LastDB model and points developers at the install path and docs. Pages:

- **Home** (`/`) — the pitch: one permanent database for a person's data
- **Get Started** (`/start`) — Mini-first install path and agent runbook
- **Apps** (`/apps`) — Brain, Kanban, Situations, Dogfood Graph, and LastSecrets
- **Developer** (`/developer`) — quick start, HTTP API, code examples, contributing
- **Blog** (`/blog`) — engineering notes and release stories

## 🚀 Local development

```bash
npm install
npm run dev        # Vite dev server on http://localhost:5175
```

Build and preview the production bundle:

```bash
npm run build      # outputs to dist/
npm run preview
```

## 📦 Deployment

Hosted on **Vercel** (see `vercel.json`). Pushes to `main` deploy
automatically; the custom domain `thelastdb.com` is set via `public/CNAME`.
SPA routes are handled by the catch-all rewrite to `/index.html`.

## 📁 Project structure

```
fold_db_website/
├── index.html              # Vite entry HTML
├── vite.config.js          # Vite + React config (dev server on :5175)
├── vercel.json             # Vercel build + SPA rewrite config
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # Router + layout
│   ├── styles.css          # Global styles
│   ├── components/         # Nav, Footer, Card, Mermaid, animations, ...
│   └── pages/              # Home, Start, Apps, Developer, Blog, NotFound
└── public/
    ├── CNAME               # thelastdb.com
    ├── papers/             # LastDB/FoldDB paper PDFs (full + ELI5)
    ├── robots.txt, sitemap.xml, favicon.png
```

## 🛠 Tech stack

- **React 18** + **react-router-dom** (client-side routing)
- **Vite 5** (dev server + build)
- **react-helmet-async** (per-page `<title>`/meta for SEO)
- **mermaid** (architecture diagrams)

## 🔗 Related

- **Install LastDB:** `brew install edgevector/lastdb/lastdb` ([Homebrew tap](https://github.com/EdgeVector/homebrew-lastdb))
- **Source:** development has moved to the private `EdgeVector/fold` monorepo; public apps live at [fbrain](https://github.com/EdgeVector/fbrain), [fkanban](https://github.com/EdgeVector/fkanban), [fsituations](https://github.com/EdgeVector/fsituations), [dogfood-graph](https://github.com/EdgeVector/dogfood-graph), and [lastsecrets](https://github.com/EdgeVector/lastsecrets)
