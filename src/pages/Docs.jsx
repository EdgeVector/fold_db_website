import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArchFigure from '../components/ArchFigure';

const DOC_PAGES = [
  {
    path: '/docs/install',
    title: 'Install LastDB',
    label: 'Install',
    description: 'The installer script, the same steps by hand, the database on its own, and how to confirm it is running.',
    tone: 'fg-c1',
  },
  {
    path: '/docs/daily-loop',
    title: 'Daily Loop',
    label: 'Use',
    description: 'Brain for notes and decisions, LastSecrets for credentials, and MCP for agents.',
    tone: 'fg-c2',
  },
  {
    path: '/docs/node-health',
    title: 'Node Health',
    label: 'Operate',
    description: 'The health check, the status command, and when a restart is the right step.',
    tone: 'fg-c3',
  },
];

// One node, several named databases. Hand-authored; colours and type come from site.css.
const NODE_FIGURE = `<svg viewBox="0 0 660 436" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;font-family:var(--mono)">
  <defs>
    <pattern id="docs-node-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect x="60" y="24" width="150" height="50" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="135" y="46" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">BRAIN</text>
  <text x="135" y="62" text-anchor="middle" fill="var(--muted)" font-size="10">notes</text>

  <rect x="255" y="24" width="150" height="50" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="330" y="46" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">LASTSECRETS</text>
  <text x="330" y="62" text-anchor="middle" fill="var(--muted)" font-size="10">credentials</text>

  <rect x="450" y="24" width="150" height="50" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="525" y="46" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">YOUR APP</text>
  <text x="525" y="62" text-anchor="middle" fill="var(--muted)" font-size="10">same requests</text>

  <line x1="135" y1="74" x2="135" y2="104" stroke="var(--ink)" stroke-width="1"/>
  <line x1="330" y1="74" x2="330" y2="140" stroke="var(--ink)" stroke-width="1"/>
  <line x1="525" y1="74" x2="525" y2="104" stroke="var(--ink)" stroke-width="1"/>
  <line x1="135" y1="104" x2="525" y2="104" stroke="var(--ink)" stroke-width="1"/>
  <rect x="133" y="102" width="4" height="4" fill="var(--ink)"/>
  <rect x="328" y="102" width="4" height="4" fill="var(--ink)"/>
  <rect x="523" y="102" width="4" height="4" fill="var(--ink)"/>
  <text x="342" y="127" fill="var(--muted)" font-size="10" letter-spacing="1">UNIX SOCKET</text>

  <rect x="40" y="140" width="580" height="160" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="56" y="163" fill="var(--ink)" font-size="11" letter-spacing="1">ONE NODE · LASTDB ON ONE PERSON'S MAC</text>

  <rect x="60" y="178" width="170" height="100" fill="url(#docs-node-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <rect x="70" y="206" width="150" height="44" fill="var(--surface)"/>
  <text x="145" y="225" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">PRIVATE</text>
  <text x="145" y="241" text-anchor="middle" fill="var(--muted)" font-size="10">not shared</text>

  <rect x="245" y="178" width="170" height="100" fill="url(#docs-node-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <rect x="255" y="206" width="150" height="44" fill="var(--surface)"/>
  <text x="330" y="225" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">FAMILY-NOTES</text>
  <text x="330" y="241" text-anchor="middle" fill="var(--muted)" font-size="10">shared · you publish</text>

  <rect x="430" y="178" width="170" height="100" fill="url(#docs-node-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <rect x="440" y="206" width="150" height="44" fill="var(--surface)"/>
  <text x="515" y="225" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">TEAM</text>
  <text x="515" y="241" text-anchor="middle" fill="var(--muted)" font-size="10">shared · by invitation</text>

  <line x1="330" y1="278" x2="330" y2="336" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="515" y1="278" x2="515" y2="336" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 3"/>
  <rect x="245" y="336" width="355" height="46" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="422" y="356" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="0.5">CLOUD · STORES AND PASSES ALONG ENCRYPTED BYTES</text>
  <text x="422" y="372" text-anchor="middle" fill="var(--muted)" font-size="10">it cannot read them</text>

  <line x1="40" y1="398" x2="40" y2="412" stroke="var(--muted)" stroke-width="1"/>
  <line x1="620" y1="398" x2="620" y2="412" stroke="var(--muted)" stroke-width="1"/>
  <line x1="40" y1="405" x2="620" y2="405" stroke="var(--muted)" stroke-width="1"/>
  <text x="330" y="428" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="0.5">ONE NODE PER PERSON · SEVERAL NAMED DATABASES</text>
</svg>`;

