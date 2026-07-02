import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent). Rendered as inline SVG so there's no auto-layout.
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

// 1 — the anatomy: one click, one request per schema, a fixed fd ceiling.
const ANATOMY = `${SVG_OPEN('0 0 660 268')}
  <rect x="36" y="84" width="150" height="110" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="111" y="130" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BROWSE TAB</text>
  <text x="111" y="150" text-anchor="middle" fill="#928374" font-size="10">one tab, one click</text>

  <text x="308" y="76" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ONE REQUEST PER SCHEMA</text>
  <line x1="186" y1="94" x2="428" y2="94" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="104" x2="428" y2="104" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="114" x2="428" y2="114" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="124" x2="428" y2="124" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="134" x2="428" y2="134" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="144" x2="428" y2="144" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="154" x2="428" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="164" x2="428" y2="164" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="174" x2="428" y2="174" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="184" x2="428" y2="184" stroke="#928374" stroke-width="1"/>
  <polygon points="428,139 419,135 419,143" fill="#928374"/>

  <rect x="430" y="84" width="196" height="110" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="528" y="112" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">EMBEDDED SERVER</text>
  <line x1="442" y1="152" x2="614" y2="152" stroke="#83a598" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="528" y="144" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">FD CEILING — 256</text>
  <text x="528" y="174" text-anchor="middle" fill="#928374" font-size="10">the accept loop dies</text>

  <line x1="186" y1="204" x2="186" y2="218" stroke="#928374" stroke-width="1"/>
  <line x1="428" y1="204" x2="428" y2="218" stroke="#928374" stroke-width="1"/>
  <line x1="186" y1="211" x2="428" y2="211" stroke="#928374" stroke-width="1"/>
  <text x="307" y="234" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">459 IN FLIGHT × ~2 FDS EACH</text>

  <text x="330" y="260" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">EMFILE — THE SERVER UNLINKS ITS OWN SOCKET ON THE WAY DOWN</text>
</svg>`;

// 2 — one bug, six confident diagnoses.
const FACES = `${SVG_OPEN('0 0 660 322')}
  <rect x="36" y="111" width="200" height="72" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="136" y="142" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">N+1 IN BROWSE</text>
  <text x="136" y="161" text-anchor="middle" fill="#83a598" font-size="10">fd exhaustion</text>

  <rect x="234" y="145" width="4" height="4" fill="#928374"/>
  <line x1="236" y1="147" x2="294" y2="147" stroke="#928374" stroke-width="1"/>
  <line x1="294" y1="37" x2="294" y2="257" stroke="#928374" stroke-width="1"/>

  <line x1="294" y1="37" x2="344" y2="37" stroke="#928374" stroke-width="1"/>
  <polygon points="350,37 341,33 341,41" fill="#928374"/>
  <line x1="294" y1="81" x2="344" y2="81" stroke="#928374" stroke-width="1"/>
  <polygon points="350,81 341,77 341,85" fill="#928374"/>
  <line x1="294" y1="125" x2="344" y2="125" stroke="#928374" stroke-width="1"/>
  <polygon points="350,125 341,121 341,129" fill="#928374"/>
  <line x1="294" y1="169" x2="344" y2="169" stroke="#928374" stroke-width="1"/>
  <polygon points="350,169 341,165 341,173" fill="#928374"/>
  <line x1="294" y1="213" x2="344" y2="213" stroke="#928374" stroke-width="1"/>
  <polygon points="350,213 341,209 341,217" fill="#928374"/>
  <line x1="294" y1="257" x2="344" y2="257" stroke="#928374" stroke-width="1"/>
  <polygon points="350,257 341,253 341,261" fill="#928374"/>

  <rect x="352" y="20" width="272" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="488" y="42" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">AN UNLOCK / KEYCHAIN BUG</text>
  <rect x="352" y="64" width="272" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="488" y="86" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">DATA LOSS</text>
  <rect x="352" y="108" width="272" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="488" y="130" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">A STALE BUILD</text>
  <rect x="352" y="152" width="272" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="488" y="174" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">WARRING DAEMONS</text>
  <rect x="352" y="196" width="272" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="488" y="218" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">A SYNC AUTH FAILURE</text>
  <rect x="352" y="240" width="272" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="488" y="262" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">A HAUNTED SOCKET</text>

  <line x1="352" y1="288" x2="352" y2="302" stroke="#928374" stroke-width="1"/>
  <line x1="624" y1="288" x2="624" y2="302" stroke="#928374" stroke-width="1"/>
  <line x1="352" y1="295" x2="624" y2="295" stroke="#928374" stroke-width="1"/>
  <text x="488" y="318" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">SIX CONFIDENT DIAGNOSES — ONE BUG</text>
</svg>`;

