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
        <meta name="description" content="Build on LastDB: check the local node, declare a schema, write and read records over the socket, share a database with other people, and publish your app." />
        <meta property="og:title" content="Developer Guide - LastDB" />
        <meta property="og:description" content="LastDB developer guide: the node, schemas, keys, and the socket requests your app sends." />
        <link rel="canonical" href="https://thelastdb.com/developer" />
      </Helmet>
      <p><Link to="/" className="link-btn">&larr; Home</Link></p>


      <h1 className="tagline">Developer Guide</h1>

      <p className="bold white">LastDB is in alpha. It runs as <span className="white">one local daemon</span>. Your apps send HTTP requests to it over a Unix socket.</p>
      <p>Build your app for one person first: steps 1 to 7. Then let people share a database (step 8) and publish the app (step 9).</p>

      <p className="hero-cta">
        <Link to="/#install" className="link-btn">Install LastDB &rarr;</Link>{'  '}
        <Link to="/apps" className="link-btn">Apps</Link>
        <span className="dim"> &mdash; install first if you do not have a node yet.</span>
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* 1. WHAT LASTDB IS */}
      <Section variant="sage">
        <h2 id="concepts"><span className="bold">1. WHAT LASTDB IS</span></h2>

        <p>LastDB is a key-value database. You find a record by its key. There is no read that returns everything, except the key listing in step 5.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="green">TERMS</Label></p>
            <p><span className="bold">Daemon:</span> the background process, <span className="bold">lastdbd</span>. It holds the data on this machine.</p>
            <p><span className="bold">Socket:</span> the file <span className="bold">~/.lastdb/data/folddb.sock</span>. Your requests go to this file. The name is the real file name; it is not a product name.</p>
            <p><span className="bold">Schema:</span> a named record type. It lists its fields and its keys.</p>
            <p><span className="bold">Record:</span> one stored value of one schema. It sits at one key.</p>
            <p><span className="bold">Primary key:</span> the key that finds a record. It has a <span className="bold">hash</span>, the first part of the key. A schema can also use a <span className="bold">range</span>, the second part. This guide uses a hash only.</p>
            <p><span className="bold">Alternate key:</span> a second named key that finds the same record. You give its value when you write the record.</p>
            <p><span className="bold">Query:</span> a read. It must name a key. A read with no key is refused.</p>
          </Card>
        </div>
      </Section>

      {/* 2. HEALTH CHECK */}
      <Section variant="rose">
        <h2 id="health"><span className="bold">2. CHECK THE NODE</span></h2>

        <p>Run these two requests. Both use the socket.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="red">HEALTH AND STATUS</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/status`}</pre>
            <p className="dim">
              <span className="bold">/health</span> returns <span className="bold">{`{"status":"ok", ...}`}</span> with the API version and the node instance id.
              <span className="bold"> /api/status</span> returns a summary of the running node.
            </p>
          </Card>
        </div>
      </Section>

      {/* 3. DECLARE A SCHEMA */}
      <Section variant="lavender">
        <h2 id="schema"><span className="bold">3. DECLARE A SCHEMA</span></h2>

        <p>A schema must exist before you write to it. This example declares a <span className="bold">note</span>. Each note has an id, a tag, and a body. The id is the primary key. The tag is an alternate key, so you can find notes by tag.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="red">POST /api/schemas/declare</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/schemas/declare \\
  -H "Content-Type: application/json" \\
  -d '{
    "namespace": "notes",
    "schema": {
      "name": "note",
      "schema_type": "Hash",
      "record_keys": {
        "primary": { "kind": "hash" },
        "alternates": { "by_tag": { "kind": "hash" } }
      },
      "fields": ["id", "tag", "body"],
      "field_types": { "id": "String", "tag": "String", "body": "String" }
    }
  }'`}</pre>
            <p className="dim">
              <span className="bold">namespace</span> is your app name. It cannot contain a slash.
              The schema becomes <span className="bold">notes/note</span>. Use that name in the next steps.
            </p>
            <p className="dim">
              Declaring the same shape again is safe. The reply shows <span className="bold">resolution</span> as <span className="bold">reuse</span> when the schema already exists, and <span className="bold">register</span> when it is new.
              Changing a field or a key of an installed schema is refused. Declare a new schema name instead.
            </p>
          </Card>
        </div>
      </Section>

      {/* 4. WRITE AND READ */}
      <Section variant="amber">
        <h2 id="records"><span className="bold">4. WRITE A RECORD, READ IT BACK</span></h2>

        <div className="card-stack">
          <Card>
            <p><Label color="red">POST /api/mutation (WRITE)</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/mutation \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "mutation",
    "schema": "notes/note",
    "record": { "id": "n1", "tag": "work", "body": "Ship the page" },
    "key_value": { "hash": "n1", "range": null },
    "alternates": { "by_tag": { "hash": "work", "range": null } },
    "mutation_type": "create",
    "expected": { "type": "absent" }
  }'`}</pre>
            <p className="dim">
              <span className="bold">key_value</span> is the primary key. <span className="bold">alternates</span> gives one value for each named alternate key.
              Every field in <span className="bold">record</span> must be declared in step 3.
              <span className="bold"> expected</span> set to <span className="bold">absent</span> means the key must not exist yet.
              The reply has <span className="bold">ok: true</span> and <span className="bold">success: true</span>.
            </p>
          </Card>

          <Card>
            <p><Label color="red">POST /api/query (READ BY PRIMARY KEY)</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"schema_name":"notes/note","filter":{"HashKey":"n1"}}'`}</pre>
            <p className="dim">
              <span className="bold">HashKey</span> selects one record by its primary hash.
              The reply has <span className="bold">ok: true</span> and a <span className="bold">results</span> list. Each result has a <span className="bold">key</span> and its <span className="bold">fields</span>.
              A schema with a range uses <span className="bold">HashRangeKey</span> with both <span className="bold">hash</span> and <span className="bold">range</span>.
            </p>
          </Card>

          <Card>
            <p><Label color="red">POST /api/query (READ BY ALTERNATE KEY)</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"schema_name":"notes/note","filter":{"HashKey":"work"},"key_name":"by_tag"}'`}</pre>
            <p className="dim">
              Add <span className="bold">key_name</span> to read by an alternate key. The <span className="bold">HashKey</span> value is the alternate key value, here the tag.
            </p>
          </Card>
        </div>
      </Section>

      {/* 5. LIST KEYS */}
      <Section variant="sage">
        <h2 id="list"><span className="bold">5. LIST THE KEYS OF A SCHEMA</span></h2>

        <p>
          <span className="bold">This is the one whole-schema read.</span> It lists every key of the schema.
          It returns one page at a time, and it does not return the field values. Use it to find keys, then read each record by key in step 4.
        </p>

        <div className="card-stack">
          <Card>
            <p><Label color="red">GET /api/list</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  "http://localhost/api/list?schema=notes/note&limit=2"`}</pre>
            <p className="dim">
              <span className="bold">limit</span> sets the page size. The default is 100. The maximum is 1000.
              The reply has <span className="bold">list.keys</span>, <span className="bold">list.has_more</span>, and <span className="bold">list.next_cursor</span>.
            </p>
          </Card>

          <Card>
            <p><Label color="red">NEXT PAGE</Label></p>
            <pre>{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  "http://localhost/api/list?schema=notes/note&limit=2&cursor=CURSOR"`}</pre>
            <p className="dim">
              Replace <span className="bold">CURSOR</span> with the <span className="bold">next_cursor</span> value from the last reply, percent-encoded.
              Stop when <span className="bold">has_more</span> is false.
              Add <span className="bold">&amp;hash=n1</span> to list only the keys under one hash.
            </p>
          </Card>
        </div>
      </Section>

      {/* 6. CLI EQUIVALENTS */}
      <Section variant="lavender">
        <h2 id="cli"><span className="bold">6. CLI EQUIVALENTS</span></h2>

        <p>The <span className="bold">lastdb</span> command runs the same reads. Add <span className="bold">--json</span> for the raw reply.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="purple">LASTDB</Label></p>
            <pre>{`lastdb status
lastdb get notes/note --key-hash n1
lastdb get-keys notes/note --limit 2
lastdb get-keys notes/note --key-hash work --key-name by_tag`}</pre>
            <p className="dim">
              <span className="bold">get</span> reads one record by key. <span className="bold">get-keys</span> lists keys, as step 5 does.
              <span className="bold"> --key-name</span> needs <span className="bold">--key-hash</span>.
              Writes go through the socket request in step 4.
            </p>
          </Card>
        </div>
      </Section>

      {/* 7. ERRORS */}
      <Section variant="rose">
        <h2 id="errors"><span className="bold">7. ERRORS</span></h2>

        <p>A failed request returns a 4xx or 5xx status. A 400 from this socket returns a JSON body that names the problem. This example comes from a read with no key:</p>

        <div className="card-stack">
          <Card>
            <p><Label color="red">400 BAD REQUEST</Label></p>
            <pre>{`{
  "ok": false,
  "kind": "full_schema_scan_not_allowed",
  "error": "product apps are keyed-access only; unfiltered schema queries are not supported",
  "message": "full_schema_scan_not_allowed: unfiltered query on product schema 'note' is not supported; add a keyed filter using the structured remediation",
  "schema_name": "note",
  "schema_id": "notes/note",
  "remediation": { "action": "add_key_filter", "request_key": "filter", "...": "trimmed" }
}`}</pre>
            <p className="dim">
              <span className="bold">kind</span> is the error code. Fix the request and send it again.
              A malformed mutation or query body returns <span className="bold">kind</span>, <span className="bold">error</span>, and sometimes <span className="bold">key</span> and <span className="bold">try</span>, with a corrected example.
            </p>
          </Card>
        </div>
      </Section>


      {/* 8. SHARE A DATABASE */}
      <Section variant="slate">
        <h2 id="share"><span className="bold">8. SHARE A DATABASE</span></h2>

        <p>A node holds several named databases. One person, the <span className="bold">publisher</span>, shares a whole database with other people. Data for a different audience goes in a different database.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="blue">1 &middot; THE RECIPIENT EXPORTS A CONTACT FILE</Label></p>
            <pre>{`lastdb share contact --out ben.contact`}</pre>
            <p className="dim">The recipient sends this file to the publisher. Each side also gives the other their public key over a channel they already trust.</p>
          </Card>
          <Card>
            <p><Label color="blue">2 &middot; THE PUBLISHER CREATES A DATABASE AND INVITES</Label></p>
            <pre>{`lastdb db create family-notes
lastdb --db family-notes share invite \\
  --recipient ben.contact --recipient-key "$BEN_KEY" \\
  --out ben.invite`}</pre>
            <p className="dim">The invitation is encrypted for that one recipient. The read permission in it lasts 24 hours unless you pass <span className="bold">--expires-in-hours</span>.</p>
          </Card>
          <Card>
            <p><Label color="blue">3 &middot; THE RECIPIENT ACCEPTS</Label></p>
            <pre>{`lastdb share accept --publisher "$ANA_KEY" \\
  --name family-notes ben.invite`}</pre>
            <p className="dim">The database appears on the recipient&rsquo;s node and stays in step with the publisher&rsquo;s.</p>
          </Card>
          <Card>
            <p><Label color="blue">WHO CAN WRITE</Label></p>
            <p>Everyone invited can read the whole database. The publisher grants writing with <span className="bold">lastdb share contributors grant</span> and removes it with <span className="bold">lastdb share contributors revoke</span>.</p>
            <p>A change from another person goes, encrypted, to the publisher&rsquo;s node. That node checks the change against the sharing rules and the schema. It publishes the changes that pass and drops the ones that fail. Your app does not enforce this, so a modified copy of your app cannot get around it.</p>
            <p className="dim">The cloud between the nodes is a central service. It stores and passes along encrypted bytes that it cannot read. It is not a peer-to-peer network.</p>
          </Card>
        </div>
      </Section>

      {/* 9. PUBLISH YOUR APP */}
      <Section variant="lavender">
        <h2 id="publish"><span className="bold">9. PUBLISH YOUR APP</span></h2>

        <p>An app has no server, so there is nothing to deploy. A release is a signed entry in the App Registry.</p>

        <div className="card-stack">
          <Card>
            <p><Label color="purple">PUBLISH AND INSTALL</Label></p>
            <pre>{`lastdb app publish --manifest manifest.json
lastdb app install your-app`}</pre>
            <p className="dim">
              The manifest names the app, its schemas, and the commit to install. Each person installs the app by name, and it runs on their own Mac.
            </p>
            <p className="dim">
              Publishing needs a paid Exemem subscription. Exemem is the cloud service that LastDB uses for backup and sharing.
              People who use a published app pay nothing to use it. Building and running an app on your own Mac needs no subscription.
            </p>
          </Card>
        </div>
      </Section>

      <Section variant="sage">
        <p>The interactive guide shows the layers, their parts, and their connections. <a href="/explore/#diagram" className="link-btn">Explore the system &rarr;</a></p>
        <p className="dim">Full catalog of apps: <Link to="/apps">Apps</Link>.</p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
