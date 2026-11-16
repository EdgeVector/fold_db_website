import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Start() {
  return (
    <>
      <Helmet>
        <title>How to use LastDB</title>
        <meta name="description" content="After install: keep notes and decisions in Brain, keep credentials in LastSecrets, and give your AI agent access through MCP." />
        <meta property="og:title" content="How to use LastDB" />
        <meta property="og:description" content="After install: daily use for you and for your agent." />
        <link rel="canonical" href="https://thelastdb.com/start" />
      </Helmet>
      <p><Link to="/" className="link-btn">&larr; Home</Link></p>
      <h1 className="tagline">How to use it</h1>
      <p className="bold white">This page assumes LastDB and the starter apps are installed.</p>
      <p className="hero-cta">
        <Link to="/#install" className="link-btn">Not installed? Install &rarr;</Link>{'  '}
        <Link to="/apps" className="link-btn">Apps</Link>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <Section variant="lavender">
        <h2 id="humans"><span className="bold">DAILY USE</span></h2>

        <div className="card-stack">
          <Card>
            <p><Label color="blue">1</Label> When a decision settles, write it to Brain.</p>
            <pre>{`brain concept new caching --title "Cache layer" --body "chose LRU because the working set is small"`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">2</Label> Find it later by name, or ask in plain words.</p>
            <pre>{`brain get caching
brain ask "what did we decide about caching?"`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">3</Label> Change the note when the decision changes. One current note is better than many old ones.</p>
          </Card>
          <Card>
            <p><Label color="blue">4</Label> Keep credentials in LastSecrets. Put only the reference in your notes.</p>
            <pre>{`printf '%s' "$TOKEN" | lastsecrets put my-api-token --label "My API token" --value-stdin
lastsecrets ref my-api-token`}</pre>
          </Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2 id="agent"><span className="bold">FOR YOUR AGENT</span></h2>

        <p>Point the agent at <a href="https://thelastdb.com/llms.txt">llms.txt</a>. It is the plain-text version of this site.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="yellow">MCP</Label> so the agent can read and write Brain</p>
            <pre>{`brain mcp`}</pre>
            <p className="dim">Register it as a stdio MCP server in your client. For Claude Code, <span className="bold">brain mcp install</span> does the wiring.</p>
          </Card>
          <Card>
            <p><Label color="yellow">A RULE THAT HELPS</Label></p>
            <p>Ask the agent to search Brain before it starts, and to write each settled decision back. The context then survives the chat.</p>
          </Card>
        </div>

        <p className="section-subheading"><span className="bold">IF IT&rsquo;S NOT RESPONDING</span></p>
        <pre>{`lastdb status
curl --fail --silent --show-error --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health`}</pre>
        <p className="dim">
          The health check returns JSON with <span className="bold">{`"status":"ok"`}</span>. If both commands succeed, the node is up.
          Restart only when both fail: <span className="bold">brew services restart lastdb</span>.
        </p>
      </Section>

      <p className="dim">
        <Link to="/#install" className="link-btn">Install</Link>{'  '}
        <Link to="/apps" className="link-btn">Apps</Link>{'  '}
        <Link to="/about" className="link-btn">About</Link>{'  '}
        <Link to="/developer" className="link-btn">Developer</Link>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
