import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const Start = lazy(() => import('./pages/Start'));
const Apps = lazy(() => import('./pages/Apps'));
const Developer = lazy(() => import('./pages/Developer'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogAnatomyOfASyncOutage = lazy(() => import('./pages/BlogAnatomyOfASyncOutage'));
const BlogSpeedupsWeDidntWrite = lazy(() => import('./pages/BlogSpeedupsWeDidntWrite'));
const BlogBuildingLastdbWithAgents = lazy(() => import('./pages/BlogBuildingLastdbWithAgents'));
const BlogEvolvingALiveSchema = lazy(() => import('./pages/BlogEvolvingALiveSchema'));
const BlogCantNotWont = lazy(() => import('./pages/BlogCantNotWont'));
const BlogProgressThatReportsItself = lazy(() => import('./pages/BlogProgressThatReportsItself'));
const BlogProveItToLand = lazy(() => import('./pages/BlogProveItToLand'));
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
              {/* Encryption page retired (2026-06-22) — too technical; redirect old URLs */}
              <Route path="/encryption" element={<Navigate to="/" replace />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/anatomy-of-a-sync-outage" element={<BlogAnatomyOfASyncOutage />} />
              <Route path="/blog/speedups-we-didnt-write" element={<BlogSpeedupsWeDidntWrite />} />
              <Route path="/blog/building-lastdb-with-agents" element={<BlogBuildingLastdbWithAgents />} />
              <Route path="/blog/evolving-a-live-schema" element={<BlogEvolvingALiveSchema />} />
              <Route path="/blog/cant-not-wont" element={<BlogCantNotWont />} />
              <Route path="/blog/progress-that-reports-itself" element={<BlogProgressThatReportsItself />} />
              <Route path="/blog/prove-it-to-land" element={<BlogProveItToLand />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
