import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, joint marks, mono caps labels, a single accent
// for the shipped result). Rendered as inline SVG so there's no auto-layout.
// Matches the house figure style used across the blog.
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

// 1 — three tiers: you set the brain, the loop reads it, and only the gates
//     come back to you. The shipped result is the one accented element.
const LAYERS = `${SVG_OPEN('0 0 660 430')}
  <rect x="230" y="24" width="200" height="46" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="49" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">YOU</text>
  <text x="330" y="64" text-anchor="middle" fill="#928374" font-size="10">set destinations &middot; clear the gates</text>

  <rect x="328" y="70" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="74" x2="330" y2="110" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="106" width="4" height="4" fill="#928374"/>
  <text x="342" y="92" fill="#928374" font-size="10" letter-spacing="2">SETS</text>

  <rect x="60" y="110" width="540" height="92" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="60" y="110" width="540" height="92" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="132" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">THE BRAIN</text>
  <text x="330" y="147" text-anchor="middle" fill="#928374" font-size="10">facts &amp; rules &mdash; read, never acts alone</text>
  <line x1="195" y1="156" x2="195" y2="202" stroke="#504945" stroke-width="1"/>
  <line x1="330" y1="156" x2="330" y2="202" stroke="#504945" stroke-width="1"/>
  <line x1="465" y1="156" x2="465" y2="202" stroke="#504945" stroke-width="1"/>
  <text x="127.5" y="176" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">NORTH</text>
  <text x="127.5" y="189" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">STAR</text>
  <text x="262.5" y="176" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">ACTIVE</text>
  <text x="262.5" y="189" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">PROGRAMS</text>
  <text x="397.5" y="176" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">AUTONOMY</text>
  <text x="397.5" y="189" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">CONTRACT</text>
  <text x="532.5" y="176" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">DRIVING</text>
  <text x="532.5" y="189" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">MODEL</text>

  <rect x="328" y="202" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="206" x2="330" y2="240" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="236" width="4" height="4" fill="#928374"/>
  <text x="342" y="224" fill="#928374" font-size="10" letter-spacing="2">READ BY</text>

  <rect x="60" y="240" width="540" height="112" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="262" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">THE LOOP</text>
  <text x="330" y="277" text-anchor="middle" fill="#928374" font-size="10">scheduled routines, in sequence</text>
  <rect x="75" y="296" width="78" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="114" y="313" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">PROGRAM</text>
  <text x="114" y="326" text-anchor="middle" fill="#ebdbb2" font-size="9" letter-spacing="0.5">DRIVER</text>
  <rect x="183" y="296" width="78" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="222" y="320" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="0.5">GROOM</text>
  <rect x="291" y="296" width="78" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="320" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="0.5">PICKUP</text>
  <rect x="399" y="296" width="78" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="438" y="320" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="0.5">WORKER</text>
  <rect x="507" y="296" width="78" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="546" y="320" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="0.5">WATCH</text>
  <line x1="153" y1="316" x2="179" y2="316" stroke="#928374" stroke-width="1"/>
  <polygon points="183,316 174,312 174,320" fill="#928374"/>
  <line x1="261" y1="316" x2="287" y2="316" stroke="#928374" stroke-width="1"/>
  <polygon points="291,316 282,312 282,320" fill="#928374"/>
  <line x1="369" y1="316" x2="395" y2="316" stroke="#928374" stroke-width="1"/>
  <polygon points="399,316 390,312 390,320" fill="#928374"/>
  <line x1="477" y1="316" x2="503" y2="316" stroke="#928374" stroke-width="1"/>
  <polygon points="507,316 498,312 498,320" fill="#928374"/>

  <rect x="328" y="352" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="356" x2="330" y2="388" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="384" width="4" height="4" fill="#928374"/>
  <text x="342" y="372" fill="#928374" font-size="10" letter-spacing="2">PRODUCES</text>

  <rect x="210" y="388" width="240" height="40" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="412" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">MERGED PRS ON DEV</text>

  <rect x="583" y="314" width="4" height="4" fill="#928374"/>
  <polyline points="585,316 628,316 628,47 432,47" fill="none" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <polygon points="430,47 439,43 439,51" fill="#928374"/>
  <text x="620" y="40" text-anchor="end" fill="#928374" font-size="10" letter-spacing="0.5">SURFACES ONLY THE 5 GATES</text>
</svg>`;

