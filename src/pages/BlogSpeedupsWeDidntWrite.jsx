import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for the fast/result path). Inline SVG — no auto-layout.
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

// 1 — listing one kind of record: scan everything vs. read only the slice.
const SCAN = `${SVG_OPEN('0 0 660 292')}
  <text x="36" y="56" fill="#ebdbb2" font-size="13" letter-spacing="1.5">BEFORE</text>
  <text x="36" y="73" fill="#928374" font-size="10">reads &amp; decodes every record</text>
  <rect x="180" y="44" width="420" height="40" fill="url(#poche)" stroke="#928374" stroke-width="1"/>

  <line x1="180" y1="96" x2="180" y2="110" stroke="#928374" stroke-width="1"/>
  <line x1="600" y1="96" x2="600" y2="110" stroke="#928374" stroke-width="1"/>
  <line x1="180" y1="103" x2="600" y2="103" stroke="#928374" stroke-width="1"/>
  <text x="390" y="128" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">EVERY RECORD &mdash; ~4,400 MS AT 50K</text>

  <text x="36" y="190" fill="#ebdbb2" font-size="13" letter-spacing="1.5">AFTER</text>
  <text x="36" y="207" fill="#928374" font-size="10">jumps to the matching slice</text>
  <rect x="180" y="178" width="420" height="40" fill="none" stroke="#504945" stroke-width="1"/>
  <rect x="180" y="178" width="64" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>

  <rect x="210" y="160" width="4" height="4" fill="#83a598"/>
  <line x1="212" y1="164" x2="212" y2="178" stroke="#83a598" stroke-width="1"/>
  <text x="252" y="172" fill="#83a598" font-size="10" letter-spacing="0.5">INDEX FINDS IT DIRECTLY</text>

  <line x1="180" y1="230" x2="180" y2="244" stroke="#83a598" stroke-width="1"/>
  <line x1="244" y1="230" x2="244" y2="244" stroke="#83a598" stroke-width="1"/>
  <line x1="180" y1="237" x2="244" y2="237" stroke="#83a598" stroke-width="1"/>
  <text x="212" y="262" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">MATCHING ONLY &mdash; ~10 MS, FLAT</text>
</svg>`;

// 2 — new-device restore: strictly serial vs. parallel fetch, ordered apply.
const RESTORE = `${SVG_OPEN('0 0 660 300')}
  <text x="36" y="50" fill="#ebdbb2" font-size="13" letter-spacing="1.5">BEFORE</text>
  <text x="36" y="67" fill="#928374" font-size="10">one entry at a time</text>

  <rect x="150" y="38" width="92" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="196" y="59" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">DOWNLOAD</text>
  <line x1="242" y1="55" x2="266" y2="55" stroke="#928374" stroke-width="1"/>
  <polygon points="270,55 261,51 261,59" fill="#928374"/>
  <rect x="270" y="38" width="92" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="316" y="59" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">DECRYPT</text>
  <line x1="362" y1="55" x2="386" y2="55" stroke="#928374" stroke-width="1"/>
  <polygon points="390,55 381,51 381,59" fill="#928374"/>
  <rect x="390" y="38" width="92" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="436" y="59" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">APPLY</text>
  <text x="500" y="59" fill="#928374" font-size="10">&times; 210K</text>

  <line x1="150" y1="86" x2="150" y2="100" stroke="#928374" stroke-width="1"/>
  <line x1="524" y1="86" x2="524" y2="100" stroke="#928374" stroke-width="1"/>
  <line x1="150" y1="93" x2="524" y2="93" stroke="#928374" stroke-width="1"/>
  <text x="337" y="118" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">STRICTLY SERIAL &mdash; ABOUT 7 HOURS</text>

  <text x="36" y="196" fill="#ebdbb2" font-size="13" letter-spacing="1.5">AFTER</text>
  <text x="36" y="213" fill="#928374" font-size="10">fetch in parallel,</text>
  <text x="36" y="226" fill="#928374" font-size="10">apply in order</text>

  <text x="215" y="166" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">DOWNLOAD + DECRYPT &mdash; &times;32</text>
  <rect x="150" y="174" width="130" height="16" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="150" y="196" width="130" height="16" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="150" y="218" width="130" height="16" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="150" y="240" width="130" height="16" fill="none" stroke="#928374" stroke-width="1"/>

  <line x1="280" y1="182" x2="416" y2="222" stroke="#928374" stroke-width="1"/>
  <line x1="280" y1="204" x2="416" y2="224" stroke="#928374" stroke-width="1"/>
  <line x1="280" y1="226" x2="416" y2="226" stroke="#928374" stroke-width="1"/>
  <line x1="280" y1="248" x2="416" y2="228" stroke="#928374" stroke-width="1"/>
  <polygon points="420,225 411,221 411,229" fill="#83a598"/>

  <rect x="420" y="204" width="130" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="485" y="223" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">APPLY</text>
  <text x="485" y="238" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="0.5">IN ORDER</text>
  <text x="485" y="278" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="0.5">ABOUT 15 MIN &mdash; BANDWIDTH-BOUND</text>
</svg>`;

