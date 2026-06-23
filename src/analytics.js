// PostHog analytics for the LastDB marketing/getting-started site.
//
// Mirrors the org's exemem web wiring (exemem-infra/web/landing/index.html):
// same project 310814, US Cloud, write-only project token. The token is a
// public/write-only key and is safe to embed in this public bundle. We prefer
// the build-time env vars (VITE_POSTHOG_KEY / VITE_POSTHOG_HOST) so Vercel can
// override, but default to the known values so it works with no extra config.
import posthog from 'posthog-js';

const POSTHOG_KEY =
  import.meta.env.VITE_POSTHOG_KEY || 'phc_gMzYLqfT6baay4Ve4q00PVRcCy4xUv3pCsQjreIt5aS';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

let initialized = false;

// Respect the browser's Do-Not-Track signal. A full consent banner is out of
// scope (follow-up: EU/GDPR opt-in); default-on / opt-out matches the org
// telemetry posture, but DNT users are never tracked.
function doNotTrackEnabled() {
  if (typeof navigator === 'undefined' && typeof window === 'undefined') return false;
  const dnt =
    (typeof navigator !== 'undefined' && (navigator.doNotTrack || navigator.msDoNotTrack)) ||
    (typeof window !== 'undefined' && window.doNotTrack);
  return dnt === '1' || dnt === 'yes';
}

export function initAnalytics() {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (doNotTrackEnabled()) return;
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    // We capture SPA route changes manually (see capturePageview) so PostHog's
    // own history listener isn't needed; autocapture stays on for clicks/forms.
    capture_pageview: false,
    respect_dnt: true,
  });
  initialized = true;
}

// Manually record a $pageview. Called on initial load and on every client-side
// route change so SPA navigation is counted.
export function capturePageview() {
  if (!initialized) return;
  posthog.capture('$pageview');
}

// Generic capture passthrough (no-op until init / when DNT opted-out).
export function capture(event, props) {
  if (!initialized) return;
  posthog.capture(event, props);
}

// download-INTENT half of the visit->download funnel.
export function captureDownloadClicked({ arch, page }) {
  capture('download_clicked', { arch, source: 'lastdb-site', page });
}

export default posthog;