// 3 — the recovery reflex re-arms the bug: every relaunch reopens Browse.
const LOOP = `${SVG_OPEN('0 0 660 322')}
  <rect x="250" y="24" width="160" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="45" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BLANK WINDOW</text>
  <text x="330" y="62" text-anchor="middle" fill="#928374" font-size="10">socket gone · no error</text>

  <rect x="470" y="136" width="150" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="545" y="157" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RELAUNCH</text>
  <text x="545" y="174" text-anchor="middle" fill="#928374" font-size="10">the reflex</text>

  <rect x="250" y="248" width="160" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="269" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BROWSE OPENS</text>
  <text x="330" y="286" text-anchor="middle" fill="#928374" font-size="10">as it always does</text>

  <rect x="30" y="136" width="180" height="48" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="120" y="157" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">459 REQUESTS</text>
  <text x="120" y="174" text-anchor="middle" fill="#83a598" font-size="10">the n+1 fires again</text>

  <rect x="408" y="46" width="4" height="4" fill="#928374"/>
  <polyline points="410,48 545,48 545,128" fill="none" stroke="#928374" stroke-width="1"/>
  <polygon points="545,134 541,125 549,125" fill="#928374"/>

  <rect x="543" y="184" width="4" height="4" fill="#928374"/>
  <polyline points="545,186 545,272 418,272" fill="none" stroke="#928374" stroke-width="1"/>
  <polygon points="412,272 421,268 421,276" fill="#928374"/>

  <rect x="248" y="270" width="4" height="4" fill="#928374"/>
  <polyline points="250,272 120,272 120,190" fill="none" stroke="#83a598" stroke-width="1"/>
  <polygon points="120,184 116,193 124,193" fill="#83a598"/>

  <rect x="118" y="134" width="4" height="4" fill="#83a598"/>
  <polyline points="120,136 120,48 242,48" fill="none" stroke="#83a598" stroke-width="1"/>
  <polygon points="248,48 239,44 239,52" fill="#83a598"/>

  <text x="330" y="166" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">DEAD AGAIN IN SECONDS, EVERY TIME</text>
</svg>`;

