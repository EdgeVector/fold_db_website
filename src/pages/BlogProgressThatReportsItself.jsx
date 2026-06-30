import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for "needs a human").
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

// 1 — three sources of truth roll up into one picture.
const ROLLUP = `${SVG_OPEN('0 0 660 246')}
  <rect x="36" y="28" width="160" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="116" y="54" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">NOTES</text>
  <text x="116" y="72" text-anchor="middle" fill="#928374" font-size="10">decisions, standing rules</text>

  <rect x="250" y="28" width="160" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="54" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BOARD</text>
  <text x="330" y="72" text-anchor="middle" fill="#928374" font-size="10">cards, one per feature</text>

  <rect x="464" y="28" width="160" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="544" y="54" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">GIT HISTORY</text>
  <text x="544" y="72" text-anchor="middle" fill="#928374" font-size="10">what actually landed</text>

  <line x1="116" y1="84" x2="116" y2="120" stroke="#928374" stroke-width="1"/>
  <line x1="330" y1="84" x2="330" y2="120" stroke="#928374" stroke-width="1"/>
  <line x1="544" y1="84" x2="544" y2="120" stroke="#928374" stroke-width="1"/>
  <line x1="116" y1="120" x2="544" y2="120" stroke="#928374" stroke-width="1"/>
  <line x1="330" y1="120" x2="330" y2="148" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="148" width="4" height="4" fill="#928374"/>

  <rect x="190" y="156" width="280" height="64" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="184" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">THE DASHBOARD</text>
  <text x="330" y="202" text-anchor="middle" fill="#928374" font-size="10">no one filled this in by hand</text>
</svg>`;

// 2 — a feature card carries its own completion state, no status meeting required.
const CARD = `${SVG_OPEN('0 0 660 220')}
  <rect x="150" y="30" width="360" height="150" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="174" y="62" fill="#ebdbb2" font-size="13" letter-spacing="1">PRIVATE CLOUD CHAT</text>
  <text x="174" y="80" fill="#928374" font-size="10">one-click AI setup</text>

  <rect x="174" y="98" width="312" height="10" fill="none" stroke="#504945" stroke-width="1"/>
  <rect x="174" y="98" width="260" height="10" fill="#83a598"/>
  <text x="174" y="126" fill="#928374" font-size="10" letter-spacing="0.5">5 OF 6 PIECES DONE</text>

  <rect x="174" y="142" width="118" height="20" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="233" y="156" text-anchor="middle" fill="#83a598" font-size="9" letter-spacing="1">WAITING ON YOU</text>

  <text x="40" y="44" fill="#928374" font-size="10" letter-spacing="1.5">EVERY CARD</text>
  <line x1="40" y1="52" x2="40" y2="160" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="40" y="172" fill="#928374" font-size="10">carries this on its own</text>
</svg>`;

// 3 — most state moves itself; a spend or public decision waits for a person.
const GATE = `${SVG_OPEN('0 0 660 240')}
  <rect x="36" y="92" width="120" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="96" y="114" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">A CARD</text>
  <text x="96" y="130" text-anchor="middle" fill="#928374" font-size="9">moves through the board</text>

  <line x1="156" y1="116" x2="220" y2="62" stroke="#928374" stroke-width="1"/>
  <line x1="156" y1="116" x2="220" y2="170" stroke="#83a598" stroke-width="1"/>

  <rect x="220" y="36" width="180" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="310" y="58" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">REVERSIBLE, LOCAL</text>
  <text x="310" y="76" text-anchor="middle" fill="#928374" font-size="9">ships on its own</text>

  <rect x="220" y="146" width="180" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="310" y="168" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">SPENDS MONEY, OR PUBLIC</text>
  <text x="310" y="186" text-anchor="middle" fill="#83a598" font-size="9">waits for a person</text>

  <line x1="400" y1="62" x2="540" y2="62" stroke="#928374" stroke-width="1"/>
  <polygon points="540,62 531,58 531,66" fill="#928374"/>
  <line x1="400" y1="172" x2="496" y2="172" stroke="#83a598" stroke-width="1" stroke-dasharray="2 3"/>
  <rect x="496" y="166" width="4" height="4" fill="#83a598"/>
  <text x="448" y="160" text-anchor="middle" fill="#83a598" font-size="9" letter-spacing="0.5">holds here</text>

  <rect x="540" y="36" width="84" height="52" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="582" y="66" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">DONE</text>
</svg>`;

