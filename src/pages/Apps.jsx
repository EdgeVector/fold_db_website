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
        <meta name="description" content="Apps on LastDB Mini: Brain, Kanban, Situations, LastSecrets, Dogfood Graph, Routines, LastGit, CodeRings, Discovery, and The Last Stack. Install the local daemon, then add thin clients over your own node." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="The LastDB Mini app catalog: memory, board, ops posture, secrets, dogfood evidence, agent routines, git on LastDB, and more." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p><span className="bold white">LastDB Mini</span> is the product you install: a small local semantic daemon (<span className="bold">lastdbd</span>) plus a tiny control CLI (<span className="bold">lastdb</span>). Everything below is a thin client of <span className="bold">your own node</span> &mdash; data stays on your machine, and there is <span className="bold">no account to sign up for</span> to use the apps.</p>

      <p>The catalog has grown past Brain + Kanban. Daily drivers, ops tools, agent harness pieces, and several apps still maturing all share one encrypted node over a Unix socket.</p>

      <p className="dim">Public source (where open): <a href="https://github.com/EdgeVector/brain" target="_blank" rel="noreferrer">brain</a> &middot; <a href="https://github.com/EdgeVector/fkanban" target="_blank" rel="noreferrer">kanban</a> &middot; <a href="https://github.com/EdgeVector/situations" target="_blank" rel="noreferrer">situations</a> &middot; <a href="https://github.com/EdgeVector/dogfood-graph" target="_blank" rel="noreferrer">dogfood-graph</a> &middot; <a href="https://github.com/EdgeVector/routines" target="_blank" rel="noreferrer">routines</a> &middot; <a href="https://github.com/EdgeVector/last-stack" target="_blank" rel="noreferrer">last-stack</a></p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* MINI SETUP */}
      <Section variant="sage">
        <h2 id="prerequisites"><span className="bold">LASTDB MINI</span> <span className="dim">Canonical install &middot; Apple Silicon</span></h2>

        <p>Homebrew installs <span className="bold">LastDB Mini</span> only: <span className="bold">lastdbd</span> (semantic daemon) and <span className="bold">lastdb</span> (socket/control CLI). No desktop app, no web UI, no ingestion CLI. The old <span className="bold">folddb</span> command name still works as a symlink to <span className="bold">lastdb</span>.</p>

        <div className="card-stack">
          <Card><p><Label color="green">1 &mdash; INSTALL + START</Label></p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health`}</pre>
            <p className="dim">Expect a healthy JSON response. Socket path is always <span className="bold">~/.lastdb/data/folddb.sock</span> for Mini (not TCP <span className="bold">:9001</span>, and not the old <span className="bold">~/.folddb</span> desktop home).</p></Card>

          <Card><p><Label color="green">2 &mdash; OPTIONAL CONTROLS</Label></p>
            <pre>{`lastdb status
