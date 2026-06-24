import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for "new"). Rendered as inline SVG so there's no auto-layout.
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
    <pattern id="cells" width="24" height="40" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// 1 — the app declares the shape; the database stores against it.
const OWNERSHIP = `${SVG_OPEN('0 0 660 232')}
  <rect x="220" y="28" width="220" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="54" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">KANBAN — THE APP</text>
  <text x="330" y="72" text-anchor="middle" fill="#928374" font-size="11">declares the shape of a card</text>

  <rect x="328" y="84" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="88" x2="330" y2="144" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="144" width="4" height="4" fill="#928374"/>
  <text x="342" y="119" fill="#928374" font-size="10" letter-spacing="2">SCHEMA</text>

  <rect x="180" y="148" width="300" height="58" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="174" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">LASTDB</text>
  <text x="330" y="192" text-anchor="middle" fill="#ebdbb2" font-size="11">stores records against that shape</text>

  <text x="40" y="44" fill="#83a598" font-size="11" letter-spacing="1.5">+ A NEW FIELD</text>
  <line x1="44" y1="56" x2="218" y2="56" stroke="#83a598" stroke-width="1"/>
  <polygon points="220,56 211,52 211,60" fill="#83a598"/>
  <text x="44" y="73" fill="#928374" font-size="10">changes the app, not the DB</text>
</svg>`;

// 2 — adding fields is an expansion: existing data stays, new fields are void.
const EXPANSION = `${SVG_OPEN('0 0 660 250')}
  <text x="36" y="62" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE</text>
  <text x="36" y="78" fill="#928374" font-size="10">v1 · 10 fields</text>
  <rect x="170" y="44" width="240" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="170" y="44" width="240" height="34" fill="url(#cells)" stroke="#928374" stroke-width="1"/>

  <line x1="170" y1="84" x2="170" y2="128" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="410" y1="84" x2="410" y2="128" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="36" y="150" fill="#ebdbb2" font-size="11" letter-spacing="1.5">AFTER</text>
  <text x="36" y="166" fill="#928374" font-size="10">v2 · 18 fields</text>
  <rect x="170" y="132" width="240" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="170" y="132" width="240" height="34" fill="url(#cells)" stroke="#928374" stroke-width="1"/>
  <rect x="410" y="132" width="192" height="34" fill="url(#cells)" stroke="#83a598" stroke-width="1"/>

  <line x1="170" y1="184" x2="170" y2="198" stroke="#928374" stroke-width="1"/>
  <line x1="410" y1="184" x2="410" y2="198" stroke="#928374" stroke-width="1"/>
  <line x1="170" y1="191" x2="410" y2="191" stroke="#928374" stroke-width="1"/>
  <text x="290" y="216" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">10 EXISTING — SAME DATA ON DISK</text>

  <line x1="410" y1="184" x2="410" y2="198" stroke="#83a598" stroke-width="1"/>
  <line x1="602" y1="184" x2="602" y2="198" stroke="#83a598" stroke-width="1"/>
  <line x1="410" y1="191" x2="602" y2="191" stroke="#83a598" stroke-width="1"/>
  <text x="506" y="216" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">8 NEW — EMPTY UNTIL WRITTEN</text>
</svg>`;

// 3 — both app versions serve the same board at once: no cutover.
const ROLLOUT = `${SVG_OPEN('0 0 660 236')}
  <rect x="270" y="92" width="120" height="68" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="122" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE BOARD</text>
  <text x="330" y="139" text-anchor="middle" fill="#928374" font-size="10">one set of cards</text>

  <rect x="44" y="40" width="132" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="110" y="62" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">APP v1</text>
  <text x="110" y="78" text-anchor="middle" fill="#928374" font-size="10">old fields</text>
  <polyline points="110,88 110,126 268,126" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="266" y="124" width="4" height="4" fill="#928374"/>
  <text x="150" y="120" fill="#928374" font-size="10" letter-spacing="1">reads · writes</text>

  <rect x="484" y="40" width="132" height="48" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="550" y="62" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">APP v2</text>
  <text x="550" y="78" text-anchor="middle" fill="#83a598" font-size="10">+ new fields</text>
  <polyline points="550,88 550,126 392,126" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="390" y="124" width="4" height="4" fill="#83a598"/>
  <text x="430" y="120" text-anchor="end" fill="#928374" font-size="10" letter-spacing="1">reads · writes</text>

  <text x="330" y="194" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">BOTH SHAPES VALID AT ONCE — ROLL OUT GRADUALLY, NO CUTOVER</text>
</svg>`;

