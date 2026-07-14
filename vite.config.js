import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5175 },
  // react-helmet-async is CJS; force Vite to bundle it for SSR prerender.
  ssr: {
    noExternal: ['react-helmet-async'],
  },
});
