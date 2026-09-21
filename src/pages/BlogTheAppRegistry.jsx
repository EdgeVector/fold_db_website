import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Monochrome technical figures. Site chrome is dark gray, so the ink is
// inverted: light fg strokes, one dim gray for captions, hatch for stored data.
// No accent colour.
function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '34px 0', textAlign: 'center' }}>
      <div
        style={{
          background: 'transparent',
          maxWidth: 660,
          margin: '0 auto',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption
          style={{
            color: '#928374',
            fontSize: '11px',
            letterSpacing: '0.06em',
            marginTop: '12px',
            textTransform: 'uppercase',
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ink #ebdbb2 · dim #928374 · hatch #504945
const SVG_DEFS = `
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;

const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;background:transparent" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">${SVG_DEFS}`;

// Fig 1 — the index: one signed document of proved pairs, key pinned in the binary.
const THE_INDEX = `${SVG_OPEN('0 0 660 400')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">THE REGISTRY IS ONE SIGNED FILE</text>

  <!-- index document (dashed = served from a public host, not yours) -->
  <polygon points="40,52 600,52 620,72 620,226 40,226" fill="none" stroke="#ebdbb2" stroke-width="1" stroke-dasharray="4 3"/>
  <polyline points="600,52 600,72 620,72" fill="none" stroke="#ebdbb2" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="56" y="78" fill="#ebdbb2" font-size="12" letter-spacing="1.5">stable.json</text>
  <text x="56" y="94" fill="#928374" font-size="10">one row = one proved pair</text>

  <!-- column headers -->
  <text x="76" y="118" fill="#928374" font-size="9">APP @ COMMIT</text>
  <text x="300" y="118" fill="#928374" font-size="9">NODE BUILD</text>
  <text x="420" y="118" fill="#928374" font-size="9">PROOF RUN</text>

  <!-- rows: hatched squares = real data -->
  <rect x="56" y="132" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="76" y="142" fill="#ebdbb2" font-size="10">brain @ 1f2d2f46</text>
  <text x="300" y="142" fill="#ebdbb2" font-size="10">0.23.3-2127</text>
  <text x="420" y="142" fill="#ebdbb2" font-size="10">llms-smoke-…2635Z</text>

  <rect x="56" y="156" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="76" y="166" fill="#ebdbb2" font-size="10">kanban @ 90ef24ad</text>
  <text x="300" y="166" fill="#ebdbb2" font-size="10">0.23.3-2127</text>
  <text x="420" y="166" fill="#ebdbb2" font-size="10">llms-smoke-…2635Z</text>

  <rect x="56" y="180" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="76" y="190" fill="#ebdbb2" font-size="10">situations @ 923409b1</text>
  <text x="300" y="190" fill="#ebdbb2" font-size="10">0.23.3-2127</text>
  <text x="420" y="190" fill="#ebdbb2" font-size="10">llms-smoke-…2635Z</text>

  <text x="56" y="214" fill="#928374" font-size="9">9 apps · sha256 of the exact bytes · Ed25519 signature in stable.json.sig</text>

  <!-- connector: index -> lastdb binary (down) -->
  <line x1="120" y1="226" x2="120" y2="262" stroke="#ebdbb2" stroke-width="1"/>
  <polygon points="120,262 116,253 124,253" fill="#ebdbb2"/>
  <rect x="118" y="224" width="4" height="4" fill="#ebdbb2"/>
  <text x="132" y="248" fill="#928374" font-size="9">HTTPS GET</text>

  <!-- the lastdb binary: a process -->
  <rect x="40" y="264" width="160" height="80" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="120" y="286" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">lastdb</text>
  <text x="120" y="302" text-anchor="middle" fill="#928374" font-size="10">on your machine</text>
  <polygon points="120,312 110,330 130,330" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="120" y="360" text-anchor="middle" fill="#928374" font-size="9">VERIFYING KEY, PINNED</text>

  <!-- what the reader checks -->
  <text x="232" y="286" fill="#ebdbb2" font-size="10">1. hash the bytes it received</text>
  <text x="232" y="302" fill="#ebdbb2" font-size="10">2. compare with the .sig payload hash</text>
  <text x="232" y="318" fill="#ebdbb2" font-size="10">3. verify the Ed25519 signature</text>
  <text x="232" y="338" fill="#928374" font-size="10">any mismatch refuses the whole file</text>

  <!-- legend -->
  <rect x="40" y="380" width="10" height="10" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="58" y="389" fill="#928374" font-size="9">PROVED ROW</text>
  <line x1="150" y1="385" x2="174" y2="385" stroke="#ebdbb2" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="182" y="389" fill="#928374" font-size="9">PUBLIC HOST, NOT YOURS</text>
  <polygon points="356,380 350,391 362,391" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="370" y="389" fill="#928374" font-size="9">KEY</text>
</svg>`;

// Fig 2 — resolve: the node build string is the lookup key. Equal or nothing.
const RESOLVE = `${SVG_OPEN('0 0 660 250')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">INSTALL PICKS A ROW BY EQUALITY, NOT BY MINIMUM</text>

  <!-- node build box -->
  <rect x="40" y="70" width="150" height="70" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="115" y="96" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR NODE</text>
  <text x="115" y="114" text-anchor="middle" fill="#928374" font-size="10">build 0.23.3-2127</text>
  <text x="115" y="128" text-anchor="middle" fill="#928374" font-size="9">GET /api/version</text>

  <!-- connector to diamond -->
  <line x1="190" y1="105" x2="248" y2="105" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="188" y="103" width="4" height="4" fill="#ebdbb2"/>
  <rect x="246" y="103" width="4" height="4" fill="#ebdbb2"/>

  <!-- decision diamond -->
  <polygon points="250,105 340,60 430,105 340,150" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="340" y="100" text-anchor="middle" fill="#ebdbb2" font-size="10">A ROW NAMES</text>
  <text x="340" y="114" text-anchor="middle" fill="#ebdbb2" font-size="10">THIS BUILD?</text>

  <!-- yes branch -->
  <line x1="430" y1="105" x2="476" y2="105" stroke="#ebdbb2" stroke-width="1"/>
  <polygon points="476,105 467,101 467,109" fill="#ebdbb2"/>
  <rect x="428" y="103" width="4" height="4" fill="#ebdbb2"/>
  <text x="452" y="96" text-anchor="middle" fill="#928374" font-size="9">YES</text>

  <rect x="480" y="70" width="160" height="70" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="478" y="103" width="4" height="4" fill="#ebdbb2"/>
  <text x="560" y="92" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">CHECKOUT</text>
  <rect x="500" y="102" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="518" y="112" fill="#928374" font-size="9">newest such row</text>
  <text x="560" y="130" text-anchor="middle" fill="#928374" font-size="9">+ receipt with proof id</text>

  <!-- no branch (down) -->
  <polyline points="340,150 340,200 352,200" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <polygon points="352,200 343,196 343,204" fill="#ebdbb2"/>
  <rect x="338" y="148" width="4" height="4" fill="#ebdbb2"/>
  <text x="348" y="180" fill="#928374" font-size="9">NO</text>

  <rect x="356" y="180" width="284" height="40" fill="none" stroke="#ebdbb2" stroke-width="1" stroke-dasharray="4 3"/>
  <rect x="354" y="198" width="4" height="4" fill="#ebdbb2"/>
  <text x="498" y="197" text-anchor="middle" fill="#ebdbb2" font-size="10">STOP. NOTHING INSTALLS.</text>
  <text x="498" y="211" text-anchor="middle" fill="#928374" font-size="9">the error names the remedy: brew upgrade lastdb</text>

  <!-- footnote -->
  <text x="40" y="180" fill="#928374" font-size="10">a minimum-version rule fails</text>
  <text x="40" y="194" fill="#928374" font-size="10">when the node REMOVES a field;</text>
  <text x="40" y="208" fill="#928374" font-size="10">an equal pair was actually run.</text>
</svg>`;

// Fig 3 — who writes the rows: nightly candidate set -> isolated smoke -> next; human -> stable.
const THE_LOOP = `${SVG_OPEN('0 0 660 320')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">A ROW EXISTS ONLY BECAUSE A FRESH INSTALL OF IT PASSED</text>

  <!-- stage 1: build node -->
  <rect x="40" y="60" width="120" height="60" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="100" y="84" text-anchor="middle" fill="#ebdbb2" font-size="10">BUILD NODE</text>
  <text x="100" y="100" text-anchor="middle" fill="#928374" font-size="9">from main, nightly</text>

  <line x1="160" y1="90" x2="200" y2="90" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="158" y="88" width="4" height="4" fill="#ebdbb2"/>
  <rect x="198" y="88" width="4" height="4" fill="#ebdbb2"/>

  <!-- stage 2: fix the app set -->
  <rect x="202" y="60" width="120" height="60" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="262" y="80" text-anchor="middle" fill="#ebdbb2" font-size="10">FIX APP COMMITS</text>
  <rect x="222" y="92" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="240" y="92" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="258" y="92" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="276" y="92" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="298" y="102" fill="#928374" font-size="9">×9</text>

  <line x1="322" y1="90" x2="362" y2="90" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="320" y="88" width="4" height="4" fill="#ebdbb2"/>
  <rect x="360" y="88" width="4" height="4" fill="#ebdbb2"/>

  <!-- stage 3: isolated install + smoke -->
  <rect x="364" y="60" width="140" height="60" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="434" y="80" text-anchor="middle" fill="#ebdbb2" font-size="10">FRESH INSTALL</text>
  <text x="434" y="94" text-anchor="middle" fill="#928374" font-size="9">isolated home, that node,</text>
  <text x="434" y="108" text-anchor="middle" fill="#928374" font-size="9">those commits · 37 checks</text>

  <line x1="504" y1="90" x2="544" y2="90" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="502" y="88" width="4" height="4" fill="#ebdbb2"/>
  <rect x="542" y="88" width="4" height="4" fill="#ebdbb2"/>

  <!-- green? diamond -->
  <polygon points="546,90 584,64 622,90 584,116" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="584" y="94" text-anchor="middle" fill="#ebdbb2" font-size="10">GREEN?</text>

  <!-- yes: down to next.json -->
  <polyline points="584,116 584,160" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <polygon points="584,160 580,151 588,151" fill="#ebdbb2"/>
  <rect x="582" y="114" width="4" height="4" fill="#ebdbb2"/>
  <text x="594" y="140" fill="#928374" font-size="9">YES</text>

  <!-- next.json document -->
  <polygon points="504,164 650,164 650,224 504,224" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <polyline points="636,164 636,178 650,178" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="582" y="162" width="4" height="4" fill="#ebdbb2"/>
  <text x="520" y="186" fill="#ebdbb2" font-size="11">next.json</text>
  <rect x="520" y="198" width="12" height="12" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="538" y="208" fill="#928374" font-size="9">rows + proof record</text>

  <!-- soak: dimension line -->
  <line x1="504" y1="248" x2="650" y2="248" stroke="#928374" stroke-width="1"/>
  <line x1="504" y1="244" x2="504" y2="252" stroke="#928374" stroke-width="1"/>
  <line x1="650" y1="244" x2="650" y2="252" stroke="#928374" stroke-width="1"/>
  <text x="577" y="266" text-anchor="middle" fill="#928374" font-size="9">24 H CLEAN SOAK</text>

  <!-- human: person glyph -->
  <circle cx="340" cy="192" r="9" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <path d="M 322 224 A 18 18 0 0 1 358 224" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="340" y="246" text-anchor="middle" fill="#ebdbb2" font-size="10">ONE HUMAN</text>
  <text x="340" y="260" text-anchor="middle" fill="#928374" font-size="9">one command</text>

  <!-- next -> human -->
  <line x1="504" y1="194" x2="372" y2="194" stroke="#ebdbb2" stroke-width="1"/>
  <polygon points="372,194 381,190 381,198" fill="#ebdbb2"/>
  <rect x="502" y="192" width="4" height="4" fill="#ebdbb2"/>

  <!-- human -> stable: brew bottle (hexagon) + stable.json (document), together -->
  <line x1="318" y1="194" x2="230" y2="194" stroke="#ebdbb2" stroke-width="1"/>
  <polygon points="230,194 239,190 239,198" fill="#ebdbb2"/>
  <text x="274" y="186" text-anchor="middle" fill="#928374" font-size="9">PUBLISH BOTH</text>

  <polygon points="130,168 190,168 210,194 190,220 130,220 110,194" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <rect x="208" y="192" width="4" height="4" fill="#ebdbb2"/>
  <text x="160" y="190" text-anchor="middle" fill="#ebdbb2" font-size="10">brew</text>
  <text x="160" y="204" text-anchor="middle" fill="#928374" font-size="9">node bottle</text>

  <polygon points="40,168 90,168 100,178 100,220 40,220" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <polyline points="90,168 90,178 100,178" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="70" y="190" text-anchor="middle" fill="#ebdbb2" font-size="9">stable</text>
  <text x="70" y="204" text-anchor="middle" fill="#928374" font-size="9">.json</text>
  <line x1="100" y1="194" x2="110" y2="194" stroke="#ebdbb2" stroke-width="1"/>

  <!-- legend -->
  <rect x="40" y="292" width="10" height="10" fill="url(#hatch)" stroke="#ebdbb2" stroke-width="1"/>
  <text x="58" y="301" fill="#928374" font-size="9">FIXED COMMIT / SEALED BYTES</text>
  <polygon points="236,291 226,302 246,302" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="254" y="301" fill="#928374" font-size="9">CHECK</text>
  <polygon points="316,292 326,292 330,297 326,302 316,302 312,297" fill="none" stroke="#ebdbb2" stroke-width="1"/>
  <text x="338" y="301" fill="#928374" font-size="9">SEALED PARCEL</text>
</svg>`;

export default function BlogTheAppRegistry() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The LastDB App Registry: Install by Proof - LastDB</title>
        <meta
          name="description"
          content="LastDB now has an app registry. lastdb app install <name> gives you the newest app commit that was proved with the LastDB build on your machine, from one static signed file. What the registry is, how a row gets there, and how to start."
        />
        <meta property="og:title" content="The LastDB App Registry: Install by Proof" />
        <meta
          property="og:description"
          content="One signed index of proved pairs. Install reads your node build and picks the newest row that was actually run with it. No account, no live service."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/the-lastdb-app-registry" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">[&larr; Blog]</Link>
      </p>

      <h1 className="tagline">The LastDB App Registry: Install by Proof</h1>
      <p className="post-meta dim">2026-09-21</p>

      <p className="bold white">
        LastDB now has an app registry. <span className="dim">lastdb app install brain</span> gives
        you the newest Brain commit that was proved with the LastDB build on your machine. The
        registry is one static signed file. It needs no account and no live service. This post
        says what the registry is, how a row gets into it, and how you start.
      </p>

      <h2>What went wrong without it</h2>

      <p>
        LastDB is a local database. The apps we build on it &mdash; Brain (a knowledge base),
        Kanban (a board), Situations (shared operational posture), Search, Lastsecrets, and a few
        more &mdash; are separate repositories. Until this week the installer cloned each one at{' '}
        <span className="bold">main</span>. The database came from Homebrew at whatever version
        was stable. Nothing tied the two together.
      </p>

      <p>That gap produced three real failures in September.</p>

      <ul>
        <li>
          <span className="bold white">A node that removes something breaks an app that expects
          it.</span> The node parses every request strictly and answers an unknown field with a bare
          400. An app on <span className="bold">main</span> sent a field the installed node did not
          know. The app saw &ldquo;400&rdquo; and nothing else.
        </li>
        <li>
          <span className="bold white">Our public mirrors lagged unevenly.</span> One app was 37
          commits and 16 days behind its source; another was current. A fresh install got a set of
          commits that no test had seen together.
        </li>
        <li>
          <span className="bold white">The install path depended on a live service.</span> One
          quota error on a cloud endpoint turned a fresh install red one weekend. A read path
          should not be able to fail that way.
        </li>
      </ul>

      <p>
        The fix was not a minimum-version rule. A minimum says &ldquo;this app needs LastDB
        0.23 or later.&rdquo; It is silent when 0.24 removes a field. What we wanted was a record
        of pairs that were actually run: this app commit, with this node build, passed a fresh
        install. The registry is that record.
      </p>

      <h2>What the registry is</h2>

      <p>
        The registry is one JSON file per channel, next to a detached signature. Public location:
        the Homebrew tap repository, served raw by GitHub.
      </p>

      <pre>{`registry/stable.json        registry/stable.json.sig
registry/next.json          registry/next.json.sig
registry/index-signing.pub
registry/proofs/<run-id>.json`}</pre>

      <p>
        Each app in the file has a source URL, a description, and a list of{' '}
        <span className="bold white">compat rows</span>. A compat row is a proved pair: this app
        version at this commit was proved with this node build, by this proof run, at this time.
        Here is the live row for Kanban, exactly as <span className="bold">lastdb app info kanban</span>{' '}
        prints it today.
      </p>

      <pre>{`{
  "app_id": "kanban",
  "source": "https://github.com/EdgeVector/fkanban.git",
  "description": "Kanban board over LastDB.",
  "compat": [
    {
      "app_version": "0.1.0",
      "sha": "90ef24ad13f297b48cd9b0da93dd5c57245db6bf",
      "lastdb_version": "0.23.3-2127-gaf73aa569",
      "proved_at": "2026-09-20T22:40:15Z",
      "proof_run": "llms-smoke-20260920T232635Z-0.23.3-2127-gaf73aa569"
    }
  ]
}`}</pre>

      <p>
        <span className="bold">proof_run</span> is not decoration. It names a record under{' '}
        <span className="bold">registry/proofs/</span> that says which checks ran and that they
        passed. The install command checks that the record exists.
      </p>

      <ArchFigure
        svg={THE_INDEX}
        caption="Fig. 1 — The registry: one signed file of proved pairs, verified by a key pinned in the lastdb binary"
      />

      <p>
        The signature file carries the SHA-256 of the exact index bytes and an Ed25519 signature
        over that hash. <span className="bold">lastdb</span> downloads the file, hashes what it
        received, compares, then verifies the signature with a key compiled into the binary. Any
        mismatch refuses the whole file. There is no account step and no token. A test index can
        use a different key, and the override is printed so it is never silent.
      </p>

      <Section variant="sage">
        <h2><span className="bold">Why a static file</span></h2>
        <p>
          A fresh install is the one moment a user has nothing yet. It should depend on as little as
          possible: a CDN, a hash, and a signature. The write side of the registry &mdash; where
          a developer publishes an app &mdash; still uses a developer certificate and a service.
          The read side does not. The two were split on purpose.
        </p>
      </Section>

      <h2>How install picks a row</h2>

      <p>
        <span className="bold">lastdb app install &lt;name&gt;</span> asks the running node for
        its build string (<span className="bold">GET /api/version</span>, new in this release).
        Then it reads the index and picks the newest compat row whose{' '}
        <span className="bold">lastdb_version</span> equals that string. Equal, not greater-or-equal.
      </p>

      <ArchFigure
        svg={RESOLVE}
        caption="Fig. 2 — Resolve: the node build string is the lookup key; no equal row means no install"
      />

      <p>
        If a row matches, install clones the source, checks out that commit, verifies{' '}
        <span className="bold">HEAD</span>, and writes a receipt next to the checkout. Here is a
        real one from this morning.
      </p>

      <pre>{`$ lastdb app install situations
installed: situations 0.1.0 @ 923409b1a3e9 (proved with lastdb 0.23.3-2127-gaf73aa569 by llms-smoke-20260920T232635Z-0.23.3-2127-gaf73aa569)
  source: https://github.com/EdgeVector/situations.git
  checkout: ~/.lastdb/apps/situations/source

$ cat ~/.lastdb/apps/situations/lastdb-app-install.json
{
  "app_id": "situations",
  "channel": "stable",
  "lastdb_version": "0.23.3-2127-gaf73aa569",
  "proof_run": "llms-smoke-20260920T232635Z-0.23.3-2127-gaf73aa569",
  "sha": "923409b1a3e9e810f5c9b5c8155ae25af4a9f7a5",
  "source": "https://github.com/EdgeVector/situations.git",
  "trust": "pinned",
  "version": "0.1.0"
}`}</pre>

      <p>
        If no row matches, nothing installs. The error names the remedy:{' '}
        <span className="bold">brew upgrade lastdb</span>, or wait for the next proved set. We
        chose the hard stop over a fallback because a fallback is how the September failures
        happened.
      </p>

      <Section variant="rose">
        <h2><span className="bold">The catch we hit while building it</span></h2>
        <p>
          Our first rehearsal of the whole loop reported GREEN. It was false. The node under test
          was new, but the apps had quietly fallen back to <span className="bold">main</span> under
          an older <span className="bold">lastdb</span> on the path. Every check passed. None of them
          had exercised a proved pair. The fix was the receipt above: the smoke now refuses to pass
          unless every installed app carries a receipt whose proof run exists. A green that does not
          say what it proved is not a green.
        </p>
      </Section>

      <h2>Who writes the rows</h2>

      <p>
        Nobody types a row by hand. Both channels started empty on purpose. A row is written by
        an automated job of ours, once a night, and it is written only after the exact pair passed
        a fresh install.
      </p>

      <ol>
        <li>Build the node from the tip of main.</li>
        <li>Fix the commit of every app in the set (nine today).</li>
        <li>
          Install the whole set into an isolated, empty home with that node, and run the public
          install checks from our own docs against it. 37 checks.
        </li>
        <li>
          On green, the same job cuts our own daily-driver node over to that build. We run what we
          are about to publish, on the database that holds our own work.
        </li>
        <li>Write the rows and the proof record to <span className="bold">next</span>.</li>
      </ol>

      <p>
        Then the pair set soaks for 24 hours on that node. An hourly job watches it. When the
        window is clean, one person runs one command, and two things publish together: the node
        bottle to Homebrew stable, and the rows to <span className="bold">stable.json</span>. The
        first stable publish happened on 2026-09-21: LastDB v0.23.5 and nine rows.
      </p>

      <ArchFigure
        svg={THE_LOOP}
        caption="Fig. 3 — The loop: nightly candidate set, fresh install in isolation, soak, then one human command publishes node and rows together"
      />

      <p>
        The stable step stays a human action for now. We will revisit that after five clean manual
        publishes. The point of the loop is not that a machine presses the button. The point is
        that the button only exists when the proof exists.
      </p>

      <h2>Start using it</h2>

      <p>
        You need LastDB 0.23.5 or later. Earlier builds have no{' '}
        <span className="bold">app resolve</span>; the installer falls back to{' '}
        <span className="bold">main</span> and says so.
      </p>

      <pre>{`brew install edgevector/lastdb/lastdb   # or: brew upgrade lastdb
brew services start lastdb

lastdb app list                              # the shelf, with the row for your node
lastdb app info brain                        # one app's rows
lastdb app install brain                     # one app, at its proved commit
lastdb app install kanban situations         # several at once
lastdb app upgrade brain kanban situations   # move to the newest proved pair`}</pre>

      <p>
        <span className="bold">lastdb app list</span> shows every app on the shelf and the row
        that matches your node.
      </p>

      <pre>{`$ lastdb app list
# stable index · https://raw.githubusercontent.com/EdgeVector/homebrew-lastdb/main/registry/stable.json · node 0.23.3-2127-gaf73aa569
brain        0.8.0 @ 1f2d2f46a7eb  1 rows  Long-lived knowledge: decisions, rationale, references.
kanban       0.1.0 @ 90ef24ad13f2  1 rows  Kanban board over LastDB.
lastsecrets  0.1.0 @ f293954f3e85  1 rows  Local secrets over LastDB.
search       0.2.0 @ 9390c422afcf  1 rows  Local semantic search plane.
situations   0.1.0 @ 923409b1a3e9  1 rows  Shared operational posture and preflight.
…`}</pre>

      <p>
        Install puts the checkout under <span className="bold">~/.lastdb/apps/&lt;app&gt;/source</span>.
        The dependency step and the link into your path are still yours; the{' '}
        <Link to="/apps">apps page</Link> has the two lines for each app. If you use the Last Stack
        installer, it now calls the same commands for you and refuses to run an app without a
        receipt.
      </p>

      <p>
        <span className="bold">lastdb app upgrade</span> reinstalls only when the resolved commit
        differs from the one on disk. Run it after <span className="bold">brew upgrade lastdb</span>:
        a new node build has its own rows, and the apps should move with it.
      </p>

      <h2>What it does not do yet</h2>

      <ul>
        <li>
          No stars, install counts, or recommendations. The shelf is a list of proved pairs, not a
          store.
        </li>
        <li>
          No automatic publish to stable. A human runs the command, after the soak.
        </li>
        <li>
          Rows are per node build. A build that no job has smoked yet has no rows. That is the
          design, and it is also why <span className="bold">brew upgrade lastdb</span> is the remedy
          in the error message: the bottle and its rows publish together.
        </li>
        <li>
          Third-party apps publish through the same developer path as ours, but the nightly job
          only proves the set we ship. A row for an outside app needs its own proof run, and that
          path is not built yet.
        </li>
      </ul>

      <Section variant="sage">
        <h2><span className="bold">The one idea</span></h2>
        <p>
          A version number is a claim. A proved pair is an observation. The registry stores
          observations, the install command reads them, and the error message tells you which
          observation is missing. Everything else is plumbing.
        </p>
      </Section>

      <p className="dim">
        Related: the <Link to="/apps">apps shelf</Link>, the{' '}
        <Link to="/docs/install">install docs</Link>, and{' '}
        <Link to="/blog/prove-it-to-land">Prove It To Land</Link> on why nothing lands here
        without a proof of the user-visible capability.
      </p>

      <p>
        <Link to="/blog" className="link-btn">[&larr; Blog]</Link>
      </p>
    </article>
  );
}
