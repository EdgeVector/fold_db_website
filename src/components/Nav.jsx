import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// One list drives the nav and the footer. `document` marks a static file under
// public/ (not a router route), so it stays a plain anchor and reloads the page.
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/start', label: 'Start' },
  { to: '/apps', label: 'Apps' },
  { to: '/about', label: 'About' },
  { to: '/developer', label: 'Developer' },
  { to: '/docs', label: 'Docs' },
  { to: '/explore/#diagram', label: 'Explore', document: true },
  { to: '/features', label: 'Features' },
  { to: '/blog', label: 'Dev Blog' },
];

// A link is active on its own path and on sub-paths (/docs/install is under /docs).
function isActive(to, pathname) {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/" className="nav-brand">
        <span className="nav-mark" aria-hidden="true"><span /><span /><span /></span>
        <span className="nav-brand-text">LastDB</span>
      </Link>
      <span className="nav-spacer" />
      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => {
          if (link.document) {
            return (
              <a key={link.to} href={link.to} className="link-btn" onClick={() => setMenuOpen(false)}>{link.label}</a>
            );
          }
          if (isActive(link.to, pathname)) {
            return (
              <span key={link.to} className="link-btn active" aria-current="page">{link.label}</span>
            );
          }
          return (
            <Link key={link.to} to={link.to} className="link-btn" onClick={() => setMenuOpen(false)}>{link.label}</Link>
          );
        })}
      </div>
    </nav>
  );
}
