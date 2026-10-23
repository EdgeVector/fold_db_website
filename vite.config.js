import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'explore-document-route',
      configureServer(server) {
        // Match the production document route before Vite's React fallback.
        server.middlewares.use((req, _res, next) => {
          if (/^\/explore\/?(?:\?|$)/.test(req.url || '')) {
            req.url = req.url.replace(/^\/explore\/?/, '/explore/index.html');
          }
          next();
        });
      },
    },
  ],
  base: '/',
  server: { port: 5175 },
  // react-helmet-async is CJS; force Vite to bundle it for SSR prerender.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
});
