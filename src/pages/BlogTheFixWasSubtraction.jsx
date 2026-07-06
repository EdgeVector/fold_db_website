import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored/scanned bulk, joint marks, mono caps labels, a single
// accent — red marks waste and the wrong assumption, sage marks the keyed read).
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

// 1 — two ways to read one record. Left: haul the whole collection over, keep
// one row, discard the rest. Right: ask for the one row by name; the index
// hands it back. Red marks the thrown-away bulk; sage marks the keyed read.
const TWO_READS = `${SVG_OPEN('0 0 660 320')}
  <text x="165" y="26" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">SCAN, THEN FILTER</text>
  <rect x="60" y="44" width="210" height="150" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="165" y="120" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">~1,200 ROWS</text>
  <text x="165" y="138" text-anchor="middle" fill="#928374" font-size="10">hauled over the wire</text>
  <line x1="165" y1="194" x2="165" y2="228" stroke="#928374" stroke-width="1"/>
  <rect x="163" y="194" width="4" height="4" fill="#928374"/>
  <rect x="126" y="228" width="78" height="30" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="165" y="247" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">1 KEPT</text>
  <text x="165" y="284" text-anchor="middle" fill="#fb4934" font-size="10">1,199 discarded in memory</text>
  <line x1="126" y1="298" x2="204" y2="298" stroke="#fb4934" stroke-width="1" stroke-dasharray="3 3"/>

  <line x1="330" y1="30" x2="330" y2="300" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="495" y="26" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">READ BY KEY</text>
  <rect x="400" y="44" width="190" height="150" fill="none" stroke="#928374" stroke-width="1"/>
  <line x1="400" y1="70" x2="590" y2="70" stroke="#504945" stroke-width="1"/>
  <line x1="400" y1="96" x2="590" y2="96" stroke="#504945" stroke-width="1"/>
  <rect x="400" y="96" width="190" height="26" fill="url(#poche)" stroke="#83a598" stroke-width="1.5"/>
  <line x1="400" y1="148" x2="590" y2="148" stroke="#504945" stroke-width="1"/>
  <line x1="400" y1="174" x2="590" y2="174" stroke="#504945" stroke-width="1"/>
  <text x="360" y="112" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">KEY</text>
  <line x1="330" y1="109" x2="398" y2="109" stroke="#83a598" stroke-width="1"/>
  <rect x="396" y="107" width="4" height="4" fill="#83a598"/>
  <text x="495" y="243" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">THE ONE ROW</text>
  <text x="495" y="261" text-anchor="middle" fill="#928374" font-size="10">straight off the index</text>
  <text x="495" y="284" text-anchor="middle" fill="#83a598" font-size="10">nothing hauled, nothing discarded</text>
</svg>`;

// 2 — the tower. A full-scan foundation, and three workarounds stacked on top
// of it, each defending against a cost the scan created. Strike the foundation
// and the whole stack comes down; a single keyed line stands where it was.
const THE_TOWER = `${SVG_OPEN('0 0 660 300')}
  <text x="180" y="26" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">BUILT ON THE SCAN</text>
  <rect x="70" y="210" width="220" height="46" fill="url(#poche)" stroke="#fb4934" stroke-width="1.5"/>
  <text x="180" y="231" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">FULL SCAN</text>
  <text x="180" y="247" text-anchor="middle" fill="#fb4934" font-size="9">the wrong assumption</text>

  <rect x="88" y="166" width="184" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="180" y="187" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">RETRY LOOP</text>
  <rect x="106" y="126" width="148" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="180" y="147" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">FAST-MISS</text>
  <rect x="124" y="86" width="112" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="180" y="107" text-anchor="middle" fill="#ebdbb2" font-size="10" letter-spacing="0.5">RETRY CAP</text>
  <line x1="120" y1="70" x2="240" y2="70" stroke="#fb4934" stroke-width="1"/>
  <line x1="120" y1="74" x2="240" y2="66" stroke="#fb4934" stroke-width="1" stroke-dasharray="2 3"/>

  <line x1="356" y1="60" x2="356" y2="266" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="510" y="26" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">WHAT REPLACED IT</text>
  <line x1="430" y1="150" x2="590" y2="150" stroke="#83a598" stroke-width="1.5"/>
  <rect x="428" y="148" width="4" height="4" fill="#83a598"/>
  <rect x="588" y="148" width="4" height="4" fill="#83a598"/>
  <text x="510" y="140" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1">ONE KEYED READ</text>
  <text x="510" y="176" text-anchor="middle" fill="#928374" font-size="10">nothing to defend,</text>
  <text x="510" y="192" text-anchor="middle" fill="#928374" font-size="10">so nothing to keep</text>
</svg>`;

