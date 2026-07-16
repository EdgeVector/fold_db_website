import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, joint marks, mono caps labels, one accent).
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
const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// 1 — board + heartbeats feed a theater that only animates diffs.
const PIPELINE = `${SVG_OPEN('0 0 660 250')}
  <rect x="24" y="36" width="130" height="72" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="89" y="68" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BACKLOG</text>
  <text x="89" y="88" text-anchor="middle" fill="#928374" font-size="10">waiting</text>

  <line x1="154" y1="72" x2="178" y2="72" stroke="#928374" stroke-width="1"/>
  <polygon points="178,72 169,68 169,76" fill="#928374"/>

  <rect x="182" y="36" width="130" height="72" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="247" y="68" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">TODO</text>
  <text x="247" y="88" text-anchor="middle" fill="#928374" font-size="10">ready</text>

  <line x1="312" y1="72" x2="336" y2="72" stroke="#83a598" stroke-width="1"/>
  <polygon points="336,72 327,68 327,76" fill="#83a598"/>

  <rect x="340" y="36" width="130" height="72" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="405" y="68" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">DOING</text>
  <text x="405" y="88" text-anchor="middle" fill="#83a598" font-size="10">in flight</text>

  <line x1="470" y1="72" x2="494" y2="72" stroke="#928374" stroke-width="1"/>
  <polygon points="494,72 485,68 485,76" fill="#928374"/>

  <rect x="498" y="36" width="138" height="72" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="567" y="68" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">DONE</text>
  <text x="567" y="88" text-anchor="middle" fill="#928374" font-size="10">shipped</text>

  <rect x="120" y="150" width="180" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="210" y="174" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE BOARD</text>
  <text x="210" y="192" text-anchor="middle" fill="#928374" font-size="10">live cards</text>

  <rect x="360" y="150" width="180" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="450" y="174" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">JOB HEARTBEATS</text>
  <text x="450" y="192" text-anchor="middle" fill="#928374" font-size="10">who fired, what happened</text>

  <line x1="210" y1="150" x2="210" y2="120" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="450" y1="150" x2="450" y2="120" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="210" y1="120" x2="450" y2="120" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="330" y1="120" x2="330" y2="108" stroke="#928374" stroke-width="1"/>
  <text x="330" y="230" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">THE THEATER ONLY MOVES WHEN THESE CHANGE</text>
</svg>`;

// 2 — snapshot → diff → hop (not a fake simulation).
const DIFF = `${SVG_OPEN('0 0 660 236')}
  <rect x="40" y="40" width="150" height="64" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="115" y="68" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SNAPSHOT t0</text>
  <text x="115" y="88" text-anchor="middle" fill="#928374" font-size="10">card X in TODO</text>

  <rect x="255" y="40" width="150" height="64" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="68" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SNAPSHOT t1</text>
  <text x="330" y="88" text-anchor="middle" fill="#928374" font-size="10">card X in DOING</text>

  <line x1="190" y1="72" x2="250" y2="72" stroke="#928374" stroke-width="1"/>
  <polygon points="250,72 241,68 241,76" fill="#928374"/>
  <text x="220" y="60" text-anchor="middle" fill="#928374" font-size="10">poll</text>

  <rect x="470" y="40" width="150" height="64" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="545" y="68" text-anchor="middle" fill="#83a598" font-size="12" letter-spacing="1.5">DIFF</text>
  <text x="545" y="88" text-anchor="middle" fill="#928374" font-size="10">TODO &rarr; DOING</text>

  <line x1="405" y1="72" x2="465" y2="72" stroke="#83a598" stroke-width="1"/>
  <polygon points="465,72 456,68 456,76" fill="#83a598"/>

  <line x1="545" y1="104" x2="545" y2="148" stroke="#83a598" stroke-width="1"/>
  <rect x="543" y="148" width="4" height="4" fill="#83a598"/>

  <rect x="180" y="156" width="300" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="180" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">HOP + BLIP + SPEECH</text>
  <text x="330" y="196" text-anchor="middle" fill="#928374" font-size="10">animation is the delta, not a loop of noise</text>
</svg>`;

