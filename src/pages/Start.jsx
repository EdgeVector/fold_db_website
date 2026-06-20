import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';

// The block a user copies and hands to their AI agent. Plain ASCII on purpose —
// it is meant to be pasted verbatim into an agent, not rendered as prose.
const AGENT_RUNBOOK = `# Set up FoldDB for me, then help me work with it

You are setting up FoldDB on my machine and will then help me use it. FoldDB is a
local, encrypted, single-user database: the owner of the device owns the data, and
nothing leaves the machine (no account, no cloud). Two apps run on top of it:
fbrain (my memory) and fkanban (my task board). Both expose MCP servers, so you can
read and write them directly once they are running.

## 1. Install the node
brew install edgevector/folddb/folddb
brew services start folddb
curl -s http://127.0.0.1:9001/api/health      # confirm the node is up

## 2. Install Bun (the apps are Bun / TypeScript clients)
curl -fsSL https://bun.sh/install | bash

## 3. Install fbrain (my memory)
git clone https://github.com/EdgeVector/fbrain && cd fbrain
bun install && bun link
fbrain init --grant-consent    # resolves published schemas + grants this node access to fbrain's namespace
cd ..

## 4. Install fkanban (my board)
git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun link
fkanban init                   # resolves schemas + seeds the default board
cd ..

## 5. Serve the MCP tools so you can use them
fbrain mcp     # memory tools over stdio
fkanban mcp    # board tools over stdio
# Point your MCP client at these two servers.

## How we will work together (what to expect from me, the human)
- fbrain is "why", fkanban is "what's in flight". Keep my rationale in the brain
  and live status on the board. Do not mix them.
- Start from the board: run "fkanban list" before anything else. The board, not
  your memory, is the source of truth for what is in progress.
- When a decision settles, write it to fbrain and update the existing note in place
  rather than starting a new one:
    fbrain put concept caching --title "Cache layer" --body "chose LRU; why: ..."
    fbrain ask "what did we decide about caching?"
- One unit of work = one card. Move it as it progresses:
    fkanban add ship-login --title "Ship login flow" --tags auth,p1
    fkanban move ship-login doing
- You are stateless; the brain is your memory. Anything that should outlive this
  session goes in fbrain, not the chat, so a fresh session (or a new machine) picks
  up exactly where we left off.

## If something stops responding
fbrain doctor      # checks the brain + its node connection
fkanban doctor     # checks the board + schemas
curl -s http://127.0.0.1:9001/api/health   # is the node itself up?
# Most "it stopped responding" moments are just a node that isn't running.`;

