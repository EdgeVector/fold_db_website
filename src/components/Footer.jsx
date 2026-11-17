import { Link } from 'react-router-dom';
import { NAV_LINKS } from './Nav';

// Footer links are the nav list, then the utility links that the nav does not carry.
export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">LastDB</span>{' '}
        <span className="dim">Massively multi-user apps with no central database. Open source. Alpha.</span>
      </p>
      <p className="footer-links">
        {NAV_LINKS.map(link => (
          link.document ? (
            <a key={link.to} href={link.to}>{link.label}</a>
          ) : (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          )
        ))}
        <Link to="/#install">Install</Link>
        <a href="https://thelastdb.com/llms.txt">llms.txt</a>
        <a href="https://github.com/EdgeVector/lastdb" target="_blank" rel="noreferrer">GitHub</a>
      </p>
      <p className="dim">&copy; 2025-2026 LastDB &mdash; Built by Edge Vector</p>
    </footer>
  );
}
