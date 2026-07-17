import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for the load-bearing idea). Inline SVG — no auto-layout.
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

// 1 — the three steps, and the gate on the way into the registry.
const THREE_STEPS = `${SVG_OPEN('0 0 660 322')}
  <rect x="44" y="40" width="160" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="124" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">1 · CHECK</text>
  <text x="124" y="82" text-anchor="middle" fill="#928374" font-size="10">asks your own node</text>

  <rect x="204" y="66" width="4" height="4" fill="#928374"/>
  <line x1="208" y1="68" x2="248" y2="68" stroke="#928374" stroke-width="1"/>
  <rect x="248" y="66" width="4" height="4" fill="#928374"/>
  <text x="228" y="30" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="1">NOVEL?</text>

  <rect x="252" y="40" width="160" height="56" fill="none" stroke="#928374" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="332" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">2 · REGISTER</text>
  <text x="332" y="82" text-anchor="middle" fill="#928374" font-size="10">only the novel shapes</text>

  <rect x="412" y="66" width="4" height="4" fill="#928374"/>
  <line x1="416" y1="68" x2="456" y2="68" stroke="#928374" stroke-width="1"/>
  <rect x="456" y="66" width="4" height="4" fill="#928374"/>
  <text x="436" y="30" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="1">COVERED</text>

  <rect x="460" y="40" width="160" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="540" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">3 · PUBLISH</text>
  <text x="540" y="82" text-anchor="middle" fill="#928374" font-size="10">signed by your dev key</text>

  <rect x="538" y="96" width="4" height="4" fill="#83a598"/>
  <line x1="540" y1="100" x2="540" y2="164" stroke="#83a598" stroke-width="1"/>
  <line x1="528" y1="132" x2="552" y2="132" stroke="#83a598" stroke-width="1"/>
  <text x="522" y="136" text-anchor="end" fill="#83a598" font-size="10" letter-spacing="1">THE GATE — NO NOVEL SHAPES PASS</text>
  <line x1="540" y1="164" x2="330" y2="164" stroke="#83a598" stroke-width="1"/>
  <rect x="538" y="162" width="4" height="4" fill="#83a598"/>
  <line x1="330" y1="164" x2="330" y2="200" stroke="#83a598" stroke-width="1"/>
  <polygon points="330,206 326,197 334,197" fill="#83a598"/>

  <rect x="180" y="208" width="300" height="60" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="234" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">THE REGISTRY</text>
  <text x="330" y="252" text-anchor="middle" fill="#ebdbb2" font-size="10">signed rows only — no seed data</text>

  <line x1="180" y1="284" x2="180" y2="298" stroke="#928374" stroke-width="1"/>
  <line x1="480" y1="284" x2="480" y2="298" stroke="#928374" stroke-width="1"/>
  <line x1="180" y1="291" x2="480" y2="291" stroke="#928374" stroke-width="1"/>
  <text x="330" y="314" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">EVERY ROW ARRIVED THROUGH THE SAME DOOR</text>
</svg>`;

