import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for "solid/stored", dimension lines with ticks, joint marks,
// mono caps labels, a single accent for the thing that breaks).
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

// 1 — two ways to hand data to a program: argv (copied in at launch, capped)
//     vs stdin (a stream, read after launch, uncapped).
const CHANNELS = `${SVG_OPEN('0 0 660 250')}
  <rect x="24" y="94" width="150" height="62" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="99" y="120" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE SHELL</text>
  <text x="99" y="138" text-anchor="middle" fill="#928374" font-size="10">builds the command</text>

  <line x1="330" y1="26" x2="330" y2="228" stroke="#504945" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="330" y="20" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="2">EXEC( )</text>

  <rect x="486" y="94" width="150" height="62" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="561" y="120" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">JQ</text>
  <text x="561" y="138" text-anchor="middle" fill="#928374" font-size="10">the program</text>

  <!-- ARGV lane: a bounded slot with an end wall -->
  <text x="196" y="52" fill="#928374" font-size="10" letter-spacing="1.5">ARGV — COPIED IN AT LAUNCH</text>
  <rect x="196" y="60" width="250" height="20" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <line x1="446" y1="52" x2="446" y2="88" stroke="#928374" stroke-width="2"/>
  <text x="452" y="66" fill="#928374" font-size="9" letter-spacing="1">A</text>
  <text x="452" y="77" fill="#928374" font-size="9" letter-spacing="1">WALL</text>
  <line x1="174" y1="106" x2="196" y2="76" stroke="#928374" stroke-width="1"/>
  <rect x="194" y="74" width="4" height="4" fill="#928374"/>
  <polyline points="446,80 468,104 484,104" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="484" y="102" width="4" height="4" fill="#928374"/>

  <!-- STDIN lane: an open pipe, no end wall -->
  <line x1="196" y1="176" x2="470" y2="176" stroke="#83a598" stroke-width="1"/>
  <line x1="196" y1="196" x2="470" y2="196" stroke="#83a598" stroke-width="1"/>
  <polygon points="484,186 468,180 468,192" fill="#83a598"/>
  <line x1="174" y1="144" x2="196" y2="176" stroke="#83a598" stroke-width="1"/>
  <rect x="194" y="174" width="4" height="4" fill="#83a598"/>
  <line x1="484" y1="150" x2="470" y2="186" stroke="#83a598" stroke-width="1"/>
  <text x="200" y="222" fill="#83a598" font-size="10" letter-spacing="1.5">STDIN — A STREAM, READ AFTER LAUNCH, NO WALL</text>
</svg>`;

// 2 — the argv payload grows PR by PR until it crosses the kernel's fixed
//     ceiling, and the exec is refused before the program even starts.
const CEILING = `${SVG_OPEN('0 0 660 262')}
  <line x1="86" y1="216" x2="618" y2="216" stroke="#928374" stroke-width="1"/>
  <polygon points="618,216 606,212 606,220" fill="#928374"/>
  <text x="300" y="240" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1.5">MERGED PRS ACCUMULATED &#8594;</text>

  <line x1="86" y1="56" x2="604" y2="56" stroke="#928374" stroke-width="1" stroke-dasharray="4 4"/>
  <rect x="82" y="54" width="4" height="4" fill="#928374"/>
  <text x="92" y="48" text-anchor="start" fill="#928374" font-size="10" letter-spacing="1.5">ARG_MAX — HARD KERNEL CEILING</text>

  <rect x="112" y="192" width="30" height="24" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="164" y="176" width="30" height="40" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="216" y="150" width="30" height="66" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="268" y="124" width="30" height="92" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="320" y="102" width="30" height="114" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="372" y="82" width="30" height="134" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="424" y="66" width="30" height="150" fill="url(#poche)" stroke="#928374" stroke-width="1"/>

  <rect x="476" y="34" width="30" height="182" fill="url(#poche)" stroke="#83a598" stroke-width="1.5"/>
  <line x1="470" y1="56" x2="512" y2="56" stroke="#83a598" stroke-width="2"/>
  <text x="520" y="104" fill="#83a598" font-size="10" letter-spacing="1">&#10007; EXEC REFUSED</text>
  <text x="520" y="120" fill="#928374" font-size="9">Argument list</text>
  <text x="520" y="132" fill="#928374" font-size="9">too long</text>
</svg>`;

