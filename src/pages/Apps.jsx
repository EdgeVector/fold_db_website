import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

// The starter apps the home-page installer puts on a new machine. Keep this in
// step with STARTER_APPS in public/install.sh and with `lastdb app list` on the
// Homebrew stable release.
const STARTER_APPS = [
  {
    name: 'Brain',
    cmd: 'brain',
    what: 'Long-term notes and decisions. Write them once, then find them by name or by keyword.',
  },
  {
    name: 'LastSecrets',
    cmd: 'lastsecrets',
    what: 'Credentials kept in your LastDB. Other tools hold only a lastsecrets:// reference.',
  },
];

export default function Apps() {
  return (
    <>
      <Helmet>
        <title>Apps - LastDB</title>
        <meta name="description" content="The apps you can install on LastDB today from the App Registry: Brain and LastSecrets. Commands to install and try each one." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="What you can install on LastDB today, and how to try it." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">&larr; Home</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p className="bold white">
        LastDB is the database. An app is a program that reads and writes it over the local socket.
      </p>
      <p>
        This page lists the apps you can install today. The whole product is alpha, on macOS with Apple Silicon.
      </p>
      <p className="hero-cta">
        <Link to="/#install" className="link-btn">Install on Home &rarr;</Link>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <Section variant="sage" id="registry">
        <h2><span className="bold">THE APP REGISTRY</span> <span className="dim">how apps get on your machine</span></h2>

        <p>
          The App Registry is a signed list of apps. You install an app by name. No account is needed.
        </p>
        <p>
          Each listed app was proved with a specific LastDB release in a fresh home. Install checks out that
          exact commit, not <span className="bold">main</span>. If no entry is proved with your release, install stops.
        </p>

        <pre>{`lastdb app list
lastdb app install brain
lastdb app status
lastdb app upgrade brain
lastdb app rollback brain`}</pre>

        <p className="dim">
          <span className="bold">list</span> shows the apps for your release. The list changes as apps are proved, so trust it over this page.
          The first <span className="bold">install</span> prints the install plan and stops. Read the plan, then repeat the command with{' '}
          <span className="bold">--accept-install</span>.
          The install runs the app&rsquo;s own package step with Bun and links its commands into <span className="bold">~/.local/bin</span>.
        </p>
      </Section>

      <Section variant="lavender" id="starter">
        <h2><span className="bold">STARTER APPS</span> <span className="dim">what the installer adds</span></h2>

        <div className="card-stack">
          {STARTER_APPS.map((app) => (
            <Card key={app.name}>
              <p>
                <Label color="purple">{app.name.toUpperCase()}</Label>{' '}
                <span className="dim">command: <span className="bold">{app.cmd}</span></span>
              </p>
              <p>{app.what}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="amber" id="try">
        <h2><span className="bold">TRY THEM</span> <span className="dim">after install</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label></p>
            <pre>{`brain init
brain concept new caching --title "Cache" --body "chose LRU because the working set is small"
brain get caching
brain ask "what did we decide about caching?"`}</pre>
            <p className="dim">
              <span className="bold">brain get</span> reads the note by name. <span className="bold">brain ask</span> matches by keyword until LastSeek is installed.
            </p>
          </Card>

          <Card>
            <p><Label color="purple">LASTSECRETS</Label></p>
            <pre>{`lastsecrets init
printf '%s' "$TOKEN" | lastsecrets put my-api-token \\
  --label "My API token" \\
  --provider example \\
  --purpose demo \\
  --env dev \\
  --value-stdin
lastsecrets ref my-api-token
lastsecrets list`}</pre>
            <p className="dim">
              The value goes in on stdin, never on the command line.
              <span className="bold"> lastsecrets ref</span> prints a <span className="bold">lastsecrets://…</span> reference.
              <span className="bold"> list</span> always prints <span className="bold">value=&lt;redacted&gt;</span>.
            </p>
          </Card>

        </div>

        <p className="dim">
          Daily use: <Link to="/start" className="link-btn">How to use it &rarr;</Link>
        </p>
      </Section>

      <Section variant="rose" id="coming">
        <h2><span className="bold">COMING</span> <span className="dim">not installable yet</span></h2>
        <p>
          <span className="bold">LastSeek</span> is semantic search for LastDB: ask in plain words and find a record by meaning.
          It is not in the App Registry yet. Until it is, Brain finds notes by name and by keyword.
        </p>
      </Section>

      <Section variant="slate" id="yours">
        <h2><span className="bold">YOUR OWN APP</span></h2>
        <p>
          Your app uses the same socket as these apps. Declare a schema, then write and read records by key.
        </p>
        <p className="dim">
          <Link to="/developer" className="link-btn">Developer guide &rarr;</Link>
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
