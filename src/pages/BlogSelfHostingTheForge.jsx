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

// 1 — every merge routed through one box you don't control.
const SINGLE_POINT = `${SVG_OPEN('0 0 660 240')}
  <rect x="44" y="36" width="132" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="110" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">AGENT</text>
  <rect x="44" y="96" width="132" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="110" y="120" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">AGENT</text>
  <rect x="44" y="156" width="132" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="110" y="180" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">AGENT</text>
  <text x="110" y="222" text-anchor="middle" fill="#928374" font-size="10">the fleet — ships around the clock</text>

  <rect x="176" y="54" width="4" height="4" fill="#928374"/>
  <rect x="176" y="114" width="4" height="4" fill="#928374"/>
  <rect x="176" y="174" width="4" height="4" fill="#928374"/>
  <line x1="180" y1="56" x2="300" y2="56" stroke="#928374" stroke-width="1"/>
  <line x1="180" y1="116" x2="300" y2="116" stroke="#928374" stroke-width="1"/>
  <line x1="180" y1="176" x2="300" y2="176" stroke="#928374" stroke-width="1"/>
  <line x1="300" y1="56" x2="300" y2="176" stroke="#928374" stroke-width="1"/>

  <line x1="300" y1="116" x2="346" y2="116" stroke="#928374" stroke-width="1"/>
  <line x1="374" y1="116" x2="418" y2="116" stroke="#928374" stroke-width="1"/>
  <line x1="352" y1="108" x2="372" y2="124" stroke="#83a598" stroke-width="1"/>
  <line x1="352" y1="124" x2="372" y2="108" stroke="#83a598" stroke-width="1"/>
  <text x="352" y="94" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">A BILLING SWITCH</text>
  <text x="352" y="144" text-anchor="middle" fill="#928374" font-size="10">not yours to flip</text>

  <rect x="420" y="82" width="196" height="68" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="416" y="114" width="4" height="4" fill="#928374"/>
  <text x="518" y="112" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">GITHUB</text>
  <text x="518" y="130" text-anchor="middle" fill="#928374" font-size="10">someone else&#39;s computer</text>
  <text x="518" y="176" text-anchor="middle" fill="#928374" font-size="10">every merge, every test, every release</text>
</svg>`;

// 2 — the hybrid: hot local forge, warm daily mirror, hourly pulls back.
const HYBRID = `${SVG_OPEN('0 0 660 260')}
  <rect x="36" y="30" width="284" height="200" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="48" y="48" fill="#928374" font-size="10" letter-spacing="2">YOUR MACHINE</text>

  <rect x="66" y="66" width="224" height="70" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="178" y="96" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">LOCAL FORGE</text>
  <text x="178" y="114" text-anchor="middle" fill="#928374" font-size="10">the monorepo — hot</text>

  <rect x="66" y="164" width="224" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="178" y="186" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">THE FLEET</text>
  <text x="178" y="203" text-anchor="middle" fill="#928374" font-size="10">prs open + merge here</text>
  <rect x="176" y="136" width="4" height="4" fill="#928374"/>
  <line x1="178" y1="140" x2="178" y2="164" stroke="#928374" stroke-width="1"/>

  <rect x="420" y="66" width="196" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="518" y="96" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">GITHUB</text>
  <text x="518" y="114" text-anchor="middle" fill="#928374" font-size="10">warm mirror</text>
  <text x="518" y="160" text-anchor="middle" fill="#928374" font-size="10">downstream automation</text>
  <text x="518" y="174" text-anchor="middle" fill="#928374" font-size="10">still fires off the mirror</text>

  <rect x="288" y="80" width="4" height="4" fill="#83a598"/>
  <line x1="292" y1="82" x2="410" y2="82" stroke="#83a598" stroke-width="1"/>
  <polygon points="418,82 409,78 409,86" fill="#83a598"/>
  <text x="368" y="70" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">PUSH &#183; DAILY</text>

  <rect x="416" y="118" width="4" height="4" fill="#928374"/>
  <line x1="416" y1="120" x2="300" y2="120" stroke="#928374" stroke-width="1"/>
  <polygon points="292,120 301,116 301,124" fill="#928374"/>
  <text x="368" y="110" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">PULL &#183; HOURLY</text>
  <text x="368" y="152" text-anchor="middle" fill="#928374" font-size="10">the other repos</text>

  <text x="330" y="246" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">REVERSIBLE — EITHER SIDE CAN BE RE-PROMOTED</text>
</svg>`;

