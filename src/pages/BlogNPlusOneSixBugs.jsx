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

// 4 — the controlled experiment: same binary, same storm, two budgets.
const EXPERIMENT = `${SVG_OPEN('0 0 660 312')}
  <text x="330" y="34" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">THE SAME 459-REQUEST STORM, TWICE</text>

  <rect x="36" y="62" width="180" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="126" y="87" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BUDGET 256</text>
  <text x="126" y="106" text-anchor="middle" fill="#928374" font-size="10">the desktop default</text>

  <line x1="216" y1="91" x2="400" y2="91" stroke="#928374" stroke-width="1"/>
  <polygon points="406,91 397,87 397,95" fill="#928374"/>
  <text x="311" y="83" text-anchor="middle" fill="#928374" font-size="10">459 connects</text>

  <rect x="408" y="62" width="216" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="516" y="87" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ALL 459 REFUSED</text>
  <text x="516" y="106" text-anchor="middle" fill="#928374" font-size="10">listener dead · socket unlinked</text>

  <rect x="36" y="182" width="180" height="58" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="126" y="207" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BUDGET 65536</text>
  <text x="126" y="226" text-anchor="middle" fill="#83a598" font-size="10">one shell command</text>

  <line x1="216" y1="211" x2="400" y2="211" stroke="#83a598" stroke-width="1"/>
  <polygon points="406,211 397,207 397,215" fill="#83a598"/>
  <text x="311" y="203" text-anchor="middle" fill="#928374" font-size="10">the same 459</text>

  <rect x="408" y="182" width="216" height="58" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="516" y="207" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ALL 459 ANSWERED</text>
  <text x="516" y="226" text-anchor="middle" fill="#83a598" font-size="10">~1 second · server healthy</text>

  <line x1="36" y1="266" x2="36" y2="280" stroke="#928374" stroke-width="1"/>
  <line x1="624" y1="266" x2="624" y2="280" stroke="#928374" stroke-width="1"/>
  <line x1="36" y1="273" x2="624" y2="273" stroke="#928374" stroke-width="1"/>
  <text x="330" y="298" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">SAME BINARY · SAME DATA · SAME CLICK — ONLY THE BUDGET CHANGED</text>
</svg>`;

// 5 — the safety gate that rejected a correct binary: grep -q + pipefail.
const GATE = `${SVG_OPEN('0 0 660 300')}
  <rect x="36" y="48" width="176" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="124" y="73" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">STRING SCAN</text>
  <text x="124" y="92" text-anchor="middle" fill="#928374" font-size="10">streams the whole binary</text>

  <line x1="212" y1="77" x2="400" y2="77" stroke="#928374" stroke-width="1"/>
  <polygon points="406,77 397,73 397,81" fill="#928374"/>
  <text x="308" y="69" text-anchor="middle" fill="#928374" font-size="10">pipe</text>

  <rect x="408" y="48" width="216" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="516" y="73" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">GREP -q</text>
  <text x="516" y="92" text-anchor="middle" fill="#928374" font-size="10">finds the match · exits at once</text>

  <polyline points="516,106 516,140 124,140 124,110" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <polygon points="124,106 120,115 128,115" fill="#83a598"/>
  <text x="320" y="133" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">PIPE CLOSES — SIGPIPE KILLS THE SCANNER MID-WRITE</text>

  <line x1="124" y1="150" x2="124" y2="196" stroke="#928374" stroke-width="1"/>
  <polygon points="124,202 120,193 128,193" fill="#928374"/>

  <rect x="36" y="204" width="280" height="58" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="176" y="229" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">EXIT 141</text>
  <text x="176" y="248" text-anchor="middle" fill="#928374" font-size="10">pipefail sees the failed scan, not the match</text>

  <line x1="316" y1="233" x2="420" y2="233" stroke="#928374" stroke-width="1"/>
  <polygon points="426,233 417,229 417,237" fill="#928374"/>

  <rect x="428" y="204" width="196" height="58" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="526" y="229" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">VERDICT: FAIL</text>
  <text x="526" y="248" text-anchor="middle" fill="#83a598" font-size="10">the binary was correct</text>

  <text x="330" y="288" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">THE GUARD WE BUILT AGAINST BAD RELEASES BLOCKED A GOOD ONE</text>
</svg>`;

