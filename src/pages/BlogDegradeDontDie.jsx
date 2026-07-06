import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored/readable things, joint marks, mono caps labels, a
// single accent — here red marks the missing piece, sage marks the safe path).
// Rendered as inline SVG so there's no auto-layout.
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

// 1 — one query fans across many typed record sets. Two resolve cleanly; one
// has a config that drifted stale. The point of the drawing: the rest is still
// right there, readable.
const THE_GAP = `${SVG_OPEN('0 0 660 250')}
  <rect x="34" y="99" width="120" height="54" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="94" y="122" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">A QUERY</text>
  <text x="94" y="140" text-anchor="middle" fill="#928374" font-size="10">reads many types</text>

  <line x1="154" y1="120" x2="396" y2="56" stroke="#928374" stroke-width="1"/>
  <line x1="154" y1="126" x2="396" y2="122" stroke="#928374" stroke-width="1"/>
  <line x1="154" y1="132" x2="396" y2="188" stroke="#fb4934" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="266" y1="150" x2="278" y2="162" stroke="#fb4934" stroke-width="1"/>
  <line x1="278" y1="150" x2="266" y2="162" stroke="#fb4934" stroke-width="1"/>

  <rect x="394" y="54" width="4" height="4" fill="#928374"/>
  <rect x="400" y="34" width="200" height="44" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="500" y="52" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">TYPE A</text>
  <text x="500" y="68" text-anchor="middle" fill="#928374" font-size="10">config resolved</text>

  <rect x="394" y="120" width="4" height="4" fill="#928374"/>
  <rect x="400" y="100" width="200" height="44" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="500" y="118" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">TYPE B</text>
  <text x="500" y="134" text-anchor="middle" fill="#928374" font-size="10">config resolved</text>

  <rect x="394" y="186" width="4" height="4" fill="#fb4934"/>
  <rect x="400" y="166" width="200" height="44" fill="none" stroke="#fb4934" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="500" y="184" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">TYPE C</text>
  <text x="500" y="200" text-anchor="middle" fill="#fb4934" font-size="10">config missing</text>

  <text x="330" y="238" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">MOST OF WHAT YOU ASKED FOR IS STILL RIGHT THERE</text>
</svg>`;

// 2 — three postures toward the one bad slice. Two are failure modes; only the
// last is both useful and honest. The accent picks the target.
const THREE_POSTURES = `${SVG_OPEN('0 0 660 288')}
  <rect x="34" y="30" width="592" height="64" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="34" y="30" width="6" height="64" fill="#fb4934"/>
  <text x="60" y="58" fill="#ebdbb2" font-size="13" letter-spacing="1.5">HARD FAIL</text>
  <text x="60" y="78" fill="#928374" font-size="11">one missing config errors the entire read &mdash; you get nothing</text>

  <rect x="34" y="110" width="592" height="64" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="34" y="110" width="6" height="64" fill="#fb4934"/>
  <text x="60" y="138" fill="#ebdbb2" font-size="13" letter-spacing="1.5">SILENT DROP</text>
  <text x="60" y="158" fill="#928374" font-size="11">returns the rest, never says a type was skipped &mdash; wrong, quietly</text>

  <rect x="34" y="190" width="592" height="64" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="34" y="190" width="6" height="64" fill="#83a598"/>
  <text x="60" y="218" fill="#ebdbb2" font-size="13" letter-spacing="1.5">DEGRADE + REPORT</text>
  <text x="60" y="238" fill="#83a598" font-size="11">returns the rest AND names the gap, with the command that fixes it</text>

  <text x="330" y="276" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">SERVE WHAT YOU CAN &mdash; AND SAY WHAT YOU COULDN&rsquo;T</text>
</svg>`;

