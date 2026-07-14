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
        <meta name="description" content="Install LastDB and its apps. LastDB is a local encrypted database; Brain, Kanban, and friends are tools that run on top of it." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="What each LastDB app does, and the one install path that gets you running." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p className="bold white">LastDB is a local database on your machine. Apps are tools that read and write that database. There is no account and nothing is hosted for you.</p>

      <p>Think of it like this:</p>

      <pre className="compare-table">{`  LastDB          the database (one process on your Mac)
     │
     ├── Brain         long-term memory / notes
     ├── Kanban        work board
     ├── Situations    “what’s true right now” for ops
     ├── LastSecrets   secret storage (refs, not paste-into-chat)
     └── …             more tools, same database`}</pre>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* INSTALL */}
      <Section variant="sage">
        <h2 id="install"><span className="bold">INSTALL</span> <span className="dim">One recommended path</span></h2>

        <p>You need two things: <span className="bold">LastDB</span> (the database) and the <span className="bold">apps</span> (CLIs that talk to it). The easiest way is <span className="bold">The Last Stack</span> installer &mdash; it installs both.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="green">RECOMMENDED</Label> <span className="dim">Last Stack installs LastDB + the daily apps</span></p>
            <pre>{`# needs: macOS Apple Silicon, Homebrew, and Bun
# Bun: https://bun.sh  →  curl -fsSL https://bun.sh/install | bash

git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps

brew services start lastdb

brain init --grant-consent
kanban init
situations init
lastsecrets init`}</pre>
            <p className="dim">That installer runs <span className="bold">brew install edgevector/lastdb/lastdb</span> for you, clones the apps under <span className="bold">~/lastdb-apps</span>, and puts commands like <span className="bold">brain</span> and <span className="bold">kanban</span> on your PATH.</p>
          </Card>

          <Card>
            <p><Label color="blue">WHAT JUST HAPPENED?</Label></p>
            <pre className="compare-table">{`  last-stack-install-apps
       │
       ├─► brew install lastdb     installs the LastDB database
       ├─► clone app repos         Brain, Kanban, Situations, …
       └─► link CLIs               so \`brain\` / \`kanban\` work in your shell

  brew services start lastdb       keeps LastDB running in the background
  brain init / kanban init         each app sets itself up on your database`}</pre>
          </Card>
        </div>

        <p className="section-subheading"><span className="bold">ALREADY HAVE LASTDB?</span></p>
        <p>If you already installed LastDB with Homebrew, skip the brew step:</p>
        <pre>{`~/.last-stack/bin/last-stack-install-apps --no-brew`}</pre>

        <p className="section-subheading"><span className="bold">DATABASE ONLY</span> <span className="dim">no apps yet</span></p>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health`}</pre>
        <p className="dim">Healthy JSON means LastDB is up. Then come back and install apps with the stack (or clone individual repos below).</p>

        <p className="dim">Want the agent-oriented walkthrough (MCP, skills, daily loop)? See <Link to="/start">Get Started</Link>.</p>
      </Section>

      {/* WHAT APPS DO */}
      <Section variant="lavender">
        <h2 id="catalog"><span className="bold">WHAT EACH APP DOES</span></h2>

        <p>All of these talk to the <span className="bold">same</span> LastDB on your machine. Pick what you need; you do not have to install everything.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">command: <span className="bold">brain</span></span></p>
            <p><span className="bold">Your long-term memory.</span> Decisions, designs, notes, “why we did it this way.” Search in plain English later. The thing agents should write to so the next session is not empty-headed.</p>
            <pre>{`brain put concept caching --title "Cache" --body "chose LRU because …"
