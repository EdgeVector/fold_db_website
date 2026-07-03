import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for the highlighted element). Inline SVG — no auto-layout.
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

// 1 — two lines, one version string. The drift the version number can't see.
const FIG_DRIFT = `${SVG_OPEN('0 0 660 240')}
  <text x="36" y="56" fill="#ebdbb2" font-size="11" letter-spacing="1.5">THE CODEBASE</text>
  <text x="36" y="72" fill="#928374" font-size="10">every fix lands here</text>
  <line x1="170" y1="64" x2="610" y2="64" stroke="#928374" stroke-width="1"/>
  <line x1="185" y1="61" x2="185" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="215" y1="61" x2="215" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="245" y1="61" x2="245" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="275" y1="61" x2="275" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="305" y1="61" x2="305" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="335" y1="61" x2="335" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="365" y1="61" x2="365" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="395" y1="61" x2="395" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="425" y1="61" x2="425" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="455" y1="61" x2="455" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="485" y1="61" x2="485" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="515" y1="61" x2="515" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="545" y1="61" x2="545" y2="67" stroke="#928374" stroke-width="1"/>
  <line x1="575" y1="61" x2="575" y2="67" stroke="#928374" stroke-width="1"/>
  <rect x="608" y="62" width="4" height="4" fill="#928374"/>
  <text x="610" y="50" text-anchor="end" fill="#928374" font-size="10">today &#183; says v0.3.0</text>

  <text x="36" y="132" fill="#ebdbb2" font-size="11" letter-spacing="1.5">THE DEV BINARY</text>
  <text x="36" y="148" fill="#928374" font-size="10">its own release line</text>
  <line x1="170" y1="140" x2="380" y2="140" stroke="#928374" stroke-width="1"/>
  <line x1="185" y1="137" x2="185" y2="143" stroke="#928374" stroke-width="1"/>
  <line x1="215" y1="137" x2="215" y2="143" stroke="#928374" stroke-width="1"/>
  <line x1="245" y1="137" x2="245" y2="143" stroke="#928374" stroke-width="1"/>
  <line x1="275" y1="137" x2="275" y2="143" stroke="#928374" stroke-width="1"/>
  <line x1="305" y1="137" x2="305" y2="143" stroke="#928374" stroke-width="1"/>
  <line x1="335" y1="137" x2="335" y2="143" stroke="#928374" stroke-width="1"/>
  <rect x="378" y="138" width="4" height="4" fill="#928374"/>
  <text x="380" y="126" text-anchor="middle" fill="#928374" font-size="10">last release &#183; says v0.3.0</text>
  <line x1="382" y1="140" x2="610" y2="140" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <line x1="380" y1="168" x2="380" y2="182" stroke="#83a598" stroke-width="1"/>
  <line x1="610" y1="168" x2="610" y2="182" stroke="#83a598" stroke-width="1"/>
  <line x1="380" y1="175" x2="610" y2="175" stroke="#83a598" stroke-width="1"/>
  <text x="495" y="200" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">THE DRIFT &#8212; INVISIBLE TO --version</text>
</svg>`;

// 2 — compile where the code lives; execute where the data lives.
const FIG_COMPILE = `${SVG_OPEN('0 0 660 262')}
  <text x="36" y="58" fill="#928374" font-size="11" letter-spacing="1.5">BEFORE</text>
  <rect x="110" y="38" width="150" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="185" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR PROJECT</text>
  <text x="185" y="77" text-anchor="middle" fill="#928374" font-size="10">rust source</text>
  <line x1="260" y1="64" x2="346" y2="64" stroke="#928374" stroke-width="1"/>
  <polygon points="350,64 341,60 341,68" fill="#928374"/>
  <text x="304" y="52" text-anchor="middle" fill="#928374" font-size="10">source</text>
  <rect x="350" y="38" width="230" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="465" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">DEV BINARY</text>
  <text x="465" y="77" text-anchor="middle" fill="#928374" font-size="10">compiles cold, then executes</text>

  <line x1="110" y1="104" x2="110" y2="140" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="580" y1="104" x2="580" y2="140" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="36" y="174" fill="#ebdbb2" font-size="11" letter-spacing="1.5">AFTER</text>
  <rect x="110" y="154" width="150" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="185" y="176" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR PROJECT</text>
  <text x="185" y="193" text-anchor="middle" fill="#928374" font-size="10">cargo &#183; incremental</text>
  <line x1="260" y1="180" x2="346" y2="180" stroke="#83a598" stroke-width="1"/>
  <polygon points="350,180 341,176 341,184" fill="#83a598"/>
  <text x="304" y="168" text-anchor="middle" fill="#83a598" font-size="10">wasm bytes</text>
  <rect x="350" y="154" width="230" height="52" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="465" y="176" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE NODE</text>
  <text x="465" y="193" text-anchor="middle" fill="#ebdbb2" font-size="10">executes &#183; by default</text>

  <text x="330" y="240" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">COMPILE WHERE THE CODE LIVES &#183; EXECUTE WHERE THE DATA LIVES</text>
</svg>`;