// Paste-facing blocks: no `#` comment lines. Interactive zsh does not treat them as comments.
const INSTALL_SCRIPT_1 = `curl -fsSL https://thelastdb.com/install.sh -o install.sh
sh install.sh`;

const INSTALL_SCRIPT_2 = `sh install.sh --accept-install
brain init`;

const INSTALL_HAND_1 = `brew install edgevector/lastdb/lastdb
brew services start lastdb
lastdb status
curl --fail --silent --show-error --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health
lastdb app list
lastdb app install brain lastsecrets`;

const INSTALL_HAND_2 = `lastdb app install brain lastsecrets --accept-install
lastdb app status
brain init`;

const DATABASE_ONLY = `brew install edgevector/lastdb/lastdb
brew services start lastdb`;

const HEALTH = `curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/health`;

const VERSIONS = `lastdb status
lastdb --version
lastdbd --version`;

const BRAIN_WRITE = `brain concept new local-search \\
  --title "Local search" \\
  --body "Embeddings stay on this machine."`;

const BRAIN_READ = `brain get local-search
brain ask "embeddings"`;

const SECRETS_PUT = `lastsecrets init
printf '%s' "$TOKEN" | lastsecrets put my-api-token \\
  --label "My API token" \\
  --provider example \\
  --purpose demo \\
  --env dev \\
  --value-stdin
lastsecrets ref my-api-token`;

function Code({ head, sub, children }) {
  return (
    <div className="fg-code">
      {head && <div className="fg-code-head">{head}{sub && <span>{sub}</span>}</div>}
      <pre>{children}</pre>
    </div>
  );
}

function DocsHelmet({ title, description, path = '/docs' }) {
  const fullTitle = title === 'Docs' ? 'LastDB Docs' : `${title} - LastDB Docs`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={`https://thelastdb.com${path}`} />
    </Helmet>
  );
}

function DocsHeader({ title, heading, lede, description, path }) {
  const index = path === '/docs';
  return (
    <>
      <DocsHelmet title={title} description={description} path={path} />
      <section className="fg-hero">
        <div className="fg-eyebrow">
          {index ? 'Docs' : <Link to="/docs">Docs</Link>} &middot; alpha &middot; macOS on Apple Silicon
        </div>
        <h1>{heading}</h1>
        <div className="fg-hero-row">
          <p>{lede}</p>
          <div className="fg-actions">
            {index
              ? <Link to="/docs/install" className="fg-btn fg-btn-primary">Install LastDB</Link>
              : <Link to="/docs" className="fg-btn">Docs index</Link>}
            <Link to="/developer" className="fg-btn">Developer guide</Link>
          </div>
        </div>
        <p className="fg-note">Last reviewed 16 November 2026 against the installed command line.</p>
      </section>
    </>
  );
}

function RelatedDocs({ currentPath, number }) {
  const related = DOC_PAGES.filter(page => page.path !== currentPath);
  return (
    <section className="fg-section">
      <div className="fg-rail">{number} &middot; Related</div>
      <div className="fg-body">
        <h2>Other pages.</h2>
        <div className="fg-cards">
          {related.map(page => (
            <div className={`fg-cardx ${page.tone}`} key={page.path}>
              <small>{page.label.toUpperCase()}</small>
              <h3><Link to={page.path}>{page.title}</Link></h3>
              <p>{page.description}</p>
            </div>
          ))}
        </div>
        <p className="fg-more">
          <Link to="/developer">Build an app: the developer guide &rarr;</Link>
        </p>
      </div>
    </section>
  );
}

