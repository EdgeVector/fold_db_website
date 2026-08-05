import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import CopyBlock from '../components/CopyBlock';

// Hand-drawn architectural figure (draftsman style: thin uniform strokes,
// poché hatch for stored data, mono caps labels, one accent).
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
    <pattern id="poche-kf" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// What crosses the line, and in which direction.
const TRUST = `${SVG_OPEN('0 0 660 268')}
  <rect x="30" y="34" width="176" height="60" fill="url(#poche-kf)" stroke="#928374" stroke-width="1"/>
  <text x="118" y="60" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR BOARD</text>
  <text x="118" y="78" text-anchor="middle" fill="#928374" font-size="10">kanban cards</text>

  <rect x="30" y="112" width="176" height="60" fill="url(#poche-kf)" stroke="#928374" stroke-width="1"/>
  <text x="118" y="138" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR BRAIN</text>
  <text x="118" y="156" text-anchor="middle" fill="#928374" font-size="10">job heartbeats</text>

  <rect x="30" y="190" width="176" height="60" fill="url(#poche-kf)" stroke="#928374" stroke-width="1"/>
  <text x="118" y="216" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">LOCAL BINARY</text>
  <text x="118" y="234" text-anchor="middle" fill="#928374" font-size="10">lastdb version</text>

  <line x1="206" y1="64" x2="286" y2="112" stroke="#928374" stroke-width="1"/>
  <polygon points="286,112 277,105 274,113" fill="#928374"/>
  <line x1="206" y1="142" x2="286" y2="142" stroke="#928374" stroke-width="1"/>
  <polygon points="286,142 277,138 277,146" fill="#928374"/>
  <line x1="206" y1="220" x2="286" y2="172" stroke="#928374" stroke-width="1"/>
  <polygon points="286,172 277,179 274,171" fill="#928374"/>
  <text x="246" y="106" text-anchor="middle" fill="#928374" font-size="9">READ</text>

  <rect x="290" y="106" width="150" height="72" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="365" y="136" text-anchor="middle" fill="#83a598" font-size="12" letter-spacing="1.5">FACTORY</text>
  <text x="365" y="154" text-anchor="middle" fill="#928374" font-size="10">127.0.0.1:4177</text>

  <line x1="440" y1="142" x2="512" y2="142" stroke="#83a598" stroke-width="1"/>
  <polygon points="512,142 503,138 503,146" fill="#83a598"/>

  <rect x="516" y="106" width="120" height="72" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="576" y="136" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">YOUR TAB</text>
  <text x="576" y="154" text-anchor="middle" fill="#928374" font-size="10">the floor</text>

  <line x1="290" y1="200" x2="440" y2="200" stroke="#504945" stroke-width="1" stroke-dasharray="3 4"/>
  <line x1="365" y1="178" x2="365" y2="200" stroke="#504945" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="365" y="222" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">NO WRITES BACK TO THE BOARD</text>
  <text x="365" y="240" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">NO NETWORK OFF THIS MACHINE</text>
</svg>`;

const INSTALL = `git clone https://github.com/EdgeVector/kanban-factory ~/kanban-factory
cd ~/kanban-factory
POLL_MS=4000 node server.mjs`;

const AUTOSTART = `~/kanban-factory/scripts/install-launchd.sh install
open http://127.0.0.1:4177`;

const MANAGE = `~/kanban-factory/scripts/install-launchd.sh status
~/kanban-factory/scripts/install-launchd.sh restart
~/kanban-factory/scripts/install-launchd.sh uninstall`;

const UPDATE = `cd ~/kanban-factory
git pull
~/kanban-factory/scripts/install-launchd.sh restart`;

