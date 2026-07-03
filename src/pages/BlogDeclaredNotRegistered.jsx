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
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// 1 — two roads (declare locally / register centrally) reach ONE canonical name,
// because the name is a fingerprint of the shape.
const CONVERGE = `${SVG_OPEN('0 0 660 268')}
  <rect x="34" y="34" width="212" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="140" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">AN APP, LOCALLY</text>
  <text x="140" y="78" text-anchor="middle" fill="#928374" font-size="10">declares its schema to its node</text>

  <rect x="414" y="34" width="212" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="520" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE REGISTRY</text>
  <text x="520" y="78" text-anchor="middle" fill="#928374" font-size="10">registers the same schema</text>

  <polyline points="140,92 140,150 330,150" fill="none" stroke="#928374" stroke-width="1"/>
  <polyline points="520,92 520,150 330,150" fill="none" stroke="#928374" stroke-width="1"/>
  <line x1="330" y1="150" x2="330" y2="182" stroke="#928374" stroke-width="1"/>
  <rect x="138" y="148" width="4" height="4" fill="#928374"/>
  <rect x="518" y="148" width="4" height="4" fill="#928374"/>
  <rect x="328" y="148" width="4" height="4" fill="#83a598"/>
  <text x="344" y="142" fill="#928374" font-size="10" letter-spacing="1">CONTENT-ADDRESSED</text>

  <rect x="200" y="184" width="260" height="60" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="209" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ONE CANONICAL NAME</text>
  <text x="330" y="228" text-anchor="middle" fill="#83a598" font-size="11">61b22ab4 &hellip; 925d7c</text>
</svg>`;

// 2 — the node's per-app adapter: the app's chosen name maps to the fingerprint.
const ADAPTER = `${SVG_OPEN('0 0 660 236')}
  <rect x="34" y="80" width="170" height="72" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="119" y="110" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE APP</text>
  <text x="119" y="129" text-anchor="middle" fill="#928374" font-size="10">calls it &ldquo;decision&rdquo;</text>

  <line x1="204" y1="116" x2="286" y2="116" stroke="#928374" stroke-width="1"/>
  <polygon points="288,116 279,112 279,120" fill="#928374"/>
  <text x="245" y="108" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1.5">MINT</text>

  <rect x="290" y="40" width="336" height="156" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="458" y="66" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE NODE &mdash; PER-APP ADAPTER</text>

  <rect x="312" y="86" width="292" height="86" fill="#282828" stroke="#504945" stroke-width="1"/>
  <text x="326" y="108" fill="#928374" font-size="10" letter-spacing="1">THE APP&rsquo;S NAME</text>
  <text x="326" y="132" fill="#ebdbb2" font-size="11">( brain , &ldquo;decision&rdquo; )</text>
  <line x1="326" y1="142" x2="590" y2="142" stroke="#504945" stroke-width="1"/>
  <text x="326" y="160" fill="#83a598" font-size="11">&rarr; 61b22ab4 &hellip; 925d7c</text>
  <text x="512" y="108" fill="#928374" font-size="10" letter-spacing="1">RESOLUTION: MINT</text>
</svg>`;

// 3 — the honest boundary: declared (identity agreed) vs loaded (queryable).
const BOUNDARY = `${SVG_OPEN('0 0 660 220')}
  <rect x="120" y="40" width="420" height="42" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">DECLARED</text>
  <text x="330" y="75" text-anchor="middle" fill="#928374" font-size="10">identity agreed &middot; mapping written</text>

  <rect x="120" y="128" width="420" height="42" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="330" y="148" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LOADED</text>
  <text x="330" y="163" text-anchor="middle" fill="#83a598" font-size="10">materialized into the queryable set</text>

  <line x1="560" y1="40" x2="560" y2="82" stroke="#928374" stroke-width="1"/>
  <line x1="560" y1="128" x2="560" y2="170" stroke="#928374" stroke-width="1"/>
  <line x1="560" y1="82" x2="560" y2="128" stroke="#83a598" stroke-width="1" stroke-dasharray="2 3"/>
  <rect x="558" y="103" width="4" height="4" fill="#83a598"/>
  <text x="576" y="108" fill="#83a598" font-size="10" letter-spacing="0.5">THE LAST INCH</text>
  <text x="330" y="200" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">CLOSING &mdash; SO DECLARATION ALONE SUFFICES</text>
</svg>`;