// 3 — one house; the dev wing has no door to the data and isn't built when shipped.
const FIG_PLAN = `${SVG_OPEN('0 0 660 252')}
  <text x="375" y="30" text-anchor="middle" fill="#928374" font-size="10">NO DOOR &#8212; BY CONSTRUCTION</text>
  <line x1="375" y1="36" x2="375" y2="78" stroke="#928374" stroke-width="1"/>
  <rect x="373" y="76" width="4" height="4" fill="#928374"/>

  <rect x="110" y="46" width="440" height="144" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="130" y="66" fill="#ebdbb2" font-size="12" letter-spacing="1.5">FOLDDB &#8212; ONE BINARY</text>

  <rect x="130" y="80" width="230" height="90" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="245" y="118" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR DATA</text>
  <text x="245" y="136" text-anchor="middle" fill="#ebdbb2" font-size="10">production</text>

  <rect x="360" y="80" width="30" height="90" fill="url(#poche)" stroke="#928374" stroke-width="1"/>

  <rect x="390" y="80" width="140" height="90" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="460" y="114" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">DEV WING</text>
  <text x="460" y="131" text-anchor="middle" fill="#83a598" font-size="10">folddb dev</text>
  <text x="460" y="147" text-anchor="middle" fill="#928374" font-size="10">ephemeral &#183; /dev/*</text>

  <line x1="130" y1="204" x2="130" y2="218" stroke="#928374" stroke-width="1"/>
  <line x1="360" y1="204" x2="360" y2="218" stroke="#928374" stroke-width="1"/>
  <line x1="130" y1="211" x2="360" y2="211" stroke="#928374" stroke-width="1"/>
  <text x="245" y="236" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ALWAYS SHIPPED</text>

  <line x1="390" y1="204" x2="390" y2="218" stroke="#83a598" stroke-width="1"/>
  <line x1="530" y1="204" x2="530" y2="218" stroke="#83a598" stroke-width="1"/>
  <line x1="390" y1="211" x2="530" y2="211" stroke="#83a598" stroke-width="1"/>
  <text x="460" y="236" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">DEV BUILDS ONLY</text>
</svg>`;