lastdb --version
lastdbd --version
# foreground instead of brew services:
lastdbd --data-dir ~/.lastdb`}</pre>
            <p className="dim">Optional account join: <span className="bold">lastdb connect</span> (or <span className="bold">lastdbd connect</span>) with a recovery phrase when you need multi-device later. Fresh local use needs neither.</p></Card>

          <Card><p><Label color="green">3 &mdash; BUN</Label></p>
            <p>Most clients are <span className="bold">Bun / TypeScript</span> &mdash; no Rust toolchain to <em>use</em> the apps:</p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre>
            <p className="dim">Already have Bun? Check with <span className="bold">bun --version</span> (want &ge; 1.3.10).</p></Card>
        </div>

        <p className="dim">Full agent-readable runbook: <Link to="/start">Get Started</Link>. Building your own app: <Link to="/developer">Developer Guide</Link>.</p>
      </Section>

      {/* BUNDLE */}
      <Section variant="lavender">
        <h2 id="bundle"><span className="bold">INSTALL THE USABLE STACK</span> <span className="dim">One command for the daily apps</span></h2>

        <p>The easiest path is the Last Stack installer. It can install Mini via Homebrew, clone the usable app repos, run <span className="bold">bun install</span>, and link CLIs.</p>

        <Card><p><Label color="purple">BUNDLE INSTALLER</Label></p>
          <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps`}</pre>
          <p className="dim">Bundle includes Brain, Kanban, Situations, Dogfood Graph, and LastSecrets. Skip Brew if Mini is already up: add <span className="bold">--no-brew</span>. Full guide: <a href="https://github.com/EdgeVector/last-stack/blob/main/docs/lastdb-apps.md" target="_blank" rel="noreferrer">last-stack/docs/lastdb-apps.md</a>.</p></Card>

        <Card><p><Label color="purple">THEN INIT</Label></p>
          <pre>{`brain init --grant-consent
kanban init
situations init
lastsecrets init`}</pre>
          <p className="dim">Compatibility aliases still work (<span className="bold">fbrain</span>, <span className="bold">fkanban</span>, <span className="bold">fsituations</span>) &mdash; prefer the short names above.</p></Card>
      </Section>

      {/* CATALOG */}
      <Section variant="slate">
        <h2 id="catalog"><span className="bold">CATALOG</span> <span className="dim">What runs on the node</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">BRAIN</Label> <span className="dim">daily &middot; <span className="bold">brain</span></span></p>
            <p>Durable knowledge: designs, decisions, concepts, SOPs. Semantic search + MCP for agents.</p>
          </Card>
          <Card>
            <p><Label color="blue">KANBAN</Label> <span className="dim">daily &middot; <span className="bold">kanban</span></span></p>
            <p>Live work board. Cards move backlog &rarr; done; agents pick up and drive PRs from cards.</p>
          </Card>
          <Card>
            <p><Label color="blue">SITUATIONS</Label> <span className="dim">ops &middot; <span className="bold">situations</span></span></p>
            <p>Current shared reality: incidents, freezes, preflight gates before shared-system mutations.</p>
          </Card>
          <Card>
            <p><Label color="blue">LASTSECRETS</Label> <span className="dim">ops &middot; <span className="bold">lastsecrets</span></span></p>
            <p>Raw secrets in LastDB; everywhere else stores <span className="bold">lastsecrets://</span> refs only.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DOGFOOD GRAPH</Label> <span className="dim">product</span></p>
            <p>Expected UX as a graph + human session evidence, screenshots, and expected-vs-actual diffs.</p>
          </Card>
          <Card>
            <p><Label color="yellow">ROUTINES</Label> <span className="dim">agent &middot; <span className="bold">routines</span></span></p>
            <p>Unified scheduler for agent jobs (Claude / Codex) with per-routine model routing and heartbeats.</p>
          </Card>
          <Card>
            <p><Label color="yellow">THE LAST STACK</Label> <span className="dim">agent skills</span></p>
            <p>Agent playbook: file cards, drive one to a merged PR, close out, upgrade the harness.</p>
          </Card>
          <Card>
            <p><Label color="green">LASTGIT</Label> <span className="dim">early &middot; <span className="bold">lastgit</span></span></p>
            <p>Git hosted on LastDB. <span className="bold">lastdb:///</span> remotes via a git remote helper.</p>
          </Card>
          <Card>
            <p><Label color="green">CODERINGS</Label> <span className="dim">early &middot; <span className="bold">coderings</span></span></p>
            <p>Git-anchored repo size vs declared complexity &mdash; snapshots, trajectories, drill-down.</p>
          </Card>
          <Card>
            <p><Label color="green">DISCOVERY</Label> <span className="dim">early</span></p>
            <p>Privacy-preserving relationship / FoF discovery over LastDB; Exemem is transport only.</p>
          </Card>
        </div>
      </Section>

      {/* BRAIN */}
      <Section variant="slate">
        <h2 id="brain"><span className="bold">BRAIN</span> <span className="dim">Personal knowledge &middot; the <span className="bold">brain</span> CLI</span></h2>

        <p>A CLI knowledge base over LastDB &mdash; ten record types (design, task, concept, preference, reference, agent, project, spike, sop, decision) with hybrid search, an <span className="bold">ask</span> command, and an MCP server for agents.</p>

        <div className="card-stack">
          <Card><p><Label color="blue">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/brain && cd brain
bun install && bun link        # exposes brain (+ fbrain alias)
brain init --grant-consent     # bootstrap + consent`}</pre>
            <p><span className="bold">init</span> prepares Brain&rsquo;s schemas on your Mini node and grants the one-time consent for Brain&rsquo;s namespace. No hosted account is required to use it.</p></Card>

          <Card><p><Label color="blue">USE</Label></p>
            <pre>{`brain put concept caching --title "Cache layer" --body "..."
brain search "how did we do auth"
brain ask "what did I note about caching?"
brain list --type concept --limit 10
brain mcp                      # MCP tools over stdio`}</pre>
            <p className="dim">Prefer <span className="bold">brain ask</span> / targeted gets for health over broad doctor loops. Confirm the node with the socket health curl above.</p></Card>
        </div>
      </Section>

      {/* KANBAN */}
      <Section variant="amber">
        <h2 id="kanban"><span className="bold">KANBAN</span> <span className="dim">Work board &middot; the <span className="bold">kanban</span> CLI</span></h2>

        <p>A kanban board over LastDB. Cards move through columns (<span className="bold">backlog &rarr; todo &rarr; doing &rarr; review &rarr; done</span>); every change persists on your node. Ships a CLI and an MCP server. Public repo is still named <span className="bold">fkanban</span>; the command is <span className="bold">kanban</span>.</p>

        <div className="card-stack">
          <Card><p><Label color="yellow">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun run install-cli   # exposes kanban (+ fkanban alias)
