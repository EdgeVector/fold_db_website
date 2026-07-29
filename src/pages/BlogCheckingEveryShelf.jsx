import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// one accent for the repair).
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
    <pattern id="cells" width="20" height="28" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="28" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// Fig 1 — one cheap read that walks the whole warehouse.
const WAREHOUSE = `${SVG_OPEN('0 0 660 300')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">ONE CARD SHOW</text>

  <circle cx="72" cy="88" r="28" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="72" y="92" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">APP</text>
  <text x="72" y="132" text-anchor="middle" fill="#928374" font-size="10">wants one row</text>

  <line x1="100" y1="88" x2="168" y2="88" stroke="#928374" stroke-width="1"/>
  <polygon points="170,88 161,84 161,92" fill="#928374"/>
  <rect x="166" y="86" width="4" height="4" fill="#928374"/>

  <rect x="174" y="48" width="450" height="180" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="399" y="72" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LASTDB · HASH GROUPS</text>
  <text x="399" y="90" text-anchor="middle" fill="#928374" font-size="10">~1024 buckets · fanout 16 when keyed well</text>

  <!-- grid of buckets: most faint, all visited = thrash -->
  <g stroke="#504945" stroke-width="1" fill="none">
    <rect x="198" y="110" width="36" height="28"/>
    <rect x="242" y="110" width="36" height="28"/>
    <rect x="286" y="110" width="36" height="28"/>
    <rect x="330" y="110" width="36" height="28"/>
    <rect x="374" y="110" width="36" height="28"/>
    <rect x="418" y="110" width="36" height="28"/>
    <rect x="462" y="110" width="36" height="28"/>
    <rect x="506" y="110" width="36" height="28"/>
    <rect x="550" y="110" width="36" height="28"/>
    <rect x="198" y="148" width="36" height="28"/>
    <rect x="242" y="148" width="36" height="28"/>
    <rect x="286" y="148" width="36" height="28"/>
    <rect x="330" y="148" width="36" height="28"/>
    <rect x="374" y="148" width="36" height="28"/>
    <rect x="418" y="148" width="36" height="28"/>
    <rect x="462" y="148" width="36" height="28"/>
    <rect x="506" y="148" width="36" height="28"/>
    <rect x="550" y="148" width="36" height="28"/>
  </g>
  <!-- highlight every cell with dashed accent walk -->
  <g stroke="#83a598" stroke-width="1" fill="none" stroke-dasharray="2 2">
    <rect x="198" y="110" width="36" height="28"/>
    <rect x="242" y="110" width="36" height="28"/>
    <rect x="286" y="110" width="36" height="28"/>
    <rect x="330" y="110" width="36" height="28"/>
    <rect x="374" y="110" width="36" height="28"/>
    <rect x="418" y="110" width="36" height="28"/>
    <rect x="462" y="110" width="36" height="28"/>
    <rect x="506" y="110" width="36" height="28"/>
    <rect x="550" y="110" width="36" height="28"/>
    <rect x="198" y="148" width="36" height="28"/>
    <rect x="242" y="148" width="36" height="28"/>
    <rect x="286" y="148" width="36" height="28"/>
    <rect x="330" y="148" width="36" height="28"/>
    <rect x="374" y="148" width="36" height="28"/>
    <rect x="418" y="148" width="36" height="28"/>
    <rect x="462" y="148" width="36" height="28"/>
    <rect x="506" y="148" width="36" height="28"/>
    <rect x="550" y="148" width="36" height="28"/>
  </g>
  <text x="399" y="204" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="0.5">EVERY BUCKET VISITED</text>

  <line x1="174" y1="248" x2="174" y2="262" stroke="#928374" stroke-width="1"/>
  <line x1="624" y1="248" x2="624" y2="262" stroke="#928374" stroke-width="1"/>
  <line x1="174" y1="255" x2="624" y2="255" stroke="#928374" stroke-width="1"/>
  <text x="399" y="282" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">PREFIX HAS NO SHELF LABEL → FULL COLLECTION SWEEP</text>
</svg>`;

