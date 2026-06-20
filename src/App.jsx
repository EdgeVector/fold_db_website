import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const Start = lazy(() => import('./pages/Start'));
const Apps = lazy(() => import('./pages/Apps'));
const Developer = lazy(() => import('./pages/Developer'));
const Encryption = lazy(() => import('./pages/Encryption'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<p className="dim">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/start" element={<Start />} />
              {/* /guide and /using merged into /start (2026-06-20) — redirect old URLs */}
              <Route path="/guide" element={<Navigate to="/start" replace />} />
              <Route path="/using" element={<Navigate to="/start" replace />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/encryption" element={<Encryption />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
