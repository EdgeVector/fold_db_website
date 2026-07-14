import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">LastDB</span>{' '}
        <span className="dim">One local database for your data. Experimental &mdash; in alpha.</span>
      </p>
      <p>
        <Link to="/#install">Install</Link>{'  '}
        <Link to="/apps">Apps</Link>{'  '}
        <Link to="/about">About</Link>{'  '}
        <Link to="/developer">Developer</Link>{'  '}
        <Link to="/blog">Blog</Link>{'  '}
        <a href="https://github.com/EdgeVector" target="_blank" rel="noreferrer">GitHub</a>
      </p>
      <p className="dim">&copy; 2025-2026 LastDB &mdash; Built by Edge Vector</p>
    </footer>
  );
}
