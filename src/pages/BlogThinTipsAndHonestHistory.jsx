import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, joint marks, mono caps labels, sage accent).
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

// Fig 1 — fat tip vs thin tip (conceptual)
const FAT_VS_THIN = `${SVG_OPEN('0 0 660 280')}
  <text x="165" y="28" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">FAT TIP (OLD DEFAULT)</text>
  <rect x="40" y="48" width="250" height="180" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="165" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11">CONTENT ID</text>
  <text x="165" y="100" text-anchor="middle" fill="#ebdbb2" font-size="11">CLOCK</text>
  <text x="165" y="122" text-anchor="middle" fill="#ebdbb2" font-size="11">DEVICE</text>
  <line x1="60" y1="140" x2="270" y2="140" stroke="#504945" stroke-width="1"/>
  <text x="165" y="164" text-anchor="middle" fill="#fb4934" font-size="10">SIGNATURE</text>
  <text x="165" y="182" text-anchor="middle" fill="#fb4934" font-size="10">PUBKEY</text>
  <text x="165" y="200" text-anchor="middle" fill="#fb4934" font-size="10">PROVENANCE&hellip;</text>
  <text x="165" y="248" text-anchor="middle" fill="#928374" font-size="10">crypto on every field tip</text>

  <line x1="330" y1="40" x2="330" y2="250" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="495" y="28" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">THIN TIP (NOW)</text>
  <rect x="370" y="48" width="250" height="100" fill="url(#poche)" stroke="#83a598" stroke-width="1.5"/>
  <text x="495" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11">CONTENT ID</text>
  <text x="495" y="100" text-anchor="middle" fill="#ebdbb2" font-size="11">CLOCK + DEVICE</text>
  <text x="495" y="122" text-anchor="middle" fill="#83a598" font-size="10">(+ optional PREV LINK)</text>
  <text x="495" y="180" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1">POINTERS ONLY</text>
  <text x="495" y="200" text-anchor="middle" fill="#928374" font-size="10">values live in content rows</text>
  <text x="495" y="248" text-anchor="middle" fill="#928374" font-size="10">trust at the channel, not every tip</text>
</svg>`;

// Fig 2 — tip version chain
const TIP_CHAIN = `${SVG_OPEN('0 0 660 240')}
  <text x="330" y="28" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">PER-SLOT TIP VERSION CHAIN</text>

  <rect x="40" y="60" width="160" height="70" fill="url(#poche)" stroke="#83a598" stroke-width="1.5"/>
  <text x="120" y="88" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">HEAD TIP</text>
  <text x="120" y="108" text-anchor="middle" fill="#928374" font-size="10">current content id</text>

  <line x1="200" y1="95" x2="250" y2="95" stroke="#928374" stroke-width="1"/>
  <polygon points="252,95 243,91 243,99" fill="#928374"/>
  <text x="226" y="82" text-anchor="middle" fill="#83a598" font-size="9">PREV</text>

  <rect x="252" y="60" width="160" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="332" y="88" text-anchor="middle" fill="#ebdbb2" font-size="11">ARCHIVE</text>
  <text x="332" y="108" text-anchor="middle" fill="#928374" font-size="10">prior tip version</text>

  <line x1="412" y1="95" x2="462" y2="95" stroke="#928374" stroke-width="1"/>
  <polygon points="464,95 455,91 455,99" fill="#928374"/>
  <text x="438" y="82" text-anchor="middle" fill="#83a598" font-size="9">PREV</text>

  <rect x="464" y="60" width="160" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="544" y="88" text-anchor="middle" fill="#ebdbb2" font-size="11">ARCHIVE</text>
  <text x="544" y="108" text-anchor="middle" fill="#928374" font-size="10">earlier still</text>

  <text x="330" y="170" text-anchor="middle" fill="#928374" font-size="11">as-of walks the chain until the clock is old enough</text>
  <text x="330" y="192" text-anchor="middle" fill="#928374" font-size="10">each node is a pointer + clock &mdash; not a full value copy</text>
  <text x="330" y="220" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">REAL HISTORY WITHOUT A FAT EVENT LOG</text>
</svg>`;

