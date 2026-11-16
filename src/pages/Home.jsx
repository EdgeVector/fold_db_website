import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import CopyBlock from '../components/CopyBlock';

// Paste-facing script: no `#` comment lines.
// Default interactive zsh has interactivecomments OFF, so `# 0) …` is executed
// as shell input → `parse error near ')'` / `command not found: #`.
// Explanations live in the surrounding prose, not in the copy block.
// Commands are the ones the App Registry CLI lists (lastdb app list / install / status).
const INSTALL_STEP_1 = `curl -fsSL https://thelastdb.com/install.sh -o install.sh
sh install.sh`;

const INSTALL_STEP_2 = `sh install.sh --accept-install`;

const UNINSTALL_STEPS = `launchctl bootout "gui/$(id -u)/com.edgevector.lastdb-app-registry"
rm "$HOME/Library/LaunchAgents/com.edgevector.lastdb-app-registry.plist"
rm -rf "$HOME/.local/share/lastdb-apps" "$HOME/.local/state/lastdb-app-registry"
brew services stop lastdb
brew uninstall lastdb`;

// The three requests an app sends. Same shapes as the Developer guide; keep them in step.
const CODE_DECLARE = `curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/schemas/declare \\
  -H "Content-Type: application/json" \\
  -d '{
    "namespace": "notes",
    "schema": {
      "name": "note",
      "schema_type": "Hash",
      "record_keys": {
        "primary": { "kind": "hash" },
        "alternates": { "by_tag": { "kind": "hash" } }
      },
      "fields": ["id", "tag", "body"],
      "field_types": { "id": "String", "tag": "String", "body": "String" }
    }
  }'`;

const CODE_WRITE = `curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/mutation \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "mutation",
    "schema": "notes/note",
    "record": { "id": "n1", "tag": "work", "body": "Ship the page" },
    "key_value": { "hash": "n1", "range": null },
    "alternates": { "by_tag": { "hash": "work", "range": null } },
    "mutation_type": "create",
    "expected": { "type": "absent" }
  }'`;

const CODE_READ = `curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"schema_name":"notes/note","filter":{"HashKey":"n1"}}'`;