export default function BlogProgressThatReportsItself() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Progress That Reports Itself - LastDB</title>
        <meta name="description" content="We don't write status updates. A durable notes store, a card per feature, and the actual git history combine into a dashboard that knows what's shipped, what's building, and the one decision that's still waiting on a person — without anyone filling in a form." />
        <meta property="og:title" content="Progress That Reports Itself" />
        <meta property="og:description" content="No one wrote the dashboard's numbers by hand. They come from notes, a card per feature, and the commits that actually landed — and the only line that needs a person is the one that spends money." />
        <link rel="canonical" href="https://thelastdb.com/blog/progress-that-reports-itself" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Progress That Reports Itself</h1>
      <p className="post-meta dim">2026-06-30</p>

      <p className="bold white">No one filled in a status report this week. We still know, to the feature, what shipped, what&rsquo;s mid-build, and what one decision is sitting in someone&rsquo;s queue. <span className="white">That picture comes from three things we&rsquo;d already be keeping anyway &mdash; not from a standup.</span></p>

      <p>The instinct in most teams is to bolt a fourth system onto the other three: a tracker for the tracker. We didn&rsquo;t build one. We pointed at what already existed &mdash; a durable notes store, a card per feature, and the commit history that doesn&rsquo;t lie &mdash; and rolled them up.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Three sources, none of them new</h2>
      <p>The notes store holds the slow-moving facts: how the repos fit together, what the standing rules are, what was decided and why. The board holds the fast-moving ones: one card per feature, broken into the pieces that make it up, each piece marked off as it lands. Git history holds the part neither of the other two can fake &mdash; what code actually shipped, in which repository, on which day.</p>

      <p>None of these exist <em>for</em> reporting. The notes store exists so context survives between sessions. The board exists so work has somewhere to live. The commit log exists because that&rsquo;s what version control is. The dashboard is just the three of them, read together.</p>

      <ArchFigure svg={ROLLUP} caption="Fig. 1 — notes, board, and git history roll up into one picture" />

      <figure style={{ margin: '34px 0', textAlign: 'center' }}>
        <img src="/dashboard-progress-snapshot.png" alt="A generated dashboard showing 17 feature areas tracked, 10 shipped and live, 4 actively building, and 1 waiting on a decision, plus a daily commit-activity chart broken out by app." style={{ width: '100%', maxWidth: '760px', border: '1px solid #3c3836', borderRadius: '6px' }} />
        <figcaption style={{ color: '#928374', fontSize: '11px', letterSpacing: '0.06em', marginTop: '10px', textTransform: 'uppercase' }}>
          Fig. 1a &mdash; an actual snapshot, generated from the rollup, not written by hand
        </figcaption>
      </figure>

      <Section variant="sage">
        <h2><span className="bold">A card already knows its own state</span></h2>
        <p>Because a feature&rsquo;s card is broken into the pieces that make it up, it doesn&rsquo;t need a person to estimate how done it is &mdash; it counts. &ldquo;5 of 6 pieces done&rdquo; isn&rsquo;t a guess written into a spreadsheet on a Friday; it&rsquo;s a tally of what&rsquo;s actually checked off, read at whatever moment someone asks.</p>
        <p>The same is true of the bars in the daily activity chart &mdash; they&rsquo;re not a velocity metric someone calculated. They&rsquo;re a count of commits, per repository, per day, because that&rsquo;s a fact the git history already has.</p>
      </Section>

      <ArchFigure svg={CARD} caption="Fig. 2 — every card carries its own completion state" />

      <h2>The one thing the rollup can&rsquo;t decide</h2>
      <p>Most of what moves a card forward is reversible and local &mdash; a piece lands, the count ticks up, the card advances. None of that needs a person in the loop. But a card occasionally reaches a decision with real consequences outside the repo &mdash; something that spends real money, or becomes visible to people who aren&rsquo;t us &mdash; and that one doesn&rsquo;t move on its own. It sits, clearly labeled, until someone makes the call.</p>

      <ArchFigure svg={GATE} caption="Fig. 3 — most state advances itself; spend and public decisions hold for a person" />

      <p>That&rsquo;s the whole point of rolling these three sources up automatically: not to remove the human from the loop, but to make sure the only thing waiting on a human <span className="bold">is</span> a human decision &mdash; not a status update someone forgot to write.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
