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

// 1 — the interim: the forge holds the code, but proof is a human/agent ritual, not a machine.
const INTERIM = `${SVG_OPEN('0 0 660 220')}
  <rect x="66" y="60" width="200" height="70" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="166" y="90" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">THE FORGE</text>
  <text x="166" y="108" text-anchor="middle" fill="#928374" font-size="10">holds the code, merges the prs</text>

  <rect x="264" y="88" width="4" height="4" fill="#928374"/>
  <line x1="268" y1="90" x2="392" y2="90" stroke="#928374" stroke-width="1"/>
  <polygon points="400,90 391,86 391,94" fill="#928374"/>
  <text x="330" y="76" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">BEFORE MERGE</text>

  <rect x="402" y="56" width="212" height="78" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="508" y="82" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RUN THE SUITES</text>
  <text x="508" y="100" text-anchor="middle" fill="#83a598" font-size="10">by hand, on whoever&#39;s laptop</text>
  <text x="508" y="118" text-anchor="middle" fill="#928374" font-size="10">discipline, not machinery</text>

  <text x="330" y="176" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">NO RUNNER — THE PROOF OBLIGATION STILL STANDS,</text>
  <text x="330" y="194" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">JUST NOT ENFORCED BY A MACHINE YET</text>
</svg>`;

// 2 — the runner attaches: Tom's own machine becomes the compute behind the gate.
const RUNNER = `${SVG_OPEN('0 0 660 250')}
  <rect x="36" y="30" width="260" height="200" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="48" y="48" fill="#928374" font-size="10" letter-spacing="2">YOUR MACHINE</text>

  <rect x="60" y="66" width="212" height="56" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="166" y="90" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE FORGE</text>
  <text x="166" y="106" text-anchor="middle" fill="#928374" font-size="10">source of truth</text>

  <rect x="164" y="122" width="4" height="4" fill="#928374"/>
  <line x1="166" y1="126" x2="166" y2="158" stroke="#928374" stroke-width="1"/>
  <rect x="164" y="158" width="4" height="4" fill="#928374"/>
  <text x="180" y="146" fill="#928374" font-size="10" letter-spacing="1">DISPATCHES A JOB</text>

  <rect x="60" y="162" width="212" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="166" y="184" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RUNNER</text>
  <text x="166" y="200" text-anchor="middle" fill="#83a598" font-size="10">idle cycles on the same box</text>

  <rect x="420" y="80" width="196" height="90" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="518" y="106" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE FLEET</text>
  <text x="518" y="124" text-anchor="middle" fill="#928374" font-size="10">opens + merges prs</text>
  <text x="518" y="150" text-anchor="middle" fill="#928374" font-size="10">now gated by a machine,</text>
  <text x="518" y="166" text-anchor="middle" fill="#928374" font-size="10">not a promise</text>

  <line x1="298" y1="150" x2="412" y2="150" stroke="#928374" stroke-width="1"/>
  <rect x="294" y="148" width="4" height="4" fill="#928374"/>
  <polygon points="420,150 411,146 411,154" fill="#928374"/>

  <text x="330" y="240" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">NO RENTED COMPUTE — THE GATE RUNS ON HARDWARE ALREADY IN THE ROOM</text>
</svg>`;

// 3 — the queue drains: PRs waiting on proof, before and after the runner landed.
const QUEUE = `${SVG_OPEN('0 0 660 240')}
  <text x="150" y="42" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BEFORE</text>
  <rect x="60" y="56" width="180" height="18" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="60" y="78" width="180" height="18" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="60" y="100" width="180" height="18" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="60" y="122" width="180" height="18" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="60" y="144" width="180" height="18" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="150" y="182" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">PRS WAITING ON MANUAL PROOF</text>

  <text x="510" y="42" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">NOW</text>
  <rect x="420" y="56" width="180" height="18" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="510" y="182" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">MERGED AS FAST AS THEY&#39;RE OPENED</text>

  <line x1="250" y1="90" x2="400" y2="90" stroke="#928374" stroke-width="1"/>
  <polygon points="408,90 399,86 399,94" fill="#928374"/>
  <text x="328" y="78" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">THE RUNNER LANDS</text>

  <text x="330" y="220" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">A FEW HARDENING CARDS STILL OPEN — NOT ON THE MERGE PATH</text>
</svg>`;