export default function BlogEvolvingALiveSchema() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Against Migration - LastDB</title>
        <meta name="description" content="Adding a field to a live system is conventionally a crisis: a window, a script, a rollback plan. We added eight fields to a running application and convened none of it. The database was not consulted. The migration is not a technical necessity — it is a tax levied by databases that confuse storing data with owning its shape." />
        <meta property="og:title" content="Against Migration" />
        <meta property="og:description" content="The application owns the shape of its data. The database stores against it. Remove that confusion and the migration — the window, the script, the apology — simply disappears." />
        <link rel="canonical" href="https://thelastdb.com/blog/evolving-a-live-schema" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Against Migration</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">Adding a field to a live system is, conventionally, a crisis. It demands a window, a script, a rollback plan &mdash; an entire bureaucracy erected around a single admission: that your data and your model have drifted apart, and one must now be dragged to meet the other. We added eight fields to a running application and convened none of it. <span className="white">The database was not consulted. It did not need to be.</span></p>

      <p>The application in question is Kanban &mdash; one of two apps we build LastDB with, both running on LastDB. Its cards had been hoarding meaning in prose: which repository a task targets, whether it is blocked, how urgent. Prose is where structure goes to hide. We promoted those facts to fields. The procedure is unremarkable. Its cost is the entire point: there wasn&rsquo;t one.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Schema belongs to the application</h2>
      <p>A conventional database treats the shape of your data as its own property &mdash; tables poured like concrete, altered only with permits. LastDB does not. The <span className="bold">application</span> declares the shape; the database stores facts against whatever shape it is given. The distinction is not academic. It relocates &ldquo;add a field&rdquo; from a database operation &mdash; scheduled, rehearsed, feared &mdash; to what it always should have been: a line in the app.</p>

      <ArchFigure svg={OWNERSHIP} caption="Fig. 1 — the application declares the form; the database obeys" />

      <Section variant="sage">
        <h2><span className="bold">Ten fields became eighteen</span></h2>
        <p>The application declared the wider form &mdash; a <span className="bold">superset</span>. LastDB recognized it as the same object, larger, and <span className="bold">expanded</span> into it. The original ten fields go on addressing the data already on disk. The eight new ones are empty. Emptiness here is not absence; it is capacity &mdash; space the application may fill, or not.</p>
        <p>No <code>ALTER TABLE</code>. No backfill. No window. Nothing to undo. The maintenance window &mdash; that scheduled apology &mdash; was never opened. We counted the cards before and after. Identical, to the row.</p>
      </Section>

      <ArchFigure svg={EXPANSION} caption="Fig. 2 — ten fields untouched; eight added; nothing migrated" />

      <p>Evolving the model is therefore a property of shipping the application, not a project the database imposes on you, with its own runbook and its own held breath.</p>

      <h2>There was no cutover</h2>
      <p>Because the old form and the new are equally valid at once, there was nothing to cut over to. Two versions of the application addressed one body of data simultaneously, indifferent to one another &mdash; the old confined to its ten fields, the new fluent in all eighteen &mdash; without error, without ceremony.</p>

      <ArchFigure svg={ROLLOUT} caption="Fig. 3 — two versions, one body of data, no cutover" />

      <p>An older writer simply omits the new fields; a newer one supplies them. The new structure accretes as the new version prevails. There is no half-migrated interval in which the system is brittle, because there is no migration to be halfway through.</p>

      <h2>The migration is a tax</h2>
      <p>It is not a technical necessity. It is a tax &mdash; levied by databases that confuse storing data with owning its shape, and paid by everyone downstream in windows, scripts, and dread. A one-line idea (&ldquo;tasks should have a priority&rdquo;) is conscripted into a deploy plan. Remove the confusion &mdash; let the application own the shape, let the database adapt, let both versions coexist &mdash; and the tax does not get cheaper. It ceases to exist. What remains is the only honest unit of change: the deploy.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
