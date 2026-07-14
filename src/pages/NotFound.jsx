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

      <p>The page you&rsquo;re looking for doesn&rsquo;t exist.</p>

      <p>
        <Link to="/" className="link-btn">[Home]</Link>{'  '}
        <Link to="/#install" className="link-btn">[Install]</Link>{'  '}
        <Link to="/apps" className="link-btn">[Apps]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer]</Link>
      </p>
    </>
  );
}
