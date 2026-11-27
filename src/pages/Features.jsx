import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Features: a short list of what LastDB does today, each item linked to the
 * page that covers it. The home page is the source of truth for the wording.
 *
 * The page also indexes the feature posts under /features/<slug>. A feature
 * post is about something you can install and open; engineering notes live
 * in the Dev Blog (/blog).
 */
const GROUPS = [
  {
    id: 'one-person',
    rail: '01 · For one person',
    heading: 'A database on your own Mac.',
    items: [
      {
        title: 'One node per person',
        body:
          'LastDB is one background service on your Mac. That is your node. It holds several named databases, some private and some shared. Local use needs no account and no network.',
        to: '/#how',
        link: 'How it fits together',
      },
      {
        title: 'Read and write by key',
        body:
          'An app declares a schema, writes a record, and reads it back by key over a local Unix socket. The requests are plain HTTP with a JSON body, so any language can send them. There is no SQL and no read without a key.',
        to: '/developer',
        link: 'Developer guide',
      },
      {
        title: 'Primary and alternate keys',
        body:
          'A schema names its fields, its primary key, and any named alternate keys. One record can be found by its id or, for example, by its tag.',
        to: '/developer#schema',
        link: 'Declare a schema',
      },
      {
        title: 'Encrypted storage on disk',
        body:
          'Each database lives in a home folder of immutable runs. Blocks are compressed and encrypted at rest. Writes become visible only after CURRENT swaps.',
        to: '/docs/how-storage-works',
        link: 'How storage works',
      },
    ],
  },
  {
    id: 'many-people',
    rail: '02 · For many people',
    heading: 'Share a database by invitation.',
    items: [
      {
        title: 'A database is shared whole',
        body:
          'One person, the publisher, shares a database with other people. Data for a different audience goes in a different database: one for family, one for a team, one that stays private.',
        to: '/developer#share',
        link: 'Share a database',
      },
      {
        title: 'Invitations and write access',
        body:
          'An invitation is encrypted for one recipient. Everyone invited can read the database. The publisher grants writing by schema and can take it away again.',
        to: '/#share',
        link: 'The sharing steps',
      },
      {
        title: 'The publisher’s LastDB checks every change',
        body:
          'A change from another person arrives encrypted at the publisher’s LastDB. It checks the change against the sharing rules and the schema before anyone else receives it. The check does not live in the app.',
        to: '/developer#share',
        link: 'Who can write',
      },
    ],
  },
  {
    id: 'cloud',
    rail: '03 · The cloud',
    heading: 'An encrypted cloud that cannot read your data.',
    items: [
      {
        title: 'Backup and recovery',
        body:
          'Cloud backup is optional. It keeps an encrypted copy of your database and lets you recover onto a new Mac. It connects without a name or an email address. Cloud storage for backup is a paid subscription.',
        to: '/docs',
        link: 'Docs',
      },
      {
        title: 'It carries shared changes',
        body:
          'The cloud is a central service. It stores and passes along end-to-end encrypted bytes, and it runs none of an app’s code. Reads and writes happen on each person’s Mac.',
        to: '/#faq',
        link: 'Questions about the cloud',
      },
    ],
  },
  {
    id: 'apps',
    rail: '04 · Apps',
    heading: 'Install an app by name. Publish your own.',
    items: [
      {
        title: 'The App Registry',
        body:
          'The App Registry is a signed list of apps. You install an app by name, and it runs on your Mac against your own LastDB.',
        to: '/apps#registry',
        link: 'Apps',
      },
      {
        title: 'Starter apps: Brain and LastSecrets',
        body:
          'Brain keeps notes and decisions. LastSecrets keeps credentials. Both are command-line tools in public repositories. LastSeek, semantic search beside the database, is coming and is not in the App Registry yet.',
        to: '/apps#starter',
        link: 'The starter apps',
      },
      {
        title: 'Publishing',
        body:
          'An app has no server, so there is nothing to deploy. A release is a signed entry in the App Registry. Publishing needs a paid Exemem subscription. People who install the app pay nothing to use it.',
        to: '/developer#publish',
        link: 'Publish your app',
      },
    ],
  },
];