// Fig 2 — shelf label: prune to a neighborhood; index points at records.
const SHELF = `${SVG_OPEN('0 0 660 280')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">SAME CARD · AFTER</text>

  <circle cx="72" cy="88" r="28" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="72" y="92" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">APP</text>
  <text x="72" y="132" text-anchor="middle" fill="#928374" font-size="10">wants one row</text>

  <line x1="100" y1="88" x2="168" y2="88" stroke="#83a598" stroke-width="1"/>
  <polygon points="170,88 161,84 161,92" fill="#83a598"/>
  <rect x="166" y="86" width="4" height="4" fill="#83a598"/>

  <rect x="174" y="48" width="450" height="160" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="399" y="72" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LASTDB · HASH GROUPS</text>

  <g stroke="#504945" stroke-width="1" fill="none">
    <rect x="198" y="100" width="36" height="28"/>
    <rect x="242" y="100" width="36" height="28"/>
    <rect x="286" y="100" width="36" height="28"/>
    <rect x="330" y="100" width="36" height="28"/>
    <rect x="374" y="100" width="36" height="28"/>
    <rect x="418" y="100" width="36" height="28"/>
    <rect x="462" y="100" width="36" height="28"/>
    <rect x="506" y="100" width="36" height="28"/>
    <rect x="550" y="100" width="36" height="28"/>
  </g>
  <!-- only a neighborhood lit -->
  <g stroke="#83a598" stroke-width="1" fill="url(#poche)">
    <rect x="374" y="100" width="36" height="28"/>
    <rect x="418" y="100" width="36" height="28"/>
  </g>
  <text x="414" y="154" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">~FANOUT GROUPS</text>

  <rect x="300" y="170" width="200" height="28" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="400" y="189" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">INDEX / POINT KEYS</text>

  <line x1="374" y1="228" x2="374" y2="242" stroke="#83a598" stroke-width="1"/>
  <line x1="454" y1="228" x2="454" y2="242" stroke="#83a598" stroke-width="1"/>
  <line x1="374" y1="235" x2="454" y2="235" stroke="#83a598" stroke-width="1"/>
  <text x="414" y="264" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">SHELF LABEL PRESENT → PRUNE</text>
</svg>`;

// Fig 3 — before/after wall clock strip.
const NUMBERS = `${SVG_OPEN('0 0 660 220')}
  <text x="36" y="32" fill="#928374" font-size="11" letter-spacing="1.5">MEASURED · REAL NODE</text>

  <text x="36" y="72" fill="#928374" font-size="11">BOARD LIST (SCAN-SHAPED)</text>
  <line x1="36" y1="88" x2="600" y2="88" stroke="#504945" stroke-width="1"/>
  <line x1="36" y1="84" x2="36" y2="92" stroke="#928374" stroke-width="1"/>
  <line x1="600" y1="84" x2="600" y2="92" stroke="#928374" stroke-width="1"/>
  <line x1="36" y1="88" x2="560" y2="88" stroke="#928374" stroke-width="1"/>
  <text x="300" y="78" fill="#928374" font-size="10">BEFORE ~11s</text>
  <line x1="36" y1="108" x2="90" y2="108" stroke="#83a598" stroke-width="2"/>
  <text x="100" y="112" fill="#83a598" font-size="10">AFTER ~1.1s</text>

  <text x="36" y="150" fill="#928374" font-size="11">RICH CARD READ (SAME KEY)</text>
  <line x1="36" y1="166" x2="420" y2="166" stroke="#928374" stroke-width="1"/>
  <text x="230" y="156" fill="#928374" font-size="10">BEFORE ~8s · EVERY CALL</text>
  <line x1="36" y1="186" x2="48" y2="186" stroke="#83a598" stroke-width="2"/>
  <text x="58" y="190" fill="#83a598" font-size="10">AFTER ~0.03–0.1s WARM</text>

  <text x="330" y="214" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">NOT A CACHE MIRACLE · THE WALK SHRANK</text>
</svg>`;

