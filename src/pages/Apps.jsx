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
        <meta name="description" content="Download the usable LastDB app stack: Brain, Kanban, Situations, Dogfood Graph, and LastSecrets. Each is a thin client over your own local LastDB node." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="Install and use the LastDB app stack: Brain, Kanban, Situations, Dogfood Graph, and LastSecrets." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p><span className="bold white">Brain</span>, <span className="bold white">Kanban</span>, <span className="bold white">Situations</span>, <span className="bold white">Dogfood Graph</span>, and <span className="bold white">LastSecrets</span> are open-source apps built on LastDB. Each is a thin client over <span className="bold">your own local LastDB node</span> &mdash; your data never leaves your machine, and there is <span className="bold">no account to sign up for</span> to use them. Install LastDB once, then add the app stack in a couple of minutes.</p>

      <p className="dim">Source: <a href="https://github.com/EdgeVector/fbrain" target="_blank" rel="noreferrer">fbrain</a> &middot; <a href="https://github.com/EdgeVector/fkanban" target="_blank" rel="noreferrer">fkanban</a> &middot; <a href="https://github.com/EdgeVector/fsituations" target="_blank" rel="noreferrer">fsituations</a> &middot; <a href="https://github.com/EdgeVector/dogfood-graph" target="_blank" rel="noreferrer">dogfood-graph</a> &middot; <a href="https://github.com/EdgeVector/lastsecrets" target="_blank" rel="noreferrer">lastsecrets</a></p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* PREREQUISITES */}
      <Section variant="sage">
        <h2 id="prerequisites"><span className="bold">PREREQUISITES</span> <span className="dim">A node and a runtime</span></h2>

        <div className="grid-2">
          <Card><p><Label color="green">1 &mdash; LASTDB NODE</Label></p>
            <p>The apps talk to a local LastDB daemon. Homebrew installs LastDB Mini: the semantic daemon plus a tiny socket/control CLI.</p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health`}</pre>
            <p className="dim">See <Link to="/start">Get Started</Link> for the full setup, including an agent-ready runbook.</p></Card>

          <Card><p><Label color="green">2 &mdash; BUN</Label></p>
            <p>The clients are <span className="bold">Bun / TypeScript</span> &mdash; no Rust toolchain needed. Install Bun (&ge; 1.3.10):</p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre>
            <p className="dim">Already have Bun? Check with <span className="bold">bun --version</span>.</p></Card>
        </div>
      </Section>

      {/* APP STACK */}
      <Section variant="lavender">
        <h2 id="bundle"><span className="bold">INSTALL THE STACK</span> <span className="dim">One command for the usable apps</span></h2>

        <p>The easiest path is the Last Stack installer. It installs the LastDB daemon, clones the usable app repos, installs their dependencies, and links the CLI apps where they expose a command.</p>

        <Card><p><Label color="purple">BUNDLE INSTALLER</Label></p>
          <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps`}</pre>
          <p className="dim">This bundle includes Brain, Kanban, Situations, Dogfood Graph, and LastSecrets. LastGit is intentionally left out until it is stable enough for the public bundle. Full guide: <a href="https://github.com/EdgeVector/last-stack/blob/main/docs/lastdb-apps.md" target="_blank" rel="noreferrer">last-stack/docs/lastdb-apps.md</a>.</p></Card>
      </Section>

      {/* BRAIN */}
      <Section variant="slate">
        <h2 id="fbrain"><span className="bold">BRAIN</span> <span className="dim">A personal brain &middot; the <span className="bold">fbrain</span> CLI</span></h2>

        <p>A CLI knowledge base over LastDB &mdash; eight record types (designs, tasks, concepts, preferences, references, agents, projects, spikes) with semantic search and an MCP server you can wire into any agent.</p>

        <div className="card-stack">
          <Card><p><Label color="blue">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fbrain && cd fbrain
bun install && bun link        # exposes a global \`fbrain\`
fbrain init                    # bootstrap + resolve schemas`}</pre>
            <p><span className="bold">init</span> resolves Brain&rsquo;s published schemas from the cloud registry (no developer account or key required) and ends with a one-time consent prompt &mdash; press <span className="bold">y</span> to let Brain read/write its own namespace on your node. Scripted install? Pass <span className="bold">fbrain init --grant-consent</span>.</p></Card>

          <Card><p><Label color="blue">USE</Label></p>
            <pre>{`fbrain design new "Auth rework" --body "OAuth + passkeys"
fbrain put concept caching --title "Cache layer" --body "..."
fbrain search "how did we do auth"
fbrain ask "what did I note about caching?"
fbrain list
fbrain mcp                     # serve the MCP tools over stdio`}</pre>
            <p className="dim">Run <span className="bold">fbrain --help</span> for the full command set, or <span className="bold">fbrain doctor</span> to health-check your setup.</p></Card>
        </div>
      </Section>

      {/* KANBAN */}
      <Section variant="amber">
        <h2 id="fkanban"><span className="bold">KANBAN</span> <span className="dim">A kanban board &middot; the <span className="bold">fkanban</span> CLI</span></h2>

        <p>A kanban board over LastDB. Cards move through columns (<span className="bold">backlog &rarr; todo &rarr; doing &rarr; review &rarr; done</span>) and every change persists in your node. Ships a CLI and an MCP server.</p>

        <div className="card-stack">
          <Card><p><Label color="yellow">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun link        # exposes a global \`fkanban\`
