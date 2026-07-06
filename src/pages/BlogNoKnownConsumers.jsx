import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for a build that actually runs, dimension lines with ticks,
// mono caps labels, a single accent for "the one that matters").
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

// 1 — three build legs, in series on one cold runner. Only the first is consumed.
const BEFORE = `${SVG_OPEN('0 0 660 300')}
  <text x="36" y="34" fill="#928374" font-size="11" letter-spacing="1.5">ONE RUNNER &#183; COLD CACHE &#183; IN SERIES</text>

  <rect x="176" y="52" width="268" height="46" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="310" y="75" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">BUILD &#183; arm64-macOS</text>
  <text x="310" y="91" text-anchor="middle" fill="#83a598" font-size="10">the one people install</text>

  <rect x="308" y="98" width="4" height="4" fill="#928374"/>
  <line x1="310" y1="98" x2="310" y2="120" stroke="#928374" stroke-width="1"/>
  <rect x="308" y="120" width="4" height="4" fill="#928374"/>

  <rect x="176" y="124" width="268" height="46" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="310" y="147" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">BUILD &#183; Intel-macOS</text>
  <text x="310" y="163" text-anchor="middle" fill="#928374" font-size="10">no known consumers</text>

  <rect x="308" y="170" width="4" height="4" fill="#928374"/>
  <line x1="310" y1="170" x2="310" y2="192" stroke="#928374" stroke-width="1"/>
  <rect x="308" y="192" width="4" height="4" fill="#928374"/>

  <rect x="176" y="196" width="268" height="46" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="310" y="219" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">BUILD &#183; Linux</text>
  <text x="310" y="235" text-anchor="middle" fill="#928374" font-size="10">no known consumers</text>

  <line x1="500" y1="52" x2="500" y2="242" stroke="#928374" stroke-width="1"/>
  <line x1="494" y1="52" x2="506" y2="52" stroke="#928374" stroke-width="1"/>
  <line x1="494" y1="242" x2="506" y2="242" stroke="#928374" stroke-width="1"/>
  <text x="516" y="143" fill="#928374" font-size="11" letter-spacing="1.5">~5&#8211;6 H</text>
  <text x="516" y="159" fill="#928374" font-size="10">per release</text>
</svg>`;

// 2 — one leg. The other targets become a dashed slot: added back on demand, not in advance.
const AFTER = `${SVG_OPEN('0 0 660 214')}
  <text x="36" y="34" fill="#928374" font-size="11" letter-spacing="1.5">ONE LEG &#183; THE REST ON DEMAND</text>

  <rect x="176" y="52" width="268" height="46" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="310" y="75" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">BUILD &#183; arm64-macOS</text>
  <text x="310" y="91" text-anchor="middle" fill="#83a598" font-size="10">the one people install</text>

  <rect x="176" y="128" width="268" height="46" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="310" y="151" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.2">ANY OTHER TARGET</text>
  <text x="310" y="167" text-anchor="middle" fill="#928374" font-size="10">re-added the day a consumer appears</text>

  <line x1="500" y1="52" x2="500" y2="98" stroke="#928374" stroke-width="1"/>
  <line x1="494" y1="52" x2="506" y2="52" stroke="#928374" stroke-width="1"/>
  <line x1="494" y1="98" x2="506" y2="98" stroke="#928374" stroke-width="1"/>
  <text x="516" y="79" fill="#83a598" font-size="11" letter-spacing="1.5">~2 H</text>
</svg>`;