export default function BlogCheckingEveryShelf() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Checking Every Shelf - LastDB</title>
        <meta
          name="description"
          content="Our own board and knowledge apps got slow. The first theory was semantic search. The real bug was cheaper and meaner: hot reads walked every hash group in the collection because their keys had no shelf label. What we measured, what we fixed, and the before/after."
        />
        <meta property="og:title" content="Checking Every Shelf" />
        <meta
          property="og:description"
          content="A full-collection walk disguised as a normal read. Board list ~11s → ~1s. Card show ~8s → tens of milliseconds. The layout was already right; the key shapes never qualified for pruning."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/checking-every-shelf" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">Checking Every Shelf</h1>
      <p className="post-meta dim">2026-07-29</p>

      <p className="bold white">
        Our own board app and knowledge notes &mdash; the apps we dogfood on LastDB every day &mdash;
        got slow. Listing a column could take many seconds. Opening one card could take longer than a
        coffee pour. The first guess was fashionable: maybe vector search left the database, and now
        every lookup was doing something expensive and semantic. That guess was wrong. The bug was
        simpler, meaner, and already sitting in the layout we thought we had fixed.
      </p>

      <p>
        This is a write-up of what the telemetry said, what one instrumented read proved, what we
        shipped, and the numbers after it landed on a real primary node. It is a process story about
        access patterns &mdash; not a dump of internal key formats or how to reimplement the engine.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What status looked like</h2>

      <p>
        LastDB can report request ops: who called, which kind of work (query vs mutation vs search),
        how long it took, and a rough cost signal for cold storage work. On a busy window the board
        app&rsquo;s <span className="bold white">query</span> path sat around{' '}
        <span className="bold white">four seconds average</span>, with a p95 near{' '}
        <span className="bold white">ten seconds</span> and a max past a minute. Knowledge reads were
        better on average but still multi-second at the tail. Cold shard loads per call on the main
        card shape were on the order of a{' '}
        <span className="bold white">thousand-plus</span> &mdash; which, on a 1,024-group layout, is
        not a keyed read. It is a tour of the building.
      </p>

      <p>
        Semantic search showed up in the tables as its own verb when we used it. It was not the top
        offender. Ordinary list and show were.
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">If the average is seconds and loads-per-call ≈ group count, you are sweeping</span>
        </h2>
        <p>
          Warm caches can mask this until thrash fills the budget. Then every call evicts the last
          call&rsquo;s groups, and the tour becomes the steady state. Relayout alone does not help a
          walk that never qualifies for pruning.
        </p>
      </Section>

      <h2>What one cheap read actually did</h2>

      <p>
        We boot a throwaway node on a copy of real data (never the live home as the first place a
        candidate fails). We turn on a gated sweep tracer that only prints when a prefix walk falls
        back to &ldquo;visit every group.&rdquo; Then we ask for the cheapest possible board
        operation that still returns one card.
      </p>

      <p>
        The tracer did not whisper. It shouted: hundreds of full-collection sweeps for a single
        show, across several collections the logical store still has to consider. The fallback
        reason was always the same idea: the key shape carrying the walk had{' '}
        <span className="bold white">no partition separator</span>. Under a partition-prefix layout,
        pruning only kicks in when the prefix already names a shelf. Otherwise the engine is
        correct to check every bucket &mdash; and slow for the same reason.
      </p>

      <ArchFigure
        svg={WAREHOUSE}
        caption="Fig. 1 — One app asks for one row. Without a shelf label on the scan prefix, the store visits the whole hash-group grid."
      />

      <p>
        Three hot shapes kept showing up. Molecule-wide record walks. Append-log rebuilds that
        scanned an order prefix even when the count said zero. And a &ldquo;does this field have
        unresolved conflicts?&rdquo; annotation that prefix-scanned on every result field. The third
        one is easy to miss: it is metadata, not the user&rsquo;s row, and it still paid warehouse
        rent.
      </p>

      <h2>What we changed</h2>

      <p>
        We did not invent a new storage engine. We stopped asking unprunable questions on the hot
        path.
      </p>

      <ol>
        <li>
          <span className="bold white">Paged one-dimensional reads</span> &mdash; where records
          already share a partition, scan the anchored prefix. Where they do not (hash-only
          cards), serve pages from a partition-pinned derived index and point-read authoritative
          rows for that page only.
        </li>
        <li>
          <span className="bold white">Order logs</span> &mdash; if a count key already knows how
          many entries exist, address them by sequence. Do not prefix-scan an empty log just to
          learn it is empty.
        </li>
        <li>
          <span className="bold white">Conflict flags on query results</span> &mdash; keep a small
          per-molecule list of unresolved conflict ids. Empty means skip. Non-empty means
          point-get those ids. A first-touch scan can self-heal the list so the second call is
          cheap.
        </li>
        <li>
          <span className="bold white">Rebuild discipline</span> &mdash; a page-index rebuild is a
          pure function of the molecule&rsquo;s keys. Rebuilding at an unchanged header is waste;
          repairing a stale window gets a budget of one per header so one bad marker cannot turn
          every read into another full walk forever.
        </li>
      </ol>

      <ArchFigure
        svg={SHELF}
        caption="Fig. 2 — Same ask, with a partition-anchored path or index: only a small neighborhood of groups, then point-get the rows you need."
      />

      <h2>Before and after</h2>

      <p>
        Numbers from three places, same day: live request ops before the fix, CoW microbenches
        against a real-data copy, and the safe-upgrade latency bar (candidate binary vs then-live
        binary on identical copies). After cutover, live ops again.
      </p>

      <ArchFigure
        svg={NUMBERS}
        caption="Fig. 3 — Wall-clock shrinkage on the paths we timed. The walk got shorter; we did not invent a new database."
      />

      <p>
        Rough table, honest about what each row measures:
      </p>

      <ul>
        <li>
          <span className="bold white">Board-shaped list (scan path)</span> &mdash; safe-upgrade
          bar: about <span className="bold white">11s → 1.1s</span>. Live list after cutover: under
          a second when warm.
        </li>
        <li>
          <span className="bold white">Board query average / p95</span> &mdash; live thrash window:
          about <span className="bold white">4s / 10s</span>. Live after:{' '}
          <span className="bold white">tens of milliseconds / sub-second p95</span>.
        </li>
        <li>
          <span className="bold white">Knowledge query average / p95</span> &mdash; from about a
          second and multi-second tails to <span className="bold white">~16ms / ~19ms</span> on a
          busy healthy window after cutover.
        </li>
        <li>
          <span className="bold white">Rich single-card read (CoW, same key)</span> &mdash;{' '}
          <span className="bold white">~8s and ~40 full-collection sweeps every call</span> on the
          old binary; after the fix, one self-heal pass then{' '}
          <span className="bold white">~30ms and essentially no sweep thrash</span>. Live warm
          after cutover: about <span className="bold white">0.1s</span>.
        </li>
      </ul>

      <p>
        Cold starts still pay hydration. That is not a regression of the fix; it is physics. The
        regression was paying full-grid walks on every warm call forever.
      </p>

      <h2>What we almost learned wrong</h2>

      <ul>
        <li>
          <span className="bold white">Do not blame the feature that is not in the ops table.</span>{' '}
          Search was not the top row. Query was.
        </li>
        <li>
          <span className="bold white">Do not treat &ldquo;layout is correct&rdquo; as &ldquo;reads
          use it.&rdquo;</span>{' '}
          Partition-prefix placement was already live. The hot prefixes never contained the
          separator that pruning requires.
        </li>
        <li>
          <span className="bold white">Do not only fix the first named offender.</span> An earlier
          pass fixed part of the page-index story. Molecule-wide record prefixes, empty order
          scans, and conflict annotation still walked the warehouse. Done on the board is not done
          in the store.
        </li>
        <li>
          <span className="bold white">Measure with the cost counters that cannot lie about
          visits.</span>{' '}
          Some key-index shortcuts answer a listing without counting as a cold load. Disable them
          when proving a walk is gone.
        </li>
      </ul>

      <Section variant="sage">
        <h2>
          <span className="bold">The short version</span>
        </h2>
        <p>
          A database that spreads data across many groups is only as fast as the keys you scan with.
          If the scan key has no shelf label, you check every shelf. We stopped scanning that way on
          the paths our own apps hit every minute. The board got snappy again. Vector search was a
          red herring.
        </p>
      </Section>

      <p className="dim">
        Related:{' '}
        <Link to="/blog/the-fix-was-subtraction">The Fix Was Subtraction</Link>
        {' · '}
        <Link to="/blog/the-thrash-was-in-the-order">The Thrash Was in the Order</Link>
        {' · '}
        <Link to="/blog/thin-tips-and-honest-history">Thin Tips and Honest History</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