// Fig 3 — where bytes go (conceptual bars)
const WHERE_BYTES = `${SVG_OPEN('0 0 660 260')}
  <text x="330" y="28" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">WHERE LIVE BYTES GO (CONCEPTUAL)</text>

  <text x="40" y="70" fill="#ebdbb2" font-size="11">VALUES</text>
  <rect x="140" y="54" width="440" height="28" fill="url(#poche)" stroke="#83a598" stroke-width="1.5"/>
  <text x="360" y="73" text-anchor="middle" fill="#ebdbb2" font-size="11">content rows &mdash; the bodies you wrote</text>

  <text x="40" y="120" fill="#ebdbb2" font-size="11">TIPS</text>
  <rect x="140" y="104" width="310" height="28" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="295" y="123" text-anchor="middle" fill="#ebdbb2" font-size="11">current pointers (now thin)</text>

  <text x="40" y="170" fill="#ebdbb2" font-size="11">INDEXES</text>
  <rect x="140" y="154" width="240" height="28" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="260" y="173" text-anchor="middle" fill="#ebdbb2" font-size="11">scan / sample helpers</text>

  <text x="40" y="220" fill="#ebdbb2" font-size="11">VERSIONS</text>
  <rect x="140" y="204" width="40" height="28" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="280" y="223" fill="#83a598" font-size="10">tip archives &mdash; small, grow with overwrites</text>

  <text x="330" y="252" text-anchor="middle" fill="#928374" font-size="10">no always-on mutation event stream on the hot path</text>
</svg>`;