export default function BlogNPlusOneSixBugs() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The N+1 That Looked Like Six Bugs - LastDB</title>
        <meta name="description" content="For three days our own database greeted us with a blank window, and we diagnosed six different bugs. There was one: a textbook N+1 in the data browser — one request per schema, hundreds at once — that exhausted the file descriptors macOS grants a GUI app and killed the embedded server seconds after every launch. The full descent: the six disguises, the controlled experiment that ended the argument, the five releases it took to ship one fix — including the safety gate that rejected a correct release — and the proof at the end." />
        <meta property="og:title" content="The N+1 That Looked Like Six Bugs" />
        <meta property="og:description" content="One textbook N+1, billed in file descriptors instead of latency. Six disguises, one thirty-second diagnosis, five releases to ship the cure — and the experiment that settled it in two commands." />
        <link rel="canonical" href="https://thelastdb.com/blog/n-plus-one-six-bugs" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The N+1 That Looked Like Six Bugs</h1>
      <p className="post-meta dim">2026-07-02</p>


      <p className="bold white">For three days our own database kept greeting us with a blank window, and over those days we diagnosed &mdash; with real conviction &mdash; six different bugs. There was one. <span className="white">A textbook N+1 in the data browser, the most ordinary bug in software, billed in the one currency nobody was watching: file descriptors.</span> Everything else we blamed was an echo of it, the universal recovery reflex &mdash; quit and reopen &mdash; re-armed it on every launch, and when we finally had the fix in hand, it took <span className="white">five releases to get it out the door</span>, because our own release pipeline turned out to be hiding three bugs of its own. This is the whole descent, the experiment that ended the argument, and the proof at the end.</p>

      <p>We build LastDB on LastDB, so the machine that kept dying held our own notes and our own task board. That is the point of dogfooding: when it breaks, it breaks <em>us</em> &mdash; and we get to feel exactly what a user would feel, which was an app that unlocked, showed its data for a breath, and went dark.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The most ordinary bug in software</h2>
      <p>Everyone knows the N+1: fetch a list, then issue one query per item on it. Every ORM tutorial warns about it, always with the same moral &mdash; it makes things <em>slow</em>. Ours didn&rsquo;t make anything slow. Opening the Browse tab listed the schemas, then fired a count request for <em>each one</em> &mdash; on this node, 459 of them, all at once, straight at the embedded server. The counts exist so the browser can do something genuinely useful: hide the hundreds of empty inferred schemas and show you only the ones that hold data, each with a live record count on its row. A good feature, asked for in the worst possible way.</p>
      <p>Here is the part the tutorials skip. Each in-flight request holds open connections, and each connection costs file descriptors &mdash; and macOS starts a desktop app with a budget of <span className="bold">256</span>. Not 256 for connections: 256 for <em>everything</em> &mdash; the database files, the log files, the window system&rsquo;s own plumbing, and then whatever is left for the network. The burst blew through it instantly. The server&rsquo;s accept loop asked for one more descriptor, was refused, and died &mdash; and, tidy to the very end, <span className="bold white">unlinked its own socket on the way down</span>. Seconds after unlock, the app had killed itself. The window went blank, every later request reported &ldquo;network connection failed,&rdquo; and the process sat there looking perfectly healthy.</p>

      <ArchFigure svg={ANATOMY} caption="Fig. 1 — one click, 459 requests, a 256-descriptor budget" />

      <p>An N+1 is not a performance bug. It is an <span className="bold white">unbounded fan-out</span>, and it bills you in whatever resource runs out first. Usually that&rsquo;s time, so we&rsquo;ve all agreed to call it a performance problem. Ours ran out of descriptors first &mdash; and a resource bug does not present at its cause. It presents wherever the <em>next</em> allocation fails.</p>

      <h2>Two descriptors per question</h2>
      <p>Why did 459 requests cost roughly 900 descriptors? Because of an architecture decision we stand by, and a consequence of it we never priced in. LastDB&rsquo;s desktop app is <span className="bold">socket-only</span>: the node listens on a local socket with filesystem permissions instead of a TCP port, so there is no open port on your machine for every other local process to poke at. The app&rsquo;s UI reaches the node through an in-process bridge &mdash; and that bridge, faithfully simple, opened <span className="bold white">one fresh connection per request and closed it after</span>. Both ends of every connection &mdash; the bridge&rsquo;s side and the server&rsquo;s side &mdash; live in the same process, against the same 256-descriptor budget. Two tickets per question, 459 questions at once.</p>
      <p>The subtle loss is what we <em>gave up without noticing</em>. When a web page fetches over ordinary HTTP, the browser quietly imposes thirty years of accumulated etiquette: it caps concurrent connections per host at a handful and reuses them with keep-alive. Four hundred fetches queue politely over six connections whether the page author thought about it or not. Moving off HTTP-over-TCP onto our own bridge <span className="bold white">silently deleted that protection</span> &mdash; nobody deleted it on purpose; it simply wasn&rsquo;t there anymore. The UI code had always been storming; the browser had always been absorbing it. Swap the transport and the storm hits bare metal.</p>
      <p>One more property worth naming, because it decides who hits this: the burst scales with the <span className="bold">number of schemas</span>, not the volume of data. A schema with 1,600 records costs exactly one request, same as an empty one. It is variety, not size, that grows the storm &mdash; and a knowledge-shaped workload on LastDB grows variety as a feature, one inferred schema per shape of thing it learns. Success, in other words, was the trigger.</p>

      <h2>Six faces</h2>
      <p>Which is how one bug wore six disguises. Over three days we confidently blamed, in order:</p>
      <ul>
        <li><span className="bold white">An unlock/keychain regression.</span> The window died right after unlock, every time &mdash; of course it looked like unlock. And here the investigation got genuinely confusing, because we <em>found real bugs</em>. Sensitive reads after unlock were re-deriving key material from the root instead of using the key the unlock had just placed in memory &mdash; a true bug, sincerely fixed. The app was also still touching the OS keychain from an earlier era of its life, which after a product rename produced genuine permission-prompt storms &mdash; also true, also fixed, secrets moved into the node&rsquo;s own encrypted-at-rest store where no surprise dialog can interrupt a headless process. Two real bugs, two real fixes, zero effect on the blank window. Nothing anchors a wrong theory like finding true evidence for it.</li>
        <li><span className="bold white">Data loss.</span> The window was empty; the data was fine, every byte, the whole time.</li>
        <li><span className="bold white">A stale build.</span> We rebuilt; the failure looked identical. (Hold this thought &mdash; a stale build shows up later in this story as a real villain, just not this scene&rsquo;s.)</li>
        <li><span className="bold white">Warring background daemons.</span> A real hazard &mdash; over the bad days we had accumulated supervisor scripts and watchdogs that could genuinely fight over one socket. We removed them all. The app kept dying, just with less clutter around it.</li>
        <li><span className="bold white">A cloud-sync auth failure.</span> Its retry loop was genuinely noisy in the logs, which made it a superb decoy &mdash; a bug-shaped object, loudly innocent.</li>
        <li><span className="bold white">A haunted socket</span> that &ldquo;kept vanishing.&rdquo; Which was true, and was the bug&rsquo;s signature, not its cause.</li>
      </ul>

      <ArchFigure svg={FACES} caption="Fig. 2 — six confident diagnoses, one bug" />

      <p>Every theory had evidence, because the failure was real &mdash; only the explanation kept changing. We even shipped a release for one of the theories. The theory was wrong; the release was sincere. The tell we kept ignoring: <span className="bold">if a symptom survives one clean rebuild, it is not a stale binary</span> &mdash; and if the window dies right after the same tab opens, look at what that tab <em>does</em>.</p>

      <Section variant="rose">
        <h2><span className="bold">The reflex re-armed the bug</span></h2>
        <p>&ldquo;Turn it off and on again&rdquo; is treated as neutral first aid: worst case, nothing changes. Here the bug lived on the launch path itself. Relaunch the app, it unlocks, Browse loads &mdash; as it always does &mdash; and the N+1 fires again: dead in seconds, every time, with fresh debris (orphaned sockets, respawning watchdogs, duplicate instances fighting for the database lock) scattered for the next lap&rsquo;s theories to feed on. The restart wasn&rsquo;t failing to fix the bug. <span className="bold white">The restart was running it.</span></p>
      </Section>

      <ArchFigure svg={LOOP} caption="Fig. 3 — the recovery reflex, running the bug on a loop" />

      <Section variant="sage">
        <h2><span className="bold">Thirty seconds of counting</span></h2>
        <p>The worst single session ran sixteen hours &mdash; five rebuilds, ten restarts, each lap powered by a theory. The breakthrough took one act of observation: watching the app actually die, then counting. Four read-only checks, each a single command, would have named this on day one:</p>
        <ul>
          <li><span className="bold">Count the file descriptors</span> the process holds against its limit. This one check <em>was</em> the diagnosis &mdash; the limit said 256 and the resting process was already holding 144.</li>
          <li><span className="bold">List the sockets</span> and probe them &mdash; a vanished socket under a healthy process is a signature, and this is whose.</li>
          <li><span className="bold">Count the instances</span> &mdash; and ask who holds the database lock.</li>
          <li><span className="bold">Read the log tail</span> &mdash; &ldquo;too many open files&rdquo; was right there, timestamped, the whole time.</li>
        </ul>
        <p>None of these checks require a theory. They produce one. And the signature is worth memorizing: <span className="bold white">&ldquo;network connection failed&rdquo; + a vanished socket + a healthy-looking process = an exhausted descriptor table.</span></p>
      </Section>

      <h2>The experiment that ended the argument</h2>
      <p>A theory that good deserved better than belief, so we made it falsifiable. First we reproduced the failure without the app: 459 concurrent requests fired at the node from the command line &mdash; the same burst Browse produces, minus everything else the app does. At the default budget, the result was total: <span className="bold white">all 459 connections refused</span>, the accept loop dead, the socket file gone from disk. Twice, to be sure. Not a degradation &mdash; a total stop.</p>
      <p>Then the other half of the A/B: relaunch the <em>identical binary</em> from a shell that granted it a 65,536-descriptor budget &mdash; one command, no code changes &mdash; and fire the identical storm. <span className="bold white">All 459 requests answered in about one second.</span> Server healthy, socket present, window full of data. Same binary, same data, same click; only the budget changed. Every one of the six theories predicted the storm would kill the second run too &mdash; the daemons, the stale build, the haunted socket were all still &ldquo;there.&rdquo; They didn&rsquo;t survive the toggle.</p>

      <ArchFigure svg={EXPERIMENT} caption="Fig. 4 — the A/B that isolated the descriptor budget and cleared everything else" />

      <p>A diagnosis you can toggle is the only kind worth shipping a fix for. Sixteen hours of theorizing produced six candidate causes; two commands produced one answer. That asymmetry &mdash; and the embarrassment of it &mdash; is most of why we&rsquo;re writing this down.</p>

      <h2>Five releases to ship one fix</h2>
      <p>The fix itself is small and boring, which is exactly what you want. Getting it into users&rsquo; hands was neither, because the moment we tried, our release pipeline began failing in unrelated ways of its own. It took five consecutive release attempts to ship one two-part fix, and every failure taught us something we&rsquo;d rather have learned cheaper.</p>
      <p><span className="bold white">Attempt one shipped last month&rsquo;s app.</span> The desktop UI is compiled <em>into</em> the server binary at build time &mdash; which means a cached binary is a time capsule, and a release pipeline with a shared build cache can exhume one. Version .8 went out the door carrying a binary from weeks earlier: correctly signed, correctly packaged, wrong contents. Installing a &ldquo;new&rdquo; release silently downgraded the app. So we added a release-integrity gate: before packaging, scan the built binary and refuse to ship unless it literally contains the version string being released. Simple, mechanical, obviously correct.</p>
      <p><span className="bold white">Attempt two: the gate rejected a correct binary.</span> Version .9 built perfectly &mdash; fresh compile, right version baked in &mdash; and the gate failed it anyway. The gate&rsquo;s shell one-liner piped a string-scan of the binary into <code>grep -q</code>, under the shell&rsquo;s strict pipeline mode. <code>grep -q</code> does something reasonable that becomes a trap: it exits <em>the instant it finds a match</em>. The scanner, still streaming a hundred-megabyte binary into a pipe nobody is reading, is killed by the operating system mid-write &mdash; and strict mode dutifully reports the pipeline as failed. <span className="bold">The check failed <em>because</em> it succeeded</span>: finding the match early is what killed the producer. The fix is one character of intent &mdash; count matches instead of exiting on the first &mdash; so the reader drains the stream and the producer exits in peace.</p>

      <ArchFigure svg={GATE} caption="Fig. 5 — the release gate&rsquo;s false negative: it failed because it matched" />

      <p><span className="bold white">Attempt three: the smoke test couldn&rsquo;t find its own script.</span> Version .10 passed the repaired gate, then died in the post-build smoke test &mdash; the job that mounts the built disk image and verifies the packaged binaries. It exited with the shell&rsquo;s tersest verdict, <code>127: command not found</code>. The verification script it wanted to run lives in our repository; the smoke-test job downloads the built artifact but had <span className="bold">never checked out the repository</span>. A guard we&rsquo;d added in one change assumed a filesystem another change had never provided. Meanwhile the binary inside that failed release was perfect &mdash; we pulled the artifact, verified it by hand, and used it while the pipeline caught up.</p>
      <p><span className="bold white">Attempt four failed on weather</span> &mdash; the notary service that blesses macOS apps timed out mid-ceremony. Nothing to learn except that the cloud is someone else&rsquo;s computer; retry.</p>
      <p><span className="bold white">Attempt five went green end to end</span> &mdash; build, integrity gate, smoke tests on three install scenarios, publish. First fully clean run in the pipeline&rsquo;s life, and the first release whose safety rails had all, themselves, been tested by failure.</p>

      <Section variant="rose">
        <h2><span className="bold">Guards are code</span></h2>
        <p>Every one of those pipeline failures was in machinery we&rsquo;d built to <em>prevent</em> bad releases. The integrity gate had a shell bug; the smoke test had a missing precondition; both were written in the same sitting as sincere protection. A safety check that can fail wrong is not neutral &mdash; a false negative blocks the cure while the disease runs, which is precisely what it did here. Guards deserve the same skepticism as the code they guard, and the same tests. The gate that cried wolf delayed the descriptor fix by most of a day.</p>
      </Section>

      <h2>What we changed</h2>
      <p>The fix has three layers, in increasing order of ambition:</p>
      <ul>
        <li><span className="bold white">The server raises its own budget.</span> First thing at startup, before any listener binds, the process lifts its descriptor limit from the desktop default to a working figure &mdash; clamped to what the OS allows, never lowering an already-generous one. A local server embedded in a GUI app cannot accept 256 as its operating budget, and it must not depend on how it was launched: double-click, login item, or shell all get the same headroom now. The startup log states the resulting limit, so the next investigator reads it instead of discovering it.</li>
        <li><span className="bold white">The fan-out is bounded.</span> Counts flow through a small worker pool &mdash; eight in flight, the rest queued &mdash; and stream into the UI as they resolve, populated schemas surfacing first. The burst stays eight deep whether you have ten schemas or ten thousand. This is the browser&rsquo;s old etiquette, rebuilt on the new transport as an explicit decision instead of an inherited accident &mdash; and it protects the node from <em>any</em> future fan-out mistake in the UI, not just this one.</li>
        <li><span className="bold white">The N+1 itself is scheduled to die.</span> The endgame, queued as follow-up work: the schema list should carry its own record counts, so the browser renders complete from the one request it was always going to make &mdash; zero extra calls. And for nodes that grow truly large, the count belongs in metadata maintained on write &mdash; increment on insert, decrement on delete &mdash; making the answer O(1) no matter how big a schema gets. Bounding the storm was the fix; deleting the reason for the storm is the design.</li>
      </ul>
      <p>We hardened the echo chamber too &mdash; launches refuse to steal a live socket, the watchdog probes what the app actually serves, failing sync backs off &mdash; but those were amplifiers. The disease was the N+1.</p>

      <h2>Proof, the only kind that counts</h2>
      <p>We&rsquo;d already been burned this week by believing green dashboards, so the acceptance test for the fix was the hostile path, end to end: install the published release, launch it <em>normally</em> &mdash; the double-click path, the one that hands out 256 descriptors &mdash; and try to kill it. The startup log reported the raised limit. The same 459-request storm that had killed the server twice came back <span className="bold white">459-for-459, all answered, socket alive</span>. Then the human path: unlock at the password screen, open Browse, and watch it render seventeen populated schemas with live record counts &mdash; the hundreds of empty ones correctly hidden for the first time &mdash; while the node&rsquo;s health check read steady underneath. The blank window is gone because the thing that blanked it can no longer happen, and we know because we did the exact thing that used to cause it, on the exact build users get.</p>

      <h2>The rules we kept</h2>
      <ul>
        <li><span className="bold white">When one incident appears to have six causes, suspect you are cataloguing symptoms.</span> Root causes are usually singular; echoes are plentiful. Finding <em>a</em> real bug is not finding <em>the</em> bug &mdash; we fixed two true ones that changed nothing.</li>
        <li><span className="bold white">Never relaunch first.</span> Run the thirty-second checklist &mdash; descriptors, sockets, instances, log tail &mdash; name the cause, then launch once. On the wrong bug, the restart <em>is</em> the bug.</li>
        <li><span className="bold white">Make the diagnosis falsifiable before shipping the fix.</span> One controlled toggle &mdash; same binary, same storm, one variable &mdash; outweighs any volume of theory. If you can&rsquo;t A/B it, you&rsquo;re still guessing.</li>
        <li><span className="bold white">An N+1 is an unbounded fan-out, not a slowness.</span> It bills in whatever runs out first &mdash; time, descriptors, memory, quota &mdash; and it presents at the next allocation, not at its cause. Bound every fan-out at the source; better, move the loop server-side and delete it.</li>
        <li><span className="bold white">Price your transport swaps.</span> The browser&rsquo;s connection pooling was load-bearing and invisible; replacing the transport deleted it silently. When you take over a layer, you inherit every courtesy it used to provide &mdash; enumerate them, or rediscover them like this.</li>
        <li><span className="bold white">Fixed budgets that scale with success are ambushes.</span> 256 descriptors, the kernel&rsquo;s argument-size cap, an API gateway&rsquo;s timeout: each is generous until the day your data isn&rsquo;t small, and each fails at full speed. Find the ceilings before they find you, and log your headroom.</li>
        <li><span className="bold white">Guards are code.</span> Test the gate, not just the gated. A safety check with a false-negative mode is an outage generator pointed at your own releases.</li>
        <li><span className="bold white">Verify on the hostile path.</span> The fix isn&rsquo;t real until the published artifact survives the exact scenario that killed its predecessor, launched the way a user launches it.</li>
      </ul>

      <p>This is also the second invisible ceiling we&rsquo;ve hit in a week &mdash; <Link to="/blog/argument-list-too-long">the kernel&rsquo;s argument limit</Link> was the first. Both scale in exact proportion to success: more schemas, more data, more of everything, until a fixed budget nobody remembers agreeing to is suddenly the whole story. For the cloud-side half of this saga &mdash; three stacked bugs behind one sync outage &mdash; see <Link to="/blog/anatomy-of-a-sync-outage">Anatomy of a Sync Outage</Link>; for why our releases now demand proof of the user-visible capability, <Link to="/blog/prove-it-to-land">Prove It To Land</Link>.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