export default function BlogDeclaredNotRegistered() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Declared, Not Registered - LastDB</title>
        <meta name="description" content="An app shouldn't have to phone a central registry before it can use its own schema. In LastDB, an app declares its schema to its own node — and because a schema's name is a fingerprint of its shape, the locally-minted name is byte-identical to the one a central service would assign. Convergence without coordination." />
        <meta property="og:title" content="Declared, Not Registered" />
        <meta property="og:description" content="The app declares its schema locally; the node mints a content-addressed name; that name matches the central registry's — exactly — without ever calling it. The registrar was never the source of the name. The shape was." />
        <link rel="canonical" href="https://thelastdb.com/blog/declared-not-registered" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Declared, Not Registered</h1>
      <p className="post-meta dim">2026-07-03</p>

      <p className="bold white">A central schema registry is a phone call you have to make before you&rsquo;re allowed to work. Define a new shape, and first you must publish it &mdash; upstream, to a service, and wait for the world to acknowledge the name before your own machine will honor it. We deleted the phone call. An app now declares its schema to its <span className="white">own</span> node, and the name it gets back is <span className="white">exactly</span> the one the central registry would have assigned. Not similar. The same 64 characters.</p>

      <p>The app in question is Brain &mdash; one of two apps we build LastDB with, both running on LastDB. It wanted a new kind of record: a <em>decision</em>, with a handful of real columns. In the old arrangement, declaring that shape meant registering it with a central schema service and waiting for it to propagate before a fresh node would load it. A local idea, gated on a round-trip to a registrar.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The name is the shape</h2>
      <p>The trick is that a schema&rsquo;s canonical name isn&rsquo;t handed down by a registrar &mdash; it is <span className="bold">computed from the schema itself</span>. Field names, types, the structure entire: run it through a hash and you get a 64-character fingerprint. Content-addressed, the way a git commit is named by its content and not by who pushed it. Two people who write byte-identical schemas, on opposite ends of the earth, offline, get byte-identical names &mdash; because the name was never a decision anyone made. It was a fact about the shape.</p>

      <p>So an app can declare its schema <span className="bold">locally</span> &mdash; hand the shape to its own node &mdash; and the registry can register that same schema <span className="bold">centrally</span>, and the two arrive at one name without ever consulting each other. Convergence isn&rsquo;t coordinated. It&rsquo;s a property of the arithmetic.</p>

      <ArchFigure svg={CONVERGE} caption="Fig. 1 — two roads, one name: the fingerprint is a fact about the shape, not a registrar's decree" />

      <Section variant="sage">
        <h2><span className="bold">We watched it converge</span></h2>
        <p>We declared Brain&rsquo;s <span className="bold">decision</span> schema to a live node with the central service deliberately out of the loop. The node minted a canonical name: <span className="bold">61b22ab4&hellip;925d7c</span>. Then we compared it to the fingerprint the central registry computes for the very same shape.</p>
        <p>Identical. To the character. The app had named its schema without permission, and named it correctly &mdash; because there was only ever one correct name, and the shape already contained it.</p>
      </Section>

      <h2>The node keeps a small adapter</h2>
      <p>An app doesn&rsquo;t want to think in 64-hex fingerprints; it wants to call its record a <span className="bold">decision</span>. So the node keeps a tiny per-app table: the app&rsquo;s own name for a schema on one side, the canonical fingerprint on the other. Declaring a schema writes one row into it &mdash; a local <span className="bold">mint</span>. The app speaks its own vocabulary; the node quietly translates every reference into the content-address that the rest of the world would recognize.</p>

      <ArchFigure svg={ADAPTER} caption="Fig. 2 — the node's per-app adapter: the app's chosen name, mapped to the canonical fingerprint it minted" />

      <p>This is what &ldquo;the app owns its schema&rdquo; actually buys you. Ownership isn&rsquo;t a label on a permissions screen &mdash; it&rsquo;s the app being able to <span className="bold">name its own shapes</span>, locally, and still be globally interoperable, because the naming function is shared arithmetic rather than a shared server. No registrar in the hot path. No propagation delay. Nothing to be down.</p>

      <Section variant="rose">
        <h2><span className="bold">The last inch we&rsquo;re still closing</span></h2>
        <p>Honesty, because this is a working system and not a brochure: declaring a schema today establishes its <span className="bold">identity</span> &mdash; the mapping is written, the name agreed. But to actually <em>query</em> against that shape, the node still has to <span className="bold">load</span> it into its live, queryable set, and on current nodes that last step can still lean on the central service to hand over the shape.</p>
        <p>So the fingerprint converges with no phone call; the <span className="bold">query</span> path doesn&rsquo;t, quite, yet. We&rsquo;re closing that gap &mdash; teaching the node to materialize a shape straight from a local declaration &mdash; so that declaring a schema is, end to end, all it takes. Declared should be enough.</p>
      </Section>

      <ArchFigure svg={BOUNDARY} caption="Fig. 3 — declared is the name; loaded is the use; we're closing the inch between them" />

      <h2>Why bother deleting the phone call</h2>
      <p>Because a central registry in the critical path is a coordination point, and coordination points are where systems wait, stall, and go down. Make the name a function of the shape, and the coordination evaporates: every node can name every schema the same way, alone, offline, instantly &mdash; and still agree with every other node in the world. The registrar becomes a convenience, not a gatekeeper. The apps were always the authors of their shapes. Now they get to sign their own work.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB. See also <Link to="/blog/evolving-a-live-schema">Against Migration</Link>, on why the app &mdash; not the database &mdash; owns the shape of its data.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
