import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for "sealed/solid", dimension lines, joint marks, mono caps
// labels, a single accent for the highlighted element). Inline SVG, no auto-layout.
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

// 1 — the easy answer we threw away: one server in the middle sees everything.
const PROXY = `${SVG_OPEN('0 0 660 210')}
  <rect x="30" y="80" width="124" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="92" y="106" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">YOUR DEVICE</text>
  <text x="92" y="123" text-anchor="middle" fill="#928374" font-size="10">your words</text>

  <rect x="268" y="70" width="156" height="76" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="346" y="100" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">OUR SERVER</text>
  <text x="346" y="118" text-anchor="middle" fill="#83a598" font-size="10">reads every word</text>
  <text x="346" y="132" text-anchor="middle" fill="#83a598" font-size="10">holds the key</text>

  <rect x="520" y="80" width="110" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="575" y="112" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">ANTHROPIC</text>

  <line x1="154" y1="108" x2="266" y2="108" stroke="#928374" stroke-width="1"/>
  <polygon points="266,108 257,104 257,112" fill="#928374"/>
  <text x="210" y="100" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">PLAINTEXT</text>

  <line x1="424" y1="108" x2="518" y2="108" stroke="#928374" stroke-width="1"/>
  <polygon points="518,108 509,104 509,112" fill="#928374"/>
  <text x="471" y="100" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">PLAINTEXT</text>

  <text x="346" y="44" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1.2">ONE PLACE SEES WHO + WHAT</text>
  <line x1="346" y1="52" x2="346" y2="68" stroke="#83a598" stroke-width="1" stroke-dasharray="2 3"/>
  <rect x="344" y="68" width="4" height="4" fill="#83a598"/>
</svg>`;

// 2 — split the job in two: the relay knows who, the enclave knows what.
const SPLIT = `${SVG_OPEN('0 0 660 244')}
  <rect x="24" y="86" width="110" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="79" y="110" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">YOUR DEVICE</text>
  <text x="79" y="127" text-anchor="middle" fill="#928374" font-size="10">seals + verifies</text>

  <rect x="176" y="86" width="120" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="236" y="110" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">BLIND RELAY</text>
  <text x="236" y="127" text-anchor="middle" fill="#928374" font-size="10">strips identity</text>

  <rect x="340" y="78" width="130" height="72" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="405" y="106" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">ENCLAVE</text>
  <text x="405" y="123" text-anchor="middle" fill="#83a598" font-size="10">sealed — we</text>
  <text x="405" y="136" text-anchor="middle" fill="#83a598" font-size="10">can't open it</text>

  <rect x="520" y="86" width="112" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="576" y="110" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">ANTHROPIC</text>
  <text x="576" y="127" text-anchor="middle" fill="#928374" font-size="10">text, not who</text>

  <line x1="134" y1="114" x2="174" y2="114" stroke="#928374" stroke-width="1"/>
  <polygon points="174,114 165,110 165,118" fill="#928374"/>
  <line x1="296" y1="114" x2="338" y2="114" stroke="#928374" stroke-width="1"/>
  <polygon points="338,114 329,110 329,118" fill="#928374"/>
  <line x1="470" y1="114" x2="518" y2="114" stroke="#928374" stroke-width="1"/>
  <polygon points="518,114 509,110 509,118" fill="#928374"/>

  <line x1="176" y1="160" x2="176" y2="174" stroke="#928374" stroke-width="1"/>
  <line x1="296" y1="160" x2="296" y2="174" stroke="#928374" stroke-width="1"/>
  <line x1="176" y1="167" x2="296" y2="167" stroke="#928374" stroke-width="1"/>
  <text x="236" y="190" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1.5">KNOWS WHO</text>

  <line x1="340" y1="160" x2="340" y2="174" stroke="#83a598" stroke-width="1"/>
  <line x1="470" y1="160" x2="470" y2="174" stroke="#83a598" stroke-width="1"/>
  <line x1="340" y1="167" x2="470" y2="167" stroke="#83a598" stroke-width="1"/>
  <text x="405" y="190" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1.5">KNOWS WHAT</text>

  <text x="323" y="222" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">NO SINGLE PARTY LINKS WHO &#8596; WHAT</text>
</svg>`;

