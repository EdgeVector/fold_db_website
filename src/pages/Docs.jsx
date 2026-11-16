import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

const DOC_PAGES = [
  {
    path: '/docs/install',
    title: 'Install LastDB',
    label: 'Install',
    description: 'Homebrew install, what ships, data directory, socket, and version checks.',
    status: 'Alpha',
  },
  {
    path: '/docs/daily-loop',
    title: 'Daily Loop',
    label: 'Use',
    description: 'Brain for durable context, LastSecrets for credentials, MCP for agents.',
    status: 'Alpha',
  },
  {
    path: '/docs/node-health',
    title: 'Node Health',
    label: 'Operate',
    description: 'Health checks, status, socket expectations, and the safe restart boundary.',
    status: 'Alpha',
  },
];

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

function DocsHeader({ title, description, path }) {
  return (
    <>
      <DocsHelmet title={title} description={description} path={path} />
      <p><Link to="/" className="link-btn">&larr; Home</Link></p>
      <h1 className="tagline">{title}</h1>
      <p className="bold white">{description}</p>
      <p className="dim docs-reviewed">Last reviewed: 2026-11-15 against the LastDB source. Product status: alpha.</p>
      <p className="hero-cta">
        <Link to="/docs" className="link-btn">Docs index</Link>{'  '}
        <Link to="/#install" className="link-btn">Install</Link>{'  '}
        <Link to="/apps" className="link-btn">Apps</Link>{'  '}
        <Link to="/developer" className="link-btn">Developer</Link>
      </p>
      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}

function RelatedDocs({ currentPath }) {
  const related = DOC_PAGES.filter(page => page.path !== currentPath);
  return (
    <Section variant="slate">
      <h2><span className="bold">RELATED DOCS</span></h2>
      <div className="docs-list">
        {related.map(page => (
          <Card key={page.path}>
            <p><Label color="blue">{page.label}</Label></p>
            <h2><Link to={page.path}>{page.title}</Link></h2>
            <p>{page.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default function Docs() {
  return (
    <>
      <DocsHeader
        title="Docs"
        path="/docs"
        description="Stable LastDB reference pages for installing, using, and operating the local node."
      />

      <Section variant="sage">
        <h2><span className="bold">UNDERSTAND THE SYSTEM</span></h2>
        <p>Explore the layers and their parts with a diagram and plain explanations.</p>
        <p><a href="/explore/#diagram" className="link-btn">Open the interactive guide &rarr;</a></p>
        <p className="dim">The guide describes source from 16 November 2026. Its 127 parts explain saved sharing requests in Social, reusable circles, file upload cleanup, and backup recovery. Select a part to see its purpose, connections, and limits.</p>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">START HERE</span></h2>
        <div className="docs-list">
          {DOC_PAGES.map(page => (
            <Card key={page.path}>
              <p><Label color="yellow">{page.status}</Label></p>
              <h2><Link to={page.path}>{page.title}</Link></h2>
              <p>{page.description}</p>
              <p><Link to={page.path} className="link-btn">Open</Link></p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">WHAT BELONGS IN DOCS</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="green">CURRENT</Label></p>
            <p>Docs describe the present user-facing product: install, node health, first-party apps, and the daily human/agent loop.</p>
          </Card>
          <Card>
            <p><Label color="green">NOT THE BLOG</Label></p>
            <p>The blog stays narrative and dated. Docs stay maintained, task-oriented, and safe to treat as the current manual.</p>
          </Card>
        </div>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">BOUNDARIES</span></h2>
        <p>Public docs avoid private implementation mechanics and retired surfaces. If a post or paper says something historical, the docs page is the current source.</p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}

export function DocsInstall() {
  return (
    <>
      <DocsHeader
        title="Install LastDB"
        path="/docs/install"
        description="Install the local LastDB node and the daily apps on macOS."
      />

      <Section variant="amber">
        <h2><span className="bold">INSTALL LASTDB AND APPS</span></h2>
        <p>This path installs LastDB with Homebrew, then the apps you name from the App Registry.</p>
        <p className="dim">
          Paste-safe for macOS zsh (no <span className="bold">#</span> comment lines — interactive zsh
          does not treat them as comments). Needs Homebrew, Bun, and Apple Silicon.
        </p>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
lastdb status
curl --fail --silent --show-error --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health
lastdb app list
lastdb app install brain lastsecrets`}</pre>
        <p className="dim">
          The first <span className="bold">lastdb app install</span> prints the install plan for each app and stops.
          Read the plan, then run the same command again with <span className="bold">--accept-install</span>.
          Then run <span className="bold">lastdb app status</span> and <span className="bold">brain init</span>.
        </p>
        <p className="dim">The install runs each app&rsquo;s own package step with Bun and links its commands into <span className="bold">~/.local/bin</span>. Bun must be on your PATH first.</p>
        <p className="dim">
          <span className="bold">lastdb app list</span> shows the apps proved with your LastDB build.
          <span className="bold"> lastdb app install brain</span> installs the proved commit, and
          <span className="bold"> lastdb app upgrade brain</span> moves an existing install to the newest proved commit.
          If no entry is proved with your build, the install stops.
        </p>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">DATABASE ONLY</span></h2>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb`}</pre>
        <p>The Homebrew package ships <span className="bold">lastdbd</span>, the local daemon, and <span className="bold">lastdb</span>, the control CLI.</p>
        <p>Run <code>lastdb --help</code> to see the commands on your installed release. The grouped CLI uses
          <code> lastdb backup</code> for cloud connection and fresh-home recovery, <code>lastdb cloud</code> for subscription and developer-key management, and <code>lastdb admin</code> for maintenance.</p>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">CONFIRM IT IS RUNNING</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="blue">HEALTH</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/health`}</pre>
            <p className="dim">Expect JSON with <span className="bold">{`"status":"ok"`}</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">VERSIONS</Label></p>
            <pre>{`lastdb status
lastdb --version
lastdbd --version`}</pre>
          </Card>
        </div>
        <p className="dim">The owner socket is <span className="bold">~/.lastdb/data/folddb.sock</span>.</p>
      </Section>

      <Section variant="lavender">
        <h2><span className="bold">WHAT IS NOT INCLUDED</span></h2>
        <p>The Homebrew path installs the database and its CLI. It does not install a desktop app. Use the local node plus the app CLIs.</p>
      </Section>

      <RelatedDocs currentPath="/docs/install" />
      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}

export function DocsDailyLoop() {
  return (
    <>
      <DocsHeader
        title="Daily Loop"
        path="/docs/daily-loop"
        description="Use Brain for durable context, LastSecrets for credentials, and MCP when agents need tool access."
      />

      <Section variant="lavender">
        <h2><span className="bold">THE SPLIT</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label></p>
            <p>Use Brain for decisions, designs, rationale, preferences, references, and other long-lived context.</p>
          </Card>
          <Card>
            <p><Label color="purple">LASTSECRETS</Label></p>
            <p>Use LastSecrets for credentials. Store the value once, then keep only its <span className="bold">lastsecrets://</span> reference in notes, docs, and scripts.</p>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">HUMAN LOOP</span></h2>
        <div className="card-stack">
          <Card>
            <p><Label color="yellow">1</Label> Put durable reasoning in Brain.</p>
            <pre>{`brain concept new local-search \\
  --title "Local search" \\
  --body "Embeddings stay on this machine."

brain ask "what did we decide about search?"`}</pre>
          </Card>
          <Card>
            <p><Label color="yellow">2</Label> Read it back by name, or ask in plain words.</p>
            <pre>{`brain get local-search
brain search "search"`}</pre>
          </Card>
          <Card>
            <p><Label color="yellow">3</Label> Keep a credential out of your notes.</p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put my-api-token --label "My API token" --value-stdin
lastsecrets ref my-api-token`}</pre>
          </Card>
        </div>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">AGENT SETUP</span></h2>
        <p>Give agents MCP access to Brain when they need to read or write durable state.</p>
        <pre>{`brain mcp`}</pre>
        <p className="dim">Some clients can install the MCP wiring directly from the app CLI, for example <span className="bold">brain mcp install</span>.</p>
      </Section>

      <RelatedDocs currentPath="/docs/daily-loop" />
      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}

export function DocsNodeHealth() {
  return (
    <>
      <DocsHeader
        title="Node Health"
        path="/docs/node-health"
        description="Check the local daemon over its Unix socket."
      />

      <Section variant="sage">
        <h2><span className="bold">FAST HEALTH CHECK</span></h2>
        <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/health`}</pre>
        <p>Expect <span className="bold">{`{"status":"ok"}`}</span>. If this succeeds, the local node is up.</p>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">STATUS</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="blue">NODE</Label></p>
            <pre>{`lastdb status`}</pre>
            <p className="dim">Shows host vitals and request activity.</p>
          </Card>
          <Card>
            <p><Label color="blue">APP READ</Label></p>
            <pre>{`brain ask "what did I decide recently?"`}</pre>
            <p className="dim">A successful socket-backed app read also proves the node is reachable.</p>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">RESTART BOUNDARY</span></h2>
        <p>Restart only after the socket health check fails and ordinary app reads fail.</p>
        <pre>{`brew services restart lastdb`}</pre>
      </Section>

      <RelatedDocs currentPath="/docs/node-health" />
      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