// 3 — a push mirror makes the target MATCH the source; target-only refs are erased.
const MIRROR_SEMANTICS = `${SVG_OPEN('0 0 660 250')}
  <text x="160" y="44" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SOURCE — FORGE</text>
  <rect x="60" y="56" width="200" height="130" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="84" y="72" width="152" height="20" fill="#282828" stroke="#928374" stroke-width="1"/>
  <text x="94" y="86" fill="#ebdbb2" font-size="10">main</text>
  <rect x="84" y="102" width="152" height="20" fill="#282828" stroke="#928374" stroke-width="1"/>
  <text x="94" y="116" fill="#ebdbb2" font-size="10">feat/a</text>
  <rect x="84" y="132" width="152" height="20" fill="#282828" stroke="#928374" stroke-width="1"/>
  <text x="94" y="146" fill="#ebdbb2" font-size="10">feat/b</text>

  <rect x="256" y="108" width="4" height="4" fill="#83a598"/>
  <line x1="260" y1="110" x2="390" y2="110" stroke="#83a598" stroke-width="1"/>
  <polygon points="398,110 389,106 389,114" fill="#83a598"/>
  <text x="328" y="98" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1.5">SYNC</text>
  <text x="330" y="128" text-anchor="middle" fill="#928374" font-size="10">match the source</text>

  <text x="500" y="44" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">TARGET — GITHUB</text>
  <rect x="400" y="56" width="200" height="130" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="424" y="72" width="152" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="434" y="86" fill="#ebdbb2" font-size="10">main</text>
  <rect x="424" y="102" width="152" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="434" y="116" fill="#ebdbb2" font-size="10">feat/a</text>
  <rect x="424" y="132" width="152" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="434" y="146" fill="#ebdbb2" font-size="10">feat/b</text>
  <rect x="424" y="160" width="152" height="20" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="434" y="174" fill="#83a598" font-size="10">feat/c — only here</text>
  <line x1="424" y1="170" x2="576" y2="170" stroke="#83a598" stroke-width="1"/>

  <text x="500" y="208" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">ERASED BY THE SYNC</text>
  <text x="330" y="236" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">PARITY-CHECK BOTH SIDES BEFORE THE FIRST SYNC</text>
</svg>`;

