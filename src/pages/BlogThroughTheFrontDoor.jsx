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
        <meta name="description" content="We opened the app registry with zero rows and one promise: every row walks in through the real registration path. Then we walked it ourselves, as a stranger would — and the door was jammed. The full transcript of the first app going from nothing to live, and the five defects the walk surfaced." />
        <meta property="og:title" content="Through the Front Door" />
        <meta property="og:description" content="Dogfooding the LastDB app registry: a circular deadlock, five papercuts, same-day fixes, and the transcript of the first app reaching the shelf." />
        <link rel="canonical" href="https://thelastdb.com/blog/through-the-front-door" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Through the Front Door</h1>
      <p className="post-meta dim">2026-07-17</p>

      <p className="bold white">Last post, we said the <Link to="/blog/the-registry-starts-empty">app registry starts empty</Link> on purpose: a row can only exist because a real registration produced it. That promise has a corollary we didn&rsquo;t say out loud &mdash; <span className="white">somebody has to actually walk through the door.</span> So we did, the way a stranger would: fresh signing key, an app the catalog had never seen, no shortcuts. The door was jammed. This is the walk, the five defects it surfaced, and the transcript of the first app going from nothing to <span className="white">live</span>.</p>

      <h2>The walk</h2>

      <p>The test subject: <span className="bold">pantry</span>, a small app that tracks what&rsquo;s in your kitchen, with two schemas the shared catalog genuinely didn&rsquo;t know. Setup is one command &mdash; <span className="bold">lastdb app dev-init</span> generates the key that signs everything you publish. Then you ask what the catalog already covers:</p>

      <Term>{`$ lastdb app check --manifest pantry.json
app: pantry
  PantryItem   NOVEL  not covered by the shared catalog [catalog-confirmed novel]
  RestockRule  NOVEL  not covered by the shared catalog [catalog-confirmed novel]
note: 'RestockRule' is novel and will need field_descriptions to register
      — missing: item_name, min_quantity, reorder_amount, preferred_store`}</Term>

      <p>Two things worth noticing, because both exist as scar tissue from this walk. The verdicts say <em>catalog-confirmed</em>: your own node&rsquo;s view of the catalog can lag, so <span className="bold">check</span> asks the catalog itself before calling anything novel &mdash; lag no longer masquerades as novelty. And the note about field descriptions arrives <em>now</em>, naming exact fields, instead of as a generic server error three steps later.</p>

      <p>Then: reserve your name, register your shapes, promote.</p>

      <Term>{`$ lastdb app publish --manifest pantry.json --env dev
published (created): { "app_id": "pantry", "tier": "sandbox", ... }

$ lastdb app register-schemas --manifest pantry.json --env dev
registered: PantryItem → catalog identity 76ce8941…
registered: RestockRule → catalog identity 76ce8941…
lockfile updated: pantry.json.lock.json
all manifest schemas are catalog identities — ready to publish

$ lastdb app promote --manifest pantry.json --env dev
promoted: { "app_id": "pantry", "tier": "live", ... }

$ lastdb app list --env dev
pantry  Live  Pantry  Tracks what's in your kitchen: items, quantities, expiry…`}</Term>

      <p>That&rsquo;s the whole developer surface: <span className="bold">check &#8594; publish &#8594; register-schemas &#8594; promote</span>, then your app is on the shelf next to the apps we build LastDB with. One subtlety the transcript shows honestly: the catalog is aggressive about reuse, so rather than mint duplicates it may fold your proposal into a shape it already knows &mdash; and the CLI says so, records the identity the catalog <em>actually stored</em> in a lockfile next to your manifest, and verifies that exact identity from then on. No guessing, no re-deriving.</p>

      <ArchFigure svg={THE_DOOR} caption="Fig. 1 — the door as shipped: three processes, one gate, one shelf" />

      <Section variant="rose">
        <h2><span className="bold">The jam: a door that locked from both sides</span></h2>
        <p>Our first walk ended fast. Registering a novel schema required the app to exist first. Publishing the app required its schemas to not be novel. Each rule was individually sensible; together they formed a perfect circle &mdash; <span className="bold white">an app with any novel schema could never enter the registry at all.</span> No error message can talk you out of a deadlock; the sequencing itself was wrong.</p>
        <p>The fix used a distinction the registry already had: tiers. <span className="bold">Publish</span> now just reserves your name &mdash; the row lands in a <em>sandbox</em> tier, reachable by id but off the default shelf &mdash; so schema registration has something to attach to. The hard no-novel-schemas rule moved to <span className="bold">promote</span>, the step that puts you on the <em>visible</em> shelf. Nothing unregistered is ever visible, which was always the point of the rule; and the circle is gone.</p>
      </Section>

      <h2>What else the walk shook loose</h2>

      <ul>
        <li><span className="bold white">Registered but invisible.</span> Early on, a registered schema went in&#8230; somewhere. No read surface could see it. The registration path now writes entries every read surface agrees on.</li>
        <li><span className="bold white">Lag dressed as novelty.</span> A fresh node called every schema novel &mdash; silently &mdash; because its local view hadn&rsquo;t caught up. Hence the catalog-confirmed verdicts above.</li>
        <li><span className="bold white">Requirements you discover by failing.</span> Field descriptions were mandatory but only discoverable via a server rejection. Now the manifest is validated client-side, with the missing fields named, before a single network call.</li>
        <li><span className="bold white">The gate trusted a laggy view.</span> The promote gate now checks the catalog&rsquo;s own answer &mdash; and when it can&rsquo;t reach the catalog at all, it fails <em>closed</em>. A gate that shrugs when its source of truth is unreachable is not a gate.</li>
      </ul>

      <p>Every one of these was found by walking the path, not by reading the code. And the premature-promote rejection &mdash; the gate doing its one job &mdash; is now asserted on every run of an automated dogfood rotation, so the door can&rsquo;t silently un-fix itself.</p>

      <Section variant="sage">
        <h2><span className="bold">Fix the door, not the shelf</span></h2>
        <p>The empty-shelf rule earned its keep in week one. When our own app couldn&rsquo;t get in, the temptation was obvious: insert the row, move on. Instead the jammed door became the work item &mdash; and every fix that came out of it (the tier split, the honest verdicts, the lockfile, the fail-closed gate) is now something <em>every</em> future developer walks through without knowing it was ever broken. That&rsquo;s the quiet payoff of refusing seed data: <span className="bold white">the only way to make the shelf fill up is to make the door actually work.</span></p>
      </Section>

      <p className="dim">Companion piece: <Link to="/blog/the-registry-starts-empty">The Registry Starts Empty</Link> for the design; <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> for how schema resolution works under it.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
