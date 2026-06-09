import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Apps() {
  return (
    <>
      <Helmet>
        <title>Apps - Fold DB</title>
        <meta name="description" content="fbrain and fkanban are open-source apps built on FoldDB. Each is a thin client over your own local FoldDB node — install FoldDB once, then add the apps. No account needed to use them." />
        <meta property="og:title" content="Apps - Fold DB" />
        <meta property="og:description" content="Install and use fbrain (a personal brain) and fkanban (a kanban board) on top of FoldDB." />
        <link rel="canonical" href="https://folddb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on FoldDB</h1>

      <p><span className="bold white">fbrain</span> and <span className="bold white">fkanban</span> are open-source apps (MIT) built on FoldDB. Each is a thin client over <span className="bold">your own local FoldDB node</span> &mdash; your data never leaves your machine, and there is <span className="bold">no account to sign up for</span> to use them. Install FoldDB once, then add an app in a couple of minutes.</p>

      <p className="dim">Source: <a href="https://github.com/EdgeVector/fbrain" target="_blank" rel="noreferrer">github.com/EdgeVector/fbrain</a> &middot; <a href="https://github.com/EdgeVector/fkanban" target="_blank" rel="noreferrer">github.com/EdgeVector/fkanban</a></p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* PREREQUISITES */}
      <Section variant="sage">
        <h2 id="prerequisites"><span className="bold">PREREQUISITES</span> <span className="dim">A node and a runtime</span></h2>

        <div className="grid-2">
          <Card><p><Label color="green">1 &mdash; FOLDDB NODE</Label></p>
            <p>The apps talk to a local FoldDB daemon. Install it from the Homebrew tap and start it:</p>
            <pre>{`brew install edgevector/folddb/folddb
brew services start folddb
curl -s http://127.0.0.1:9001/api/health`}</pre>
            <p className="dim">See the <Link to="/guide#install">Guide</Link> for other install options.</p></Card>

          <Card><p><Label color="green">2 &mdash; BUN</Label></p>
            <p>The clients are <span className="bold">Bun / TypeScript</span> &mdash; no Rust toolchain needed. Install Bun (&ge; 1.3.10):</p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre>
            <p className="dim">Already have Bun? Check with <span className="bold">bun --version</span>.</p></Card>
        </div>
      </Section>

      {/* FBRAIN */}
      <Section variant="slate">
        <h2 id="fbrain"><span className="bold">FBRAIN</span> <span className="dim">A personal brain</span></h2>

        <p>A CLI knowledge base over FoldDB &mdash; eight record types (designs, tasks, concepts, preferences, references, agents, projects, spikes) with semantic search and an MCP server you can wire into any agent.</p>

        <div className="card-stack">
          <Card><p><Label color="blue">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fbrain && cd fbrain
bun install && bun link        # exposes a global \`fbrain\`
fbrain init                    # bootstrap + resolve schemas`}</pre>
            <p><span className="bold">init</span> resolves fbrain&rsquo;s published schemas from the cloud registry (no developer account or key required) and ends with a one-time consent prompt &mdash; press <span className="bold">y</span> to let fbrain read/write its own namespace on your node. Scripted install? Pass <span className="bold">fbrain init --grant-consent</span>.</p></Card>

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

      {/* FKANBAN */}
      <Section variant="amber">
        <h2 id="fkanban"><span className="bold">FKANBAN</span> <span className="dim">A kanban board</span></h2>

        <p>A kanban board over FoldDB. Cards move through columns (<span className="bold">backlog &rarr; todo &rarr; doing &rarr; review &rarr; done</span>) and every change persists in your node. Ships a CLI and an MCP server.</p>

        <div className="card-stack">
          <Card><p><Label color="yellow">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun link        # exposes a global \`fkanban\`
fkanban init                   # bootstrap + seed the default board`}</pre>
            <p className="dim">No consent prompt &mdash; fkanban writes as the node owner. <span className="bold">init</span> resolves its published schemas and is idempotent.</p></Card>

          <Card><p><Label color="yellow">USE</Label></p>
            <pre>{`fkanban add ship-login --title "Ship login flow" --tags auth,p1
fkanban move ship-login doing
fkanban list
fkanban show ship-login
fkanban mcp                    # serve the MCP tools over stdio`}</pre>
            <p className="dim">Run <span className="bold">fkanban --help</span> for dependencies, boards, and more.</p></Card>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section variant="lavender">
        <h2 id="how"><span className="bold">WHY NO ACCOUNT</span> <span className="dim">How apps work on FoldDB</span></h2>

        <p>Each app runs against <span className="bold">your own single-user node</span> &mdash; on FoldDB, the owner of the device is the owner of the data. An app is just a namespaced workspace over your local database, not a hosted service you log into.</p>

        <p>The app&rsquo;s schemas are published <span className="bold">once</span> to the shared schema registry at <a href="https://schema.folddb.com" target="_blank" rel="noreferrer">schema.folddb.com</a> by its author. When you run <span className="bold">init</span>, your node simply <span className="bold">resolves</span> those published schemas &mdash; a read-only lookup that needs no invite, key, or sign-up. Building and publishing a <span className="bold">new</span> app is the only path that requires a developer identity; see the <Link to="/developer">Developer Guide</Link>.</p>

        <pre className="compare-table"><span className="dim">YOU WANT TO...                       WHAT YOU NEED</span>{'\n'}<span className="dim">{'─'.repeat(65)}</span>{'\n'}Run FoldDB + use fbrain / fkanban    Nothing &mdash; just install{'\n'}Build & publish your own app         A developer identity (see Developer)</pre>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
