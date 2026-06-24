import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for the heavy / owned thing, joint marks, dimension lines, mono
// caps labels, one accent for "the friction / the move"). Inline SVG, no Mermaid.
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

// 1 — the key: the app sends you across to fetch the secret. You do the work.
const FIG_KEY = `${SVG_OPEN('0 0 660 168')}
  <rect x="32" y="54" width="128" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="96" y="86" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">YOU</text>

  <rect x="492" y="42" width="144" height="80" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="564" y="76" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">PROVIDER</text>
  <text x="564" y="94" text-anchor="middle" fill="#ebdbb2" font-size="10">holds the key</text>

  <rect x="158" y="80" width="4" height="4" fill="#83a598"/>
  <line x1="162" y1="82" x2="484" y2="82" stroke="#83a598" stroke-width="1" stroke-dasharray="2 3"/>
  <polygon points="492,82 483,78 483,86" fill="#83a598"/>
  <text x="324" y="74" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">GO. FETCH THE SECRET. CARRY IT BACK.</text>
  <text x="324" y="104" text-anchor="middle" fill="#928374" font-size="10">the work the app handed you</text>
</svg>`;

// 2 — the llama: ownership bought by becoming the operator. Gigabytes you host.
const FIG_LLAMA = `${SVG_OPEN('0 0 660 208')}
  <rect x="168" y="34" width="324" height="150" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="56" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR MACHINE</text>

  <rect x="206" y="78" width="248" height="62" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="106" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">THE MODEL</text>
  <text x="330" y="124" text-anchor="middle" fill="#ebdbb2" font-size="10">weights, drivers, versions</text>

  <line x1="206" y1="152" x2="206" y2="160" stroke="#83a598" stroke-width="1"/>
  <line x1="454" y1="152" x2="454" y2="160" stroke="#83a598" stroke-width="1"/>
  <line x1="206" y1="156" x2="454" y2="156" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="174" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">GIGABYTES YOU NOW HOST</text>
</svg>`;

// 3 — the gateway: the capability arrives brokered; your side of the line keeps
// its data. Ease without surrender.
const FIG_GATEWAY = `${SVG_OPEN('0 0 660 178')}
  <rect x="28" y="62" width="150" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="103" y="88" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">THE APP</text>
  <text x="103" y="106" text-anchor="middle" fill="#928374" font-size="10">where you arrive</text>

  <rect x="258" y="50" width="160" height="80" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="338" y="84" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">LASTDB</text>
  <text x="338" y="102" text-anchor="middle" fill="#ebdbb2" font-size="10">the gateway</text>

  <rect x="500" y="62" width="132" height="56" fill="none" stroke="#504945" stroke-width="1"/>
  <text x="566" y="88" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.2">CAPABILITY</text>
  <text x="566" y="106" text-anchor="middle" fill="#928374" font-size="10">brokered</text>

  <rect x="176" y="88" width="4" height="4" fill="#83a598"/>
  <line x1="180" y1="90" x2="256" y2="90" stroke="#83a598" stroke-width="1"/>
  <rect x="256" y="88" width="4" height="4" fill="#83a598"/>

  <line x1="418" y1="90" x2="498" y2="90" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <polygon points="500,90 491,86 491,94" fill="#928374"/>

  <line x1="460" y1="32" x2="460" y2="160" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="244" y="152" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">YOURS — NO KEY, NOTHING TO DOWNLOAD</text>
  <text x="566" y="152" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">THEIRS</text>
</svg>`;

export default function BlogDoYouHaveAnApiKey() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Key, Llama, Gateway - LastDB</title>
        <meta name="description" content="Two fashionable ways to greet a user, both insults: ask for an API key, or ask them to download a llama. The cloud and the local machine, the same gesture — the software handing you its unfinished work. At LastDB we take the third position: a gateway. Ease without surrender." />
        <meta property="og:title" content="Key, Llama, Gateway" />
        <meta property="og:description" content="The API key is friction disguised as control. The local model is friction disguised as freedom. The gateway is the position nobody sells, because it is harder to build than to argue against." />
        <link rel="canonical" href="https://thelastdb.com/blog/do-you-have-an-api-key" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Key, Llama, Gateway</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">Every interface is a negotiation between what the software should do and what it makes you do instead. Most software negotiates badly. Then it calls the result <span className="white">onboarding.</span></p>

      <p>There are two fashionable ways to greet a user, and both are insults. The first asks for an API key. The second asks you to download a llama. They appear to be opposites &mdash; the cloud and the local machine, the rented brain and the owned one. They are the same gesture: the software handing you its unfinished work and watching you finish it.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The key</h2>
      <p>&ldquo;Do you have an API key?&rdquo; is friction disguised as control. You leave the application. You open a dashboard, create an account, attach a card, generate a secret, and carry it back like a permit. The application has informed you, politely, that the part worth using is not in the application. You are now its billing department, and its liability.</p>

      <ArchFigure svg={FIG_KEY} caption="Fig. 1 — the key: the user is sent to do the work" />

      <h2>The llama</h2>
      <p>The rival camp answers: run the model yourself. Freedom, they call it. It is friction disguised as freedom. Gigabytes descend onto your machine. The laptop becomes a furnace. You maintain weights, drivers, versions &mdash; a small data center operated by an amateur, who is you. Ownership, purchased at the price of becoming an operator.</p>

      <ArchFigure svg={FIG_LLAMA} caption="Fig. 2 — the llama: ownership at the price of becoming the operator" />

      <Section variant="rose">
        <h2><span className="bold">Two frictions, one alibi</span></h2>
        <p>The industry presents this as a choice &mdash; cloud or local, key or llama &mdash; and names the choice <em>freedom.</em> It is not freedom. It is abdication, performed twice. Both options agree on the only point that matters: the user will do the work. They dispute nothing but the location of the suffering.</p>
        <p>We are Dutch. We do not find this charming.</p>
      </Section>

      <h2>The gateway</h2>
      <p>At LastDB we take the third position &mdash; the one nobody sells, because it is harder to build than to argue against. A gateway, through LastDB. The capability arrives <span className="bold">brokered</span>: no key to fetch, no weights to host. Your data stays on your side of the line. The user arrives, and the work is already done.</p>

      <Section variant="sage">
        <h2><span className="bold">Ease is not the opposite of ownership</span></h2>
        <p>The market has spent a decade insisting you must trade one for the other &mdash; convenience or control, pick a wall to stand against. That trade is not a law of nature. It is a failure of engineering, rebranded as a virtue by the people unwilling to fix it.</p>
        <p>The correct amount of friction between a user and the value they came for is <span className="bold">none</span> &mdash; and not one byte of ownership spent to remove it.</p>
      </Section>

      <ArchFigure svg={FIG_GATEWAY} caption="Fig. 3 — the gateway: ease, ownership intact" />

      <h2>The position</h2>
      <p>Key, llama, gateway. The first bills you. The second conscripts you. The third asks nothing and keeps your data where it belongs. The first two are not choices; they are someone else&rsquo;s unfinished work, handed over with a smile and a meter. We decline to pass it on to you.</p>

      <p className="dim">LastDB keeps your data on your side of the line. See the <Link to="/apps">open-source apps built on it</Link>, or how we <Link to="/blog/building-lastdb-with-agents">build LastDB in the open</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