export default function Start() {
  const [copied, setCopied] = useState(false);

  async function copyRunbook() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(AGENT_RUNBOOK);
      ok = true;
    } catch {
      // Fallback for older browsers or non-secure contexts where the async
      // Clipboard API is unavailable.
      try {
        const ta = document.createElement('textarea');
        ta.value = AGENT_RUNBOOK;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <Helmet>
        <title>Get Started - Fold DB</title>
        <meta name="description" content="Get started with FoldDB and its apps: the daily loop for humans, plus a copy-paste setup runbook you can hand straight to your AI agent. Local, private, MCP-ready." />
        <meta property="og:title" content="Get Started - Fold DB" />
        <meta property="og:description" content="The human daily loop for FoldDB + fbrain + fkanban, and a copy-paste setup block for your agent. Local, private, no account." />
        <link rel="canonical" href="https://folddb.com/start" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <AsciiTitle text="START" />

      <h1 className="tagline">Get Started</h1>

      <p className="bold white">Fold DB has not launched yet. This describes the intended way of working. The project is in active development.</p>

      <p>FoldDB is one local, encrypted database with two apps on top &mdash; <span className="bold">fbrain</span> (your memory) and <span className="bold">fkanban</span> (your board). There are two ways in: read the <span className="bold">daily loop</span> below to work with it yourself, or <span className="bold">copy the agent block</span> and let your AI agent set everything up and run the loop with you.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* FOR HUMANS */}
      <Section variant="sage">
        <h2 id="humans"><span className="bold">FOR HUMANS</span> <span className="dim">How you&rsquo;ll actually work with it</span></h2>

        <p>Everything sits on <span className="bold">one local FoldDB node</span> &mdash; an encrypted database where every read and write passes through a <span className="bold">fold</span> that enforces access automatically. The two apps are just two views into that one place:</p>

        <div className="grid-2">
          <Card><p><Label color="green">FOLDDB</Label> <span className="dim">the foundation</span></p>
            <p>Your encrypted, single-user database. The owner of the device is the owner of the data &mdash; nothing leaves your machine. Both apps are thin clients over <span className="bold">this same node</span>.</p></Card>

          <Card><p><Label color="green">FBRAIN</Label> <span className="dim">your memory &mdash; the &ldquo;why&rdquo;</span></p>
            <p>Long-lived notes: decisions, project context, the reasoning behind things. You write to it as you think and ask it questions in plain language later.</p></Card>

          <Card><p><Label color="green">FKANBAN</Label> <span className="dim">your board &mdash; &ldquo;what&rsquo;s in flight&rdquo;</span></p>
            <p>Cards that move through columns as work progresses. The board is the live state of what you&rsquo;re actually doing right now.</p></Card>

          <Card><p><Label color="green">THE SPLIT THAT MATTERS</Label></p>
            <p><span className="bold">fbrain is <span className="white">why</span>. fkanban is <span className="white">what&rsquo;s in flight</span>.</span> Keep rationale in the brain and live status on the board &mdash; don&rsquo;t mix them, and each stays useful.</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">THE DAILY LOOP</span> <span className="dim">The best way to use it</span></p>

        <div className="card-stack">
          <Card><p><Label color="blue">1 &mdash; START FROM THE BOARD</Label></p>
            <p>Open with <span className="bold">fkanban list</span>, not your memory. The board &mdash; not your head &mdash; is the source of truth for what&rsquo;s in progress.</p></Card>

          <Card><p><Label color="blue">2 &mdash; CAPTURE DECISIONS AS YOU MAKE THEM</Label></p>
            <p>The moment a choice settles, write it to fbrain &mdash; <span className="bold">update the existing note in place</span> rather than starting a new one. This is what survives a new session, a new machine, or a handoff to someone else.</p></Card>

          <Card><p><Label color="blue">3 &mdash; TRACK THE WORK ON THE BOARD</Label></p>
            <p>One unit of work = one card. Move it as it progresses; the board reflects reality, not intentions.</p></Card>

          <Card><p><Label color="blue">4 &mdash; KEEP THE TWO HONEST</Label></p>
            <p>Status lives on the board; the reasoning lives in the brain. When something lands, note <span className="bold">why</span> in fbrain and move the card &mdash; so a week later you can reconstruct both what happened and why.</p></Card>
        </div>

        <p className="dim">Prefer to click instead of the terminal? Download the macOS app &mdash;{' '}
          <a className="link-btn" href="https://github.com/EdgeVector/homebrew-folddb/releases/latest/download/FoldDB-aarch64.dmg">[Apple Silicon]</a>{' '}
          <a className="link-btn" href="https://github.com/EdgeVector/homebrew-folddb/releases/latest/download/FoldDB-x86_64.dmg">[Intel]</a>{' '}
          &mdash; then add the apps from the <Link to="/apps">Apps</Link> page.</p>
      </Section>

      {/* FOR YOUR AGENT */}
      <Section variant="amber">
        <h2 id="agent"><span className="bold">FOR YOUR AGENT</span> <span className="dim">Copy this, paste it to your agent</span></h2>

        <p>The block below installs FoldDB and both apps, wires up the MCP tools, and tells your agent how you work. Paste it into Claude (or any MCP client) and it can <span className="bold">set everything up and then drive the daily loop with you</span> &mdash; every byte staying in your own encrypted node, with no hosted service in the loop.</p>

        <Card>
          <p>
            <Label color="yellow">AGENT SETUP PROMPT</Label>{' '}
            <button type="button" className="link-btn" onClick={copyRunbook} aria-live="polite">
              {copied ? '[Copied!]' : '[Copy for your agent]'}
            </button>
          </p>
          <pre className="agent-runbook">{AGENT_RUNBOOK}</pre>
        </Card>

        <p className="dim">Just want the app details? See <Link to="/apps">Apps</Link>. Building your own app on FoldDB? See the <Link to="/developer">Developer Guide</Link>.</p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
