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

// 1 — six distinct causes converge on one indistinguishable symptom.
const FAN = `${SVG_OPEN('0 0 660 322')}
  <rect x="36" y="20" width="258" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="165" y="42" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">WATCHDOG PROBES A DEAD PORT</text>
  <rect x="36" y="64" width="258" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="165" y="86" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">UI SOCKET NEVER CREATED</text>
  <rect x="36" y="108" width="258" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="165" y="130" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">RELAUNCH DELETES LIVE SOCKET</text>
  <rect x="36" y="152" width="258" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="165" y="174" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">STALE FIRST-RUN FLAG</text>
  <rect x="36" y="196" width="258" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="165" y="218" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">FAILING SYNC LEAKS FDS</text>
  <rect x="36" y="240" width="258" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="165" y="262" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">UI BURST EXHAUSTS FDS</text>

  <rect x="292" y="35" width="4" height="4" fill="#928374"/>
  <line x1="294" y1="37" x2="352" y2="37" stroke="#928374" stroke-width="1"/>
  <rect x="292" y="79" width="4" height="4" fill="#928374"/>
  <line x1="294" y1="81" x2="352" y2="81" stroke="#928374" stroke-width="1"/>
  <rect x="292" y="123" width="4" height="4" fill="#928374"/>
  <line x1="294" y1="125" x2="352" y2="125" stroke="#928374" stroke-width="1"/>
  <rect x="292" y="167" width="4" height="4" fill="#928374"/>
  <line x1="294" y1="169" x2="352" y2="169" stroke="#928374" stroke-width="1"/>
  <rect x="292" y="211" width="4" height="4" fill="#928374"/>
  <line x1="294" y1="213" x2="352" y2="213" stroke="#928374" stroke-width="1"/>
  <rect x="292" y="255" width="4" height="4" fill="#928374"/>
  <line x1="294" y1="257" x2="352" y2="257" stroke="#928374" stroke-width="1"/>

  <line x1="352" y1="37" x2="352" y2="257" stroke="#928374" stroke-width="1"/>
  <rect x="350" y="145" width="4" height="4" fill="#928374"/>
  <line x1="352" y1="147" x2="420" y2="147" stroke="#928374" stroke-width="1"/>
  <polygon points="428,147 419,143 419,151" fill="#928374"/>

  <rect x="430" y="111" width="196" height="72" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="528" y="142" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">BLANK WINDOW</text>
  <text x="528" y="161" text-anchor="middle" fill="#928374" font-size="10">the node won't come up</text>

  <line x1="36" y1="288" x2="36" y2="302" stroke="#928374" stroke-width="1"/>
  <line x1="294" y1="288" x2="294" y2="302" stroke="#928374" stroke-width="1"/>
  <line x1="36" y1="295" x2="294" y2="295" stroke="#928374" stroke-width="1"/>
  <text x="165" y="318" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">SIX DISTINCT CAUSES — SEVENTY-TWO HOURS</text>
</svg>`;

// 2 — the recovery reflex is the loop: every relaunch re-creates the failure.
const LOOP = `${SVG_OPEN('0 0 660 322')}
  <rect x="250" y="24" width="160" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="45" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BLANK WINDOW</text>
  <text x="330" y="62" text-anchor="middle" fill="#928374" font-size="10">no data · no error</text>

  <rect x="470" y="136" width="150" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="545" y="157" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RELAUNCH</text>
  <text x="545" y="174" text-anchor="middle" fill="#928374" font-size="10">the reflex</text>

  <rect x="250" y="248" width="160" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="269" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SECOND INSTANCE</text>
  <text x="330" y="286" text-anchor="middle" fill="#928374" font-size="10">overlaps the first</text>

  <rect x="30" y="136" width="180" height="48" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="120" y="157" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">KILLS THE SURVIVOR</text>
  <text x="120" y="174" text-anchor="middle" fill="#83a598" font-size="10">live socket · db lock</text>

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

  <text x="330" y="166" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">EVERY LAP DESTROYS THE EVIDENCE</text>
</svg>`;

