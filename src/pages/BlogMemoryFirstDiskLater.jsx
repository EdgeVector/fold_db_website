import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for "memory"). Rendered as inline SVG so there's no auto-layout.
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
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}${''}`;

// 1 — the read path: through the storage machinery, or straight to memory.
const READ_PATH = `${SVG_OPEN('0 0 660 262')}
  <text x="96" y="34" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE</text>
  <rect x="36" y="46" width="120" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="96" y="67" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">READ</text>
  <rect x="94" y="80" width="4" height="4" fill="#928374"/>
  <line x1="96" y1="84" x2="96" y2="104" stroke="#928374" stroke-width="1"/>
  <rect x="36" y="106" width="120" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="96" y="127" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">RESOLVE BUCKETS</text>
  <rect x="94" y="140" width="4" height="4" fill="#928374"/>
  <line x1="96" y1="144" x2="96" y2="164" stroke="#928374" stroke-width="1"/>
  <rect x="36" y="166" width="120" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="96" y="187" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">WALK · DECODE</text>
  <rect x="94" y="200" width="4" height="4" fill="#928374"/>
  <line x1="96" y1="204" x2="96" y2="218" stroke="#928374" stroke-width="1"/>
  <rect x="36" y="220" width="120" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="96" y="241" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">DISK</text>
  <text x="176" y="132" fill="#928374" font-size="10">every</text>
  <text x="176" y="146" fill="#928374" font-size="10">call</text>

  <line x1="252" y1="40" x2="252" y2="254" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="464" y="34" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1.5">AFTER</text>
  <rect x="404" y="46" width="120" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="464" y="67" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">READ</text>
  <rect x="462" y="80" width="4" height="4" fill="#83a598"/>
  <line x1="464" y1="84" x2="464" y2="112" stroke="#83a598" stroke-width="1"/>
  <rect x="404" y="114" width="120" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="464" y="133" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">RESIDENT GRAPH</text>
  <text x="464" y="149" text-anchor="middle" fill="#83a598" font-size="10">in memory — answer</text>

  <line x1="524" y1="136" x2="596" y2="136" stroke="#928374" stroke-width="1" stroke-dasharray="3 3"/>
  <polygon points="598,136 589,132 589,140" fill="#928374"/>
  <text x="560" y="126" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="1">MISS</text>
  <rect x="560" y="150" width="76" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="598" y="171" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">DISK</text>
  <line x1="560" y1="184" x2="484" y2="206" stroke="#928374" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="500" y="222" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="0.5">LOAD ONCE · INSTALL · NEXT READ HITS</text>
</svg>`;

// 2 — the write path: acknowledge after memory, persist behind, window bounded.
const WRITE_PATH = `${SVG_OPEN('0 0 660 248')}
  <text x="36" y="38" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE</text>
  <rect x="36" y="50" width="88" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="80" y="71" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">WRITE</text>
  <line x1="124" y1="67" x2="152" y2="67" stroke="#928374" stroke-width="1"/>
  <rect x="152" y="50" width="120" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="212" y="71" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">STORE ON DISK</text>
  <line x1="272" y1="67" x2="300" y2="67" stroke="#928374" stroke-width="1"/>
  <rect x="300" y="50" width="100" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="350" y="71" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">SYNC · FSYNC</text>
  <line x1="400" y1="67" x2="428" y2="67" stroke="#928374" stroke-width="1"/>
  <polygon points="430,67 421,63 421,71" fill="#928374"/>
  <rect x="430" y="50" width="88" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="474" y="71" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">ACK</text>
  <text x="544" y="71" fill="#928374" font-size="10">seconds</text>

  <line x1="36" y1="106" x2="624" y2="106" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="36" y="132" fill="#83a598" font-size="11" letter-spacing="1.5">AFTER</text>
  <rect x="36" y="144" width="88" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="80" y="165" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">WRITE</text>
  <line x1="124" y1="161" x2="152" y2="161" stroke="#83a598" stroke-width="1"/>
  <rect x="152" y="144" width="140" height="34" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="222" y="165" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">APPLY IN MEMORY</text>
  <line x1="292" y1="161" x2="320" y2="161" stroke="#83a598" stroke-width="1"/>
  <polygon points="322,161 313,157 313,165" fill="#83a598"/>
  <rect x="322" y="144" width="88" height="34" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="366" y="165" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">ACK</text>
  <text x="436" y="165" fill="#83a598" font-size="10">milliseconds</text>

  <rect x="220" y="178" width="4" height="4" fill="#928374"/>
  <line x1="222" y1="182" x2="222" y2="202" stroke="#928374" stroke-width="1" stroke-dasharray="3 3"/>
  <rect x="152" y="204" width="140" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="222" y="225" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">PERSIST BEHIND</text>

  <line x1="312" y1="204" x2="312" y2="238" stroke="#928374" stroke-width="1"/>
  <line x1="472" y1="204" x2="472" y2="238" stroke="#928374" stroke-width="1"/>
  <line x1="312" y1="221" x2="472" y2="221" stroke="#928374" stroke-width="1"/>
  <text x="482" y="225" fill="#928374" font-size="9" letter-spacing="0.5">BOUNDED WINDOW —</text>
  <text x="482" y="238" fill="#928374" font-size="9" letter-spacing="0.5">OVER CAP → INLINE</text>
