import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for the thing that holds the value, joint marks, mono caps labels,
// a single accent for "the key / the catch"). Inline SVG — no auto-layout.
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

// 1 — the rental: the app is a thin passthrough; the value lives in the
// provider's cloud; the meter runs back to you.
const RENTAL = `${SVG_OPEN('0 0 660 200')}
  <rect x="28" y="56" width="104" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="80" y="86" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">YOU</text>

  <rect x="236" y="56" width="156" height="50" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="314" y="80" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">THE APP</text>
  <text x="314" y="96" text-anchor="middle" fill="#928374" font-size="10">a thin client</text>

  <rect x="496" y="44" width="140" height="74" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="566" y="76" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">PROVIDER</text>
  <text x="566" y="94" text-anchor="middle" fill="#ebdbb2" font-size="10">the value lives here</text>

  <rect x="130" y="79" width="4" height="4" fill="#928374"/>
  <line x1="132" y1="81" x2="236" y2="81" stroke="#928374" stroke-width="1"/>
  <rect x="234" y="79" width="4" height="4" fill="#928374"/>
  <text x="184" y="72" text-anchor="middle" fill="#928374" font-size="10">1 — your key</text>

  <rect x="390" y="79" width="4" height="4" fill="#928374"/>
  <line x1="392" y1="81" x2="496" y2="81" stroke="#928374" stroke-width="1"/>
  <rect x="494" y="79" width="4" height="4" fill="#928374"/>
  <text x="444" y="72" text-anchor="middle" fill="#928374" font-size="10">2 — your data</text>

  <line x1="496" y1="95" x2="400" y2="95" stroke="#928374" stroke-width="1"/>
  <polygon points="392,95 401,91 401,99" fill="#928374"/>
  <text x="446" y="111" text-anchor="middle" fill="#928374" font-size="10">3 — the answer</text>

  <polyline points="566,118 566,158 80,158 80,106" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="2 3"/>
  <polygon points="80,106 76,115 84,115" fill="#83a598"/>
  <text x="323" y="176" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="0.5">THE METER RUNS — THE BILL FINDS YOU</text>
</svg>`;

// 2 — one bearer secret, copied into every app; each copy a place it can leak
// and a pipe your data flows down to the provider.
const SPRAWL = `${SVG_OPEN('0 0 660 248')}
  <rect x="252" y="26" width="156" height="46" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="50" text-anchor="middle" fill="#83a598" font-size="13" letter-spacing="1.5">ONE API KEY</text>
  <text x="330" y="66" text-anchor="middle" fill="#928374" font-size="10">a bearer secret</text>

  <rect x="64" y="120" width="120" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="124" y="147" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">APP A</text>
  <rect x="270" y="120" width="120" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="147" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">APP B</text>
  <rect x="476" y="120" width="120" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="536" y="147" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">APP C</text>

  <polyline points="330,72 330,98 124,98 124,120" fill="none" stroke="#83a598" stroke-width="1"/>
  <line x1="330" y1="72" x2="330" y2="120" stroke="#83a598" stroke-width="1"/>
  <polyline points="330,72 330,98 536,98 536,120" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="122" y="118" width="4" height="4" fill="#83a598"/>
  <rect x="328" y="118" width="4" height="4" fill="#83a598"/>
  <rect x="534" y="118" width="4" height="4" fill="#83a598"/>

  <rect x="252" y="202" width="156" height="42" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="227" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">PROVIDER</text>

  <polyline points="124,164 124,186 330,186" fill="none" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <polyline points="536,164 536,186 330,186" fill="none" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="330" y1="164" x2="330" y2="202" stroke="#928374" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="150" y="180" text-anchor="middle" fill="#928374" font-size="10">data ↓</text>
</svg>`;

// 3 — two stances. RENT: the key bridges across the boundary to value in the
// cloud. OWN: the value sits on your side of the line, nothing to call.
const STANCE = `${SVG_OPEN('0 0 660 248')}
  <text x="172" y="34" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RENT</text>
  <text x="172" y="50" text-anchor="middle" fill="#928374" font-size="10">phone home first</text>
  <text x="492" y="34" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">OWN</text>
  <text x="492" y="50" text-anchor="middle" fill="#928374" font-size="10">local-first</text>

  <line x1="36" y1="150" x2="308" y2="150" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <line x1="356" y1="150" x2="624" y2="150" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="36" y="142" fill="#928374" font-size="9" letter-spacing="0.5">YOUR DEVICE</text>
  <text x="36" y="167" fill="#928374" font-size="9" letter-spacing="0.5">THEIR CLOUD</text>
  <text x="356" y="142" fill="#928374" font-size="9" letter-spacing="0.5">YOUR DEVICE</text>
  <text x="356" y="167" fill="#928374" font-size="9" letter-spacing="0.5">nothing to call</text>

  <rect x="92" y="80" width="160" height="44" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="172" y="107" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">THE APP</text>
  <rect x="92" y="178" width="160" height="44" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="172" y="205" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">THE VALUE</text>
  <rect x="170" y="122" width="4" height="4" fill="#83a598"/>
  <line x1="172" y1="124" x2="172" y2="178" stroke="#83a598" stroke-width="1"/>
  <rect x="170" y="176" width="4" height="4" fill="#83a598"/>
  <text x="182" y="156" fill="#83a598" font-size="10" letter-spacing="1">API KEY</text>

  <rect x="412" y="80" width="160" height="62" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="492" y="106" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">THE APP</text>
  <text x="492" y="124" text-anchor="middle" fill="#ebdbb2" font-size="10">+ the value</text>
</svg>`;

