import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored/solid things, dimension lines, joint marks, mono caps
// labels, a single accent). Rendered as inline SVG so there's no auto-layout.
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

// 1 — before/after: the kernel was buried inside a fat desktop node; now it stands alone.
const FOOTPRINT = `${SVG_OPEN('0 0 660 330')}
  <text x="40" y="40" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE — THE DESKTOP NODE</text>
  <rect x="40" y="52" width="250" height="196" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="58" y="78" fill="#928374" font-size="10">ingestion &#183; people import</text>
  <text x="58" y="98" fill="#928374" font-size="10">hosted chat &#183; org surfaces</text>
  <text x="58" y="118" fill="#928374" font-size="10">transforms &#183; dev server</text>
  <text x="58" y="138" fill="#928374" font-size="10">social discovery &#183; faces</text>
  <text x="58" y="158" fill="#928374" font-size="10">desktop ui &#183; dmg installer</text>
  <rect x="56" y="176" width="218" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="165" y="198" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">THE KERNEL</text>
  <text x="165" y="215" text-anchor="middle" fill="#928374" font-size="10">buried under everything else</text>

  <line x1="40" y1="262" x2="40" y2="276" stroke="#928374" stroke-width="1"/>
  <line x1="290" y1="262" x2="290" y2="276" stroke="#928374" stroke-width="1"/>
  <line x1="40" y1="269" x2="290" y2="269" stroke="#928374" stroke-width="1"/>
  <text x="165" y="294" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">454,988 LINES OF RUST</text>

  <line x1="310" y1="150" x2="398" y2="150" stroke="#928374" stroke-width="1"/>
  <polygon points="404,150 395,146 395,154" fill="#928374"/>
  <text x="357" y="138" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">3 DAYS</text>

  <text x="420" y="40" fill="#83a598" font-size="11" letter-spacing="1.5">AFTER — THE MINI</text>
  <rect x="420" y="52" width="66" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="453" y="76" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">BRAIN</text>
  <rect x="497" y="52" width="66" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="530" y="76" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">KANBAN</text>
  <rect x="574" y="52" width="66" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="607" y="70" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">SITU-</text>
  <text x="607" y="82" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">ATIONS</text>

  <line x1="453" y1="92" x2="453" y2="176" stroke="#928374" stroke-width="1"/>
  <line x1="530" y1="92" x2="530" y2="176" stroke="#928374" stroke-width="1"/>
  <line x1="607" y1="92" x2="607" y2="176" stroke="#928374" stroke-width="1"/>
  <rect x="451" y="172" width="4" height="4" fill="#928374"/>
  <rect x="528" y="172" width="4" height="4" fill="#928374"/>
  <rect x="605" y="172" width="4" height="4" fill="#928374"/>
  <text x="446" y="140" fill="#928374" font-size="9" letter-spacing="1" transform="rotate(-90 446 140)">apps</text>

  <rect x="420" y="176" width="220" height="72" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="530" y="206" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE KERNEL, ALONE</text>
  <text x="530" y="226" text-anchor="middle" fill="#928374" font-size="10">storage &#183; index &#183; sync &#183; api</text>

  <line x1="420" y1="262" x2="420" y2="276" stroke="#83a598" stroke-width="1"/>
  <line x1="640" y1="262" x2="640" y2="276" stroke="#83a598" stroke-width="1"/>
  <line x1="420" y1="269" x2="640" y2="269" stroke="#83a598" stroke-width="1"/>
  <text x="530" y="294" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">179,030 LINES — &#8722;61%</text>
</svg>`;