export default function BlogTheFixWasSubtraction() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Fix Was Subtraction - LastDB</title>
        <meta name="description" content="To read one record, our tooling hauled a thousand across the wire — and years of retry loops and heuristics had grown to defend that scan. Deleting it turned 20 seconds into a tenth of one. On measuring before you name a cause." />
        <meta property="og:title" content="The Fix Was Subtraction" />
        <meta property="og:description" content="To read one record, our tools scanned a thousand and kept one — and years of retry loops and heuristics had grown up to survive that scan. The store served a keyed read all along. The fix removed code, and 20 seconds became a tenth of one." />
        <link rel="canonical" href="https://thelastdb.com/blog/the-fix-was-subtraction" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The Fix Was Subtraction</h1>
      <p className="post-meta dim">2026-07-05</p>

      <p className="bold white">The slowest thing in our own tooling wasn&rsquo;t a missing feature. It was a small tower of fixes, each one correct, each one added to survive a mistake nobody had noticed. <span className="white">Pulling the tower down was faster than anything we could have built on top of it</span> &mdash; and pulling it down started with deleting the thing at the bottom.</p>

      <p>We build LastDB with two apps that run on LastDB: a kanban board the agent fleet works from, and a Brain the fleet reads and writes. Both had gotten slow in the small, corrosive way that doesn&rsquo;t trip an alarm. Showing a single card took the better part of twenty seconds. A single write to the Brain took five. Nothing was broken; everything was just heavy, all the time, and the fleet waded through it.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Two wrong stories</h2>
      <p>The first explanation was load. There was a release build running; the machine felt busy; &ldquo;it&rsquo;s a build storm&rdquo; is the kind of sentence that ends an investigation, because it sounds like a diagnosis. Then someone actually looked: the CPU was sixty-two percent idle. Whatever was slow was not fighting for a processor.</p>

      <p>The second explanation was the handshake &mdash; the little authentication step each command does before it talks to the node. The logs even said it failed: <span className="dim">exchange failed &mdash; proceeding unattested.</span> Obvious culprit; surely it was hanging. So we timed it. It failed in three hundredths of a second. A clean, fast failure that the command shrugged off and moved past. Not the villain either.</p>

      <p>Both stories were confident, plausible, and wrong. The thing that finally told the truth was the least clever move available: put a timestamp on every line and watch where the seconds actually went. Reading one card by name, the command did a few quick things &mdash; and then sat for nineteen seconds inside a single step, hauling the <em>entire</em> collection of cards across the wire, more than a thousand rows, to pick out the one it had asked for and throw the rest away.</p>

      <ArchFigure svg={TWO_READS} caption="Fig. 1 — two ways to read one record: haul the whole set and keep one, or ask the index for one by name" />

      <Section variant="rose">
        <h2><span className="bold">The assumption underneath</span></h2>
        <p>Why would a program scan a thousand rows to find one it can name exactly? Because somewhere in its history the client decided the store couldn&rsquo;t filter &mdash; that &ldquo;fetch everything and find it in memory&rdquo; was the only shape a read could take. Written down once, that assumption never got questioned, because everything downstream of it worked. It was slow, but it was correct. And correctness is a great disguise for a mistake: it keeps the thing alive long enough for other code to grow up around it and depend on its shape.</p>
      </Section>

      <h2>The tower</h2>
      <p>And other code had. A full scan of a large, long-lived collection is not just slow &mdash; it&rsquo;s occasionally <em>flaky</em>. The scan reads the collection page by page, and a row that&rsquo;s plainly there can fall off a page mid-read, so every so often the scan came back empty-handed for a record that existed. So a retry loop had been added, to ride that out. But retrying every miss made a genuinely-absent record expensive, so a &ldquo;fast-miss&rdquo; heuristic had been added on top: if a page came back populated but without your row, stop &mdash; that&rsquo;s an authoritative no. But a brand-new collection starts empty, and the retry loop would stall on it, so a cap had been added on top of <em>that</em>, to bound the wait.</p>

      <p>Three layers, each a real fix to a real symptom, each locally correct. And every one of them existed to defend the scan &mdash; to make a read that hauls a thousand rows tolerable, predictable, and safe. None of them defended anything the reader actually needed. They were a tower built entirely on a foundation that shouldn&rsquo;t have been poured.</p>

      <ArchFigure svg={THE_TOWER} caption="Fig. 2 — the workarounds all rested on the scan; remove the scan and the stack comes down with it" />

      <Section variant="sage">
        <h2><span className="bold">The store could always do this</span></h2>
        <p>LastDB serves a keyed read: ask for a record by its name and it returns that one row, straight off an index, in a few hundredths of a second. It always could. The scan wasn&rsquo;t a limitation the client was working around &mdash; it was performance the client was leaving on the floor. The whole tower had been built to survive the <em>absence</em> of a thing that was there the entire time.</p>
      </Section>

      <p>So the fix was a keyed read where the scan had been. And here is the part worth keeping: the tower didn&rsquo;t need to be ported, tuned, or carefully preserved. It needed to be <em>deleted</em>. The retry loop rode out a flake the scan produced &mdash; a keyed read doesn&rsquo;t flake (we hammered it a hundred and eighty times, sequential and concurrent, and it never once missed). The fast-miss heuristic sorted &ldquo;empty page&rdquo; from &ldquo;your row fell off the page&rdquo; &mdash; a keyed read has no page. The cap protected against a stall that no longer exists.</p>

      <p>We didn&rsquo;t adjust any of it. We took it all out. Reading a card went from about twenty seconds to a tenth of one; the Brain write went from five seconds to one. The change removed more code than it added.</p>

      <h2>What the whole detour was actually about</h2>
      <p>Two lessons came out of it, and the small one is the famous one: <span className="bold">measure before you name a cause.</span> We had two fluent explanations &mdash; load, then the handshake &mdash; and both survived right up until a timestamp on each line made them impossible. A story that sounds like a diagnosis is not a diagnosis. The seconds are somewhere specific; go find where.</p>

      <p>The larger lesson is about the tower. <span className="bold">Complexity accretes to defend a wrong assumption.</span> No one sits down to build a retry-loop-fast-miss-cap apparatus; it grows, one honest fix at a time, each responding to a real symptom thrown off by the mistake at the base. Every layer is defensible on its own. The whole is a monument to something that was never true. So when you find code that is slow and thickly wrapped in defenses, the useful question isn&rsquo;t <em>how do I make the defenses better.</em> It&rsquo;s <em>what are these defending, and is it real.</em> Sometimes the answer is that the thing at the bottom shouldn&rsquo;t be there &mdash; and the best change you can make is to take it out.</p>

      <p>The most satisfying fixes don&rsquo;t add a clever thing. They remove a thing that was never needed, and quietly demolish the scaffolding that had grown up to survive it. A keyed read, and a subtraction.</p>

      <p className="dim">More on distrusting a confident story until it&rsquo;s proven: <Link to="/blog/prove-it-to-land">Prove It To Land</Link>. And on serving what you can when one slice is out of sync: <Link to="/blog/degrade-dont-die">Degrade, Don&rsquo;t Die</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