export default function BlogTheSecondBinary() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Second Binary - LastDB</title>
        <meta name="description" content="Two builds of our developer tool, weeks of work apart, both reported v0.3.0 — and both were telling the truth. That investigation ended with a decision: delete the second binary. Dev becomes a compile-time mode of the one real node, and the safety we liked about the separate binary survives as construction, not discipline." />
        <meta property="og:title" content="The Second Binary" />
        <meta property="og:description" content="A separate dev binary is a standing invitation to drift: every fix lands twice, every release is a race, and the version string can't warn you. So we're deleting ours." />
        <link rel="canonical" href="https://thelastdb.com/blog/the-second-binary" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Second Binary</h1>
      <p className="post-meta dim">2026-07-03</p>

      <p className="bold white">Two builds of the same tool sat on one machine. They were weeks of work apart &mdash; one predated a daemon fix, a socket-discovery overhaul, and a change to how projects are laid out on disk. Both reported <code>v0.3.0</code>. <span className="white">Neither was lying.</span> That is the worst kind of bug report: every instrument reads nominal, and the machine is wrong anyway.</p>

      <p>The tool was <code>folddb-dev</code> &mdash; our development node. An agent had spent a day building a prototype against it and kept tripping over behavior the documentation said was fixed. It was fixed. Just not in any binary the agent could get its hands on: the released build predated the endpoint it needed, and the from-source build it fell back to came from a checkout frozen at an archived commit. Three layers of stale, and a version string cheerfully vouching for all of them.</p>

      <p>The investigation that started as &ldquo;is the dev node up to date?&rdquo; ended somewhere better: <span className="bold white">the dev node should not exist.</span></p>

      <ArchFigure svg={FIG_DRIFT} caption="Fig. 1 — two release lines, one version string" />

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Why there were two</h2>
      <p>The second binary had honest origins. It was an ephemeral playground: throwaway data directory, mock identity, torn down on exit &mdash; a node you could not hurt anything with, <em>by construction</em>. It carried heavyweight machinery the real node didn&rsquo;t want, chiefly a server-side Rust&#8594;WASM compiler for building transforms. And it kept a promiscuous authoring surface &mdash; register anything, write anything, advance the clock &mdash; out of the product people actually run. Every one of those reasons was good. Every one of them expired, and nobody sent a notice.</p>

      <Section variant="rose">
        <h2><span className="bold">A second binary is a standing invitation to drift</span></h2>
        <p>The dev node re-implemented the real node&rsquo;s wiring &mdash; the daemon lifecycle, the socket discovery, the boot sequence. So every fix to that wiring had to land <span className="bold">twice</span>, and the second landing is exactly the kind of chore that quietly doesn&rsquo;t happen. It shipped on its own release line, so it could go stale <span className="bold">independently</span> of the thing it was supposed to mirror. And because its version was pinned to its own line, <code>--version</code> could not distinguish a current build from a fossil. None of this was a flaw in the code. It is the physics of maintaining two of something.</p>
      </Section>

      <h2>Auditing the reasons</h2>
      <p>Deleting a component is only safe if you can account for why it existed. We went down the list.</p>

      <p><span className="bold white">The compiler never belonged on the server.</span> Compiling a developer&rsquo;s Rust in-process meant a throwaway build directory &mdash; every compile a cold compile, some of them minutes long, behind a timeout budget nobody enjoyed tuning. But the developer already has a build system, sitting next to the source, with a warm cache: <code>cargo</code>. So the compile moves to where the code lives, and the node&rsquo;s registration surface accepts compiled WASM bytes &mdash; the same binary-only contract our schema registry already adopted. Incremental builds arrive for free, and an entire class of timeout machinery is deleted rather than tuned.</p>

      <p><span className="bold white">The runtime always belonged in the product.</span> Transforms are not a development toy; they are a feature of the database. A default build of the real node that cannot execute them is undershipped. So the WASM runtime graduates from a dev-node dependency to a default one. What remains for a &ldquo;dev node&rdquo; to uniquely carry? A runtime the product now includes, and a compiler nobody should host.</p>

      <ArchFigure svg={FIG_COMPILE} caption="Fig. 2 — the compiler leaves the server; the runtime enters the product" />

      <p><span className="bold white">And the scope had quietly narrowed.</span> Building an <em>application</em> on LastDB happens against the real node&rsquo;s app surface &mdash; namespaced, capability-gated, over the local socket. What the dev node was genuinely for, by the end, was developing <em>transforms</em>: register a schema, register a view, write a row, watch it fire. A whole second server is a lot of architecture for that loop.</p>

      <h2>One binary, with a dev wing</h2>
      <p>So: delete the dev node, and bolt its one good loop onto the real node. <code>folddb dev</code> boots an ephemeral session &mdash; same throwaway data directory, same teardown &mdash; inside the one binary that gets every fix the moment it lands. There is no second release line to fall behind, because there is no second release.</p>

      <Section variant="sage">
        <h2><span className="bold">Safety by construction, not by flag</span></h2>
        <p>The separate binary had one property worth grieving: it <em>could not</em> touch production data, the way a building without a door cannot be walked into. A merged binary must not demote that to an <code>if</code> statement. Two rules, both enforced where the compiler can see them: a dev session&rsquo;s data root is pinned to the throwaway directory <span className="bold">by type</span> &mdash; there is no code path that opens the real store; and the authoring surface is <span className="bold">compiled out</span> of shipped builds &mdash; verified by a build test, so the door the production binary doesn&rsquo;t have is a door it cannot grow back.</p>
      </Section>

      <ArchFigure svg={FIG_PLAN} caption="Fig. 3 — one house; the dev wing has no door, and shipped builds don't build it" />

      <p>The deletion is under way, cut into slices that each land whole: the runtime becomes a default, the sessions move in, the transform loop moves in, and then the second binary &mdash; its release pipeline, its formula, its whole parallel existence &mdash; is retired. The last slice is a proof, not a merge: a fresh install running the entire documented loop, plus a test that the shipped build serves none of the dev surface.</p>

      <h2>The takeaway</h2>
      <p>If your dev tool re-implements your product&rsquo;s wiring, you do not have a dev tool; you have a fork with a friendlier name, and it is drifting while you read this. The fix is not more diligent double-fixing, and it is certainly not a version bump &mdash; our version strings were accurate the whole time. The fix is architectural: <span className="bold white">one binary, with the development surface as a compile-time wing</span> &mdash; present when you&rsquo;re building, absent when you&rsquo;ve shipped, and never, structurally, a second thing to keep current.</p>

      <p className="dim">The stale binary was found the way most of our bugs are found &mdash; by an agent doing real work inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>, on the same stack that runs <Link to="/apps">Brain and Kanban</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