kanban init                          # bootstrap + seed default board`}</pre>
            <p className="dim">No consent prompt &mdash; Kanban writes as the node owner. <span className="bold">init</span> is idempotent.</p></Card>

          <Card><p><Label color="yellow">USE</Label></p>
            <pre>{`kanban add ship-login --title "Ship login flow" --tags auth,p1
kanban move ship-login doing
kanban list
kanban show ship-login
kanban mcp`}</pre>
            <p className="dim">Dependencies, boards, ranking, and pickup live in <span className="bold">kanban --help</span>.</p></Card>
        </div>
      </Section>

      {/* SITUATIONS */}
      <Section variant="sage">
        <h2 id="situations"><span className="bold">SITUATIONS</span> <span className="dim">Operational posture &middot; the <span className="bold">situations</span> CLI</span></h2>

        <p>Situations records current shared reality agents must respect before mutating shared systems: active incidents, blocked actions, scoped preflights, and required human clearance. Brain is durable <em>why</em>; Kanban is <em>what&rsquo;s in flight</em>; Situations is <em>what is true right now operationally</em>.</p>

        <div className="card-stack">
          <Card><p><Label color="green">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/situations && cd situations
bun install
ln -snf "$PWD/bin/situations" ~/.local/bin/situations
situations init`}</pre></Card>

          <Card><p><Label color="green">USE</Label></p>
            <pre>{`situations list --json
situations preflight --action enable-ci --repo EdgeVector/fold`}</pre>
            <p className="dim">Run preflight before CI, deploy, automation, release-gate, PR-merge, or production/shared infrastructure changes.</p></Card>
        </div>
      </Section>

      {/* LASTSECRETS */}
      <Section variant="slate">
        <h2 id="lastsecrets"><span className="bold">LASTSECRETS</span> <span className="dim">Secret refs &middot; the <span className="bold">lastsecrets</span> CLI</span></h2>

        <p>LastSecrets stores raw secrets in LastDB while Brain, Kanban, docs, and scripts store stable <span className="bold">lastsecrets://</span> references. Secret fields are classified so they stay out of normal search indexes.</p>

        <div className="card-stack">
          <Card><p><Label color="blue">INSTALL</Label></p>
            <pre>{`# via the stack installer (preferred)
~/.last-stack/bin/last-stack-install-apps --no-brew
lastsecrets init`}</pre>
            <p className="dim">Or clone the app into your apps directory if you already have access, then <span className="bold">bun install &amp;&amp; bun link</span>.</p></Card>

          <Card><p><Label color="blue">USE</Label></p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put schema-r2-dev --value-stdin
lastsecrets ref schema-r2-dev    # → lastsecrets://schema-r2-dev
lastsecrets get schema-r2-dev    # only at point of use`}</pre>
            <p className="dim">Never paste raw secrets into Brain, Kanban, docs, logs, or PR descriptions &mdash; store the ref instead.</p></Card>
        </div>
      </Section>

      {/* DOGFOOD GRAPH */}
      <Section variant="amber">
        <h2 id="dogfood-graph"><span className="bold">DOGFOOD GRAPH</span> <span className="dim">Manual dogfood evidence</span></h2>

        <p>Models expected product UX as a versioned graph and records what humans actually observe while walking a workflow: goal state, evidence, screenshots, annotations, and expected-vs-actual diffs. It does not automate testing &mdash; it manages the evidence needed to decide what to change.</p>

        <div className="card-stack">
          <Card><p><Label color="yellow">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/dogfood-graph && cd dogfood-graph