export default function BlogNPlusOneSixBugs() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The N+1 That Looked Like Six Bugs - LastDB</title>
        <meta name="description" content="For three days our own database greeted us with a blank window, and we diagnosed six different bugs. There was one: a textbook N+1 in the data browser — one request per schema, hundreds at once — that exhausted the file descriptors macOS grants a GUI app and killed the embedded server seconds after every launch. Everything else was an echo. How a resource bug impersonates other bugs, and why restarting kept re-arming it." />
        <meta property="og:title" content="The N+1 That Looked Like Six Bugs" />
        <meta property="og:description" content="One textbook N+1, billed in file descriptors instead of latency. It killed the server seconds after every launch, and wore six disguises while we hunted it." />
        <link rel="canonical" href="https://thelastdb.com/blog/n-plus-one-six-bugs" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The N+1 That Looked Like Six Bugs</h1>
      <p className="post-meta dim">2026-07-02</p>

      <p className="bold white">For three days our own database kept greeting us with a blank window, and over those days we diagnosed &mdash; with real conviction &mdash; six different bugs. There was one. <span className="white">A textbook N+1 in the data browser, the most ordinary bug in software, billed in the one currency nobody was watching: file descriptors.</span> Everything else we blamed was an echo of it, and the universal recovery reflex &mdash; quit and reopen &mdash; re-armed it on every launch.</p>

      <p>We build LastDB on LastDB, so the machine that kept dying held our own notes and our own task board. That is the point of dogfooding: when it breaks, it breaks <em>us</em> &mdash; and we get to feel exactly what a user would feel, which was an app that unlocked, showed its data for a breath, and went dark.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The most ordinary bug in software</h2>
      <p>Everyone knows the N+1: fetch a list, then issue one query per item on it. Every ORM tutorial warns about it, always with the same moral &mdash; it makes things <em>slow</em>. Ours didn&rsquo;t make anything slow. Opening the Browse tab listed the schemas, then fired a count request for <em>each one</em> &mdash; hundreds of them, all at once, straight at the embedded server.</p>
      <p>Here is the part the tutorials skip. Each in-flight request holds open connections, and each connection costs file descriptors &mdash; and macOS starts a desktop app with a budget of <span className="bold">256</span>. The burst blew through it instantly. The server&rsquo;s accept loop asked for one more descriptor, was refused, and died &mdash; and, tidy to the very end, <span className="bold white">unlinked its own socket on the way down</span>. Seconds after unlock, the app had killed itself. The window went blank, every later request reported &ldquo;network connection failed,&rdquo; and the process sat there looking perfectly healthy.</p>

      <ArchFigure svg={ANATOMY} caption="Fig. 1 — one click, 459 requests, a 256-descriptor budget" />

      <p>An N+1 is not a performance bug. It is an <span className="bold white">unbounded fan-out</span>, and it bills you in whatever resource runs out first. Usually that&rsquo;s time, so we&rsquo;ve all agreed to call it a performance problem. Ours ran out of descriptors first &mdash; and a resource bug does not present at its cause. It presents wherever the <em>next</em> allocation fails.</p>

      <h2>Six faces</h2>
      <p>Which is how one bug wore six disguises. Over three days we confidently convicted, in order: an unlock/keychain regression (the window died right after unlock, every time &mdash; of course it looked like unlock). Data loss (the window was empty; the data was fine). A stale build (we rebuilt; the corpse looked identical). Warring background daemons (real hazard, wrong culprit &mdash; we removed them; the app kept dying). A cloud-sync auth failure (its retries were genuinely noisy, which made it a superb decoy). And finally a haunted socket that &ldquo;kept vanishing&rdquo; &mdash; which was true, and was the bug&rsquo;s signature, not its cause.</p>

      <ArchFigure svg={FACES} caption="Fig. 2 — six confident diagnoses, one bug" />

      <p>Every theory had evidence, because the corpse was real &mdash; only the murderer kept changing. We even shipped a release for one of the theories. The theory was wrong; the release was sincere. The tell we kept ignoring: <span className="bold">if a symptom survives one clean rebuild, it is not a stale binary</span> &mdash; and if the window dies right after the same tab opens, look at what that tab <em>does</em>.</p>

      <Section variant="rose">
        <h2><span className="bold">The reflex re-armed the bug</span></h2>
        <p>&ldquo;Turn it off and on again&rdquo; is treated as neutral first aid: worst case, nothing changes. Here the bug lived on the launch path itself. Relaunch the app, it unlocks, Browse loads &mdash; as it always does &mdash; and the N+1 fires again: dead in seconds, every time, with fresh debris (orphaned sockets, respawning watchdogs, duplicate instances fighting for the database lock) scattered for the next lap&rsquo;s theories to feed on. The restart wasn&rsquo;t failing to fix the bug. <span className="bold white">The restart was running it.</span></p>
      </Section>

      <ArchFigure svg={LOOP} caption="Fig. 3 — the recovery reflex, running the bug on a loop" />

      <Section variant="sage">
        <h2><span className="bold">Thirty seconds of counting</span></h2>
        <p>The worst single session ran sixteen hours &mdash; five rebuilds, ten restarts, each lap powered by a theory. The breakthrough took one act of observation: watching the app actually die, then counting. Four read-only checks, each a single command, would have named this on day one:</p>
        <ul>
          <li><span className="bold">Count the file descriptors</span> the process holds against its limit. This one check <em>was</em> the diagnosis.</li>
          <li><span className="bold">List the sockets</span> and probe them &mdash; a vanished socket under a healthy process is a signature, and this is whose.</li>
          <li><span className="bold">Count the instances</span> &mdash; and ask who holds the database lock.</li>
          <li><span className="bold">Read the log tail</span> &mdash; &ldquo;too many open files&rdquo; was right there, timestamped, the whole time.</li>
        </ul>
        <p>None of these checks require a theory. They produce one. And the signature is worth memorizing: <span className="bold white">&ldquo;network connection failed&rdquo; + a vanished socket + a healthy-looking process = an exhausted descriptor table.</span></p>
      </Section>

      <h2>What we changed</h2>
      <p>Two fixes, one bug. The server now raises its own descriptor limit at startup &mdash; a local server embedded in a GUI app cannot accept the desktop default of 256 as its operating budget. And the browser&rsquo;s fan-out is bounded: counts flow through a small worker pool and stream in as they resolve, so the burst stays eight deep whether you have ten schemas or a thousand. We hardened the echo chamber too &mdash; launches refuse to steal a live socket, the watchdog probes what the app actually serves, failing sync backs off &mdash; but those were amplifiers. The disease was the N+1.</p>
      <p>We wrote two rules down, for ourselves and our agents. First: <span className="bold white">when one incident appears to have six causes, suspect you are cataloguing symptoms.</span> Root causes are usually singular; echoes are plentiful. Second: never relaunch first &mdash; run the thirty-second checklist, name the cause, then launch once. On the wrong bug, the restart <em>is</em> the bug.</p>
      <p>This is also the second invisible ceiling we&rsquo;ve hit in a week &mdash; <Link to="/blog/argument-list-too-long">the kernel&rsquo;s argument limit</Link> was the first. Both scale in exact proportion to success: more schemas, more data, more of everything, until a fixed budget nobody remembers agreeing to is suddenly the whole story.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
