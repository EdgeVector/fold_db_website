import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style).
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
    <pattern id="cells" width="18" height="24" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="24" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// Fig 1 — product stack: apps → LastDB → Last Store on disk
const STACK = `${SVG_OPEN('0 0 660 280')}
  <text x="330" y="28" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">WHAT WE SHIP</text>

  <rect x="180" y="44" width="300" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR APPS</text>
  <text x="330" y="80" text-anchor="middle" fill="#928374" font-size="10">board · notes · agent tools · …</text>

  <line x1="330" y1="88" x2="330" y2="112" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="110" width="4" height="4" fill="#928374"/>

  <rect x="180" y="116" width="300" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="136" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LASTDB NODE</text>
  <text x="330" y="152" text-anchor="middle" fill="#928374" font-size="10">schemas · queries · sync · apps</text>

  <line x1="330" y1="160" x2="330" y2="184" stroke="#83a598" stroke-width="1"/>
  <rect x="328" y="182" width="4" height="4" fill="#83a598"/>

  <rect x="180" y="188" width="300" height="52" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="212" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LAST STORE</text>
  <text x="330" y="228" text-anchor="middle" fill="#83a598" font-size="10">local engine · segments · groups · compact</text>

  <text x="330" y="266" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ONE MACHINE · YOUR DATA · ONE ENGINE UNDER THE NODE</text>
</svg>`;

// Fig 2 — before: one opaque bag; after: collections + reclaim
const BEFORE_AFTER = `${SVG_OPEN('0 0 660 300')}
  <text x="150" y="30" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE</text>
  <rect x="40" y="48" width="220" height="140" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="150" y="100" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">ONE BAG ON DISK</text>
  <text x="150" y="124" text-anchor="middle" fill="#928374" font-size="10">deletes leave hollow</text>
  <text x="150" y="142" text-anchor="middle" fill="#928374" font-size="10">du is hard to trust</text>
  <text x="150" y="160" text-anchor="middle" fill="#928374" font-size="10">one global choke point</text>

  <line x1="330" y1="40" x2="330" y2="220" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="510" y="30" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1.5">AFTER · LAST STORE</text>
  <rect x="400" y="48" width="90" height="50" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="445" y="78" text-anchor="middle" fill="#ebdbb2" font-size="10">TIPS</text>
  <rect x="500" y="48" width="90" height="50" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="545" y="78" text-anchor="middle" fill="#ebdbb2" font-size="10">ATOMS</text>
  <rect x="400" y="110" width="90" height="50" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="445" y="140" text-anchor="middle" fill="#ebdbb2" font-size="10">INDEX</text>
  <rect x="500" y="110" width="90" height="50" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="545" y="140" text-anchor="middle" fill="#83a598" font-size="10">…</text>
  <text x="510" y="186" text-anchor="middle" fill="#928374" font-size="10">named collections</text>
  <text x="510" y="204" text-anchor="middle" fill="#928374" font-size="10">compact reclaims bytes</text>

  <line x1="400" y1="230" x2="400" y2="244" stroke="#83a598" stroke-width="1"/>
  <line x1="590" y1="230" x2="590" y2="244" stroke="#83a598" stroke-width="1"/>
  <line x1="400" y1="237" x2="590" y2="237" stroke="#83a598" stroke-width="1"/>
  <text x="495" y="268" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">LAYOUT YOU CAN REASON ABOUT</text>
</svg>`;

// Fig 3 — hash groups: parallel neighborhoods
const GROUPS = `${SVG_OPEN('0 0 660 240')}
  <text x="330" y="28" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">HASH GROUPS · MANY SMALL HOMES</text>

  <g stroke="#928374" stroke-width="1" fill="url(#poche)">
    <rect x="60" y="56" width="72" height="56"/>
    <rect x="148" y="56" width="72" height="56"/>
    <rect x="236" y="56" width="72" height="56"/>
    <rect x="324" y="56" width="72" height="56"/>
    <rect x="412" y="56" width="72" height="56"/>
    <rect x="500" y="56" width="72" height="56"/>
  </g>
  <text x="96" y="90" text-anchor="middle" fill="#ebdbb2" font-size="10">G0</text>
  <text x="184" y="90" text-anchor="middle" fill="#ebdbb2" font-size="10">G1</text>
  <text x="272" y="90" text-anchor="middle" fill="#ebdbb2" font-size="10">G2</text>
  <text x="360" y="90" text-anchor="middle" fill="#ebdbb2" font-size="10">…</text>
  <text x="448" y="90" text-anchor="middle" fill="#ebdbb2" font-size="10">…</text>
  <text x="536" y="90" text-anchor="middle" fill="#ebdbb2" font-size="10">GN</text>

  <rect x="236" y="56" width="72" height="56" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="272" y="140" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">A KEYED READ HITS A NEIGHBORHOOD</text>

  <line x1="60" y1="168" x2="60" y2="182" stroke="#928374" stroke-width="1"/>
  <line x1="572" y1="168" x2="572" y2="182" stroke="#928374" stroke-width="1"/>
  <line x1="60" y1="175" x2="572" y2="175" stroke="#928374" stroke-width="1"/>
  <text x="316" y="204" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">NOT ONE LOCK ON THE WHOLE DISK · WORK CAN PARALLELIZE</text>

  <text x="330" y="228" text-anchor="middle" fill="#928374" font-size="10">KEY SHAPE STILL MATTERS — SEE &ldquo;CHECKING EVERY SHELF&rdquo;</text>
</svg>`;

