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
{`  `}<span style={{ color: '#b8bb26' }}>{`Applications`}</span>{`  Brain · Kanban · Situations · yours
        |
        v
  `}<span style={{ color: '#83a598' }}>{`Shared Structures`}</span>{`    public interfaces, standardized
        |
        v
  `}<span style={{ color: '#d3869b' }}>{`Transforms`}</span>{`           local computation, deterministic
        |
        v
  `}<span style={{ color: '#fe8019' }}>{`Vector Embeddings`}</span>{`    semantic index across all data
        |
        v
  `}<span style={{ color: '#fb4934' }}>{`Local Storage`}</span>{`        yours, append-only`}
        </pre>

        <p>Computation runs locally. <span className="bold white">The data stays yours, on your machine, in one place.</span></p>
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
            <p>Declare a schema, write a thin client. <span className="bold white">A new tool is an afternoon</span> &mdash; storage, indexing, and search are already there. No accounts, no ceremony.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DELIVER SLICES</Label></p>
            <p>Sharing is a first-class verb: hand a <span className="bold white">curated slice of your database</span> to a person or an app, on your terms &mdash; without giving away the database.</p>
          </Card>
        </div>
      </Section>

      <Section variant="sage" id="how-it-works">
        <h2><span className="bold">HOW IT WORKS</span> <span className="dim">short version</span></h2>

        <h2 className="section-subheading"><span className="bold">Shared structures</span></h2>
        <p>Structures are public and standardized: how data is organized, what you can query, how derived results are produced. Apps can work against any user&rsquo;s database without custom migrations.</p>

        <h2 className="section-subheading"><span className="bold">Transforms</span></h2>
        <p>Deterministic functions attached to structures. Outputs are written back into structures &mdash; so any tool on the stack can build on any other tool&rsquo;s results.</p>

        <pre className="compare-table">
{`  Structure: `}<span className="bold white">{`Messages`}</span>{`

    Fields    `}<span className="dim">{`id · sender · recipient · timestamp · body`}</span>{`

    Transforms
      `}<span style={{ color: '#fe8019' }}>{`inbox`}</span><span className="dim">{`(user_id)`}</span>{`
      `}<span style={{ color: '#fe8019' }}>{`conversation`}</span><span className="dim">{`(user_a, user_b)`}</span>{`
      `}<span style={{ color: '#fe8019' }}>{`semantic_search`}</span><span className="dim">{`(query)`}</span>{`
      `}<span style={{ color: '#fe8019' }}>{`unread_count`}</span><span className="dim">{`(user_id)`}</span>
        </pre>

        <h2 className="section-subheading"><span className="bold">Semantic index</span></h2>
        <p>One semantic index across notes, messages, code, and structured records. Search is meaning-based, not stuck to one app&rsquo;s schema.</p>

        <h2 className="section-subheading"><span className="bold">Delivering slices</span></h2>
        <p>A slice is a curated view of your database &mdash; a board rollup, a project digest, a dataset &mdash; that you deliver to another person or another node. The receiver gets a usable piece of your stack; you keep the source. This is how tools built by one person become useful to another without anyone standing up a platform in between.</p>
      </Section>

      <Section variant="slate" id="status">
        <h2><span className="bold">STATUS</span></h2>
        <p>LastDB is <span className="bold white">experimental and in active development</span>. Early releases focus on local storage, apps on top of that node, semantic search, slice delivery, and the agent workflow we use to build it.</p>
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