// 2 — one record, everyone reads it: the situation as the single stop-work order.
const CONTROLPLANE = `${SVG_OPEN('0 0 660 310')}
  <rect x="44" y="56" width="96" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="92" y="77" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">AGENT</text>
  <rect x="44" y="106" width="96" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="92" y="127" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">AGENT</text>
  <rect x="44" y="156" width="96" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="92" y="177" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">AGENT</text>

  <polyline points="140,73 190,73 190,123" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="44" y="44" fill="#928374" font-size="9" letter-spacing="0.5">preflight: may i touch this?</text>
  <line x1="140" y1="123" x2="256" y2="123" stroke="#928374" stroke-width="1"/>
  <polyline points="140,173 190,173 190,123" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="254" y="121" width="4" height="4" fill="#928374"/>

  <rect x="258" y="66" width="200" height="110" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="358" y="92" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE SITUATION</text>
  <text x="358" y="112" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">P0 &#183; MINI-ONLY CUTOVER</text>
  <line x1="276" y1="124" x2="440" y2="124" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="358" y="142" text-anchor="middle" fill="#928374" font-size="10">blocked: modify &#183; build</text>
  <text x="358" y="158" text-anchor="middle" fill="#928374" font-size="10">release &#183; dogfood the node</text>

  <line x1="458" y1="96" x2="500" y2="96" stroke="#928374" stroke-width="1"/>
  <rect x="456" y="94" width="4" height="4" fill="#928374"/>
  <rect x="502" y="78" width="120" height="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="562" y="94" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">KANBAN</text>
  <text x="562" y="107" text-anchor="middle" fill="#928374" font-size="9">two phase cards</text>

  <line x1="458" y1="146" x2="500" y2="146" stroke="#928374" stroke-width="1"/>
  <rect x="456" y="144" width="4" height="4" fill="#928374"/>
  <rect x="502" y="128" width="120" height="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="562" y="144" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">BRAIN</text>
  <text x="562" y="157" text-anchor="middle" fill="#928374" font-size="9">the why, durably</text>

  <rect x="234" y="222" width="248" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="358" y="244" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">RESPONDER ROUTINE</text>
  <text x="358" y="262" text-anchor="middle" fill="#928374" font-size="10">wakes &#183; verifies &#183; appends the log</text>
  <line x1="358" y1="176" x2="358" y2="222" stroke="#928374" stroke-width="1"/>
  <rect x="356" y="176" width="4" height="4" fill="#928374"/>
  <polygon points="358,182 354,191 362,191" fill="#928374" transform="rotate(180 358 186.5)"/>
  <text x="368" y="203" fill="#928374" font-size="9" letter-spacing="0.5">every few hours</text>
</svg>`;

// 3 — two release pipelines: the DMG assembly line vs the Mini tarball.
const PIPELINES = `${SVG_OPEN('0 0 660 330')}
  <text x="40" y="40" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE — SHIPPING THE DMG</text>
  <rect x="40" y="54" width="118" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="99" y="73" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">SIDECARS &#215;2</text>
  <text x="99" y="88" text-anchor="middle" fill="#928374" font-size="9">90&#8211;100 min each</text>
  <line x1="158" y1="76" x2="176" y2="76" stroke="#928374" stroke-width="1"/>
  <rect x="176" y="54" width="108" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="230" y="73" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">BUNDLES &#215;2</text>
  <text x="230" y="88" text-anchor="middle" fill="#928374" font-size="9">~20 min each</text>
  <line x1="284" y1="76" x2="302" y2="76" stroke="#928374" stroke-width="1"/>
  <rect x="302" y="54" width="84" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="344" y="73" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">SMOKE</text>
  <text x="344" y="88" text-anchor="middle" fill="#928374" font-size="9">~5 min</text>
  <line x1="386" y1="76" x2="404" y2="76" stroke="#928374" stroke-width="1"/>
  <rect x="404" y="54" width="216" height="44" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="512" y="73" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">SIGN &#183; NOTARIZE &#183; STAPLE</text>
  <text x="512" y="88" text-anchor="middle" fill="#928374" font-size="9">someone else&#8217;s clock</text>

  <line x1="40" y1="116" x2="40" y2="130" stroke="#928374" stroke-width="1"/>
  <line x1="620" y1="116" x2="620" y2="130" stroke="#928374" stroke-width="1"/>
  <line x1="40" y1="123" x2="620" y2="123" stroke="#928374" stroke-width="1"/>
  <text x="330" y="148" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">~4 HOURS ON A GOOD DAY &#183; FINAL WEEK: ZERO GREEN RELEASE TAGS</text>

  <line x1="40" y1="170" x2="620" y2="170" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="40" y="204" fill="#83a598" font-size="11" letter-spacing="1.5">AFTER — SHIPPING THE MINI</text>
  <rect x="40" y="218" width="150" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="115" y="237" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">BUILD TARBALL</text>
  <text x="115" y="252" text-anchor="middle" fill="#928374" font-size="9">one binary pair, one arch</text>
  <line x1="190" y1="240" x2="208" y2="240" stroke="#83a598" stroke-width="1"/>
  <rect x="208" y="218" width="130" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="273" y="237" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">PUBLISH ASSET</text>
  <text x="273" y="252" text-anchor="middle" fill="#928374" font-size="9">checksummed</text>
  <line x1="338" y1="240" x2="356" y2="240" stroke="#83a598" stroke-width="1"/>
  <rect x="356" y="218" width="150" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="431" y="237" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">FORMULA BUMP</text>
  <text x="431" y="252" text-anchor="middle" fill="#928374" font-size="9">&#60;30 seconds</text>

  <line x1="40" y1="280" x2="40" y2="294" stroke="#83a598" stroke-width="1"/>
  <line x1="506" y1="280" x2="506" y2="294" stroke="#83a598" stroke-width="1"/>
  <line x1="40" y1="287" x2="506" y2="287" stroke="#83a598" stroke-width="1"/>
  <text x="273" y="312" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">~7 MINUTES FROM UPLOAD TO INSTALLABLE</text>
</svg>`;

