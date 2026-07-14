import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Apps() {
  return (
    <>
      <Helmet>
        <title>Apps - LastDB</title>
        <meta name="description" content="What each LastDB app does: Brain, Kanban, Situations, LastSecrets, and more — all on one local database." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="Plain-language guide to the apps that run on LastDB." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p className="bold white">LastDB is the database. Apps are tools that use it. Same machine, no account.</p>

      <p>
        <Link to="/#install" className="link-btn">[Install LastDB &rarr;]</Link>
        <span className="dim"> &mdash; one path on the home page. This page is only about <em>what</em> each app is for.</span>
      </p>

      <pre className="compare-table">{`  LastDB          the database
     │
     ├── Brain         long-term memory
     ├── Kanban        work board
     ├── Situations    ops reality right now
     ├── LastSecrets   secret refs (not paste-into-chat)
     └── …             more tools, same database`}</pre>

      <hr className="decorative-rule" aria-hidden="true" />

      <Section variant="lavender">
        <h2 id="catalog"><span className="bold">WHAT EACH APP DOES</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">command: <span className="bold">brain</span></span></p>
            <p><span className="bold">Long-term memory.</span> Decisions, designs, notes, “why we did it.” Search later in plain English. What agents should write so the next session is not empty-headed.</p>
            <pre>{`brain put concept caching --title "Cache" --body "chose LRU because …"
brain ask "what did we decide about caching?"`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">KANBAN</Label> <span className="dim">command: <span className="bold">kanban</span></span></p>
            <p><span className="bold">Work board.</span> Cards move through columns. Live status of what’s in flight &mdash; not the reasoning (that goes in Brain).</p>
            <pre>{`kanban add ship-login --title "Ship login" --tags auth
kanban move ship-login doing
kanban list`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">SITUATIONS</Label> <span className="dim">command: <span className="bold">situations</span></span></p>
            <p><span className="bold">Operational reality right now.</span> Incidents, freezes, “don’t touch CI.” Agents check this before changing shared systems.</p>
            <pre>{`situations list
situations preflight --action enable-ci --repo my-org/my-repo`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">LASTSECRETS</Label> <span className="dim">command: <span className="bold">lastsecrets</span></span></p>
            <p><span className="bold">Secrets that stay out of chat and docs.</span> Store the value once; everywhere else keep a <span className="bold">lastsecrets://…</span> reference.</p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put api-token --value-stdin
lastsecrets ref api-token`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">DOGFOOD GRAPH</Label> <span className="dim">local web app</span></p>
            <p><span className="bold">Manual product-test evidence.</span> Expected UX as a graph, plus what humans actually saw. Not an automated test runner.</p>
            <pre>{`cd ~/lastdb-apps/dogfood-graph && npm run dev`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">THE LAST STACK</Label> <span className="dim">installer + agent skills</span></p>
            <p><span className="bold">Not a data app.</span> The helper you used on the home page to install LastDB and the apps. Also teaches coding agents how to use Brain and Kanban.</p>
            <pre>{`cd ~/.last-stack && git pull && ./setup`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">ROUTINES</Label> <span className="dim">command: <span className="bold">routines</span></span></p>
            <p><span className="bold">Scheduled agent jobs.</span> Optional timer for recurring Claude/Codex work. Not part of the default install.</p>
            <pre>{`git clone https://github.com/EdgeVector/routines && cd routines
bun install && bun run install-shim`}</pre>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2 id="early"><span className="bold">EARLY</span> <span className="dim">real, not polished for strangers yet</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">LASTGIT</Label></p>
            <p>Git hosting on LastDB. Remotes look like <span className="bold">lastdb:///my-repo</span>.</p>
          </Card>
          <Card>
            <p><Label color="yellow">CODERINGS</Label></p>
            <p>Repo size vs the complexity you claim the code should have.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DISCOVERY</Label></p>
            <p>Friends-of-friends discovery without a central social graph in the cloud.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate">
        <h2 id="manual"><span className="bold">INSTALL ONE APP YOURSELF</span> <span className="dim">optional</span></h2>

        <p>Prefer not to use the stack installer? Install LastDB from the <Link to="/#install">home page</Link> (brew), then clone only what you want:</p>

        <div className="card-stack">
          <Card>
            <p><Label color="blue">BRAIN</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/brain && cd brain
bun install && bun link
brain init --grant-consent`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">KANBAN</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun run install-cli
kanban init`}</pre>
            <p className="dim">Repo name is still <span className="bold">fkanban</span>; the command is <span className="bold">kanban</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">SITUATIONS</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/situations && cd situations
bun install
ln -snf "$PWD/bin/situations" ~/.local/bin/situations
situations init`}</pre>
          </Card>
        </div>

        <p className="dim">
          <Link to="/" className="link-btn">[Home / install]</Link>{'  '}
          <Link to="/start" className="link-btn">[How to use it]</Link>{'  '}
          <Link to="/about" className="link-btn">[About]</Link>
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