// 3 — a box we run but cannot open; the client trusts it only after a proof.
const SEALED = `${SVG_OPEN('0 0 660 268')}
  <rect x="28" y="104" width="124" height="72" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="90" y="134" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">YOUR DEVICE</text>
  <text x="90" y="151" text-anchor="middle" fill="#928374" font-size="10">checks the proof</text>
  <text x="90" y="208" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">MISMATCH &#8594; REFUSE</text>

  <rect x="288" y="40" width="344" height="210" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="460" y="62" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">THE MACHINE WE OPERATE</text>

  <rect x="356" y="104" width="218" height="92" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="465" y="138" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">SEALED ENCLAVE</text>
  <text x="465" y="157" text-anchor="middle" fill="#83a598" font-size="10">holds the key &#183; reads the chat</text>
  <text x="460" y="232" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">NO SHELL &#183; NO MEMORY DUMP &#183; NO DISK</text>

  <line x1="152" y1="70" x2="286" y2="70" stroke="#928374" stroke-width="1"/>
  <polygon points="286,70 277,66 277,74" fill="#928374"/>
  <text x="219" y="62" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">1 &#183; PROVE YOU'RE SEALED</text>

  <line x1="286" y1="92" x2="152" y2="92" stroke="#928374" stroke-width="1"/>
  <polygon points="152,92 161,88 161,96" fill="#928374"/>
  <text x="219" y="104" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">SIGNED ATTESTATION</text>

  <line x1="152" y1="150" x2="354" y2="150" stroke="#83a598" stroke-width="1"/>
  <polygon points="356,150 347,146 347,154" fill="#83a598"/>
  <text x="252" y="142" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">2 &#183; SEAL CHAT TO ITS KEY</text>
</svg>`;

