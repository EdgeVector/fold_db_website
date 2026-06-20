import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Using() {
  return (
    <>
      <Helmet>
        <title>How to Use It - Last DB</title>
        <meta name="description" content="The best way to work with LastDB and its apps: a local, private, agent-ready memory and task system. The mental model, the daily loop, and how to wire it into your AI agent." />
        <meta property="og:title" content="How to Use It - Last DB" />
        <meta property="og:description" content="The mental model and daily workflow for LastDB + fbrain + fkanban: local, private, and agent-ready." />
        <link rel="canonical" href="https://folddb.com/using" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <pre className="ascii">{`
#   # ###  ### #   #  ###
#   #  #   #   ##  # #
#   #  #   ### # # # #  ##
#   #  #   #   #  ## #   #
 ###  ###  ### #   #  ###`.trim()}</pre>

      <h1 className="tagline">How to Use It</h1>

      <p className="bold white">Last DB has not launched yet. This describes the intended way of working. The project is in active development.</p>

      <p>Installing is the easy part &mdash; the <Link to="/guide">Guide</Link> gets a node running and the <Link to="/apps">Apps</Link> page adds fbrain and fkanban. This page is about <span className="bold">how to actually work with the system</span> once it&rsquo;s up: the mental model that makes three pieces feel like one, and the daily loop that keeps your thinking and your work in sync &mdash; all on your own machine, with no account.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* THE MODEL */}
      <Section variant="sage">
        <h2 id="model"><span className="bold">THE MODEL</span> <span className="dim">One foundation, two views</span></h2>

        <p>Everything sits on <span className="bold">one local LastDB node</span> &mdash; an encrypted database where every read and write passes through a <span className="bold">fold</span> that enforces access automatically. The two apps are just two views into that one place:</p>

        <div className="grid-2">
          <Card><p><Label color="green">LASTDB</Label> <span className="dim">the foundation</span></p>
            <p>Your encrypted, single-user database. The owner of the device is the owner of the data &mdash; nothing leaves your machine. Both apps are thin clients over <span className="bold">this same node</span>.</p></Card>

          <Card><p><Label color="green">FBRAIN</Label> <span className="dim">your memory &mdash; the &ldquo;why&rdquo;</span></p>
            <p>Long-lived notes: decisions, project context, the reasoning behind things. You write to it as you think and ask it questions in plain language later.</p></Card>

          <Card><p><Label color="green">FKANBAN</Label> <span className="dim">your board &mdash; &ldquo;what&rsquo;s in flight&rdquo;</span></p>
            <p>Cards that move through columns as work progresses. The board is the live state of what you&rsquo;re actually doing right now.</p></Card>

          <Card><p><Label color="green">THE SPLIT THAT MATTERS</Label></p>
            <p><span className="bold">fbrain is <span className="white">why</span>. fkanban is <span className="white">what&rsquo;s in flight</span>.</span> Keep rationale in the brain and live status on the board &mdash; don&rsquo;t mix them, and each stays useful.</p></Card>
        </div>
      </Section>

      {/* THE LOOP */}
      <Section variant="slate">
        <h2 id="loop"><span className="bold">THE DAILY LOOP</span> <span className="dim">The best way to use it</span></h2>

        <div className="card-stack">
          <Card><p><Label color="blue">1 &mdash; START FROM THE BOARD</Label></p>
            <p>Open with <span className="bold">fkanban list</span>, not your memory. The board &mdash; not your head &mdash; is the source of truth for what&rsquo;s in progress.</p></Card>

          <Card><p><Label color="blue">2 &mdash; CAPTURE DECISIONS AS YOU MAKE THEM</Label></p>
            <p>The moment a choice settles, write it to fbrain &mdash; <span className="bold">update the existing note in place</span> rather than starting a new one. This is what survives a new session, a new machine, or a handoff to someone else.</p>
            <pre>{`fbrain put concept caching --title "Cache layer" --body "chose LRU; why: ..."
fbrain ask "what did we decide about caching?"`}</pre></Card>

          <Card><p><Label color="blue">3 &mdash; TRACK THE WORK ON THE BOARD</Label></p>
            <p>One unit of work = one card. Move it as it progresses; the board reflects reality, not intentions.</p>
            <pre>{`fkanban add ship-login --title "Ship login flow" --tags auth,p1
fkanban move ship-login doing`}</pre></Card>

          <Card><p><Label color="blue">4 &mdash; KEEP THE TWO HONEST</Label></p>
            <p>Status lives on the board; the reasoning lives in the brain. When something lands, note <span className="bold">why</span> in fbrain and move the card &mdash; so a week later you can reconstruct both what happened and why.</p></Card>
        </div>
      </Section>

      {/* AGENT */}
      <Section variant="amber">
        <h2 id="agents"><span className="bold">WIRE IT INTO YOUR AGENT</span> <span className="dim">Local, private, MCP-ready</span></h2>

        <p>Both apps ship an <span className="bold">MCP server</span>, so an AI agent (Claude or any MCP client) can read and write your memory and your board directly &mdash; while every byte stays in your own encrypted node. You get an agent with durable, private memory and a task list, with <span className="bold">no hosted service in the loop</span>.</p>

        <div className="grid-2">
          <Card><p><Label color="yellow">SERVE THE TOOLS</Label></p>
            <pre>{`fbrain mcp     # memory tools over stdio
fkanban mcp    # board tools over stdio`}</pre>
            <p className="dim">Point your MCP client at these and the agent can search notes, file cards, and check the board itself.</p></Card>

          <Card><p><Label color="yellow">WHY IT WORKS</Label></p>
            <p>The agent is stateless; <span className="bold">the brain is its memory.</span> Anything that should outlive a session goes in fbrain, not in the chat &mdash; so a fresh agent (or a new machine) picks up exactly where the last one left off.</p></Card>
        </div>
      </Section>

      {/* HEALTH */}
      <Section variant="lavender">
        <h2 id="health"><span className="bold">KEEPING IT HEALTHY</span> <span className="dim">When something feels off</span></h2>

        <p>Each app self-checks. If a command hangs or an app can&rsquo;t reach the node, run its doctor before anything else:</p>
        <pre>{`fbrain doctor      # checks the brain + its node connection
fkanban doctor     # checks the board + schemas
curl -s http://127.0.0.1:9001/api/health   # is the node itself up?`}</pre>
        <p className="dim">Most &ldquo;it stopped responding&rdquo; moments are just a node that isn&rsquo;t running &mdash; start it (see the <Link to="/guide#run">Guide</Link>) and re-check.</p>
      </Section>

      {/* NEXT */}
      <Section variant="sage">
        <h2 id="next"><span className="bold">WHERE TO GO NEXT</span></h2>
        <div className="grid-2">
          <Card><p><Label color="green">INSTALL THE NODE</Label></p>
            <p>Get LastDB running in a couple of minutes.</p>
            <p><Link to="/guide" className="link-btn">[Guide &rarr;]</Link></p></Card>
          <Card><p><Label color="green">ADD THE APPS</Label></p>
            <p>Install fbrain and fkanban on your node.</p>
            <p><Link to="/apps" className="link-btn">[Apps &rarr;]</Link></p></Card>
          <Card><p><Label color="green">BUILD YOUR OWN</Label></p>
            <p>Publish your own app on LastDB.</p>
            <p><Link to="/developer" className="link-btn">[Developer &rarr;]</Link></p></Card>
          <Card><p><Label color="green">HOW ENCRYPTION WORKS</Label></p>
            <p>What &ldquo;encrypted at rest&rdquo; actually means here.</p>
            <p><Link to="/encryption" className="link-btn">[Encryption &rarr;]</Link></p></Card>
        </div>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
