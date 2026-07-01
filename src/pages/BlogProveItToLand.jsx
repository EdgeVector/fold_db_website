import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for the load-bearing idea). Rendered as inline SVG so there's
// no auto-layout.
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

// 1 — the round trip: the boundary is the whole point. An in-memory set→get
// never leaves the process, so it passes while the app is broken. Only crossing
// a real boundary asserts the capability.
const ROUNDTRIP = `${SVG_OPEN('0 0 660 250')}
  <rect x="36" y="66" width="176" height="60" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="124" y="92" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ACT</text>
  <text x="124" y="110" text-anchor="middle" fill="#928374" font-size="10">set a password</text>

  <line x1="212" y1="96" x2="270" y2="96" stroke="#928374" stroke-width="1"/>
  <polygon points="272,96 263,92 263,100" fill="#928374"/>

  <line x1="330" y1="30" x2="330" y2="162" stroke="#83a598" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="330" y="24" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1.5">THE BOUNDARY</text>
  <text x="330" y="180" text-anchor="middle" fill="#83a598" font-size="10">restart &#183; re-open &#183; re-fetch</text>

  <line x1="390" y1="96" x2="448" y2="96" stroke="#928374" stroke-width="1"/>
  <polygon points="450,96 441,92 441,100" fill="#928374"/>

  <rect x="450" y="66" width="176" height="60" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="538" y="92" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">ASSERT</text>
  <text x="538" y="110" text-anchor="middle" fill="#928374" font-size="10">unlock with it</text>

  <path d="M124,132 C124,200 538,200 538,132" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="331" y="224" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">SET&#8594;GET IN MEMORY NEVER CROSSES &#8212; IT PASSES WHILE THE APP IS BROKEN</text>
</svg>`;

// 2 — proportional proof: the form of proof scales with blast radius, so the
// gate is a one-liner where it can be and a real round trip where it must be.
const LADDER = `${SVG_OPEN('0 0 660 250')}
  <text x="34" y="40" fill="#928374" font-size="10" letter-spacing="1.5">BLAST RADIUS</text>
  <line x1="44" y1="52" x2="44" y2="214" stroke="#928374" stroke-width="1"/>
  <polygon points="44,216 40,207 48,207" fill="#928374"/>

  <rect x="80" y="52" width="180" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="92" y="72" fill="#ebdbb2" font-size="11" letter-spacing="1">NO BEHAVIOR CHANGE</text>
  <text x="92" y="88" fill="#928374" font-size="10">rename &#183; docs &#183; refactor</text>
  <text x="286" y="79" fill="#928374" font-size="10">tests still green &#8212; one line why</text>

  <rect x="80" y="108" width="220" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="92" y="128" fill="#ebdbb2" font-size="11" letter-spacing="1">LOGIC WITH A UNIT</text>
  <text x="92" y="144" fill="#928374" font-size="10">a new rule or branch</text>
  <text x="326" y="135" fill="#928374" font-size="10">a test &#43; a negative case</text>

  <rect x="80" y="164" width="300" height="50" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="92" y="185" fill="#ebdbb2" font-size="11" letter-spacing="1">USER-VISIBLE / STATEFUL</text>
  <text x="92" y="201" fill="#ebdbb2" font-size="10">auth &#183; settings &#183; sync &#183; a data write</text>
  <text x="406" y="192" fill="#83a598" font-size="10">the real-app round trip</text>
</svg>`;