export default function BlogLastStore() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Last Store - LastDB</title>
        <meta
          name="description"
          content="LastDB no longer sits on a single opaque embedded bag for local bytes. Last Store is our own local engine: segment files, named collections, hash groups, and compact that actually reclaims disk. Why we left the previous store, what we measured, and what that means for you."
        />
        <meta property="og:title" content="Last Store" />
        <meta
          property="og:description"
          content="Storage v2, product name Last Store: a local engine built for LastDB’s real write path and reclaim story — not a drop-in swap for its own sake."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/last-store" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">Last Store</h1>
      <p className="post-meta dim">2026-07-29</p>

      <p className="bold white">
        LastDB is the product you talk to: schemas, queries, sync, apps on a node that holds{' '}
        <em>your</em> data. Under that node there has to be something that puts bytes on disk and
        gets them back. For a long time that something was a solid, popular embedded store. It got
        us shipping. It also became the wrong shape for the product we were actually running. So we
        built <span className="white">Last Store</span> &mdash; our own local engine &mdash; and put
        the primary path on it.
      </p>

      <p>
        This is not a file format dump. It is the decision story: what hurt, what we compared, what
        Last Store is for, and how it sits under the node you already know.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Where it sits</h2>

      <p>
        You still open apps, declare shapes, and read by key. The node still owns identity, sync,
        and the query plane. Last Store is the layer that answers: put this key, get this key, scan
        this prefix, compact this collection. One machine. One home directory. No separate database
        server to babysit.
      </p>

      <ArchFigure
        svg={STACK}
        caption="Fig. 1 — Apps talk to the LastDB node. The node stores through Last Store. Last Store owns segments and groups on disk."
      />

      <h2>What was wrong with the old bag</h2>

      <p>
        The previous embedded engine is excellent at being a general-purpose local map. LastDB is
        not a general-purpose local map. We write in batches, we hold many logical collections
        (tips, atoms, indexes, sync planes), we care about honest disk after deletes, and we need
        concurrency that is not one global choke point on every mutation.
      </p>

      <p>
        In practice that meant product pain that was hard to explain to ourselves:
      </p>

      <ul>
        <li>
          <span className="bold white">Deletes did not look like reclaim.</span> Space stayed
          &ldquo;hollow&rdquo; until someone understood freelist folklore. Running{' '}
          <code className="inline">du</code> felt like an argument, not a measurement.
        </li>
        <li>
          <span className="bold white">Everything lived in one opaque bag.</span> Multi-collection
          structure existed in our heads and in higher layers; the on-disk story did not help ops
          or recovery.
        </li>
        <li>
          <span className="bold white">A single global lock shape</span> fought the write patterns
          we actually use (batch then flush, not fsync-on-every-put).
        </li>
      </ul>

      <p>
        Those are structural. You can paper over them with more RAM and more restart rituals. We
        did, for a while. That is not a product story we wanted to keep telling.
      </p>

      <ArchFigure
        svg={BEFORE_AFTER}
        caption="Fig. 2 — Before: one opaque bag. After: named collections, segment layout, compact that reclaims bytes you can see."
      />

      <h2>What Last Store is</h2>

      <p>
        <span className="bold white">Last Store</span> is the Storage v2 local engine. Program name
        was Storage v2; engine codename was Segstore for a while; the product name is Last Store
        (crate <code className="inline">laststore</code>). Conceptually:
      </p>

      <ul>
        <li>
          <span className="bold white">Segment files</span> &mdash; append-friendly storage, not a
          forever-growing mystery file that only the engine understands.
        </li>
        <li>
          <span className="bold white">Named collections</span> &mdash; different planes of the
          product land in different on-disk homes, so layout matches how we already think.
        </li>
        <li>
          <span className="bold white">Group commit</span> &mdash; batch durability that matches how
          LastDB already wrote (batch then flush), instead of pretending every put is a lone
          fsync hero.
        </li>
        <li>
          <span className="bold white">Compact</span> &mdash; reclaim is a first-class verb. When we
          compact a real home, disk numbers move in a direction a human can believe.
        </li>
        <li>
          <span className="bold white">Hash groups</span> &mdash; the key space is partitioned so
          work can fan out across many small neighborhoods instead of one global queue.
        </li>
      </ul>

      <ArchFigure
        svg={GROUPS}
        caption="Fig. 3 — Hash groups: many small homes. A well-shaped key hits a neighborhood; a bad scan still can walk the grid (we fixed that for our hot paths too)."
      />

      <Section variant="sage">
        <h2>
          <span className="bold">Why not just tune the old engine?</span>
        </h2>
        <p>
          Because the pain was the shape, not the missing knob. We needed a store whose compact
          story, collection layout, and concurrency model matched LastDB &mdash; and that we own
          end to end when the dogfood primary is on fire at midnight.
        </p>
      </Section>

      <h2>What we measured before we switched</h2>

      <p>
        We did not cut over on vibes. A head-to-head harness compared Last Store to the previous
        engine under the durability model we actually use. In that harness, Last Store matched raw
        write throughput on tiny values, was faster on larger puts and hot gets, stayed competitive
        on cold gets, and was dramatically smaller on disk after compact &mdash; on the order of{' '}
        <span className="bold white">several times to tens of times</span> less space for the same
        work, depending on the case.
      </p>

      <p>
        That was the go decision for Storage v2. Cutover still required the hard bar: real-data
        copies of a lived-in home, green reads, app paths that no longer assumed the old scan
        habits. The engine being faster does not forgive an app that still full-scans.
      </p>

      <h2>Live now &mdash; and still honest</h2>

      <p>
        The primary path we dogfood daily runs Last Store. You do not install a second database. You
        install LastDB; Last Store is how that node holds bytes.
      </p>

      <p>
        Owning the engine does not mean every read is free. Partitioned layouts only help when the
        <em>key you scan with</em> can name a shelf. We spent a separate week learning that the hard
        way when board and knowledge apps got slow even after the layout was right &mdash; that
        story is{' '}
        <Link to="/blog/checking-every-shelf">Checking Every Shelf</Link>. Last Store gave us a
        place where that diagnosis is visible and fixable; it did not erase the need for access
        patterns.
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">The lesson we keep</span>
        </h2>
        <p>
          Build the engine that matches the product. Measure it against the durability model you
          actually run. Then measure the apps again &mdash; because a beautiful store will still
          walk the warehouse if you ask it to.
        </p>
      </Section>

      <h2>What this means for you</h2>

      <ul>
        <li>
          <span className="bold white">Same product surface.</span> Apps, schemas, keyed reads,
          sync. You are not learning a new query language for the engine.
        </li>
        <li>
          <span className="bold white">Disk is a story we can finish.</span> Compact and collection
          layout are product ops, not folklore.
        </li>
        <li>
          <span className="bold white">Concurrency has a map.</span> Hash groups are how local work
          spreads; good keys stay cheap.
        </li>
        <li>
          <span className="bold white">We dogfood it.</span> The board and knowledge tools we run on
          LastDB run on Last Store underneath. When it is wrong, we feel it first.
        </li>
      </ul>

      <Section variant="sage">
        <h2>
          <span className="bold">The short version</span>
        </h2>
        <p>
          Last Store is LastDB&rsquo;s own local storage engine: segments, collections, groups, and
          compact that reclaims. We left a general-purpose bag because LastDB is not a general-
          purpose bag. The node is still the product. Last Store is how that product keeps a
          promise about your disk.
        </p>
      </Section>

      <p className="dim">
        Related:{' '}
        <Link to="/blog/checking-every-shelf">Checking Every Shelf</Link>
        {' · '}
        <Link to="/blog/thin-tips-and-honest-history">Thin Tips and Honest History</Link>
        {' · '}
        <Link to="/blog/the-fix-was-subtraction">The Fix Was Subtraction</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
