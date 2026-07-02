import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for billed/paid compute, dimension lines, joint marks, mono caps
// labels, a single accent for the highlighted element). Inline SVG — no
// auto-layout.
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

// 1 — the parallelism tax. One tall serial job pays setup+compile once; six
// shards each re-pay it. Wall-clock shrinks; the billed (poché) area grows.
const TAX = `${SVG_OPEN('0 0 660 330')}
  <text x="20" y="30" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ONE JOB</text>
  <text x="20" y="46" fill="#928374" font-size="10">setup paid once</text>

  <!-- serial: one setup block (poché) + one long run -->
  <rect x="20" y="60" width="150" height="40" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="95" y="84" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">SETUP+COMPILE</text>
  <rect x="20" y="100" width="150" height="150" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="95" y="178" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">TEST RUN</text>

  <!-- wall-clock dimension for the serial job -->
  <line x1="20" y1="262" x2="20" y2="276" stroke="#928374" stroke-width="1"/>
  <line x1="170" y1="262" x2="170" y2="276" stroke="#928374" stroke-width="1"/>
  <line x1="20" y1="269" x2="170" y2="269" stroke="#928374" stroke-width="1"/>
  <text x="95" y="292" text-anchor="middle" fill="#928374" font-size="10">WALL-CLOCK</text>

  <text x="95" y="316" text-anchor="middle" fill="#928374" font-size="10">1 SETUP BILLED</text>

  <!-- divider -->
  <line x1="250" y1="30" x2="250" y2="300" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="300" y="30" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SIX SHARDS</text>
  <text x="300" y="46" fill="#83a598" font-size="10">setup paid six times</text>

  <!-- six shards: each its own poché setup + short run -->
  <rect x="300" y="60" width="48" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <rect x="300" y="100" width="48" height="26" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="358" y="60" width="48" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <rect x="358" y="100" width="48" height="26" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="416" y="60" width="48" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <rect x="416" y="100" width="48" height="26" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="474" y="60" width="48" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <rect x="474" y="100" width="48" height="26" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="532" y="60" width="48" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <rect x="532" y="100" width="48" height="26" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="590" y="60" width="48" height="40" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <rect x="590" y="100" width="48" height="26" fill="none" stroke="#928374" stroke-width="1"/>

  <text x="324" y="84" text-anchor="middle" fill="#83a598" font-size="8">SET</text>
  <text x="324" y="116" text-anchor="middle" fill="#928374" font-size="8">RUN</text>

  <!-- wall-clock dimension for one shard (short) -->
  <line x1="300" y1="138" x2="300" y2="152" stroke="#83a598" stroke-width="1"/>
  <line x1="348" y1="138" x2="348" y2="152" stroke="#83a598" stroke-width="1"/>
  <line x1="300" y1="145" x2="348" y2="145" stroke="#83a598" stroke-width="1"/>
  <text x="324" y="168" text-anchor="middle" fill="#83a598" font-size="9">SHORTER</text>

  <text x="469" y="230" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">6&times; THE POCH&Eacute; = 6 SETUPS BILLED</text>
  <text x="469" y="250" text-anchor="middle" fill="#928374" font-size="10">wall-clock falls &mdash; billed compute climbs</text>
</svg>`;

// 2 — dependency-aware gating. A change to the top leaf (nothing depends on it)
// lights only itself; a change to the base would light the whole graph.
const CLOSURE = `${SVG_OPEN('0 0 660 300')}
  <!-- leaf (top): the change lands here -->
  <rect x="250" y="24" width="160" height="40" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="42" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">TOP SUBSYSTEM</text>
  <text x="330" y="57" text-anchor="middle" fill="#83a598" font-size="10">the change &mdash; nothing depends on it</text>

  <text x="446" y="40" fill="#83a598" font-size="10" letter-spacing="1">&larr; EDIT HERE</text>
  <text x="446" y="55" fill="#928374" font-size="9">only this runs</text>

  <!-- edge A->B means "A depends on B": arrows point DOWN, dependent to
       dependency. TOP depends on the mids; the mids depend on the base.
       Nothing points into TOP, so nothing depends on it. Faint = not run. -->
  <line x1="330" y1="64" x2="330" y2="88" stroke="#504945" stroke-width="1"/>
  <line x1="225" y1="88" x2="435" y2="88" stroke="#504945" stroke-width="1"/>
  <line x1="225" y1="88" x2="225" y2="118" stroke="#504945" stroke-width="1"/>
  <polygon points="225,120 221,112 229,112" fill="#504945"/>
  <line x1="435" y1="88" x2="435" y2="118" stroke="#504945" stroke-width="1"/>
  <polygon points="435,120 431,112 439,112" fill="#504945"/>

  <rect x="150" y="120" width="150" height="38" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="225" y="143" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1">MID A</text>
  <rect x="360" y="120" width="150" height="38" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="435" y="143" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1">MID B</text>

  <line x1="225" y1="158" x2="225" y2="184" stroke="#504945" stroke-width="1"/>
  <line x1="435" y1="158" x2="435" y2="184" stroke="#504945" stroke-width="1"/>
  <line x1="225" y1="184" x2="435" y2="184" stroke="#504945" stroke-width="1"/>
  <line x1="330" y1="184" x2="330" y2="210" stroke="#504945" stroke-width="1"/>
  <polygon points="330,212 326,204 334,204" fill="#504945"/>

  <rect x="230" y="212" width="200" height="40" fill="url(#poche)" stroke="#504945" stroke-width="1"/>
  <text x="330" y="230" text-anchor="middle" fill="#928374" font-size="12" letter-spacing="1.5">BASE SUBSYSTEM</text>
  <text x="330" y="245" text-anchor="middle" fill="#928374" font-size="10">everything depends on it</text>

  <text x="330" y="284" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">EDIT THE BASE INSTEAD &mdash; THE WHOLE GRAPH LIGHTS UP</text>
</svg>`;