</svg>`;

// 3 — the numbers, drawn to within-row scale (after is a sliver of before).
const NUMBERS = `${SVG_OPEN('0 0 660 224')}
  <text x="36" y="40" fill="#928374" font-size="10" letter-spacing="1.5">POINT READ</text>
  <rect x="36" y="48" width="480" height="14" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="524" y="59" fill="#928374" font-size="10">2,970 ms</text>
  <rect x="36" y="68" width="8" height="14" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="52" y="79" fill="#83a598" font-size="10">48 ms</text>

  <text x="36" y="112" fill="#928374" font-size="10" letter-spacing="1.5">COLUMN SCAN</text>
  <rect x="36" y="120" width="480" height="14" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="524" y="131" fill="#928374" font-size="10">10,300 ms</text>
  <rect x="36" y="140" width="98" height="14" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="142" y="151" fill="#83a598" font-size="10">2,100 ms</text>

  <text x="36" y="184" fill="#928374" font-size="10" letter-spacing="1.5">WRITE PIPELINE</text>
  <rect x="36" y="192" width="480" height="14" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="524" y="203" fill="#928374" font-size="10">~6,800 ms</text>
  <rect x="36" y="212" width="3" height="14" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="47" y="223" fill="#83a598" font-size="10">15&#8211;20 ms</text>