export default function BlogDoYouHaveAnApiKey() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Do You Have an API Key? - LastDB</title>
        <meta name="description" content="The first thing too many AI apps ask you isn't what you want to do — it's for your credentials to somebody else's cloud. That question is a confession: the value isn't in the app, it's rented, and you are the one holding the meter. The API-key screen is the visible tip of phone-home architecture." />
        <meta property="og:title" content="Do You Have an API Key?" />
        <meta property="og:description" content="The 'paste your API key' onboarding screen is a confession — the value isn't in the app, it's rented, and you're the integration layer. A note on phone-home architecture and the local-first alternative." />
        <link rel="canonical" href="https://thelastdb.com/blog/do-you-have-an-api-key" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Do You Have an API Key?</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">You download a new app. It looks promising. Then, before it will do a single useful thing, it asks the question: <span className="white">&ldquo;Paste your API key.&rdquo;</span> Not what you want to build &mdash; your credentials to somebody else&rsquo;s cloud. That screen is not a setup step. It is a confession.</p>

      <p>The confession is this: the part of the app that creates the value isn&rsquo;t in the app. It lives in a provider&rsquo;s data center, behind a metered endpoint, and the app you just installed is a thin client renting access on your behalf. The key is how the bill finds its way back to you, and how the liability is quietly handed over with it.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The friction is the easy part to see</h2>
      <p>Everyone has felt the obvious cost. To use the app, you first have to leave it: open a provider&rsquo;s dashboard, create an account, attach a credit card, generate a secret, copy it, come back, and paste it into a text box you have no way to verify is safe. The install-to-value path &mdash; the whole reason onboarding exists &mdash; now detours through a third party&rsquo;s billing portal. A meaningful share of people simply never come back.</p>

      <ArchFigure svg={RENTAL} caption="Fig. 1 — the app is a passthrough; the value lives in the cloud; the meter runs to you" />

      <p>But the friction is only the symptom you happen to notice. The interesting costs are the ones the key screen hides.</p>

      <Section variant="rose">
        <h2><span className="bold">What the key screen actually hands over</span></h2>
        <p>An API key is a <span className="bold">bearer secret</span> &mdash; whoever holds it can spend on your account. The moment you paste it into an app, you are trusting that app, its updates, its crash logs, and its analytics not to mishandle it. Do that across five apps and your one key now lives in five places, each an independent way for it to leak.</p>
        <p>And it isn&rsquo;t only the key. Everything you do flows <em>through</em> the provider: your prompts, your documents, your data, routed out to a cloud you don&rsquo;t control so the app can borrow a brain it never had. You wanted a tool. You got a pipe.</p>
      </Section>

      <ArchFigure svg={SPRAWL} caption="Fig. 2 — one bearer secret, copied into every app; each copy a leak point and a pipe to the provider" />

      <p>There is a durability cost too. A rented capability can be revoked, repriced, rate-limited, or deprecated on someone else&rsquo;s schedule. The provider sunsets a model and the app breaks. The price doubles and your &ldquo;one-time purchase&rdquo; quietly becomes a subscription you pay to a company you never bought anything from. You don&rsquo;t own the thing that makes the app worth using. You&rsquo;re holding the meter.</p>

      <h2>It&rsquo;s the same disease, wearing a different mask</h2>
      <p>Pull the camera back and the API-key screen looks familiar. It is the visible tip of an architecture where the thing of value lives in someone else&rsquo;s cloud and the software on your machine is a courier &mdash; reaching out, phoning home, asking permission before it can act. We have seen this shape before. It is exactly the shape of an app that keeps <span className="bold">your data</span> on its servers, where you visit it as a guest.</p>
      <p>&ldquo;Do you have an API key?&rdquo; and &ldquo;Please log in to access your files&rdquo; are the same sentence. Both relocate the center of gravity off your device and into a vendor&rsquo;s account. Both make you the integration layer in your own software &mdash; the human glue holding together services that work for someone else.</p>

      <Section variant="sage">
        <h2><span className="bold">The other stance: own, don&rsquo;t rent</span></h2>
        <p>Local-first inverts the geometry. The value &mdash; your data, and the work the tool does on it &mdash; sits on <span className="bold">your</span> side of the line. The software runs for you, on your machine, and doesn&rsquo;t make &ldquo;phone home and authenticate to a third party&rdquo; the precondition for being useful. The first screen is the app, not a billing portal.</p>
        <p>This is the whole premise of LastDB: a database that lives with you and your data, not one you rent a window into. We don&rsquo;t think the question an app greets you with should be whether you&rsquo;ve sorted out your account with some other company first.</p>
      </Section>

      <ArchFigure svg={STANCE} caption="Fig. 3 — rent: the key bridges to value in the cloud · own: the value is already on your side" />

      <h2>Where this leaves AI</h2>
      <p>None of this is a claim that nothing should ever call a cloud. Real capabilities live in providers&rsquo; data centers, and that&rsquo;s genuinely useful. The argument is narrower and sharper: <span className="bold">the user should not be the one wiring it up.</span> Making &ldquo;do you have an API key?&rdquo; the front door offloads the cost, the secret, the billing, and the liability onto the person least equipped to carry them &mdash; and calls it onboarding.</p>
      <p>When an app makes you produce a key before it will work, it has told you where it thinks the value lives, and where it thinks you stand in relation to it. The local-first answer is to put the value back on your side of the line &mdash; and to greet you, on the first screen, with the app you actually came for.</p>

      <p className="dim">LastDB keeps your data on your side of the line. See the <Link to="/apps">open-source apps built on it</Link>, or how we <Link to="/blog/building-lastdb-with-agents">build LastDB in the open</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
