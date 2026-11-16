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

      <p>This page does not exist. The link may be old, or the address may be mistyped.</p>

      <p>Try one of these:</p>

      <p>
        <Link to="/" className="link-btn">[Home]</Link>{'  '}
        <Link to="/start" className="link-btn">[Start]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer]</Link>
      </p>
    </>
  );
}
