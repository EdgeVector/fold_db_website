import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored/durable data, dimension lines, joint marks, mono caps
// labels, a single accent for the one live path). Inline SVG — no auto-layout.
function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '34px 0', textAlign: 'center' }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && (
        <figcaption style={{ color: '#928374', fontSize: '11px', letterSpacing: '0.06em', marginTop: '10px', textTransform: 'uppercase' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const SVG_DEFS = `
  <defs>
    <pattern id="poche" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// 1 — one publisher, five subscriber loops, four of them wired to nothing.
const THE_BUS = `${SVG_OPEN('0 0 660 300')}
  <rect x="26" y="118" width="150" height="54" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="101" y="142" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">THE WRITE PATH</text>
  <text x="101" y="160" text-anchor="middle" fill="#928374" font-size="10">publishes 1 event</text>

  <text x="303" y="30" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">ASYNC MESSAGE BUS</text>
  <line x1="300" y1="42" x2="300" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="306" y1="42" x2="306" y2="270" stroke="#928374" stroke-width="1"/>

  <text x="180" y="139" fill="#83a598" font-size="9" letter-spacing="0.5">MutationExecuted</text>
  <line x1="176" y1="146" x2="298" y2="146" stroke="#83a598" stroke-width="1"/>
  <polygon points="300,146 291,142 291,150" fill="#83a598"/>

  <rect x="412" y="46" width="212" height="34" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="422" y="67" fill="#ebdbb2" font-size="11">MutationExecuted</text>
  <text x="614" y="67" text-anchor="end" fill="#83a598" font-size="9" letter-spacing="0.5">LIVE</text>
  <line x1="306" y1="63" x2="412" y2="63" stroke="#83a598" stroke-width="1"/>

  <rect x="412" y="94" width="212" height="34" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="422" y="115" fill="#928374" font-size="11">FieldValueSet</text>
  <text x="614" y="115" text-anchor="end" fill="#928374" font-size="9" letter-spacing="0.5">idle</text>
  <line x1="306" y1="111" x2="412" y2="111" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <rect x="412" y="142" width="212" height="34" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="422" y="163" fill="#928374" font-size="11">AtomCreated</text>
  <text x="614" y="163" text-anchor="end" fill="#928374" font-size="9" letter-spacing="0.5">idle</text>
  <line x1="306" y1="159" x2="412" y2="159" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <rect x="412" y="190" width="212" height="34" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="422" y="211" fill="#928374" font-size="11">MoleculeCreated</text>
  <text x="614" y="211" text-anchor="end" fill="#928374" font-size="9" letter-spacing="0.5">idle</text>
  <line x1="306" y1="207" x2="412" y2="207" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <rect x="412" y="238" width="212" height="34" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="422" y="259" fill="#928374" font-size="11">QueryExecuted</text>
  <text x="614" y="259" text-anchor="end" fill="#928374" font-size="9" letter-spacing="0.5">idle</text>
  <line x1="306" y1="255" x2="412" y2="255" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="176" y="232" fill="#928374" font-size="10" letter-spacing="0.5">4 event types</text>
  <text x="176" y="248" fill="#928374" font-size="10" letter-spacing="0.5">have NO publisher</text>
  <text x="176" y="264" fill="#928374" font-size="10" letter-spacing="0.5">in production</text>
</svg>`;

// 2 — the bug: the write commits durably, the publish fails, the client is told 400.
const THE_BUG = `${SVG_OPEN('0 0 660 250')}
  <rect x="24" y="96" width="178" height="66" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="113" y="126" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">WRITE COMMITTED</text>
  <text x="113" y="145" text-anchor="middle" fill="#ebdbb2" font-size="10">durable &middot; on disk</text>

  <line x1="202" y1="129" x2="284" y2="129" stroke="#928374" stroke-width="1"/>

  <rect x="286" y="104" width="104" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="338" y="134" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PUBLISH</text>
  <text x="338" y="176" text-anchor="middle" fill="#928374" font-size="9">every subscriber died</text>

  <line x1="390" y1="129" x2="414" y2="129" stroke="#928374" stroke-width="1"/>
  <line x1="418" y1="119" x2="418" y2="139" stroke="#83a598" stroke-width="1"/>
  <line x1="424" y1="119" x2="424" y2="139" stroke="#83a598" stroke-width="1"/>
  <line x1="428" y1="129" x2="452" y2="129" stroke="#928374" stroke-width="1"/>
  <polygon points="452,129 443,125 443,133" fill="#928374"/>

  <rect x="452" y="98" width="182" height="62" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="543" y="123" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">CLIENT SEES</text>
  <text x="543" y="147" text-anchor="middle" fill="#83a598" font-size="16" letter-spacing="1">HTTP 400</text>

  <line x1="113" y1="186" x2="113" y2="200" stroke="#928374" stroke-width="1"/>
  <line x1="543" y1="186" x2="543" y2="200" stroke="#928374" stroke-width="1"/>
  <line x1="113" y1="193" x2="543" y2="193" stroke="#928374" stroke-width="1"/>
  <text x="328" y="222" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">THE WRITE SUCCEEDED. THE RESPONSE SAID IT FAILED.</text>
</svg>`;

// 3 — after: one synchronous path, durable before the response returns.
const THE_DIRECT_CALL = `${SVG_OPEN('0 0 660 264')}
  <rect x="240" y="26" width="180" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="53" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">MUTATION COMMIT</text>

  <line x1="330" y1="70" x2="330" y2="100" stroke="#928374" stroke-width="1"/>
  <polygon points="330,104 326,95 334,95" fill="#928374"/>

  <rect x="222" y="106" width="216" height="52" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="130" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">RECORD PROCESS RESULT</text>
  <text x="330" y="148" text-anchor="middle" fill="#ebdbb2" font-size="10">one direct call, in-thread</text>

  <line x1="438" y1="132" x2="470" y2="132" stroke="#83a598" stroke-width="1"/>
  <text x="478" y="128" fill="#83a598" font-size="10">durable before the</text>
  <text x="478" y="142" fill="#83a598" font-size="10">client hears back</text>

  <line x1="330" y1="158" x2="330" y2="188" stroke="#928374" stroke-width="1"/>
  <polygon points="330,192 326,183 334,183" fill="#928374"/>

  <rect x="240" y="194" width="180" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="221" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">RESPOND</text>

  <text x="330" y="258" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">COMMIT &rarr; RECORD &rarr; RESPOND &mdash; ONE SYNCHRONOUS PATH</text>
</svg>`;

export default function BlogMachineryListeningToSilence() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Machinery Listening to Silence - LastDB</title>
        <meta name="description" content="Our database core carried a pub/sub event bus from an earlier design. In production it published exactly one kind of event and ran five subscriber loops per boot — four of them waiting forever on events that never came. Worse, the unused machinery invented a bug. We deleted the whole thing and made the one real behavior a direct call." />
        <meta property="og:title" content="Machinery Listening to Silence" />
        <meta property="og:description" content="An event bus that published one event and ran five subscribers — four listening to silence — and quietly turned a committed write into an error. The cost of an abstraction you don't use isn't zero. It's negative." />
        <link rel="canonical" href="https://thelastdb.com/blog/machinery-listening-to-silence" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Machinery Listening to Silence</h1>
      <p className="post-meta dim">2026-07-02</p>

      <p className="bold white">We deleted about fourteen hundred lines of an event system that, in production, had exactly one thing to say &mdash; and had spent the whole time getting in the way of saying it. <span className="white">Not dead code we could ignore. Live code, running seven perpetual loops on every boot, most of them waiting for events that could never arrive &mdash; and one of them, on a bad day, turning a successful write into an error the user could see.</span></p>

      <p>The core of our database still carried a publish/subscribe event bus from its original design. The idea is a familiar one, and a good one on paper: instead of the write path calling the things that care about a write directly, it <em>announces</em> that a write happened, and any number of interested parties subscribe. Decoupled. Extensible. Observable. The module&rsquo;s own documentation said as much &mdash; it existed, the comment explained, to &ldquo;demonstrate how event-driven architecture enables comprehensive observability.&rdquo;</p>

      <p>It demonstrated something else.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>One voice, five listeners</h2>
      <p>We went looking for it deliberately &mdash; a survey of the core for structure that had stopped paying rent. The bus was the first thing it found, and what the survey turned up was almost comic. In production, across the entire codebase, <span className="bold white">exactly one kind of event was ever published</span>: a note that a mutation had executed. And it was published &ldquo;best-effort&rdquo; &mdash; meaning if it failed to go out, the system shrugged and moved on.</p>

      <p>Meanwhile the receiving end was fully staffed. A monitor spawned <span className="bold">five</span> subscriber loops on every node boot, one for each event type the architecture imagined: field-value-set, atom-created, molecule-created, query-executed, and mutation-executed. Four of those five event types had <span className="bold white">no publisher anywhere</span>. Not a disabled one, not a rare one &mdash; none. Four loops, running for the entire life of the process, waiting on a doorbell that was never wired to a button.</p>

      <ArchFigure svg={THE_BUS} caption="Fig. 1 — one event published, five loops listening, four of them to silence" />

      <p>Nor was the monitor the only tenant. Its statistics &mdash; carefully tallied, per event type &mdash; were served by an endpoint that <span className="bold">nothing called</span>: no route, no screen, no consumer. And a second, entirely separate write path existed, driven by an event no one published &mdash; a subscriber with no speaker. That dead path was not merely present. It was being <span className="bold white">maintained</span>: a recent commit had carefully fixed a bug in a code path that, in production, never runs.</p>

      <Section variant="sage">
        <h2><span className="bold">The tell</span></h2>
        <p>This is what unused abstraction actually looks like from the inside. Not a tidy block of code labelled <code>// dead</code> that you can delete on a slow afternoon. It looks like <span className="bold white">activity</span> &mdash; loops running, statistics accumulating, bugs being diligently fixed &mdash; all of it perfectly real, and all of it pointed at nothing. The machinery hums. You have to check whether anything is on the other end.</p>
      </Section>

      <h2>Then it cost us a bug</h2>
      <p>Idle machinery you can argue about. This machinery did worse than idle: it manufactured a failure the direct path could not have.</p>

      <p>Recording the outcome of a write &mdash; so the ingestion UI can show progress &mdash; was the <em>one</em> thing the bus really carried. It rode on that single live event. So the sequence was: commit the write to disk, durably; then publish the event; then, on the far end, a subscriber records the result. Three steps, loosely joined, and the join was the problem. When the subscribers had died &mdash; and being long-lived background loops, sometimes they had &mdash; the publish failed. And because it failed <em>after</em> the commit but on the same request, the client was handed an <span className="bold white">HTTP 400</span>. The write was on disk. The user was told it had failed.</p>

      <ArchFigure svg={THE_BUG} caption="Fig. 2 — the committed write, reported to the caller as an error" />

      <Section variant="rose">
        <h2><span className="bold">The mitigation was worse than the bug</span></h2>
        <p>Faced with &ldquo;a committed write sometimes reports as failed,&rdquo; the natural fix is to stop letting a publish failure reach the client &mdash; wrap the subscribers in panic-guards, make the publish swallow its own errors. Which we had done. But look at what that trades. The loud lie &mdash; <span className="bold">400 on a write that worked</span> &mdash; becomes a quiet one: the event is simply <span className="bold white">lost</span>. The write is fine, but its recorded outcome never lands, so the progress the UI is polling for never arrives, or arrives in a race with a poll that already gave up. We had spent real effort making a problem <em>quieter</em>. The problem was that the step existed at all.</p>
      </Section>

      <h2>The fix was a subtraction</h2>
      <p>The thing the bus was for &mdash; recording that outcome &mdash; is not a message that needs a courier. It is a function call. It happens in the same process, in the same crate, microseconds away. So we made it exactly that: on the commit path, <span className="bold white">commit the write, then record the result, then respond</span> &mdash; three ordinary calls, in order, on one thread. The outcome is durable <em>before</em> the response returns. There is no window in which the write is done but its result is in flight, because nothing is in flight.</p>

      <ArchFigure svg={THE_DIRECT_CALL} caption="Fig. 3 — the same behavior, as a direct call on the commit path" />

      <p>Everything else went in the bin. The bus, its typed events, the five-loop monitor, the uncalled statistics endpoint, the second write path with no publisher, the atomics that tracked whether the phantom listener was listening, and the constructor plumbing whose only job was to thread the bus into all of it. About fourteen hundred lines gone; seven perpetual background tasks that no longer start; and a category of bug &mdash; &ldquo;a committed write reported as a failure&rdquo; &mdash; that is now not fixed but <span className="bold white">impossible</span>. Even the tests got shorter: several of them had learned to <code>sleep</code> for a beat, waiting for the async subscriber to catch up. Recording is synchronous now. There is nothing to wait for.</p>

      <Section variant="sage">
        <h2><span className="bold">The cost of unused indirection is negative</span></h2>
        <p>We tell ourselves an abstraction we&rsquo;re not using yet is free &mdash; harmless overhead, insurance against a future need. It isn&rsquo;t. It is code a reader of the core must understand before they can trust the write path. It is loops that run, statistics that accrue, a dead branch someone will earnestly bug-fix. And because indirection can fail <em>between</em> two things that each worked, it can invent failure modes the direct call simply cannot have. The unused abstraction didn&rsquo;t cost nothing. It cost a bug, a mitigation, a maintained dead path, and fourteen hundred lines of reading &mdash; in exchange for a message it delivered to itself.</p>
      </Section>

      <p>The best version of a system is not the one with the most seams to extend at. It is the one where the write path reads, top to bottom, as exactly the things that happen when you write &mdash; and nothing is standing in the room listening for a sound that never comes.</p>

      <p className="dim">One in a series on <Link to="/blog/n-plus-one-six-bugs">finding</Link> and removing the machinery a codebase accumulates &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
