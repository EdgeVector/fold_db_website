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
        <meta name="description" content="Get started with LastDB Mini and its apps: install the local semantic daemon, add Brain, Kanban, Situations, and the rest of the stack. Human daily loop + agent-readable setup runbook." />
        <meta property="og:title" content="Get Started - LastDB" />
        <meta property="og:description" content="Install LastDB Mini, then Brain + Kanban and the wider app stack. Local, private, MCP-ready. Alpha — runs on your machine today." />
        <link rel="canonical" href="https://thelastdb.com/start" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <AsciiTitle text="START" />

      <h1 className="tagline">Get Started</h1>

      <p className="bold white">LastDB is in <span className="white">alpha</span> &mdash; and you can run it today. Install <span className="white">LastDB Mini</span> (the canonical product), add the app stack, and everything runs on your own machine over a local Unix socket.</p>

      <p>LastDB Mini is one local, encrypted database. Apps are thin clients of that same node &mdash; <span className="bold">Brain</span> (memory, the <span className="bold">brain</span> CLI), <span className="bold">Kanban</span> (board, the <span className="bold">kanban</span> CLI), plus Situations, LastSecrets, Dogfood Graph, Routines, and more. Two ways in: follow the <span className="bold">daily loop</span> below yourself, or <span className="bold">point your AI agent at this page</span> and let it set everything up.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* FOR HUMANS */}
      <Section variant="sage">
        <h2 id="humans"><span className="bold">FOR HUMANS</span> <span className="dim">How you&rsquo;ll actually work with it</span></h2>

        <p>Everything sits on <span className="bold">one local LastDB Mini node</span> &mdash; an encrypted database that enforces access automatically on every read and write. Apps are just views into that one place:</p>

        <div className="grid-2">
          <Card><p><Label color="green">LASTDB MINI</Label> <span className="dim">the foundation</span></p>
            <p>Your encrypted, single-user database. Homebrew installs <span className="bold">lastdbd</span> + <span className="bold">lastdb</span>. The owner of the device is the owner of the data &mdash; nothing leaves your machine. All apps are thin clients over <span className="bold">this same node</span>.</p></Card>

          <Card><p><Label color="green">BRAIN</Label> <span className="dim">your memory &mdash; the &ldquo;why&rdquo;</span></p>
            <p>Long-lived notes: decisions, project context, the reasoning behind things. You write to it as you think and ask it questions in plain language later.</p></Card>

          <Card><p><Label color="green">KANBAN</Label> <span className="dim">your board &mdash; &ldquo;what&rsquo;s in flight&rdquo;</span></p>
            <p>Cards that move through columns as work progresses. The board is the live state of what you&rsquo;re actually doing right now.</p></Card>

          <Card><p><Label color="green">THE SPLIT THAT MATTERS</Label></p>
            <p><span className="bold">Brain is <span className="white">why</span>. Kanban is <span className="white">what&rsquo;s in flight</span>.</span> Situations holds operational posture; LastSecrets holds secret refs. Keep those roles honest and each stays useful.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">THE DAILY LOOP</span> <span className="dim">The best way to use it</span></p>

        <div className="card-stack">
          <Card><p><Label color="blue">1 &mdash; START FROM THE BOARD</Label></p>
            <p>Open with <span className="bold">kanban list</span>, not your memory. The board &mdash; not your head &mdash; is the source of truth for what&rsquo;s in progress.</p></Card>

          <Card><p><Label color="blue">2 &mdash; CAPTURE DECISIONS AS YOU MAKE THEM</Label></p>
            <p>The moment a choice settles, write it to Brain &mdash; <span className="bold">update the existing note in place</span> rather than starting a new one. This is what survives a new session, a new machine, or a handoff to someone else.</p></Card>

          <Card><p><Label color="blue">3 &mdash; TRACK THE WORK ON THE BOARD</Label></p>
            <p>One unit of work = one card. Move it as it progresses; the board reflects reality, not intentions.</p></Card>

          <Card><p><Label color="blue">4 &mdash; KEEP THE TWO HONEST</Label></p>
            <p>Status lives on the board; the reasoning lives in the brain. When something lands, note <span className="bold">why</span> in Brain and move the card &mdash; so a week later you can reconstruct both what happened and why.</p></Card>
        </div>

        <p className="dim">Need the full catalog (Routines, LastGit, CodeRings, Discovery, &hellip;)? See <Link to="/apps">Apps</Link>.</p>
      </Section>

      {/* FOR YOUR AGENT */}
      <Section variant="amber">
        <h2 id="agent"><span className="bold">FOR YOUR AGENT</span> <span className="dim">Point your agent at this page</span></h2>

        <p>Working with an AI agent &mdash; Claude or any MCP client? <span className="bold">Just point it at this page.</span> Everything it needs is written out below: how to install LastDB Mini and the usable app stack, serve the MCP tools, install the agent skills, and how you want to work. No copy-paste, no separate prompt &mdash; the agent reads the runbook right here and gets to work. Every byte stays in your own encrypted node, with no hosted service in the loop.</p>

        <p className="section-subheading"><span className="bold">SET IT UP</span> <span className="dim">Install Mini, the apps, and the tools</span></p>

        <div className="card-stack">
          <Card><p><Label color="yellow">1 &mdash; INSTALL LASTDB MINI</Label></p>
            <p>LastDB Mini is the canonical product: a local, encrypted, single-user semantic daemon. Apple Silicon via Homebrew:</p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health`}</pre>
            <p className="dim">That installs <span className="bold">lastdbd</span> + <span className="bold">lastdb</span> only (no desktop UI). Socket: <span className="bold">~/.lastdb/data/folddb.sock</span>. Do <span className="bold">not</span> expect TCP <span className="bold">:9001</span> &mdash; that path is retired. Release assets: <a href="https://github.com/EdgeVector/homebrew-lastdb/releases" target="_blank" rel="noreferrer">homebrew-lastdb releases</a>.</p></Card>

          <Card><p><Label color="yellow">2 &mdash; INSTALL BUN</Label></p>
            <p>The apps are Bun / TypeScript clients &mdash; no Rust toolchain needed:</p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre></Card>

          <Card><p><Label color="yellow">3 &mdash; ADD THE APP STACK</Label> <span className="dim">Brain, Kanban, Situations, Dogfood Graph, LastSecrets</span></p>
            <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps --no-brew`}</pre>
            <p className="dim">The bundle downloads the usable app repos and links their CLIs. LastGit, CodeRings, and Discovery are intentionally out of the public bundle until their public paths are stable. Full guide: <a href="https://github.com/EdgeVector/last-stack/blob/main/docs/lastdb-apps.md" target="_blank" rel="noreferrer">last-stack/docs/lastdb-apps.md</a>.</p></Card>

          <Card><p><Label color="yellow">4 &mdash; INITIALIZE THE APPS</Label></p>
            <pre>{`brain init --grant-consent   # memory
kanban init                  # board
situations init              # operational posture
lastsecrets init             # secret refs`}</pre>
            <p className="dim">Aliases <span className="bold">fbrain</span> / <span className="bold">fkanban</span> / <span className="bold">fsituations</span> still work; prefer the short names.</p></Card>

          <Card><p><Label color="yellow">5 &mdash; SERVE THE MCP TOOLS</Label></p>
            <p>So the agent can read and write the memory and the board directly:</p>
            <pre>{`brain mcp      # memory tools over stdio
kanban mcp     # board tools over stdio`}</pre>
            <p className="dim">Point your MCP client at these two servers.</p></Card>

          <Card><p><Label color="yellow">6 &mdash; INSTALL THE SKILLS</Label> <span className="dim">the agent playbook &middot; <span className="bold">The Last Stack</span></span></p>
            <p>Install <a href="https://github.com/EdgeVector/last-stack">The Last Stack</a> &mdash; agent skills so your agent knows the whole loop: filing cards, driving one all the way to a merged PR, waiting on PRs robustly, and closing out finished work. Step 3 already cloned it; <span className="bold">setup</span> registers the skills:</p>
            <pre>{`~/.last-stack/setup
# later:
cd ~/.last-stack && git pull && ./setup`}</pre>
            <p className="dim"><span className="bold">setup</span> auto-detects your agent (Claude Code, Codex, Factory, OpenCode) and registers the skills. Optional: install <a href="https://github.com/EdgeVector/routines" target="_blank" rel="noreferrer">routines</a> for scheduled agent jobs on top of the same stack.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">HOW WE WORK TOGETHER</span> <span className="dim">What the agent should expect from the human</span></p>

        <div className="grid-2">
          <Card><p><Label color="green">START FROM THE BOARD</Label></p>
            <p>Run <span className="bold">kanban list</span> before anything else. The board, not your memory, is the source of truth for what&rsquo;s in progress.</p></Card>

          <Card><p><Label color="green">CAPTURE THE WHY IN BRAIN</Label></p>
            <p>When a decision settles, write it to Brain and <span className="bold">update the existing note in place</span>:</p>
            <pre>{`brain put concept caching --title "Cache layer" --body "chose LRU; why: ..."
brain ask "what did we decide about caching?"`}</pre></Card>

          <Card><p><Label color="green">TRACK WORK AS CARDS</Label></p>
            <p>One unit of work = one card; move it as it progresses:</p>
            <pre>{`kanban add ship-login --title "Ship login flow" --tags auth,p1
kanban move ship-login doing`}</pre></Card>

          <Card><p><Label color="green">THE BRAIN IS YOUR MEMORY</Label></p>
            <p>You&rsquo;re stateless; Brain is your memory. Anything that should outlive this session goes in the brain, not the chat &mdash; so a fresh session picks up exactly where you left off.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">IF SOMETHING STOPS RESPONDING</span></p>
        <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health
kanban list                  # cheap board read = node is up
brew services restart lastdb # only if the health curl fails`}</pre>
        <p className="dim">Most &ldquo;it stopped responding&rdquo; moments are a stopped Mini daemon &mdash; start it and re-check the socket. Avoid treating retired TCP <span className="bold">:9001</span> failures as an outage.</p>

        <p className="dim">Just want the app details? See <Link to="/apps">Apps</Link>. Building your own app on LastDB? See the <Link to="/developer">Developer Guide</Link>.</p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
