export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">folddb</span>{' '}
        <span className="dim">v0.9.2  The Last Database. An experimental self-managing database for your data.</span>
      </p>
      <p>
        <span className="dim">PROJECT</span>{'  '}
        <a href="https://github.com/EdgeVector" target="_blank" rel="noreferrer">GitHub</a>
      </p>
      <p>
        <span className="dim">LINKS</span>{'    '}
        <a href="https://schema.folddb.com" target="_blank" rel="noreferrer">Schema Registry</a>
      </p>
      <p className="dim">&copy; 2025-2026 Fold DB &mdash; Built in the open</p>
    </footer>
  );
}