// 2 — a registry row is a disclosure: identity, publisher, schema manifest.
const THE_ROW = `${SVG_OPEN('0 0 660 252')}
  <rect x="44" y="44" width="290" height="152" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="60" y="72" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ONE REGISTRY ROW</text>
  <line x1="60" y1="84" x2="318" y2="84" stroke="#504945" stroke-width="1"/>
  <text x="60" y="106" fill="#928374" font-size="10" letter-spacing="1">APP ID</text>
  <text x="318" y="106" text-anchor="end" fill="#ebdbb2" font-size="10">first write wins</text>
  <text x="60" y="130" fill="#928374" font-size="10" letter-spacing="1">PUBLISHER</text>
  <text x="318" y="130" text-anchor="end" fill="#ebdbb2" font-size="10">key-backed signature</text>
  <text x="60" y="154" fill="#83a598" font-size="10" letter-spacing="1">SCHEMA MANIFEST</text>
  <text x="318" y="154" text-anchor="end" fill="#83a598" font-size="10">the shapes it touches</text>
  <text x="60" y="178" fill="#928374" font-size="10" letter-spacing="1">TIER</text>
  <text x="318" y="178" text-anchor="end" fill="#ebdbb2" font-size="10">sandbox &#8594; live</text>

  <rect x="334" y="118" width="4" height="4" fill="#928374"/>
  <line x1="338" y1="120" x2="392" y2="120" stroke="#928374" stroke-width="1"/>
  <rect x="392" y="118" width="4" height="4" fill="#928374"/>

  <rect x="396" y="52" width="220" height="140" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <line x1="412" y1="88" x2="600" y2="88" stroke="#504945" stroke-width="1"/>
  <line x1="412" y1="120" x2="600" y2="120" stroke="#504945" stroke-width="1"/>
  <line x1="412" y1="152" x2="600" y2="152" stroke="#504945" stroke-width="1"/>
  <text x="506" y="76" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE REGISTRY</text>
  <text x="506" y="110" text-anchor="middle" fill="#928374" font-size="10">row · row · row</text>

  <line x1="44" y1="212" x2="44" y2="226" stroke="#83a598" stroke-width="1"/>
  <line x1="334" y1="212" x2="334" y2="226" stroke="#83a598" stroke-width="1"/>
  <line x1="44" y1="219" x2="334" y2="219" stroke="#83a598" stroke-width="1"/>
  <text x="189" y="242" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">THE LABEL IS THE DISCLOSURE</text>
</svg>`;

