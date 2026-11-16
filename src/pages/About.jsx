import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About - LastDB</title>
        <meta name="description" content="Why LastDB exists: one permanent local database you own, every tool you use built on it — and slices of it delivered to the people you choose." />
        <meta property="og:title" content="About - LastDB" />
        <meta property="og:description" content="The problem with app silos, the LastDB model, and the principles behind owning your whole tool stack." />
        <link rel="canonical" href="https://thelastdb.com/about" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">About LastDB</h1>
      <p className="bold white">
        Why build your tools on a database you own &mdash; instead of renting a silo per tool.
      </p>
      <p className="hero-cta">
        <Link to="/#install" className="link-btn">[Install &rarr;]</Link>{'  '}
        <Link to="/apps" className="link-btn">[Apps]</Link>
        <span className="dim"> &mdash; thesis here; install and apps live on their own pages.</span>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <Section variant="rose" id="problem">
        <h2><span className="bold">THE PROBLEM</span></h2>

        <pre className="compare-table">
{`  App A        App B        App C        App D
    |              |            |            |
    v              v            v            v
 `}<span style={{ color: '#fb4934' }}>Notes DB</span>{`    `}<span style={{ color: '#fb4934' }}>Health DB</span>{`    `}<span style={{ color: '#fb4934' }}>Msgs DB</span>{`    `}<span style={{ color: '#fb4934' }}>Finance DB</span>{`
  (silo)       (silo)       (silo)       (silo)`}
        </pre>

        <p>Every application rebuilds accounts, storage, indexing, and sync. Each stores its own copy of your information. No single system understands the full picture &mdash; and none of it is really yours.</p>

        <p>Your data is <span className="bold white">fragmented, duplicated, and outside your control</span>. Your tools are rented.</p>
      </Section>

      <Section variant="sage" id="model">
        <h2><span className="bold">THE LASTDB MODEL</span></h2>

        <pre className="compare-table">
{`  App A     App B     App C     App D     App E
    \\         |         |         |         /
     \\        |         |         |        /
      `}<span style={{ color: '#fabd2f' }}>{`+----------------------------------------+`}</span>{`
      `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`          `}<span className="bold white">Your LastDB Database</span>{`          `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`
      `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`       `}<span className="dim">{`local / permanent / yours`}</span>{`        `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`
      `}<span style={{ color: '#fabd2f' }}>{`+----------------------------------------+`}</span>
        </pre>

        <p>Applications become <span className="bold white">clients of the user&rsquo;s database</span> rather than owners of the data. That inversion is the whole product thesis: not a platform you join, but a foundation you own &mdash; every tool you use built on it, including the ones you write yourself.</p>
      </Section>

      <Section variant="slate" id="architecture">
        <h2><span className="bold">LAYERS</span></h2>

        <pre className="compare-table">
{`  `}<span style={{ color: '#b8bb26' }}>{`Applications`}</span>{`   Brain · LastSecrets · yours
        |
        v
  `}<span style={{ color: '#83a598' }}>{`LastDB node`}</span>{`     schemas, keyed records, socket API
        |
        v
  `}<span style={{ color: '#fb4934' }}>{`Local disk`}</span>{`      your data, on your machine
        |
        v
  `}<span style={{ color: '#d3869b' }}>{`Cloud backup`}</span>{`    optional, set up with lastdb backup connect`}
        </pre>

        <p>The node runs on your machine. <span className="bold white">Your data stays there unless you turn on cloud backup.</span></p>
      </Section>

      <Section variant="amber" id="principles">
        <h2><span className="bold">PRINCIPLES</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="yellow">OWN THE WHOLE STACK</Label></p>
            <p>Your tools are <span className="bold white">clients of your database</span>, not custodians of copies. Swap a tool, keep the data. Nothing about your setup is rented.</p>
          </Card>
          <Card>
            <p><Label color="yellow">BUILD FAST</Label></p>
            <p>Declare a schema and write a client. The node stores the records and serves reads by key. <span className="bold white">Local use needs no account.</span></p>
          </Card>
          <Card>
            <p><Label color="yellow">SHARE ON PURPOSE</Label></p>
            <p>Sharing is a command group, <span className="bold white">lastdb share</span>. It creates a contact code for your LastDB identity and checks a contact file against a key you trust.</p>
          </Card>
        </div>
      </Section>

      <Section variant="sage" id="how-it-works">
        <h2><span className="bold">HOW IT WORKS</span> <span className="dim">short version</span></h2>

        <h2 className="section-subheading"><span className="bold">Schemas and keys</span></h2>
        <p>A schema names its fields and its primary key. A record holds one value for each field. A query names a key, either a hash or a hash plus a range.</p>

        <h2 className="section-subheading"><span className="bold">Apps</span></h2>
        <p>An app is a program that talks to the node over a local Unix socket. Brain and LastSecrets are apps. You can write your own.</p>

        <h2 className="section-subheading"><span className="bold">Search</span></h2>
        <p>LastSeek is the search service. It keeps a semantic index beside the node, outside the database. It is not in the App Registry yet. Until it is, Brain finds notes by name and by keyword.</p>

        <h2 className="section-subheading"><span className="bold">Sharing</span></h2>
        <p>Sharing uses contact codes. A contact file can be checked against a key you already trust, with <span className="bold">lastdb share verify-contact</span>.</p>
      </Section>

      <Section variant="slate" id="status">
        <h2><span className="bold">STATUS</span></h2>
        <p>LastDB is <span className="bold white">alpha and in active development</span>. The current release covers the local node, the App Registry, and the apps listed on the Apps page.</p>
        <p>
          <Link to="/" className="link-btn">[Install on the home page &rarr;]</Link>{'  '}
          <Link to="/apps" className="link-btn">[Apps]</Link>{'  '}
          <Link to="/developer" className="link-btn">[Developer]</Link>{'  '}
          <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer" className="link-btn">[Paper]</a>
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