export default function Docs() {
  return (
    <>
      <DocsHeader
        title="Docs"
        path="/docs"
        heading={<>Install, use, and look after <em>your node.</em></>}
        lede="Each person runs one LastDB on their own Mac. That is a node. These pages cover the install, the starter apps, and the checks that show the node is running."
        description="LastDB docs: install the node on your Mac, use the starter apps Brain and LastSecrets, and check that the node is running. Alpha, macOS on Apple Silicon."
      />

      <div role="img" aria-label="Three apps reach one node over a Unix socket. The node holds three named databases: one private and two shared. The shared databases connect to a cloud that stores and passes along encrypted bytes it cannot read.">
        <ArchFigure svg={NODE_FIGURE} caption="Fig. 1 — One node holds several named databases, some private and some shared" />
      </div>

      <section className="fg-section" id="start">
        <div className="fg-rail">01 &middot; Start here</div>
        <div className="fg-body">
          <h2>Three pages for the person who runs a node.</h2>
          <div className="fg-cards">
            {DOC_PAGES.map(page => (
              <div className={`fg-cardx ${page.tone}`} key={page.path}>
                <small>{page.label.toUpperCase()}</small>
                <h3><Link to={page.path}>{page.title}</Link></h3>
                <p>{page.description}</p>
              </div>
            ))}
          </div>
          <p className="fg-note">
            Local use needs no account and no network. Cloud backup is optional. The starter apps are on the <Link to="/apps">Apps</Link> page.
          </p>
        </div>
      </section>

      <section className="fg-section" id="build">
        <div className="fg-rail">
          02 &middot; Build an app
          <p>The requests and the commands are in the developer guide, not here.</p>
        </div>
        <div className="fg-body">
          <h2>For one person first, then many.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3><Link to="/developer#schema">Declare, write, and read by key.</Link></h3>
                <p>An app sends plain HTTP requests over the local Unix socket. That is a complete app for one person. Steps 1 to 7 of the guide.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3><Link to="/developer#share">Share a database.</Link></h3>
                <p>One person, the publisher, shares a whole database by invitation. Everyone invited can read it. The publisher grants writing by schema and can revoke it. Step 8.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3><Link to="/developer#publish">Publish the app.</Link></h3>
                <p>An app has no server. A release is a signed entry in the App Registry, and each person installs it by name. Publishing needs a paid Exemem subscription. Step 9.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="fg-section" id="understand">
        <div className="fg-rail">03 &middot; Understand the system</div>
        <div className="fg-body">
          <h2>The layers and their parts, in one diagram.</h2>
          <p className="fg-lede">
            The interactive guide has 129 parts. Select a part to see its purpose, its connections, and its limits.
            It describes source from 18 November 2026 and covers database-set authorship, snapshot attachments, local sharing approval, and the limits of the new sharing settings.
          </p>
          <p className="fg-more"><a href="/explore/#diagram">Open the interactive guide &rarr;</a></p>
        </div>
      </section>

      <section className="fg-section" id="about-docs">
        <div className="fg-rail">04 &middot; About these pages</div>
        <div className="fg-body">
          <h2>Docs are the current manual.</h2>
          <div className="fg-two">
            <p>
              Docs describe the product as it is now: the install, node health, the starter apps, and daily use.
              LastDB is alpha, so a command can change between releases. Run <code>lastdb --help</code> to see
              the commands on your installed release.
            </p>
            <p>
              The <Link to="/blog">blog</Link> is narrative and dated. When a post describes something that
              later changed, the docs page is the current source.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function DocsInstall() {
  return (
    <>
      <DocsHeader
        title="Install LastDB"
        path="/docs/install"
        heading="Install LastDB"
        lede="Install the node and the starter apps on your Mac. You need Apple Silicon, Homebrew, and Bun on your PATH."
        description="Install LastDB and the starter apps on macOS with Apple Silicon: the installer script, the same steps by hand, the database on its own, and version checks."
      />

      <section className="fg-section" id="script">
        <div className="fg-rail">
          01 &middot; The installer script
          <p>Read it first: <a href="/install.sh">install.sh</a>.</p>
        </div>
        <div className="fg-body">
          <h2>Two runs, with a stop in between.</h2>
          <div className="fg-code-stack">
            <Code head="1. Install LastDB and review the plan">{INSTALL_SCRIPT_1}</Code>
            <Code head="2. Consent to the starter apps">{INSTALL_SCRIPT_2}</Code>
          </div>
          <p className="fg-note">
            The first run installs LastDB, starts the service, prints the install plan for each starter app, and
            stops with <code>RESULT: CONSENT NEEDED</code>. That stop is expected. The second run ends with
            <code> RESULT: PASS</code> when the apps are current and healthy. <code>RESULT: FAIL</code> means a
            step failed, and the line above it says which one. Running the script again is safe.
          </p>
          <p className="fg-note">
            On the first LastDB start, save any recovery phrase in a password manager. Do not put it in a chat,
            a source file, or a log.
          </p>
          <p className="fg-more"><Link to="/#what-it-changes">What the install changes, and how to remove it &rarr;</Link></p>
        </div>
      </section>

      <section className="fg-section" id="by-hand">
        <div className="fg-rail">
          02 &middot; The same steps by hand
          <p>The blocks have no comment lines, so they paste cleanly into zsh.</p>
        </div>
        <div className="fg-body">
          <h2>Homebrew, then the App Registry.</h2>
          <div className="fg-code-stack">
            <Code head="Install the node and ask for the apps">{INSTALL_HAND_1}</Code>
            <Code head="Accept the plan" sub="after you read it">{INSTALL_HAND_2}</Code>
          </div>
          <p className="fg-note">
            The first <code>lastdb app install</code> prints the install plan for each app and stops. Read the plan,
            then run the same command with <code>--accept-install</code>. The install runs each app&rsquo;s own package
            step with Bun and links its commands into <code>~/.local/bin</code>. Nothing edits your shell profile.
          </p>
          <p className="fg-note">
            <code>lastdb app list</code> shows the apps proved with your LastDB release.
            <code> lastdb app install brain</code> installs the proved commit, and
            <code> lastdb app upgrade brain</code> moves an existing install to the newest proved commit.
            <code> lastdb app rollback brain</code> returns it to its previous release.
            If no entry is proved with your release, the install stops. Upgrade LastDB with
            <code> brew upgrade lastdb</code>, or wait for the next proved set.
          </p>
        </div>
      </section>

      <section className="fg-section" id="database-only">
        <div className="fg-rail">03 &middot; Database only</div>
        <div className="fg-body">
          <h2>The node without the apps.</h2>
          <div className="fg-code-stack">
            <Code>{DATABASE_ONLY}</Code>
          </div>
          <div className="fg-two">
            <p>
              The Homebrew package ships <code>lastdbd</code>, the daemon, and <code>lastdb</code>, the command line.
              It does not install a desktop app. Add apps later with <code>lastdb app install</code>.
            </p>
            <p>
              <code>lastdb --help</code> lists the commands on your release. <code>lastdb backup</code> connects cloud
              backup and restores a database. <code>lastdb cloud</code> manages the paid subscription and developer keys.
              <code> lastdb share</code> and <code>lastdb db</code> are covered in the{' '}
              <Link to="/developer#share">developer guide</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="confirm">
        <div className="fg-rail">04 &middot; Confirm it is running</div>
        <div className="fg-body">
          <h2>One request and three versions.</h2>
          <div className="fg-code-stack">
            <Code head="Health" sub={'expect JSON with "status":"ok"'}>{HEALTH}</Code>
            <Code head="Versions">{VERSIONS}</Code>
          </div>
          <p className="fg-note">
            The socket is <code>~/.lastdb/data/folddb.sock</code>. The file name is historical; the product is LastDB.
            Your data is in <code>~/.lastdb</code>.
          </p>
          <p className="fg-more"><Link to="/docs/node-health">More checks: Node Health &rarr;</Link></p>
        </div>
      </section>

      <RelatedDocs currentPath="/docs/install" number="05" />
    </>
  );
}

export function DocsDailyLoop() {
  return (
    <>
      <DocsHeader
        title="Daily Loop"
        path="/docs/daily-loop"
        heading="Daily Loop"
        lede="Two starter apps cover daily use. Brain keeps notes and decisions. LastSecrets keeps credentials. Both store their records in your own node."
        description="Daily use of the LastDB starter apps: Brain for notes and decisions, LastSecrets for credentials, and MCP when an agent needs access to Brain."
      />

      <section className="fg-section" id="split">
        <div className="fg-rail">01 &middot; The split</div>
        <div className="fg-body">
          <h2>Reasoning in one app, credentials in the other.</h2>
          <div className="fg-cards">
            <div className="fg-cardx fg-c4">
              <small>BRAIN</small>
              <h3>Notes and decisions</h3>
              <p>Use Brain for decisions, designs, rationale, preferences, references, and other long-lived context.</p>
            </div>
            <div className="fg-cardx fg-c3">
              <small>LASTSECRETS</small>
              <h3>Credentials</h3>
              <p>Store the value once. Keep only its <code>lastsecrets://</code> reference in notes, docs, and scripts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fg-section" id="loop">
        <div className="fg-rail">
          02 &middot; The loop
          <p>Run <code>brain init</code> once before the first note.</p>
        </div>
        <div className="fg-body">
          <h2>Write it down, read it back, keep secrets out.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>Put durable reasoning in Brain.</h3>
                <div className="fg-code-stack" style={{ marginTop: 14 }}>
                  <Code>{BRAIN_WRITE}</Code>
                </div>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>Read it back by name, or ask with a word from the note.</h3>
                <div className="fg-code-stack" style={{ marginTop: 14 }}>
                  <Code>{BRAIN_READ}</Code>
                </div>
                <p>
                  <code>brain get</code> reads by name. <code>brain ask</code> matches by keyword until LastSeek is
                  installed, so use a term from the body. LastSeek is not in the App Registry yet.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>Keep a credential out of your notes.</h3>
                <div className="fg-code-stack" style={{ marginTop: 14 }}>
                  <Code>{SECRETS_PUT}</Code>
                </div>
                <p>
                  The value goes in on stdin only. <code>lastsecrets ref</code> prints a <code>lastsecrets://</code> locator.
                  Read the value with <code>lastsecrets get</code> only at the point of use.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="fg-section" id="agents">
        <div className="fg-rail">03 &middot; Agents</div>
        <div className="fg-body">
          <h2>Give an agent access to Brain over MCP.</h2>
          <div className="fg-code-stack">
            <Code head="Start the MCP server" sub="over stdio">{`brain mcp`}</Code>
            <Code head="Wire it into Claude Code">{`brain mcp install`}</Code>
          </div>
          <p className="fg-note">
            <code>brain mcp install</code> registers Brain with Claude Code and appends instructions to
            <code> CLAUDE.md</code>. For another client, <code>brain mcp instructions</code> prints the block to paste.
          </p>
        </div>
      </section>

      <RelatedDocs currentPath="/docs/daily-loop" number="04" />
    </>
  );
}

export function DocsNodeHealth() {
  return (
    <>
      <DocsHeader
        title="Node Health"
        path="/docs/node-health"
        heading="Node Health"
        lede="The node is one background service on your Mac. Check it over its Unix socket before you change anything."
        description="Check a LastDB node on your Mac: the socket health request, the status command, and when a restart is the right step."
      />

      <section className="fg-section" id="health">
        <div className="fg-rail">01 &middot; Fast check</div>
        <div className="fg-body">
          <h2>One request to the socket.</h2>
          <div className="fg-code-stack">
            <Code head="Health">{HEALTH}</Code>
          </div>
          <p className="fg-note">
            Expect JSON with <code>{'"status":"ok"'}</code>, the API version, and the node instance id.
            If this succeeds, the node is up.
          </p>
        </div>
      </section>

      <section className="fg-section" id="status">
        <div className="fg-rail">02 &middot; Status</div>
        <div className="fg-body">
          <h2>What the node is doing.</h2>
          <div className="fg-code-stack">
            <Code head="Node" sub="host vitals and request activity">{`lastdb status`}</Code>
            <Code head="Apps" sub="what is installed, and each app's own checks">{`lastdb app status --check`}</Code>
            <Code head="An app read">{`brain get local-search`}</Code>
          </div>
          <p className="fg-note">
            A successful read through an app also shows that the node is reachable. Use the name of a note you have written.
            The same status is available to an app at <code>/api/status</code>; see the{' '}
            <Link to="/developer#health">developer guide</Link>.
          </p>
        </div>
      </section>

      <section className="fg-section" id="restart">
        <div className="fg-rail">03 &middot; Restart boundary</div>
        <div className="fg-body">
          <h2>Restart last, not first.</h2>
          <p className="fg-lede">Restart only after the socket health check fails and ordinary app reads fail.</p>
          <div className="fg-code-stack">
            <Code>{`brew services restart lastdb`}</Code>
          </div>
        </div>
      </section>

      <RelatedDocs currentPath="/docs/node-health" number="04" />
    </>
  );
}
