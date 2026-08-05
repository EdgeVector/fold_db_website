import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

/** Ranked high → low. Stage is the product signal; pct is only a gut sort key. */
const READINESS_GROUPS = [
  {
    stage: 'Alpha',
    labelColor: 'green',
    stageClass: 'stage-alpha',
    blurb: 'Install these first — we run them every day.',
    apps: [
      {
        rank: 1,
        name: 'Brain',
        cmd: 'brain',
        pct: 75,
        note: 'Long-term memory. Public CLI + MCP. Still alpha edges.',
      },
      {
        rank: 2,
        name: 'LastDB',
        cmd: 'brew · lastdbd',
        pct: 70,
        note: 'The database itself. Everything below talks to this process.',
      },
      {
        rank: 3,
        name: 'Kanban',
        cmd: 'kanban',
        pct: 70,
        note: 'Work board + MCP. Public repo is still named fkanban.',
      },
    ],
  },
  {
    stage: 'Dogfood',
    labelColor: 'yellow',
    stageClass: 'stage-dogfood',
    blurb: 'In the default installer — more papercuts than Alpha.',
    apps: [
      {
        rank: 4,
        name: 'Last Stack',
        cmd: 'installer + skills',
        pct: 60,
        note: 'How you install the stack. Agent skills, not a data app.',
      },
      {
        rank: 5,
        name: 'Situations',
        cmd: 'situations',
        pct: 55,
        note: 'Ops posture for agents. Critical for us; thinner stranger story.',
      },
      {
        rank: 6,
        name: 'Search',
        cmd: 'search',
        pct: 50,
        note: 'Semantic MiniLM plane outside Mini. brain/kanban prefer it for ask/search. Public MIT.',
      },
      {
        rank: 7,
        name: 'LastSecrets',
        cmd: 'lastsecrets',
        pct: 50,
        note: 'Public CLI. Store secrets in LastDB; other tools keep lastsecrets:// refs only.',
      },
      {
        rank: 8,
        name: 'Dogfood Graph',
        cmd: 'local web app',
        pct: 45,
        note: 'Manual UX evidence tool. Useful, not a polished product.',
      },
    ],
  },
  {
    stage: 'Early',
    labelColor: 'orange',
    stageClass: 'stage-early',
    blurb: 'Real for us — not in the one-command installer. Come back later.',
    apps: [
      {
        rank: 9,
        name: 'Routines',
        cmd: 'routines',
        pct: 35,
        note: 'Scheduled agent jobs. Our fleet tooling, not stranger onboarding.',
      },
      {
        rank: 10,
        name: 'LastGit',
        cmd: 'lastdb://…',
        pct: 30,
        note: 'Git on LastDB. Not in the public install bundle yet.',
      },
      {
        rank: 11,
        name: 'CodeRings',
        cmd: 'coderings',
        pct: 25,
        note: 'Repo size vs claimed complexity. No public install story yet.',
      },
      {
        rank: 12,
        name: 'Discovery',
        cmd: '—',
        pct: 25,
        note: 'Friends-of-friends discovery. Not a public try path.',
      },
    ],
  },
];

const STAGE_LEGEND = [
  { stage: 'Alpha', color: 'green', text: 'Daily drivers. Sharp edges OK — start here.' },
  { stage: 'Dogfood', color: 'yellow', text: 'Ships in the installer; more papercuts.' },
  { stage: 'Early', color: 'orange', text: 'Real for us; not in the default installer.' },
];