export default function BlogSpeedupsWeDidntWrite() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>A week of speedups we didn&rsquo;t write - LastDB</title>
        <meta name="description" content="Last week the database got materially faster — one operation went from ~4.4 seconds to ~10 milliseconds, another from ~7 hours to ~15 minutes. No human wrote those changes. Our autonomous build loop did: it wrote the fixes, wrote the benchmarks that prove they worked, and merged its own pull requests." />
        <meta property="og:title" content="A week of speedups we didn’t write" />
        <meta property="og:description" content="The autonomous loop made the database faster — and built the benchmarks that prove it, including one win it found and deliberately chose not to take." />
        <link rel="canonical" href="https://thelastdb.com/blog/speedups-we-didnt-write" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">A week of speedups we didn&rsquo;t write</h1>
      <p className="post-meta dim">2026-06-28</p>

      <p className="bold white">Last week the database got materially faster. One common operation went from about 4.4 seconds to about 10 milliseconds. Another went from about seven hours to about fifteen minutes. <span className="white">No human wrote those changes.</span> Our autonomous build loop did &mdash; it found the slow paths, wrote the fixes, wrote the benchmarks that prove they worked, and merged its own pull requests. Here&rsquo;s what landed, and how the loop knew it helped.</p>

      <p>We&rsquo;ve <Link to="/blog/building-lastdb-with-agents">written before</Link> about how LastDB is built: humans set destinations, a loop of scheduled agents drives everything to merged on the development track, and only a handful of genuinely human decisions come back to us. Performance is one of those destinations. This is a week of it, in detail.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Two wins you&rsquo;d notice</h2>
      <p>Asking the database for every record of one kind &mdash; every card, every note &mdash; used to mean walking the <em>entire</em> store, decoding each record, and keeping the ones that matched. The cost grew with how much data you held, not with how big the answer was: a few milliseconds at ten thousand records, ten times that at a hundred thousand, headed for over a second as a store approached a million. The loop added a secondary index so the same question reads only the records that match. The answer is now a roughly fixed cost &mdash; about ten milliseconds &mdash; whether the store holds ten thousand records or a million.</p>

      <ArchFigure svg={SCAN} caption="Fig. 1 — scan everything, or read only the slice that matches" />

      <p>The second win is setting up a new device. Restoring from the cloud replays an encrypted change log, and it used to do that strictly one entry at a time: download, decrypt, apply, repeat. At roughly a tenth of a second per entry, a sizeable log &mdash; a couple hundred thousand entries &mdash; took about seven hours. The apply step genuinely has to run in order, so the loop left that alone. But the download-and-decrypt does not: it now runs thirty-two at a time, feeding an in-order apply. The restore is bound by your bandwidth instead of by round-trip latency. The same log now restores in about fifteen minutes.</p>

      <ArchFigure svg={RESTORE} caption="Fig. 2 — serial download, or parallel fetch into an ordered apply" />

      <p>Three smaller cuts landed alongside them: a redundant full copy of every record on the write path, removed; usage telemetry moved off the request&rsquo;s hot path so it runs beside the real work instead of in front of it; and sandboxed transforms moved off the thread that serves requests, so a slow one can&rsquo;t stall everything else. None is dramatic on its own. Together they trim the steady-state latency of ordinary work.</p>

      <Section variant="sage">
        <h2><span className="bold">How the loop knew it helped</span></h2>
        <p>The fixes aren&rsquo;t the interesting part. The interesting part is that the loop does not trust &ldquo;looks faster.&rdquo; Every one of these changes shipped <span className="bold">with a benchmark</span> &mdash; five new ones last week &mdash; that measures the path and then <span className="bold">guards</span> it: if a later change pushes it past a set threshold, the build fails.</p>
        <p>A speedup that isn&rsquo;t measured is a hope, not a result. So the order is always the same: write the measurement, write the fix, then leave behind a fence that keeps the win from quietly eroding six months from now. The numbers in this post aren&rsquo;t our impressions. They&rsquo;re what those benchmarks reported.</p>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">The win it didn&rsquo;t take</span></h2>
        <p>One of those new benchmarks found a path running about <span className="bold">fifteen times slower</span> than it could: a bulk scan over an area that&rsquo;s encrypted at rest pays a per-record decryption cost that adds up. The loop measured it, wrote it down &mdash; and deliberately <em>left it alone.</em></p>
        <p>Nothing in production reads that path yet. Optimizing it now would be solving a problem no one has, and trading simple code for speed that no user would feel. So the loop filed the finding, set a guard so the cost can&rsquo;t silently get worse, and moved on. Knowing what <span className="bold">not</span> to fix is the same discipline as knowing what to.</p>
      </Section>

      <h2>What the humans did</h2>
      <p>We set the direction &mdash; the database should be fast, and stay fast &mdash; and answered nothing else. The loop found the slow paths, wrote the fixes and the benchmarks, opened the pull requests, and drove them to merged without anyone in the chair. The one thing that came back to a human was publishing this post about it. The same local-first principle behind LastDB is the principle behind how we build it: the work runs on its own, in the open, without waiting on permission it doesn&rsquo;t need.</p>

      <p className="dim">More on the loop itself: <Link to="/blog/building-lastdb-with-agents">Building LastDB with an autonomous agent loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