// 3 — three guardrails at three time horizons.
const GUARDS = `${SVG_OPEN('0 0 660 220')}
  <!-- timeline spine -->
  <line x1="40" y1="70" x2="620" y2="70" stroke="#928374" stroke-width="1"/>
  <polygon points="620,70 611,66 611,74" fill="#928374"/>
  <text x="40" y="30" fill="#928374" font-size="10" letter-spacing="1">TIME &rarr;</text>

  <!-- gate 1 -->
  <rect x="46" y="46" width="4" height="4" fill="#83a598"/>
  <rect x="60" y="86" width="150" height="54" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="135" y="70" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">MERGE TIME</text>
  <text x="135" y="110" text-anchor="middle" fill="#ebdbb2" font-size="11">fan-out cap lint</text>
  <text x="135" y="128" text-anchor="middle" fill="#928374" font-size="10">blocks the PR</text>

  <!-- gate 2 -->
  <rect x="253" y="68" width="4" height="4" fill="#928374"/>
  <rect x="180" y="86" width="150" height="54" fill="none" stroke="#928374" stroke-width="1" transform="translate(75,0)"/>
  <text x="330" y="70" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">DAILY</text>
  <text x="330" y="110" text-anchor="middle" fill="#ebdbb2" font-size="11">billing watchdog</text>
  <text x="330" y="128" text-anchor="middle" fill="#928374" font-size="10">files an alert</text>

  <!-- gate 3 -->
  <rect x="463" y="68" width="4" height="4" fill="#928374"/>
  <rect x="450" y="86" width="160" height="54" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="530" y="70" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">ALWAYS</text>
  <text x="530" y="110" text-anchor="middle" fill="#ebdbb2" font-size="11">standing rule</text>
  <text x="530" y="128" text-anchor="middle" fill="#928374" font-size="10">read before optimizing</text>

  <text x="330" y="184" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ONE CAN BE FOOLED &mdash; NOT ALL THREE AT ONCE</text>
</svg>`;

