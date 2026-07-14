/**
 * Build-time prerender for agent / SEO friendliness.
 *
 * The Vite React app is a client SPA: without this step, curl and agents that
 * do not execute JavaScript only see <div id="root"></div>.
 *
 * After `vite build`, this script renders each public route to HTML with
 * react-dom/server and writes static files under dist/ so the first response
 * already contains page text.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function outFileForRoute(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html');
  return path.join(dist, routePath.replace(/^\//, ''), 'index.html');
}

function applyHelmet(template, helmet) {
  let html = template;
  if (helmet?.title?.toString()) {
    html = html.replace(/<title>[^<]*<\/title>/, helmet.title.toString());
  }
  if (helmet?.meta?.toString()) {
    html = html.replace(/<meta name="description" content="[^"]*" \/>/, '');
    html = html.replace(
      '</head>',
      `  ${helmet.meta.toString()}\n  ${helmet.link?.toString() || ''}\n</head>`,
    );
  } else if (helmet?.link?.toString()) {
    html = html.replace('</head>', `  ${helmet.link.toString()}\n</head>`);
  }
  return html;
}

async function main() {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('dist/index.html missing — run vite build first');
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    // Single Vite SSR graph → one React instance (Helmet context works).
    const entry = await vite.ssrLoadModule('/scripts/prerender-entry.jsx');
    const { renderRoute, PRERENDER_PATHS: paths } = entry;

    for (const routePath of paths) {
      let body;
      let helmet;
      try {
        ({ body, helmet } = renderRoute(routePath));
      } catch (err) {
        console.error(`prerender failed for ${routePath}:`, err);
        throw err;
      }

      let html = template.replace(
        '<div id="root"></div>',
        `<!-- prerendered for agents and search engines; JS enhances the page -->\n    <div id="root">${body}</div>`,
      );
      html = applyHelmet(html, helmet);

      const out = outFileForRoute(routePath);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, html);
      const chars = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
      console.log(`prerender ${routePath} → ${path.relative(root, out)} (${chars} text chars)`);
      if (chars < 80) {
        console.warn(
          `  warning: very little text for ${routePath} — page may still look blank to agents`,
        );
      }
    }
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