// 2 — one North Star, three modes over its life; prototype and harden ship,
//     maintain runs in the background. The merged result is the accent.
const LIFECYCLE = `${SVG_OPEN('0 0 660 280')}
  <rect x="24" y="116" width="148" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="98" y="137" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">NORTH STAR</text>
  <text x="98" y="151" text-anchor="middle" fill="#928374" font-size="9">a destination with</text>
  <text x="98" y="162" text-anchor="middle" fill="#928374" font-size="9">a checkable &lsquo;done&rsquo;</text>

  <rect x="170" y="139" width="4" height="4" fill="#928374"/>
  <line x1="174" y1="141" x2="210" y2="141" stroke="#928374" stroke-width="1"/>
  <line x1="210" y1="62" x2="210" y2="218" stroke="#928374" stroke-width="1"/>
  <text x="210" y="30" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1.5">BY MODE</text>
  <line x1="210" y1="62" x2="250" y2="62" stroke="#928374" stroke-width="1"/>
  <rect x="246" y="60" width="4" height="4" fill="#928374"/>
  <line x1="210" y1="218" x2="250" y2="218" stroke="#928374" stroke-width="1"/>
  <rect x="246" y="216" width="4" height="4" fill="#928374"/>
  <rect x="246" y="139" width="4" height="4" fill="#928374"/>

  <rect x="250" y="39" width="150" height="46" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="325" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">PROTOTYPE</text>
  <text x="325" y="73" text-anchor="middle" fill="#928374" font-size="9">build the rough version</text>
  <rect x="250" y="118" width="150" height="46" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="325" y="137" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">HARDEN</text>
  <text x="325" y="152" text-anchor="middle" fill="#928374" font-size="9">find edges &middot; prove by running</text>
  <rect x="250" y="195" width="150" height="46" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="325" y="214" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">MAINTAIN</text>
  <text x="325" y="229" text-anchor="middle" fill="#928374" font-size="9">keep it healthy</text>

  <polyline points="400,62 435,62 435,117 466,117" fill="none" stroke="#928374" stroke-width="1"/>
  <polyline points="400,141 435,141 435,117" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="466" y="115" width="4" height="4" fill="#928374"/>
  <rect x="470" y="94" width="160" height="46" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="550" y="121" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">MERGED ON DEV</text>

  <line x1="400" y1="218" x2="466" y2="218" stroke="#928374" stroke-width="1"/>
  <rect x="466" y="216" width="4" height="4" fill="#928374"/>
  <rect x="470" y="195" width="160" height="46" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="550" y="214" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1">RUNS IN BACKGROUND</text>
  <text x="550" y="229" text-anchor="middle" fill="#928374" font-size="9">routines keep it healthy</text>
</svg>`;