// 3 — scheduled jobs as a crew with roles, not faceless cron.
const CREW = `${SVG_OPEN('0 0 660 220')}
  <rect x="36" y="48" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="91" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PICKUP</text>
  <text x="91" y="96" text-anchor="middle" fill="#928374" font-size="9">grabs ready work</text>

  <rect x="162" y="48" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="217" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">GROOM</text>
  <text x="217" y="96" text-anchor="middle" fill="#928374" font-size="9">unblocks queue</text>

  <rect x="288" y="48" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="343" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PIPELINE</text>
  <text x="343" y="96" text-anchor="middle" fill="#928374" font-size="9">keeps merges clear</text>

  <rect x="414" y="48" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="469" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">WATCH</text>
  <text x="469" y="96" text-anchor="middle" fill="#928374" font-size="9">reconciles stuck</text>

  <rect x="540" y="48" width="90" height="70" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="585" y="78" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1">YOU</text>
  <text x="585" y="96" text-anchor="middle" fill="#83a598" font-size="9">decisions</text>

  <line x1="91" y1="118" x2="91" y2="150" stroke="#504945" stroke-width="1"/>
  <line x1="217" y1="118" x2="217" y2="150" stroke="#504945" stroke-width="1"/>
  <line x1="343" y1="118" x2="343" y2="150" stroke="#504945" stroke-width="1"/>
  <line x1="469" y1="118" x2="469" y2="150" stroke="#504945" stroke-width="1"/>
  <line x1="91" y1="150" x2="469" y2="150" stroke="#504945" stroke-width="1"/>
  <line x1="280" y1="150" x2="280" y2="170" stroke="#928374" stroke-width="1"/>
  <rect x="160" y="170" width="240" height="32" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="280" y="190" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1.5">SAME BOARD</text>
</svg>`;

