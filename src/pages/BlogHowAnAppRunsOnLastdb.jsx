import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for "new"). Rendered as inline SVG so there's no auto-layout.
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

// 1 — three independent layers people collapse into "run an app"
const THREE_LAYERS = `${SVG_OPEN('0 0 660 280')}
  <rect x="36" y="36" width="180" height="96" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="126" y="72" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LAUNCH</text>
  <text x="126" y="94" text-anchor="middle" fill="#928374" font-size="10">OS jail around a process</text>
  <text x="126" y="112" text-anchor="middle" fill="#928374" font-size="10">not a store catalog</text>

  <rect x="240" y="36" width="180" height="96" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="72" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">IDENTITY</text>
  <text x="330" y="94" text-anchor="middle" fill="#928374" font-size="10">a real app id + publisher</text>
  <text x="330" y="112" text-anchor="middle" fill="#928374" font-size="10">lookup by known name</text>

  <rect x="444" y="36" width="180" height="96" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="534" y="72" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">CONSENT</text>
  <text x="534" y="94" text-anchor="middle" fill="#928374" font-size="10">you grant this node access</text>
  <text x="534" y="112" text-anchor="middle" fill="#928374" font-size="10">revocable, per device</text>

  <line x1="126" y1="132" x2="126" y2="176" stroke="#504945" stroke-width="1"/>
  <line x1="330" y1="132" x2="330" y2="176" stroke="#504945" stroke-width="1"/>
  <line x1="534" y1="132" x2="534" y2="176" stroke="#504945" stroke-width="1"/>
  <line x1="126" y1="176" x2="534" y2="176" stroke="#504945" stroke-width="1"/>
  <line x1="330" y1="176" x2="330" y2="198" stroke="#83a598" stroke-width="1"/>
  <rect x="328" y="174" width="4" height="4" fill="#83a598"/>

  <rect x="160" y="200" width="340" height="52" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="224" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">A WORKING ATTRIBUTED APP</text>
  <text x="330" y="242" text-anchor="middle" fill="#928374" font-size="10">on your local node &middot; your data stays home</text>
</svg>`;

// 2 — two doors into the node: owner (full trust) vs app (jailed, restricted)
const TWO_DOORS = `${SVG_OPEN('0 0 660 300')}
  <rect x="200" y="28" width="260" height="48" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="50" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR LOCAL LASTDB NODE</text>
  <text x="330" y="66" text-anchor="middle" fill="#928374" font-size="10">one database &middot; one device</text>

  <rect x="48" y="120" width="220" height="120" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="158" y="150" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">OWNER DOOR</text>
  <text x="158" y="172" text-anchor="middle" fill="#928374" font-size="10">apps you build and trust</text>
  <text x="158" y="192" text-anchor="middle" fill="#928374" font-size="10">full read / write</text>
  <text x="158" y="212" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">DEVICE TRUST</text>

  <rect x="392" y="120" width="220" height="120" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="502" y="150" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">APP DOOR</text>
  <text x="502" y="172" text-anchor="middle" fill="#928374" font-size="10">published / third-party apps</text>
  <text x="502" y="192" text-anchor="middle" fill="#928374" font-size="10">jailed process + consent</text>
  <text x="502" y="212" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1">ATTRIBUTED</text>

  <line x1="158" y1="76" x2="158" y2="120" stroke="#928374" stroke-width="1"/>
  <line x1="502" y1="76" x2="502" y2="120" stroke="#83a598" stroke-width="1"/>
  <rect x="156" y="74" width="4" height="4" fill="#928374"/>
  <rect x="500" y="74" width="4" height="4" fill="#83a598"/>

  <text x="330" y="274" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">JAIL CLOSES THE OWNER DOOR TO THE CHILD PROCESS</text>
</svg>`;

// 3 — read any namespace; write only your own
const READ_WRITE = `${SVG_OPEN('0 0 660 260')}
  <text x="330" y="32" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1.5">ONE ATTRIBUTED APP &mdash; e.g. NOTES</text>

  <rect x="48" y="56" width="140" height="72" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="118" y="88" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">NOTES/*</text>
  <text x="118" y="108" text-anchor="middle" fill="#83a598" font-size="10">READ + WRITE</text>

  <rect x="220" y="56" width="140" height="72" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="290" y="88" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">BRAIN/*</text>
  <text x="290" y="108" text-anchor="middle" fill="#928374" font-size="10">READ ONLY</text>

  <rect x="392" y="56" width="140" height="72" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="462" y="88" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">KANBAN/*</text>
  <text x="462" y="108" text-anchor="middle" fill="#928374" font-size="10">READ ONLY</text>

  <rect x="564" y="56" width="56" height="72" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="592" y="98" text-anchor="middle" fill="#504945" font-size="16">&hellip;</text>

  <line x1="48" y1="160" x2="612" y2="160" stroke="#504945" stroke-width="1"/>
  <rect x="46" y="158" width="4" height="4" fill="#928374"/>
  <rect x="610" y="158" width="4" height="4" fill="#928374"/>

  <text x="330" y="190" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">READ BROADLY</text>
  <text x="330" y="210" text-anchor="middle" fill="#928374" font-size="10">other apps&rsquo; data stays readable on your machine</text>
  <text x="330" y="236" text-anchor="middle" fill="#83a598" font-size="12" letter-spacing="1.5">WRITE ONLY YOUR NAMESPACE</text>
  <text x="330" y="254" text-anchor="middle" fill="#928374" font-size="10">honest apps can&rsquo;t clobber each other&rsquo;s records</text>
</svg>`;

