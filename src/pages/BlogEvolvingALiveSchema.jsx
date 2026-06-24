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
        <title>Upgrading a field, no migration required - LastDB</title>
        <meta name="description" content="We added structured fields to our Kanban app's data model while it was in active use. On most databases that's a migration — a schema change, a maintenance window, a backfill. On LastDB it required no database change and no migration at all, because the app owns its schema and the database adapts to it." />
        <meta property="og:title" content="Upgrading a field, no migration required" />
        <meta property="og:description" content="How we evolved our app's data model on LastDB with zero database changes, zero migrations, and zero downtime." />
        <link rel="canonical" href="https://thelastdb.com/blog/evolving-a-live-schema" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Upgrading a field, no migration required</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">We just upgraded a core piece of our Kanban app&rsquo;s data model &mdash; turning facts that used to live in free text into real, structured fields &mdash; while the app was in active use. On most databases that&rsquo;s a migration: a schema change, a maintenance window, a backfill script. Here it was none of those. <span className="white">We changed the app. The database didn&rsquo;t change at all.</span></p>

      <p>We build LastDB using two of our own apps that run on it: <span className="bold">Brain</span> and <span className="bold">Kanban</span>, the task board our agents pull work from. Kanban had grown a habit of stuffing important facts &mdash; which repo a task targets, whether it&rsquo;s blocked, how urgent it is &mdash; into the free-text body of each card. We wanted those to be first-class <span className="bold">fields</span>. The interesting part is what that upgrade did <em>not</em> require.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The app owns its schema</h2>
      <p>In LastDB, the shape of your data is declared by the <span className="bold">app</span>, not hand-built into the database as tables you then have to alter. The database stores records against whatever shape the app declares. So &ldquo;add a field&rdquo; is fundamentally an <span className="bold">app-level change</span> &mdash; Kanban declares a richer card &mdash; not a database operation you schedule and babysit.</p>

      <ArchFigure svg={OWNERSHIP} caption="Fig. 1 — the app declares the shape; the database stores against it" />

      <Section variant="sage">
        <h2><span className="bold">What the upgrade actually was</span></h2>
        <p>Kanban&rsquo;s card went from 10 fields to 18. To make that real, the app declared the new, wider shape &mdash; a <span className="bold">superset</span> of the old one. LastDB recognized it as the next version of the same card and <span className="bold">expanded</span> it: the 10 existing fields keep pointing at the data already on disk, and the 8 new fields are simply empty until something writes them.</p>
        <p>No <code>ALTER TABLE</code>. No backfill job. No maintenance window. Nothing to roll back. We checked the obvious way &mdash; counting the live cards before and after &mdash; and it was identical, down to the row.</p>
      </Section>

      <ArchFigure svg={EXPANSION} caption="Fig. 2 — expansion: existing fields keep their data, new fields start empty" />

      <p>That&rsquo;s the whole point of an app-owned schema: evolving your data model is a property of shipping a new version of the <em>app</em>, not a database project with its own runbook.</p>

      <h2>No flag day, either</h2>
      <p>Here&rsquo;s the part that surprised even us. Because LastDB happily serves <span className="bold">both</span> the old and the new card shape at the same time, we didn&rsquo;t need a coordinated cutover. The new app code rolled out gradually, and while it did, old and new versions were reading and writing the same board side by side &mdash; the old code working with its 10 fields, the new code with all 18, against the same data, with no errors and no flag day.</p>

      <ArchFigure svg={ROLLOUT} caption="Fig. 3 — both app versions serve the same board during a rollout" />

      <p>An older writer just doesn&rsquo;t set the new fields; a newer one does. The new fields fill in naturally as the new version takes over. There&rsquo;s no moment where the system is half-migrated and brittle, because there&rsquo;s no migration to be halfway through.</p>

      <h2>Why this matters</h2>
      <p>The cost of changing a data model is one of the quiet taxes on building software: it turns a one-line product idea (&ldquo;tasks should have a priority&rdquo;) into a migration, a deploy plan, and a held breath. LastDB&rsquo;s model &mdash; the app declares its schema, the database adapts, both versions coexist &mdash; collapses that back down to what it should be: <span className="bold">an app change.</span> The same local-first, you-own-your-data philosophy behind LastDB is why evolving the data on top of it doesn&rsquo;t drag the database into it.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
