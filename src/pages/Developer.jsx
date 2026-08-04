import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Developer() {
  return (
    <>
      <Helmet>
        <title>Developer Guide - LastDB</title>
        <meta name="description" content="Build on LastDB: local Unix-socket API, access policies, and first-party apps. Homebrew installs a headless semantic daemon." />
        <meta property="og:title" content="Developer Guide - LastDB" />
        <meta property="og:description" content="LastDB developer guide: socket API, policies, and how apps talk to your local node." />
        <link rel="canonical" href="https://thelastdb.com/developer" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <pre className="ascii">{`
####  ##### #   #
#   # #     #   #
#   # ###   #   #
#   # #      # #
####  #####   #`.trim()}</pre>

      <h1 className="tagline">Developer Guide</h1>

      <p className="bold white">LastDB is in alpha. The product you install from Homebrew is a <span className="white">headless local daemon</span> &mdash; apps talk to it over a Unix socket.</p>

      <p>Data is never accessed as a free-for-all dump. Queries and mutations go through the node; first-party apps (Brain, Kanban, &hellip;) are the usual interface. Building a new app uses the same socket contract.</p>

      <p className="hero-cta">
        <Link to="/#install" className="link-btn">[Install LastDB &rarr;]</Link>{'  '}
        <Link to="/apps" className="link-btn">[Apps]</Link>
        <span className="dim"> &mdash; install first if you do not have a node yet.</span>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* QUICK START */}
      <Section variant="amber">
        <h2 id="quickstart"><span className="bold">QUICK START</span></h2>

        <div className="card-stack">
          <Card>
            <p><Label color="yellow">1. INSTALL</Label></p>
            <p>Use the home-page one-liner (Last Stack installs LastDB + apps). Database only:</p>
            <pre>{`brew install edgevector/lastdb/lastdb
brew services start lastdb`}</pre>
            <p className="dim">Full copy-paste path: <Link to="/#install">Home &rarr; Install</Link>.</p>
          </Card>

          <Card>
            <p><Label color="yellow">2. CONFIRM THE NODE</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health
# → {"status":"ok"}

lastdb status
lastdb --version
lastdbd --version`}</pre>
            <p className="dim">Socket: <span className="bold">~/.lastdb/data/folddb.sock</span>. Health path is <span className="bold">/health</span> (not <span className="bold">/api/health</span>). TCP <span className="bold">:9001</span> is retired.</p>
          </Card>

          <Card>
            <p><Label color="yellow">3. USE AN APP (OR THE SOCKET)</Label></p>
            <pre>{`brain init --grant-consent
brain concept new local-search --title "Local search" --body "Embeddings stay on this machine."
brain ask "what did I note about search?"

# raw status from the daemon
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/status`}</pre>
            <p className="dim">Apps are the happy path. Building a new app: talk HTTP to the same socket (query / mutation / schemas).</p>
          </Card>
        </div>
      </Section>

      {/* WHAT YOU GET */}
      <Section variant="sage">
        <h2 id="surface"><span className="bold">WHAT HOMEBREW SHIPS</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="green">INCLUDED</Label></p>
            <p><span className="bold">lastdbd</span> &mdash; semantic daemon (store, index, app identity, sync when connected).<br />
              <span className="bold">lastdb</span> &mdash; tiny control CLI (<span className="bold">status</span>, <span className="bold">connect</span>, &hellip;).<br />
              Socket API for apps over <span className="bold">~/.lastdb/data/folddb.sock</span>.</p>
          </Card>
          <Card>
            <p><Label color="green">NOT INCLUDED</Label></p>
            <p>No desktop UI, no DMG, no built-in file-ingestion product surface. Older docs that mention <span className="bold">lastdb ingest</span> or <span className="bold">/api/ingestion/*</span> describe a retired full-node path &mdash; not the Homebrew install.</p>
          </Card>
        </div>
      </Section>

      {/* SOCKET API */}
      <Section variant="rose">
        <h2 id="code"><span className="bold">SOCKET API</span> <span className="dim">what apps actually call</span></h2>

        <p>All examples use the owner Unix socket. Prefer first-party CLIs unless you are building a new app.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="red">HEALTH</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/health`}</pre>
            <p className="dim">Expect <span className="bold">{`{"status":"ok"}`}</span>.</p>
          </Card>

          <Card>
            <p><Label color="red">STATUS</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/api/status`}</pre>
            <p className="dim">Process / data-dir / sync summary.</p>
          </Card>

          <Card>
            <p><Label color="red">SCHEMAS</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  http://localhost/api/schemas`}</pre>
            <p className="dim">List schemas known to this node.</p>
          </Card>

          <Card>
            <p><Label color="red">QUERY</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"schema_name":"concept","limit":5}'`}</pre>
            <p className="dim">Structured query. Apps also use <span className="bold">/api/mutation</span> for writes (POST).</p>
          </Card>
        </div>

        <p className="dim">Exact request shapes evolve with the node; treat first-party apps and the TypeScript app SDK as the stable surface when in doubt. See <Link to="/apps">Apps</Link>.</p>
      </Section>

      {/* ACCESS POLICIES */}
      <Section variant="slate">
        <h2 id="access-policies"><span className="bold">ACCESS POLICIES</span> <span className="dim">how access is enforced</span></h2>

        <p>Each field can carry a value, a security label, a trust-distance policy (Wn Rm), and optional capability constraints. Queries are evaluated under an access context C&nbsp;=&nbsp;(user, &tau;, keys).</p>

        <pre className="compare-table">{`
  Query arrives with access context C = (user, τ, keys)
       |
       v
  Check trust distance: τ ≤ m for each field's Wn Rm policy
       |
       v
  Check capabilities: caller holds required key, quota > 0
       |
       v
  Check payment: P(user, field) satisfied
       |
       v
  Check security labels: ℓ_in ⊑ ℓ_out for all transforms
       |
       v
  All pass? → Apply transforms → Return authorized projection
  Any fail? → Return Nothing (no data, no error, no leakage)`}</pre>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">TRUST DISTANCE</Label></p>
            <pre>{`// Each field has a Wn Rm policy
// W = max write distance, R = max read distance
{
  "fields": {
    "name":        { "policy": "W0 R1" },
    "diagnosis":   { "policy": "W1 R1" },
    "lab_results": { "policy": "W1 R3" }
  }
}
// τ=0: owner · τ=1: doctor · τ=3: researcher`}</pre>
          </Card>
          <Card>
            <p><Label color="blue">TRANSFORMS</Label></p>
            <p>Deterministic functions on structures. Outputs are written back under policies of their own &mdash; so derived data is not a side door around access control. Details: the papers below.</p>
          </Card>
        </div>
      </Section>

      {/* CLI */}
      <Section variant="lavender">
        <h2 id="cli"><span className="bold">CLI SURFACE</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">LASTDB (Homebrew)</Label></p>
            <pre>{`lastdb status              # is the daemon up?
lastdb --version
lastdbd --version
lastdb connect             # optional: join cloud backup/sync (account + recovery phrase)
brew services start lastdb
brew services restart lastdb`}</pre>
            <p className="dim">Local use needs no account. <span className="bold">lastdb connect</span> joins an existing account for multi-device cloud backup/sync. App workflows live in app CLIs.</p>
          </Card>

          <Card>
            <p><Label color="purple">APPS</Label></p>
            <pre>{`brain init --grant-consent
brain concept new <slug> --title "…" --body "…"
brain ask "…"
brain mcp

kanban init
kanban list
kanban add <slug> --title "…"
kanban mcp

situations list
situations init`}</pre>
            <p className="dim">Full catalog: <Link to="/apps">Apps</Link>. Daily loop: <Link to="/start">How to use it</Link>.</p>
          </Card>
        </div>
      </Section>

      {/* DOCS */}
      <Section variant="slate">
        <h2 id="docs"><span className="bold">DOCUMENTATION</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="blue">THE PAPER</Label></p>
            <p>&ldquo;Fold DB: Compute Without Exposure&rdquo; &mdash; formal model and architecture.<br />
              <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer">fold_db_paper.pdf</a></p>
          </Card>
          <Card>
            <p><Label color="blue">ELI5 PAPER</Label></p>
            <p>Plain-language walkthrough of the same ideas.<br />
              <a href="/papers/fold_db_paper_eli5.pdf" target="_blank" rel="noreferrer">fold_db_paper_eli5.pdf</a></p>
          </Card>
          <Card>
            <p><Label color="blue">HOMEBREW TAP</Label></p>
            <p><a href="https://github.com/EdgeVector/homebrew-lastdb" target="_blank" rel="noreferrer">EdgeVector/homebrew-lastdb</a></p>
          </Card>
          <Card>
            <p><Label color="blue">GITHUB</Label></p>
            <p><a href="https://github.com/EdgeVector" target="_blank" rel="noreferrer">github.com/EdgeVector</a> &mdash; public apps: brain, fkanban, situations, lastsecrets, search, last-stack, &hellip;</p>
          </Card>
        </div>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
