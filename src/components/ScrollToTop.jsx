import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { capturePageview } from '../analytics';

// Scrolls to top AND records a PostHog $pageview on every client-side route
// change (and on initial mount), so SPA navigation is counted as pageviews.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    capturePageview();
  }, [pathname]);

  return null;
}
