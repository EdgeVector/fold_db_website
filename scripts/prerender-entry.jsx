/**
 * Loaded via Vite SSR (single React instance) from scripts/prerender.mjs.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../src/components/Layout.jsx';
import AppRoutes, { PRERENDER_PATHS } from '../src/AppRoutes.jsx';

export { PRERENDER_PATHS };

export function renderRoute(url) {
  const helmetContext = {};
  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Layout>
          <AppRoutes />
        </Layout>
      </StaticRouter>
    </HelmetProvider>,
  );
  return { body, helmet: helmetContext.helmet };
}