bun install`}</pre></Card>

          <Card><p><Label color="yellow">RUN</Label></p>
            <pre>npm run dev</pre>
            <p className="dim">Local web app, not a global CLI. Needs a running Mini node for LastDB-backed sessions.</p></Card>
        </div>
      </Section>

      {/* ROUTINES */}
      <Section variant="lavender">
        <h2 id="routines"><span className="bold">ROUTINES</span> <span className="dim">Agent scheduler &middot; the <span className="bold">routines</span> CLI</span></h2>

        <p>One scheduler owns dispatch; each routine&rsquo;s on-disk config declares harness (Claude / Codex), model, schedule, and prompt. Registry lives on disk on purpose so the fleet can keep firing (or fail loudly) during a brain outage; run history and heartbeats still flow to Brain.</p>

        <div className="card-stack">
          <Card><p><Label color="purple">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/routines && cd routines
bun install
bun run install-shim          # → ~/.local/bin/routines`}</pre></Card>

          <Card><p><Label color="purple">USE</Label></p>
            <pre>{`routines list
routines status
routines run disk-reclaim
routines install-daemon       # launchd user agent
routines web                  # local dashboard`}</pre>
            <p className="dim">Pairs with The Last Stack routine prompts under <span className="bold">~/.last-stack/routines/</span>.</p></Card>
        </div>
      </Section>

      {/* LAST STACK */}
      <Section variant="sage">
        <h2 id="last-stack"><span className="bold">THE LAST STACK</span> <span className="dim">Agent skills + harness</span></h2>

        <p>Not a data app &mdash; the agent layer that sits on Mini + Brain + Kanban. Skills for filing cards, driving one card to a merged PR, waiting on PRs robustly, closing out finished work, and upgrading the harness. <span className="bold">setup</span> auto-detects Claude Code, Codex, Factory, and OpenCode.</p>

        <div className="card-stack">
          <Card><p><Label color="green">INSTALL</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
# update later:
cd ~/.last-stack && git pull && ./setup`}</pre>
            <p className="dim">Also provides <span className="bold">last-stack-install-apps</span> for the usable Mini app bundle.</p></Card>
        </div>
      </Section>

      {/* EARLY APPS */}
      <Section variant="rose">
        <h2 id="early"><span className="bold">EARLY / IN THE WORKSHOP</span> <span className="dim">Real apps, still maturing</span></h2>

        <p>These run on the same Mini node in our dogfood loop. They are honest early: not every one is a public one-liner yet, and none are as polished as Brain + Kanban.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="red">LASTGIT</Label> <span className="dim">git on LastDB &middot; <span className="bold">lastgit</span> + <span className="bold">git-remote-lastdb</span></span></p>
            <p>Native packfiles and append-only ref events in LastDB. Canonical remote shape:</p>
            <pre>{`bun run install:local          # from a lastgit checkout
git remote add origin lastdb:///my-repo
git push -u origin main`}</pre>
            <p className="dim">Intentionally left out of the public bundle until the public path is stable. Daily-driver socket: <span className="bold">~/.lastdb/data/folddb.sock</span>.</p>
          </Card>

          <Card>
            <p><Label color="red">CODERINGS</Label> <span className="dim">repo size vs complexity &middot; <span className="bold">coderings</span></span></p>
            <p>Immutable, Git-anchored code-tree snapshots stored in LastDB. Answer: what exists, whether size matches responsibility, where growth entered, and whether it was product code vs tests/deps/tooling.</p>
            <pre>{`# from a coderings checkout on a Mini node
bun install
coderings --help`}</pre>
            <p className="dim">Built on the TypeScript <span className="bold">@lastdb/app-sdk</span> owner client over the Mini socket.</p>
          </Card>

          <Card>
            <p><Label color="red">DISCOVERY</Label> <span className="dim">relationship graph &middot; FoF without cloud social graphs</span></p>
            <p>Local friends-of-friends discovery: each peer&rsquo;s Discovery app decides what to relay; Exemem only delivers opaque addressed slices. Privacy-preserving discovery is a core LastDB thesis &mdash; this is the app that implements it.</p>
            <p className="dim">Hosted as a LastDB-native app (canonical on LastGit when available). Not in the public brew/app bundle yet.</p>
          </Card>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section variant="lavender">
        <h2 id="how"><span className="bold">WHY NO ACCOUNT</span> <span className="dim">How apps work on Mini</span></h2>

        <p>Each app runs against <span className="bold">your own single-user node</span> &mdash; on LastDB, the owner of the device is the owner of the data. An app is a namespaced workspace over your local database, not a hosted service you log into.</p>

        <p>Apps talk HTTP to the owner Unix socket. Mini keeps embeddings local for semantic search. Building and publishing a <span className="bold">new</span> app is the path that needs a developer identity; using Brain, Kanban, and the rest does not. See the <Link to="/developer">Developer Guide</Link>.</p>

        <pre className="compare-table"><span className="dim">YOU WANT TO...                       WHAT YOU NEED</span>{'\n'}<span className="dim">{'─'.repeat(65)}</span>{'\n'}Run Mini + use the app stack         Nothing &mdash; brew + init{'\n'}Wire an agent to Brain / Kanban      MCP stdio servers{'\n'}Build &amp; publish your own app         A developer identity (see Developer)</pre>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