export default function BlogTheRunnerComesHome() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Runner Comes Home - LastDB</title>
        <meta name="description" content="When we moved our monorepo to a self-hosted forge, we left one thing deliberately unsolved: the forge didn't run CI. Proof was enforced by discipline, not machinery. We've now closed that gap — CI runs on the forge, and the compute behind it is idle cycles on hardware already in the room, not a rented queue. PR velocity is back to where it was before the whole detour started." />
        <meta property="og:title" content="The Runner Comes Home" />
        <meta property="og:description" content="The gate that used to run on discipline now runs on a machine — and the machine is ours. Closing the CI gap the forge migration left open, and what's still left on the board." />
        <link rel="canonical" href="https://thelastdb.com/blog/the-runner-comes-home" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Runner Comes Home</h1>
      <p className="post-meta dim">2026-07-03</p>

      <p className="bold white">Two weeks ago we moved our monorepo&rsquo;s source of truth off a hosted forge and onto our own disk, and said out loud that we were leaving one thing unsolved: <Link to="/blog/self-hosting-the-forge">the forge didn&rsquo;t run CI yet</Link>. <span className="white">It does now &mdash; and the compute behind it isn&rsquo;t rented from anyone.</span></p>

      <p>The honest version of that earlier post included the gap on purpose. A forge that only holds code and merges PRs isn&rsquo;t finished; it&rsquo;s a database with the indexes not yet built. The interim measure was the fleet running test suites by hand before landing anything &mdash; the same proof obligations, enforced by whoever happened to be awake instead of by a machine. It worked. It also wasn&rsquo;t going to survive contact with the pace we actually run at.</p>

      <ArchFigure svg={INTERIM} caption="Fig. 1 — the interim: the gate stood, but nothing pulled the trigger" />

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Compute already in the room</h2>
      <p>A hosted CI queue is the same wager as a hosted forge &mdash; a resource you don&rsquo;t own gating a motion you make constantly. Having just paid for that lesson once, we weren&rsquo;t going to buy it again to get our indexes back. So the runner that actually executes jobs isn&rsquo;t a cloud queue at all; it&rsquo;s idle cycles on the same machine the forge already lives on. The forge dispatches a job, the runner picks it up over the loopback interface, and the result comes back before the fleet is ever allowed to merge.</p>

      <ArchFigure svg={RUNNER} caption="Fig. 2 — the gate runs on hardware already in the room" />

      <Section variant="sage">
        <h2><span className="bold">The gate stopped being a promise</span></h2>
        <p>The difference isn&rsquo;t philosophical, it&rsquo;s operational: before, &ldquo;tests pass&rdquo; meant an agent or a person had run them and said so. Now it means a machine ran them and the forge saw the result before it would let anything merge. Same bar. One of them can be forgotten under a deadline; the other can&rsquo;t.</p>
      </Section>

      <h2>What came back</h2>
      <p>The visible payoff is the least interesting part and the only one that matters day to day: PR merge velocity is back to where it was before any of this started. The queue that built up while proof was manual has drained, and pull requests move at the pace the fleet opens them, not the pace someone remembers to run a suite.</p>

      <ArchFigure svg={QUEUE} caption="Fig. 3 — the queue, before and after the runner landed" />

      <p>We&rsquo;re not calling the CI setup finished, and we&rsquo;d rather say so than round it up. A handful of hardening cards are still open on the board &mdash; retry behavior, a couple of edge-case workflows, the kind of polish that shows up once real traffic hits a new system rather than during the setup itself. None of them sit on the merge path; they&rsquo;re queued to close out on their own as the same fleet that opened this whole detour works through the board.</p>

      <p>Which is really the point of building the way we do. The gap in the last post wasn&rsquo;t a cliffhanger for effect &mdash; it was a card with a dependency chain, and the chain resolved the same way everything else on the board does: unattended, in order, without anyone having to remember it was there.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