export default function BlogTheStopWorkOrder() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Stop-Work Order - LastDB</title>
        <meta name="description" content="A decommissioning report: how we removed 275,958 lines of Rust — 61% of the total — over three days while an autonomous agent fleet continued normal operations. The coordination mechanism was a single machine-readable stop-work order that every agent checks before changing anything, plus Kanban for the work, Brain for the decisions, and a scheduled routine verifying progress." />
        <meta property="og:title" content="The Stop-Work Order" />
        <meta property="og:description" content="A decommissioning report: removing 61% of the codebase while the agent fleet continued normal operations. One machine-readable record said stop; everything else read it." />
        <link rel="canonical" href="https://thelastdb.com/blog/the-stop-work-order" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Stop-Work Order</h1>
      <p className="post-meta dim">2026-07-13</p>

      <p className="bold white">This week we decommissioned the larger of LastDB&rsquo;s two binaries. Over a three-day window, 275,958 lines of Rust came out &mdash; 61% of all the Rust in the monorepo &mdash; while our autonomous agent fleet continued normal operations on everything else. <span className="white">The part worth writing up is not the deletion, which was routine. It is the coordination: the whole fleet stopped work on the affected subsystem at the same moment, because one machine-readable record told it to.</span></p>

      <p>Some context for new readers. LastDB is a local-first database, and we build it with a fleet of AI agents working around the clock. The agents coordinate through three applications that are themselves built on LastDB: <span className="bold">Kanban</span> holds the work items, <span className="bold">Brain</span> holds the durable knowledge &mdash; decisions, rationale, operational facts &mdash; and a newer one, <span className="bold">Situations</span>, holds the current operational picture: active incidents, frozen subsystems, anything with a do-not-touch on it. What follows is the procedure the three of them ran, and the readings before and after.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The decision: the node becomes a kernel</h2>
      <p>LastDB had grown two binaries. The original was a full desktop application &mdash; database, ingestion pipelines, contact import, hosted chat, org machinery, transforms, social discovery, a dev server, and a native UI, shipped to Macs as a signed, notarized DMG. The second was the <span className="bold">Mini</span>: a headless daemon plus a small CLI, installed with a package manager, that does exactly four things &mdash; store data, index it semantically, sync it, and serve the app-facing API.</p>
      <p>We had already <Link to="/blog/the-second-binary">retired one redundant binary this year</Link> and knew the pattern: two binaries drift, no matter how disciplined you are. But the deeper problem was architectural. Every product feature living <em>inside</em> the node was a feature that couldn&rsquo;t evolve independently, added to every build, and widened every release. Meanwhile our own daily workloads &mdash; Brain, Kanban, Situations, all our internal tooling &mdash; ran against the Mini&rsquo;s API and used nothing else. The direction we wrote down was plain: <span className="bold white">the node is a kernel &mdash; storage, semantic index, sync, API. Every feature becomes an app.</span> The desktop node, and the DMG that shipped it, were scheduled for removal.</p>

      <ArchFigure svg={FOOTPRINT} caption="Fig. 1 — the kernel was buried inside the node; now it is the node" />

      <h2>One record that says stop</h2>
      <p>The failure mode to engineer against is straightforward. A fleet doesn&rsquo;t have hallway conversations. If you decide on Tuesday that a subsystem is being removed, and an agent wakes up Wednesday holding a week-old card that says &ldquo;improve the desktop onboarding flow,&rdquo; it will build onto the deprecated subsystem &mdash; and its work will be correct, tested, green, and wasted. There is also a safety dimension: a partially removed subsystem is in an inconsistent state, and changes merged into it can affect systems that are still live. Removing a subsystem at this scale is less a code problem than a <em>shared-state</em> problem.</p>
      <p>So the first artifact of the operation wasn&rsquo;t a pull request. It was a Situation &mdash; severity P0 &mdash; stating, in effect: <span className="bold">&ldquo;the desktop node and the DMG are deprecated; we are cutting over to the Mini.&rdquo;</span> It carried a machine-readable list of blocked actions: <em>modify</em> the desktop node, <em>build</em> a DMG, <em>release</em> one, <em>test</em> one, <em>dogfood</em> one. Not prose &mdash; a fence, with named gates.</p>

      <Section variant="sage">
        <h2><span className="bold">Preflight, not folklore</span></h2>
        <p>Every agent in the fleet runs the same first step before mutating anything shared: read the active Situations, then ask a scoped question &mdash; <em>&ldquo;I am about to do X to Y; may I?&rdquo;</em> &mdash; and get back OK or BLOCKED, with the Situation to cite. The freeze isn&rsquo;t distributed through memos, stale checklists, or hoping everyone saw the message. There is <span className="bold">one canonical place where work on the node stops</span>, and everyone &mdash; scheduled routines, card-driven builders, ad-hoc sessions &mdash; reads it before acting. And when the work was done, resolving that one record lifted the freeze everywhere at once.</p>
      </Section>

      <ArchFigure svg={CONTROLPLANE} caption="Fig. 2 — one record; every actor consults it before touching the deprecated subsystem" />

      <p>One anomaly during the operation is worth recording, because it demonstrates the mechanism under load. Mid-cutover, a removal card was promoted into the fleet&rsquo;s pickup queue, contrary to the owner&rsquo;s recorded instruction that removal work stay human-directed. The responder routine flagged the discrepancy on its next pass &mdash; the promotion contradicted the decision on file in Brain &mdash; moved the card back within minutes, logged the event with its reasoning, and a permanent fix for the gap in the fence merged the next day. That is the behavior you want from a freeze: when it is enforced and audited, a violation surfaces and gets corrected; when it lives in a pinned message, it just erodes.</p>

      <h2>The removal, run on cards</h2>
      <p>With the fence up, the cutover ran as two deliberate steps, each tracked as Kanban cards with explicit end states, each landing as ordinary CI-green, individually revertable pull requests.</p>
      <p><span className="bold white">Step one: make the Mini the primary.</span> Our own production brain &mdash; the LastDB node that Brain, Kanban, and Situations run against all day, every day &mdash; was cut over from the desktop node to the Mini daemon, and validated live the same morning. The ordering matters: once the Mini carried our real daily workload, everything remaining in the desktop node was demonstrably unused. We weren&rsquo;t deleting code we believed was idle; we had the operational evidence in hand before the first removal PR opened.</p>
      <p><span className="bold white">Step two: remove.</span> First the release machinery &mdash; the DMG build, signing, notarization, and smoke-test pipeline &mdash; so no tag could trigger another four-hour installer build during the removal. Then the desktop node crate itself, followed by a subsystem-by-subsystem pass over everything that existed only to serve it: hosted chat, the org subsystem across sync and crypto and cloud surfaces, social discovery, the face-embedding remnants. About a dozen pull requests, each one green, each one small enough to revert on its own.</p>
      <p>Around the cards, the rest of the toolkit did its usual jobs. Brain held the <em>why</em>: the goal (with a measurable definition of done &mdash; shrink the node at least 40% from its 194,507-line baseline), every settled decision, and a live ledger of open questions that agents check before acting &mdash; which is how the wrongly-promoted card got caught. The scheduled routines &mdash; automated jobs that wake on a timer &mdash; handled verification between human check-ins: the Situation&rsquo;s responder routine woke every couple of hours to confirm actual progress (did the PR merge? is the fence holding? does anything contradict a recorded decision?) and appended a timestamped entry to the record; our morning digest rolled the state up by program; a nightly janitor swept the merged branches. Nobody had to remember to check on the removal. Checking was a scheduled task, and it ran on schedule.</p>

      <h2>The readings, before and after</h2>
      <ul>
        <li><span className="bold white">Rust:</span> 454,988 lines &rarr; 179,030 &mdash; <span className="bold white">&minus;275,958 lines, &minus;61%</span>.</li>
        <li><span className="bold white">Everything tracked:</span> 970,762 lines &rarr; 408,497 &mdash; &minus;58%. Files: 2,936 &rarr; 1,646.</li>
        <li><span className="bold white">The diff:</span> 1,548 files changed, +21,056 insertions, &minus;515,831 deletions. A 24-to-1 ratio of removal to new code.</li>
        <li><span className="bold white">The target:</span> the goal on file asked for a &ge;40% shrink of the node crate. The crate no longer exists.</li>
      </ul>
      <p>The second-order effects registered immediately. The pull-request merge gate &mdash; the check every change waits on before landing &mdash; had taken 2&ndash;2.5 minutes on the old codebase when the pipeline was healthy; its median is now <span className="bold white">1.2 minutes</span>, across a broader set of checks than before. The full test suite went from roughly <span className="bold white">11 minutes to a 6.3-minute median</span>. Compile-and-test time is overhead that every card, every retry, and every verification loop pays, so halving it compounds across every hour the fleet runs.</p>

      <Section variant="rose">
        <h2><span className="bold">The DMG was where the instability lived</span></h2>
        <p>One reading settles the question of whether the DMG channel needed to go: in its final week of operation, <span className="bold white">not one release tag produced a green installer</span>. The failure causes rotated &mdash; code-signing keychain faults on the build machine; a lapsed developer-program agreement on the notarization side (a form on someone else&rsquo;s website, halting our releases &mdash; <Link to="/blog/self-hosting-the-forge">a failure class we had encountered before</Link>); a red smoke test on an installer path already slated for removal; 90-minute builds occupying the one machine that could run them, backing up every queue behind them. Each fault was individually diagnosable and fixable. Collectively they meant the release channel for our primary artifact was not in working order, and each fix was followed by a different fault on the next tag.</p>
      </Section>

      <p>Compare the two pipelines as systems. The DMG was a four-hour pipeline on a good day &mdash; two sidecar builds at 90&ndash;100 minutes each, serialized on a single Mac runner; two app bundles; a smoke gate; then signing, notarization, and stapling on infrastructure and timelines we didn&rsquo;t control. Four hours of wall time is four hours of exposure: more stages, more machines, more external dependencies, more ways to fail. The Mini release is one static binary pair for one architecture, tarred, checksummed, published, and pointed at by a package-manager formula. Measured on a real release this week: <span className="bold white">about seven minutes from upload to installable</span>, with the formula bump itself taking under thirty seconds. There is no signing step, no notarization queue, no smoke matrix &mdash; not because we operate them better now, but because <span className="bold white">the artifact that required them no longer exists</span>.</p>

      <ArchFigure svg={PIPELINES} caption="Fig. 3 — four hours of exposure vs. seven minutes of pipeline" />

      <h2>Removal is a coordination problem</h2>
      <p>The Rust was the straightforward part. Any competent engineer can delete a crate; the work is in deleting it <em>while the rest of the fleet stays in normal operation</em> &mdash; no stale card rebuilding what was just removed, no release firing against a retired pipeline, no loss of the record of why any of it happened. That took the whole toolkit, each piece doing the one job it&rsquo;s shaped for: <span className="bold">Situations</span> to make the freeze a single enforced fact rather than tribal knowledge; <span className="bold">Kanban</span> to make the removal a sequence of small, verifiable, revertable steps; <span className="bold">Brain</span> to keep the decisions durable enough that even the tooling&rsquo;s own mistakes got checked against them; and the <span className="bold">routines</span> to verify progress on a schedule so no one had to stand watch.</p>
      <p>We&rsquo;ve written before that <Link to="/blog/the-fix-was-subtraction">the best fix is often subtraction</Link>. This was subtraction at subsystem scale, run as an ordinary, well-instrumented procedure &mdash; and the tools that kept it ordinary are the same apps we ship. The database under Brain, Kanban, and Situations lost 61% of its weight over three days, and all three ran through the entire operation without interruption. That is the product claim, stated as an operational result: a kernel small enough to trust, with everything else living where features belong &mdash; in apps.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