// 3 — the three-line fix: the same payload, rerouted off argv onto stdin.
const REROUTE = `${SVG_OPEN('0 0 660 236')}
  <text x="24" y="30" fill="#928374" font-size="10" letter-spacing="2">BEFORE</text>
  <rect x="24" y="44" width="120" height="46" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="84" y="66" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PAYLOAD</text>
  <text x="84" y="80" text-anchor="middle" fill="#928374" font-size="9">merged PRs</text>
  <line x1="144" y1="67" x2="236" y2="67" stroke="#928374" stroke-width="1"/>
  <polygon points="236,67 224,63 224,71" fill="#928374"/>
  <text x="190" y="58" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="1">--argjson</text>
  <rect x="238" y="50" width="150" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <line x1="388" y1="44" x2="388" y2="90" stroke="#928374" stroke-width="2"/>
  <text x="313" y="71" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">ARGV</text>
  <text x="440" y="71" fill="#928374" font-size="11" letter-spacing="1">&#10007; NEVER STARTS</text>

  <line x1="24" y1="120" x2="636" y2="120" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="24" y="150" fill="#83a598" font-size="10" letter-spacing="2">AFTER</text>
  <rect x="24" y="164" width="120" height="46" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="84" y="186" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PAYLOAD</text>
  <text x="84" y="200" text-anchor="middle" fill="#928374" font-size="9">same bytes</text>
  <line x1="144" y1="181" x2="236" y2="181" stroke="#83a598" stroke-width="1"/>
  <line x1="144" y1="193" x2="236" y2="193" stroke="#83a598" stroke-width="1"/>
  <polygon points="240,187 224,181 224,193" fill="#83a598"/>
  <text x="190" y="216" text-anchor="middle" fill="#83a598" font-size="9" letter-spacing="1">stdin  &lt;&lt;&lt;</text>
  <rect x="248" y="170" width="150" height="34" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="323" y="191" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">JQ</text>
  <text x="450" y="191" fill="#83a598" font-size="11" letter-spacing="1">&#10003; RUNS</text>
</svg>`;

