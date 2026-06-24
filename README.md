# FoldDB Website

The official marketing website for **FoldDB — The Last Database**, an
experimental self-managing database designed to outlive applications.
Live at **[folddb.com](https://folddb.com)**.

## 🌐 Overview

A React + Vite single-page app deployed to Vercel. It explains the
FoldDB model and points developers at the install path and docs. Pages:

- **Home** (`/`) — the pitch: one permanent database for a person's data
- **Guide** (`/guide`) — install, run, and use FoldDB
- **Developer** (`/developer`) — quick start, HTTP API, code examples, contributing
- **Encryption** (`/encryption`) — the end-to-end encryption model

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
automatically; the custom domain `folddb.com` is set via `public/CNAME`.
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
│   └── pages/              # Home, Guide, Developer, Encryption, NotFound
└── public/
    ├── CNAME               # folddb.com
    ├── papers/             # FoldDB paper PDFs (full + ELI5)
    ├── robots.txt, sitemap.xml, favicon.png
```

## 🛠 Tech stack

- **React 18** + **react-router-dom** (client-side routing)
- **Vite 5** (dev server + build)
- **react-helmet-async** (per-page `<title>`/meta for SEO)
- **mermaid** (architecture diagrams)

## 🔗 Related

- **Install LastDB:** `brew install edgevector/lastdb/lastdb` ([Homebrew tap](https://github.com/EdgeVector/homebrew-lastdb))
- **Source:** [github.com/EdgeVector/fold_db](https://github.com/EdgeVector/fold_db) (the original public repo; development has since moved to the private `EdgeVector/fold` monorepo)
- **Schema registry:** [schema.folddb.com](https://schema.folddb.com)
