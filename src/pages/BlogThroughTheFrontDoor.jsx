import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figure (draftsman style, shape-vocabulary edition:
// rectangles are processes, a diamond is a decision gate, a cylinder is a
// store; poché hatch = holds real data; legend row at 3+ shape classes).
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

// Terminal transcript block (real output, gruvbox).
function Term({ children }) {
  return (
    <pre style={{ background: '#282828', border: '1px solid #504945', padding: '12px 14px', margin: '0.9em 0', fontSize: '13px', lineHeight: 1.55, overflowX: 'auto' }}>{children}</pre>
  );
}

const SVG_DEFS = `
  <defs>
    <pattern id="poche-door" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// The flow as it shipped: three processes, one gate, one store.
const THE_DOOR = `${SVG_OPEN('0 0 660 344')}
  <rect x="24" y="36" width="140" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="94" y="57" text-anchor="middle" fill="#ebdbb2" font-size="11.5" letter-spacing="1.5">1 &#183; CHECK</text>
  <text x="94" y="74" text-anchor="middle" fill="#928374" font-size="9.5">catalog verdicts</text>
  <rect x="164" y="59" width="4" height="4" fill="#928374"/>
  <line x1="168" y1="61" x2="222" y2="61" stroke="#928374" stroke-width="1"/>
  <rect x="222" y="59" width="4" height="4" fill="#928374"/>
  <rect x="226" y="36" width="140" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="296" y="57" text-anchor="middle" fill="#ebdbb2" font-size="11.5" letter-spacing="1.5">2 &#183; PUBLISH</text>
  <text x="296" y="74" text-anchor="middle" fill="#928374" font-size="9.5">reserve &#183; sandbox</text>
  <rect x="366" y="59" width="4" height="4" fill="#928374"/>
  <line x1="370" y1="61" x2="424" y2="61" stroke="#928374" stroke-width="1"/>
  <rect x="424" y="59" width="4" height="4" fill="#928374"/>
  <rect x="428" y="36" width="208" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="532" y="57" text-anchor="middle" fill="#ebdbb2" font-size="11.5" letter-spacing="1.5">3 &#183; REGISTER-SCHEMAS</text>
  <text x="532" y="74" text-anchor="middle" fill="#928374" font-size="9.5">stored identity &#8594; lockfile</text>

  <rect x="530" y="86" width="4" height="4" fill="#83a598"/>
  <line x1="532" y1="90" x2="532" y2="116" stroke="#83a598" stroke-width="1"/>
  <line x1="532" y1="116" x2="330" y2="116" stroke="#83a598" stroke-width="1"/>
  <line x1="330" y1="116" x2="330" y2="134" stroke="#83a598" stroke-width="1"/>
  <polygon points="330,140 326,131 334,131" fill="#83a598"/>

  <polygon points="330,144 424,186 330,228 236,186" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="181" text-anchor="middle" fill="#ebdbb2" font-size="11.5" letter-spacing="1.5">4 &#183; PROMOTE</text>
  <text x="330" y="199" text-anchor="middle" fill="#83a598" font-size="9.5">any novel shape?</text>

  <line x1="236" y1="186" x2="150" y2="186" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="144" y="180" text-anchor="end" fill="#928374" font-size="9.5">YES &#8594; rejected,</text>
  <text x="144" y="194" text-anchor="end" fill="#928374" font-size="9.5">register it first</text>

  <line x1="330" y1="228" x2="330" y2="246" stroke="#83a598" stroke-width="1"/>
  <polygon points="330,252 326,243 334,243" fill="#83a598"/>
  <text x="342" y="244" fill="#928374" font-size="9.5">NO &#8594; live</text>

  <path d="M 224 262 A 106 10 0 0 1 436 262 L 436 306 A 106 10 0 0 1 224 306 Z" fill="url(#poche-door)" stroke="#928374" stroke-width="1"/>
  <ellipse cx="330" cy="262" rx="106" ry="10" fill="#1d2021" stroke="#928374" stroke-width="1"/>
  <text x="330" y="288" text-anchor="middle" fill="#ebdbb2" font-size="11.5" letter-spacing="1.5">THE REGISTRY</text>
  <text x="330" y="302" text-anchor="middle" fill="#928374" font-size="9.5">tier: live</text>

  <rect x="96" y="326" width="14" height="10" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="118" y="335" fill="#928374" font-size="9">PROCESS</text>
  <polygon points="206,325 215,331 206,337 197,331" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="223" y="335" fill="#928374" font-size="9">GATE</text>
  <path d="M 288 328 A 8 2.5 0 0 1 304 328 L 304 334 A 8 2.5 0 0 1 288 334 Z" fill="url(#poche-door)" stroke="#928374" stroke-width="1"/>
  <text x="312" y="335" fill="#928374" font-size="9">STORE</text>
  <line x1="368" y1="331" x2="390" y2="331" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="398" y="335" fill="#928374" font-size="9">REJECT PATH</text>
  <rect x="486" y="326" width="14" height="10" fill="url(#poche-door)" stroke="#928374" stroke-width="1"/>
  <text x="508" y="335" fill="#928374" font-size="9">POCH&#201; = REAL ROWS</text>
</svg>`;

export default function BlogThroughTheFrontDoor() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Through the Front Door - LastDB</title>
        <meta name="description" content="The first walk through the LastDB app registry, with real CLI output — check, publish, register-schemas, promote — and the five defects it surfaced, including a circular deadlock that briefly made registration impossible." />
        <meta property="og:title" content="Through the Front Door" />
        <meta property="og:description" content="Dogfooding the LastDB app registry: the circular deadlock the first walk hit, the tier split that resolved it, and the walk replayed on the fixed path to tier live." />
        <link rel="canonical" href="https://thelastdb.com/blog/through-the-front-door" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Through the Front Door</h1>
      <p className="post-meta dim">2026-07-17</p>

      <p className="bold white">The first app we tried to put in the LastDB app registry could not get in. <span className="white">Registering a novel schema required the app to exist first. Publishing the app required its schemas to not be novel.</span> Two rules, each sensible alone, together a door locked from both sides: an app with any novel schema could never enter the registry at all. We found the deadlock the intended way &mdash; <Link to="/blog/the-registry-starts-empty">the registry starts empty</Link>, so somebody had to be first through the real path, with a fresh signing key and an app the catalog had never seen. Below: the fix, the other four defects the walk surfaced, and the walk replayed on the fixed path, ending at tier <span className="white">live</span>.</p>

      <Section variant="rose">
        <h2><span className="bold">Two rules, one circle</span></h2>
        <p>The register side, as captured on the first attempt:</p>
        <Term>{`error: schema 'PantryItem': registration failed: … 403 Forbidden: {"reason":"app_not_registered"}`}</Term>
        <p>The service refuses to register a schema for an app it has never heard of. Reasonable. The publish side refused with the mirror instruction: novel schemas present, register them first. Also reasonable. Together they closed the circle: an app whose schemas were genuinely new could not become an app, and its schemas could not stop being new until it did. Each error was individually correct; the sequencing was wrong. <span className="bold white">No error message can talk you out of a deadlock.</span></p>
      </Section>

      <h2>Publish reserves, promote gates</h2>

      <p>The fix used a distinction the registry already had: tiers. <span className="bold">Publish</span> now does one small thing: it reserves your app id, and the row lands in a <span className="bold">sandbox</span> tier (reachable by id, off the default shelf), so schema registration has an app to attach to. The hard no-novel-schemas rule moved to <span className="bold">promote</span>, the step that puts a row on the visible shelf. The invariant &mdash; nothing unregistered is ever visible &mdash; is preserved. The circle is gone.</p>

      <ArchFigure svg={THE_DOOR} caption="Fig. 1 — the shipped flow: publish reserves a sandbox row; the gate sits at promote, not publish" />

      <h2>The walk, replayed</h2>

      <p>The test subject: <span className="bold">pantry</span>, a small app that tracks what&rsquo;s in your kitchen, with two schemas the shared catalog genuinely didn&rsquo;t know. Setup is one command; <span className="bold">lastdb app dev-init</span> generates the key that signs everything you publish. Here is the walk as it runs today, fixes landed, including our own attempts to skip ahead. First, ask what the catalog already covers:</p>

      <Term>{`$ lastdb app check --manifest pantry.json
app: pantry
  PantryItem   NOVEL  not covered by the shared catalog [catalog-confirmed novel]
  RestockRule  NOVEL  not covered by the shared catalog [catalog-confirmed novel]
note: 'RestockRule' is novel and will need field_descriptions to register
      — missing: item_name, min_quantity, reorder_amount, preferred_store`}</Term>

      <p>Two details in that output exist because this run first failed without them: the <em>catalog-confirmed</em> verdicts and the named missing fields. Both are in the defect list at the end. Reserve the name, and try to skip ahead:</p>

      <Term>{`$ lastdb app publish --manifest pantry.json --env dev
published (created): {
  "app_id": "pantry",
  "code_signature": null,
  "env": "dev",
  …

$ lastdb app list --env dev
pantry	Sandbox	Pantry	Tracks what's in your kitchen: items, quantities, expiry dates, and restock rules.

$ lastdb app promote --manifest pantry.json --env dev
error: promote rejected: novel schemas present (PantryItem, RestockRule) — register them first with \`lastdb app register-schemas\``}</Term>

      <p>The name is reserved, the row is listed at tier Sandbox, and the gate holds until the shapes are registered. Registering fails too, client-side and before any network call, because the manifest still lacks those four field descriptions:</p>

      <Term>{`$ lastdb app register-schemas --manifest pantry.json --env dev
error: schema 'RestockRule': novel registration requires a field_descriptions entry for every field — missing: item_name, min_quantity, reorder_amount, preferred_store. Add them to the manifest and re-run.`}</Term>

      <p>Add the descriptions and register again:</p>

      <Term>{`$ lastdb app register-schemas --manifest pantry.json --env dev
registered: PantryItem → catalog identity 76ce8941… (folded into an expanded canonical; local shape was a4a49710…)
registered: RestockRule → catalog identity 76ce8941… (folded into an expanded canonical; local shape was a73d8323…)
lockfile updated: pantry.json.lock.json
all manifest schemas are catalog identities — ready to publish
(note: \`lastdb app check\` may keep reporting them novel until the next resolver pack propagates)`}</Term>

      <p>One subtlety: both proposals came back with the same catalog identity. Rather than mint duplicates, the catalog may fold your proposal into a shape it already knows, so the identity it stores is not always the shape you computed locally. That is what the lockfile is for: a freshly stored identity is not yet resolvable from the node&rsquo;s own view, and on an earlier run every verification read reported the schemas missing seconds after the catalog accepted them. The CLI now records the identity the catalog actually stored and verifies that exact identity from then on. The trailing note is the same lag stated plainly: the node&rsquo;s local view can trail the catalog&rsquo;s answer for a while. Promote now passes the gate:</p>

      <Term>{`$ lastdb app promote --manifest pantry.json --env dev
promoted: {
  …
  "registered_at": "2026-07-17T15:49:21Z",
  "tier": "live",
  "uses": []
}`}</Term>

      <p>That is the whole developer surface: <span className="bold">check &#8594; publish &#8594; register-schemas &#8594; promote</span>, and the app sits on the shelf next to the apps we build LastDB with.</p>

      <h2>What else the walk shook loose</h2>

      <ul>
        <li><span className="bold white">Registration wrote where no reader looked.</span> Early on, two successful <em>registered:</em> lines were followed by &ldquo;error: schemas still not in the catalog after registration: PantryItem, RestockRule&rdquo; from the very next command. The write landed in a location no read surface checked; registration now writes entries every read surface agrees on.</li>
        <li><span className="bold white">A stale local view reported as novel.</span> A fresh node called every schema novel because its own copy of the catalog had not caught up. <span className="bold">check</span> now confirms novelty with the catalog itself before saying the word; that is the <em>catalog-confirmed</em> in the first transcript.</li>
        <li><span className="bold white">Field descriptions only surfaced server-side.</span> They were mandatory for novel schemas, and the only way to learn that was a rejection three steps into the flow. The refusal is now immediate and local, as in the transcript above, and <span className="bold">check</span> names the same gaps before you ever register.</li>
        <li><span className="bold white">The promote gate trusted the local view.</span> The gate now re-checks the catalog&rsquo;s own answer before deciding, and when it cannot reach the catalog at all it fails closed: schemas the node considers novel stay novel, and the promote is refused.</li>
      </ul>

      <Section variant="sage">
        <h2><span className="bold">What we didn&rsquo;t do</span></h2>
        <p>When the first app couldn&rsquo;t get in, the shortcut was obvious: insert the row by hand and move on. We fixed the registration path instead, and each fix above (the tier split, catalog-confirmed checks, client-side manifest validation, the lockfile, the fail-closed gate) now applies to every registration that follows. The premature-promote rejection in the transcript is asserted on every run of an automated dogfood rotation; a regression there fails the rotation. <span className="bold white">The pantry row is on the shelf, and it came through the same path everyone else will use.</span></p>
      </Section>

      <p className="dim">Companion piece: <Link to="/blog/the-registry-starts-empty">The Registry Starts Empty</Link> for the design; <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> for how schema resolution works under it.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
