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
  const headBits = [
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ]
    .filter(Boolean)
    .join('\n  ');
  if (headBits) {
    // Drop static shell description when page Helmet supplies its own.
    if (helmet?.meta?.toString()) {
      html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/, '');
    }
    html = html.replace('</head>', `  ${headBits}\n</head>`);
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

    // Keep sitemap in lockstep with prerendered routes (+ llms.txt for agents).
    const sitemapUrls = [
      ...paths.map((p) => (p === '/' ? 'https://thelastdb.com/' : `https://thelastdb.com${p}`)),
      'https://thelastdb.com/llms.txt',
    ];
    const priority = (url) => {
      if (url.endsWith('thelastdb.com/')) return '1.0';
      if (url.includes('/apps')) return '0.9';
      if (url.endsWith('/docs')) return '0.82';
      if (url.includes('/docs/')) return '0.7';
      if (url.includes('/start') || url.includes('/about') || url.includes('/developer')) return '0.85';
      if (url.includes('llms.txt')) return '0.7';
      if (url.endsWith('/blog')) return '0.75';
      if (url.includes('/blog/')) return '0.6';
      return '0.5';
    };
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (loc) =>
      `  <url><loc>${loc}</loc><priority>${priority(loc)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
    fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
    console.log(`sitemap → dist/sitemap.xml (${sitemapUrls.length} urls)`);
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