export default function BlogBuildingLastdbWithAgents() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Building LastDB with an autonomous agent loop - LastDB</title>
        <meta name="description" content="We let AI agents build LastDB toward goals we set — and merge their own pull requests — while we sleep. Here is the system that makes that safe: a North-Star-steered autonomous development loop." />
        <meta property="og:title" content="Building LastDB with an autonomous agent loop" />
        <meta property="og:description" content="The North Star model, the dev = no gate contract, and the scheduled-routine loop that builds LastDB autonomously." />
        <link rel="canonical" href="https://thelastdb.com/blog/building-lastdb-with-agents" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Building LastDB with an autonomous agent loop</h1>
      <p className="post-meta dim">2026-06-22</p>

      <p className="bold white">We let AI agents build LastDB toward goals we set &mdash; and merge their own pull requests &mdash; while we sleep. Here&rsquo;s the system that makes that safe instead of chaotic.</p>

      <p>Most &ldquo;AI coding&rdquo; demos show a human prompting an agent, watching it work, and steering every turn. That&rsquo;s autocomplete with extra steps. We wanted something different: <span className="bold">set a destination, walk away, and come back to merged, working code.</span> This is how the LastDB development loop actually works.</p>

      <p>And there&rsquo;s a twist we like: the loop is driven by two of our own apps &mdash; <span className="bold">Brain</span> (a personal knowledge base) and <span className="bold">Kanban</span> (a task board) &mdash; both open-source apps built <em>on LastDB</em>. We build LastDB using software that runs on LastDB.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Three kinds of pieces</h2>
      <p>The whole system is built from three kinds of things. Keeping them straight is the trick:</p>
      <ul>
        <li><span className="bold white">Data</span> &mdash; inert facts. <em>What</em> we&rsquo;re building and the <em>rules of engagement.</em> These live in Brain. They don&rsquo;t do anything on their own; something has to read them.</li>
        <li><span className="bold white">Harness</span> &mdash; a recipe. The enforced, written-down process an agent follows.</li>
        <li><span className="bold white">Routine</span> &mdash; a recipe plus an alarm clock. A harness that fires itself on a schedule.</li>
      </ul>
      <p>So a routine is just a harness with a timer, and data is what they all read.</p>

      <ArchFigure svg={LAYERS} caption="Fig. 1 — you set the brain; the loop reads it; only the gates return to you" />

      <Section variant="sage">
        <h2><span className="bold">The unit of work is a North Star</span></h2>
        <p>We don&rsquo;t hand agents tickets. We set <span className="bold">North Stars</span> &mdash; destinations with a checkable &ldquo;done.&rdquo; Each feature is its own North Star, and every North Star carries a <span className="bold">mode</span> that tells the agent what kind of work this is:</p>
        <ul>
          <li><span className="bold white">prototype</span> &mdash; no working version exists yet; build the rough end-to-end version.</li>
          <li><span className="bold white">harden</span> &mdash; a rough version exists; stress it, find the edge cases, stabilize it, and prove it by <em>running the app</em>, not just passing tests.</li>
          <li><span className="bold white">maintain</span> &mdash; shipped and stable; keep it healthy in the background.</li>
        </ul>
        <p>A North Star moves through those modes over its life. The agent reads the mode and picks its approach.</p>
      </Section>

      <ArchFigure svg={LIFECYCLE} caption="Fig. 2 — one North Star, three modes; prototype and harden ship, maintain runs on" />

      <h2>The contract: drive by default, stop at five gates</h2>
      <p>The reason most &ldquo;autonomous&rdquo; setups stall is that they ask permission constantly. Ours has one rule: <span className="bold">drive everything to done on the development track without asking.</span> Build, test, security-review, fix, and merge &mdash; all autonomous.</p>
      <p>The agents stop for exactly five things, the genuinely human decisions:</p>
      <ol>
        <li><span className="bold white">Production cutover</span> &mdash; flipping a feature on for real users.</li>
        <li><span className="bold white">Anything public or outward-facing</span> &mdash; like, well, publishing this blog post.</li>
        <li><span className="bold white">Money, legal, or business.</span></li>
        <li><span className="bold white">A genuinely novel direction</span> with no precedent.</li>
        <li><span className="bold white">Anything irreversible.</span></li>
      </ol>
      <p>Everything else is the agent&rsquo;s call. This single contract is what turns a pile of capable agents into a loop that actually finishes things.</p>

      <h2>The loop</h2>
      <p>A handful of small scheduled routines pass work down a line:</p>
      <ul>
        <li><span className="bold">program-driver</span> turns each North Star into the next concrete card.</li>
        <li><span className="bold">groom</span> promotes the ready cards.</li>
        <li><span className="bold">pickup</span> fans out a worker agent per card.</li>
        <li><span className="bold">the worker</span> builds the change, opens a pull request, and drives it through the merge queue to <em>merged</em> &mdash; a card isn&rsquo;t &ldquo;done&rdquo; until its code is actually in the repo.</li>
        <li><span className="bold">watch</span> reconciles the board: advancing what&rsquo;s stuck, and &mdash; critically &mdash; flagging anything it can&rsquo;t resolve.</li>
      </ul>
      <p>That last word matters more than it looks.</p>

      <Section variant="rose">
        <h2><span className="bold">A bug worth bragging about</span></h2>
        <p>Recently a card sat finished-but-unmoved on the board for five days. The reconciler had a stale assumption baked into its recipe &mdash; it skipped a whole class of cards on a belief that was no longer true &mdash; and, worse, it skipped them <em>silently</em>. Nobody was told.</p>
        <p>The fix wasn&rsquo;t just correcting the assumption. It was making a rule: <span className="bold">a piece of work is either moved forward or it&rsquo;s surfaced to a human &mdash; silence is now a bug.</span> A finished task can no longer quietly stall where no one sees it. We&rsquo;d rather the system interrupt you with &ldquo;I&rsquo;m stuck on this&rdquo; than let work rot invisibly.</p>
        <p>That&rsquo;s the real difference between a demo and a system you can walk away from: not that it never gets stuck, but that it can&rsquo;t get stuck <em>quietly</em>.</p>
      </Section>

      <h2>What this means</h2>
      <p>The humans set destinations and answer five kinds of questions. Everything else &mdash; the building, testing, reviewing, merging, and the honest &ldquo;I need you on this one&rdquo; &mdash; runs on its own. The same local-first, you-own-your-data philosophy behind LastDB is the philosophy behind how we build it: the tools work for you, in the open, without asking to phone home for permission.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