fkanban init                   # bootstrap + seed the default board`}</pre>
            <p className="dim">No consent prompt &mdash; Kanban writes as the node owner. <span className="bold">init</span> resolves its published schemas and is idempotent.</p></Card>

          <Card><p><Label color="yellow">USE</Label></p>
            <pre>{`fkanban add ship-login --title "Ship login flow" --tags auth,p1
fkanban move ship-login doing
fkanban list
fkanban show ship-login
fkanban mcp                    # serve the MCP tools over stdio`}</pre>
            <p className="dim">Run <span className="bold">fkanban --help</span> for dependencies, boards, and more.</p></Card>
        </div>
      </Section>

      {/* SITUATIONS */}
      <Section variant="sage">
        <h2 id="fsituations"><span className="bold">SITUATIONS</span> <span className="dim">Operational posture &middot; the <span className="bold">fsituations</span> CLI</span></h2>

        <p>Situations records current shared reality that agents must respect before mutating shared systems: active incidents, blocked actions, scoped preflights, and required human clearance.</p>

        <div className="card-stack">
          <Card><p><Label color="green">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fsituations && cd fsituations
bun install
ln -snf "$PWD/bin/fsituations" ~/.local/bin/fsituations
fsituations init`}</pre></Card>

          <Card><p><Label color="green">USE</Label></p>
            <pre>{`fsituations list --json
fsituations preflight --action enable-ci --repo EdgeVector/fold`}</pre>
            <p className="dim">Use this before CI, deployment, automation, release-gate, PR-merge, or production/shared infrastructure changes.</p></Card>
        </div>
      </Section>

      {/* DOGFOOD GRAPH */}
      <Section variant="amber">
        <h2 id="dogfood-graph"><span className="bold">DOGFOOD GRAPH</span> <span className="dim">Manual dogfood evidence</span></h2>

        <p>Dogfood Graph models expected product UX as a graph and records what humans actually observe while walking a workflow. It keeps goal state, evidence, screenshots, and expected-vs-actual diffs together.</p>

        <div className="card-stack">
          <Card><p><Label color="yellow">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/dogfood-graph && cd dogfood-graph
bun install`}</pre></Card>

          <Card><p><Label color="yellow">RUN</Label></p>
            <pre>npm run dev</pre>
            <p className="dim">Dogfood Graph is a local web app, not a global CLI.</p></Card>
        </div>
      </Section>

      {/* LASTSECRETS */}
      <Section variant="slate">
        <h2 id="lastsecrets"><span className="bold">LASTSECRETS</span> <span className="dim">Local secret refs &middot; the <span className="bold">lastsecrets</span> CLI</span></h2>

        <p>LastSecrets stores raw secrets in LastDB while Brain, Kanban, docs, and scripts store stable <span className="bold">lastsecrets://</span> references instead of secret values.</p>

        <div className="card-stack">
          <Card><p><Label color="blue">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/lastsecrets && cd lastsecrets
bun install && bun link
lastsecrets init`}</pre></Card>

          <Card><p><Label color="blue">USE</Label></p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put schema-r2-dev --value-stdin
lastsecrets ref schema-r2-dev
lastsecrets get schema-r2-dev`}</pre>
            <p className="dim">Only retrieve a raw value at the point of use. Do not paste secret values into Brain, Kanban, docs, logs, or PR descriptions.</p></Card>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section variant="lavender">
        <h2 id="how"><span className="bold">WHY NO ACCOUNT</span> <span className="dim">How apps work on LastDB</span></h2>

        <p>Each app runs against <span className="bold">your own single-user node</span> &mdash; on LastDB, the owner of the device is the owner of the data. An app is just a namespaced workspace over your local database, not a hosted service you log into.</p>

        <p>The app&rsquo;s schemas are published <span className="bold">once</span> to the shared schema registry by its author. When you run <span className="bold">init</span>, your node simply <span className="bold">resolves</span> those published schemas &mdash; a read-only lookup that needs no invite, key, or sign-up. Building and publishing a <span className="bold">new</span> app is the only path that requires a developer identity; see the <Link to="/developer">Developer Guide</Link>.</p>

        <pre className="compare-table"><span className="dim">YOU WANT TO...                       WHAT YOU NEED</span>{'\n'}<span className="dim">{'─'.repeat(65)}</span>{'\n'}Run LastDB + use Brain / Kanban      Nothing &mdash; just install{'\n'}Build & publish your own app         A developer identity (see Developer)</pre>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
