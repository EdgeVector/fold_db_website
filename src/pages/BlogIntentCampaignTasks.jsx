import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, joint marks, mono caps labels, one accent).
// Shape vocabulary (different shapes = different kinds of thing):
//   hexagon     = North Star / destination
//   rounded rect = active program / campaign
//   sharp rect  = Kanban card / unit of work
//   circle      = scheduled automation
//   oval        = human
//   hatched box = durable knowledge store
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

// Fig 1 — three layers, different shapes, stacked.
// Hexagon (destination) → rounded campaign → sharp cards
const LAYERS = `${SVG_OPEN('0 0 660 360')}
  <!-- legend strip -->
  <text x="36" y="28" fill="#928374" font-size="10" letter-spacing="1.5">SHAPE KEY</text>
  <polygon points="50,48 62,42 74,48 74,60 62,66 50,60" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="84" y="56" fill="#928374" font-size="10">HEX = DESTINATION</text>
  <rect x="220" y="44" width="36" height="20" rx="6" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="266" y="58" fill="#928374" font-size="10">ROUND = CAMPAIGN</text>
  <rect x="400" y="44" width="36" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="446" y="58" fill="#928374" font-size="10">RECT = TASK CARD</text>

  <!-- North Star: hexagon -->
  <polygon points="330,96 380,124 380,172 330,200 280,172 280,124" fill="none" stroke="#83a598" stroke-width="1.5"/>
  <text x="330" y="142" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">NORTH STAR</text>
  <text x="330" y="160" text-anchor="middle" fill="#83a598" font-size="10">what "won" looks like</text>
  <text x="400" y="150" fill="#928374" font-size="10">months</text>

  <line x1="330" y1="200" x2="330" y2="228" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="226" width="4" height="4" fill="#928374"/>

  <!-- Active program: rounded rect -->
  <rect x="190" y="234" width="280" height="52" rx="12" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="256" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ACTIVE PROGRAM</text>
  <text x="330" y="274" text-anchor="middle" fill="#928374" font-size="10">this campaign + next move</text>
  <text x="480" y="262" fill="#928374" font-size="10">days-weeks</text>

  <line x1="330" y1="286" x2="330" y2="304" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="302" width="4" height="4" fill="#928374"/>

  <!-- Kanban cards: three sharp rects -->
  <rect x="168" y="310" width="100" height="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="218" y="332" text-anchor="middle" fill="#ebdbb2" font-size="11">CARD</text>
  <rect x="280" y="310" width="100" height="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="332" text-anchor="middle" fill="#ebdbb2" font-size="11">CARD</text>
  <rect x="392" y="310" width="100" height="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="442" y="332" text-anchor="middle" fill="#ebdbb2" font-size="11">CARD</text>
  <text x="330" y="358" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">KANBAN - hours to days each</text>
</svg>`;

// Fig 2 — the loop: knowledge store (hatched) holds the index;
// circles = scheduled jobs; rects = cards; oval = human for rare gates.
const LOOP = `${SVG_OPEN('0 0 660 300')}
  <!-- durable store: hatched -->
  <rect x="40" y="40" width="160" height="80" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="120" y="72" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">KNOWLEDGE</text>
  <text x="120" y="92" text-anchor="middle" fill="#928374" font-size="10">destinations + campaigns</text>

  <!-- program-driver circle -->
  <circle cx="300" cy="80" r="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="300" y="76" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">PROMOTE</text>
  <text x="300" y="92" text-anchor="middle" fill="#928374" font-size="9">scheduled</text>

  <!-- pickup circle -->
  <circle cx="440" cy="80" r="36" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="440" y="76" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="1">SHIP</text>
  <text x="440" y="92" text-anchor="middle" fill="#928374" font-size="9">scheduled</text>

  <!-- arrows knowledge -> promote -> ship -->
  <line x1="200" y1="80" x2="258" y2="80" stroke="#928374" stroke-width="1"/>
  <polygon points="262,80 254,76 254,84" fill="#928374"/>
  <line x1="336" y1="80" x2="398" y2="80" stroke="#928374" stroke-width="1"/>
  <polygon points="402,80 394,76 394,84" fill="#928374"/>

  <!-- board: sharp card rects in a lane -->
  <rect x="40" y="160" width="400" height="100" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="56" y="180" fill="#928374" font-size="10" letter-spacing="1.5">BOARD</text>
  <rect x="56" y="196" width="88" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="100" y="220" text-anchor="middle" fill="#ebdbb2" font-size="10">TODO</text>
  <rect x="160" y="196" width="88" height="40" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="204" y="220" text-anchor="middle" fill="#ebdbb2" font-size="10">DOING</text>
  <rect x="264" y="196" width="88" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="308" y="220" text-anchor="middle" fill="#ebdbb2" font-size="10">DONE</text>
  <text x="56" y="250" fill="#928374" font-size="10">sharp boxes = cards (only these get shipped)</text>

  <!-- ship drops into doing -->
  <line x1="440" y1="116" x2="204" y2="190" stroke="#83a598" stroke-width="1"/>
  <polygon points="204,194 200,186 210,188" fill="#83a598"/>

  <!-- human oval: rare gates -->
  <ellipse cx="560" cy="200" rx="52" ry="36" fill="none" stroke="#83a598" stroke-width="1.5"/>
  <text x="560" y="196" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">YOU</text>
  <text x="560" y="214" text-anchor="middle" fill="#83a598" font-size="9">rare gates</text>
  <line x1="352" y1="216" x2="504" y2="200" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="430" y="188" fill="#928374" font-size="9">stuck / cutover</text>
</svg>`;