export default function BlogHowAnAppRunsOnLastdb() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>How an App Runs on LastDB - LastDB</title>
        <meta
          name="description"
          content="Running an app on LastDB is not a store install and not a single switch. It is three independent layers — process launch, app identity, and your consent — plus a firm rule: read broadly, write only your own namespace."
        />
        <meta property="og:title" content="How an App Runs on LastDB" />
        <meta
          property="og:description"
          content="Jail is not a catalog. Consent is not a binary. The nice product rule is simple: attributed apps read widely and write only their own namespace."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/how-an-app-runs-on-lastdb" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">How an App Runs on LastDB</h1>
      <p className="post-meta dim">2026-07-14</p>

      <p className="bold white">
        We spent a day trying to answer a plain question: what actually has to be true before you can
        run an app against a local LastDB node? The answer is nicer than a store, and stricter than
        &ldquo;just launch the binary.&rdquo;
      </p>

      <p>
        LastDB is a local database on your machine. Apps are how you work with that data &mdash;
        notes, boards, memory, whatever lens you need. As more apps show up, the natural product
        questions follow: is there a registry? Do you pre-approve what can run? Is there a place to
        look apps up?
      </p>

      <p>
        We went looking for the shortest true answer. Not the roadmap pitch &mdash; the
        <em> current</em> shape of the system, exercised end to end on a throwaway node so we could
        not kid ourselves.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">The short answer</span>
        </h2>
        <p>
          You do not pre-approve a list of binaries for the launcher. You also do not need a public
          app-store browse surface to make the model work. What you need is clearer than either:{' '}
          <span className="bold white">
            a process that can talk to the node, an app identity that means something, and your
            consent on this device
          </span>
          . For third-party apps, the firm data rule is{' '}
          <span className="bold white">read broadly, write only your own namespace</span>.
        </p>
      </Section>

      <h2>Three layers people collapse into one verb</h2>

      <p>
        When someone says &ldquo;run an app,&rdquo; they usually mean three different machines of
        thought at once. On LastDB those are separate on purpose.
      </p>

      <ArchFigure
        svg={THREE_LAYERS}
        caption="Fig. 1 — Launch, identity, and consent are independent. Only all three make an attributed app."
      />

      <ol>
        <li>
          <span className="bold white">Launch.</span> A command can start a process under an OS jail
          so the child cannot open the node&rsquo;s private data directory and cannot reach the
          full-power owner control surface. The jail is a process parent. It is not a package
          manager, and it does not ask a catalog whether the path is &ldquo;allowed.&rdquo;
        </li>
        <li>
          <span className="bold white">Identity.</span> A shared registry answers a narrow question:
          is this app id a real published name with a publisher, or is it made up? That is
          lookup-by-known-id, not a scrollable storefront. Local pickup lists for agents and tests
          are not that registry.
        </li>
        <li>
          <span className="bold white">Consent.</span> On each device, you grant the app permission
          to act. That is the iOS-style half of the model: you are the authority; the app holds a
          revocable slip. Granting happens on the owner plane. The restricted app surface is for
          data work after that, not for negotiating permission.
        </li>
      </ol>

      <p>
        Once you see the three layers, a lot of product confusion evaporates. Jail without consent
        is just a confined process that cannot usefully write. Consent without a real app id is
        meaningless. A registry entry without a running process is only a name.
      </p>

      <h2>Two doors into the same database</h2>

      <p>
        A LastDB node exposes more than one way to talk to it. For day-to-day work that distinction
        matters more than packaging formats.
      </p>

      <ArchFigure
        svg={TWO_DOORS}
        caption="Fig. 2 — Owner door for software you fully trust; app door for attributed third-party code."
      />

      <p>
        <span className="bold white">The owner door</span> is for software you build and already
        trust on your machine &mdash; the tools we use ourselves to run memory and boards on our
        own nodes. Same user, device trust, full read and write. No ceremony. That is the honest
        path for first-party work.
      </p>

      <p>
        <span className="bold white">The app door</span> is for code you would rather not treat as
        yourself. The node can launch it into a jail that cannot read the on-disk database files
        and cannot reach the owner control surface. The process gets a restricted data path, an
        attributed identity, and the write rule below. That is the path we care about when LastDB
        starts to host apps that did not come from the node owner&rsquo;s own hands.
      </p>

      <p>
        Important product honesty: apps do not have to be compiled native binaries to exist. A
        script under a runtime is still an app. What the jail needs is an executable path. What the
        data plane needs is attribution you can stand behind. Those are different requirements, and
        conflating them is how people invent an &ldquo;only signed .app bundles&rdquo; story that
        is not actually the product rule.
      </p>

      <h2>The rule that makes multi-app feel safe</h2>

      <p>
        On the attributed path, the data rule is simple enough to put on a whiteboard:
      </p>

      <ArchFigure
        svg={READ_WRITE}
        caption="Fig. 3 — An attributed app may read across namespaces; it may write only its own."
      />

      <ul>
        <li>
          <span className="bold white">Read broadly.</span> Other apps&rsquo; data on your machine
          can stay visible to an attributed app after you have consented. That is what makes
          composition possible without shipping every feature into one mega-app.
        </li>
        <li>
          <span className="bold white">Write only your own namespace.</span> The node enforces this at
          the mutation chokepoint. A notes app can write notes; it cannot quietly rewrite someone
          else&rsquo;s board rows. We proved the deny path live: own-namespace write succeeded;
          cross-namespace write was rejected.
        </li>
      </ul>

      <p>
        This is attribution and accident prevention more than a fantasy security wall. Same-user
        software on your laptop can still reach the owner door if you let it. The point is that two
        honest apps on one node stop stepping on each other&rsquo;s data by construction &mdash;
        which is what you need once &ldquo;apps on LastDB&rdquo; stops being a single prototype and
        becomes a small ecosystem.
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">What we had to prove, not assume</span>
        </h2>
        <p>
          Diagrams are cheap. We ran the real loop on an isolated node: jail the process, grant
          consent as the owner, attribute the process as a real app, write a row through the
          restricted data path, read it back, confirm the owner can see it, and confirm a write into
          another namespace fails. We also confirmed the jail cannot open the node&rsquo;s private
          data files. That is the standard we want for any claim about how apps run: show the
          user-visible capability, not only the architecture sketch.
        </p>
      </Section>

      <h2>What this is not</h2>

      <ul>
        <li>
          <span className="bold white">Not a pre-approval list for launch.</span> The jail launcher
          does not consult &ldquo;is this binary on the good list?&rdquo; It starts what you hand
          it, under confinement.
        </li>
        <li>
          <span className="bold white">Not a public app mall (yet).</span> Identity registry lookup
          is by known id. A place where people browse and install is product surface on top of this
          model, not a prerequisite for the model to make sense.
        </li>
        <li>
          <span className="bold white">Not &ldquo;every script is as trusted as you are.&rdquo;</span>{' '}
          The owner door is for that. The app door exists so third-party code can be narrower by
          default.
        </li>
      </ul>

      <h2>Why this feels nice</h2>

      <p>
        A lot of platforms answer &ldquo;how do apps run?&rdquo; with a store, a packaging format,
        and a permissions dialog that still leaves you unsure what can write where. LastDB&rsquo;s
        answer is closer to how people already think about a personal database:
      </p>

      <ul>
        <li>Your data lives on your machine.</li>
        <li>An app is a namespaced lens over that data.</li>
        <li>You decide which apps get a slip.</li>
        <li>Once they have one, they can read enough to be useful, and write only their own rows.</li>
        <li>
          If you want stronger process hygiene for someone else&rsquo;s code, the node can parent the
          process into a jail that never sees the raw database files.
        </li>
      </ul>

      <p>
        That is enough to start building apps without inventing an entire mall first. The mall can
        come later. The invariants should not wait.
      </p>

      <p>
        If you are building on LastDB today: use the owner door for software you fully trust, claim
        a namespace for anything that will outlive a prototype, and treat write-own as a product
        promise you can depend on &mdash; not a style guide suggestion.
      </p>

      <p className="dim">
        Built while dogfooding the app path on LastDB itself. See also{' '}
        <Link to="/blog/declared-not-registered">Declared, Not Registered</Link> for how schemas get
        names without phoning a registrar first, and{' '}
        <Link to="/apps">Apps</Link> for the product surface we are growing on top of this model.
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
