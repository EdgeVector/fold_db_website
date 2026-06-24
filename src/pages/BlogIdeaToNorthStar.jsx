import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Figures are hand-authored architectural line drawings (inline SVG strings,
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
     font-family="'IBM Plex Mono', monospace" role="img" aria-label="From a rough idea to shipped code: five stages — idea, North Star, review, tasks, merged code.">
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
  <text x="330" y="46" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">AN IDEA</text>
  <text x="330" y="62" text-anchor="middle" fill="#928374" font-size="11">rough, one sentence</text>

  <rect x="140" y="108" width="380" height="48" fill="none" stroke="#fe8019" stroke-width="1"/>
  <line x1="159" y1="132" x2="169" y2="132" stroke="#fe8019" stroke-width="1"/>
  <line x1="164" y1="127" x2="164" y2="137" stroke="#fe8019" stroke-width="1"/>
  <text x="334" y="130" text-anchor="middle" fill="#fe8019" font-size="13" letter-spacing="1.5">A NORTH STAR</text>
  <text x="334" y="146" text-anchor="middle" fill="#928374" font-size="11">a checkable &#8220;done&#8221;</text>

  <rect x="140" y="192" width="380" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="214" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">REVIEW</text>
  <text x="330" y="230" text-anchor="middle" fill="#928374" font-size="11">built to be disliked</text>

  <rect x="140" y="276" width="380" height="48" fill="url(#cells1)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="298" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">TASKS</text>
  <text x="330" y="314" text-anchor="middle" fill="#928374" font-size="11">cut into parts</text>

  <rect x="140" y="360" width="380" height="48" fill="url(#poche1)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="382" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">MERGED CODE</text>
  <text x="330" y="398" text-anchor="middle" fill="#928374" font-size="11">built</text>
</svg>`;

const FIG_PATHS = `
<svg viewBox="0 0 660 246" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;height:auto;max-width:620px;display:block;margin:0 auto"
     font-family="'IBM Plex Mono', monospace" role="img" aria-label="Three ways to chat with your data: your own key, a local model, or the one-click managed option.">
  <defs>
    <pattern id="poche2" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>

  <rect x="24" y="92" width="180" height="58" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="114" y="118" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">CHAT WITH</text>
  <text x="114" y="134" text-anchor="middle" fill="#928374" font-size="11">your data</text>

  <line x1="204" y1="121" x2="300" y2="121" stroke="#928374" stroke-width="1"/>
  <line x1="300" y1="44" x2="300" y2="198" stroke="#928374" stroke-width="1"/>

  <rect x="298" y="42" width="4" height="4" fill="#928374"/>
  <line x1="300" y1="44" x2="360" y2="44" stroke="#928374" stroke-width="1"/>
  <polygon points="360,44 354,40 354,48" fill="#928374"/>
  <rect x="360" y="20" width="276" height="48" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="498" y="42" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">YOUR OWN KEY</text>
  <text x="498" y="58" text-anchor="middle" fill="#928374" font-size="11">straight to the provider</text>

  <rect x="298" y="119" width="4" height="4" fill="#928374"/>
  <line x1="300" y1="121" x2="360" y2="121" stroke="#928374" stroke-width="1"/>
  <polygon points="360,121 354,117 354,125" fill="#928374"/>
  <rect x="360" y="97" width="276" height="48" fill="url(#poche2)" stroke="#928374" stroke-width="1"/>
  <text x="498" y="119" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">A LOCAL MODEL</text>
  <text x="498" y="135" text-anchor="middle" fill="#928374" font-size="11">nothing leaves the device</text>

  <rect x="298" y="196" width="4" height="4" fill="#928374"/>
  <line x1="300" y1="198" x2="360" y2="198" stroke="#928374" stroke-width="1"/>
  <polygon points="360,198 354,194 354,202" fill="#928374"/>
  <rect x="360" y="174" width="276" height="48" fill="none" stroke="#fe8019" stroke-width="1"/>
  <text x="498" y="196" text-anchor="middle" fill="#fe8019" font-size="13" letter-spacing="1.5">ONE-CLICK OPTION</text>
  <text x="498" y="212" text-anchor="middle" fill="#928374" font-size="11">no key, stays private</text>
</svg>`;

export default function BlogIdeaToNorthStar() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Against the API key - LastDB</title>
        <meta name="description" content="A database that sends you elsewhere for a credential before it will do anything is not finished. We removed the errand — and refused the shortcut that would have had our cloud read your data." />
        <meta property="og:title" content="Against the API key" />
        <meta property="og:description" content="One click, local by default; cloud chat the user never has to trust. The errand is gone and the shortcut was declined." />
        <link rel="canonical" href="https://thelastdb.com/blog/idea-to-north-star" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Against the API key</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">A database that sends you elsewhere for a credential before it will do anything is not finished. We removed the errand.</p>

      <p>The feature is ordinary enough: the app reads what you give it, and you can put questions to it. Until recently it was gated behind a small humiliation &mdash; produce an API key from some company that is not us, or leave. Shown that door on the first day, most people took it.</p>

      <h2>The obvious solution, declined</h2>
      <p>There is a tidy way to make the errand vanish. Route every question through our servers, supply the intelligence ourselves, bill it to a key the user never sees. We declined it without much ceremony.</p>
      <p>It asks our cloud to read your data &mdash; the single thing this company is built not to do. A convenience bought with the entire premise is not a convenience; it is a price tag in a better typeface. Discarded, and the idea sent back to do the harder thing.</p>

      <h2>What we built instead</h2>
      <p>The work is two things, not one.</p>
      <p>The dull part &mdash; reading and ordering whatever you deposit &mdash; runs on small models entirely at ease on your own machine. One click installs them; nothing leaves. For most people that is the whole feature, and it asks nothing further of them.</p>
      <p>Conversation is the other part, and it wants a model too large to keep at home. So the user chooses, and the choices are not interchangeable.</p>

      <ArchFigure svg={FIG_PATHS} caption="Fig. 1 — Three ways to chat with your data" />

      <p>Bring your own key and you address the provider directly; we are not in the room. Run your own large model and the room is your laptop. Or take the one-click option &mdash; meant for those who have neither &mdash; arranged so the content passes through us without ever being legible to us. Private by construction, not by assurance. The honest version of it ships now and a stricter one follows; we will say so rather than imply otherwise.</p>

      <h2>Method</h2>
      <p>An idea is not promoted here for being agreeable. It is fixed into a goal that can be checked, handed to several disciplines and to a machine instructed to find it contemptible, cut into parts, and built. The drawing, for those who collect them:</p>

      <ArchFigure svg={FIG_DISCIPLINE} caption="Fig. 2 — From a rough idea to shipped code" />

      <p>None of this is generosity. It is merely correct. A tool that makes you fetch a key, or quietly reads your files to spare you the bother, has only mistaken its own convenience for yours.</p>

      <p className="dim">From the same office: <Link to="/blog/building-lastdb-with-agents">how we build LastDB in the open</Link> &mdash; and <Link to="/apps">the apps we build on LastDB</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