export default function BlogCantNotWont() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Can't, Not Won't - LastDB</title>
        <meta name="description" content="Key-less hosted AI chat that we cryptographically cannot read. Why we threw away the easy proxy, why a blind relay wasn't enough on its own, and how a sealed enclave turns 'we won't read your chats' into 'we can't.'" />
        <meta property="og:title" content="Can't, Not Won't" />
        <meta property="og:description" content="A privacy promise that depends on our good behavior isn't a promise — it's a hope. Here's how we built hosted AI chat we are physically unable to read." />
        <link rel="canonical" href="https://thelastdb.com/blog/cant-not-wont" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Can&rsquo;t, Not Won&rsquo;t</h1>
      <p className="post-meta dim">2026-06-30</p>

      <p className="bold white">We wanted to give a new user working AI chat the moment they install LastDB &mdash; no provider to choose, no API key to paste. The obvious way to do that is to run a server in the middle that reads your messages and forwards them to a model. We could have shipped it in a day. <span className="white">We threw it away, because it would have made our one promise a lie.</span></p>

      <p>The promise is the whole product: your data is yours, and we never see it. A local-first database earns that by keeping everything on your machine. But the moment you want a hosted model to answer a question, something has to carry your words to Anthropic and bring the answer back. The naive version of that errand reads everything it carries. This is the story of how we built the version that <em>can&rsquo;t</em>.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The easy answer, and why we threw it away</h2>
      <p>Key-less hosted chat is the single biggest thing that lowers the bar to getting started. Most people will never paste an API key; asking them to is where onboarding goes to die. So we hold the provider key, and the user just talks. Simple.</p>

      <p>The simplest way to wire that up is a plain proxy: your device sends plaintext to a server we run, the server holds our Anthropic key, it calls the model, it sends the answer back. It works. It is also a machine, operated by us, that sees both <span className="bold white">who you are</span> and <span className="bold white">every word you type</span> &mdash; the exact thing a local-first product exists to avoid.</p>

      <ArchFigure svg={PROXY} caption="Fig. 1 — the proxy we didn't ship: one operator sees everything" />

      <p>You don&rsquo;t get to advertise &ldquo;we never see your data&rdquo; and then build the one box that sees all of it. So we didn&rsquo;t.</p>

      <Section variant="rose">
        <h2><span className="bold">&ldquo;We won&rsquo;t&rdquo; is not &ldquo;we can&rsquo;t&rdquo;</span></h2>
        <p>Our first real design fixed the worst half. Borrowing the idea behind <span className="bold">Oblivious HTTP</span>, we split the connection so a <span className="bold white">blind relay</span> forwards your encrypted traffic without ever seeing the plaintext, and strips your identity before passing it on. The relay learns <em>who</em>; it never learns <em>what</em>. Genuinely better.</p>
        <p>But be honest about what it rested on. The part that finally read your message still had to be a service <span className="bold">we deploy</span> &mdash; and &ldquo;we promise that service is isolated and well-behaved&rdquo; is an organizational guarantee, not a cryptographic one. We could, in principle, stand up that same box in a way that peeked. A privacy claim that depends on our good behavior isn&rsquo;t a promise. It&rsquo;s a hope. That gap &mdash; between <span className="bold white">we won&rsquo;t</span> and <span className="bold white">we can&rsquo;t</span> &mdash; is the whole reason for everything that follows.</p>
      </Section>

      <h2>Two parties, neither sees both</h2>
      <p>The fix is to keep the blind relay <em>and</em> make the part that reads your words into something we are physically unable to read. Two controls, composed. The relay knows <span className="bold">who, not what</span>. The thing that decrypts your message knows <span className="bold">what, not who</span>. No single party ever holds both halves, so no single party &mdash; us included &mdash; can join your name to your conversation.</p>

      <ArchFigure svg={SPLIT} caption="Fig. 2 — the relay knows who; the enclave knows what; nobody knows both" />

      <p>The relay is unremarkable plumbing. The interesting half is the box on the right: a thing we operate but cannot open.</p>

      <h2>A box we run but cannot open</h2>
      <p>That box is an <span className="bold white">AWS Nitro Enclave</span> &mdash; a slice of a server walled off by the hardware itself, below the level of any operating system we control. From the machine we operate, there is no shell into it, no debugger, no way to dump its memory, no disk to read. Its only contact with the outside world is one narrow pipe, and even the bytes going through that pipe are encrypted end to end. We run the host. We cannot look inside the room.</p>

      <p>&ldquo;Trust us, the box is sealed&rdquo; would just be the old promise wearing a costume &mdash; so your device doesn&rsquo;t take our word for it. Before it sends a single character, it demands a cryptographic proof, signed by AWS, that the thing on the other end is a real enclave running <em>exactly the code we published</em>, unmodified. This is called <span className="bold">attestation</span>. If the proof doesn&rsquo;t match &mdash; a tampered build, a different program, anything off by a byte &mdash; your device sends nothing. The same proof gates the Anthropic key: even a maliciously modified enclave can&rsquo;t obtain the credential to call the model. Wrong proof, no key, no conversation.</p>

      <ArchFigure svg={SEALED} caption="Fig. 3 — the client seals its chat to the box only after the box proves what it is" />

      <p>So the chain is: your device encrypts your message to a key that only lives inside the verified enclave, hands the sealed bytes to the blind relay, the relay strips your identity and forwards them, and the enclave &mdash; the one place that can &mdash; opens them, talks to the model, and seals the answer back the same way. At no point does any machine we operate see plaintext attached to a name.</p>

      <Section variant="sage">
        <h2><span className="bold">The honest part</span></h2>
        <p>We&rsquo;re not going to dress this up as magic. A real claim names what it still asks you to trust:</p>
        <ul>
          <li><span className="bold white">You trust the hardware.</span> The guarantee rests on AWS&rsquo;s isolation and its attestation signing. That&rsquo;s a far smaller, more auditable trust base than &ldquo;trust EdgeVector&rdquo; &mdash; but it isn&rsquo;t zero.</li>
          <li><span className="bold white">You trust that the published code is the running code.</span> Which is why the enclave build is <span className="bold">reproducible</span>: anyone can rebuild it from source and confirm the fingerprint your device checks. Without that, the proof would just be us promising again.</li>
          <li><span className="bold white">Anthropic still reads your words.</span> By construction &mdash; a model has to see a question to answer it. What it never sees is who you are. The enclave is about us and the wires, never about the model.</li>
        </ul>
        <p>We&rsquo;d rather state that residual trust plainly than overclaim. The honesty is half the feature; the cryptography is the other half.</p>
      </Section>

      <h2>How it&rsquo;s getting built</h2>
      <p>We don&rsquo;t flip something like this on for real conversations on the strength of a design doc. It&rsquo;s coming up one provable stage at a time, each on a throwaway development environment, each proving a single property before the next is allowed to start:</p>
      <ol>
        <li>The attestation handshake &mdash; your device verifies a real enclave&rsquo;s proof, and <span className="bold">rejects a tampered one</span>.</li>
        <li>Key handling that lives and dies inside the enclave, where the host can never fish it out.</li>
        <li>A full round-trip to Anthropic and back, blind end to end.</li>
        <li>A reproducible build, so the fingerprint your device trusts is one a stranger can reproduce.</li>
      </ol>
      <p>And the tests that matter are the <span className="bold">negative</span> ones: tamper with the box and the client must refuse; kill the box and chat must fail closed &mdash; never, ever quietly fall back to sending plaintext. Only once the whole chain is proven blind does it go anywhere near a real message. The cheap version was one day of work. The version we&rsquo;re actually shipping is months &mdash; because &ldquo;we can&rsquo;t read it&rdquo; is the only version of the promise that still holds when we&rsquo;re the ones who built the machine.</p>

      <p className="dim">Part of making LastDB <Link to="/">a place your data is actually yours</Link> &mdash; built in the open, the same way we build <Link to="/blog/building-lastdb-with-agents">everything else</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