// Fig 3 — what you touch when (simple map)
const TOUCH = `${SVG_OPEN('0 0 660 240')}
  <text x="36" y="32" fill="#928374" font-size="10" letter-spacing="1.5">WHEN YOU WANT TO...</text>

  <!-- row 1: destination = hex -->
  <polygon points="70,70 90,58 110,70 110,90 90,102 70,90" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="130" y="78" fill="#ebdbb2" font-size="12">set a product outcome</text>
  <text x="130" y="96" fill="#928374" font-size="11">-&gt; North Star (destination)</text>

  <!-- row 2: campaign = rounded -->
  <rect x="56" y="120" width="48" height="28" rx="8" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="130" y="132" fill="#ebdbb2" font-size="12">start or pause a multi-week effort</text>
  <text x="130" y="150" fill="#928374" font-size="11">-&gt; active program (campaign + next move)</text>

  <!-- row 3: card = rect -->
  <rect x="56" y="170" width="48" height="28" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="130" y="182" fill="#ebdbb2" font-size="12">ship something this week</text>
  <text x="130" y="200" fill="#928374" font-size="11">-&gt; Kanban card (one mergeable unit)</text>

  <!-- row 4: walk away -->
  <circle cx="80" cy="224" r="12" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="130" y="228" fill="#ebdbb2" font-size="12">walk away</text>
  <text x="320" y="228" fill="#928374" font-size="11">-&gt; scheduled promote + ship; digest for status</text>
</svg>`;

