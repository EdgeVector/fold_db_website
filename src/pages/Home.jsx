import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';
import ArchFigure from '../components/ArchFigure';

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
  <text x="250" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">KANBAN</text>
  <text x="250" y="74" text-anchor="middle" fill="#928374" font-size="10">work board</text>

  <rect x="340" y="36" width="120" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="400" y="58" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SITUATIONS</text>
  <text x="400" y="74" text-anchor="middle" fill="#928374" font-size="10">ops posture</text>

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
  <text x="330" y="220" text-anchor="middle" fill="#928374" font-size="11">local · encrypted · one process</text>

  <line x1="130" y1="256" x2="130" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="530" y1="256" x2="530" y2="270" stroke="#928374" stroke-width="1"/>
  <line x1="130" y1="263" x2="530" y2="263" stroke="#928374" stroke-width="1"/>
  <text x="330" y="288" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">ONE DATABASE — APPS DO NOT OWN THE DATA</text>
</svg>`;

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LastDB - Your data, one local database</title>
        <meta name="description" content="LastDB is a local encrypted database on your Mac. Install it in a few commands. Apps like Brain and Kanban run on top — no account, no cloud lock-in." />
        <meta property="og:title" content="LastDB - Your data, one local database" />
        <meta property="og:description" content="One permanent local database under your control. Install LastDB, then add apps. No signup." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thelastdb.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="LastDB - Your data, one local database" />
        <meta name="twitter:description" content="One permanent local database under your control. Install in a few commands." />
        <link rel="canonical" href="https://thelastdb.com" />
      </Helmet>

      <AsciiTitle />
      <hr className="decorative-rule" aria-hidden="true" />
      <h1 className="tagline">Own your data. For good.</h1>
      <p className="bold white">One local database on your machine. Apps talk to it. Nothing requires an account.</p>
      <p className="dim">Alpha &mdash; macOS Apple Silicon today.</p>
      <hr className="decorative-rule" aria-hidden="true" />

      {/* WHAT */}
      <Section variant="sage" id="what">
        <h2><span className="bold">WHAT IT IS</span></h2>

        <p>Today every app builds its own silo: notes in one place, tasks in another, secrets somewhere else. <span className="bold white">LastDB inverts that.</span> Your data lives in <span className="bold">one</span> encrypted database you run yourself. Applications become thin clients of <em>your</em> database &mdash; not permanent custodians of a copy.</p>

        <ArchFigure
          svg={MODEL_SVG}
          caption="Fig. 1 — apps are clients; the data lives in one local database"
        />

        <div className="grid-2">
          <Card>
            <p><Label color="green">LASTDB</Label></p>
            <p>The database. One process on your Mac. Your data stays there.</p>
          </Card>
          <Card>
            <p><Label color="green">APPS</Label></p>
            <p>Tools that use it &mdash; memory, boards, secrets, and more. Same data, different jobs.</p>
          </Card>
        </div>
      </Section>

      {/* GET IT — primary CTA */}
      <Section variant="amber" id="install">
        <h2><span className="bold">GET IT</span> <span className="dim">The only install path you need</span></h2>

        <p>You need <a href="https://brew.sh" target="_blank" rel="noreferrer">Homebrew</a> and <a href="https://bun.sh" target="_blank" rel="noreferrer">Bun</a>. Then one installer gives you <span className="bold">LastDB and the daily apps</span>:</p>

        <div className="card-stack">
          <Card>
            <p><Label color="yellow">1 &mdash; BUN</Label> <span className="dim">skip if you already have it</span></p>
            <pre>curl -fsSL https://bun.sh/install | bash</pre>
          </Card>

          <Card>
            <p><Label color="yellow">2 &mdash; INSTALL LASTDB + APPS</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/last-stack ~/.last-stack
~/.last-stack/setup
~/.last-stack/bin/last-stack-install-apps`}</pre>
            <p className="dim">That runs <span className="bold">brew install</span> for LastDB, downloads Brain / Kanban / Situations / Dogfood Graph (and LastSecrets when available), and puts their commands on your PATH.</p>
          </Card>

          <Card>
            <p><Label color="yellow">3 &mdash; START + INIT</Label></p>
            <pre>{`brew services start lastdb
brain init --grant-consent
kanban init`}</pre>
            <p className="dim">Optional: <span className="bold">situations init</span> and <span className="bold">lastsecrets init</span> if you want those too.</p>
          </Card>

          <Card>
            <p><Label color="yellow">4 &mdash; TRY IT</Label></p>
            <pre>{`kanban list
brain concept new hello --title "Hello" --body "my first note"
brain ask "what did I just write?"`}</pre>
          </Card>
        </div>

        <p className="dim">Database only (no apps)? <span className="bold">brew install edgevector/lastdb/lastdb</span> then <span className="bold">brew services start lastdb</span>.</p>
      </Section>

      {/* WHAT YOU GET */}
      <Section variant="lavender" id="apps-teaser">
        <h2><span className="bold">WHAT YOU GET</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">memory</span></p>
            <p>Long-term notes and decisions. Ask later in plain English.</p>
          </Card>
          <Card>
            <p><Label color="purple">KANBAN</Label> <span className="dim">work board</span></p>
            <p>Cards that track what&rsquo;s actually in flight.</p>
          </Card>
          <Card>
            <p><Label color="purple">SITUATIONS</Label> <span className="dim">ops posture</span></p>
            <p>What&rsquo;s true right now before agents touch shared systems.</p>
          </Card>
          <Card>
            <p><Label color="purple">MORE</Label></p>
            <p>LastSecrets, Dogfood Graph, agent skills, and early apps like LastGit.</p>
          </Card>
        </div>

        <p>
          <Link to="/apps" className="link-btn">[All apps &rarr;]</Link>
          <span className="dim"> &mdash; what each one does, in plain language.</span>
        </p>
      </Section>

      {/* NEXT */}
      <Section variant="slate" id="next">
        <h2><span className="bold">GO DEEPER</span> <span className="dim">when you want more than install</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">USING IT</Label></p>
            <p>Daily loop for humans, MCP + skills for agents.</p>
            <p><Link to="/start" className="link-btn">[How to use it &rarr;]</Link></p>
          </Card>
          <Card>
            <p><Label color="blue">WHY THIS EXISTS</Label></p>
            <p>The problem with silos, the model, and the principles.</p>
            <p><Link to="/about" className="link-btn">[About LastDB &rarr;]</Link></p>
          </Card>
          <Card>
            <p><Label color="blue">BUILD ON IT</Label></p>
            <p>API, access policies, and shipping your own app.</p>
            <p><Link to="/developer" className="link-btn">[Developer guide &rarr;]</Link></p>
          </Card>
          <Card>
            <p><Label color="blue">PAPERS &amp; WRITING</Label></p>
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
