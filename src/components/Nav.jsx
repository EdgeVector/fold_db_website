import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/apps', label: 'Apps' },
  { to: '/about', label: 'About' },
  { to: '/developer', label: 'Developer' },
  { to: '/blog', label: 'Blog' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/" className="nav-brand">
        <AnimatedLogo size={64} />
        <span className="nav-brand-text">LastDB</span>
      </Link>
      <span className="nav-spacer" />
      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '\u2715' : '\u2630'}
      </button>
      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          link.to === pathname ? (
            <span key={link.to} className="link-btn active" aria-current="page">[{link.label}]</span>
          ) : (
            <Link key={link.to} to={link.to} className="link-btn" onClick={() => setMenuOpen(false)}>[{link.label}]</Link>
          )
        ))}
      </div>
    </nav>
  );
}