// Feature posts. Keep every entry, its date, and its order.
const POSTS = [
  {
    slug: 'kanban-factory',
    title: 'Kanban Factory',
    date: '2026-08-05',
    tag: 'DASHBOARD',
    blurb:
      'A live floor view of your own Kanban board. Cards move as the board changes, and scheduled jobs show up as a crew with names. Clone it, run one command, and open a browser tab. It reads your board and does not move cards. It listens on localhost only.',
  },
];

export default function Features() {
  return (
    <>
      <Helmet>
        <title>Features - LastDB</title>
        <meta
          name="description"
          content="What LastDB does today: one database on each person's Mac, reads and writes by key, sharing a database by invitation, an encrypted cloud that cannot read the data, and apps installed by name from the App Registry. Alpha, macOS on Apple Silicon."
        />
        <meta property="og:title" content="Features - LastDB" />
        <meta
          property="og:description"
          content="A short list of what LastDB does today, each item linked to the page that covers it."
        />
        <link rel="canonical" href="https://thelastdb.com/features" />
      </Helmet>

      {/* HERO */}
      <section className="fg-hero">
        <div className="fg-eyebrow">Features &middot; alpha &middot; macOS on Apple Silicon</div>
        <h1>What LastDB <em>does today.</em></h1>
        <div className="fg-hero-row">
          <p>
            Each person runs one LastDB on their own Mac. Apps read and write it by key.
            A person can share a whole database with other people by invitation.
            This page lists each part and links to the page that covers it.
          </p>
          <div className="fg-actions">
            <Link to="/#install" className="fg-btn fg-btn-primary">Install LastDB</Link>
            <Link to="/developer" className="fg-btn">Developer guide</Link>
          </div>
        </div>
      </section>

      {GROUPS.map((group) => (
        <section className="fg-section" id={group.id} key={group.id}>
          <div className="fg-rail">{group.rail}</div>
          <div className="fg-body">
            <h2>{group.heading}</h2>
            <ol className="fg-steps">
              {group.items.map((item, i) => (
                <li key={item.title}>
                  <span className="fg-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <p><Link to={item.to}>{item.link} &rarr;</Link></p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* 05 STATUS */}
      <section className="fg-section" id="status">
        <div className="fg-rail">05 &middot; Status</div>
        <div className="fg-body">
          <h2>Alpha, and what that means.</h2>
          <dl className="fg-faq" style={{ marginTop: '28px' }}>
            <div>
              <dt>Platform</dt>
              <dd>macOS on Apple Silicon. There is no Intel, Linux, or Windows release today.</dd>
            </div>
            <div>
              <dt>Readiness</dt>
              <dd>Not ready for production. The storage format and the socket requests can still change between releases.</dd>
            </div>
            <div>
              <dt>Interface</dt>
              <dd>LastDB is a background service with a command line. There is no desktop app. Apps bring their own interface.</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>The database and the apps are free. Cloud storage for backup and publishing an app are paid subscriptions.</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                Apache-2.0 at{' '}
                <a href="https://github.com/EdgeVector/lastdb" target="_blank" rel="noreferrer">github.com/EdgeVector/lastdb</a>.
              </dd>
            </div>
          </dl>
          <p className="fg-more"><Link to="/#faq">More questions, answered on the home page &rarr;</Link></p>
        </div>
      </section>

      {/* 06 FEATURE POSTS */}
      <section className="fg-section" id="posts">
        <div className="fg-rail">
          06 &middot; Feature posts
          <p>One post per thing you can install and open. Each says what it does, how to get it, and how to open it.</p>
        </div>
        <div className="fg-body">
          <h2>Built on LastDB.</h2>
          <ol className="fg-steps">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <span className="fg-num">{post.date}</span>
                <div>
                  <h3><Link to={`/features/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.blurb}</p>
                  <p><Link to={`/features/${post.slug}`}>Read &rarr;</Link></p>
                </div>
              </li>
            ))}
          </ol>
          <p className="fg-note">
            Engineering notes on how LastDB is built are in the <Link to="/blog">Dev Blog</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