export default function BlogTheParallelismTax() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Parallelism Tax - LastDB</title>
        <meta name="description" content="We split our test suite into 267 parallel shards to make CI faster. It worked — and the monthly compute bill went up roughly a hundredfold. The catch nobody prices in: every parallel job re-pays a fixed startup cost, so parallelism buys wall-clock with billed compute. Here's the fix, and the three guardrails that stop it recurring." />
        <meta property="og:title" content="The Parallelism Tax" />
        <meta property="og:description" content="Splitting a test suite into hundreds of parallel shards made CI faster and the bill enormous. Parallelism doesn't divide the work — it multiplies the fixed cost each job pays before its first test." />
        <link rel="canonical" href="https://thelastdb.com/blog/the-parallelism-tax" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Parallelism Tax</h1>
      <p className="post-meta dim">2026-07-02</p>

      <p className="bold white">We split our test suite into hundreds of parallel pieces to make CI faster. It worked: a run that used to take eleven minutes took eight. Then the bill arrived. In one month our continuous-integration compute went up roughly <span className="white">a hundredfold</span> &mdash; enough that, one morning, our CI provider simply refused to start any more jobs. <span className="white">We had optimized the one number we were watching and blown up the one we weren&rsquo;t.</span></p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What we did, and why it looked smart</h2>
      <p>Our codebase is a single repository holding many subsystems &mdash; a database core, the node that wraps it, a schema service, some serverless functions. A full test run compiles and exercises the lot. To make that run <span className="bold">wall-clock</span> faster, we did the obvious thing: we cut the suite into shards and ran them in parallel. Two shards, then ten, then &mdash; chasing the last minute off the clock &mdash; two hundred and sixty-seven. Each shard runs a small slice of the tests at the same time as all the others, so the whole thing finishes when the <span className="bold">slowest single slice</span> finishes, not when the sum of them would. On the stopwatch, it was a win. The stopwatch was the problem.</p>

      <Section variant="rose">
        <h2><span className="bold">The catch: every shard pays the toll again</span></h2>
        <p>A parallel job is not free the instant it starts. Before it runs a single test it has to <span className="bold">check out the code, install the toolchain, restore its cache, and compile</span> &mdash; five to seven minutes of billed machine time, every time, on every shard. Split one job into six and you have not divided the work into six. You have divided the <span className="bold">tests</span> into six and <span className="bold">multiplied the setup by six</span>. The wall-clock falls because the slices run side by side. The <span className="bold">bill</span> rises because you are now paying for that fixed startup two hundred and sixty-seven times instead of a handful.</p>
      </Section>

      <ArchFigure svg={TAX} caption="Fig. 1 — split the run and the clock shrinks, but the billed setup (hatched) is paid once per shard" />

      <p>This is the whole trap in one sentence: <span className="bold white">you are billed for the total area, but you were only looking at the width.</span> Parallelism is a lever that trades money for time, and we had been pulling it as if it were free. Two hundred and sixty-seven shards, each re-compiling, added up to hundreds of thousands of machine-minutes a month &mdash; a bill that dwarfed the eleven-to-eight-minute prize we&rsquo;d bought with it.</p>

      <h2>The fix: run only what the change can touch</h2>
      <p>The deeper waste was subtler than the setup toll. Every change ran <span className="bold">every</span> shard &mdash; a one-line edit in the schema service still recompiled and retested the database core, the node, the functions, everything. But most changes only touch one subsystem. So we taught CI to look at <span className="bold">what actually changed</span> and run only the parts that could possibly be affected by it.</p>

      <p>The subsystems form a dependency graph: some are foundations that others build on, some are leaves that nothing else depends on. When a change lands in a leaf, nothing downstream can break, so nothing downstream needs to run &mdash; just that leaf. When a change lands in a foundation, everything built on it is in play, so everything runs. CI now follows that graph instead of a single on/off switch.</p>

      <ArchFigure svg={CLOSURE} caption="Fig. 2 — a change runs its subsystem plus whatever depends on it, and nothing else" />

      <p>The rule is deliberately paranoid in one direction: when in doubt, run more, not less. Anything that could affect the whole build &mdash; a lockfile, a toolchain bump, the CI config itself &mdash; still triggers the full suite, and a catch-all shard sweeps up any new code that hasn&rsquo;t been assigned a home yet. <span className="dim">Cheaper must never mean untested; it only means not-pointlessly-retested.</span> With that in place, plus a sober look at how many shards we actually needed, a typical change now runs a fraction of what it used to, and a full run costs a fraction of what it did &mdash; with the same tests covering the same code.</p>

      <h2>How we stop it happening again</h2>
      <p>Fixing the bill was the easy part. The interesting question is <span className="bold">why it happened at all</span> &mdash; and the answer is not &ldquo;someone was careless.&rdquo; The person who added the shards was optimizing the number they could see. The number they couldn&rsquo;t see &mdash; the compute bill &mdash; had nothing pushing back on it. A system that only shows you wall-clock will get optimized straight into a compute explosion by someone doing their honest best.</p>

      <p>So the durable fix isn&rsquo;t a smarter config. It&rsquo;s making the invisible cost impossible to ignore, at three different moments:</p>

      <ul>
        <li><span className="bold white">At merge time</span> &mdash; a check that caps how far the test matrix is allowed to fan out. Push past the cap and the pull request is blocked, with a message explaining that raising it requires measuring the compute cost first. This is the wall you hit the instant you try to re-spiral.</li>
        <li><span className="bold white">Once a day</span> &mdash; a watchdog that reads the actual billing numbers and raises a flag if spend, run volume, or per-run cost drifts up. It catches the things a merge-time check can&rsquo;t see: a slow creep, a runaway retry loop, cost quietly migrating somewhere new.</li>
        <li><span className="bold white">Always</span> &mdash; a written rule, kept where the people (and the automated agents) doing this work will read it before they optimize: <em>parallelism buys wall-clock with money; never trade unbounded compute for speed, and never raise a limit without measuring what it costs.</em></li>
      </ul>

      <ArchFigure svg={GUARDS} caption="Fig. 3 — three guardrails at three time horizons: merge, day, forever" />

      <p>None of the three is sufficient alone. The merge check only sees shard counts; the watchdog is a day late; the rule is only words. But a spiral has to slip past all three at once, and each covers the others&rsquo; blind spot. That is the actual lesson, and it is older than CI: <span className="bold white">a metric you optimize without its cost beside it will get optimized until the cost is a crisis.</span> The fix is never just to undo the damage &mdash; it&rsquo;s to put the missing number back in the frame, permanently, so the next well-meaning optimization can see what we couldn&rsquo;t.</p>

      <p className="dim">More on how we work in the open: <Link to="/blog/prove-it-to-land">why a green pull request isn&rsquo;t proof</Link>, and <Link to="/blog/speedups-we-didnt-write">a week of speedups we didn&rsquo;t write</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