// 3 — the same diagnosis, priced two ways.
const PRICE = `${SVG_OPEN('0 0 660 302')}
  <text x="36" y="30" fill="#928374" font-size="11" letter-spacing="1.5">THEORY FIRST</text>

  <rect x="150" y="44" width="84" height="32" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="192" y="64" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">GUESS</text>
  <rect x="232" y="58" width="4" height="4" fill="#928374"/>
  <line x1="236" y1="60" x2="262" y2="60" stroke="#928374" stroke-width="1"/>
  <rect x="262" y="44" width="104" height="32" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="314" y="64" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">REBUILD</text>
  <rect x="364" y="58" width="4" height="4" fill="#928374"/>
  <line x1="368" y1="60" x2="394" y2="60" stroke="#928374" stroke-width="1"/>
  <rect x="394" y="44" width="92" height="32" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="440" y="64" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">RELOAD</text>

  <rect x="438" y="76" width="4" height="4" fill="#928374"/>
  <polyline points="440,80 440,102 192,102 192,82" fill="none" stroke="#928374" stroke-width="1"/>
  <polygon points="192,76 188,85 196,85" fill="#928374"/>
  <text x="316" y="120" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">STILL BLANK — GO AGAIN</text>

  <line x1="150" y1="140" x2="150" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="486" y1="140" x2="486" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="150" y1="147" x2="486" y2="147" stroke="#928374" stroke-width="1"/>
  <text x="318" y="170" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">SIXTEEN HOURS · FIVE REBUILDS · TEN RESTARTS</text>

  <text x="36" y="216" fill="#928374" font-size="11" letter-spacing="1.5">OBSERVE FIRST</text>

  <rect x="150" y="228" width="270" height="32" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="285" y="248" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">SOCKETS · FDS · LOG · INSTANCES</text>
  <rect x="418" y="242" width="4" height="4" fill="#83a598"/>
  <line x1="422" y1="244" x2="450" y2="244" stroke="#83a598" stroke-width="1"/>
  <polygon points="458,244 449,240 449,248" fill="#83a598"/>
  <rect x="460" y="228" width="150" height="32" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="535" y="248" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">CAUSE, NAMED</text>

  <line x1="150" y1="268" x2="150" y2="282" stroke="#83a598" stroke-width="1"/>
  <line x1="420" y1="268" x2="420" y2="282" stroke="#83a598" stroke-width="1"/>
  <line x1="150" y1="275" x2="420" y2="275" stroke="#83a598" stroke-width="1"/>
  <text x="285" y="298" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">THIRTY SECONDS</text>
</svg>`;