export default function BlogNoKnownConsumers() {
  return (
    <>
      <Helmet>
        <title>No Known Consumers - LastDB</title>
        <meta name="description" content="Every release of our database spent five to six hours building for computers no one was running it on. We cut the build matrix to one target and wrote down the rule: add a platform back the day a real user needs it — not before." />
        <meta property="og:title" content="No Known Consumers - LastDB" />
        <meta property="og:description" content="We were paying five hours a release to build for users who didn&rsquo;t exist. Here&rsquo;s the cut, and the reversible rule that made it safe." />
        <link rel="canonical" href="https://thelastdb.com/blog/no-known-consumers" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">No Known Consumers</h1>
      <p className="post-meta dim">2026-07-05</p>

      <p className="bold white">For months, every release of our database spent five to six hours building software for computers no one was running it on.</p>

      <p>LastDB installs from a <span className="bold">Homebrew tap</span> &mdash; a small public recipe that fetches a prebuilt tarball and drops the binaries on your Mac. To cut a release, an automated job of ours &mdash; our release pipeline &mdash; compiled that tarball once for each target we claimed to support: Apple-Silicon Mac, Intel Mac, and Linux. Three legs. All three ran on a single self-hosted build machine, one after another, each starting from a cold cache and taking an hour and a half to two hours. Do the arithmetic and a release was most of an afternoon.</p>

      <p>That would be a fine price if it bought three audiences. It bought one. When we actually looked at who was pulling each tarball, two of the three legs had <span className="bold white">no known consumers</span> &mdash; not few, none. We were spending the majority of every release compiling artifacts that were downloaded by nobody, then dutifully checksumming them, notarizing them, and publishing them into a void.</p>

      <ArchFigure svg={BEFORE} caption="Fig. 1 — three legs in series on one cold runner; two produce tarballs nobody installs" />

      <p>This week we deleted the two empty legs. The release matrix is now a single target &mdash; Apple-Silicon macOS, the machine our users actually run &mdash; and a release went from five or six hours to about two.</p>

      <Section variant="sage">
        <h2><span className="bold">You are not shipping platforms. You are shipping to people.</span></h2>
        <p>It is easy to describe a build matrix as a list of architectures, because that is what the config file looks like. But an architecture with no users on it isn&rsquo;t coverage &mdash; it&rsquo;s a rehearsal for an audience that never showed. The honest unit isn&rsquo;t &ldquo;platforms we <em>could</em> support,&rdquo; it&rsquo;s &ldquo;people who will download this today.&rdquo; Build for the users you have, not the ones you can imagine having.</p>
      </Section>

      <p>If that sounds like a truism, notice how quietly the opposite becomes the default. Nobody ever decides to build for phantom users. You add a platform once, for a good reason or a hypothetical one, and it never removes itself. Each leg is individually cheap to keep and collectively expensive, and the cost is paid in a place &mdash; a slow release you run infrequently &mdash; where it&rsquo;s easy to shrug at. Ours had grown into most of the clock.</p>

      <p>We&rsquo;ve <Link to="/blog/the-parallelism-tax">written before</Link> about paying for compute we didn&rsquo;t need &mdash; a test suite that re-ran everything on every change. This is its quieter cousin. That one wasted time doing work no change required; this one wasted time producing output no person wanted. Same shape: a cost that scales with your good intentions rather than your actual reach.</p>

      <h2>The part that made it safe to cut</h2>

      <p>The reason we could delete two thirds of the matrix without a meeting is that the decision is <span className="bold white">cheap to reverse</span>. Re-adding a target is a one-line entry in the release config and a corresponding block in the Homebrew recipe. So the rule we wrote down next to the change is not &ldquo;we don&rsquo;t support Linux.&rdquo; It&rsquo;s: <span className="bold">re-add a target the day a real consumer appears &mdash; not before.</span></p>

      <ArchFigure svg={AFTER} caption="Fig. 2 — one leg builds; every other target is a dashed slot, filled on demand" />

      <Section variant="rose">
        <h2><span className="bold">The catch: absence has to fail loudly.</span></h2>
        <p>Cutting a target leaves a trap. The Homebrew recipe still has to know the checksums of whatever the release built, and a stale reference to a platform you <em>stopped</em> building is exactly the kind of thing that rots in silence &mdash; green today, mysteriously broken at some future release. So the tap-bumping script that wires new checksums into the recipe now fails loudly the moment the recipe mentions a target the release didn&rsquo;t produce. The matrix and the recipe can&rsquo;t drift apart quietly; if they disagree, the release stops and says so. A subtraction is only clean if the hole it leaves is noisy.</p>
      </Section>

      <p>None of this is a grand architectural insight. It&rsquo;s release hygiene &mdash; the kind of thing that&rsquo;s obvious in hindsight and invisible in the moment, because the waste lived in a job that ran while everyone was doing something else. The useful habit isn&rsquo;t &ldquo;support fewer platforms.&rdquo; It&rsquo;s: every so often, put a number on the thing you&rsquo;ve been assuming is fine. Ours was five hours an afternoon, spent building for no one.</p>

      <p className="dim">More on how we work &mdash; and where we let a job cost more than it should before we noticed &mdash; over on the <Link to="/blog">blog</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </>
  );
}