brain ask "what did we decide about caching?"`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">KANBAN</Label> <span className="dim">command: <span className="bold">kanban</span></span></p>
            <p><span className="bold">Your work board.</span> Cards move through columns (backlog &rarr; done). Live status of what is in flight &mdash; not the reasoning (that goes in Brain).</p>
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
            <p><span className="bold">Manual product testing evidence.</span> Expected UX as a graph, plus what humans actually saw (notes, screenshots, diffs). Not an automated test runner.</p>
            <pre>{`cd ~/lastdb-apps/dogfood-graph && npm run dev`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">THE LAST STACK</Label> <span className="dim">not a data app</span></p>
            <p><span className="bold">Installer + agent skills.</span> The thing you cloned in the install step. It also teaches coding agents how to use Brain and Kanban (file a card, drive a PR, close out work).</p>
            <pre>{`cd ~/.last-stack && git pull && ./setup`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">ROUTINES</Label> <span className="dim">command: <span className="bold">routines</span></span></p>
            <p><span className="bold">Scheduled agent jobs.</span> One scheduler that runs recurring Claude/Codex tasks (hygiene, digests, board sweeps). Optional; install when you want automation on a timer.</p>
            <pre>{`git clone https://github.com/EdgeVector/routines && cd routines
bun install && bun run install-shim
routines list`}</pre>
          </Card>
        </div>
      </Section>

      {/* EARLY */}
      <Section variant="amber">
        <h2 id="early"><span className="bold">EARLY APPS</span> <span className="dim">Real, not polished for strangers yet</span></h2>

        <p>These already run on LastDB in our own workflow. They are not part of the one-command installer yet.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">LASTGIT</Label></p>
            <p>Git hosting on LastDB. Remotes look like <span className="bold">lastdb:///my-repo</span> instead of GitHub.</p>
          </Card>
          <Card>
            <p><Label color="yellow">CODERINGS</Label></p>
            <p>Track repository size vs the complexity you claim the code should have &mdash; snapshots over time.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DISCOVERY</Label></p>
            <p>Find people and data through friends-of-friends without building a central social graph in the cloud.</p>
          </Card>
        </div>
      </Section>

      {/* MANUAL */}
      <Section variant="slate">
        <h2 id="manual"><span className="bold">INSTALL ONE APP YOURSELF</span> <span className="dim">optional</span></h2>

        <p>Prefer not to use the stack installer? Install LastDB with Homebrew first, then clone only what you want. Examples:</p>

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
            <p className="dim">The GitHub repo is still named <span className="bold">fkanban</span>; the command you type is <span className="bold">kanban</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">SITUATIONS</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/situations && cd situations
bun install
ln -snf "$PWD/bin/situations" ~/.local/bin/situations
situations init`}</pre>
          </Card>
        </div>

        <p className="dim">Source: <a href="https://github.com/EdgeVector/brain" target="_blank" rel="noreferrer">brain</a> &middot; <a href="https://github.com/EdgeVector/fkanban" target="_blank" rel="noreferrer">kanban</a> &middot; <a href="https://github.com/EdgeVector/situations" target="_blank" rel="noreferrer">situations</a> &middot; <a href="https://github.com/EdgeVector/dogfood-graph" target="_blank" rel="noreferrer">dogfood-graph</a> &middot; <a href="https://github.com/EdgeVector/routines" target="_blank" rel="noreferrer">routines</a> &middot; <a href="https://github.com/EdgeVector/last-stack" target="_blank" rel="noreferrer">last-stack</a></p>
      </Section>

      {/* MENTAL MODEL */}
      <Section variant="rose">
        <h2 id="model"><span className="bold">QUICK MENTAL MODEL</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="red">LASTDB</Label></p>
            <p>The database. One local process. Your data stays on your Mac. Installed by Homebrew (directly or via the Last Stack installer).</p>
          </Card>
          <Card>
            <p><Label color="red">APPS</Label></p>
            <p>CLIs and small tools that use LastDB. They do not each ship their own database.</p>
          </Card>
          <Card>
            <p><Label color="red">THE LAST STACK</Label></p>
            <p>Helper repo: installs LastDB + apps for you, and registers agent skills. Not something you “log into.”</p>
          </Card>
          <Card>
            <p><Label color="red">BRAIN VS KANBAN</Label></p>
            <p><span className="bold">Brain = why.</span> <span className="bold">Kanban = what’s in flight.</span> Keep those separate and both stay useful.</p>
          </Card>
        </div>

        <p className="dim">Building your own app on LastDB? <Link to="/developer">Developer Guide</Link>. Prefer a human/agent daily-loop writeup? <Link to="/start">Get Started</Link>.</p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