// 3 — proof is produced by something other than the author. The claim is written
// from the user's seat; a different agent reproduces it; only then does the gate open.
const VERIFIER = `${SVG_OPEN('0 0 660 236')}
  <rect x="36" y="70" width="188" height="86" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="130" y="94" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">## PROOF</text>
  <text x="130" y="114" text-anchor="middle" fill="#928374" font-size="10">claim &#183; tier &#183; how</text>
  <text x="130" y="130" text-anchor="middle" fill="#928374" font-size="10">verified-by</text>
  <text x="130" y="150" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="1">WRITTEN BY THE AUTHOR</text>

  <line x1="224" y1="113" x2="288" y2="113" stroke="#928374" stroke-width="1"/>
  <polygon points="290,113 281,109 281,117" fill="#928374"/>
  <text x="256" y="103" text-anchor="middle" fill="#928374" font-size="9">reproduce</text>

  <rect x="290" y="70" width="160" height="86" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="370" y="100" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">VERIFIER</text>
  <text x="370" y="118" text-anchor="middle" fill="#83a598" font-size="10">a different agent</text>
  <text x="370" y="138" text-anchor="middle" fill="#83a598" font-size="9" letter-spacing="1">RUNS THE THING</text>

  <line x1="450" y1="113" x2="514" y2="113" stroke="#928374" stroke-width="1"/>
  <polygon points="516,113 507,109 507,117" fill="#928374"/>

  <rect x="516" y="82" width="4" height="62" fill="#928374"/>
  <rect x="540" y="82" width="4" height="62" fill="#928374"/>
  <text x="530" y="70" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1.5">MERGE</text>
  <text x="530" y="160" text-anchor="middle" fill="#928374" font-size="9">opens only if it reproduces</text>
</svg>`;

