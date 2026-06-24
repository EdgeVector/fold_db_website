import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Mermaid from '../components/Mermaid';

const SPLIT_DIAGRAM = `flowchart TB
  subgraph DEVICE["Your device — the source of truth"]
    direction LR
    ING["Ingestion<br/>(local models, on your machine)"]
    DB[("Your encrypted data")]
    ING --> DB
  end
  subgraph CLOUD["Only when you chat"]
    CH["Split-trust relay<br/>(no one sees both who + what)"]
  end
  DEVICE -. "only chat leaves, sealed" .-> CLOUD`;

const FLOW_DIAGRAM = `flowchart LR
  C(["Your device<br/>seals the message"]) -. "sealed box" .-> R["Cloud relay<br/>knows WHO, not WHAT"]
  R -. "still sealed" .-> G["Gateway<br/>knows WHAT, not WHO"]
  G -- "opens it" --> M(["Frontier model<br/>answers; never learns WHO"])`;

export default function BlogPrivateAiSetup() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Easy AI setup that keeps your data yours - LastDB</title>
        <meta name="description" content="Setting up AI in a local-first app shouldn't mean handing your data to a stranger. Here's how we're making AI setup one click in LastDB — local models for ingestion, and a split-trust design that keeps the cloud blind to what you chat about." />
        <meta property="og:title" content="Easy AI setup that keeps your data yours" />
        <meta property="og:description" content="One-click local AI for ingestion, plus a split-trust chat design where no single party holds both who you are and what you said." />
        <link rel="canonical" href="https://thelastdb.com/blog/private-ai-setup" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Easy AI setup that keeps your data yours</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">Setting up AI shouldn&rsquo;t mean handing your data to a stranger. Here&rsquo;s how we&rsquo;re making AI setup in LastDB one click &mdash; without breaking the promise that your data stays yours.</p>

      <p>Almost every app that touches AI starts you at the same wall: <span className="bold">paste an API key.</span> If you don&rsquo;t have one, you&rsquo;re stuck before you&rsquo;ve begun. And there&rsquo;s a deeper problem for an app like ours, where the whole point is that your data lives on your machine, encrypted: the moment you ask an AI a question <em>about</em> your data, that data tends to leave for someone&rsquo;s cloud. We didn&rsquo;t want either of those. Setup should be one click, and your data should stay yours.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>AI does two different jobs</h2>
      <p>Inside LastDB, AI does two very different things, and they deserve different answers:</p>
      <ul>
        <li><span className="bold white">Ingestion</span> &mdash; reading and organizing the stuff you put in. This runs on <em>small</em> models, and small models run perfectly well on your own computer. So we set this up locally, in one click (we use the open-source Ollama under the hood). Your documents get read <span className="bold">on your device, and never leave it.</span></li>
        <li><span className="bold white">Chat</span> &mdash; asking questions in plain language. This wants a <em>frontier</em> model, which is far too big to run on a laptop. This is the hard one &mdash; because to answer you, something has to read your words.</li>
      </ul>

      <Mermaid chart={SPLIT_DIAGRAM} />

      <Section variant="sage">
        <h2><span className="bold">Your node is the source of truth</span></h2>
        <p>The principle under everything LastDB does: your device holds your data, encrypted, and the cloud is not allowed to peek. For chat, that turns into a sharp question. If a big model has to read your words to answer them, how can that stay private?</p>
        <p>Our answer is a rule: <span className="bold">no single party is ever allowed to hold both halves of the secret</span> &mdash; <em>who you are</em>, and <em>what you said.</em> Split those two apart and keep them apart, and a leak on any one side tells you almost nothing.</p>
      </Section>

      <h2>The sealed box and the two clerks</h2>
      <p>Here&rsquo;s the idea without the jargon. Think of a <span className="bold">sealed lockbox</span> and <span className="bold">two clerks</span> who each only know half the story.</p>
      <p>Your device locks your message in a box that <em>only the final gateway can open.</em> Then it hands the box to the first clerk:</p>
      <ul>
        <li>The <span className="bold white">relay</span> is a clerk who knows <span className="bold">who you are</span> (it checks you&rsquo;re allowed in) but only ever carries a <span className="bold">sealed box</span>. It never sees a single word you wrote.</li>
        <li>The <span className="bold white">gateway</span> is a clerk who <span className="bold">can open the box</span> &mdash; but by the time it arrives, your name has been stripped off. It reads the words to get an answer from the model, and never learns whose words they are.</li>
      </ul>
      <p>So the text does get read &mdash; something has to, to answer you &mdash; but <span className="bold">nobody can tie the text back to you.</span> One clerk has your name and a locked box; the other has the words and no name. The frontier model sees the question, never the person. And we don&rsquo;t keep your conversations.</p>

      <Mermaid chart={FLOW_DIAGRAM} />

      <p className="dim">If you like standards: the &ldquo;sealed box&rdquo; is hybrid public-key encryption, and the two-clerk hand-off is Oblivious HTTP &mdash; the same family of techniques browsers use to fetch things privately. We didn&rsquo;t invent the crypto; we arranged it so the relay stays blind.</p>

      <Section variant="rose">
        <h2><span className="bold">The honest part</span></h2>
        <p>We&rsquo;d rather tell you exactly where the line is than oversell it. Two things we won&rsquo;t pretend about:</p>
        <p><span className="bold white">A frontier model still reads your words to answer them.</span> That&rsquo;s unavoidable today &mdash; the model can&rsquo;t respond to a question it can&rsquo;t see. What we <em>can</em> guarantee is that it never learns who you are, and that we don&rsquo;t store your conversations.</p>
        <p><span className="bold white">The relay genuinely can&rsquo;t read your messages</span> &mdash; they&rsquo;re sealed. But the gateway that opens them is still something we operate, so in the first version this rests partly on a <em>promise</em>: we built it not to peek, and we don&rsquo;t. The next step replaces the promise with proof &mdash; the gateway runs in a sealed environment that has to <span className="bold">cryptographically prove which code it&rsquo;s running</span> before it&rsquo;s even allowed to open a box. That turns &ldquo;we promise we don&rsquo;t read it&rdquo; into &ldquo;we <em>can&rsquo;t.</em>&rdquo; We&rsquo;re shipping the honest version first and showing you the seam.</p>
      </Section>

      <h2>Why go to the trouble</h2>
      <p>Because the easy path &mdash; just pipe everyone&rsquo;s chats through our servers in the clear &mdash; is exactly the path that quietly turns a private app into a not-private one. The convenience of setup should never cost you the thing you came for. <span className="bold">Local-first isn&rsquo;t only about where your data sits; it&rsquo;s a promise about who gets to see it.</span> One click to get going, and the answer to &ldquo;who can read my stuff?&rdquo; stays the same: you.</p>

      <p className="dim">More on how this philosophy shows up everywhere we build: <Link to="/blog/building-lastdb-with-agents">how we build LastDB in the open</Link>, and <Link to="/apps">the apps we build on LastDB</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
