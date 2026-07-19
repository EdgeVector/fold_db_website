import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import Apps from './pages/Apps';
import About from './pages/About';
import Developer from './pages/Developer';
import Docs, { DocsDailyLoop, DocsInstall, DocsNodeHealth } from './pages/Docs';
import Blog from './pages/Blog';
import BlogHowAnAppRunsOnLastdb from './pages/BlogHowAnAppRunsOnLastdb';
import BlogTheStopWorkOrder from './pages/BlogTheStopWorkOrder';
import BlogThinTipsAndHonestHistory from './pages/BlogThinTipsAndHonestHistory';
import BlogTheThrashWasInTheOrder from './pages/BlogTheThrashWasInTheOrder';
import BlogKanbanFactory from './pages/BlogKanbanFactory';
import BlogHowAnAppGetsPublishedOnLastdb from './pages/BlogHowAnAppGetsPublishedOnLastdb';
import BlogTheFixWasSubtraction from './pages/BlogTheFixWasSubtraction';
import BlogReadMeDontRunMe from './pages/BlogReadMeDontRunMe';
import BlogDeclaredNotRegistered from './pages/BlogDeclaredNotRegistered';
import BlogTheSecondBinary from './pages/BlogTheSecondBinary';
import BlogSelfHostingTheForge from './pages/BlogSelfHostingTheForge';
import BlogMachineryListeningToSilence from './pages/BlogMachineryListeningToSilence';
import BlogTheParallelismTax from './pages/BlogTheParallelismTax';
import BlogAnatomyOfASyncOutage from './pages/BlogAnatomyOfASyncOutage';
import BlogSpeedupsWeDidntWrite from './pages/BlogSpeedupsWeDidntWrite';
import BlogBuildingLastdbWithAgents from './pages/BlogBuildingLastdbWithAgents';
import BlogEvolvingALiveSchema from './pages/BlogEvolvingALiveSchema';
import BlogCantNotWont from './pages/BlogCantNotWont';
import BlogProgressThatReportsItself from './pages/BlogProgressThatReportsItself';
import BlogProveItToLand from './pages/BlogProveItToLand';
import BlogArgumentListTooLong from './pages/BlogArgumentListTooLong';
import BlogNPlusOneSixBugs from './pages/BlogNPlusOneSixBugs';
import NotFound from './pages/NotFound';

/** Shared route table for the browser app and build-time prerender. */
export const PRERENDER_PATHS = [
  '/',
  '/about',
  '/start',
  '/apps',
  '/developer',
  '/docs',
  '/docs/install',
  '/docs/daily-loop',
  '/docs/node-health',
  '/blog',
  '/blog/how-an-app-gets-published-on-lastdb',
  '/blog/kanban-factory',
  '/blog/thin-tips-and-honest-history',
  '/blog/the-thrash-was-in-the-order',
  '/blog/how-an-app-runs-on-lastdb',
  '/blog/the-stop-work-order',
  '/blog/the-fix-was-subtraction',
  '/blog/read-me-dont-run-me',
  '/blog/declared-not-registered',
  '/blog/the-second-binary',
  '/blog/self-hosting-the-forge',
  '/blog/machinery-listening-to-silence',
  '/blog/the-parallelism-tax',
  '/blog/anatomy-of-a-sync-outage',
  '/blog/speedups-we-didnt-write',
  '/blog/building-lastdb-with-agents',
  '/blog/evolving-a-live-schema',
  '/blog/cant-not-wont',
  '/blog/progress-that-reports-itself',
  '/blog/prove-it-to-land',
  '/blog/argument-list-too-long',
  '/blog/n-plus-one-six-bugs',
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/start" element={<Start />} />
      <Route path="/guide" element={<Navigate to="/start" replace />} />
      <Route path="/using" element={<Navigate to="/start" replace />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/developer" element={<Developer />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/docs/install" element={<DocsInstall />} />
      <Route path="/docs/daily-loop" element={<DocsDailyLoop />} />
      <Route path="/docs/node-health" element={<DocsNodeHealth />} />
      <Route path="/encryption" element={<Navigate to="/" replace />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/kanban-factory" element={<BlogKanbanFactory />} />
      <Route path="/blog/how-an-app-gets-published-on-lastdb" element={<BlogHowAnAppGetsPublishedOnLastdb />} />
      <Route path="/blog/thin-tips-and-honest-history" element={<BlogThinTipsAndHonestHistory />} />
      <Route path="/blog/the-thrash-was-in-the-order" element={<BlogTheThrashWasInTheOrder />} />
      <Route path="/blog/how-an-app-runs-on-lastdb" element={<BlogHowAnAppRunsOnLastdb />} />
      <Route path="/blog/the-stop-work-order" element={<BlogTheStopWorkOrder />} />
      <Route path="/blog/the-fix-was-subtraction" element={<BlogTheFixWasSubtraction />} />
      <Route path="/blog/read-me-dont-run-me" element={<BlogReadMeDontRunMe />} />
      <Route path="/blog/declared-not-registered" element={<BlogDeclaredNotRegistered />} />
      <Route path="/blog/the-second-binary" element={<BlogTheSecondBinary />} />
      <Route path="/blog/self-hosting-the-forge" element={<BlogSelfHostingTheForge />} />
      <Route path="/blog/machinery-listening-to-silence" element={<BlogMachineryListeningToSilence />} />
      <Route path="/blog/the-parallelism-tax" element={<BlogTheParallelismTax />} />
      <Route path="/blog/anatomy-of-a-sync-outage" element={<BlogAnatomyOfASyncOutage />} />
      <Route path="/blog/speedups-we-didnt-write" element={<BlogSpeedupsWeDidntWrite />} />
      <Route path="/blog/building-lastdb-with-agents" element={<BlogBuildingLastdbWithAgents />} />
      <Route path="/blog/evolving-a-live-schema" element={<BlogEvolvingALiveSchema />} />
      <Route path="/blog/cant-not-wont" element={<BlogCantNotWont />} />
      <Route path="/blog/progress-that-reports-itself" element={<BlogProgressThatReportsItself />} />
      <Route path="/blog/prove-it-to-land" element={<BlogProveItToLand />} />
      <Route path="/blog/argument-list-too-long" element={<BlogArgumentListTooLong />} />
      <Route path="/blog/n-plus-one-six-bugs" element={<BlogNPlusOneSixBugs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