export default function BlogProveItToLand() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Prove It To Land - LastDB</title>
        <meta name="description" content="A green pull request is not proof the thing works. When agents write and merge their own code, 'done' has to mean the user-visible capability works — checked by something other than the author. Here is the gate we put in front of every merge, and the two ways code lies about being finished." />
        <meta property="og:title" content="Prove It To Land" />
        <meta property="og:description" content="A merged PR is a milestone; the capability working is the finish line. How we make every change — human or agent — prove itself before it lands." />
        <link rel="canonical" href="https://thelastdb.com/blog/prove-it-to-land" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Prove It To Land</h1>
      <p className="post-meta dim">2026-06-30</p>

      <p className="bold white">A green pull request is not proof the thing works. It is proof that some code compiled, some tests passed, and nobody objected. When agents are the ones writing and merging that code &mdash; as ours are, most hours of most days &mdash; the gap between &ldquo;the PR merged&rdquo; and &ldquo;the capability works&rdquo; stops being an academic point. <span className="white">It is the exact place bugs ship from.</span></p>

      <p>So we closed it. Nothing lands in LastDB unless it carries a filled-in proof that the user-visible capability works &mdash; and that proof was produced by something other than the author. This post is about the gate, and about the two ways a change lies to you about being finished.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The bug that made the rule</h2>
      <p>A user could <span className="bold">set</span> a master password on their node. After a restart, that password would not <span className="bold">unlock</span> it. Each half had shipped in its own tidy pull request; each one looked complete in isolation. Set: done. Unlock: also, apparently, done. The <em>capability</em> &mdash; &ldquo;set a password, then later get back in with it&rdquo; &mdash; was never whole, because no single check ever asked for the whole thing at once.</p>

      <p>That is failure number one: <span className="bold white">the half-built feature</span>. It hides between pull requests. Every diff is defensible; the seam between them is where the user falls through.</p>

      <Section variant="rose">
        <h2><span className="bold">The tell: write-only validation</span></h2>
        <p>Failure number two is subtler and lives inside a single change. The write half gets exercised &mdash; setting the password is tested, and the test is green. The read half never is. <code>setPassword()</code> has a test; <code>unlock(password)</code> does not. &ldquo;Can be set but doesn&rsquo;t actually work&rdquo; is, every single time, a <span className="bold">missing round-trip assertion</span> wearing a green check mark.</p>
      </Section>

      <p>Both failures share a root: the proof, where it existed at all, was anchored to the <span className="dim">diff</span> instead of the <span className="bold white">user</span>. &ldquo;Adds <code>set_master_password</code>&rdquo; is a description of code. &ldquo;A user can set a password and later unlock with it&rdquo; is a description of a capability &mdash; and you cannot honestly write that sentence as your proof unless <code>unlock</code> actually exists and actually works. Anchoring the claim to the user&rsquo;s seat turns completeness from a hope into a precondition of landing.</p>

      <h2>Cross a boundary, or you&rsquo;ve proven nothing</h2>
      <p>The master-password bug survives every in-process test, and it always will. Set the value, read it straight back &mdash; it&rsquo;s right there in memory, of course it matches. The thing holding the value never went away, so the test never had a chance to catch that the value doesn&rsquo;t survive the thing going away.</p>

      <p>A real proof of a stateful capability has to <span className="bold">cross a boundary</span>: act (write the value), then restart the node, re-open the app, or re-fetch on a fresh connection &mdash; <span className="bold white">and only then</span> assert the read-back. The boundary is not a detail of the test. It is the entire point of the test.</p>

      <ArchFigure svg={ROUNDTRIP} caption="Fig. 1 — the boundary is the test; an in-memory round trip skips it" />

      <p>And the check has to include the unhappy path: a wrong password rejected, a missing permission denied, invalid input errored. A gate that only ever passes the happy case is a gate that always says yes &mdash; which is the same as no gate.</p>

      <h2>Proof, proportional to blast radius</h2>
      <p>A universal &ldquo;demonstrate it works&rdquo; rule dies one of two deaths if you apply it flatly. Make it heavy for everything and people route around it; a bypassed gate is worse than none, because it still <em>looks</em> like coverage. So the principle is universal but the <span className="bold">form</span> of the proof scales with how far a change can reach.</p>

      <ArchFigure svg={LADDER} caption="Fig. 2 — the same rule, three weights; heavier when in doubt" />

      <ul>
        <li><span className="bold white">No behavior change</span> &mdash; a rename, a comment, a refactor. Existing tests still green, plus one line saying why it&rsquo;s behavior-preserving. That&rsquo;s the whole obligation.</li>
        <li><span className="bold white">Logic with a testable unit</span> &mdash; a test of the new behavior <span className="bold">and</span> a negative case.</li>
        <li><span className="bold white">User-visible or stateful</span> &mdash; auth, settings, sync, a data write. The real-app round trip, across a boundary, with a negative case. No exceptions, and when you&rsquo;re unsure which tier you&rsquo;re in, you&rsquo;re in this one.</li>
      </ul>

      <p>The cheap tier stays cheap on purpose. What keeps the gate from eroding isn&rsquo;t severity &mdash; it&rsquo;s <span className="bold">consistency</span>: every change carries a proof, even if the proof is a single honest sentence.</p>

      <h2>The author does not get to certify themselves</h2>
      <p>Every pull request carries a short, machine-greppable block &mdash; a claim written from the user&rsquo;s seat, the tier, exactly how it was checked, and what confirmed it. The last field is the load-bearing one: the proof has to be reproduced by <span className="bold white">something other than the author</span>. A fresh agent that runs the actual app on a throwaway data directory. A CI job. Not the author&rsquo;s own say-so. If a verifier can&rsquo;t reproduce the claim, the change doesn&rsquo;t merge.</p>

      <ArchFigure svg={VERIFIER} caption="Fig. 3 — claim written by the author, confirmed by someone else, before the gate opens" />

      <Section variant="sage">
        <h2><span className="bold">Why this is affordable here</span></h2>
        <p>A prove-it-to-land policy is normally too heavy for a human team &mdash; the toil of demonstrating every change works, from the user&rsquo;s seat, every time, is exactly the tax nobody wants to pay. But the toil here is paid by the fleet of agents, not by a person. So the discipline that human teams can only aspire to becomes the <span className="bold white">natural default</span>: the only path we&rsquo;ve left to &ldquo;done&rdquo; is the one that runs the thing.</p>
      </Section>

      <p>A merged pull request is a milestone. The capability demonstrably working &mdash; across a boundary, checked by someone other than the person who wrote it &mdash; is the finish line. We stopped letting the milestone masquerade as the finish line, and the seam between the two is where we stopped shipping bugs.</p>

      <p className="dim">Part of the same system that lets an <Link to="/blog/building-lastdb-with-agents">autonomous agent loop</Link> merge its own work &mdash; safely.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
