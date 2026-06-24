import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// The figure is a hand-authored architectural line drawing (inline SVG string,
// rendered via dangerouslySetInnerHTML so the SVG grammar stays verbatim).
// Thin uniform strokes, poché hatch for "solid/built", a measured story-pole,
// joints, orthogonal connectors, one accent (#fe8019). No auto-layout.
const MONO = "'IBM Plex Mono', monospace";

function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '2em 0', textAlign: 'center' }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      <figcaption style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '1px', color: '#928374', textTransform: 'uppercase', marginTop: '0.7em' }}>
        {caption}
      </figcaption>
    </figure>
  );
}

const FIG_DISCIPLINE = `
<svg viewBox="0 0 660 432" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;height:auto;max-width:620px;display:block;margin:0 auto"
     font-family="'IBM Plex Mono', monospace" role="img" aria-label="The path of a job: a sentence, a fixed point, review, parts, built.">
  <defs>
    <pattern id="poche1" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
    <pattern id="cells1" width="26" height="48" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="48" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>

  <line x1="80" y1="24" x2="80" y2="408" stroke="#928374" stroke-width="1"/>
  <line x1="72" y1="24" x2="88" y2="24" stroke="#928374" stroke-width="1"/>
  <line x1="72" y1="408" x2="88" y2="408" stroke="#928374" stroke-width="1"/>
  <line x1="74" y1="48" x2="86" y2="48" stroke="#928374" stroke-width="1"/>
  <text x="64" y="51" text-anchor="end" fill="#928374" font-size="10">01</text>
  <line x1="74" y1="132" x2="86" y2="132" stroke="#928374" stroke-width="1"/>
  <text x="64" y="135" text-anchor="end" fill="#928374" font-size="10">02</text>
  <line x1="74" y1="216" x2="86" y2="216" stroke="#928374" stroke-width="1"/>
  <text x="64" y="219" text-anchor="end" fill="#928374" font-size="10">03</text>
  <line x1="74" y1="300" x2="86" y2="300" stroke="#928374" stroke-width="1"/>
  <text x="64" y="303" text-anchor="end" fill="#928374" font-size="10">04</text>
  <line x1="74" y1="384" x2="86" y2="384" stroke="#928374" stroke-width="1"/>
  <text x="64" y="387" text-anchor="end" fill="#928374" font-size="10">05</text>

  <rect x="328" y="70" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="72" x2="330" y2="108" stroke="#928374" stroke-width="1"/>
  <polygon points="330,108 326,102 334,102" fill="#928374"/>
  <rect x="328" y="154" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="156" x2="330" y2="192" stroke="#928374" stroke-width="1"/>
  <polygon points="330,192 326,186 334,186" fill="#928374"/>
  <rect x="328" y="238" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="240" x2="330" y2="276" stroke="#928374" stroke-width="1"/>
  <polygon points="330,276 326,270 334,270" fill="#928374"/>
  <rect x="328" y="322" width="4" height="4" fill="#928374"/>
  <line x1="330" y1="324" x2="330" y2="360" stroke="#928374" stroke-width="1"/>
  <polygon points="330,360 326,354 334,354" fill="#928374"/>

  <rect x="140" y="24" width="380" height="48" fill="none" stroke="#928374" stroke-width="1" stroke-dasharray="5 4"/>
  <text x="330" y="46" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">A SENTENCE</text>
  <text x="330" y="62" text-anchor="middle" fill="#928374" font-size="11">the job, stated once</text>

  <rect x="140" y="108" width="380" height="48" fill="none" stroke="#fe8019" stroke-width="1"/>
  <line x1="159" y1="132" x2="169" y2="132" stroke="#fe8019" stroke-width="1"/>
  <line x1="164" y1="127" x2="164" y2="137" stroke="#fe8019" stroke-width="1"/>
  <text x="334" y="130" text-anchor="middle" fill="#fe8019" font-size="13" letter-spacing="1.5">A FIXED POINT</text>
  <text x="334" y="146" text-anchor="middle" fill="#928374" font-size="11">a checkable &#8220;done&#8221;</text>

  <rect x="140" y="192" width="380" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="214" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">REVIEW</text>
  <text x="330" y="230" text-anchor="middle" fill="#928374" font-size="11">paid to dislike it</text>

  <rect x="140" y="276" width="380" height="48" fill="url(#cells1)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="298" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">PARTS</text>
  <text x="330" y="314" text-anchor="middle" fill="#928374" font-size="11">cut up, handed out</text>

  <rect x="140" y="360" width="380" height="48" fill="url(#poche1)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="382" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">BUILT</text>
  <text x="330" y="398" text-anchor="middle" fill="#928374" font-size="11">merged, overnight</text>
</svg>`;

export default function BlogIdeaToNorthStar() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Against authorship - LastDB</title>
        <meta name="description" content="The interesting part of a feature is never the feature, but the procedure that produced it — and the awkward fact that, by the end, no one in particular produced it at all." />
        <meta property="og:title" content="Against authorship" />
        <meta property="og:description" content="A sentence pinned to a fixed point, handed to a machine paid to dislike it, cut into parts, and built overnight by agents while no one was at the desk." />
        <link rel="canonical" href="https://thelastdb.com/blog/idea-to-north-star" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Against authorship</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">The interesting part of a feature is never the feature. It is the procedure that produced it &mdash; and the awkward fact that, by the end, no one in particular produced it at all.</p>

      <p>A job arrives as a sentence. This one concerned setup; it could have been anything, and the sentence is the least important thing in this account.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>A fixed point</h2>
      <p>Nothing is built from a sentence. It is first pinned to a fixed point &mdash; a goal stated precisely enough that one can be wrong about having reached it. Everything upstream of that point is opinion, and is handled as opinion: quickly, and without sentiment.</p>

      <h2>Paid to dislike it</h2>
      <p>The plan is then handed to people whose task is to find it wanting, and to a second machine assigned that task and no other. What survives is seldom what entered. We are spared our affection for the first draft; the procedure does not share it.</p>

      <ArchFigure svg={FIG_DISCIPLINE} caption="Fig. — A job, from sentence to structure" />

      <h2>Built overnight</h2>
      <p>Then the part that unsettles visitors. The surviving plan is cut into parts and given to a loop of agents that write the code, argue among themselves, open their own proposals, and merge them &mdash; mostly at hours when no one is at the desk. The building goes up overnight. In the morning there is a structure where there had been a drawing, and a short note listing the few decisions it declined to make alone.</p>

      <h2>The absent architect</h2>
      <p>Our part in this is smaller than any firm would admit in its monograph. We set the fixed point, and we answer the handful of questions a machine is right to refuse &mdash; what reaches the public, what costs money, what cannot be undone. The remainder proceeds without us, and is the better for it.</p>

      <p>People want to be told how a thing was built, and are disappointed to learn it was not, in the end, built by anyone. The drawing was exact. The labour was delegated. The architect, having drawn, left the room &mdash; which is, properly understood, the whole of the craft.</p>

      <p className="dim">Seen at length: <Link to="/blog/building-lastdb-with-agents">how we build LastDB in the open</Link> &mdash; and <Link to="/apps">the apps we build on LastDB</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
