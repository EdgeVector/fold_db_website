import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';

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

        <pre className="compare-table">{`  Brain · Kanban · Situations · your apps
              \\      |      |      /
               \\     |     |     /
                `}<span style={{ color: '#fabd2f' }}>{`+---------------------------+`}</span>{`
                `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`     `}<span className="bold white">Your LastDB</span>{`          `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`
                `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`  `}<span className="dim">local · encrypted · yours</span>{`  `}<span style={{ color: '#fabd2f' }}>{`|`}</span>{`
                `}<span style={{ color: '#fabd2f' }}>{`+---------------------------+`}</span>
        </pre>

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
            <p className="dim">That runs <span className="bold">brew install</span> for LastDB, downloads Brain / Kanban / Situations / Dogfood Graph / LastSecrets, and puts their commands on your PATH.</p>
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
brain put concept hello --title "Hello" --body "my first note"
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
