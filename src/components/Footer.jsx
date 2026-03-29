export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <span className="bold white">folddb</span>{' '}
        <span className="dim">Your data. Your connections. Your terms.</span>
      </p>
      <p>
        <span className="dim">DOWNLOAD</span>{'  '}
        <a href="https://github.com/shiba4life/fold_db/releases/latest" target="_blank" rel="noreferrer">Mac App</a>{'  '}
        <span className="dim">brew install --cask folddb</span>
      </p>
      <p>
        <span className="dim">PROJECT</span>{'  '}
        <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer">GitHub</a>{'  '}
        <a href="https://schema.folddb.com" target="_blank" rel="noreferrer">Schema Registry</a>{'  '}
        <a href="https://github.com/shiba4life/fold_db/issues" target="_blank" rel="noreferrer">Issues</a>
      </p>
      <p className="dim">&copy; 2025-2026 Fold DB &mdash; Privacy is not a feature. It&rsquo;s the architecture.</p>
    </footer>
  );
}