export default function BlogThinTipsAndHonestHistory() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Thin Tips and Honest History - LastDB</title>
        <meta
          name="description"
          content="We slimmed how LastDB stores current field pointers, stopped writing a fat mutation log by default, and kept real per-field history as a small tip-version chain. Same reads and multi-device LWW; less bulk for free."
        />
        <meta property="og:title" content="Thin Tips and Honest History" />
        <meta
          property="og:description"
          content="Pointers got thinner, the always-on event log went away, and as-of history became a linked chain of tip versions. How we simplified storage without dropping the product."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/thin-tips-and-honest-history" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">Thin Tips and Honest History</h1>
      <p className="post-meta dim">2026-07-16</p>

      <p className="bold white">
        Current values still win by last-writer-wins. Time travel still walks history when you need it.
        What changed is what we refuse to store on every write &mdash; and what we keep instead of a second, fatter log.
      </p>

      <p>
        LastDB is a local-first store: apps declare shapes, write fields, read current records, and
        optionally reconcile with peers. Under the hood, each field value is content-addressed
        (immutable bodies) and reached through a <span className="bold white">tip</span> &mdash; a
        small pointer that says &ldquo;this record key is currently this content id, written at this
        clock, by this device.&rdquo; For a long time, that pointer was not small. And next to it
        grew a second structure: an always-on mutation event log that could rival the tips in bulk.
      </p>

      <p>
        We just spent a focused pass simplifying both. The apps we build on LastDB &mdash; a
        knowledge base and a kanban board among them &mdash; kept working. The product surface
        (mutation, query, multi-device last-writer-wins) stayed. The on-disk story got more honest.
      </p>

      <h2>What we were carrying</h2>

      <p>
        A tip answers one question: <em>what is current for this field key?</em> The answer only
        needs a content id, a clock, and a device identity for ties. We were also serializing
        per-tip crypto and provenance on the default write path. On a real working database that
        meant on the order of a hundred-plus megabytes of tip payload alone &mdash; not values,
        just pointers dressed as certificates.
      </p>

      <p>
        Separately, every mutation could append a history event: a fat JSON row with old and new
        content ids, field keys, timestamps, and leftover signature fields often empty. That log
        powered as-of rewinds, but it was paid for on every write whether you needed deep time
        travel or not. After a purge it grew back as soon as the app kept writing.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">The lesson we kept repeating</span>
        </h2>
        <p>
          Storage cost is a product decision. If the default path pays for features almost nobody
          uses on every keystroke, the live database slowly becomes an archive of machinery, not
          of user data.
        </p>
      </Section>

      <h2>Simplification one: thin tips</h2>

      <p>
        Tips on the default write path are now <span className="bold white">thin</span>: content
        id, write clock, device id &mdash; and an optional link used for history (below). Signature
        and pubkey fields stay readable for older on-disk rows (dual-read) but are no longer emitted
        on ordinary local writes. Trust for sync remains at the account and channel layer; we do
        not re-prove every field tip on every read.
      </p>

      <ArchFigure svg={FAT_VS_THIN} caption="Fig. 1 — Fat tip vs thin tip" />

      <p>
        Migration rewrote legacy fat tips in place under the same keys. No freeze: readers already
        accepted both shapes; writers emitted thin only. On a real multi-hundred-megabyte main tree,
        tip bulk dropped by tens of megabytes of live payload the moment the rewrite finished.
        Host file size is a different story (compaction is still a separate project) &mdash; but
        live logical size and every new write got cheaper immediately.
      </p>

      <h2>Simplification two: stop the always-on event log</h2>

      <p>
        We stopped writing the mutation-event stream on the default path. Current reads never needed
        it: they follow tip &rarr; content. If you only want latest, the log was pure tax.
      </p>

      <p>
        We also made purge honest. &ldquo;Keep latest&rdquo; used to mean &ldquo;keep one history
        row per key,&rdquo; which left almost the entire log in place when depth was already one.
        Purge with keep-last zero deletes the event rows entirely. After that, new writes do not
        refill them.
      </p>

      <h2>Simplification three: honest history as a tip chain</h2>

      <p>
        One-step &ldquo;previous content id on the tip&rdquo; is not enough for real as-of. If you
        want history, you want a chain. So on overwrite we now archive the previous tip head as its
        own small version node and point the new head at it:
      </p>

      <ArchFigure svg={TIP_CHAIN} caption="Fig. 2 — Per-slot tip version chain" />

      <p>
        That chain is <span className="bold white">per record key</span>, not a snapshot of the
        whole field. Each node is still pointer-sized: content id, clock, device, previous version
        id. Content bodies stay in content rows. As-of walks the chain until the clock is old
        enough. Multi-device last-writer-wins still compares the head tip&rsquo;s clock triple; the
        chain rides along with the winning head.
      </p>

      <p>
        Features kept: current reads, LWW merge, optional deep as-of per key. Features we stopped
        paying for by default: crypto-on-every-tip, and a second fat event log that duplicated the
        same story in a bulkier format.
      </p>

      <h2>What the live footprint looks like</h2>

      <p>
        After the pass, a working primary database told a clearer story about itself. Logical main
        tree on the order of a quarter gigabyte of live keys: roughly two-fifths content bodies,
        about a third current tips (now thin), most of the rest scan/sample indexes for keyed
        fields. Tip version archives started small and grow only when you overwrite. The host file
        can still look multi-gigabyte because free space inside the store file is not punched out
        on every delete &mdash; that is freelist reality, not a return of fat tips.
      </p>

      <ArchFigure svg={WHERE_BYTES} caption="Fig. 3 — Conceptual live-byte layout after simplification" />

      <Section variant="rose">
        <h2>
          <span className="bold">What we did not claim</span>
        </h2>
        <p>
          We did not invent a free lunch. Indexes for listing and sampling still cost real keys.
          Content is still the largest single value class when fields are large. Compacting the
          on-disk file to match live logical size is still a separate job. We did remove default
          costs that were not buying product on the hot path.
        </p>
      </Section>

      <h2>How we cut over without drama</h2>

      <p>
        The pattern was boring on purpose: dual-read old and new tip shapes, write only the new
        shape, rewrite existing fat tips under the same keys, prove the candidate binary on a
        throwaway copy of real data, then swap the primary binary with a durable backup in hand.
        No write freeze. Apps kept calling the same mutation and query APIs. If something had
        failed the probe, the live node would still be on the previous binary.
      </p>

      <h2>Why this is the LastDB posture</h2>

      <p>
        Local-first only works if the laptop stays the place of truth under load. Every always-on
        byte competes with that. Thin tips and tip-version history are the same idea as schema
        evolution we have written about before: expand what the product needs, subtract what the
        default path no longer earns.
      </p>

      <p>
        The database still stores current field values. It still reconciles peers by last writer.
        It still can answer &ldquo;what was this key before?&rdquo; by walking a real chain. It just
        stops pretending every tip needs a ceremony and every write needs a second diary entry.
      </p>

      <p className="dim">
        Related: <Link to="/blog/the-fix-was-subtraction">The Fix Was Subtraction</Link>,{' '}
        <Link to="/blog/machinery-listening-to-silence">Machinery Listening to Silence</Link>, and{' '}
        <Link to="/apps">apps we run on LastDB</Link>.
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
