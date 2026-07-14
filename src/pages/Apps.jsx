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
        <meta name="description" content="What each LastDB app does, plus honest alpha/dogfood/early readiness so you know how rough the edges are." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="LastDB apps with readiness labels: Alpha, Dogfood, Early, Optional." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p className="bold white">LastDB is the database. Apps are tools that use it. Same machine, no account.</p>

      <p>
        <Link to="/#install" className="link-btn">[Install &rarr;]</Link>
        <span className="dim"> &mdash; one copy-paste block on the home page. This page is only <em>what each app is for</em>.</span>
      </p>

      <pre className="compare-table">{`  LastDB          the database (Homebrew)
     │
     ├── Brain         long-term memory      → brain
     ├── Kanban        work board            → kanban
     ├── Situations    ops reality right now → situations
     ├── Dogfood Graph manual UX evidence    → local web app
     └── …             early / optional tools`}</pre>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* READINESS */}
      <Section variant="sage" id="readiness">
        <h2><span className="bold">HOW ROUGH IS THIS?</span> <span className="dim">honest readiness labels</span></h2>

        <p>The whole stack is still product <span className="bold">alpha</span> (macOS Apple Silicon, local-only). These labels are our judgment for strangers &mdash; <span className="bold">not</span> SLAs, test coverage, or measured failure rates. The &ldquo;~%&rdquo; column is only a gut ranking so you can sort; treat the stage name as the real signal.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="green">ALPHA</Label></p>
            <p>We use it daily. Expect sharp edges and CLI churn. Worth installing first.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DOGFOOD</Label></p>
            <p>Installable and useful; more papercuts than Alpha; no support promise.</p>
          </Card>
          <Card>
            <p><Label color="yellow">EARLY</Label></p>
            <p>Real and working for us; not in the default installer; no public one-liner.</p>
          </Card>
          <Card>
            <p><Label color="blue">OPTIONAL</Label></p>
            <p>In the install path when the repo is available to you; skip otherwise.</p>
          </Card>
        </div>

        <pre className="compare-table">{`
APP              STAGE      INSTALLER   ~%    NOTES
${'─'.repeat(72)}
LastDB           Alpha      yes (brew)  ~70   Daily primary daemon; still alpha product
Brain            Alpha      yes         ~75   Longest-lived dogfood; public CLI + MCP
Kanban           Alpha      yes         ~70   Daily board; public repo still named fkanban
Situations       Dogfood    yes         ~55   Agent ops posture; smaller stranger story
Dogfood Graph    Dogfood    yes         ~45   Local web evidence tool; name confuses outsiders
Last Stack       Dogfood    yes*        ~60   Installer + agent skills (*you start here)
LastSecrets      Optional   when avail  ~40   Secret refs; often private / skippable
Routines         Early      no          ~35   Our scheduler fleet; not stranger onboarding
LastGit          Early      no          ~30   lastdb:// git; dogfood/shadow-heavy
CodeRings        Early      no          ~25   Size vs complexity; no public install story
Discovery        Early      no          ~25   FoF discovery; not a public try path`}</pre>

        <p className="dim"><span className="bold">For a first try:</span> install LastDB + Brain + Kanban (and Situations if you run agents). Ignore LastGit / CodeRings / Discovery / Routines until you&rsquo;re curious. Skip LastSecrets unless you need secret refs.</p>
      </Section>

      <Section variant="lavender">
        <h2 id="catalog"><span className="bold">DAILY APPS</span> <span className="dim">in the default installer</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">alpha &middot; command: <span className="bold">brain</span></span></p>
            <p><span className="bold">Long-term memory.</span> Decisions, designs, notes, “why we did it.” Search later in plain English.</p>
            <pre>{`brain concept new caching --title "Cache" --body "chose LRU because …"
brain ask "what did we decide about caching?"
brain list --type concept --limit 5`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">KANBAN</Label> <span className="dim">alpha &middot; command: <span className="bold">kanban</span></span></p>
            <p><span className="bold">Work board.</span> Cards move through columns. Live status of what’s in flight &mdash; not the reasoning (that goes in Brain).</p>
            <pre>{`kanban add ship-login --title "Ship login" --tags auth
kanban move ship-login doing
kanban list`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">SITUATIONS</Label> <span className="dim">dogfood &middot; command: <span className="bold">situations</span></span></p>
            <p><span className="bold">Operational reality right now.</span> Incidents, freezes, “don’t touch CI.” Agents check this before changing shared systems.</p>
            <pre>{`situations list
situations preflight --action enable-ci --repo my-org/my-repo`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">DOGFOOD GRAPH</Label> <span className="dim">dogfood &middot; local web app</span></p>
            <p><span className="bold">Manual product-test evidence.</span> Expected UX as a graph, plus what humans actually saw. Not an automated test runner.</p>
            <pre>{`cd ~/lastdb-apps/dogfood-graph && npm run dev`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">THE LAST STACK</Label> <span className="dim">dogfood &middot; installer + agent skills</span></p>
            <p><span className="bold">Not a data app.</span> The helper from the home-page install. Also teaches coding agents how to use Brain and Kanban.</p>
            <pre>{`cd ~/.last-stack && git pull && ./setup`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">LASTSECRETS</Label> <span className="dim">optional / dogfood</span></p>
            <p><span className="bold">Secret refs.</span> Store a value once; everywhere else keep <span className="bold">lastsecrets://…</span>. Included when the public repo is available; otherwise skip.</p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put api-token --value-stdin
lastsecrets ref api-token`}</pre>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2 id="early"><span className="bold">EARLY</span> <span className="dim">real, not in the default installer</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">ROUTINES</Label> <span className="dim">early</span></p>
            <p>Scheduled agent jobs (Claude / Codex) with a local registry and launchd daemon.</p>
            <pre>{`git clone https://github.com/EdgeVector/routines && cd routines
bun install && bun run install-shim
routines list`}</pre>
          </Card>
          <Card>
            <p><Label color="yellow">LASTGIT</Label> <span className="dim">early</span></p>
            <p>Git hosting on LastDB. Remotes look like <span className="bold">lastdb:///my-repo</span>.</p>
          </Card>
          <Card>
            <p><Label color="yellow">CODERINGS</Label> <span className="dim">early</span></p>
            <p>Repo size vs the complexity you claim the code should have.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DISCOVERY</Label> <span className="dim">early</span></p>
            <p>Friends-of-friends discovery without a central social graph in the cloud.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate">
        <h2 id="manual"><span className="bold">INSTALL ONE APP YOURSELF</span> <span className="dim">optional</span></h2>

        <p>Prefer not to use the stack installer? Install LastDB first:</p>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb`}</pre>
        <p>Then clone only what you want:</p>

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
            <p className="dim">Public repo is still named <span className="bold">fkanban</span>; the command is <span className="bold">kanban</span>.</p>
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
          <Link to="/#install" className="link-btn">[Install (home)]</Link>{'  '}
          <Link to="/start" className="link-btn">[How to use it]</Link>{'  '}
          <Link to="/about" className="link-btn">[About]</Link>
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
