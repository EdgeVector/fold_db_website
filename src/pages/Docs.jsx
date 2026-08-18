import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';

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
    description: 'Brain for durable context, Kanban for live work, MCP for agents.',
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
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>
      <AsciiTitle text="DOCS" />
      <h1 className="tagline">{title}</h1>
      <p className="bold white">{description}</p>
      <p className="dim docs-reviewed">Last reviewed: 2026-08-18. Product status: alpha.</p>
      <p className="hero-cta">
        <Link to="/docs" className="link-btn">[Docs index]</Link>{'  '}
        <Link to="/#install" className="link-btn">[Install]</Link>{'  '}
        <Link to="/apps" className="link-btn">[Apps]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer]</Link>
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

      <Section variant="amber">
        <h2><span className="bold">START HERE</span></h2>
        <div className="docs-list">
          {DOC_PAGES.map(page => (
            <Card key={page.path}>
              <p><Label color="yellow">{page.status}</Label></p>
              <h2><Link to={page.path}>{page.title}</Link></h2>
              <p>{page.description}</p>
              <p><Link to={page.path} className="link-btn">[Open]</Link></p>
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
        <h2><span className="bold">FULL STACK INSTALL</span></h2>
        <p>This path installs LastDB plus the common first-party app CLIs and the read-only LastDB Browser UI (its launcher is linked as <span className="bold">lastdb-browser</span>).</p>
        <p className="dim">
          Paste-safe for macOS zsh (no <span className="bold">#</span> comment lines — interactive zsh
          does not treat them as comments). Skip the Bun line if already installed; skip the node line
          if <span className="bold">npm --version</span> already works. Needs Homebrew + Apple Silicon.
        </p>
        <pre>{`curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$HOME/.local/bin:$PATH"
brew install node

git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps

brew services start lastdb
brain init --grant-consent
kanban init
situations init
lastsecrets init
org init
search init`}</pre>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">DATABASE ONLY</span></h2>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb`}</pre>
        <p>The Homebrew package ships <span className="bold">lastdbd</span>, the local daemon, and <span className="bold">lastdb</span>, the control CLI.</p>
      </Section>

      <Section variant="slate">
        <h2><span className="bold">CONFIRM IT IS RUNNING</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="blue">HEALTH</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/health`}</pre>
            <p className="dim">Expect <span className="bold">{`{"status":"ok"}`}</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">VERSIONS</Label></p>
            <pre>{`lastdb status
lastdb --version
lastdbd --version`}</pre>
          </Card>
        </div>
        <p className="dim">The owner socket is <span className="bold">~/.lastdb/data/folddb.sock</span>. TCP <span className="bold">:9001</span> is retired.</p>
      </Section>

      <Section variant="lavender">
        <h2><span className="bold">WHAT IS NOT INCLUDED</span></h2>
        <p>No desktop app, DMG, or file-ingestion product surface ships in the current Homebrew path. Use the local node plus app CLIs.</p>
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
        description="Use Brain for durable context, Kanban for live work, and MCP when agents need tool access."
      />

      <Section variant="lavender">
        <h2><span className="bold">THE SPLIT</span></h2>
        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label></p>
            <p>Use Brain for decisions, designs, rationale, preferences, references, and other long-lived context.</p>
          </Card>
          <Card>
            <p><Label color="purple">KANBAN</Label></p>
            <p>Use Kanban for live work state. One card should describe one unit of work and move as reality changes.</p>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">HUMAN LOOP</span></h2>
        <div className="card-stack">
          <Card>
            <p><Label color="yellow">1</Label> Start from the board.</p>
            <pre>{`kanban list`}</pre>
          </Card>
          <Card>
            <p><Label color="yellow">2</Label> Put durable reasoning in Brain.</p>
            <pre>{`brain concept new local-search \\
  --title "Local search" \\
  --body "Embeddings stay on this machine."

brain ask "what did we decide about search?"`}</pre>
          </Card>
          <Card>
            <p><Label color="yellow">3</Label> Track work on cards.</p>
            <pre>{`kanban add ship-login --title "Ship login flow" --tags auth
kanban move ship-login doing`}</pre>
          </Card>
        </div>
      </Section>

      <Section variant="sage">
        <h2><span className="bold">AGENT SETUP</span></h2>
        <p>Give agents MCP access to the app CLIs when they need to read or write durable state.</p>
        <pre>{`brain mcp
kanban mcp`}</pre>
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
        description="Check the local daemon without confusing retired TCP behavior for an outage."
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
            <pre>{`kanban list
brain ask "what did I decide recently?"`}</pre>
            <p className="dim">A successful socket-backed app read also proves the node is reachable.</p>
          </Card>
        </div>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">COMMON CONFUSION</span></h2>
        <p>The legacy TCP endpoint on <span className="bold">127.0.0.1:9001</span> is retired. A connection failure there does not, by itself, mean LastDB is down.</p>
        <p>Prefer the Unix socket path: <span className="bold">~/.lastdb/data/folddb.sock</span>.</p>
      </Section>

      <Section variant="amber">
        <h2><span className="bold">RESTART BOUNDARY</span></h2>
        <p>Restart only after the socket health check fails and ordinary app reads fail. Do not restart just because an old TCP-only command printed a <span className="bold">:9001</span> error.</p>
        <pre>{`brew services restart lastdb`}</pre>
      </Section>

      <RelatedDocs currentPath="/docs/node-health" />
      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
