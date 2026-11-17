import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// The starter apps the home-page installer puts on a new machine. Keep this in
// step with STARTER_APPS in public/install.sh and with `lastdb app list` on the
// Homebrew stable release.
const STARTER_APPS = [
  {
    name: 'Brain',
    cmd: 'brain',
    what: 'Long-term notes and decisions. Write them once, then find them by name or by keyword.',
    tint: 'fg-c4',
  },
  {
    name: 'LastSecrets',
    cmd: 'lastsecrets',
    what: 'Credentials kept in your LastDB. Other tools hold only a lastsecrets:// reference.',
    tint: 'fg-c1',
  },
];

// Commands are the ones `lastdb app --help` and its subcommand help list.
const CODE_REGISTRY_INSTALL = `lastdb app list
lastdb app install brain
lastdb app install brain --accept-install`;

const CODE_REGISTRY_KEEP = `lastdb app status
lastdb app status brain --check
lastdb app upgrade brain
lastdb app rollback brain`;

const CODE_TRY_BRAIN = `brain init
brain concept new caching --title "Cache" --body "chose LRU because the working set is small"
brain get caching
brain ask "what did we decide about caching?"`;

const CODE_TRY_LASTSECRETS = `lastsecrets init
printf '%s' "$TOKEN" | lastsecrets put my-api-token \\
  --label "My API token" \\
  --provider example \\
  --purpose demo \\
  --env dev \\
  --value-stdin
lastsecrets ref my-api-token
lastsecrets list`;

export default function Apps() {
  return (
    <>
      <Helmet>
        <title>Apps - LastDB</title>
        <meta name="description" content="The apps you can install on LastDB today from the App Registry: Brain and LastSecrets. Each runs on your own Mac, against your own LastDB. Commands to install and try each one." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="What you can install on LastDB today, and how to try it." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>

      {/* HERO */}
      <section className="fg-hero">
        <div className="fg-eyebrow">App Registry &middot; alpha &middot; macOS on Apple Silicon</div>
        <h1>Apps on LastDB</h1>
        <div className="fg-hero-row">
          <p>
            Each person runs one LastDB on their own Mac. That is a node. An app is a program on the same Mac
            that reads and writes the node over a local Unix socket. This page lists the apps you can install today.
          </p>
          <div className="fg-actions">
            <Link to="/#install" className="fg-btn fg-btn-primary">Install on Home</Link>
            <Link to="/start" className="fg-btn">How to use it</Link>
          </div>
        </div>
      </section>

      {/* 01 THE APP REGISTRY */}
      <section className="fg-section" id="registry">
        <div className="fg-rail">
          01 &middot; The App Registry
          <p>How apps get on your machine.</p>
        </div>
        <div className="fg-body">
          <h2>Install an app by name.</h2>
          <div className="fg-two">
            <p>
              An app has no server. A release is a signed entry in the App Registry, and the app runs on your Mac.
              You install it by name. No account is needed, and the apps are free.
            </p>
            <p>
              Each listed app was proved with a specific LastDB release in a fresh home. Install checks out that
              exact commit, not <span className="bold">main</span>. If no entry is proved with your release, install stops.
            </p>
          </div>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">List, read the plan, then consent</div>
              <pre>{CODE_REGISTRY_INSTALL}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Check, upgrade, go back</div>
              <pre>{CODE_REGISTRY_KEEP}</pre>
            </div>
          </div>
          <p className="fg-note">
            <span className="bold">list</span> shows the apps for your release. The list changes as apps are proved, so trust it over this page.
            The first <span className="bold">install</span> prints the install plan and stops. Read the plan, then repeat the command with{' '}
            <span className="bold">--accept-install</span>.
            The install runs the app&rsquo;s own package step with Bun and links its commands into <span className="bold">~/.local/bin</span>.
            {' '}<span className="bold">status --check</span> runs the app&rsquo;s own checks.
            {' '}<span className="bold">rollback</span> returns an app to its previous release.
          </p>
        </div>
      </section>

      {/* 02 STARTER APPS */}
      <section className="fg-section" id="starter">
        <div className="fg-rail">
          02 &middot; Starter apps
          <p>What the installer adds.</p>
        </div>
        <div className="fg-body">
          <h2>Two apps to start with.</h2>
          <div className="fg-cards">
            {STARTER_APPS.map((app) => (
              <div className={`fg-cardx ${app.tint}`} key={app.name}>
                <small>COMMAND &middot; <span style={{ fontFamily: 'var(--mono)', textTransform: 'none', letterSpacing: 0 }}>{app.cmd}</span></small>
                <h3>{app.name}</h3>
                <p>{app.what}</p>
              </div>
            ))}
          </div>
          <p className="fg-note">
            Both are command-line tools. Each keeps its own records in your LastDB.
          </p>
        </div>
      </section>

      {/* 03 TRY THEM */}
      <section className="fg-section" id="try">
        <div className="fg-rail">
          03 &middot; Try them
          <p>After install.</p>
        </div>
        <div className="fg-body">
          <h2>First commands for each app.</h2>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">Brain <span>write a note, read it by name, find it by keyword</span></div>
              <pre>{CODE_TRY_BRAIN}</pre>
            </div>
          </div>
          <p className="fg-note">
            <span className="bold">brain get</span> reads the note by name. <span className="bold">brain ask</span> matches by keyword until LastSeek is installed.
          </p>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">LastSecrets <span>store a credential, print its reference</span></div>
              <pre>{CODE_TRY_LASTSECRETS}</pre>
            </div>
          </div>
          <p className="fg-note">
            The value goes in on stdin, never on the command line.
            <span className="bold"> lastsecrets ref</span> prints a <span className="bold">lastsecrets://…</span> reference.
            <span className="bold"> list</span> always prints <span className="bold">value=&lt;redacted&gt;</span>.
          </p>
          <p className="fg-more"><Link to="/start">Daily use: how to use it &rarr;</Link></p>
        </div>
      </section>

      {/* 04 COMING */}
      <section className="fg-section" id="coming">
        <div className="fg-rail">
          04 &middot; Coming
          <p>Not installable yet.</p>
        </div>
        <div className="fg-body">
          <h2>LastSeek.</h2>
          <p className="fg-lede">
            LastSeek is semantic search for LastDB: ask in plain words and find a record by meaning.
            It is not in the App Registry yet. Until it is, Brain finds notes by name and by keyword.
          </p>
        </div>
      </section>

      {/* 05 YOUR OWN APP */}
      <section className="fg-section" id="yours">
        <div className="fg-rail">05 &middot; Your own app</div>
        <div className="fg-body">
          <h2>Build one on the same socket.</h2>
          <div className="fg-two">
            <p>
              The apps on this page are apps on one person&rsquo;s node. Your app uses the same socket.
              Declare a schema, then write and read records by key. That is a complete app for one person,
              and it needs no account and no subscription.
            </p>
            <p>
              The <Link to="/developer">Developer guide</Link> has the requests.
              Step 8 shows how people <Link to="/developer#share">share a database</Link>.
              Step 9 shows how to <Link to="/developer#publish">publish your app</Link> to the App Registry,
              which needs a paid Exemem subscription. People who install a published app pay nothing to use it.
            </p>
          </div>
          <p className="fg-more"><Link to="/developer">Developer guide &rarr;</Link></p>
        </div>
      </section>
    </>
  );
}