export default function BlogTheRegistryStartsEmpty() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Registry Starts Empty - LastDB</title>
        <meta name="description" content="LastDB now has an app registry, and it launched with zero rows in it — on purpose. An app can only appear by walking the real registration path: check your schemas against the catalog, register the novel ones, then publish. Anything hand-inserted would be a lie the system can't catch." />
        <meta property="og:title" content="The Registry Starts Empty" />
        <meta property="og:description" content="A registry row can only exist because a real registration produced it. The empty shelf is the test suite: if our own apps can't get in through the front door, that's a bug in the door — not a reason to use the loading dock." />
        <link rel="canonical" href="https://thelastdb.com/blog/the-registry-starts-empty" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Registry Starts Empty</h1>
      <p className="post-meta dim">2026-07-16</p>

      <p className="bold white">Every app store opens the same way: with a seeded shelf. Somebody inserts the first dozen rows by hand so the place doesn&rsquo;t look abandoned, and from that day forward the registry contains two kinds of entries &mdash; the ones the system produced, and the ones somebody typed. LastDB&rsquo;s app registry launched this week with <span className="white">zero rows in it</span>, and that was the design. A row can only exist because a real registration produced it. <span className="white">The empty shelf is the test suite.</span></p>

      <h2>What the registry is</h2>

      <p>LastDB apps &mdash; the calendar, the kanban board, the knowledge base, yours &mdash; are programs that keep their data in <em>your</em> database rather than a vendor&rsquo;s cloud. (If that sentence is new to you, start with <Link to="/blog/how-an-app-runs-on-lastdb">How an App Runs on LastDB</Link>.) The registry is where those apps get published so other people can find them: look one up, see who ships it, see what it does, and &mdash; the part we care most about &mdash; see <span className="bold white">exactly what shapes of your data it touches</span>, before it ever touches them.</p>

      <p>That last part is the point. A conventional app store describes an app with marketing copy. A LastDB registry row describes an app with its <span className="bold">schema manifest</span>: the concrete, catalog-registered shapes it reads and writes. The description can exaggerate. The manifest can&rsquo;t &mdash; it&rsquo;s the same declaration the database itself enforces.</p>

      <ArchFigure svg={THE_ROW} caption="Fig. 1 — a registry row is a disclosure, not an advertisement" />

      <h2>Three steps in, no exceptions</h2>

      <p>Publishing is a CLI flow &mdash; <span className="bold">lastdb app</span> &mdash; and it has exactly three steps:</p>

      <ol>
        <li><span className="bold white">Check.</span> <span className="bold">lastdb app check</span> takes your app&rsquo;s manifest and asks your own node which of its schemas the shared catalog already covers. Most of the time the answer is: more than you&rsquo;d think. Shapes get reused or composed out of existing pieces &mdash; the same resolution machinery we described in <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> &mdash; and anything covered needs no further ceremony.</li>
        <li><span className="bold white">Register.</span> Whatever the catalog genuinely doesn&rsquo;t know &mdash; the novel shapes &mdash; gets registered with <span className="bold">lastdb app register-schemas</span>. Each new field wants a description, because the catalog matches shapes semantically, not just by name. This is the only step that adds anything new to the world, and it&rsquo;s deliberately the narrow one.</li>
        <li><span className="bold white">Publish.</span> <span className="bold">lastdb app publish</span> mints a short-lived certificate against your developer account, signs the app record with your key, and writes it into the registry. First write wins the name. Re-publishing your own app is idempotent; publishing into somebody else&rsquo;s name is a 409.</li>
      </ol>

      <ArchFigure svg={THREE_STEPS} caption="Fig. 2 — check, register, publish — and the gate in front of the shelf" />

      <Section variant="rose">
        <h2><span className="bold">The gate: no novel shapes pass</span></h2>
        <p>Publish has one hard rule, and it fails closed: <span className="bold white">if any schema in your manifest is not a catalog identity, the publish is rejected</span> &mdash; with the name of the offending shape and the instruction to register it first. No network call is made on your behalf; nothing half-lands. The rule exists because the schema manifest is the registry&rsquo;s honesty guarantee. The moment one unregistered shape slips through, &ldquo;see what this app touches&rdquo; becomes &ldquo;see what this app admitted to,&rdquo; and the whole disclosure model quietly dies.</p>
      </Section>

      <h2>Why zero seed rows</h2>

      <p>Here is the uncomfortable question every registry has to answer: <em>how do you know registration works?</em> If you seed the shelf by hand, you don&rsquo;t. The seeded rows look identical to real ones, the listing page fills up, everyone moves on &mdash; and the first outside developer to try the front door discovers it was never actually opened.</p>

      <p>So we inverted it. The registry&rsquo;s population <em>is</em> its acceptance test. Our own apps &mdash; the ones we build LastDB with every day &mdash; have to walk the same three steps as anyone else&rsquo;s, and when one of them can&rsquo;t get through, <span className="bold white">that&rsquo;s a bug in the door, not a reason to use the loading dock</span>. We fix the registration path and try again. A shelf that fills up slowly and honestly beats one that fills up instantly and means nothing.</p>

      <Section variant="sage">
        <h2><span className="bold">What the door taught us on day one</span></h2>
        <p>Dogfooding the flow immediately earned its keep. The catalog refused a novel shape whose fields lacked descriptions &mdash; correct, and now documented. And we found a timing seam: a schema registered seconds ago is a catalog identity <em>at the service</em> before your node&rsquo;s local resolver has caught up, so the gate now re-checks the source of truth rather than trusting the lagging local view &mdash; and still fails closed if it can&rsquo;t. Neither lesson would have surfaced from a seeded shelf.</p>
      </Section>

      <h2>Browsing the shelf</h2>

      <p><span className="bold">lastdb app list</span> shows what&rsquo;s published; <span className="bold">lastdb app info &lt;app&gt;</span> shows one app&rsquo;s full row &mdash; publisher, registration date, tier, and the schema manifest. New registrations land in a <span className="bold">sandbox</span> tier and graduate to <span className="bold">live</span>; the shelf distinguishes &ldquo;present&rdquo; from &ldquo;promoted&rdquo; so early apps are findable without being endorsed.</p>

      <p>The registry is young &mdash; publishing runs against our dev environment while the flow hardens, and the long-term shape (install counts, stars, and recommending apps by which of <em>your</em> schemas they know how to read) is still ahead of it. But the foundation rule is already load-bearing and won&rsquo;t change: <span className="bold white">every row arrived through the same door.</span> When the shelf fills up, you&rsquo;ll be able to believe it.</p>

      <p className="dim">Related: <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> on how schema resolution works, and <Link to="/blog/how-an-app-runs-on-lastdb">How an App Runs on LastDB</Link> for the app model itself.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
