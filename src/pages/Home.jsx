import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';
import ArchFigure from '../components/ArchFigure';
import CopyBlock from '../components/CopyBlock';

// Paste-facing script: no `#` comment lines.
// Default interactive zsh has interactivecomments OFF, so `# 0) …` is executed
// as shell input → `parse error near ')'` / `command not found: #`.
// Explanations live in the surrounding prose, not in the copy block.
// Commands are the ones the App Registry CLI lists (lastdb app list / install / status).
const INSTALL_STEP_1 = `curl -fsSL https://thelastdb.com/install.sh -o install.sh
sh install.sh`;

const INSTALL_STEP_2 = `sh install.sh --accept-install`;

const UNINSTALL_STEPS = `launchctl bootout "gui/$(id -u)/com.edgevector.lastdb-app-registry"
rm "$HOME/Library/LaunchAgents/com.edgevector.lastdb-app-registry.plist"
rm -rf "$HOME/.local/share/lastdb-apps" "$HOME/.local/state/lastdb-app-registry"
brew services stop lastdb
brew uninstall lastdb`;

// Draftsman architecture figure: apps as outline clients, LastDB as poché store.
const MODEL_SVG = `<svg viewBox="0 0 660 300" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto"
     font-family="'IBM Plex Mono', monospace">
  <defs>
    <pattern id="home-poche" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>

  <text x="40" y="22" fill="#928374" font-size="10" letter-spacing="1.5">APPS — THIN CLIENTS</text>

  <rect x="40" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="100" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">BRAIN</text>
  <text x="100" y="74" text-anchor="middle" fill="#928374" font-size="10">memory</text>

  <rect x="190" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="250" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SEARCH</text>
  <text x="250" y="74" text-anchor="middle" fill="#928374" font-size="10">find by meaning</text>

  <rect x="340" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="400" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LASTSECRETS</text>
  <text x="400" y="74" text-anchor="middle" fill="#928374" font-size="10">credentials</text>

  <rect x="490" y="36" width="130" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="555" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR APP</text>
  <text x="555" y="74" text-anchor="middle" fill="#83a598" font-size="10">same contract</text>

  <line x1="100" y1="88" x2="100" y2="128" stroke="#928374" stroke-width="1"/>
  <rect x="98" y="86" width="4" height="4" fill="#928374"/>
  <rect x="98" y="126" width="4" height="4" fill="#928374"/>

  <line x1="250" y1="88" x2="250" y2="128" stroke="#928374" stroke-width="1"/>
  <rect x="248" y="86" width="4" height="4" fill="#928374"/>
  <rect x="248" y="126" width="4" height="4" fill="#928374"/>

  <line x1="400" y1="88" x2="400" y2="128" stroke="#928374" stroke-width="1"/>
  <rect x="398" y="86" width="4" height="4" fill="#928374"/>
  <rect x="398" y="126" width="4" height="4" fill="#928374"/>

  <line x1="555" y1="88" x2="555" y2="128" stroke="#83a598" stroke-width="1"/>
  <rect x="553" y="86" width="4" height="4" fill="#83a598"/>
  <rect x="553" y="126" width="4" height="4" fill="#83a598"/>

  <line x1="100" y1="128" x2="555" y2="128" stroke="#928374" stroke-width="1"/>

  <line x1="330" y1="128" x2="330" y2="168" stroke="#928374" stroke-width="1"/>
  <rect x="328" y="126" width="4" height="4" fill="#928374"/>
  <rect x="328" y="166" width="4" height="4" fill="#928374"/>
  <text x="342" y="152" fill="#928374" font-size="10" letter-spacing="1">SOCKET</text>

  <rect x="130" y="170" width="400" height="72" fill="url(#home-poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="200" text-anchor="middle" fill="#ebdbb2" font-size="14" letter-spacing="2">YOUR LASTDB</text>
  <text x="330" y="220" text-anchor="middle" fill="#928374" font-size="11">local · yours · one process</text>

  <line x1="130" y1="256" x2="130" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="530" y1="256" x2="530" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="130" y1="263" x2="530" y2="263" stroke="#928374" stroke-width="1"/>
  <text x="330" y="288" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ONE DATABASE — APPS DO NOT OWN THE DATA</text>
</svg>`;

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LastDB - Build for your happiness</title>
        <meta name="description" content="Build for your happiness. LastDB is the local database you build your own tools on: memory, search, credentials, and the apps you write. Records are found by key. Install apps from the App Registry." />
        <meta property="og:title" content="LastDB - Build for your happiness" />
        <meta property="og:description" content="One local database, every tool yours. Build hard. Build happy. Own your foundation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thelastdb.com" />
        <meta property="og:site_name" content="LastDB" />
        <meta property="og:image" content="https://thelastdb.com/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="LastDB - Build for your happiness" />
        <meta name="twitter:description" content="Build for your happiness — on a foundation you own." />
        <meta name="twitter:image" content="https://thelastdb.com/favicon.png" />
        <link rel="canonical" href="https://thelastdb.com" />
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "LastDB",
      "url": "https://thelastdb.com",
      "description": "Build for your happiness. The local database you build your own tool stack on."
    },
    {
      "@type": "SoftwareApplication",
      "name": "LastDB",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "macOS (Apple Silicon)",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "The local database you build and own your whole tool stack on. Local use needs no account; optional encrypted cloud backup and multi-device sync register or connect your local database identity without asking for a name or email.",
      "url": "https://thelastdb.com",
      "downloadUrl": "https://github.com/EdgeVector/homebrew-lastdb",
      "softwareVersion": "alpha"
    }
  ]
}`}</script>
      </Helmet>

      <AsciiTitle />
      <hr className="decorative-rule" aria-hidden="true" />
      <p className="dim">alpha &middot; macOS &middot; Apple Silicon &middot; no UI</p>
      <h1 className="tagline">A local database for the tools you build.</h1>
      <p>
        LastDB is one local daemon on your Mac, reached over a Unix socket.
        Queries need a key. Listing a schema&rsquo;s keys is a separate, paged call.
        Each record has a primary key and any named alternate keys.
      </p>
      <p className="bold white">Build for your happiness, on a foundation you own.</p>
      <p className="hero-cta">
        <a href="#install" className="link-btn">[Install &rarr;]</a>{'  '}
        <Link to="/apps" className="link-btn">[Apps]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer]</Link>{'  '}
        <a href="https://thelastdb.com/llms.txt" className="link-btn">[llms.txt]</a>
        <span className="dim"> &mdash; plain-text install for agents</span>
      </p>
      <ul className="dim hero-facts">
        <li>Local use needs no account.</li>
        <li>Cloud backup and multi-device sync are optional.</li>
        <li>Your apps read and write through the socket. They do not own the data.</li>
      </ul>
      <hr className="decorative-rule" aria-hidden="true" />

      {/* WHAT */}
      <Section variant="sage" id="what">
        <h2><span className="bold">YOUR STACK, YOUR FOUNDATION</span></h2>

        <p>
          Most teams assemble a life out of SaaS: notes here, tickets there, agents somewhere else &mdash;
          each with its own database, account, and anxiety. You are building in a dozen rented rooms.
        </p>
        <p>
          <span className="bold white">LastDB is the room you own.</span> One permanent local database.
          Apps (Brain, Search, LastSecrets, and the ones you write) are tools on that foundation &mdash;
          not permanent custodians of a copy. The goal is not grind. It is building software,
          and a practice, that makes you happy.
        </p>

        <ArchFigure
          svg={MODEL_SVG}
          caption="Fig. 1 — tools on a foundation you own; the data stays local"
        />

        <div className="grid-2">
          <Card>
            <p><Label color="green">LASTDB</Label> <span className="dim">the foundation</span></p>
            <p>Your local database. One process on your Mac. Everything else stands on this.</p>
          </Card>
          <Card>
            <p><Label color="green">APP REGISTRY</Label> <span className="dim">the way to add apps</span></p>
            <p>A signed registry of apps. You install the ones you want by name, and they run on your LastDB.</p>
          </Card>
        </div>
      </Section>

      <Section variant="sage" id="explore">
        <h2><span className="bold">SEE HOW LASTDB WORKS</span></h2>
        <p>Explore the whole system. Zoom into memory, disk, and cloud. Select a part to see what it does and why.</p>
        <p>Explore 127 parts in nested groups, including saved sharing requests in Social, reusable circles, file upload cleanup, and backup recovery, or follow one request through the layers.</p>
        <p><a href="/explore/#diagram" className="link-btn">[Open the interactive guide &rarr;]</a></p>
       <p className="dim">Source review: 16 November 2026. Explore private databases, sharing, local acceptance, and recovery limits. Each part explains its purpose and limits.</p>
      </Section>

      {/* GET IT — primary CTA */}
      <Section variant="amber" id="install">
        <h2><span className="bold">INSTALL</span> <span className="dim">two steps, about five minutes</span></h2>

        <p>
          <span className="bold white">You need:</span> Apple Silicon, <span className="bold">Homebrew</span>,{' '}
          <span className="bold">Bun</span>, and <span className="bold">npm</span> (from Node).
          The installer checks for all four and stops if one is missing.
          Prefer plain text? See <a href="https://thelastdb.com/llms.txt">llms.txt</a>.
        </p>

        <Card>
          <p>
            <Label color="yellow">1. INSTALL LASTDB</Label>{' '}
            <span className="dim">Homebrew package, service, and the plan for the starter apps</span>
          </p>
          <CopyBlock text={INSTALL_STEP_1} label="Copy" />
          <p className="dim">
            Read the script first: <a href="/install.sh">install.sh</a>.
            The first run installs LastDB, then stops at the apps step and prints the install plan.
            That stop is expected. It ends with <span className="bold">RESULT: CONSENT NEEDED</span>.
            Running the script again is safe.
          </p>
        </Card>

        <Card>
          <p>
            <Label color="yellow">2. CONSENT TO THE STARTER APPS</Label>{' '}
            <span className="dim">brain, lastsecrets, and search</span>
          </p>
          <CopyBlock text={INSTALL_STEP_2} label="Copy" />
          <p className="dim">
            Run this only after you have read the plan from step 1.
            It ends with <span className="bold">RESULT: PASS</span> when the apps are current and healthy.
            Then run <span className="bold">brain init</span> to set up Brain.
          </p>
        </Card>

        <p className="dim" id="what-it-changes">
          <span className="bold white">What it changes</span>
        </p>
        <ul className="dim hero-facts">
          <li>Homebrew installs the <span className="bold">lastdb</span> and <span className="bold">lastdbd</span> commands and starts the LastDB service.</li>
          <li>The App Registry clones each starter app into <span className="bold">~/.local/share/lastdb-apps</span> and links its commands into <span className="bold">~/.local/bin</span>.</li>
          <li>The first app install adds a background job. It checks the registry every 60 seconds and upgrades the apps on the stable channel. It writes its log under <span className="bold">~/.local/state/lastdb-app-registry</span>.</li>
          <li>Each app installs its own packages with Bun or npm.</li>
          <li>It does not edit your shell profile, and it does not install Bun or npm.</li>
        </ul>

        <div className="grid-2" style={{ marginTop: '1em' }}>
          <Card>
            <p><Label color="blue">REMOVE IT</Label> <span className="dim">your data stays</span></p>
            <CopyBlock text={UNINSTALL_STEPS} label="Copy" />
            <p className="dim">
              Your data stays in <span className="bold">~/.lastdb</span>. These steps do not touch it.
              Delete that folder only if you want to lose the data. This cannot be undone.
              Command links in <span className="bold">~/.local/bin</span> may remain. Remove them if they point into the apps folder.
            </p>
          </Card>
          <Card>
            <p><Label color="blue">DATABASE ONLY</Label></p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb
lastdb status
curl --fail --silent --show-error --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health`}</pre>
            <p className="dim">Expect <span className="bold">{`{"status":"ok"}`}</span>. Add apps later with <span className="bold">lastdb app install</span>.</p>
          </Card>
        </div>

      </Section>

      {/* WHAT YOU GET */}
      <Section variant="lavender" id="apps-teaser">
        <h2><span className="bold">APPS</span> <span className="dim">install by name from the App Registry</span></h2>

        <p>
          Not only a database &mdash; a first set of apps you can install and extend.
          Install the ones you want. Yours to extend.
        </p>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">memory that lasts</span></p>
            <p>Decisions and designs that outlive any chat. Stop re-explaining yourself every session.</p>
          </Card>
          <Card>
            <p><Label color="purple">SEARCH</Label> <span className="dim">find by meaning</span></p>
            <p>Semantic search over your records. Ask in plain language and find the record by meaning.</p>
          </Card>
          <Card>
            <p><Label color="purple">LASTSECRETS</Label> <span className="dim">credentials that stay local</span></p>
            <p>Store secrets in LastDB; keep only <span className="bold">lastsecrets://</span> refs in Brain, docs, and scripts.</p>
          </Card>
        </div>

        <p>
          <Link to="/apps" className="link-btn">[Full catalog &amp; readiness &rarr;]</Link>
          <span className="dim"> &mdash; then build tools that fit how you want to work.</span>
        </p>
      </Section>

      {/* NEXT */}
      <Section variant="slate" id="next">
        <h2><span className="bold">GO DEEPER</span> <span className="dim">after you&rsquo;re installed</span></h2>

        <p className="dim">Installed already? Next steps, by intent:</p>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">1 &mdash; USE IT</Label></p>
            <p>Daily loop for humans, MCP + skills for agents.</p>
            <p><Link to="/start" className="link-btn">[How to use it &rarr;]</Link></p>
          </Card>
          <Card>
            <p><Label color="blue">2 &mdash; PICK APPS</Label></p>
            <p>What each app does, ranked by how ready it is for strangers.</p>
            <p><Link to="/apps#readiness" className="link-btn">[Apps &amp; readiness &rarr;]</Link></p>
          </Card>
          <Card>
            <p><Label color="blue">3 &mdash; WHY / BUILD</Label></p>
            <p>Thesis and principles, or the socket API for your own app.</p>
            <p>
              <Link to="/about" className="link-btn">[About]</Link>{'  '}
              <Link to="/developer" className="link-btn">[Developer]</Link>
            </p>
          </Card>
          <Card>
            <p><Label color="blue">4 &mdash; READ</Label></p>
            <p>Paper, ELI5, and how we build LastDB in the open.</p>
            <p>
              <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer" className="link-btn">[Paper]</a>{' '}
              <a href="/papers/fold_db_paper_eli5.pdf" target="_blank" rel="noreferrer" className="link-btn">[ELI5]</a>{' '}
              <Link to="/blog" className="link-btn">[Blog]</Link>
            </p>
          </Card>
        </div>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
