import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Gruvbox-on-transparent technical figures (match other blog posts).
// Site chrome is dark gray — ink is light fg / dim / aqua; no filled background.
function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '34px 0', textAlign: 'center' }}>
      <div
        style={{
          background: 'transparent',
          maxWidth: 660,
          margin: '0 auto',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption
          style={{
            color: '#928374',
            fontSize: '11px',
            letterSpacing: '0.06em',
            marginTop: '12px',
            textTransform: 'uppercase',
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, 'IBM Plex Mono', monospace",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// fg #ebdbb2 · dim #928374 · aqua #83a598 · hatch #504945
const SVG_DEFS = `
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;

const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;background:transparent" font-family="'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">${SVG_DEFS}`;

// Fig 1 — warehouse full; pin missing.
const TWO_LAYERS = `${SVG_OPEN('0 0 660 280')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">CLOUD BACKUP HAS TWO LAYERS</text>

  <!-- warehouse: hatched sealed chunks -->
  <rect x="40" y="52" width="280" height="160" fill="url(#hatch)" stroke="#928374" stroke-width="1"/>
  <text x="180" y="88" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">SEALED CHUNKS</text>
  <text x="180" y="110" text-anchor="middle" fill="#928374" font-size="11">payload in object storage</text>

  <!-- small chunk squares -->
  <rect x="70" y="130" width="28" height="28" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="108" y="130" width="28" height="28" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="146" y="130" width="28" height="28" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="184" y="130" width="28" height="28" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="222" y="130" width="28" height="28" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="180" y="186" text-anchor="middle" fill="#928374" font-size="10">13,567 / 13,567 PRESENT</text>

  <!-- dimension -->
  <line x1="70" y1="230" x2="250" y2="230" stroke="#928374" stroke-width="1"/>
  <line x1="70" y1="226" x2="70" y2="234" stroke="#928374" stroke-width="1"/>
  <line x1="250" y1="226" x2="250" y2="234" stroke="#928374" stroke-width="1"/>
  <text x="160" y="250" text-anchor="middle" fill="#928374" font-size="10">BYTES IN THE WAREHOUSE</text>

  <!-- arrow -->
  <line x1="330" y1="120" x2="390" y2="120" stroke="#83a598" stroke-width="1"/>
  <polygon points="390,120 381,116 381,124" fill="#83a598"/>
  <rect x="328" y="118" width="4" height="4" fill="#928374"/>
  <rect x="388" y="118" width="4" height="4" fill="#83a598"/>
  <text x="360" y="108" text-anchor="middle" fill="#83a598" font-size="10">PIN</text>

  <!-- pin document: cut corner, dashed = not landed -->
  <polygon points="420,70 560,70 580,90 580,200 420,200" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <polyline points="560,70 560,90 580,90" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="500" y="120" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">LATEST</text>
  <text x="500" y="140" text-anchor="middle" fill="#928374" font-size="11">official tip pointer</text>
  <text x="500" y="168" text-anchor="middle" fill="#928374" font-size="10">MANIFEST COUNTER</text>
  <text x="500" y="186" text-anchor="middle" fill="#83a598" font-size="12">STUCK</text>

  <text x="330" y="268" text-anchor="middle" fill="#928374" font-size="11">FULL WAREHOUSE &middot; MISSING LABEL = NOT A RESTORABLE BACKUP</text>
</svg>`;

// Fig 2 — the two-hour window: bad middle revision in prod.
const TWO_HOUR_WINDOW = `${SVG_OPEN('0 0 660 300')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">ONE MIGRATION, THREE REVISIONS</text>

  <!-- timeline base -->
  <line x1="60" y1="160" x2="600" y2="160" stroke="#928374" stroke-width="1"/>
  <line x1="60" y1="154" x2="60" y2="166" stroke="#928374" stroke-width="1"/>
  <line x1="600" y1="154" x2="600" y2="166" stroke="#928374" stroke-width="1"/>

  <!-- rev A -->
  <circle cx="120" cy="160" r="8" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="70" y="70" width="100" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="120" y="94" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">REV A</text>
  <text x="120" y="112" text-anchor="middle" fill="#928374" font-size="10">old roots</text>
  <line x1="120" y1="126" x2="120" y2="152" stroke="#928374" stroke-width="1"/>
  <rect x="118" y="152" width="4" height="4" fill="#928374"/>
  <text x="120" y="190" text-anchor="middle" fill="#928374" font-size="10">EARLIER</text>

  <!-- rev B bad (emphasis) -->
  <circle cx="330" cy="160" r="8" fill="#83a598" stroke="#83a598" stroke-width="1"/>
  <rect x="270" y="52" width="120" height="72" fill="none" stroke="#83a598" stroke-width="2"/>
  <text x="330" y="76" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">REV B</text>
  <text x="330" y="94" text-anchor="middle" fill="#928374" font-size="10">new root for chunks</text>
  <text x="330" y="110" text-anchor="middle" fill="#83a598" font-size="10">PIN REJECTS NEW ROOT</text>
  <line x1="330" y1="124" x2="330" y2="152" stroke="#83a598" stroke-width="1"/>
  <rect x="328" y="152" width="4" height="4" fill="#83a598"/>
  <text x="330" y="190" text-anchor="middle" fill="#ebdbb2" font-size="10">DEPLOYED TO PROD</text>
  <text x="330" y="206" text-anchor="middle" fill="#928374" font-size="10">and left there</text>

  <!-- rev C fix -->
  <circle cx="540" cy="160" r="8" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="490" y="70" width="100" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="540" y="94" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">REV C</text>
  <text x="540" y="112" text-anchor="middle" fill="#928374" font-size="10">pin accepts root</text>
  <line x1="540" y1="126" x2="540" y2="152" stroke="#928374" stroke-width="1"/>
  <rect x="538" y="152" width="4" height="4" fill="#928374"/>
  <text x="540" y="190" text-anchor="middle" fill="#928374" font-size="10">MERGED +2H</text>
  <text x="540" y="206" text-anchor="middle" fill="#928374" font-size="10">not deployed</text>

  <!-- window dim line -->
  <line x1="270" y1="240" x2="390" y2="240" stroke="#83a598" stroke-width="1"/>
  <line x1="270" y1="236" x2="270" y2="244" stroke="#83a598" stroke-width="1"/>
  <line x1="390" y1="236" x2="390" y2="244" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="262" text-anchor="middle" fill="#928374" font-size="10">SELF-INCONSISTENT WINDOW &middot; CLIENT ALREADY ON C</text>
</svg>`;

// Fig 3 — canary weight: alias says new, traffic stays old.
const CANARY_TRAP = `${SVG_OPEN('0 0 660 270')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">ALIAS VS TRAFFIC</text>

  <!-- alias box -->
  <rect x="40" y="56" width="200" height="88" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="140" y="88" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ALIAS &ldquo;LIVE&rdquo;</text>
  <text x="140" y="110" text-anchor="middle" fill="#928374" font-size="11">function version = NEW</text>
  <text x="140" y="128" text-anchor="middle" fill="#928374" font-size="11">looks promoted</text>

  <!-- weights (emphasis) -->
  <rect x="280" y="56" width="160" height="88" fill="none" stroke="#83a598" stroke-width="2"/>
  <text x="360" y="88" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">CANARY WEIGHT</text>
  <text x="360" y="110" text-anchor="middle" fill="#83a598" font-size="14">OLD = 1.0</text>
  <text x="360" y="128" text-anchor="middle" fill="#928374" font-size="11">100% still on old</text>

  <!-- clients -->
  <circle cx="80" cy="210" r="18" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="80" y="214" text-anchor="middle" fill="#ebdbb2" font-size="10">NODE</text>
  <line x1="98" y1="210" x2="200" y2="210" stroke="#928374" stroke-width="1"/>
  <polygon points="200,210 191,206 191,214" fill="#928374"/>
  <rect x="196" y="208" width="4" height="4" fill="#928374"/>

  <rect x="210" y="188" width="120" height="44" fill="url(#hatch)" stroke="#83a598" stroke-width="1"/>
  <text x="270" y="208" text-anchor="middle" fill="#ebdbb2" font-size="11">OLD CODE</text>
  <text x="270" y="224" text-anchor="middle" fill="#928374" font-size="10">rejects the pin</text>

  <rect x="380" y="188" width="120" height="44" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="440" y="208" text-anchor="middle" fill="#928374" font-size="11">NEW CODE</text>
  <text x="440" y="224" text-anchor="middle" fill="#928374" font-size="10">0% traffic</text>

  <line x1="330" y1="210" x2="380" y2="210" stroke="#504945" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="330" y="255" text-anchor="middle" fill="#928374" font-size="11">PUBLISHED &ne; SERVING</text>
</svg>`;

export default function BlogTheBackupThatWouldntCommit() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Backup That Wouldn&apos;t Commit - LastDB</title>
        <meta
          name="description"
          content="Every sealed piece of our primary database was already in the cloud, but restore had no official tip. One half-finished migration plus a canary that never cleared traffic — and how we finally committed a real backup."
        />
        <meta property="og:title" content="The Backup That Wouldn't Commit" />
        <meta
          property="og:description"
          content="Uploaded is not the same as committed. Chunks finished; the cloud tip refused. We fixed the code twice — once in git, once in traffic."
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
        One job. Make the laptop&rsquo;s database restorable from the cloud.
        We re-enabled backup, watched every sealed piece finish uploading, and
        still woke up to{' '}
        <span className="white">
          durability: degraded &mdash; last good commit days old.
        </span>{' '}
        The files were in the warehouse. Nobody had stamped which set was the
        official tip.
      </p>

      <p>
        This is that story in order: what backup actually means here, what we
        saw, the one server bug that caused it, the deploy mistake that almost
        hid the fix, and the short checklist we are keeping.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What &ldquo;backed up&rdquo; means here</h2>

      <p>
        Our cloud backup for a LastDB home is not a stream of every keystroke.
        It freezes the sealed store into content-addressed{' '}
        <span className="bold white">chunks</span>, uploads them, then updates a
        single cloud pointer &mdash; the{' '}
        <span className="bold white">official tip</span> &mdash; that says
        &ldquo;this generation is what you restore.&rdquo; That tip write is a
        compare-and-swap so two machines cannot clobber each other.
      </p>

      <p>
        Until the tip moves, you have paid for boxes in a warehouse with no
        shipping label. Status durability ages the tip, not the last successful
        chunk put. So a full warehouse and a stale tip can coexist.
      </p>

      <ArchFigure
        svg={TWO_LAYERS}
        caption="Fig. 1 — Chunks in the warehouse; official tip still missing"
      />

      <h2>What we saw</h2>

      <p>
        After we turned cloud backup back on, the node did the hard part.
        Chunks present hit chunks total &mdash;{' '}
        <span className="bold white">13,567 / 13,567</span>. Cycles reported
        already-present, zero new bytes. And every fifteen minutes or so the
        tip step failed the same way: the cloud API refused to flip{' '}
        <span className="bold white">latest</span>, with a calm message about
        personal backups only.
      </p>

      <p>
        The machine was not offline. Sync looked fine. The only honest line on
        the dashboard was durability getting older. We were not failing to
        upload. We were failing to{' '}
        <span className="bold white">commit</span>.
      </p>

      <h2>Why the tip refused</h2>

      <p>
        We had moved cloud object roots from the account principal to the{' '}
        <span className="bold white">identity of the database home</span> &mdash;
        the right long-term shape. Clients started sending that new scope on
        every backup call, including the tip write.
      </p>

      <p>
        On the server, three revisions of the storage function lined up like
        this:
      </p>

      <ol>
        <li>
          <span className="bold white">Before</span> &mdash; tip only for the
          old personal shape.
        </li>
        <li>
          <span className="bold white">Middle (the landmine)</span> &mdash;
          chunk paths accept the new database root; the tip path still treats
          that root as forbidden and returns a validation error.
        </li>
        <li>
          <span className="bold white">After (two hours later in git)</span>{' '}
          &mdash; tip resolves the new root the same way chunks do.
        </li>
      </ol>

      <p>
        Production was still on the middle revision. The fix had merged the
        same night and never shipped. Clients were already on the new world.
        Chunks uploaded under the new root. Tip updates were rejected. Half a
        migration: write path yes, commit path no.
      </p>

      <ArchFigure
        svg={TWO_HOUR_WINDOW}
        caption="Fig. 2 — The middle revision shipped; the fix stayed in main"
      />

      <Section variant="rose">
        <h2>
          <span className="bold">The dangerous deploy</span>
        </h2>
        <p>
          Not always the one that breaks uploads. The one that{' '}
          <span className="bold white">half-adopts a new identity</span>:
          objects land under the new root, the official tip still enforces the
          old rules. Busy looks healthy until you ask whether restore has a
          label.
        </p>
      </Section>

      <p>
        Status made it quieter than it should have been. A successful
        chunk-only cycle could clear the failure streak from the tip refusal.
        The line that should print FAILING with a cause was gated off once the
        cut looked complete. Durability only said how old the tip was, not why
        it would not move. Correct numbers, wrong surface &mdash; a pattern we
        keep relearning.
      </p>

      <h2>We shipped the fix &mdash; traffic did not</h2>

      <p>
        So we built the storage service from current main, published a new
        version, and pointed the live alias at it. The tip still failed.
      </p>

      <p>
        The alias said function version equals new. The canary weight said
        something else: an extra weight of{' '}
        <span className="bold white">1.0</span> still sent{' '}
        <span className="bold white">one hundred percent of traffic</span> to
        the old build. We had published. We had not served.
      </p>

      <ArchFigure
        svg={CANARY_TRAP}
        caption="Fig. 3 — Alias looks new; canary still routes everything to old"
      />

      <p>
        Clearing the weight (and restoring the gateway permission a clumsy
        alias recreate had dropped) put all traffic on the fixed build. The
        next forced snapshot returned ok. The tip counter advanced. Durability
        went from days-stale to minutes-fresh. Same warehouse &mdash; now with
        a label.
      </p>

      <h2>What we are keeping</h2>

      <p>
        Three inequalities, one product rule:
      </p>

      <ul>
        <li>
          <span className="bold white">Uploaded &ne; committed.</span> Celebrate
          when the official tip moves, not when the chunk bar hits 100%.
        </li>
        <li>
          <span className="bold white">Merged &ne; deployed.</span> A two-hour
          fix sitting only in git is how production freezes on the bad half of
          a migration.
        </li>
        <li>
          <span className="bold white">Deployed &ne; serving.</span> Alias
          version and canary weights are different knobs; promotion is not
          done until a real tip probe succeeds.
        </li>
      </ul>

      <p>
        Same rule for status: a health counter is not delivered until the
        surface that should show FAILING can actually show it for the case you
        care about.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">Anywhere you backup in two steps</span>
        </h2>
        <p>
          If you upload objects and then flip a tip, instrument the tip. If you
          migrate write roots, ship the tip path in the same cutover. If you
          promote with an alias and a weight map, check both &mdash; then poke
          the real API.
        </p>
      </Section>

      <p>
        We run LastDB on LastDB. Notes, the work board, and the rest of the
        stack share one home. When that home has no cloud tip, the laptop is
        still the only full copy. Getting the tip green was not a status-line
        vanity project. It was the difference between &ldquo;the warehouse is
        full&rdquo; and &ldquo;we can restore.&rdquo;
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
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
