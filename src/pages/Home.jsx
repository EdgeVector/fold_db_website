import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import ArchFigure from '../components/ArchFigure';
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

// Draftsman architecture figure: apps as outline clients, LastDB as poché store.
const MODEL_SVG = `<svg viewBox="0 0 660 300" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto"
     font-family="'IBM Plex Mono', monospace">
  <defs>
    <pattern id="home-poche" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>

  <text x="40" y="22" fill="#928374" font-size="10" letter-spacing="1.5">APPS — THIN CLIENTS</text>

  <rect x="40" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="100" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BRAIN</text>
  <text x="100" y="74" text-anchor="middle" fill="#928374" font-size="10">memory</text>

  <rect x="190" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="250" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LASTSECRETS</text>
  <text x="250" y="74" text-anchor="middle" fill="#928374" font-size="10">credentials</text>

  <rect x="340" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="400" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LASTSEEK</text>
  <text x="400" y="74" text-anchor="middle" fill="#928374" font-size="10">search · coming</text>

  <rect x="490" y="36" width="130" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="555" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR APP</text>
  <text x="555" y="74" text-anchor="middle" fill="#83a598" font-size="10">same contract</text>

  <line x1="100" y1="88" x2="100" y2="128" stroke="#928374" stroke-width="1"/>
  <rect x="98" y="86" width="4" height="4" fill="#928374"/>
  <rect x="98" y="126" width="4" height="4" fill="#928374"/>

  <line x1="250" y1="88" x2="250" y2="128" stroke="#928374" stroke-width="1"/>
  <rect x="248" y="86" width="4" height="4" fill="#928374"/>
  <rect x="248" y="126" width="4" height="4" fill="#928374"/>

  <line x1="400" y1="88" x2="400" y2="128" stroke="#928374" stroke-width="1"/>
  <rect x="398" y="86" width="4" height="4" fill="#928374"/>
  <rect x="398" y="126" width="4" height="4" fill="#928374"/>

  <line x1="555" y1="88" x2="555" y2="128" stroke="#83a598" stroke-width="1"/>
  <rect x="553" y="86" width="4" height="4" fill="#83a598"/>
  <rect x="553" y="126" width="4" height="4" fill="#83a598"/>

  <line x1="100" y1="128" x2="555" y2="128" stroke="#928374" stroke-width="1"/>

  <line x1="330" y1="128" x2="330" y2="168" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="126" width="4" height="4" fill="#928374"/>
  <rect x="328" y="166" width="4" height="4" fill="#928374"/>
  <text x="342" y="152" fill="#928374" font-size="10" letter-spacing="1">SOCKET</text>

  <rect x="130" y="170" width="400" height="72" fill="url(#home-poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="200" text-anchor="middle" fill="#ebdbb2" font-size="14" letter-spacing="2">YOUR LASTDB</text>
  <text x="330" y="220" text-anchor="middle" fill="#928374" font-size="11">local · yours · one process</text>

  <line x1="130" y1="256" x2="130" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="530" y1="256" x2="530" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="130" y1="263" x2="530" y2="263" stroke="#928374" stroke-width="1"/>
  <text x="330" y="288" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ONE DATABASE — APPS DO NOT OWN THE DATA</text>
</svg>`;

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
      <div className="hero">
        <p className="dim hero-status">alpha &middot; macOS on Apple Silicon &middot; open source</p>
        <h1 className="tagline">A local database for the tools you build.</h1>
        <p className="hero-sub">
          Your app gets a database on the user&rsquo;s own Mac, with optional encrypted backup and sharing.
          There is no backend for you to run, and you never hold the user&rsquo;s data.
        </p>

        <CopyBlock text={INSTALL_STEP_1} label="Copy" />
        <p className="dim">
          Needs Homebrew and Bun. The script installs LastDB, then shows you a plan before it adds any app.{' '}
          <a href="#install">How the install works</a>.
        </p>

        <p className="hero-cta">
          <a href="https://github.com/EdgeVector/lastdb" target="_blank" rel="noreferrer" className="link-btn">[GitHub]</a>{'  '}
          <Link to="/developer" className="link-btn">[Developer guide]</Link>{'  '}
          <a href="/explore/#diagram" className="link-btn">[How it works]</a>{'  '}
          <a href="https://thelastdb.com/llms.txt" className="link-btn">[llms.txt]</a>
        </p>
      </div>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* PROBLEM */}
      <Section variant="rose" id="problem">
        <h2><span className="bold">THE PROBLEM</span></h2>
        <p>
          An app that stores personal data usually needs a server. You run a database, you write sync,
          and you hold every user&rsquo;s data in an account that you must protect.
        </p>
        <p>
          The next app does all of it again. The user ends up with one copy of their life in each app, and owns none of them.
        </p>
      </Section>

      {/* HOW */}
      <Section variant="sage" id="how">
        <h2><span className="bold">HOW LASTDB WORKS</span></h2>

        <ArchFigure
          svg={MODEL_SVG}
          caption="Fig. 1 — apps are clients of one local database; the data stays with the user"
        />

        <div className="card-stack">
          <Card>
            <p><Label color="green">1</Label> <span className="bold white">The database runs on the user&rsquo;s Mac.</span></p>
            <p>LastDB is one background service. Your app reads and writes it over a local Unix socket. Nothing in this step needs a server of yours.</p>
          </Card>
          <Card>
            <p><Label color="green">2</Label> <span className="bold white">Your app declares what it stores.</span></p>
            <p>A schema names its fields, its primary key, and any alternate keys. Each app keeps its own records. No app owns the database.</p>
          </Card>
          <Card>
            <p><Label color="green">3</Label> <span className="bold white">The user decides what leaves the machine.</span></p>
            <p>Backup to the cloud is optional and encrypted. Sharing a database with another person is an invitation that the user sends.</p>
          </Card>
        </div>

        <p>
          <a href="/explore/#diagram" className="link-btn">[Open the interactive guide &rarr;]</a>
          <span className="dim"> &mdash; every part of the system, with its purpose and its limits.</span>
        </p>
      </Section>

      {/* CODE */}
      <Section variant="lavender" id="code">
        <h2><span className="bold">THREE REQUESTS</span> <span className="dim">declare, write, read</span></h2>
        <p>
          Any language that can send HTTP over a Unix socket can use LastDB. These are the real requests, shown with curl.
        </p>

        <div className="card-stack">
          <Card>
            <p><Label color="purple">DECLARE A SCHEMA</Label> <span className="dim">a note, found by id or by tag</span></p>
            <pre>{CODE_DECLARE}</pre>
          </Card>
          <Card>
            <p><Label color="purple">WRITE A RECORD</Label></p>
            <pre>{CODE_WRITE}</pre>
          </Card>
          <Card>
            <p><Label color="purple">READ IT BY KEY</Label></p>
            <pre>{CODE_READ}</pre>
          </Card>
        </div>

        <p>
          <Link to="/developer" className="link-btn">[Developer guide &rarr;]</Link>
          <span className="dim"> &mdash; alternate keys, key listing, the command line, and errors.</span>
        </p>
      </Section>

      {/* CAPABILITIES */}
      <Section variant="slate" id="capabilities">
        <h2><span className="bold">WHAT YOU GET</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">DATABASE</Label></p>
            <p>Records found by key. A read by key stays fast as the data grows, because no read walks a whole schema.</p>
          </Card>
          <Card>
            <p><Label color="blue">BACKUP</Label></p>
            <p>Encrypted cloud backup, and recovery onto a new Mac. It is optional and needs no name or email address.</p>
          </Card>
          <Card>
            <p><Label color="blue">SHARING</Label></p>
            <p>The user invites another person to a database with <span className="bold">lastdb share</span>. The invitation is encrypted for that person.</p>
          </Card>
          <Card>
            <p><Label color="blue">APP REGISTRY</Label></p>
            <p>A signed list of apps. The user installs an app by name, at a commit that was proved with their LastDB release.</p>
          </Card>
        </div>

        <p className="dim">
          Coming: <span className="bold">LastSeek</span>, semantic search beside the database. It is not in the App Registry yet.
        </p>
      </Section>

      {/* INSTALL */}
      <Section variant="amber" id="install">
        <h2><span className="bold">INSTALL</span> <span className="dim">two steps, about five minutes</span></h2>

        <p>
          <span className="bold white">You need:</span> Apple Silicon, <span className="bold">Homebrew</span>, and{' '}
          <span className="bold">Bun</span>.
          The installer checks for all three and stops if one is missing.
        </p>

        <Card>
          <p>
            <Label color="yellow">1. INSTALL LASTDB</Label>{' '}
            <span className="dim">Homebrew package, service, and the plan for the starter apps</span>
          </p>
          <CopyBlock text={INSTALL_STEP_1} label="Copy" />
          <p className="dim">
            Read the script first: <a href="/install.sh">install.sh</a>.
            The first run installs LastDB, then stops at the apps step and prints the install plan.
            That stop is expected. It ends with <span className="bold">RESULT: CONSENT NEEDED</span>.
            Running the script again is safe.
          </p>
        </Card>

        <Card>
          <p>
            <Label color="yellow">2. CONSENT TO THE STARTER APPS</Label>{' '}
            <span className="dim">brain and lastsecrets</span>
          </p>
          <CopyBlock text={INSTALL_STEP_2} label="Copy" />
          <p className="dim">
            Run this only after you have read the plan from step 1.
            It ends with <span className="bold">RESULT: PASS</span> when the apps are current and healthy.
            Then run <span className="bold">brain init</span> to set up Brain.
          </p>
        </Card>

        <p className="dim" id="what-it-changes">
          <span className="bold white">What it changes</span>
        </p>
        <ul className="dim hero-facts">
          <li>Homebrew installs the <span className="bold">lastdb</span> and <span className="bold">lastdbd</span> commands and starts the LastDB service.</li>
          <li>The App Registry clones each starter app into <span className="bold">~/.local/share/lastdb-apps</span> and links its commands into <span className="bold">~/.local/bin</span>.</li>
          <li>The first app install adds a background job. It checks the registry every 60 seconds and upgrades the apps on the stable channel. It writes its log under <span className="bold">~/.local/state/lastdb-app-registry</span>.</li>
          <li>Each app installs its own packages with Bun.</li>
          <li>It does not edit your shell profile, and it does not install Bun.</li>
        </ul>

        <div className="grid-2" style={{ marginTop: '1em' }}>
          <Card>
            <p><Label color="blue">REMOVE IT</Label> <span className="dim">your data stays</span></p>
            <CopyBlock text={UNINSTALL_STEPS} label="Copy" />
            <p className="dim">
              Your data stays in <span className="bold">~/.lastdb</span>. These steps do not touch it.
              Delete that folder only if you want to lose the data. This cannot be undone.
              Command links in <span className="bold">~/.local/bin</span> may remain. Remove them if they point into the apps folder.
            </p>
          </Card>
          <Card>
            <p><Label color="blue">DATABASE ONLY</Label></p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
