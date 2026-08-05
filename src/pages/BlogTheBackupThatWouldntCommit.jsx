import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Technical figures on a white paper panel (site chrome is dark; black ink
// needs white ground). Thin strokes, hatch for stored bytes, mono labels.
function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '34px 0', textAlign: 'center' }}>
      <div
        style={{
          background: '#ffffff',
          color: '#000000',
          padding: '22px 18px 18px',
          maxWidth: 660,
          margin: '0 auto',
          border: '1px solid #d5d5d5',
          boxSizing: 'border-box',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption
          style={{
            color: '#a89984',
            fontSize: '11px',
            letterSpacing: '0.06em',
            marginTop: '12px',
            textTransform: 'uppercase',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const SVG_DEFS = `
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#666666" stroke-width="1"/>
    </pattern>
  </defs>`;

// White full-bleed paper inside the SVG so ink reads even if the wrapper is skipped.
const SVG_OPEN = (vb) => {
  const parts = vb.trim().split(/\s+/);
  const w = parts[2] || '660';
  const h = parts[3] || '280';
  return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;background:#ffffff" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"><rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff"/>${SVG_DEFS}`;
};

// Fig 1 — warehouse full; pin missing.
const TWO_LAYERS = `${SVG_OPEN('0 0 660 280')}
  <text x="36" y="28" fill="#666666" font-size="11" letter-spacing="1.5">CLOUD BACKUP HAS TWO LAYERS</text>

  <!-- warehouse: hatched sealed chunks -->
  <rect x="40" y="52" width="280" height="160" fill="url(#hatch)" stroke="#000000" stroke-width="1"/>
  <text x="180" y="88" text-anchor="middle" fill="#000000" font-size="13" letter-spacing="1.5">SEALED CHUNKS</text>
  <text x="180" y="110" text-anchor="middle" fill="#666666" font-size="11">payload in object storage</text>

  <!-- small chunk squares -->
  <rect x="70" y="130" width="28" height="28" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <rect x="108" y="130" width="28" height="28" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <rect x="146" y="130" width="28" height="28" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <rect x="184" y="130" width="28" height="28" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <rect x="222" y="130" width="28" height="28" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <text x="180" y="186" text-anchor="middle" fill="#666666" font-size="10">13,567 / 13,567 PRESENT</text>

  <!-- dimension -->
  <line x1="70" y1="230" x2="250" y2="230" stroke="#000000" stroke-width="1"/>
  <line x1="70" y1="226" x2="70" y2="234" stroke="#000000" stroke-width="1"/>
  <line x1="250" y1="226" x2="250" y2="234" stroke="#000000" stroke-width="1"/>
  <text x="160" y="250" text-anchor="middle" fill="#666666" font-size="10">BYTES IN THE WAREHOUSE</text>

  <!-- arrow -->
  <polyline points="330,120 380,120 380,120" fill="none" stroke="#000000" stroke-width="1"/>
  <line x1="330" y1="120" x2="390" y2="120" stroke="#000000" stroke-width="1"/>
  <polygon points="390,120 381,116 381,124" fill="#000000"/>
  <rect x="328" y="118" width="4" height="4" fill="#000000"/>
  <rect x="388" y="118" width="4" height="4" fill="#000000"/>
  <text x="360" y="108" text-anchor="middle" fill="#666666" font-size="10">PIN</text>

  <!-- pin document: cut corner, dashed = not landed -->
  <polygon points="420,70 560,70 580,90 580,200 420,200" fill="none" stroke="#000000" stroke-width="1" stroke-dasharray="4 3"/>
  <polyline points="560,70 560,90 580,90" fill="none" stroke="#000000" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="500" y="120" text-anchor="middle" fill="#000000" font-size="13" letter-spacing="1.5">LATEST</text>
  <text x="500" y="140" text-anchor="middle" fill="#666666" font-size="11">official tip pointer</text>
  <text x="500" y="168" text-anchor="middle" fill="#666666" font-size="10">MANIFEST COUNTER</text>
  <text x="500" y="186" text-anchor="middle" fill="#000000" font-size="12">STUCK</text>

  <text x="330" y="268" text-anchor="middle" fill="#666666" font-size="11">FULL WAREHOUSE &middot; MISSING LABEL = NOT A RESTORABLE BACKUP</text>
</svg>`;

// Fig 2 — the two-hour window: bad middle revision in prod.
const TWO_HOUR_WINDOW = `${SVG_OPEN('0 0 660 300')}
  <text x="36" y="28" fill="#666666" font-size="11" letter-spacing="1.5">ONE MIGRATION, THREE REVISIONS</text>

  <!-- timeline base -->
  <line x1="60" y1="160" x2="600" y2="160" stroke="#000000" stroke-width="1"/>
  <line x1="60" y1="154" x2="60" y2="166" stroke="#000000" stroke-width="1"/>
  <line x1="600" y1="154" x2="600" y2="166" stroke="#000000" stroke-width="1"/>

  <!-- rev A -->
  <circle cx="120" cy="160" r="8" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <rect x="70" y="70" width="100" height="56" fill="none" stroke="#000000" stroke-width="1"/>
  <text x="120" y="94" text-anchor="middle" fill="#000000" font-size="11" letter-spacing="1">REV A</text>
  <text x="120" y="112" text-anchor="middle" fill="#666666" font-size="10">old roots</text>
  <line x1="120" y1="126" x2="120" y2="152" stroke="#000000" stroke-width="1"/>
  <rect x="118" y="152" width="4" height="4" fill="#000000"/>
  <text x="120" y="190" text-anchor="middle" fill="#666666" font-size="10">EARLIER</text>

  <!-- rev B bad -->
  <circle cx="330" cy="160" r="8" fill="#000000" stroke="#000000" stroke-width="1"/>
  <rect x="270" y="52" width="120" height="72" fill="none" stroke="#000000" stroke-width="2"/>
  <text x="330" y="76" text-anchor="middle" fill="#000000" font-size="11" letter-spacing="1">REV B</text>
  <text x="330" y="94" text-anchor="middle" fill="#666666" font-size="10">new root for chunks</text>
  <text x="330" y="110" text-anchor="middle" fill="#666666" font-size="10">PIN REJECTS NEW ROOT</text>
  <line x1="330" y1="124" x2="330" y2="152" stroke="#000000" stroke-width="1"/>
  <rect x="328" y="152" width="4" height="4" fill="#000000"/>
  <text x="330" y="190" text-anchor="middle" fill="#000000" font-size="10">DEPLOYED TO PROD</text>
  <text x="330" y="206" text-anchor="middle" fill="#666666" font-size="10">and left there</text>

  <!-- rev C fix -->
  <circle cx="540" cy="160" r="8" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <rect x="490" y="70" width="100" height="56" fill="none" stroke="#000000" stroke-width="1"/>
  <text x="540" y="94" text-anchor="middle" fill="#000000" font-size="11" letter-spacing="1">REV C</text>
  <text x="540" y="112" text-anchor="middle" fill="#666666" font-size="10">pin accepts root</text>
  <line x1="540" y1="126" x2="540" y2="152" stroke="#000000" stroke-width="1"/>
  <rect x="538" y="152" width="4" height="4" fill="#000000"/>
  <text x="540" y="190" text-anchor="middle" fill="#666666" font-size="10">MERGED +2H</text>
  <text x="540" y="206" text-anchor="middle" fill="#666666" font-size="10">not deployed</text>

  <!-- window dim line -->
  <line x1="270" y1="240" x2="390" y2="240" stroke="#000000" stroke-width="1"/>
  <line x1="270" y1="236" x2="270" y2="244" stroke="#000000" stroke-width="1"/>
  <line x1="390" y1="236" x2="390" y2="244" stroke="#000000" stroke-width="1"/>
  <text x="330" y="262" text-anchor="middle" fill="#666666" font-size="10">SELF-INCONSISTENT WINDOW &middot; CLIENT ALREADY ON C</text>
</svg>`;

// Fig 3 — canary weight: alias says new, traffic stays old.
const CANARY_TRAP = `${SVG_OPEN('0 0 660 270')}
  <text x="36" y="28" fill="#666666" font-size="11" letter-spacing="1.5">ALIAS VS TRAFFIC</text>

  <!-- alias box -->
  <rect x="40" y="56" width="200" height="88" fill="none" stroke="#000000" stroke-width="1"/>
  <text x="140" y="88" text-anchor="middle" fill="#000000" font-size="12" letter-spacing="1.5">ALIAS &ldquo;LIVE&rdquo;</text>
  <text x="140" y="110" text-anchor="middle" fill="#666666" font-size="11">function version = NEW</text>
  <text x="140" y="128" text-anchor="middle" fill="#666666" font-size="11">looks promoted</text>

  <!-- weights -->
  <rect x="280" y="56" width="160" height="88" fill="none" stroke="#000000" stroke-width="2"/>
  <text x="360" y="88" text-anchor="middle" fill="#000000" font-size="12" letter-spacing="1.5">CANARY WEIGHT</text>
  <text x="360" y="110" text-anchor="middle" fill="#000000" font-size="14">OLD = 1.0</text>
  <text x="360" y="128" text-anchor="middle" fill="#666666" font-size="11">100% still on old</text>

  <!-- clients -->
  <circle cx="80" cy="210" r="18" fill="none" stroke="#000000" stroke-width="1"/>
  <text x="80" y="214" text-anchor="middle" fill="#000000" font-size="10">NODE</text>
  <line x1="98" y1="210" x2="200" y2="210" stroke="#000000" stroke-width="1"/>
  <polygon points="200,210 191,206 191,214" fill="#000000"/>
  <rect x="196" y="208" width="4" height="4" fill="#000000"/>

  <rect x="210" y="188" width="120" height="44" fill="url(#hatch)" stroke="#000000" stroke-width="1"/>
  <text x="270" y="208" text-anchor="middle" fill="#000000" font-size="11">OLD CODE</text>
  <text x="270" y="224" text-anchor="middle" fill="#666666" font-size="10">rejects the pin</text>

  <rect x="380" y="188" width="120" height="44" fill="none" stroke="#000000" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="440" y="208" text-anchor="middle" fill="#666666" font-size="11">NEW CODE</text>
  <text x="440" y="224" text-anchor="middle" fill="#666666" font-size="10">0% traffic</text>

  <line x1="330" y1="210" x2="380" y2="210" stroke="#000000" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="330" y="255" text-anchor="middle" fill="#666666" font-size="11">PUBLISHED &ne; SERVING</text>
</svg>`;

export default function BlogTheBackupThatWouldntCommit() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Backup That Wouldn&apos;t Commit - LastDB</title>
        <meta
          name="description"
          content="Every sealed chunk of our primary LastDB home was already in the cloud. Status still said the backup was degraded. What two layers of cloud backup mean, how a two-hour deploy gap and a stuck traffic weight kept the official tip from flipping, and how we re-enabled a real durability pin."
        />
        <meta property="og:title" content="The Backup That Wouldn't Commit" />
        <meta
          property="og:description"
          content="Bytes in the warehouse are not a restorable backup. We filled the warehouse, then spent days failing to pin the tip — and nearly redeployed a fix that never received traffic."
        />
        <link
          rel="canonical"
          href="https://thelastdb.com/blog/the-backup-that-wouldnt-commit"
        />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">The Backup That Wouldn&rsquo;t Commit</h1>
      <p className="post-meta dim">2026-08-04</p>

      <p className="bold white">
        Every sealed chunk of our daily-driver database was already in the
        cloud. Upload progress read one hundred percent. Status still said the
        backup was degraded &mdash; last good commit days old.{' '}
        <span className="white">
          The warehouse was full. The official tip had never flipped.
        </span>
      </p>

      <p>
        This is the story of re-enabling cloud backup on our primary LastDB
        home, watching it finish uploading, and discovering that{' '}
        <span className="bold white">&ldquo;uploaded&rdquo; is not the same
        as &ldquo;committed.&rdquo;</span>{' '}
        It is also a story about a two-hour window in a cloud migration, a
        production service that never got the fix, and a traffic weight that
        made a successful redeploy look like a failed one.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Two layers</h2>

      <p>
        LastDB&rsquo;s cloud backup is not one bar. It is two jobs that
        operators (and dashboards) like to collapse into one word.
      </p>

      <ol>
        <li>
          <span className="bold white">Sealed chunks</span> &mdash; the actual
          payload. Local segments freeze into content-addressed pieces and go
          to object storage under a stable root for that database home.
        </li>
        <li>
          <span className="bold white">The durability pin</span> &mdash; a
          single conditional write of the &ldquo;latest&rdquo; pointer. That
          pointer names which generation is official: store identity, epoch,
          manifest counter, manifest hash. Until it lands, restore has no tip
          to trust, and durability scoring correctly stays degraded.
        </li>
      </ol>

      <p>
        Chunks without a pin are boxes in a warehouse with no shipping label.
        Useful if you already know which box is which. Not a backup you would
        hand to a restore path.
      </p>

      <ArchFigure
        svg={TWO_LAYERS}
        caption="Fig. 1 — Warehouse full, pin missing"
      />

      <Section variant="sage">
        <h2>
          <span className="bold">Working definition</span>
        </h2>
        <p>
          <span className="bold white">Durability pin</span> = the
          compare-and-swap of the cloud &ldquo;latest&rdquo; pointer after
          chunks (and the manifest that names them) are present. Age of that
          pin is what our status line means by backup durability &mdash; not
          &ldquo;bytes were uploaded recently.&rdquo;
        </p>
      </Section>

      <h2>What we measured</h2>

      <p>
        After cloud sync came back on, the node did the hard part well. On the
        primary home we watched:
      </p>

      <ul>
        <li>
          Chunks present equalled chunks total &mdash;{' '}
          <span className="bold white">13,567 / 13,567</span>, nothing left to
          drain.
        </li>
        <li>
          Upload cycles reported already-present, zero new bytes, phase still
          &ldquo;building.&rdquo;
        </li>
        <li>
          Durability stayed over the age threshold on an old manifest counter
          while a newer generation sat fully uploaded and unpinned.
        </li>
        <li>
          Mutation sync could look idle and non-degraded at the same time. The
          failure was not &ldquo;the pipe is dead.&rdquo; It was &ldquo;the
          last step refuses.&rdquo;
        </li>
      </ul>

      <p>
        Earlier in the same arc, a busy home could thrash sealed chunks faster
        than a cycle could drain them &mdash; we wrote about a related class of
        thrash in{' '}
        <Link to="/blog/the-thrash-was-in-the-order" className="link-btn">
          The Thrash Was in the Order
        </Link>
        . By the time this story peaks, that race was over. The remaining error,
        every quarter hour, was the pin: the cloud API rejected the
        latest-pointer update for database-scoped backups.
      </p>

      <h2>The two-hour window</h2>

      <p>
        We had just moved cloud objects to root at the{' '}
        <span className="bold white">identity of the database home</span>, not
        only at the account principal. That is the right long-term shape for
        multi-database and restore. The client started sending the new scope on
        every backup call.
      </p>

      <p>
        On the server, three revisions mattered:
      </p>

      <ul>
        <li>
          <span className="bold">Before:</span> pin only for the old personal
          shape.
        </li>
        <li>
          <span className="bold">Middle (the landmine):</span> chunk paths
          accept the new root; the pin path still treats that root as
          &ldquo;not personal&rdquo; and returns a validation error.
        </li>
        <li>
          <span className="bold">After (two hours later, in source control):</span>{' '}
          pin resolves scope correctly and accepts a registered database root.
        </li>
      </ul>

      <p>
        Production was running the middle revision. The fix had been merged the
        same night &mdash; and never cut over. Clients were already on the new
        scope. Result: every sealed chunk could upload, and every pin attempt
        failed with a calm, permanent reason: only personal backups may flip
        latest.
      </p>

      <ArchFigure
        svg={TWO_HOUR_WINDOW}
        caption="Fig. 2 — Self-inconsistent middle revision left in prod"
      />

      <Section variant="rose">
        <h2>
          <span className="bold">The catch</span>
        </h2>
        <p>
          The dangerous deploy is not always the one that breaks uploads. It is
          the one that <span className="bold white">half-adopts a new
          identity</span>: writes succeed under the new root, the tip still
          enforces the old world. Everything looks busy and healthy until you
          ask whether restore has a tip.
        </p>
      </Section>

      <h2>Why it felt quiet</h2>

      <p>
        Three independent silencers stacked on top of the real error:
      </p>

      <ol>
        <li>
          A successful chunk-only drain sample could clear the consecutive
          failure streak that the pin failure had just set &mdash; so the
          counter never accumulated where a human looks.
        </li>
        <li>
          The status formatter that should print{' '}
          <span className="bold white">FAILING</span> with a cause was gated on
          &ldquo;show progress,&rdquo; and progress is off once the cut is
          complete. The exact case the FAILING line was written for could not
          render.
        </li>
        <li>
          Durability intentionally reports age, not uploader state &mdash; so
          the one unconditional line could only say &ldquo;stale,&rdquo; never
          &ldquo;because the pin API rejects database scope.&rdquo;
        </li>
      </ol>

      <p>
        The number that mattered was right. The presentation was the defect.
        That pattern has bitten us before: a correct gauge, a wrong surface.
      </p>

      <h2>Redeploy, then the canary trap</h2>

      <p>
        Cutting over the cloud storage function to current main should have
        been the whole story. We built the service, published a new version,
        pointed the live alias at it &mdash; and the pin still failed.
      </p>

      <p>
        The alias told a reassuring story: function version equals new. The
        routing weight told a different one: an extra version weight of{' '}
        <span className="bold white">1.0</span> still sent{' '}
        <span className="bold white">one hundred percent of traffic</span> to
        the old build. Publish succeeded. Serve never moved.
      </p>

      <ArchFigure
        svg={CANARY_TRAP}
        caption="Fig. 3 — Published is not serving"
      />

      <p>
        Clearing that weight &mdash; recreating the live alias without a canary
        map, and restoring the gateway permission the recreate dropped &mdash;
        put one hundred percent of traffic on the fixed build. The next forced
        snapshot returned ok with a new manifest counter. Durability dropped
        from days-stale to minutes-fresh. The warehouse finally got its label.
      </p>

      <h2>What we changed in the product sense</h2>

      <ul>
        <li>
          Cloud backup on the primary is on again, with a committed tip &mdash;
          not only paid-for bytes under a root nobody could pin.
        </li>
        <li>
          The storage path that issues and flips backup latest accepts
          database-scoped homes the same way chunk upload already did.
        </li>
        <li>
          Status work continues so a complete-but-failing pin cannot hide
          behind a green-looking drain sample (a fix lands only when the
          surface that renders it is checked too).
        </li>
        <li>
          Deploy runbooks now treat &ldquo;alias points at N&rdquo; as
          incomplete until routing weights are empty and a real pin probe
          succeeds.
        </li>
      </ul>

      <h2>Lessons we are keeping</h2>

      <ol>
        <li>
          <span className="bold white">Bytes &ne; backup.</span> Count chunks
          and the tip separately. Celebrate only when the pin advances.
        </li>
        <li>
          <span className="bold white">Merged &ne; deployed.</span> A two-hour
          fix window is long enough to freeze production on the bad half of a
          migration.
        </li>
        <li>
          <span className="bold white">Deployed &ne; serving.</span> Canary
          weights can leave one hundred percent of traffic on the previous
          version while the alias metadata looks green.
        </li>
        <li>
          <span className="bold white">A health counter is not delivered
          until its surface is.</span> If FAILING is written for a case the
          UI cannot show, you will re-learn the outage by hand.
        </li>
      </ol>

      <Section variant="sage">
        <h2>
          <span className="bold">For operators of any stack</span>
        </h2>
        <p>
          If your backup pipeline has an upload phase and a tip phase, make
          the tip a first-class metric. If your release path has an alias and
          a weight map, make the weight map part of the promotion checklist.
          And if a migration introduces a new scope for writes, never ship the
          write path without the commit path in the same production cutover.
        </p>
      </Section>

      <p>
        We dogfood LastDB on LastDB. When the primary home cannot pin a cloud
        tip, the notes app, the work board, and the rest of the stack share one
        fate. Getting that pin green again is not a status-line nicety &mdash;
        it is the difference between a laptop and an off-machine copy of
        everything we are building.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <p className="dim">
        Related:{' '}
        <Link to="/blog/the-thrash-was-in-the-order">
          The Thrash Was in the Order
        </Link>
        {' · '}
        <Link to="/blog/last-store">Last Store</Link>
        {' · '}
        <Link to="/blog">Blog index</Link>
        {' · '}
        <Link to="/">LastDB home</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