</svg>`;

export default function BlogMemoryFirstDiskLater() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Memory First, Disk Later - LastDB</title>
        <meta name="description" content="Our data measured under a gigabyte; our reads took three seconds. In one working session we made memory the primary and disk the diary: point reads went from 2,970 ms to 48 ms, and the write pipeline from seconds to under twenty milliseconds — on production data, measured honestly, with one incident along the way." />
        <meta property="og:title" content="Memory First, Disk Later" />
        <meta property="og:description" content="One working session: memory becomes the primary, disk becomes write-behind durability. Point reads 62x faster, measured on clones of the real production database — including the incident our own guardrail caught." />
        <link rel="canonical" href="https://thelastdb.com/blog/memory-first-disk-later" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Memory First, Disk Later</h1>
      <p className="post-meta dim">2026-07-30</p>

      <p className="bold white">The morning began with a question and an indignity. The question: what is the single biggest thing we could do to make LastDB fast? The indignity, uncovered by measurement: our entire logical dataset was smaller than a gigabyte, the machine had dozens free &mdash; and reading <span className="white">one record</span> still cost 60% of scanning an entire column. We were paying disk prices for data that fit in a pocket. By midnight the fix was designed, built, merged, and running on the production database this company runs on. This is how the day went.</p>

      <p>The production database in question is our own primary &mdash; the instance behind Brain and Kanban, the knowledge-base and task-board apps we build LastDB with. We dogfood everything; when reads are slow, our own tools are slow, and everyone here feels it before any customer would.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Measure before touching</h2>
      <p>The first hours produced no code, only numbers. Reading one record: about three seconds, and repetition did not help &mdash; it was structural work paid on every call, not a cold cache warming up. A single ordinary write triggered roughly <span className="bold">two thousand</span> cold storage-bucket loads, because the write path read broadly before it wrote narrowly. And the punchline already mentioned: all of this ceremony guarded less than a gigabyte of actual data.</p>
      <p>Numbers like these do two jobs. They tell you the disease is structural, not incidental &mdash; no cache tuning rescues a read that re-derives the world each call. And they hand you the acceptance test in advance: if memory becomes the primary, a repeated read should cost a hash lookup, and the instrument should be able to prove it.</p>

      <ArchFigure svg={READ_PATH} caption="Fig. 1 — the read path: through the machinery every call, or straight to resident memory" />

      <Section variant="sage">
        <h2><span className="bold">The design: resident-primary</span></h2>
        <p>Memory is the primary. The working set &mdash; the live graph of records &mdash; resides in RAM as typed objects, under a byte budget, and answers reads directly. Disk is <span className="bold">write-behind durability</span>: a background worker drains changes down; a miss loads from disk once, installs in memory, and the next read is a hit. This is not &ldquo;disk with a cache in front.&rdquo; The order of authority is inverted &mdash; memory first, disk later, cloud eventually.</p>
        <p>The honest fine print: acknowledging a write before it reaches disk creates a crash window. We bounded it &mdash; the same posture as group-commit, measured in fractions of a second &mdash; and never evict anything from memory that has not been persisted. A budget with an eviction policy that refuses to drop unsaved work is the difference between a fast database and a fast way to lose data.</p>
      </Section>

      <h2>Seven changes, one working session</h2>
      <p>The build broke into small, separately shippable pieces &mdash; each one merged and green before the next landed on top:</p>
      <ol>
        <li>Stop paying a full durability barrier on every write batch &mdash; the deferred-flush machinery already owned durability; the barrier was a vestige.</li>
        <li>Put the resident graph under a byte budget with least-recently-used eviction of <em>clean</em> entries only, plus the background persist worker.</li>
        <li>Serve every read path from memory first, disk as the miss path &mdash; records are content-addressed, so a memory hit can never disagree with disk.</li>
        <li>Acknowledge writes after the in-memory apply; persist behind.</li>
        <li>Defer a synchronous bookkeeping write that measurement showed was half the remaining acknowledgment cost.</li>
        <li>Cap the deferred window, so a burst degrades to the slow-but-safe inline path instead of queueing unbounded work.</li>
        <li>Build the measurement harness that proves all of the above on real data.</li>
      </ol>
      <p>Two of the seven were landed in parallel by our agent fleet &mdash; the autonomous engineering loop that builds LastDB alongside us &mdash; working from the same design notes and measurements. The pieces composed without a meeting: the fleet&rsquo;s write-path change consumed the budget-and-worker foundation from earlier in the day as if one hand had written both.</p>

      <ArchFigure svg={WRITE_PATH} caption="Fig. 2 — acknowledge after memory; persist behind; the window is bounded" />

      <Section variant="rose">
        <h2><span className="bold">The balloon</span></h2>
        <p>Within the first hour of memory-first writes running in production, memory usage jumped from 1.3 to 13.6 gigabytes in about sixty seconds, and the watchdog we keep pointed at the database did exactly what it exists to do: killed the process and restarted it. Ten seconds of downtime, no data corruption &mdash; the bounded-window design held &mdash; but a loud lesson: <span className="bold">a fast acknowledgment without backpressure is a loan</span>, and bursts collect.</p>
        <p>The first fix capped the deferred queue by task count. Measurement promptly demoted it: the balloon reproduced on a binary without the new write path at all, so the count cap was aimed at the wrong unit. The durable fix &mdash; one accounted byte budget across everything the deferral holds &mdash; landed the same night. We kept the incident record, the wrong first diagnosis and all. The record that survives revision is the one worth keeping.</p>
      </Section>

      <h2>Measure like you mean it</h2>
      <p>Every claim in this post was measured the same way: boot the candidate against a <span className="bold">copy-on-write clone of the real production database</span> &mdash; never a synthetic fixture, never the live node &mdash; and run the same instrument over both the old and new builds. Wall clocks lie in friendly ways, so the instrument also asserts counters: a warm read must perform <em>zero</em> cold storage loads, not merely feel quick. Phase timing inside the write path is what found the bookkeeping write hiding in plain sight, and it is also what keeps us honest about what remains: the storage work in a write acknowledgment is now fifteen to twenty milliseconds, and most of what the caller still waits on is request plumbing around it &mdash; named, measured, and next.</p>

      <ArchFigure svg={NUMBERS} caption="Fig. 3 — before and after, drawn to scale within each row" />

      <p>Point reads: 2,970 to 48 milliseconds. Column scans: 10,300 to 2,100. The write pipeline: seconds to under twenty milliseconds. Same data, same machine, one working session apart.</p>

      <h2>The shape of the day</h2>
      <p>Breakfast: a question. Morning: measurements that made the answer obvious. Afternoon: seven scoped changes, each merged behind its own tests. Evening: a green-gated cutover of the production database, an incident caught by its own guardrail, and a fix-forward before the night ended. No war room, no freeze, no migration &mdash; the same database, remembering that the fastest place to keep data you already hold is where you are already holding it.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