export default function FeatureKanbanFactory() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Kanban Factory - LastDB Features</title>
        <meta
          name="description"
          content="Kanban Factory is a live floor view of your own Kanban board. Clone it, run node server.mjs, open http://127.0.0.1:4177. Read-only against your board, nothing leaves your machine."
        />
        <meta property="og:title" content="Kanban Factory" />
        <meta
          property="og:description"
          content="Install and open a live dashboard for your own Kanban board and scheduled jobs. One clone, one command, one browser tab."
        />
        <link rel="canonical" href="https://thelastdb.com/features/kanban-factory" />
      </Helmet>

      <p><Link to="/features" className="link-btn">[&larr; Feature Blog]</Link></p>

      <h1 className="tagline">Kanban Factory</h1>
      <p className="post-meta">
        <Label color="green">2026-08-05</Label>{'  '}
        <Label color="blue">DASHBOARD</Label>{'  '}
        <Label color="purple">macOS</Label>
      </p>

      <p className="bold white">
        Kanban Factory is a live floor view of the Kanban board you already have.
        It reads your board every few seconds and animates what actually changed
        &mdash; a card moving lane, a job picking up work, something landing in
        Done. It never writes to your board.
      </p>

      <p className="hero-cta">
        <a href="#get-it" className="link-btn">[Get it &rarr;]</a>{'  '}
        <a href="#open-it" className="link-btn">[Open it &rarr;]</a>{'  '}
        <a href="https://github.com/EdgeVector/kanban-factory" target="_blank" rel="noreferrer" className="link-btn">[Source]</a>
      </p>

      <figure style={{ margin: '34px 0', textAlign: 'center' }}>
        <img
          src="/kanban-factory-board.png"
          alt="The Kanban Factory dashboard: a top bar of board counts and a ships-per-hour chart, four lanes of real cards (backlog, todo, doing, done), a strip of active hands holding cards, a grid of crew tiles for scheduled jobs, and a scrolling activity log."
          style={{
            width: '100%',
            maxWidth: '860px',
            border: '1px solid #3c3836',
            borderRadius: '6px',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <figcaption style={{ color: '#928374', fontSize: '11px', letterSpacing: '0.06em', marginTop: '10px', textTransform: 'uppercase' }}>
          Fig. 1 &mdash; the floor, on a real board, mid-shift
        </figcaption>
      </figure>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What it does</h2>
      <p>
        A board tells you what is open. It does not tell you whether anything is
        <em> happening</em>. The Factory answers the second question: leave it in a
        tab, and the room reacts when the board moves.
      </p>
      <p>
        Everything on screen is your data. The lanes hold your real cards, with
        their real titles, priority, repo, and blocked state. The crew tiles are
        your scheduled jobs, lit up when they last fired. The counts in the top
        bar are counted from the same cards you would get from{' '}
        <span className="bold">kanban list</span>.
      </p>

      <Section variant="sage">
        <h2><span className="bold">THE RULE: NO FAKE MOTION</span></h2>
        <p>
          Idle workers bob and belts shimmer &mdash; that is atmosphere. But a card
          only hops when it really changed lane, and the victory sound only fires
          when something really reached Done. A quiet floor means quiet work. You
          cannot make it look busy without doing something.
        </p>
      </Section>

      <h2 id="requirements">Before you start</h2>
      <div className="card-stack">
        <Card>
          <p><Label color="yellow">LASTDB + KANBAN</Label> The Factory reads an existing board. If <span className="bold">kanban list</span> works in your terminal, you are ready. If not, start at <Link to="/#install">Install</Link> and then <Link to="/start">How to use it</Link>.</p>
        </Card>
        <Card>
          <p><Label color="yellow">NODE 18+</Label> Check with <span className="bold">node --version</span>. There is nothing to <span className="bold">npm install</span> &mdash; the server has no dependencies.</p>
        </Card>
        <Card>
          <p><Label color="yellow">A BROWSER</Label> Any modern one. The page is served from your own machine.</p>
        </Card>
      </div>

      <h2 id="get-it">Get it</h2>
      <p>
        The Factory is a small standalone repository. Clone it anywhere you like
        &mdash; the examples below use <span className="bold">~/kanban-factory</span>.
      </p>
      <CopyBlock text={INSTALL} />
      <p>
        That third line starts the server in the foreground and prints the
        address. <span className="bold">POLL_MS</span> is how often it re-reads
        the board &mdash; four seconds makes it feel live; leave it off and it
        checks once a minute. Keep the terminal open, or read on for the version
        that starts itself at login.
      </p>

      <h2 id="open-it">Open it</h2>
      <p>
        Point a browser at <span className="bold">http://127.0.0.1:4177</span>.
        You should see your lanes populate within a few seconds.
      </p>
      <p>
        <span className="bold white">Click the page once.</span> Browsers do not
        allow sound until you interact with a page, so the first click is what
        unlocks the blips and the ship arpeggio. If you would rather it stayed
        silent, leave it &mdash; or press <span className="bold">S</span>.
      </p>

      <Section variant="amber">
        <h2><span className="bold">KEEP IT RUNNING (macOS)</span></h2>
        <p>
          The bundled installer registers a LaunchAgent so the Factory comes back
          on its own after a reboot, and rewrites its paths to match wherever you
          cloned it.
        </p>
        <CopyBlock text={AUTOSTART} />
        <p className="section-subheading"><span className="bold">LATER</span></p>
        <CopyBlock text={MANAGE} />
        <p className="dim">
          Logs land in <span className="bold">~/Library/Logs/kanban-factory.out.log</span> and <span className="bold">.err.log</span>.
          One caveat worth knowing before you file a bug: the LaunchAgent runs
          Node from <span className="bold">/opt/homebrew/bin/node</span>. If your
          Node came from somewhere else, the foreground command above still
          works &mdash; the agent is the part that will not start.
        </p>
      </Section>

      <h2>Reading the floor</h2>
      <p>Top to bottom, this is what you are looking at.</p>

      <div className="card-stack">
        <Card>
          <p><Label color="blue">TOP BAR</Label> Live counts per lane, plus how many cards are in flight, how many hands are holding work, and how many shipped this session. The version chip on the right shows which LastDB build you are running.</p>
        </Card>
        <Card>
          <p><Label color="blue">SHIPS PER HOUR</Label> Throughput over the last few hours, with 3h / 12h / 24h rates. This is the honest one &mdash; it goes flat when nothing lands.</p>
        </Card>
        <Card>
          <p><Label color="blue">LANES</Label> Backlog, Todo, Doing, Done. Real titles, priority, repo, and any blocked or needs-attention flags. Hover a card for detail; click it for sparkles.</p>
        </Card>
        <Card>
          <p><Label color="blue">HANDS</Label> Who is holding what, right now. If a worker has claimed a card, its chip appears here. Click a hand and the matching card flashes in its lane &mdash; a silly interaction that answers a serious question.</p>
        </Card>
        <Card>
          <p><Label color="blue">CREW</Label> One tile per scheduled job, each with a role: the one that grabs ready work, the one that unblocks the backlog, the one that nurses merges. A tile lights up when its job fires; hover for the last heartbeat in plain language.</p>
        </Card>
        <Card>
          <p><Label color="blue">LOG</Label> A running list of detected board moves and job heartbeats &mdash; the receipts for everything that just animated.</p>
        </Card>
      </div>

      <p className="section-subheading"><span className="bold">KEYBOARD</span></p>
      <div className="grid-2">
        <Card>
          <p><span className="bold">S</span> sound on/off &middot; <span className="bold">H</span> factory hum</p>
        </Card>
        <Card>
          <p><span className="bold">P</span> parade &middot; <span className="bold">F</span> theater mode</p>
        </Card>
        <Card>
          <p><span className="bold">V</span> LastDB version panel</p>
        </Card>
        <Card>
          <p><span className="bold">M</span> job fleet mode</p>
        </Card>
      </div>

      <h2>What it reads, and what it will not do</h2>
      <p>
        The Factory is a viewer. It shells out to the same read commands you
        would type, on a timer, and serves the result to your own browser.
      </p>

      <ArchFigure
        svg={TRUST}
        caption="Fig. 2 — three reads in, one page out; nothing crosses back"
      />

      <div className="card-stack">
        <Card>
          <p><Label color="green">READS</Label> Your board&rsquo;s cards, the heartbeat note your scheduled jobs write, and your local LastDB version. All three are things you can read yourself from a terminal.</p>
        </Card>
        <Card>
          <p><Label color="red">DOES NOT</Label> Move cards, claim work, edit notes, or change anything on your board. It has no account, no telemetry, and no outbound connection.</p>
        </Card>
        <Card>
          <p><Label color="orange">ONE EXCEPTION</Label> If you run a fleet of scheduled jobs, the Fleet chip can switch them between local profiles (say, a low-credit mode). That is the only button on the page that changes anything, it is on your own machine, and you have to press it.</p>
        </Card>
      </div>
      <p className="dim">
        The server binds <span className="bold">127.0.0.1</span> only. Nothing on
        this page is reachable from another machine, which also means there is
        nothing to lock down before you open it.
      </p>

      <h2>If it does not come up</h2>
      <div className="card-stack">
        <Card>
          <p><span className="bold white">Empty lanes.</span> The server needs the <span className="bold">kanban</span> command on its PATH. Confirm <span className="bold">kanban list</span> works in the same shell, then restart the server.</p>
        </Card>
        <Card>
          <p><span className="bold white">Port already in use.</span> Something else is on 4177. Start it elsewhere: <span className="bold">PORT=4180 node server.mjs</span>.</p>
        </Card>
        <Card>
          <p><span className="bold white">Nothing ever animates.</span> Check the poll interval &mdash; the default is a minute in the foreground. <span className="bold">POLL_MS=4000 node server.mjs</span> makes it feel live.</p>
        </Card>
        <Card>
          <p><span className="bold white">Is it alive at all?</span> <span className="bold">curl -s http://127.0.0.1:4177/api/health</span> returns the card count it last saw.</p>
        </Card>
      </div>

      <p className="section-subheading"><span className="bold">UPDATING</span></p>
      <CopyBlock text={UPDATE} />

      <p className="dim">
        Why we built it, and the design argument behind the no-fake-motion rule:{' '}
        <Link to="/blog/kanban-factory">The Factory Floor</Link> on the Dev Blog.
        {' · '}
        <Link to="/start">How to use LastDB</Link>
        {' · '}
        <Link to="/apps">Apps catalog</Link>
      </p>

      <p><Link to="/features" className="link-btn">[&larr; Feature Blog]</Link></p>
    </article>
  );
}
