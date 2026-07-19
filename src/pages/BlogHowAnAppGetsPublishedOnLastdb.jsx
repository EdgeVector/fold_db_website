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

export default function BlogHowAnAppGetsPublishedOnLastdb() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>How an App Gets Published on LastDB - LastDB</title>
        <meta name="description" content="LastDB's app registry launched with zero rows in it. Apps appear only by completing the real registration flow — check, publish, register, promote — and the gate at promote rejects any manifest that still carries an unregistered shape, by name, before the promote request leaves your machine." />
        <meta property="og:title" content="How an App Gets Published on LastDB" />
        <meta property="og:description" content="Why the LastDB app registry launched with zero rows: a registry row is a schema-manifest disclosure, and a gate at promote keeps unregistered shapes off the visible shelf." />
        <link rel="canonical" href="https://thelastdb.com/blog/how-an-app-gets-published-on-lastdb" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">How an App Gets Published on LastDB</h1>
      <p className="post-meta dim">2026-07-17</p>

      <p className="bold white">LastDB&rsquo;s app registry launched this week with <span className="white">zero rows in it</span>, and that was the design: a row can only exist because a real registration produced it. App stores usually open the other way &mdash; a seeded shelf, the first dozen rows typed in by hand so the place doesn&rsquo;t look abandoned, and from that day forward two kinds of entries, the ones the system produced and the ones somebody typed. <span className="white">The empty shelf is the test suite.</span></p>

      <p>The first useful thing the registry did was refuse us. We tried to skip a step &mdash; promote our demo app onto the visible shelf while two of its shapes were still unregistered &mdash; and the refusal is worth reading in full: <code>error: promote rejected: novel schemas present (PantryItem, RestockRule) &mdash; register them first with `lastdb app register-schemas`</code>. Rejected by name, with the instruction that fixes it, before the promote request leaves your machine. The row stayed off the live shelf. The rest of this post is the flow that ends at that gate.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Why zero seed rows</h2>

      <p>How do you know registration works? If you seed the shelf by hand, you don&rsquo;t. The seeded rows look identical to real ones, the listing fills up, everyone moves on &mdash; and the first outside developer to try the front door discovers it was never actually opened. On launch day, <span className="bold">lastdb app list</span> returned zero rows. Zero was the correct reading: nothing had registered yet, and nothing had been typed in to disguise that.</p>

      <p>Our own apps get no shortcut. They walk the same flow as anyone else&rsquo;s, and when one of them can&rsquo;t get through, we treat that as a bug in the registration path and fix it before the shelf grows.</p>

      <h2>What a row discloses</h2>

      <p>LastDB apps (the calendar, the kanban board, the knowledge base, yours) keep their data in <em>your</em> database rather than a vendor&rsquo;s cloud, and the registry is where they get published so other people can find them. A conventional app store describes an app with marketing copy. A registry row here answers with the app&rsquo;s <span className="bold">schema manifest</span> (Fig. 1): the concrete, catalog-registered shapes it reads and writes, visible before the app ever touches your data. The description can exaggerate. The manifest can&rsquo;t &mdash; it is the same declaration the database enforces. Which is why the gate fails closed: a manifest is only useful complete, and the moment one unregistered shape slips through, &ldquo;see what this app touches&rdquo; becomes &ldquo;see what this app admitted to.&rdquo;</p>

      <ArchFigure svg={THE_ROW} caption="Fig. 1 — the fields of a registry row: id, publisher, manifest, tier" />

      <h2>Four steps to the shelf</h2>

      <p>Publishing is a CLI flow, <span className="bold">lastdb app</span>, with four verbs:</p>

      <ol>
        <li><span className="bold white">Check.</span> <span className="bold">lastdb app check</span> takes your app&rsquo;s manifest and asks your own node which of its schemas the shared catalog already covers, then prints a verdict per schema. The catalog may fold your proposal into a shape it already knows &mdash; the resolution behavior described in <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> &mdash; and anything covered needs no further ceremony.</li>
        <li><span className="bold white">Publish.</span> <span className="bold">lastdb app publish</span> mints a short-lived certificate against your developer account, signs the app record with your key, and reserves the name as a <span className="bold">sandbox</span> row. Ours answered <code>published (created): {'{'} &quot;app_id&quot;: &quot;pantry&quot;, &quot;tier&quot;: &quot;sandbox&quot;, ... {'}'}</code> and the name was taken. First write wins the name; publishing the same app twice is an idempotent no-op, not an error.</li>
        <li><span className="bold white">Register.</span> Whatever the catalog genuinely doesn&rsquo;t know gets registered with <span className="bold">lastdb app register-schemas</span>. Each new field requires a description, and the command refuses a novel shape without one. This is the only step that adds entries to the shared catalog, and it is deliberately the narrow one.</li>
        <li><span className="bold white">Promote.</span> <span className="bold">lastdb app promote</span> moves the row from sandbox to <span className="bold">live</span>, the tier the shelf features. This is the step that refused us at the top of the post.</li>
      </ol>

      <p>Fig. 2 draws the path as its three movements &mdash; check what&rsquo;s covered, register what&rsquo;s novel, and a signed, gated write to the shelf. The CLI splits that last movement into publish and promote, and how the split came to be is the next post&rsquo;s story.</p>

      <ArchFigure svg={THREE_STEPS} caption="Fig. 2 — the path in three movements: one gate between registration and the shelf" />

      <Section variant="sage">
        <h2><span className="bold">The gate, kept under test</span></h2>
        <p>The refusal at the top of this post is now a regression assertion. An automated dogfood rotation replays the same premature promote on every run, and the assertion has two halves: the rejection string must appear, naming the still-novel shapes, and no promote call may reach the wire before it. Both halves have to hold for the run to pass.</p>
      </Section>

      <h2>Sandbox first, then live</h2>

      <p><span className="bold">lastdb app list</span> shows the shelf; <span className="bold">lastdb app info &lt;app&gt;</span> shows one row in full: publisher, tier, and the schema manifest. While our demo row was still a reservation, the list read <code>pantry&nbsp;&nbsp;Sandbox&nbsp;&nbsp;Pantry&nbsp;&nbsp;Tracks what&#39;s in your kitchen: items, quantities, expiry dates, and restock rules.</code> &mdash; present and findable, not endorsed. After promote, the response ends <code>&hellip; &quot;tier&quot;: &quot;live&quot;, &quot;uses&quot;: [] {'}'}</code>.</p>

      <Section variant="rose">
        <h2><span className="bold">Still hardening</span></h2>
        <p>Publishing runs against our dev environment while the flow hardens, and the door still sticks: a later first-party run had <span className="bold">lastdb app check</span> fail with <code>error: failed to read response: Resource temporarily unavailable (os error 35)</code>. The longer-term surface (install counts, stars, recommending apps by which of <em>your</em> schemas they can read) is still ahead of it.</p>
      </Section>

      <h2>What an empty launch buys</h2>

      <p>Nothing reaches the shelf except through the flow above: under a developer key, past the promote gate, one completed walk per row. The population of the shelf is the running total of successful registrations, zero included, and when the number moves, the path moved it. That made the first walk worth taking seriously, and we took it ourselves &mdash; fresh key, an app the catalog had never seen, no shortcuts. It did not go smoothly.</p>

      <p className="dim">Related: <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> on how schema resolution works, and <Link to="/blog/how-an-app-runs-on-lastdb">How an App Runs on LastDB</Link> for the app model itself.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