export default function BlogDegradeDontDie() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Degrade, Don&rsquo;t Die - LastDB</title>
        <meta name="description" content="When a database can't answer one part of your question, it has two honest options and one dishonest one. When a single type's schema config drifted stale on one machine, our Brain app kept answering every other type and printed the one command that would fix it — instead of failing the whole read. Serve what you can, and name the gap: the case for degrading loudly instead of dying cleanly." />
        <meta property="og:title" content="Degrade, Don't Die" />
        <meta property="og:description" content="A query that can't resolve one slice of config has three options: fail the whole thing, drop the slice silently, or answer the rest and say what it skipped. Only the last is both useful and honest." />
        <link rel="canonical" href="https://thelastdb.com/blog/degrade-dont-die" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Degrade, Don&rsquo;t Die</h1>
      <p className="post-meta dim">2026-07-04</p>

      <p className="bold white">When a database can&rsquo;t answer one part of your question, it has two honest options: fail the whole request, or answer the parts it can and tell you which part it couldn&rsquo;t. <span className="white">Most systems reach for the first</span>, because an all-or-nothing answer is easier to reason about. For a database you actually live inside &mdash; one that runs on your own machine for months and evolves as your apps do &mdash; it is exactly the wrong reflex.</p>

      <p>Brain is one of the two apps we build on top of LastDB &mdash; a knowledge base for notes and decisions &mdash; and we use it every day to build LastDB itself. It reads across many <span className="bold">kinds</span> of note at once &mdash; each kind a type, each type carrying a small schema that says what its shape is. Ask Brain a question and it fans out across those types, gathers what matches, and hands back one answer. This week, on one machine, one type&rsquo;s schema config drifted a step out of date &mdash; a stale local copy, lagging the shape it was meant to describe. A strict reader has a tidy response to that: refuse. It can&rsquo;t resolve the config for that one type, so the read is &ldquo;invalid,&rdquo; so you get an error and nothing else.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The stale slice</h2>
      <p>Here is what makes the strict response absurd: every <em>other</em> type you asked about is sitting right there, perfectly readable. The query spanned ten kinds of thing and stumbled on one. To answer none of it &mdash; to throw away the nine you could serve because the tenth is momentarily out of sync &mdash; is a strange kind of rigor. It punishes the reader for the state of a config they didn&rsquo;t touch.</p>

      <p>We watched the alternative from the inside. An automated job of ours queries Brain dozens of times an hour, and this week every answer it got back opened with the same calm line: <span className="dim">skipping one type &mdash; no config resolved for it &mdash; answering from the rest &mdash; repair it with one command.</span> The job got its answer. It also got told, precisely, what it hadn&rsquo;t gotten and how to make itself whole again. Nothing failed. Nobody was paged. The one drifted slice announced itself and stepped aside; the other nine came back exactly as asked.</p>

      <ArchFigure svg={THE_GAP} caption="Fig. 1 — one query, many types; one type's config has drifted, and the rest is still readable" />

      <Section variant="sage">
        <h2><span className="bold">Partial knowledge is still knowledge</span></h2>
        <p>The all-or-nothing reflex treats one unreadable slice as if the whole store were unreadable. It almost never is. A query that spans ten types and trips on one has already answered ninety percent of your question; discarding that ninety percent to punish the ten is not caution, it&rsquo;s theater. The useful default is the opposite of the strict one: <span className="bold">return everything you can resolve, and account for what you couldn&rsquo;t.</span></p>
      </Section>

      <Section variant="rose">
        <h2><span className="bold">But silence is its own bug</span></h2>
        <p>There is a failure mode that looks like graceful degradation and is quietly worse than dying: dropping the broken slice <em>without a word</em>. Had Brain returned the nine good types and simply omitted the tenth &mdash; no note, no flag &mdash; the routine would have received a subtly incomplete answer and believed it was complete. That is the most dangerous kind of wrong: the confident kind. An error at least tells you something is off; a silent gap tells you nothing while changing the answer underneath you. So graceful degradation is not &ldquo;return less and keep quiet.&rdquo; It has two halves, and the second is not optional: <span className="bold">serve what you can, and make the gap loud.</span></p>
      </Section>

      <ArchFigure svg={THREE_POSTURES} caption="Fig. 2 — fail hard, drop silently, or degrade and say so — only the last is both useful and honest" />

      <h2>Why this bites local-first hardest</h2>
      <p>On a machine you own, config drifts. That isn&rsquo;t a defect; it&rsquo;s the nature of software that lives on your disk for a long time and grows with the apps stacked on top of it. A new kind of note gets added. A local config lags a version behind for an afternoon. Two builds of an app skew briefly before one wins. A cloud database with a single, always-current config in the middle rarely meets this case, so it can afford to be brittle about it. A database that runs on <em>your</em> laptop and evolves in place meets it constantly.</p>

      <p>Which makes resilience to partial, in-flux config not a nicety but the whole game. It is the difference between a tool that keeps working <em>through</em> its own evolution and one that bolts the door every time it catches a piece of itself out of date. Local-first only earns the name if the thing still runs while the ground under it shifts &mdash; and the ground under a living system is always, a little, shifting.</p>

      <Section variant="sage">
        <h2><span className="bold">Fail soft, report hard</span></h2>
        <p>This is an old principle with a clause bolted on. Be liberal in what you accept &mdash; answer <em>around</em> the missing piece instead of collapsing onto it &mdash; but be strict about what you disclose: never let a gap pass unannounced. <span className="bold">Fail soft, report hard.</span> The payoff is a system that bends instead of breaking, and never lies about the bend.</p>
      </Section>

      <p>The job that hit the stale config this week didn&rsquo;t stall, didn&rsquo;t page anyone, and didn&rsquo;t hand back a half-answer wearing the costume of a whole one. It answered from the rest &mdash; and said so. A database you live inside should fail the way a good colleague does: do everything it still can, then tell you plainly about the one thing it couldn&rsquo;t, and exactly how to fix it.</p>

      <p className="dim">More on treating a schema as a living thing rather than a monument: <Link to="/blog/evolving-a-live-schema">Against Migration</Link>. And on how our automated agents keep themselves honest about what they do and don&rsquo;t know: <Link to="/blog/prove-it-to-land">Prove It To Land</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
