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
        note: 'Longest-lived dogfood. Public CLI + MCP. Still alpha edges.',
      },
      {
        rank: 2,
        name: 'LastDB',
        cmd: 'brew · lastdbd',
        pct: 70,
        note: 'The database itself. Homebrew primary. Whole product is still alpha.',
      },
      {
        rank: 3,
        name: 'Kanban',
        cmd: 'kanban',
        pct: 70,
        note: 'Daily work board + MCP. Public repo still named fkanban.',
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
        note: 'How you install everything. Agent skills, not a data app.',
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
        name: 'Dogfood Graph',
        cmd: 'local web app',
        pct: 45,
        note: 'Manual UX evidence tool. Useful, not a polished product.',
      },
    ],
  },
  {
    stage: 'Optional',
    labelColor: 'blue',
    stageClass: 'stage-optional',
    blurb: 'Skip unless you need it — only when the repo is available to you.',
    apps: [
      {
        rank: 7,
        name: 'LastSecrets',
        cmd: 'lastsecrets',
        pct: 40,
        note: 'Secret refs (lastsecrets://…). Often private; not required for a first try.',
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
        rank: 8,
        name: 'Routines',
        cmd: 'routines',
        pct: 35,
        note: 'Scheduled agent jobs. Our fleet tooling, not stranger onboarding.',
      },
      {
        rank: 9,
        name: 'LastGit',
        cmd: 'lastdb://…',
        pct: 30,
        note: 'Git on LastDB. Explicitly excluded from the public bundle for now.',
      },
      {
        rank: 10,
        name: 'CodeRings',
        cmd: 'coderings',
        pct: 25,
        note: 'Repo size vs claimed complexity. No public install story yet.',
      },
      {
        rank: 11,
        name: 'Discovery',
        cmd: '—',
        pct: 25,
        note: 'Friends-of-friends discovery. Not a public try path.',
      },
    ],
  },
];