export default function BlogSelfHostingTheForge() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Forge Comes Home - LastDB</title>
        <meta name="description" content="On June 23rd every merge in our org froze for hours — not a bug, a billing switch on someone else's computer. We build a local-first database; our own source of truth was the least local thing we owned. So we moved the monorepo to a self-hosted forge on our own disk, kept GitHub as a warm daily mirror, and migrated twenty open PRs in an evening. The architecture, and what the mirror ate on the way." />
        <meta property="og:title" content="The Forge Comes Home" />
        <meta property="og:description" content="Your repository is data too. We moved our monorepo's source of truth onto our own disk — a hybrid, reversible cutover with GitHub demoted to a warm mirror — and the agent fleet landed sixteen migrated PRs within the hour." />
        <link rel="canonical" href="https://thelastdb.com/blog/self-hosting-the-forge" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Forge Comes Home</h1>
      <p className="post-meta dim">2026-07-02</p>

      <p className="bold white">On June 23rd, every merge in our organization stopped for several hours. Nothing had crashed. No disk had filled, no test had failed. A billing setting had tripped on someone else&rsquo;s computer, and until a human noticed and fixed it, an autonomous fleet that ships around the clock sat with its hands folded. <span className="white">Today we moved our monorepo&rsquo;s source of truth onto our own disk.</span></p>

      <p>We build a local-first database. The pitch, compressed: your data should live on hardware you control, and anything else is a courtesy someone extends to you until they don&rsquo;t. It took an outage to notice how selectively we&rsquo;d been applying our own thesis. The company&rsquo;s most valuable data &mdash; the repository, every line we&rsquo;ve ever written &mdash; lived entirely on a rented forge, behind an account, behind a billing page.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>A single point of someone else</h2>
      <p>A hosted forge is a fine landlord until you notice how much you&rsquo;ve moved in. Ours held the code, yes &mdash; but also the merge queue, the CI, the release pipeline, and therefore the <em>tempo</em> of the whole operation. Our development loop is run by agents; they open pull requests, prove them, and merge them at all hours (<Link to="/blog/building-lastdb-with-agents">the loop</Link>, <Link to="/blog/prove-it-to-land">the gate</Link>). Every one of those motions was routed through a single external service. The June freeze wasn&rsquo;t even hostile &mdash; it was a spending limit doing its job, as <Link to="/blog/the-parallelism-tax">we&rsquo;d earned</Link>. That&rsquo;s what made it clarifying. Availability wasn&rsquo;t the vendor&rsquo;s promise to us; it was coupled to a setting, and the setting outranked the fleet.</p>

      <ArchFigure svg={SINGLE_POINT} caption="Fig. 1 — every motion of the loop, routed through one box" />

      <Section variant="sage">
        <h2><span className="bold">Repositories are data too</span></h2>
        <p>The local-first argument doesn&rsquo;t have a carve-out for git. A repository is the most carefully curated dataset a software company owns; hosting it exclusively on someone else&rsquo;s machine is the same wager we tell users not to make with their notes and their photos. The honest version of our thesis had to include the forge: <span className="bold white">hot on our own disk, mirrored outward as a courtesy &mdash; not the other way around.</span></p>
      </Section>

      <h2>Hybrid, not heroic</h2>
      <p>The move itself was deliberately boring. A self-hosted forge &mdash; Forgejo, a single small binary with a SQLite database, installed from Homebrew, listening only on localhost &mdash; now holds the monorepo as its source of truth. The agents open and merge pull requests there, over the loopback interface, against hardware in the room. No account. No billing page. No one else&rsquo;s maintenance window.</p>
      <p>GitHub was not fired; it was demoted. Once a day the forge pushes the monorepo back out to it, so the mirror stays warm and everything downstream that keys off the hosted copy &mdash; dependent repos, deploy workflows &mdash; keeps firing exactly as before. Every <em>other</em> repository stayed put: GitHub remains their source of truth, and the forge pulls them hourly so a complete copy of the org sits on disk regardless. The whole arrangement is reversible in an afternoon, which is precisely what let us do it in an evening. A cutover you can undo is a cutover you can start.</p>

      <ArchFigure svg={HYBRID} caption="Fig. 2 — the monorepo hot at home; GitHub warm, one push a day" />

      <p>Migrating the work in flight was less drama than the phrase &ldquo;forge migration&rdquo; suggests. Twenty pull requests were open at cutover. We closed each on GitHub with a forwarding note and recreated it on the forge &mdash; same branch, same title, same body. The branches were already there; a PR is just a pointer with opinions. Within the hour, sixteen of the twenty had been driven to merge on the new forge by the same loop that would have driven them on the old one. The fleet, to its credit, did not notice it had emigrated.</p>

      <Section variant="rose">
        <h2><span className="bold">What the mirror ate</span></h2>
        <p>One lesson, paid for the honest way. A push mirror does not <em>add</em> your changes to the target &mdash; it makes the target <span className="bold white">match the source</span>, deletions included. Our first sync ran while a few hundred branches existed only on the target, and the mirror did exactly what a mirror does: reflected their absence. Most were long-merged stubble we wanted gone anyway; a handful were live, and we spent an hour fishing tips back out of closed-PR refs. <span className="bold">Parity-check both sides before the first sync</span> &mdash; the mirror&rsquo;s definition of tidy is total.</p>
        <p>A second, quieter one: if your history is squash-merged, &ldquo;is this branch merged into main&rdquo; is unanswerable by ancestry &mdash; the tip was never an ancestor of anything. Staleness lives in the PR record, not the commit graph. Ask the ledger, not the tree.</p>
      </Section>

      <ArchFigure svg={MIRROR_SEMANTICS} caption="Fig. 3 — a mirror&rsquo;s definition of tidy is total" />

      <h2>What we deliberately left unsolved</h2>
      <p>The forge does not run CI yet. The runner is being stood up now, and until it&rsquo;s in place the merge gate is the fleet running the test suites locally before landing &mdash; the same proof obligations, enforced by discipline instead of machinery. We&rsquo;d rather ship the honest interim than pretend the cutover included a piece it didn&rsquo;t. The gap is a card on the board with a dependency chain, not a surprise for a future incident writeup.</p>
      <p>The larger point stands without it. The outage that motivated all this was nobody&rsquo;s villainy &mdash; just the ordinary physics of building on machines you don&rsquo;t own. Your database should sit on your disk. So, it turns out, should your forge.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