export default function BlogIntentCampaignTasks() {
  return (
    <div className="blog-post">
      <Helmet>
        <title>Destination, Campaign, Task - LastDB</title>
        <meta
          name="description"
          content="How we organize agent-driven work in three layers: North Stars for destinations, active programs for campaigns, and Kanban for tasks — without making chat the state machine."
        />
        <meta property="og:title" content="Destination, Campaign, Task - LastDB" />
        <meta
          property="og:description"
          content="How we organize agent-driven work in three layers: North Stars for destinations, active programs for campaigns, and Kanban for tasks — without making chat the state machine."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/intent-campaign-tasks" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">Destination, Campaign, Task</h1>
      <p className="post-meta dim">2026-07-17</p>

      <p className="bold white">
        We run a lot of work with coding agents. The hard part is not writing
        the first prompt. It is keeping a multi-week effort moving when every
        session starts cold, the board is noisy, and you do not want to babysit.
      </p>

      <p>
        We ended up with three layers that answer three different questions.
        They look redundant until you try to delete one of them.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">One sentence each</span>
        </h2>
        <ul>
          <li>
            <span className="bold white">North Star</span> &mdash; what
            &ldquo;won&rdquo; looks like (destination).
          </li>
          <li>
            <span className="bold white">Active program</span> &mdash; which
            multi-week campaign is in flight, and what the next move is.
          </li>
          <li>
            <span className="bold white">Kanban card</span> &mdash; one
            shippable unit of work (usually one pull request).
          </li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          Chat is not a layer. Sessions die. Durable intent lives in the
          knowledge base and on the board.
        </p>
      </Section>

      <ArchFigure
        svg={LAYERS}
        caption="Fig. 1 — three layers, three shapes: hex destination, round campaign, rect cards"
      />

      <h2>Why not just a board?</h2>
      <p>
        A Kanban board is good at{' '}
        <span className="bold white">tasks</span>. It is bad at{' '}
        <span className="bold white">strategy under noise</span>. When dozens of
        cards sit in backlog &mdash; papercuts, regressions, half-finished
        experiments &mdash; nothing tells an automated worker which card advances
        the product goal you care about this week.
      </p>
      <p>
        A destination alone is not enough either. &ldquo;Leave the old storage
        engine for a document store&rdquo; can stay true for months while the
        <em> next</em> concrete step changes every few days. You need something
        between vision and tickets.
      </p>
      <p>
        That middle layer is the <span className="bold white">active program</span>:
        a short index entry that names the campaign, lists the live cards that
        belong to it, and states the next move in plain language. Scheduled
        jobs read that index. They do not invent work from a slogan.
      </p>

      <h2>What each layer is for (and not for)</h2>
      <p>
        <span className="bold white">North Stars</span> hold product intent and
        a completion bar when the goal is finite (or a long-running check when
        the goal is an invariant). They are not a task list. An agent should not
        open a PR because a North Star exists; it should open a PR because a
        card is ready and that card sits on a campaign that points at the star.
      </p>
      <p>
        <span className="bold white">Active programs</span> are the living
        campaign plan. They answer: if a worker wakes up cold this hour, what
        should it advance? Prose here should stay short. When the board and the
        index disagree, the board columns win, and the index gets corrected.
      </p>
      <p>
        <span className="bold white">Kanban</span> is execution: repository,
        steps, verify commands, merge. Dependencies between cards are the real
        DAG. We do not put campaign umbrellas on the board as fake &ldquo;epic
        cards&rdquo; that never ship. If it cannot merge, it is not a pickup
        unit.
      </p>

      <h2>How work actually moves</h2>
      <p>
        Two kinds of scheduled automation sit on top of this. One reads the
        active-program index and makes sure each campaign has its next
        unblocked card in the ready column (and files the next slice when the
        next move is clear but the card does not exist yet). Another claims
        ready cards and drives them through implementation and merge.
      </p>
      <p>
        You show up for rare gates: irreversible cutovers, secrets only a
        human can place, or a genuine stuck state. Everything else should either
        progress or leave a clear blocker, not silent drift.
      </p>

      <ArchFigure
        svg={LOOP}
        caption="Fig. 2 — hatched knowledge store, circle jobs, rect cards, oval human for rare gates"
      />

      <h2>Is three layers too many?</h2>
      <p>
        For one person pairing with one agent on a weekend project, yes. A
        checklist in a note is enough.
      </p>
      <p>
        For a fleet of agents that restart often, share a real product board, and
        must not thrash production data, the extra layer pays for itself. The
        failure modes without it are familiar: lots of merged PRs with no product
        outcome, or a beautiful plan that never turns into cards.
      </p>
      <p>
        The system gets unnecessarily heavy when you treat all three layers as
        task lists, pre-file every future phase forever, or keep a second
        &ldquo;program&rdquo; object on the board that duplicates the index.
        Discipline is not inventing a fourth layer. It is keeping each layer
        thin.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">What we touch when</span>
        </h2>
        <p style={{ marginBottom: 0 }}>
          Set an outcome &rarr; North Star. Start or pause a multi-week effort
          &rarr; active program. Ship this week &rarr; Kanban card. Walk away
          &rarr; scheduled promote and ship; a daily digest for status. Get
          pinged &rarr; almost only cutovers, secrets, or true stuck work.
        </p>
      </Section>

      <ArchFigure
        svg={TOUCH}
        caption="Fig. 3 — same shapes as the key: hex for outcome, round for campaign, rect for task, circle for automation"
      />

      <h2>A working example (no code)</h2>
      <p>
        Suppose the destination is: the product data plane runs on a document
        store, not the old embedded engine. That is a North Star. The campaign
        in flight might be: finish inventory and offline baseline, then land a
        feature-flagged adapter with the old engine still default. Those steps
        are cards. Primary cutover stays a human gate. Agents can grind the
        cards for days without you re-explaining the mountain every morning.
      </p>
      <p>
        When phase one exits, you update the campaign&rsquo;s next move and file
        the next few cards. You do not need the entire roadmap materialized on
        day one. You need an honest frontier.
      </p>

      <h2>What this is not</h2>
      <p>
        This is process, not a product pitch for a specific toolchain. The
        useful idea is the separation of concerns: destination, campaign, task
        &mdash; with automation that promotes and ships, and humans reserved for
        decisions that should stay human.
      </p>
      <p>
        If your stack already has goals, a roadmap doc, and tickets, you may
        already have the same three layers under different names. The common
        failure is letting chat or a single overloaded board pretend to be all
        three at once.
      </p>

      <p className="dim">
        Related reading on this site:{' '}
        <Link to="/blog/building-lastdb-with-agents">Building LastDB with agents</Link>
        ,{' '}
        <Link to="/blog/kanban-factory">The factory floor</Link>
        , and{' '}
        <Link to="/blog/progress-that-reports-itself">Progress that reports itself</Link>.
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </div>
  );
}
