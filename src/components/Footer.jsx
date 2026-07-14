import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">LastDB</span>{' '}
        <span className="dim">Build for your happiness. Local foundation under a development stack. Alpha.</span>
      </p>
      <p>
        <Link to="/#install">Install</Link>{'  '}
        <Link to="/apps">Apps</Link>{'  '}
        <Link to="/start">Use</Link>{'  '}
        <Link to="/about">About</Link>{'  '}
        <Link to="/developer">Developer</Link>{'  '}
        <Link to="/blog">Blog</Link>{'  '}
        <a href="https://thelastdb.com/llms.txt">llms.txt</a>{'  '}
        <a href="https://github.com/EdgeVector" target="_blank" rel="noreferrer">GitHub</a>
      </p>
      <p className="dim">&copy; 2025-2026 LastDB &mdash; Built by Edge Vector</p>
    </footer>
  );
}