const STAGE_LEGEND = [
  { stage: 'Alpha', color: 'green', text: 'Daily drivers. Sharp edges OK — install these first.' },
  { stage: 'Dogfood', color: 'yellow', text: 'In the installer; more papercuts; no support promise.' },
  { stage: 'Optional', color: 'blue', text: 'Only when available / when you need the capability.' },
  { stage: 'Early', color: 'orange', text: 'Real for us; not in the default installer yet.' },
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
        <meta name="description" content="What each LastDB app does, plus honest alpha/dogfood/early readiness so you know how rough the edges are." />
        <meta property="og:title" content="Apps - LastDB" />
        <meta property="og:description" content="LastDB apps with readiness labels: Alpha, Dogfood, Early, Optional." />
        <link rel="canonical" href="https://thelastdb.com/apps" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Apps on LastDB</h1>

      <p className="bold white">LastDB is the database. Apps are tools that use it. Same machine, no account.</p>

      <p className="hero-cta">
        <Link to="/#install" className="link-btn">[Install &rarr;]</Link>{'  '}
        <a href="#readiness" className="link-btn">[Readiness ranking]</a>
        <span className="dim"> &mdash; install on the home page; this page is what each app is for and how rough it is.</span>
      </p>

      <pre className="compare-table">{`  LastDB          the database (Homebrew)
     │
     ├── Brain         long-term memory      → brain
     ├── Kanban        work board            → kanban
     ├── Situations    ops reality right now → situations
     ├── Dogfood Graph manual UX evidence    → local web app
     └── …             early / optional tools`}</pre>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* READINESS — ranked high → low */}
      <Section variant="sage" id="readiness">
        <h2><span className="bold">HOW ROUGH IS THIS?</span> <span className="dim">ranked by readiness</span></h2>

        <p>
          The whole stack is still product <span className="bold">alpha</span> (macOS Apple Silicon, local-only).
          Below is a <span className="bold">deliberate ranking</span>: #01 is the thing we&rsquo;d hand a stranger first;
          lower ranks are rougher or not in the default installer.
          Stages are the product signal. The <span className="bold">~%</span> bars are only a gut sort key &mdash;{' '}
          <span className="bold">not</span> SLAs, coverage, or failure rates.
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
            ranks <span className="bold">#01&ndash;#03</span> (Brain, LastDB, Kanban).
            Add Situations if you run agents. Skip everything Early until you&rsquo;re curious.
            Skip LastSecrets unless you need secret refs.
          </p>
        </div>
      </Section>

      <Section variant="lavender">
        <h2 id="catalog"><span className="bold">DAILY APPS</span> <span className="dim">in the default installer</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">BRAIN</Label> <span className="dim">alpha &middot; command: <span className="bold">brain</span></span></p>
            <p><span className="bold">Long-term memory.</span> Decisions, designs, notes, “why we did it.” Search later in plain English.</p>
            <pre>{`brain concept new caching --title "Cache" --body "chose LRU because …"
brain ask "what did we decide about caching?"
brain list --type concept --limit 5`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">KANBAN</Label> <span className="dim">alpha &middot; command: <span className="bold">kanban</span></span></p>
            <p><span className="bold">Work board.</span> Cards move through columns. Live status of what’s in flight &mdash; not the reasoning (that goes in Brain).</p>
            <pre>{`kanban add ship-login --title "Ship login" --tags auth
kanban move ship-login doing
kanban list`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">SITUATIONS</Label> <span className="dim">dogfood &middot; command: <span className="bold">situations</span></span></p>
            <p><span className="bold">Operational reality right now.</span> Incidents, freezes, “don’t touch CI.” Agents check this before changing shared systems.</p>
            <pre>{`situations list
situations preflight --action enable-ci --repo my-org/my-repo`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">DOGFOOD GRAPH</Label> <span className="dim">dogfood &middot; local web app</span></p>
            <p><span className="bold">Manual product-test evidence.</span> Expected UX as a graph, plus what humans actually saw. Not an automated test runner.</p>
            <pre>{`cd ~/lastdb-apps/dogfood-graph && npm run dev`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">THE LAST STACK</Label> <span className="dim">dogfood &middot; installer + agent skills</span></p>
            <p><span className="bold">Not a data app.</span> The helper from the home-page install. Also teaches coding agents how to use Brain and Kanban.</p>
            <pre>{`cd ~/.last-stack && git pull && ./setup`}</pre>
          </Card>

          <Card>
            <p><Label color="yellow">LASTSECRETS</Label> <span className="dim">optional / dogfood</span></p>
            <p><span className="bold">Secret refs.</span> Store a value once; everywhere else keep <span className="bold">lastsecrets://…</span>. Included when the public repo is available; otherwise skip.</p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put api-token --value-stdin
lastsecrets ref api-token`}</pre>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2 id="early"><span className="bold">EARLY</span> <span className="dim">real, not in the default installer</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">ROUTINES</Label> <span className="dim">early</span></p>
            <p>Scheduled agent jobs (Claude / Codex) with a local registry and launchd daemon.</p>
            <pre>{`git clone https://github.com/EdgeVector/routines && cd routines
bun install && bun run install-shim
routines list`}</pre>
          </Card>
          <Card>
            <p><Label color="yellow">LASTGIT</Label> <span className="dim">early</span></p>
            <p>Git hosting on LastDB. Remotes look like <span className="bold">lastdb:///my-repo</span>.</p>
          </Card>
          <Card>
            <p><Label color="yellow">CODERINGS</Label> <span className="dim">early</span></p>
            <p>Repo size vs the complexity you claim the code should have.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DISCOVERY</Label> <span className="dim">early</span></p>
            <p>Friends-of-friends discovery without a central social graph in the cloud.</p>
          </Card>
        </div>
      </Section>

      <Section variant="slate">
        <h2 id="manual"><span className="bold">INSTALL ONE APP YOURSELF</span> <span className="dim">optional</span></h2>

        <p>Prefer not to use the stack installer? Install LastDB first:</p>
        <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb`}</pre>
        <p>Then clone only what you want:</p>

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
            <p className="dim">Public repo is still named <span className="bold">fkanban</span>; the command is <span className="bold">kanban</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">SITUATIONS</Label></p>
            <pre>{`git clone https://github.com/EdgeVector/situations && cd situations
bun install
ln -snf "$PWD/bin/situations" ~/.local/bin/situations
situations init`}</pre>
          </Card>
        </div>

        <p className="dim">
          <Link to="/#install" className="link-btn">[Install (home)]</Link>{'  '}
          <Link to="/start" className="link-btn">[How to use it]</Link>{'  '}
          <Link to="/about" className="link-btn">[About]</Link>
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
