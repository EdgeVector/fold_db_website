import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found - LastDB</title>
      </Helmet>
      <pre className="ascii">{`
#   #  ###  #   #
#   # #   # #   #
##### #   # #####
    # #   #     #
    #  ###      #`.trim()}</pre>

      <h1 className="tagline">Page Not Found</h1>

      <p>The page you're looking for doesn't exist.</p>

      <p>
        <Link to="/" className="link-btn">[Back to Home]</Link>{'  '}
        <Link to="/start" className="link-btn">[Get Started]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer Guide]</Link>
      </p>
    </>
  );
}
