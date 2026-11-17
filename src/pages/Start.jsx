import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Commands on this page are checked against the installed CLI help:
// `brain help <command>`, `lastsecrets --help`, `lastdb status --help`.
// The LastSecrets example matches the one on /apps and in public/llms.txt.
const CODE_WRITE_NOTE = `brain concept new caching --title "Cache layer" --body "chose LRU because the working set is small"`;

const CODE_FIND_NOTE = `brain get caching
brain ask "what did we decide about caching?"`;

const CODE_CHANGE_NOTE = `brain concept new caching --title "Cache layer" --body "moved to a size cap; LRU alone grew too large" --force`;

const CODE_SECRET = `printf '%s' "$TOKEN" | lastsecrets put my-api-token \\
  --label "My API token" \\
  --provider example \\
  --purpose demo \\
  --env dev \\
  --value-stdin
lastsecrets ref my-api-token`;

const CODE_MCP_CLAUDE = `brain mcp install`;

const CODE_MCP_OTHER = `brain mcp`;

const CODE_HEALTH = `lastdb status
curl --fail --silent --show-error --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health`;

const stepBody = { flex: '1 1 0', minWidth: 0 };
const stepCode = { marginTop: '12px' };

export default function Start() {
  return (
    <>
      <Helmet>
        <title>How to use LastDB</title>
        <meta name="description" content="After install: keep notes and decisions in Brain, keep credentials in LastSecrets, and give your AI agent access through MCP. Both apps run on your own LastDB, on your own Mac." />
        <meta property="og:title" content="How to use LastDB" />
        <meta property="og:description" content="After install: daily use of Brain and LastSecrets, for you and for your agent." />
        <link rel="canonical" href="https://thelastdb.com/start" />
      </Helmet>

      {/* HERO */}
      <section className="fg-hero">
        <div className="fg-eyebrow">After install &middot; Brain and LastSecrets &middot; alpha</div>
        <h1>How to use it</h1>
        <div className="fg-hero-row">
          <p>
            This page assumes LastDB and the starter apps are installed.
            It covers daily use, for you and for your AI agent.
          </p>
          <div className="fg-actions">
            <Link to="/#install" className="fg-btn fg-btn-primary">Not installed? Install</Link>
            <Link to="/apps" className="fg-btn">Apps</Link>
          </div>
        </div>
      </section>

      {/* 01 WHERE THIS SITS */}
      <section className="fg-section" id="where">
        <div className="fg-rail">01 &middot; Where this sits</div>
        <div className="fg-body">
          <h2>Two apps on your own node.</h2>
          <div className="fg-two">
            <p>
              Each person runs one LastDB on their own Mac. That is a node. Brain and LastSecrets are apps
              on your node. They read and write it over a local Unix socket, and each is a complete app
              for one person. Nothing on this page needs an account.
            </p>
            <p>
              LastDB can also share a whole database with other people by invitation, and a developer can
              publish an app to the App Registry. This page does not cover either. To build or publish
              your own app, read the <Link to="/developer">Developer guide</Link>:
              step 8 is <Link to="/developer#share">sharing</Link> and
              step 9 is <Link to="/developer#publish">publishing</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 02 DAILY USE */}
      <section className="fg-section" id="humans">
        <div className="fg-rail">
          02 &middot; Daily use
          <p>Brain keeps notes and decisions. LastSecrets keeps credentials.</p>
        </div>
        <div className="fg-body">
          <h2>Write it once. Find it later.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div style={stepBody}>
                <h3>When a decision settles, write it to Brain.</h3>
                <p>A note has a short name, a title, and a body. Say why, not only what.</p>
                <pre style={stepCode}>{CODE_WRITE_NOTE}</pre>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div style={stepBody}>
                <h3>Find it later by name, or ask in plain words.</h3>
                <p>
                  <span className="bold">brain get</span> reads the note by name.{' '}
                  <span className="bold">brain ask</span> matches by keyword until LastSeek is installed,
                  so use a word from the note.
                </p>
                <pre style={stepCode}>{CODE_FIND_NOTE}</pre>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div style={stepBody}>
                <h3>Change the note when the decision changes.</h3>
                <p>
                  One current note is better than many old ones. Write the same name again with{' '}
                  <span className="bold">--force</span> to replace it.
                </p>
                <pre style={stepCode}>{CODE_CHANGE_NOTE}</pre>
              </div>
            </li>
            <li>
              <span className="fg-num">04</span>
              <div style={stepBody}>
                <h3>Keep credentials in LastSecrets.</h3>
                <p>
                  The value goes in on stdin, never on the command line.{' '}
                  <span className="bold">lastsecrets ref</span> prints a{' '}
                  <span className="bold">lastsecrets://&hellip;</span> reference. Put only that reference in your notes.
                </p>
                <pre style={stepCode}>{CODE_SECRET}</pre>
              </div>
            </li>
          </ol>
          <p className="fg-more"><Link to="/apps">See both apps and the install commands &rarr;</Link></p>
        </div>
      </section>

      {/* 03 FOR YOUR AGENT */}
      <section className="fg-section" id="agent">
        <div className="fg-rail">
          03 &middot; For your agent
          <p>The agent runs on your Mac and uses the same apps you do.</p>
        </div>
        <div className="fg-body">
          <h2>Give your agent the same memory.</h2>
          <p className="fg-lede">
            Point the agent at <a href="https://thelastdb.com/llms.txt">llms.txt</a>. It is the plain-text version of this site.
            Then connect Brain through MCP, so the agent can read and write your notes.
          </p>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">Claude Code <span>registers the server and adds the instructions to CLAUDE.md</span></div>
              <pre>{CODE_MCP_CLAUDE}</pre>
            </div>
            <div className="fg-code">
              <div className="fg-code-head">Any other client <span>register this as a stdio MCP server</span></div>
              <pre>{CODE_MCP_OTHER}</pre>
            </div>
          </div>
          <p className="fg-note">
            <span className="bold">brain mcp install</span> asks before it changes anything.
            It writes to <span className="bold">CLAUDE.md</span> and <span className="bold">.claude/settings.json</span> in the current folder,
            so run it in your project.
          </p>
          <ol className="fg-steps" style={{ marginTop: '28px' }}>
            <li>
              <span className="fg-num">01</span>
              <div style={stepBody}>
                <h3>A rule that helps.</h3>
                <p>
                  Ask the agent to search Brain before it starts, and to write each settled decision back.
                  The context then survives the chat.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div style={stepBody}>
                <h3>A rule for secrets.</h3>
                <p>
                  The agent stores a credential with <span className="bold">lastsecrets put</span>, value on stdin.
                  It keeps only the <span className="bold">lastsecrets://</span> reference in notes, documents, and logs.
                  It reads the value with <span className="bold">lastsecrets get</span> only at the point of use, and does not print it.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 04 IF IT IS NOT RESPONDING */}
      <section className="fg-section" id="health">
        <div className="fg-rail">04 &middot; If it&rsquo;s not responding</div>
        <div className="fg-body">
          <h2>Check the node before you restart it.</h2>
          <div className="fg-code-stack">
            <div className="fg-code">
              <div className="fg-code-head">Two checks <span>both read only</span></div>
              <pre>{CODE_HEALTH}</pre>
            </div>
          </div>
          <p className="fg-note">
            The health check returns JSON with <span className="bold">{`"status":"ok"`}</span>. If both commands succeed, the node is up.
            Restart only when both fail: <span className="bold">brew services restart lastdb</span>.
          </p>
          <p className="fg-more">
            <Link to="/#install">Install &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/apps">Apps &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/about">About &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/developer">Developer guide &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