export default function BlogArgumentListTooLong() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Argument List Too Long - LastDB</title>
        <meta name="description" content="A dashboard we had shipped a hundred times started refusing to run — not because the data was wrong, but because there was too much of it to hand over the way we were handing it. The story of an invisible ceiling that scales in exact proportion to how well things are going, and the three-line fix." />
        <meta property="og:title" content="Argument List Too Long" />
        <meta property="og:description" content="argv is not a data channel. It has a fixed, invisible ceiling — and anywhere you pour growing data into a command line is a failure that passes every test and every early day, then trips the moment you succeed enough." />
        <link rel="canonical" href="https://thelastdb.com/blog/argument-list-too-long" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Argument List Too Long</h1>
      <p className="post-meta dim">2026-07-01</p>

      <p className="bold white">A little script that had run cleanly a hundred times started failing every single run &mdash; and the error came from the kernel, not from our code. The data was not wrong. There was simply too much of it to hand over <span className="white">the way we were handing it.</span> The ceiling we hit is invisible, universal, and scales in exact proportion to how well things are going.</p>

      <p>The script is unglamorous: once a day it rolls up the last few days of merged pull requests into a single JSON file that a dashboard reads, so anyone can see at a glance what shipped and how CI is holding up. It leans on <code>jq</code> to shape the JSON. It had worked, quietly, for weeks. Then the scheduled run went red. Then it stayed red &mdash; every run, same line:</p>

      <p><code>jq: Argument list too long</code></p>

      <p>The temptation is to read that as &ldquo;<code>jq</code> broke&rdquo; or &ldquo;the JSON is malformed.&rdquo; Neither was true. The JSON was fine. <code>jq</code> was fine. The program never got the chance to be the problem &mdash; it never started.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Two doors into a program</h2>
      <p>There are two everyday ways to get data into a command-line program, and they are not interchangeable. You can pass it as <span className="bold white">arguments</span> &mdash; the words after the command &mdash; or you can stream it in through <span className="bold white">standard input</span>. They feel like the same thing. Underneath, they could hardly be more different.</p>

      <ArchFigure svg={CHANNELS} caption="Fig. 1 — argv is copied into the process at launch; stdin is a stream read afterwards" />

      <Section variant="sage">
        <h2><span className="bold">One is a room; the other is a pipe</span></h2>
        <p>Arguments are <span className="bold">copied into the new process by the operating system at the instant it launches</span> &mdash; and the space reserved for that copy is finite. There is a hard cap, <code>ARG_MAX</code>, on the combined size of everything you put on a command line. It is generous, so you rarely meet it. But it is a wall, and it does not move.</p>
        <p>Standard input has no such wall. It is a stream the program reads once it is already running &mdash; a pipe you can pour any amount through, a byte at a time. Same bytes, entirely different physics.</p>
      </Section>

      <p>Our script was pouring the merged-PR JSON through the first door. It handed the whole accumulated blob to <code>jq</code> as a command-line argument. For weeks that blob was small enough to fit through, and everything worked &mdash; which is precisely what makes this class of bug so patient.</p>

      <h2>The ceiling that rises to meet your success</h2>
      <p>Here is the cruel part. The size of that argument was not fixed &mdash; it grew with the number of merged pull requests in the window. Every PR we shipped made the blob a little larger. The more work the team landed, the closer the argument crept to the wall. The failure was not seeded by a bad commit. It was seeded by <span className="bold white">shipping enough good ones.</span></p>

      <ArchFigure svg={CEILING} caption="Fig. 2 — the argument grows PR by PR until it crosses a ceiling that never moves" />

      <Section variant="rose">
        <h2><span className="bold">The error blames the wrong thing</span></h2>
        <p>Because arguments are copied in <span className="bold">before your program runs</span>, this fails at the launch itself. The kernel refuses to start the process at all. So the message you get &mdash; <code>Argument list too long</code> &mdash; is reported against <code>jq</code>, a program that never executed a single line. The tool named in the error is the one victim guaranteed to be innocent. You can read its source all afternoon and find nothing.</p>
      </Section>

      <p>Every early run passed. Every test passed &mdash; tests are run against small, tidy fixtures, which is to say against exactly the conditions under which this bug is invisible. It waited, politely, for production and for time.</p>

      <h2>The fix was three lines</h2>
      <p>The repair was not to shrink the data or to page through it. It was to stop using the wrong door. We rerouted the same bytes off the argument list and onto standard input &mdash; a here-string in the shell, and a one-word change in the <code>jq</code> program to read its input as a stream rather than a named argument. Same data, same output, no wall.</p>

      <ArchFigure svg={REROUTE} caption="Fig. 3 — the same payload, moved off argv and onto stdin" />

      <p>That is the whole change. Three lines. The dashboard went green on the next run and has stayed green since.</p>

      <h2>The rule we took from it</h2>
      <p><span className="bold white">argv is not a data channel.</span> It is a place for a handful of flags and names &mdash; small, bounded, known-in-advance things. The moment you interpolate something that <em>grows</em> &mdash; a list, an accumulated blob, anything whose size is a function of how much has happened &mdash; you have planted a failure that will pass every test, survive every review, and work flawlessly right up until the day you have succeeded enough to trip it. When the data is unbounded, pipe it. Give the program a stream, not a sentence.</p>

      <p className="dim">One of many small lessons from letting an <Link to="/blog/building-lastdb-with-agents">autonomous loop</Link> build and operate LastDB &mdash; where the tooling has to survive its own success.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
