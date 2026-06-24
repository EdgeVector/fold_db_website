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
  <text x="330" y="230" text-anchor="middle" fill="#928374" font-size="11">we argue with it</text>

  <rect x="140" y="276" width="380" height="48" fill="url(#cells1)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="298" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">TASKS</text>
  <text x="330" y="314" text-anchor="middle" fill="#928374" font-size="11">broken down</text>

  <rect x="140" y="360" width="380" height="48" fill="url(#poche1)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="382" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">MERGED CODE</text>
  <text x="330" y="398" text-anchor="middle" fill="#928374" font-size="11">shipped</text>
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
        <title>From a rough idea to a North Star - LastDB</title>
        <meta name="description" content="Every feature starts as a rough idea. Here's what happened to one — 'make AI setup one click' — between the idea and the feature we're shipping." />
        <meta property="og:title" content="From a rough idea to a North Star" />
        <meta property="og:description" content="One-click local AI setup, and cloud chat that doesn't read your data — the path a rough idea took to get there." />
        <link rel="canonical" href="https://thelastdb.com/blog/idea-to-north-star" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">From a rough idea to a North Star</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">Every feature starts as a rough idea. Here&rsquo;s what happened to one of ours &mdash; &ldquo;make AI setup one click&rdquo; &mdash; between the idea and the feature we&rsquo;re shipping.</p>

      <p>A companion to <Link to="/blog/building-lastdb-with-agents">how we build LastDB in the open</Link>. That post is about the system. This one follows a single idea through it.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The problem</h2>
      <p>To use any AI feature in LastDB, you first had to bring an API key. If you didn&rsquo;t have one, you were stuck on day one &mdash; and plenty of people don&rsquo;t have one. So the idea was simple: make setup one click. We pick the models and set them up; you just start.</p>
      <p>Simple to say. The word doing all the work is &ldquo;just.&rdquo;</p>

      <h2>An idea isn&rsquo;t a plan</h2>
      <p>We don&rsquo;t build ideas. We turn them into a <span className="bold">North Star</span> &mdash; a goal with a checkable &ldquo;done.&rdquo; Writing that &ldquo;done&rdquo; is where the vague parts show up.</p>
      <p>&ldquo;Make AI setup one click&rdquo; became: <span className="bold">a new user is using AI in one click, with no key to find, and their data still stays on their machine.</span> Write it that way and the hard questions are right there. Which AI? Running where? And &ldquo;data stays theirs&rdquo; turned out to be the whole problem.</p>

      <ArchFigure svg={FIG_DISCIPLINE} caption="Fig. 1 — From a rough idea to shipped code" />

      <h2>We argue with it first</h2>
      <p>Before we build a plan, we try to break it &mdash; strategy, engineering, and design passes, plus a second AI model whose job is to attack it. That&rsquo;s where the fast version of &ldquo;one click&rdquo; fell apart.</p>

      <h2>The shortcut we didn&rsquo;t take</h2>
      <p>The easy answer was to route everyone&rsquo;s chats through our servers. Setup solved. But that breaks the one thing LastDB promises: <span className="bold">your data stays yours, and our cloud never reads it.</span> We weren&rsquo;t going to trade that for a setup step. So we kept the one click and dropped the version that gets there by reading your data.</p>

      <h2>Most people don&rsquo;t need the cloud anyway</h2>
      <p>For a lot of users this never comes up:</p>
      <ul>
        <li>Bring your own key and your chats go <span className="bold">straight to the provider</span> &mdash; we&rsquo;re never in the middle.</li>
        <li>Run a model on your own machine and <span className="bold">nothing leaves your device.</span></li>
      </ul>
      <p>The one-click cloud option is for people who have neither &mdash; the ones who&rsquo;d otherwise quit at &ldquo;paste a key.&rdquo; The job was to add that on-ramp without turning it into the thing the other two came here to avoid.</p>

      <ArchFigure svg={FIG_PATHS} caption="Fig. 2 — Three ways to chat with your data" />

      <h2>Ship the easy part first</h2>
      <p>Once it was clear, the work split in two. The easy half shipped first: a lot of the AI work &mdash; reading and organizing what you add &mdash; runs on small models that work fine on your own machine. That&rsquo;s now one click and fully local. No account, no key, nothing leaves. Most of the setup pain is just gone.</p>
      <p>The cloud chat part is built to keep us out of your content, and we&rsquo;re shipping the honest version first and hardening it next &mdash; not pretending it&rsquo;s further along than it is.</p>

      <h2>Then it&rsquo;s just work</h2>
      <p>Once it&rsquo;s a North Star with a checkable &ldquo;done,&rdquo; it stops being talk. It gets logged, broken into tasks, and run through the loop that drives them to merged code &mdash; a tracked piece of work with a finish line, not a note someone will get to eventually.</p>
      <p>&ldquo;Make AI setup one click&rdquo; was a fine idea. It got better because we made it survive what we actually believe: no key required, and your data stays yours. That&rsquo;s what a North Star is for.</p>

      <p className="dim">More: <Link to="/blog/building-lastdb-with-agents">how we build LastDB in the open</Link> &mdash; and <Link to="/apps">the apps we build on LastDB</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