lastdb status
curl --fail --silent --show-error --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health`}</pre>
            <p className="dim">Expect <span className="bold">{`{"status":"ok"}`}</span>. Add apps later with <span className="bold">lastdb app install</span>.</p>
          </Card>
        </div>
      </Section>

      {/* STARTER APPS */}
      <Section variant="lavender" id="apps-teaser">
        <h2><span className="bold">STARTER APPS</span> <span className="dim">working examples of apps on LastDB</span></h2>

        <p>
          The installer adds two apps. Both are open source, and both use the same socket requests that your app will.
        </p>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">notes and decisions</span></p>
            <p>Long-term memory for you and for your coding agent. Write a decision once, and find it in a later session.</p>
          </Card>
          <Card>
            <p><Label color="purple">LASTSECRETS</Label> <span className="dim">credentials</span></p>
            <p>Secrets stay in LastDB. Notes, docs, and scripts hold only a <span className="bold">lastsecrets://</span> reference.</p>
          </Card>
        </div>

        <p>
          <Link to="/apps" className="link-btn">[All apps &rarr;]</Link>{'  '}
          <Link to="/start" className="link-btn">[How to use them &rarr;]</Link>
        </p>
      </Section>

      {/* FAQ */}
      <Section variant="sage" id="faq">
        <h2><span className="bold">QUESTIONS</span></h2>
        <dl className="faq">
          {FAQ.map((item) => (
            <div key={item.q} className="faq-item">
              <dt className="bold white">{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* READ MORE */}
      <Section variant="slate" id="next">
        <h2><span className="bold">READ MORE</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="blue">WHY</Label></p>
            <p>The idea behind LastDB: apps as clients of the user&rsquo;s database, not owners of it.</p>
            <p><Link to="/about" className="link-btn">[About &rarr;]</Link></p>
          </Card>
          <Card>
            <p><Label color="blue">HOW WE BUILD IT</Label></p>
            <p>Engineering notes, with measurements: what was slow, what broke, and what we changed.</p>
            <p><Link to="/blog" className="link-btn">[Dev blog &rarr;]</Link></p>
          </Card>
        </div>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
