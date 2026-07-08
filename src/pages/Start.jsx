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
        <meta name="description" content="Get started with LastDB and its apps: the daily loop for humans, and a full setup runbook your AI agent can read straight off the page. Local, private, MCP-ready, in alpha today." />
        <meta property="og:title" content="Get Started - LastDB" />
        <meta property="og:description" content="The human daily loop for LastDB + Brain + Kanban, and an agent-readable setup runbook. Local, private, no account. Alpha — runs on your machine today." />
        <link rel="canonical" href="https://thelastdb.com/start" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <AsciiTitle text="START" />

      <h1 className="tagline">Get Started</h1>

      <p className="bold white">LastDB is in <span className="white">alpha</span> &mdash; and you can run it today. Download the macOS app, add Brain and Kanban, and the whole stack runs on your own machine.</p>

      <p>LastDB is one local, encrypted database with two apps on top &mdash; <span className="bold">Brain</span> (your memory, the <span className="bold">fbrain</span> CLI) and <span className="bold">Kanban</span> (your board, the <span className="bold">fkanban</span> CLI). Two ways in: follow the <span className="bold">daily loop</span> below to work with it yourself, or just <span className="bold">point your AI agent at this page</span> and let it set everything up and run the loop with you.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* FOR HUMANS */}
      <Section variant="sage">
        <h2 id="humans"><span className="bold">FOR HUMANS</span> <span className="dim">How you&rsquo;ll actually work with it</span></h2>

        <p>Everything sits on <span className="bold">one local LastDB node</span> &mdash; an encrypted database that enforces access automatically on every read and write. The two apps are just two views into that one place:</p>

        <div className="grid-2">
          <Card><p><Label color="green">LASTDB</Label> <span className="dim">the foundation</span></p>
            <p>Your encrypted, single-user database. The owner of the device is the owner of the data &mdash; nothing leaves your machine. Both apps are thin clients over <span className="bold">this same node</span>.</p></Card>

          <Card><p><Label color="green">BRAIN</Label> <span className="dim">your memory &mdash; the &ldquo;why&rdquo;</span></p>
            <p>Long-lived notes: decisions, project context, the reasoning behind things. You write to it as you think and ask it questions in plain language later.</p></Card>

          <Card><p><Label color="green">KANBAN</Label> <span className="dim">your board &mdash; &ldquo;what&rsquo;s in flight&rdquo;</span></p>
            <p>Cards that move through columns as work progresses. The board is the live state of what you&rsquo;re actually doing right now.</p></Card>

          <Card><p><Label color="green">THE SPLIT THAT MATTERS</Label></p>
            <p><span className="bold">Brain is <span className="white">why</span>. Kanban is <span className="white">what&rsquo;s in flight</span>.</span> Keep rationale in the brain and live status on the board &mdash; don&rsquo;t mix them, and each stays useful.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">THE DAILY LOOP</span> <span className="dim">The best way to use it</span></p>

        <div className="card-stack">
          <Card><p><Label color="blue">1 &mdash; START FROM THE BOARD</Label></p>
            <p>Open with <span className="bold">fkanban list</span>, not your memory. The board &mdash; not your head &mdash; is the source of truth for what&rsquo;s in progress.</p></Card>

          <Card><p><Label color="blue">2 &mdash; CAPTURE DECISIONS AS YOU MAKE THEM</Label></p>
            <p>The moment a choice settles, write it to Brain &mdash; <span className="bold">update the existing note in place</span> rather than starting a new one. This is what survives a new session, a new machine, or a handoff to someone else.</p></Card>

          <Card><p><Label color="blue">3 &mdash; TRACK THE WORK ON THE BOARD</Label></p>
            <p>One unit of work = one card. Move it as it progresses; the board reflects reality, not intentions.</p></Card>

          <Card><p><Label color="blue">4 &mdash; KEEP THE TWO HONEST</Label></p>
            <p>Status lives on the board; the reasoning lives in the brain. When something lands, note <span className="bold">why</span> in Brain and move the card &mdash; so a week later you can reconstruct both what happened and why.</p></Card>
        </div>

        <p className="dim">Prefer to click instead of the terminal? LastDB Desktop ships separately from LastDB Mini. Use the <a href="https://github.com/EdgeVector/homebrew-lastdb/releases/tag/canary">app release channel</a>, then add the apps from the <Link to="/apps">Apps</Link> page.</p>
      </Section>

      {/* FOR YOUR AGENT */}
      <Section variant="amber">
        <h2 id="agent"><span className="bold">FOR YOUR AGENT</span> <span className="dim">Point your agent at this page</span></h2>

        <p>Working with an AI agent &mdash; Claude or any MCP client? <span className="bold">Just point it at this page.</span> Everything it needs is written out below: how to install LastDB and the apps, serve the MCP tools, install the agent skills, and how you want to work. No copy-paste, no separate prompt &mdash; the agent reads the runbook right here and gets to work. Every byte stays in your own encrypted node, with no hosted service in the loop.</p>

        <p className="section-subheading"><span className="bold">SET IT UP</span> <span className="dim">Install the node, the apps, and the tools</span></p>

        <div className="card-stack">
          <Card><p><Label color="yellow">1 &mdash; INSTALL THE NODE</Label></p>
            <p>LastDB is a local, encrypted, single-user database. Install LastDB Mini and start it:</p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health   # confirm the node is up`}</pre>
            <p className="dim">No Homebrew? Download the signed macOS app instead (links in the Humans section above).</p></Card>

          <Card><p><Label color="yellow">2 &mdash; INSTALL BUN</Label></p>
            <p>The apps are Bun / TypeScript clients &mdash; no Rust toolchain needed:</p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre></Card>

          <Card><p><Label color="yellow">3 &mdash; ADD BRAIN</Label> <span className="dim">your memory &middot; the <span className="bold">fbrain</span> CLI</span></p>
            <pre>{`git clone https://github.com/EdgeVector/fbrain && cd fbrain
bun install && bun link
fbrain init --grant-consent   # resolves published schemas + grants this node access to fbrain's namespace
cd ..`}</pre></Card>

          <Card><p><Label color="yellow">4 &mdash; ADD KANBAN</Label> <span className="dim">your board &middot; the <span className="bold">fkanban</span> CLI</span></p>
            <pre>{`git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun link
fkanban init                  # resolves schemas + seeds the default board
cd ..`}</pre></Card>

          <Card><p><Label color="yellow">5 &mdash; SERVE THE MCP TOOLS</Label></p>
            <p>So the agent can read and write the memory and the board directly:</p>
            <pre>{`fbrain mcp     # memory tools over stdio
fkanban mcp    # board tools over stdio`}</pre>
            <p className="dim">Point your MCP client at these two servers.</p></Card>

          <Card><p><Label color="yellow">6 &mdash; INSTALL THE SKILLS</Label> <span className="dim">the agent playbook &middot; <span className="bold">The Last Stack</span></span></p>
            <p>Install <a href="https://github.com/EdgeVector/last-stack">The Last Stack</a> &mdash; a small set of agent skills so your agent knows the whole loop: filing cards, driving one all the way to a merged PR, waiting on PRs robustly, and closing out finished work. One line clones it and registers the skills into your agent:</p>
            <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack && ~/.last-stack/setup`}</pre>
            <p className="dim">Six skills for Brain + Kanban: fkanban, fkanban-agent, fkanban-setup, wait-merge, close-out, last-stack-upgrade. <span className="bold">setup</span> auto-detects your agent (Claude Code, Codex, Factory, OpenCode) and registers them all. Update anytime with <span className="bold">cd ~/.last-stack &amp;&amp; git pull &amp;&amp; ./setup</span>.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">HOW WE WORK TOGETHER</span> <span className="dim">What the agent should expect from the human</span></p>

        <div className="grid-2">
          <Card><p><Label color="green">START FROM THE BOARD</Label></p>
            <p>Run <span className="bold">fkanban list</span> before anything else. The board, not your memory, is the source of truth for what&rsquo;s in progress.</p></Card>

          <Card><p><Label color="green">CAPTURE THE WHY IN BRAIN</Label></p>
            <p>When a decision settles, write it to Brain and <span className="bold">update the existing note in place</span>:</p>
            <pre>{`fbrain put concept caching --title "Cache layer" --body "chose LRU; why: ..."
fbrain ask "what did we decide about caching?"`}</pre></Card>

          <Card><p><Label color="green">TRACK WORK AS CARDS</Label></p>
            <p>One unit of work = one card; move it as it progresses:</p>
            <pre>{`fkanban add ship-login --title "Ship login flow" --tags auth,p1
fkanban move ship-login doing`}</pre></Card>

          <Card><p><Label color="green">THE BRAIN IS YOUR MEMORY</Label></p>
            <p>You&rsquo;re stateless; Brain is your memory. Anything that should outlive this session goes in the brain, not the chat &mdash; so a fresh session picks up exactly where you left off.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">IF SOMETHING STOPS RESPONDING</span></p>
        <pre>{`fbrain doctor      # checks the brain + its node connection
fkanban doctor     # checks the board + schemas
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/health   # is the node itself up?`}</pre>
        <p className="dim">Most &ldquo;it stopped responding&rdquo; moments are just a node that isn&rsquo;t running &mdash; start it and re-check.</p>

        <p className="dim">Just want the app details? See <Link to="/apps">Apps</Link>. Building your own app on LastDB? See the <Link to="/developer">Developer Guide</Link>.</p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
