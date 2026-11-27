import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import CopyBlock from '../components/CopyBlock';
import HubToMesh from '../components/HubToMesh';

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
launchctl bootout "gui/$(id -u)/com.edgevector.lastdbd"
rm "$HOME/Library/LaunchAgents/com.edgevector.lastdbd.plist"
rm "$HOME/.local/bin/lastdb"`;

// The write request an app sends. Same shape as the Developer guide; keep them in step.
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

// Sharing, as the lastdb CLI does it. Ana publishes a database and invites Ben.
const CODE_SHARE_CONTACT = `lastdb share contact --out ben.contact`;

const CODE_SHARE_INVITE = `lastdb db create family-notes
lastdb --db family-notes share invite \\
  --recipient ben.contact --recipient-key "$BEN_KEY" \\
  --out ben.invite`;

const CODE_SHARE_ACCEPT = `lastdb share accept --publisher "$ANA_KEY" \\
  --name family-notes ben.invite`;

const CODE_PUBLISH = `lastdb app publish --manifest manifest.json`;

const CODE_APP_INSTALL = `lastdb app install your-app`;

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
    q: 'Who pays for the cloud?',
    a: (
      <>
        The developer does. To publish an app you need a paid Exemem subscription. Exemem is the cloud service
        that LastDB uses for backup and sharing. People who use a published app pay nothing to use it.
        Building and running an app on your own Mac needs no subscription either.
      </>
    ),
  },
  {
    q: 'What happens when two people change the same record?',
    a: (
      <>
        In a shared database, changes from other people go to the publisher&rsquo;s LastDB, which accepts them in order.
        A change that was made against an older version of a record is discarded, and the app can try again.
        On one person&rsquo;s own devices, the later write to a record wins, and it replaces the whole record.
        LastDB does not merge field by field.
      </>
    ),
  },
  {
    q: 'Does it work offline?',
    a: (
      <>
        Yes, for a person&rsquo;s own data. Reads and writes happen on their Mac. A change to a shared database
        is sent when the machine is next online, and other people see it after the publisher&rsquo;s LastDB accepts it.
      </>
    ),
  },
  {
    q: 'People can modify my app on their own machine. What stops bad writes?',
    a: (
      <>
        The check does not live in your app. The publisher&rsquo;s LastDB checks every change from another person
        against the sharing rules and the schema, and drops the ones that fail. There is no place to run
        your own server-side rules, so design for people who chose to share with each other.
      </>
    ),
  },
  {
    q: 'How many people can share one database?',
    a: (
      <>
        The design has no fixed limit: every member&rsquo;s machine holds the database, and no server coordinates writes.
        We have not measured the ceiling yet. A run with 1,000 writers is next, and the result will be published here.
      </>
    ),
  },
  {
    q: 'Is this a blockchain or a peer-to-peer network?',
    a: (
      <>
        No. There are no tokens, no consensus, and no peer discovery. Machines talk to an encrypted cloud relay
        that stores bytes it cannot read.
      </>
    ),
  },
  {
    q: 'What does a person who uses my app install?',
    a: (
      <>
        LastDB, and then your app by name from the App Registry. The app brings its own interface.
        The apps published today are command-line tools.
      </>
    ),
  },
  {
    q: 'What does the cloud hold?',
    a: <>Encrypted copies of your data, for backup, recovery, and sharing. It cannot read them. Reads and writes happen on your Mac.</>,
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

// The questions, in three groups. Every question in FAQ appears in exactly one group.
const FAQ_GROUPS = [
  ['The product', [
    'Is it open source?', 'What does it run on?', 'Is it ready for production?',
    'Can I query it with SQL?', 'Is there a desktop app?', 'Is this a blockchain or a peer-to-peer network?',
  ]],
  ['Building with it', [
    'What does a person who uses my app install?', 'What happens when two people change the same record?',
    'Does it work offline?', 'People can modify my app on their own machine. What stops bad writes?',
    'How many people can share one database?',
  ]],
  ['Cost and the cloud', [
    'Do I need an account?', 'What does it cost?', 'Who pays for the cloud?', 'What does the cloud hold?',
  ]],
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LastDB - Massively multi-user apps with no central database</title>
        <meta name="description" content="Build multi-user apps with no central database. Each person keeps their own data in LastDB on their own Mac and shares what they choose over an end-to-end encrypted cloud. Your code runs on their machines. Open source, alpha." />
        <meta property="og:title" content="LastDB - Massively multi-user apps with no central database" />
        <meta property="og:description" content="Each person keeps their own data on their own Mac and shares what they choose over an end-to-end encrypted cloud. Your app runs on those machines. You host nothing. Open source, alpha." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thelastdb.com" />
        <meta property="og:site_name" content="LastDB" />
        <meta property="og:image" content="https://thelastdb.com/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="LastDB - Massively multi-user apps with no central database" />
        <meta name="twitter:description" content="Each person keeps their own data on their own Mac and shares what they choose. Your app runs on those machines. You host nothing." />
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
      "description": "Massively multi-user apps with no central database."
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
        <div className="fg-eyebrow">One node per person &middot; alpha &middot; open source</div>
        <h1>Massively multi-user apps with <em>no central database.</em></h1>
        <div className="fg-hero-row">
          <p>
            Each person keeps their own data on their own Mac and shares what they choose, end-to-end encrypted.
            Your code runs on their machines, and you host nothing.
          </p>
          <div className="fg-actions">
            <a href="#install" className="fg-btn fg-btn-primary">Install LastDB</a>
            <a href="/explore/#share" className="fg-btn">See how it connects</a>
          </div>
        </div>
      </section>

      {/* THE SHAPE: one picture that changes from a hub into a mesh */}
      <HubToMesh />

      <div className="fg-points">
        <div>
          <small>Shape</small>
          <h3>No database holds everyone.</h3>
          <p>
            Every person has their own database, on their own machine. People share databases with each other:
            a family, a team, a club. Picture a social network where each person holds their own posts
            and decides who receives them.
          </p>
        </div>
        <div>
          <small>Scale</small>
          <h3>Every new user brings their own machine.</h3>
          <p>
            Each person&rsquo;s Mac stores their data and runs your code, so a thousand users are a thousand machines
            doing their own work. You have no backend to scale, because you have no backend.
          </p>
        </div>
        <div>
          <small>Code</small>
          <h3>Your code runs next to the data. Any code.</h3>
          <p>
            A shared database is not behind someone&rsquo;s API. Every member&rsquo;s machine holds it, so your app
            works on it directly, with your own logic, in any language. A feed, a marketplace, a game, a ledger:
            if you can write it, it runs.
          </p>
        </div>
        <div>
          <small>Cloud</small>
          <h3>The cloud carries it and cannot read it.</h3>
          <p>
            All of your code runs on your users&rsquo; machines. The cloud stores and passes along
            end-to-end encrypted bytes. It runs none of your logic, and you host nothing.
          </p>
        </div>
      </div>

      {/* 01 PROBLEM */}
      <section className="fg-section" id="problem">
        <div className="fg-rail">01 &middot; The problem</div>
        <div className="fg-body">
          <h2>A multi-user app starts with a database of everyone.</h2>
          <div className="fg-two">
            <p>
              To let people use an app together, you usually build one place that holds all of them.
              You run that database, you write the sync, and you hold every user&rsquo;s data
              in an account that you must protect.
            </p>
            <p>
              The next app does all of it again. People end up with one copy of their life in each app,
              and own none of them. LastDB starts from the other end: one person, one database, on their own machine.
            </p>
          </div>
        </div>
      </section>

      {/* 02 HOW */}
      <section className="fg-section" id="how">
        <div className="fg-rail">02 &middot; First, one person</div>
        <div className="fg-body">
          <h2>Build it for one person first.</h2>
          <div
            className="fg-figure fg-figure-inline"
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
            <div className="fg-caption">FIG. 2 &mdash; APPS ARE CLIENTS OF ONE LOCAL DATABASE</div>
          </div>
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
                <h3>It is a complete app at this point.</h3>
                <p>One person can use it with no account and no network. Encrypted cloud backup is optional. Nothing below this line is needed until two people want to use the app together.</p>
              </div>
            </li>
          </ol>
          <p className="fg-more"><a href="/explore/#diagram">Open the interactive guide &rarr;</a></p>
        </div>
      </section>

      {/* 03 REQUESTS */}
      <section className="fg-section" id="code">
        <div className="fg-rail">
          03 &middot; The requests, for one person
          <p>Any language that can send HTTP over a Unix socket can use LastDB. Shown with curl.</p>
        </div>
        <div className="fg-body">
          <h2>Declare, write, read.</h2>
          <p className="fg-lede">
            An app sends three requests: it declares a schema, writes a record, and reads it back by key.
            All three are plain HTTP with a JSON body. This is the write.
          </p>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">Write a record <span>a note, found by id or by tag</span></div>
              <pre>{CODE_WRITE}</pre>
            </div>
          </div>
          <p className="fg-more"><Link to="/developer">See all three in the developer guide &rarr;</Link></p>
        </div>
      </section>

      {/* 04 MANY USERS */}
      <section className="fg-section" id="share">
        <div className="fg-rail">
          04 &middot; Then, many people
          <p>Shown with the lastdb command line. An app calls the same operations for its users.</p>
        </div>
        <div className="fg-body">
          <h2>Then let them share a database.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>One person publishes a database.</h3>
                <p>A database is shared whole. Data for a different audience goes in a different database, so a person can hold one for family, one for a team, and one that stays private.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>They invite people, and choose who can write.</h3>
                <p>An invitation is encrypted for one recipient. Everyone invited can read the database. The publisher grants writing by schema, and can take access away again.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3>The publisher&rsquo;s LastDB checks every change.</h3>
                <p>A change from another person arrives encrypted. The publisher&rsquo;s own LastDB checks it against the sharing rules and the schema before anyone else receives it. A modified copy of your app cannot write what the rules do not allow.</p>
              </div>
            </li>
          </ol>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">Ben exports a contact file <span>and sends it to Ana</span></div>
              <pre>{CODE_SHARE_CONTACT}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Ana creates a database and invites Ben</div>
              <pre>{CODE_SHARE_INVITE}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Ben accepts <span>the database appears on his Mac and stays in step</span></div>
              <pre>{CODE_SHARE_ACCEPT}</pre>
            </div>
          </div>
          <p className="fg-note">
            Ana and Ben give each other their public keys over a channel they already trust.
            Your app then sends the same declare, write, and read requests, addressed to the shared database.
            The cloud in between stores and passes along encrypted bytes. It is not a peer-to-peer network or a blockchain.
          </p>
        </div>
      </section>

      {/* 05 PUBLISH */}
      <section className="fg-section" id="publish">
        <div className="fg-rail">05 &middot; Publish</div>
        <div className="fg-body">
          <h2>Build it on your own data. Publish it to everyone.</h2>
          <div className="fg-two">
            <p>
              You build and run the app on your own Mac, against your own data. What you ran is what everyone gets.
              There is nothing to deploy: a release is a signed entry in the App Registry that names the app,
              its schemas, and the commit to install.
            </p>
            <p>
              Each person installs the app by name. It runs on their Mac, against their own LastDB
              and the databases they share. An update is a new entry that their LastDB checks before it installs.
              Publishing needs a paid Exemem subscription. Building and running locally does not,
              and the people who install your app pay nothing to use it.
            </p>
          </div>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">You publish <span>signed with your publisher key</span></div>
              <pre>{CODE_PUBLISH}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Each person installs</div>
              <pre>{CODE_APP_INSTALL}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 06 WHAT YOU GET */}
      <section className="fg-section" id="capabilities">
        <div className="fg-rail">06 &middot; What you get</div>
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
              <p>Encrypted cloud backup, and recovery onto a new Mac. No name or email address. The cloud cannot read it.</p>
            </div>
            <div className="fg-cardx fg-c3">
              <small>03 &middot; BY INVITATION</small>
              <h3>Sharing</h3>
              <p>A person publishes a database and invites others. Their LastDB checks every change that comes back.</p>
            </div>
            <div className="fg-cardx fg-c4">
              <small>04 &middot; SIGNED</small>
              <h3>App Registry</h3>
              <p>A signed list of apps. You publish to it, and each person installs by name. There is no server to deploy.</p>
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
            You need Apple Silicon and Bun. The installer checks for both and stops if one is missing.
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
            <li>The installer downloads the signed stable release, checks its hash, and sets LastDB up as a login service that updates itself. See <Link to="/docs/upgrading">Upgrading LastDB</Link>.</li>
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
lastdb service install
lastdb status`}</pre>
          <p>Add apps later with <code>lastdb app install</code>.</p>
        </Card>
      </div>

      {/* 05 QUESTIONS */}
      <section className="fg-section" id="faq">
        <div className="fg-rail">07 &middot; Questions</div>
        <div className="fg-body">
          {FAQ_GROUPS.map(([title, questions]) => (
            <div className="fg-faq-group" key={title}>
              <h3>{title}</h3>
              <dl className="fg-faq">
                {FAQ.filter((item) => questions.includes(item.q)).map((item) => (
                  <div key={item.q}>
                    <dt>{item.q}</dt>
                    <dd>{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <p className="fg-more">
            <Link to="/about">Why LastDB exists &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/blog">How we build it &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
