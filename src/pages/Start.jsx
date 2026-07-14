import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';

export default function Start() {
  return (
    <>
      <Helmet>
        <title>Get Started - LastDB</title>
        <meta name="description" content="Install LastDB and its apps in a few commands. Local encrypted database, no account. Human daily loop and agent setup." />
        <meta property="og:title" content="Get Started - LastDB" />
        <meta property="og:description" content="Get LastDB running on your Mac, add Brain and Kanban, and start the daily loop — yourself or with an AI agent." />
        <link rel="canonical" href="https://thelastdb.com/start" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <AsciiTitle text="START" />

      <h1 className="tagline">Get Started</h1>

      <p className="bold white">LastDB is in <span className="white">alpha</span>. Install it on your Mac, add a couple of apps, and everything stays on your machine &mdash; no signup.</p>

      <p><span className="bold">LastDB</span> is the database. <span className="bold">Brain</span> is long-term memory. <span className="bold">Kanban</span> is the work board. Same database, different tools. Full app list: <Link to="/apps">Apps</Link>.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* INSTALL */}
      <Section variant="sage">
        <h2 id="install"><span className="bold">INSTALL</span> <span className="dim">~5 minutes on Apple Silicon</span></h2>

        <p>You need Homebrew and <a href="https://bun.sh" target="_blank" rel="noreferrer">Bun</a>. Then one installer gives you LastDB <em>and</em> the daily apps:</p>

        <div className="card-stack">
          <Card>
            <p><Label color="green">1 &mdash; BUN</Label> <span className="dim">if you don’t have it</span></p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre>
          </Card>

          <Card>
            <p><Label color="green">2 &mdash; LAST STACK</Label> <span className="dim">installs LastDB + apps</span></p>
            <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps`}</pre>
            <p className="dim">Under the hood this runs <span className="bold">brew install edgevector/lastdb/lastdb</span>, clones Brain / Kanban / Situations / Dogfood Graph / LastSecrets, and links their commands.</p>
          </Card>

          <Card>
            <p><Label color="green">3 &mdash; START LASTDB</Label></p>
            <pre>{`brew services start lastdb
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health`}</pre>
            <p className="dim">You want a healthy JSON response. LastDB is now a background service on your Mac.</p>
          </Card>

          <Card>
            <p><Label color="green">4 &mdash; INIT THE APPS</Label></p>
            <pre>{`brain init --grant-consent
kanban init
situations init
lastsecrets init`}</pre>
          </Card>
        </div>

        <p className="dim">Only want the database, not the apps? <span className="bold">brew install edgevector/lastdb/lastdb</span> is enough &mdash; details on <Link to="/apps">Apps</Link>.</p>
      </Section>

      {/* FOR HUMANS */}
      <Section variant="lavender">
        <h2 id="humans"><span className="bold">THE DAILY LOOP</span> <span className="dim">How to use it</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN = WHY</Label></p>
            <p>Long-lived notes: decisions, designs, context. Update existing notes in place instead of starting new ones every time.</p>
          </Card>
          <Card>
            <p><Label color="purple">KANBAN = WHAT’S IN FLIGHT</Label></p>
            <p>One card per unit of work. Move it as reality changes. The board is the source of truth for status &mdash; not your memory.</p>
          </Card>
        </div>

        <div className="card-stack">
          <Card>
            <p><Label color="blue">1</Label> Start from the board: <span className="bold">kanban list</span></p>
          </Card>
          <Card>
            <p><Label color="blue">2</Label> When a decision settles, write it to Brain:</p>
            <pre>{`brain put concept caching --title "Cache layer" --body "chose LRU; why: …"
brain ask "what did we decide about caching?"`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">3</Label> Track work as cards:</p>
            <pre>{`kanban add ship-login --title "Ship login flow" --tags auth
kanban move ship-login doing`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">4</Label> Keep the split honest: status on the board, reasoning in Brain.</p>
          </Card>
        </div>
      </Section>

      {/* FOR AGENTS */}
      <Section variant="amber">
        <h2 id="agent"><span className="bold">FOR YOUR AGENT</span> <span className="dim">Claude, Codex, or any MCP client</span></h2>

        <p>Point the agent at this page (or <Link to="/apps">Apps</Link>). After the install above:</p>

        <div className="card-stack">
          <Card>
            <p><Label color="yellow">MCP</Label> so the agent can read/write Brain and Kanban</p>
            <pre>{`brain mcp
kanban mcp`}</pre>
            <p className="dim">Register those as MCP servers in your client (stdio).</p>
          </Card>

          <Card>
            <p><Label color="yellow">SKILLS</Label> already installed by <span className="bold">~/.last-stack/setup</span></p>
            <p>Skills teach the agent to file cards, drive one card to a merged PR, wait on CI, and close out work. Update anytime:</p>
            <pre>{`cd ~/.last-stack && git pull && ./setup`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">HOW TO WORK WITH YOU</Label></p>
            <p>Start from <span className="bold">kanban list</span>. Put durable “why” in Brain, not only in the chat. One unit of work = one card. Prefer updating existing Brain notes over creating duplicates.</p>
          </Card>
        </div>

        <p className="section-subheading"><span className="bold">IF IT’S NOT RESPONDING</span></p>
        <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health
brew services restart lastdb    # only if health fails
kanban list                     # cheap check that apps can talk to LastDB`}</pre>
      </Section>

      <p className="dim">App catalog and per-app details: <Link to="/apps">Apps</Link>. Building on the API: <Link to="/developer">Developer Guide</Link>.</p>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