export default function BlogOneSymptomSixCauses() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>One Symptom, Six Causes - LastDB</title>
        <meta name="description" content="For three days our own database greeted us with a blank window. We diagnosed it six times and were wrong five — because the same symptom had six different causes, and the universal reflex, quit and reopen, was the one move guaranteed to make it worse. What we learned about restart-first debugging, and the thirty-second checklist that replaced it." />
        <meta property="og:title" content="One Symptom, Six Causes" />
        <meta property="og:description" content="A blank window, six root causes, and the discovery that restarting is not a neutral act — on the wrong bug, it is the bug. Thirty seconds of looking beats sixteen hours of theory." />
        <link rel="canonical" href="https://thelastdb.com/blog/one-symptom-six-causes" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">One Symptom, Six Causes</h1>
      <p className="post-meta dim">2026-07-02</p>

      <p className="bold white">For three days our own database kept greeting us with a blank window. The same screen every time: the app opens, the data doesn&rsquo;t. We diagnosed it six times and were wrong five &mdash; not because the diagnoses were careless, but because it was never one bug. <span className="white">The same symptom had six different causes. And the universal recovery reflex &mdash; quit and reopen &mdash; was the one move guaranteed to make it worse.</span></p>

      <p>We build LastDB on LastDB, so the machine that wouldn&rsquo;t come up was the one holding our own notes and our own task board. That is the point of dogfooding: when it breaks, it breaks <em>us</em>, and we get to feel exactly what a user would feel &mdash; which, for three days, was a window that rendered perfectly and contained nothing.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>A symptom is not a diagnosis</h2>
      <p>The desktop app is a database wearing a shell: an embedded node serves the data, and the window is just a client of it. So &ldquo;blank window&rdquo; only tells you the last link in the chain failed. Over seventy-two hours, six different first links produced it:</p>
      <ol>
        <li>A <span className="bold">watchdog</span> health-checked a network port the app had stopped using &mdash; concluded a perfectly healthy process was dead, and helpfully &ldquo;revived&rdquo; it into a duplicate.</li>
        <li>A release candidate <span className="bold">never created the socket</span> the window reads from. The data was fine; the window&rsquo;s doorway didn&rsquo;t exist.</li>
        <li>A <span className="bold">second launch deleted the first launch&rsquo;s live socket</span> &mdash; startup assumed any existing socket file was a stale leftover, and unlinked one that was in active use.</li>
        <li>A <span className="bold">leftover first-run flag</span> steered startup into a silent hang: no crash, no error, no progress. Just a process, sitting there, politely doing nothing.</li>
        <li><span className="bold">Cloud sync with expired credentials</span> retried forever, leaking a connection on every lap, until the process could not accept a single new one. Existing work kept running &mdash; which made it look wedged rather than dead.</li>
        <li>The data browser fired <span className="bold">hundreds of concurrent requests</span> and hit the same connection ceiling from the other side.</li>
      </ol>

      <ArchFigure svg={FAN} caption="Fig. 1 — six causes, one indistinguishable face" />

      <p>From the outside, all six were identical. So each time it happened, we confidently diagnosed <em>the previous incident</em>. The window is blank again &mdash; must be the watchdog. Must be the socket. Along the way we also convicted a password prompt, a keychain, a stale build, and a set of daemons, all innocent. We even shipped a release to fix one of the theories. The theory was wrong; the release was sincere.</p>

      <Section variant="rose">
        <h2><span className="bold">The reflex was the amplifier</span></h2>
        <p>&ldquo;Turn it off and on again&rdquo; is treated as neutral first aid: worst case, nothing changes. Here it was the pathogen. Two of the six bugs lived <em>at launch</em> &mdash; a relaunch spawned a second instance that either deleted the running instance&rsquo;s live socket or fought it for the single-writer database lock. The watchdog automated the reflex, relaunching on its own false alarm. Every restart re-created the failure it was meant to clear, scattered fresh debris (orphaned sockets, stale flags) for the <em>next</em> startup to trip on, and destroyed the evidence of what had actually gone wrong.</p>
        <p><span className="bold white">Restarting is not a neutral act. On the wrong bug, it is the bug.</span></p>
      </Section>

      <ArchFigure svg={LOOP} caption="Fig. 2 — the recovery reflex, drawn honestly" />

      <h2>Sixteen hours of theory</h2>
      <p>The worst single session ran sixteen hours: five full rebuilds, ten restarts, several half-hour waits on CI &mdash; each lap powered by a fresh theory and ended by the same blank window. The breakthrough came only when we stopped theorizing and <em>watched the app fail</em>: the moment we actually looked, the cause &mdash; a process that had exhausted its file descriptors &mdash; was sitting in plain sight, countable with one command.</p>
      <p>In <Link to="/blog/anatomy-of-a-sync-outage">our sync outage</Link> we learned that an error message is a label, not a location. This is that lesson&rsquo;s sibling: <span className="bold white">a symptom is not a shortlist.</span> A symptom with a history tempts you to diagnose from memory &mdash; and memory always nominates the last culprit. There is also a cheap tell we ignored repeatedly: <span className="bold">if a symptom survives one clean rebuild, it is not a stale binary.</span> Stop rebuilding. Start observing.</p>

      <Section variant="sage">
        <h2><span className="bold">Thirty seconds of looking</span></h2>
        <p>Every one of the six causes falls to one of four read-only checks, each a single command:</p>
        <ul>
          <li><span className="bold">Count the instances</span> &mdash; and ask who holds the database lock. Catches the duplicate-launch wars.</li>
          <li><span className="bold">List the sockets</span> &mdash; and probe each one. Data plane alive but UI socket missing is a completely different disease from data loss, and looks identical through the window.</li>
          <li><span className="bold">Count the file descriptors</span> against the limit. Catches both leaks at a glance.</li>
          <li><span className="bold">Read the log tail</span> &mdash; the retry spam and the &ldquo;too many open files&rdquo; were right there, timestamped, the whole time.</li>
        </ul>
        <p>None of these checks require a theory. They <em>produce</em> one.</p>
      </Section>

      <ArchFigure svg={PRICE} caption="Fig. 3 — the same diagnosis, priced two ways" />

      <h2>What we changed</h2>
      <p>The bugs are fixed &mdash; all six, merged and shipped on the stable channel the same week, because a stable release that trails a wedge-class fix is a trap that re-arms itself on every auto-update. Startup now refuses to steal a socket from a live instance instead of assuming it is stale. The watchdog probes the thing the app actually serves. Failing sync backs off instead of leaking until the process suffocates. And startup asserts that its own doorways exist &mdash; failing loudly with a cause, rather than opening an empty window and letting you guess.</p>
      <p>That last one matters most. Four of the six causes were <em>silent</em>: a false &ldquo;everything started&rdquo; log line, a hang with no error, a leak with no warning. Silence is what made five wrong theories equally plausible. A system that names its own failure gets diagnosed in one lap.</p>
      <p>And the debugging rule we wrote down, for ourselves and our agents: <span className="bold white">never relaunch first.</span> Run the thirty-second checklist, name the cause, then launch exactly once &mdash; cleanly. The reboot reflex is a bet that the problem is transient. Six times in three days, it wasn&rsquo;t.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
