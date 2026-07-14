import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { capturePageview } from '../analytics';

// On every client-side route change (and initial mount): record a PostHog
// $pageview, then scroll to the hash target if present, otherwise top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    capturePageview();

    if (hash) {
      const id = hash.replace(/^#/, '');
      // Wait a tick so the target route has painted (lazy pages included).
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