export default function BlogKanbanFactory() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Factory Floor - LastDB</title>
        <meta
          name="description"
          content="We built a live theater for our real Kanban board: cards hop lanes when work actually moves, scheduled jobs show up as a crew with personalities, and the only animation that fires is a real delta."
        />
        <meta property="og:title" content="The Factory Floor" />
        <meta
          property="og:description"
          content="A dashboard that is entertaining on purpose — because the board is real, and watching work move is how you feel the autonomous loop."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/kanban-factory" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">The Factory Floor</h1>
      <p className="post-meta dim">2026-07-16</p>

      <p className="bold white">
        Status dashboards are usually correct and dead. We wanted something
        correct and <em>alive</em> &mdash; a live theater of our real board, where
        cards hop when work actually moves, and the automated jobs that run our
        day show up as a crew with jobs of their own.
      </p>

      <p>
        We call it the Kanban Factory. It is not a mock pipeline with fake
        tickets. It is a local page that reads the same board we already use to
        ship LastDB, and turns every real column change into a little hop, a soft
        blip, and a speech bubble from whoever grabbed the work.
      </p>

      <figure style={{ margin: '34px 0', textAlign: 'center' }}>
        <video
          src="/kanban-factory-demo.mp4"
          controls
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            maxWidth: '760px',
            border: '1px solid #3c3836',
            borderRadius: '6px',
            background: '#1d2021',
            display: 'block',
            margin: '0 auto',
          }}
        >
          Your browser does not support embedded video.
        </video>
        <figcaption
          style={{
            color: '#928374',
            fontSize: '11px',
            letterSpacing: '0.06em',
            marginTop: '10px',
            textTransform: 'uppercase',
          }}
        >
          Fig. 0 &mdash; about thirty seconds on the live floor (screen recording,
          compressed for the web)
        </figcaption>
      </figure>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Why a factory, not another table</h2>
      <p>
        We already had tables. Brain (our durable notes app on LastDB) and Kanban
        (the board app on the same node) already answer &ldquo;what is open&rdquo;
        and &ldquo;who is supposed to care.&rdquo; What they do not do is make the
        autonomous loop <span className="bold white">feel</span> like a loop.
      </p>
      <p>
        When a scheduled job claims a card, opens a change request, and lands it,
        the board moves. If you only look every few hours, the motion disappears
        into a pile of timestamps. The Factory is the opposite instinct: leave a
        window open, and let the room react when something true happens.
      </p>

      <ArchFigure
        svg={PIPELINE}
        caption="Fig. 1 — four lanes, two feeds; the stage only moves when reality changes"
      />

      <Section variant="sage">
        <h2>
          <span className="bold">The rule: no fake motion</span>
        </h2>
        <p>
          Idle workers may bob. Conveyor belts may shimmer. That is atmosphere.
          Cards do not parade for entertainment. A hop means a real column
          change on the live board. A victory arpeggio means something actually
          landed in Done. If the floor is quiet, the work is quiet &mdash; or the
          queue is empty, which is its own kind of status.
        </p>
      </Section>

      <h2>How the machine sees the board</h2>
      <p>
        Under the hood it is almost embarrassingly simple. A tiny local server
        polls two read-only sources every few seconds: the current set of board
        cards, and a heartbeat log of scheduled jobs. It normalizes that into
        JSON and serves a single-page theater.
      </p>
      <p>
        The browser keeps the previous snapshot. On each poll it diffs. New card,
        removed card, column change, blocked &rarr; unblocked &mdash; those are
        the events that earn animation, sound, and a line in the factory log.
      </p>

      <ArchFigure
        svg={DIFF}
        caption="Fig. 2 — animation is a delta between two true snapshots, not a simulation"
      />

      <p>
        That design choice matters more than the neon. It means you cannot
        &ldquo;demo&rdquo; the Factory into looking busy without doing real work
        on the board. The satisfying part is honest.
      </p>

      <h2>Jobs as people (without pretending they are people)</h2>
      <p>
        We run a fleet of scheduled automated jobs against the same board &mdash;
        the same loop we wrote about in{' '}
        <Link to="/blog/building-lastdb-with-agents">Building LastDB with Agents</Link>.
        In the Factory, each job is a character on the floor: not a human avatar,
        a personality sticker with a role.
      </p>
      <p>
        Pickup is hungry. It scoops ready work into Doing. Groom tidies and
        promotes unblocked backlog. Pipeline is the anxious nurse for merges and
        deploys. Watch reconciles stuck change requests without grabbing new
        work. When a job fires, its tile lights up; when it is idle, it mutters.
        Hover and you get the last heartbeat in plain language.
      </p>

      <ArchFigure
        svg={CREW}
        caption="Fig. 3 — scheduled jobs as a crew; the human still owns the irreversible calls"
      />

      <p>
        The &ldquo;Active Hands&rdquo; strip goes one step further: when a worker
        instance is actually holding a card (because the board&rsquo;s assignee
        field says so), you see which hand has which ticket. Click the hand, the
        card in the pipeline flashes. It is a silly interaction that answers a
        serious question: <span className="bold white">who has the work right
        now?</span>
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">What we did not build</span>
        </h2>
        <p>
          This is not a multiplayer ops console. It is not a product surface we
          are shipping as a cloud service. It is a local, read-only theater on
          top of tools we already trust. It does not move cards. It does not
          claim work. It does not paper over a quiet board with fake activity so
          the room looks productive on a screen recording.
        </p>
      </Section>

      <h2>Why it belongs next to the database story</h2>
      <p>
        LastDB&rsquo;s bet is local-first software you can feel &mdash; data that
        lives with you, apps that compose on top, agents that can work without
        waiting for a dashboard someone updates by hand. The Factory is a joke
        with a thesis: if your system of record is honest, the interface can
        afford to be playful. The play is grounded in truth.
      </p>
      <p>
        Also: if you are going to run autonomous work overnight, you deserve a
        way to walk into the office (or the living room) and <em>see</em> that
        the night shift was real.
      </p>

      <p className="dim">
        Related: <Link to="/blog/progress-that-reports-itself">Progress That
        Reports Itself</Link>
        {' · '}
        <Link to="/blog/building-lastdb-with-agents">Building LastDB with Agents</Link>
        {' · '}
        <Link to="/apps">Brain and Kanban on LastDB</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
