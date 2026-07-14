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
        <title>How to use LastDB</title>
        <meta name="description" content="Daily loop for LastDB: Brain for why, Kanban for what's in flight. MCP and skills for AI agents." />
        <meta property="og:title" content="How to use LastDB" />
        <meta property="og:description" content="After install: the daily loop for humans and agents." />
        <link rel="canonical" href="https://thelastdb.com/start" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <AsciiTitle text="USE" />

      <h1 className="tagline">How to use it</h1>

      <p className="bold white">This page assumes LastDB is already installed.</p>
      <p>
        Not there yet?{' '}
        <Link to="/#install" className="link-btn">[Install on the home page &rarr;]</Link>
      </p>

      <p><span className="bold">Brain</span> is long-term memory. <span className="bold">Kanban</span> is the work board. Same database, different jobs. Catalog: <Link to="/apps">Apps</Link>.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <Section variant="lavender">
        <h2 id="humans"><span className="bold">THE DAILY LOOP</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN = WHY</Label></p>
            <p>Decisions, designs, context. Update existing notes in place instead of starting a new one every time.</p>
          </Card>
          <Card>
            <p><Label color="purple">KANBAN = WHAT&rsquo;S IN FLIGHT</Label></p>
            <p>One card per unit of work. Move it as reality changes. The board is the source of truth for status.</p>
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

      <Section variant="amber">
        <h2 id="agent"><span className="bold">FOR YOUR AGENT</span></h2>

        <p>After install (and <span className="bold">~/.last-stack/setup</span>), point the agent at this page or the home page.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="yellow">MCP</Label> so the agent can read/write Brain and Kanban</p>
            <pre>{`brain mcp
kanban mcp`}</pre>
            <p className="dim">Register those as MCP servers in your client (stdio).</p>
          </Card>

          <Card>
            <p><Label color="yellow">SKILLS</Label></p>
            <p>Last Stack skills teach filing cards, driving one card to a merged PR, waiting on CI, and closing out. Refresh:</p>
            <pre>{`cd ~/.last-stack && git pull && ./setup`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">HOW TO WORK WITH YOU</Label></p>
            <p>Start from <span className="bold">kanban list</span>. Put durable “why” in Brain, not only in chat. One unit of work = one card. Prefer updating existing Brain notes over creating duplicates.</p>
          </Card>
        </div>

        <p className="section-subheading"><span className="bold">IF IT&rsquo;S NOT RESPONDING</span></p>
        <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health
brew services restart lastdb    # only if health fails
kanban list`}</pre>
      </Section>

      <p className="dim">
        <Link to="/" className="link-btn">[Install]</Link>{'  '}
        <Link to="/apps" className="link-btn">[Apps]</Link>{'  '}
        <Link to="/about" className="link-btn">[About]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer]</Link>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
