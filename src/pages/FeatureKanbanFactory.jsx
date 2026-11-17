import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CopyBlock from '../components/CopyBlock';
import ArchFigure from '../components/ArchFigure';

// Diagram style: thin uniform strokes, hatch for stored data, mono caps labels.
const SVG_DEFS = `
  <defs>
    <pattern id="poche-kf" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="var(--mono)">${SVG_DEFS}`;

// What crosses the line, and in which direction.
const TRUST = `${SVG_OPEN('0 0 660 268')}
  <rect x="30" y="34" width="176" height="60" fill="url(#poche-kf)" stroke="var(--muted)" stroke-width="1"/>
  <text x="118" y="60" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">YOUR BOARD</text>
  <text x="118" y="78" text-anchor="middle" fill="var(--muted)" font-size="10">kanban cards</text>

  <rect x="30" y="112" width="176" height="60" fill="url(#poche-kf)" stroke="var(--muted)" stroke-width="1"/>
  <text x="118" y="138" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">YOUR BRAIN</text>
  <text x="118" y="156" text-anchor="middle" fill="var(--muted)" font-size="10">job heartbeats</text>

  <rect x="30" y="190" width="176" height="60" fill="url(#poche-kf)" stroke="var(--muted)" stroke-width="1"/>
  <text x="118" y="216" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">LOCAL BINARY</text>
  <text x="118" y="234" text-anchor="middle" fill="var(--muted)" font-size="10">lastdb version</text>

  <line x1="206" y1="64" x2="286" y2="112" stroke="var(--muted)" stroke-width="1"/>
  <polygon points="286,112 277,105 274,113" fill="var(--muted)"/>
  <line x1="206" y1="142" x2="286" y2="142" stroke="var(--muted)" stroke-width="1"/>
  <polygon points="286,142 277,138 277,146" fill="var(--muted)"/>
  <line x1="206" y1="220" x2="286" y2="172" stroke="var(--muted)" stroke-width="1"/>
  <polygon points="286,172 277,179 274,171" fill="var(--muted)"/>
  <text x="246" y="106" text-anchor="middle" fill="var(--muted)" font-size="9">READ</text>

  <rect x="290" y="106" width="150" height="72" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="365" y="136" text-anchor="middle" fill="var(--accent)" font-size="12" letter-spacing="1.5">FACTORY</text>
  <text x="365" y="154" text-anchor="middle" fill="var(--muted)" font-size="10">127.0.0.1:4177</text>

  <line x1="440" y1="142" x2="512" y2="142" stroke="var(--accent)" stroke-width="1"/>
  <polygon points="512,142 503,138 503,146" fill="var(--accent)"/>

  <rect x="516" y="106" width="120" height="72" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="576" y="136" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">YOUR TAB</text>
  <text x="576" y="154" text-anchor="middle" fill="var(--muted)" font-size="10">the floor</text>

  <line x1="290" y1="200" x2="440" y2="200" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 4"/>
  <line x1="365" y1="178" x2="365" y2="200" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="365" y="222" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="0.5">NO WRITES BACK TO THE BOARD</text>
  <text x="365" y="240" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="0.5">NO NETWORK OFF THIS MACHINE</text>
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

const FLOOR = [
  ['Top bar', 'Live counts per lane, plus how many cards are in flight, how many hands are holding work, and how many shipped this session. The version chip on the right shows which LastDB build you are running.'],
  ['Ships per hour', 'Throughput over the last few hours, with 3h, 12h, and 24h rates. It goes flat when nothing reaches Done.'],
  ['Lanes', 'Backlog, Todo, Doing, Done. Real titles, priority, repo, and any blocked or needs-attention flags. Hover a card for detail. Click it for sparkles.'],
  ['Hands', 'Who is holding what, right now. If a worker has claimed a card, its chip appears here. Click a hand and the matching card flashes in its lane.'],
  ['Crew', 'One tile per scheduled job, each with a role: the one that grabs ready work, the one that unblocks the backlog, the one that nurses merges. A tile lights up when its job fires. Hover for the last heartbeat in plain language.'],
  ['Log', 'A running list of detected board moves and job heartbeats. It is the record of everything that just animated.'],
];

const KEYS = [
  ['S', 'Sound on or off'],
  ['H', 'Factory hum'],
  ['P', 'Parade'],
  ['F', 'Theater mode'],
  ['V', 'LastDB version panel'],
  ['M', 'Job fleet mode'],
];

export default function FeatureKanbanFactory() {
  return (
    <>
      <Helmet>
        <title>Kanban Factory - LastDB Features</title>
        <meta
          name="description"
          content="Kanban Factory is a live floor view of your own Kanban board, kept in LastDB on your Mac. Clone it, run node server.mjs, open http://127.0.0.1:4177. It only reads your board, and it listens on localhost only."
        />
        <meta property="og:title" content="Kanban Factory" />
        <meta
          property="og:description"
          content="Install and open a live dashboard for your own Kanban board and scheduled jobs. One clone, one command, one browser tab."
        />
        <link rel="canonical" href="https://thelastdb.com/features/kanban-factory" />
      </Helmet>

      {/* HERO */}
      <section className="fg-hero">
        <div className="fg-eyebrow">
          <Link to="/features">Features</Link> &middot; 2026-08-05 &middot; dashboard &middot; macOS
        </div>
        <h1>Kanban Factory: <em>a live view of your board.</em></h1>
        <div className="fg-hero-row">
          <p>
            Kanban Factory is a live floor view of the Kanban board you already have.
            It reads your board every few seconds and animates what changed:
            a card moves lane, a job picks up work, something reaches Done.
            It never writes to your board.
          </p>
          <div className="fg-actions">
            <a href="#get-it" className="fg-btn fg-btn-primary">Get it</a>
            <a href="#open-it" className="fg-btn">Open it</a>
            <a href="https://github.com/EdgeVector/kanban-factory" target="_blank" rel="noreferrer" className="fg-btn">Source</a>
          </div>
        </div>
      </section>

      <figure style={{ margin: '40px 0 0', textAlign: 'center' }}>
        <img
          src="/kanban-factory-board.png"
          alt="The Kanban Factory dashboard: a top bar of board counts and a ships-per-hour chart, four lanes of real cards (backlog, todo, doing, done), a strip of active hands holding cards, a grid of crew tiles for scheduled jobs, and a scrolling activity log."
          style={{
            width: '100%',
            maxWidth: '860px',
            border: '1px solid var(--line-soft)',
            borderRadius: '6px',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <figcaption className="fg-caption">FIG. 1 &mdash; THE FLOOR, ON A REAL BOARD, MID-SHIFT</figcaption>
      </figure>

      {/* 01 WHAT IT DOES */}
      <section className="fg-section" id="what-it-does">
        <div className="fg-rail">01 &middot; What it does</div>
        <div className="fg-body">
          <h2>It shows whether anything is happening.</h2>
          <div className="fg-two">
            <p>
              A board tells you what is open. It does not tell you whether anything is happening.
              The Factory answers the second question: leave it in a tab, and the room reacts when the board moves.
            </p>
            <p>
              Everything on screen is your data. The lanes hold your real cards, with their real titles,
              priority, repo, and blocked state. The crew tiles are your scheduled jobs, lit up when they last fired.
              The counts in the top bar come from the same cards that <code>kanban list</code> returns.
            </p>
          </div>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">Rule</span>
              <div>
                <h3>No fake motion.</h3>
                <p>
                  Idle workers bob and belts shimmer. That is atmosphere. But a card only hops when it
                  really changed lane, and the victory sound only plays when something really reached Done.
                  A quiet floor means quiet work. You cannot make it look busy without doing something.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 02 BEFORE YOU START */}
      <section className="fg-section" id="requirements">
        <div className="fg-rail">02 &middot; Before you start</div>
        <div className="fg-body">
          <h2>Three things to have.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>LastDB and a Kanban board</h3>
                <p>
                  The Factory reads an existing board through the <code>kanban</code> command.
                  If <code>kanban list</code> works in your terminal, you are ready.
                  The LastDB installer adds the starter apps, Brain and LastSecrets. It does not add Kanban.
                  To install LastDB itself, start at <Link to="/#install">Install</Link>.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>Node 18 or newer</h3>
                <p>
                  Check with <code>node --version</code>. There is nothing to <code>npm install</code>.
                  The server has no dependencies.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3>A browser</h3>
                <p>Any modern one. The page is served from your own machine.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 03 GET IT */}
      <section className="fg-section" id="get-it">
        <div className="fg-rail">03 &middot; Get it</div>
        <div className="fg-body">
          <h2>Clone it and start the server.</h2>
          <p className="fg-lede">
            The Factory is a small standalone repository. Clone it anywhere you like.
            The examples use <code>~/kanban-factory</code>.
          </p>
          <div style={{ marginTop: '28px' }}>
            <CopyBlock text={INSTALL} />
          </div>
          <p className="fg-note">
            The third line starts the server in the foreground and prints the address.
            <code> POLL_MS</code> sets how often it reads the board again. Four seconds makes it feel live.
            Without it, the server checks once a minute. Keep the terminal open, or use the
            LaunchAgent below so it starts at login.
          </p>
        </div>
      </section>

      {/* 04 OPEN IT */}
      <section className="fg-section" id="open-it">
        <div className="fg-rail">04 &middot; Open it</div>
        <div className="fg-body">
          <h2>Open one browser tab.</h2>
          <div className="fg-two">
            <p>
              Point a browser at <code>http://127.0.0.1:4177</code>.
              Your lanes fill within a few seconds.
            </p>
            <p>
              Click the page once. Browsers do not allow sound until you interact with a page,
              so the first click turns the sounds on. To keep it silent, do not click, or press <code>S</code>.
            </p>
          </div>

          <h3 id="keep-it-running" style={{ marginTop: '40px' }}>Keep it running (macOS)</h3>
          <p>
            The bundled installer registers a LaunchAgent, so the Factory comes back after a reboot.
            It rewrites its paths to match the folder you cloned into.
          </p>
          <CopyBlock text={AUTOSTART} />
          <h3>Later</h3>
          <CopyBlock text={MANAGE} />
          <p className="fg-note">
            Logs go to <code>~/Library/Logs/kanban-factory.out.log</code> and <code>.err.log</code>.
            The LaunchAgent runs Node from <code>/opt/homebrew/bin/node</code>. If your Node came from
            somewhere else, the foreground command still works, but the LaunchAgent does not start.
          </p>
        </div>
      </section>

      {/* 05 READING THE FLOOR */}
      <section className="fg-section" id="reading-the-floor">
        <div className="fg-rail">
          05 &middot; Reading the floor
          <p>Top to bottom, this is what you are looking at.</p>
        </div>
        <div className="fg-body">
          <h2>Six parts of the page.</h2>
          <dl className="fg-faq" style={{ marginTop: '28px' }}>
            {FLOOR.map(([term, text]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
          <div className="fg-faq-group">
            <h3>Keyboard</h3>
            <dl className="fg-faq">
              {KEYS.map(([key, text]) => (
                <div key={key}>
                  <dt><code>{key}</code></dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 06 WHAT IT READS */}
      <section className="fg-section" id="what-it-reads">
        <div className="fg-rail">06 &middot; What it reads</div>
        <div className="fg-body">
          <h2>What it reads, and what it will not do.</h2>
          <p className="fg-lede">
            The Factory is a viewer. On a timer, it runs the same read commands you would type,
            and serves the result to your own browser.
          </p>

          <ArchFigure
            svg={TRUST}
            caption="Fig. 2 — three reads in, one page out; nothing crosses back"
          />

          <div className="fg-cards">
            <div className="fg-cardx fg-c2">
              <small>READS</small>
              <p>
                Your board&rsquo;s cards, the heartbeat note your scheduled jobs write, and your local LastDB version.
                You can read all three yourself from a terminal.
              </p>
            </div>
            <div className="fg-cardx fg-c3">
              <small>DOES NOT</small>
              <p>
                Move cards, claim work, edit notes, or change anything on your board.
                It has no account, no telemetry, and no outbound connection.
              </p>
            </div>
            <div className="fg-cardx fg-c4">
              <small>ONE EXCEPTION</small>
              <p>
                If you run a fleet of scheduled jobs, the Fleet chip can switch them between local profiles,
                for example a low-credit mode. That is the only button on the page that changes anything.
                It acts on your own machine, and you have to press it.
              </p>
            </div>
          </div>
          <p className="fg-note">
            The server binds <code>127.0.0.1</code> only. Nothing on this page is reachable from another machine.
          </p>
        </div>
      </section>

      {/* 07 TROUBLE */}
      <section className="fg-section" id="trouble">
        <div className="fg-rail">07 &middot; If it does not come up</div>
        <div className="fg-body">
          <h2>Four things to check.</h2>
          <dl className="fg-faq" style={{ marginTop: '28px' }}>
            <div>
              <dt>Empty lanes</dt>
              <dd>
                The server needs the <code>kanban</code> command on its PATH. Confirm that <code>kanban list</code> works
                in the same shell, then restart the server.
              </dd>
            </div>
            <div>
              <dt>Port already in use</dt>
              <dd>Something else is on 4177. Start it on another port: <code>PORT=4180 node server.mjs</code>.</dd>
            </div>
            <div>
              <dt>Nothing ever animates</dt>
              <dd>
                Check the poll interval. The default is one minute in the foreground.
                <code> POLL_MS=4000 node server.mjs</code> makes it feel live.
              </dd>
            </div>
            <div>
              <dt>Is it alive at all?</dt>
              <dd><code>curl -s http://127.0.0.1:4177/api/health</code> returns the card count it last saw.</dd>
            </div>
          </dl>

          <h3 id="updating" style={{ marginTop: '40px' }}>Updating</h3>
          <CopyBlock text={UPDATE} />

          <p className="fg-note">
            Why we built it, and the argument for the no-fake-motion rule:{' '}
            <Link to="/blog/kanban-factory">The Factory Floor</Link> on the Dev Blog.
          </p>
          <p className="fg-more">
            <Link to="/features">&larr; Features</Link>{' '}&nbsp;{' '}
            <Link to="/start">How to use LastDB &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/apps">Apps &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