const FAQ = [
  {
    q: 'Is it open source?',
    a: (
      <>
        Yes. The database is Apache-2.0 at{' '}
        <a href="https://github.com/EdgeVector/lastdb" target="_blank" rel="noreferrer">github.com/EdgeVector/lastdb</a>.
        The starter apps are public repositories too.
      </>
    ),
  },
  {
    q: 'What does it run on?',
    a: <>macOS on Apple Silicon. There is no Intel, Linux, or Windows release today.</>,
  },
  {
    q: 'Is it ready for production?',
    a: <>No. LastDB is alpha. The storage format and the socket requests can still change between releases.</>,
  },
  {
    q: 'Do I need an account?',
    a: <>Not for local use. Cloud backup connects your database without a name or an email address.</>,
  },
  {
    q: 'What does it cost?',
    a: (
      <>
        The database and the apps are free. Cloud storage for backup is a paid subscription,
        managed with <span className="bold">lastdb cloud payment</span>.
      </>
    ),
  },
  {
    q: 'What does the cloud hold?',
    a: <>Encrypted copies of your data, for backup and recovery. Reads and writes happen on your Mac.</>,
  },
  {
    q: 'Can I query it with SQL?',
    a: (
      <>
        No. LastDB finds a record by its key. A schema declares a primary key and any named alternate keys,
        and every read names one of them. This keeps a read the same speed as the data grows.
      </>
    ),
  },
  {
    q: 'Is there a desktop app?',
    a: <>No. LastDB is a background service with a command line. Apps bring their own interface.</>,
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LastDB - A local database for the tools you build</title>
        <meta name="description" content="LastDB is a local database for the apps you build. It runs on the user's Mac, apps read and write it by key over a Unix socket, and encrypted cloud backup is optional. Open source, alpha." />
        <meta property="og:title" content="LastDB - A local database for the tools you build" />
        <meta property="og:description" content="A database on the user's own Mac, with optional encrypted backup and sharing. No backend for you to run. Open source, alpha." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thelastdb.com" />
        <meta property="og:site_name" content="LastDB" />
        <meta property="og:image" content="https://thelastdb.com/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="LastDB - A local database for the tools you build" />
        <meta name="twitter:description" content="A database on the user's own Mac, with optional encrypted backup and sharing. No backend for you to run." />
        <meta name="twitter:image" content="https://thelastdb.com/favicon.png" />
        <link rel="canonical" href="https://thelastdb.com" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "LastDB",
      "url": "https://thelastdb.com",
      "description": "A local database for the tools you build."
    },
    {
      "@type": "SoftwareApplication",
      "name": "LastDB",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "macOS (Apple Silicon)",
      "license": "https://www.apache.org/licenses/LICENSE-2.0",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "A local database for the apps you build. It runs on the user's Mac; apps read and write it by key over a Unix socket. Local use needs no account. Encrypted cloud backup is optional.",
      "url": "https://thelastdb.com",
      "downloadUrl": "https://github.com/EdgeVector/homebrew-lastdb",
      "codeRepository": "https://github.com/EdgeVector/lastdb",
      "softwareVersion": "alpha"
    }
  ]
}`}</script>
      </Helmet>

      {/* HERO */}
      <section className="fg-hero">
        <div className="fg-eyebrow">A local database &middot; alpha &middot; open source</div>
        <h1>A local database for the tools you build.</h1>
        <div className="fg-hero-row">
          <p>
            Your app gets a database on the user&rsquo;s own Mac, with optional encrypted backup and sharing.
            There is no backend for you to run, and you never hold the user&rsquo;s data.
          </p>
          <div className="fg-actions">
            <a href="#install" className="fg-btn fg-btn-primary">Install LastDB</a>
            <a href="/explore/#diagram" className="fg-btn">See how it connects</a>
          </div>
        </div>
      </section>

      {/* FIGURE */}
      <div
        className="fg-figure"
        role="img"
        aria-label="Three apps connect over a Unix socket to one LastDB on the user's Mac. Encrypted cloud backup and sharing by invitation are optional."
      >
        <div className="fg-figure-row">
          <div className="fg-figure-main">
            <div className="fg-mono-label" style={{ alignSelf: 'flex-start' }}>APPS &mdash; THIN CLIENTS</div>
            <div className="fg-apps">
              <div className="fg-app">BRAIN<small>notes</small></div>
              <div className="fg-app">LASTSECRETS<small>credentials</small></div>
              <div className="fg-app fg-app-yours">YOUR APP<small>same requests</small></div>
            </div>
            <div className="fg-wire" />
            <div className="fg-mono-label">SOCKET</div>
            <div className="fg-wire" />
            <div className="fg-store">
              <span>YOUR LASTDB</span>
              <div><small>local &middot; one service &middot; on the user&rsquo;s Mac</small></div>
            </div>
            <div className="fg-dimension">ONE DATABASE &mdash; APPS DO NOT OWN THE DATA</div>
          </div>
          <div className="fg-figure-side">
            <div className="fg-optional fg-optional-cloud">
              <strong>CLOUD &middot; OPT-IN</strong>
              Encrypted backup, and recovery onto a new Mac.
            </div>
            <div className="fg-optional fg-optional-share">
              <strong>SHARE &middot; BY INVITATION</strong>
              The user invites another person to a database.
            </div>
          </div>
        </div>
        <div className="fg-caption">FIG. 1 &mdash; APPS ARE CLIENTS OF ONE LOCAL DATABASE</div>
      </div>

      {/* 01 PROBLEM */}
      <section className="fg-section" id="problem">
        <div className="fg-rail">01 &middot; The problem</div>
        <div className="fg-body">
          <h2>Every app rebuilds the same backend.</h2>
          <div className="fg-two">
            <p>
              An app that stores personal data usually needs a server. You run a database, you write sync,
              and you hold every user&rsquo;s data in an account that you must protect.
            </p>
            <p>
              The next app does all of it again. The user ends up with one copy of their life in each app,
              and owns none of them.
            </p>
          </div>
        </div>
      </section>

      {/* 02 HOW */}
      <section className="fg-section" id="how">
        <div className="fg-rail">02 &middot; How it works</div>
        <div className="fg-body">
          <h2>Three ideas hold it together.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>The database runs on the user&rsquo;s Mac.</h3>
                <p>LastDB is one background service. Your app reads and writes it over a local Unix socket. Nothing in this step needs a server of yours.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>Your app declares what it stores.</h3>
                <p>A schema names its fields, its primary key, and any alternate keys. Each app keeps its own records. No app owns the database.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3>The user decides what leaves the machine.</h3>
                <p>Backup to the cloud is optional and encrypted. Sharing a database with another person is an invitation that the user sends.</p>
              </div>
            </li>
          </ol>
          <p className="fg-more"><a href="/explore/#diagram">Open the interactive guide &rarr;</a></p>
        </div>
      </section>

      {/* 03 REQUESTS */}
      <section className="fg-section" id="code">
        <div className="fg-rail">
          03 &middot; The requests
          <p>Any language that can send HTTP over a Unix socket can use LastDB. Shown with curl.</p>
        </div>
        <div className="fg-body">
          <h2>Declare, write, read.</h2>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">Declare a schema <span>a note, found by id or by tag</span></div>
              <pre>{CODE_DECLARE}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Write a record</div>
              <pre>{CODE_WRITE}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Read it by key</div>
              <pre>{CODE_READ}</pre>
            </div>
          </div>
          <p className="fg-more"><Link to="/developer">Read the developer guide &rarr;</Link></p>
        </div>
      </section>

      {/* 04 WHAT YOU GET */}
      <section className="fg-section" id="capabilities">
        <div className="fg-rail">04 &middot; What you get</div>
        <div className="fg-body">
          <h2>The parts an app needs, on the device.</h2>
          <div className="fg-cards">
            <div className="fg-cardx fg-c1">
              <small>01 &middot; ON DEVICE</small>
              <h3>Database</h3>
              <p>Records found by key. No read walks a whole schema, so a read stays fast as the data grows.</p>
            </div>
            <div className="fg-cardx fg-c2">
              <small>02 &middot; OPT-IN</small>
              <h3>Backup</h3>
              <p>Encrypted cloud backup, and recovery onto a new Mac. No name or email address.</p>
            </div>
            <div className="fg-cardx fg-c3">
              <small>03 &middot; BY INVITATION</small>
              <h3>Sharing</h3>
              <p>The user invites another person to a database. The invitation is encrypted for that person.</p>
            </div>
            <div className="fg-cardx fg-c4">
              <small>04 &middot; SIGNED</small>
              <h3>App Registry</h3>
              <p>A signed list of apps. The user installs an app by name, at a commit proved with their release.</p>
            </div>
          </div>
          <p className="fg-note">
            Two starter apps show how it is done: <Link to="/apps">Brain</Link> for notes and decisions,
            and <Link to="/apps">LastSecrets</Link> for credentials.
            Coming: LastSeek, semantic search beside the database. It is not in the App Registry yet.
          </p>
        </div>
      </section>

      {/* INSTALL */}
      <section className="fg-band" id="install">
        <div className="fg-band-text">
          <small>Install</small>
          <h2>Two steps, about five minutes.</h2>
          <p>
            You need Apple Silicon, Homebrew, and Bun. The installer checks for all three and stops if one is missing.
            Read the script first: <a href="/install.sh">install.sh</a>.
          </p>
        </div>
        <div className="fg-band-steps">
          <div>
            <h3>1. Install LastDB and review the plan</h3>
            <CopyBlock text={INSTALL_STEP_1} label="Copy" />
            <p>
              The first run installs LastDB, prints the plan for the starter apps, and stops with RESULT: CONSENT NEEDED.
              That stop is expected.
            </p>
          </div>
          <div>
            <h3>2. Consent to the starter apps</h3>
            <CopyBlock text={`${INSTALL_STEP_2}\nbrain init`} label="Copy" />
            <p>It ends with RESULT: PASS when the apps are current and healthy.</p>
          </div>
        </div>
      </section>

      <div className="fg-detail">
        <Card>
          <h3 id="what-it-changes">What it changes</h3>
          <ul>
            <li>Homebrew installs the <code>lastdb</code> and <code>lastdbd</code> commands and starts the LastDB service.</li>
            <li>The App Registry clones each starter app into <code>~/.local/share/lastdb-apps</code> and links its commands into <code>~/.local/bin</code>.</li>
            <li>The first app install adds a background job that checks the registry and upgrades the apps on the stable channel.</li>
            <li>It does not edit your shell profile, and it does not install Bun.</li>
          </ul>
        </Card>
        <Card>
          <h3>Remove it</h3>
          <CopyBlock text={UNINSTALL_STEPS} label="Copy" />
          <p>
            Your data stays in <code>~/.lastdb</code>. Delete that folder only if you want to lose the data.
            This cannot be undone.
          </p>
        </Card>
        <Card>
          <h3>Database only</h3>
          <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
lastdb status`}</pre>
          <p>Add apps later with <code>lastdb app install</code>.</p>
        </Card>
      </div>

      {/* 05 QUESTIONS */}
      <section className="fg-section" id="faq">
        <div className="fg-rail">05 &middot; Questions</div>
        <div className="fg-body">
          <dl className="fg-faq">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="fg-more">
            <Link to="/about">Why LastDB exists &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/blog">How we build it &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
