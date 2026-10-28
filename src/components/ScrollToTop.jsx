import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// On every client-side route change (and initial mount), scroll to the hash
// target if present, otherwise top. Route changes do not emit browser telemetry.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
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