function ReadinessRow({ rank, name, cmd, pct, note, stageClass }) {
  return (
    <div className="readiness-row">
      <span className="readiness-rank" aria-label={`rank ${rank}`}>
        {String(rank).padStart(2, '0')}
      </span>
      <div className="readiness-main">
        <p className="readiness-title-line">
          <span className="readiness-name">{name}</span>
          <span className="readiness-cmd">{cmd}</span>
        </p>
        <p className="readiness-note">{note}</p>
      </div>
      <div className="readiness-meter" title={`Gut readiness ~${pct}% — judgment, not a measured SLA`}>
        <span className="readiness-pct">~{pct}%</span>
        <div className={`readiness-bar ${stageClass}`} aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function Apps() {
  return (
    <>
      <Helmet>
        <title>Apps - LastDB</title>
        <meta name="description" content="LastDB apps ranked by readiness, with try-it commands for Brain, Kanban, Situations, Search, and LastSecrets." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="What runs on LastDB, how rough each app is, and how to try the main ones." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p className="bold white">
        LastDB is the foundation. The apps are tools that run on it.
      </p>
      <p>
        How ready is each tool for a stranger? How do you try the main ones?
        Install the stack from the home page first &mdash; then come back here.
      </p>
      <p className="hero-cta">
        <Link to="/#install" className="link-btn">[Install on Home &rarr;]</Link>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* 1 — READINESS */}
      <Section variant="sage" id="readiness">
        <h2><span className="bold">1 &mdash; HOW READY?</span> <span className="dim">ranked for a first-time user</span></h2>

        <p>
          Whole product is still <span className="bold">alpha</span> (macOS Apple Silicon).
          Rank <span className="bold">#01</span> is what we&rsquo;d hand you first; lower ranks are rougher or not in the default installer.
          Stage labels are the real signal. The <span className="bold">~%</span> bars are only a gut ranking &mdash; not SLAs or failure rates.
        </p>

        <div className="readiness-legend" role="list">
          {STAGE_LEGEND.map((s) => (
            <div key={s.stage} className="readiness-legend-item" role="listitem">
              <Label color={s.color}>{s.stage.toUpperCase()}</Label>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="readiness-list" aria-label="Apps ranked by public readiness, highest first">
          {READINESS_GROUPS.map((group) => (
            <div key={group.stage} className="readiness-group">
              <div className="readiness-group-head">
                <Label color={group.labelColor}>{group.stage.toUpperCase()}</Label>
                <span className="dim">{group.blurb}</span>
              </div>
              {group.apps.map((app) => (
                <ReadinessRow key={app.name} {...app} stageClass={group.stageClass} />
              ))}
            </div>
          ))}
        </div>

        <div className="readiness-callout">
          <p>
            <span className="bold white">First try:</span>{' '}
            install from the home page, then use <span className="bold">Brain</span> and{' '}
            <span className="bold">Kanban</span> (and <span className="bold">Situations</span> /{' '}
            <span className="bold">LastSecrets</span> when you need ops gates or credentials).
            Ignore Early apps until you&rsquo;re curious.
          </p>
        </div>
      </Section>

      {/* 2 — TRY COMMANDS */}
      <Section variant="lavender" id="try">
        <h2><span className="bold">2 &mdash; TRY THE MAIN ONES</span> <span className="dim">after install</span></h2>

        <p>
          After the home-page installer finishes, these CLIs are the ones you actually type.
          Last Stack was the installer itself; Dogfood Graph is a local web app (see below).
        </p>

        <div className="grid-2">
          <Card>
            <p>
              <Label color="green">ALPHA</Label>{' '}
              <Label color="purple">BRAIN</Label>{' '}
              <span className="dim">memory · <span className="bold">brain</span></span>
            </p>
            <p>Long-term notes and decisions. Ask later in plain English.</p>
            <pre>{`brain concept new caching --title "Cache" --body "chose LRU because …"
brain ask "what did we decide about caching?"
brain list --type concept --limit 5`}</pre>
          </Card>

          <Card>
            <p>
              <Label color="green">ALPHA</Label>{' '}
              <Label color="purple">KANBAN</Label>{' '}
              <span className="dim">board · <span className="bold">kanban</span></span>
            </p>
            <p>What&rsquo;s in flight. Status lives here; reasoning lives in Brain.</p>
            <pre>{`kanban add ship-login --title "Ship login" --tags auth
kanban move ship-login doing
kanban list`}</pre>
          </Card>

          <Card>
            <p>
              <Label color="yellow">DOGFOOD</Label>{' '}
              <Label color="purple">SITUATIONS</Label>{' '}
              <span className="dim">ops · <span className="bold">situations</span></span>
            </p>
            <p>What&rsquo;s true operationally right now &mdash; freezes, incidents, preflight gates.</p>
            <pre>{`situations list
situations preflight --action enable-ci --repo my-org/my-repo`}</pre>
          </Card>

          <Card>
            <p>
              <Label color="yellow">DOGFOOD</Label>{' '}
              <Label color="purple">LASTSECRETS</Label>{' '}
              <span className="dim">credentials · <span className="bold">lastsecrets</span></span>
            </p>
            <p>
              Keep raw secrets out of Brain, docs, and chat. Store once; reference with{' '}
              <span className="bold">lastsecrets://…</span> everywhere else.
            </p>
            <p className="dim">
              Never put the secret value on the command line &mdash; stdin only.
              <span className="bold"> lastsecrets ref</span> prints a <span className="bold">lastsecrets://…</span> locator;
              list/search always print <span className="bold">value=&lt;redacted&gt;</span>.
            </p>
            <pre>{`lastsecrets init
printf '%s' "$TOKEN" | lastsecrets put my-api-token \\
  --label "My API token" \\
  --provider example \\
  --purpose demo \\
  --env dev \\
  --value-stdin
lastsecrets ref my-api-token
lastsecrets list`}</pre>
          </Card>

          <Card>
            <p><Label color="blue">ALSO IN THE INSTALLER</Label></p>
            <p>
              <span className="bold">Dogfood Graph</span> &mdash; local web app for manual product evidence:
            </p>
            <pre>{`cd ~/lastdb-apps/dogfood-graph && npm run dev`}</pre>
          </Card>
        </div>

        <p className="dim">
          Day-to-day loop (board + brain + agents):{' '}
          <Link to="/start" className="link-btn">[How to use it &rarr;]</Link>
        </p>
      </Section>

      {/* 3 — MANUAL (advanced) */}
      <Section variant="slate" id="manual">
        <h2><span className="bold">3 &mdash; MANUAL INSTALL</span> <span className="dim">advanced · skip if you used Home</span></h2>

        <p>
          Prefer not to use the Last Stack installer? Install the database, then only the apps you want:
        </p>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb`}</pre>

        <div className="card-stack">
          <Card>
            <p><Label color="blue">BRAIN</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/brain && cd brain
bun install && bun link
brain init --grant-consent`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">KANBAN</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/fkanban && cd fkanban
bun install && bun run install-cli
kanban init`}</pre>
            <p className="dim">Repo name is still <span className="bold">fkanban</span>; the command is <span className="bold">kanban</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">SITUATIONS</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/situations && cd situations
bun install
ln -snf "$PWD/bin/situations" ~/.local/bin/situations
situations init`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">LASTSECRETS</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/lastsecrets && cd lastsecrets
bun install && bun link
lastsecrets init`}</pre>
            <p className="dim">
              Public repo:{' '}
              <a href="https://github.com/EdgeVector/lastsecrets" target="_blank" rel="noreferrer">
                github.com/EdgeVector/lastsecrets
              </a>
              . Retrieve plaintext only at the point of use with{' '}
              <span className="bold">lastsecrets get &lt;slug&gt;</span>.
            </p>
          </Card>
          <Card>
            <p><Label color="blue">SEARCH</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/search && cd search
bun install
ln -snf "$PWD/bin/search" ~/.local/bin/search
search init`}</pre>
            <p className="dim">
              Public MIT repo:{' '}
              <a href="https://github.com/EdgeVector/search" target="_blank" rel="noreferrer">
                github.com/EdgeVector/search
              </a>
              . Semantic MiniLM plane for{' '}
              <span className="bold">brain ask/search</span> and{' '}
              <span className="bold">kanban search</span>. Index is local-only; run{' '}
              <span className="bold">search init</span> after install or cloud restore.
            </p>
          </Card>
        </div>

        <p className="dim">
          <Link to="/#install" className="link-btn">[Recommended install (home)]</Link>{'  '}
          <Link to="/start" className="link-btn">[How to use it]</Link>{'  '}
          <Link to="/about" className="link-btn">[About]</Link>
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
