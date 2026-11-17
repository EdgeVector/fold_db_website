import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Code({ head, sub, children }) {
  return (
    <div className="fg-code">
      {head && <div className="fg-code-head">{head}{sub && <span>{sub}</span>}</div>}
      <pre>{children}</pre>
    </div>
  );
}

export default function Developer() {
  return (
    <>
      <Helmet>
        <title>Developer Guide - LastDB</title>
        <meta name="description" content="Build on LastDB: check the local node, declare a schema, write and read records over the socket, share a database with other people, and publish your app." />
        <meta property="og:title" content="Developer Guide - LastDB" />
        <meta property="og:description" content="LastDB developer guide: build an app for one person over the local socket, then share a database with other people and publish the app." />
        <link rel="canonical" href="https://thelastdb.com/developer" />
      </Helmet>

      <section className="fg-hero">
        <div className="fg-eyebrow">Developer guide &middot; alpha &middot; nine steps</div>
        <h1>Build for one person. <em>Then many.</em></h1>
        <div className="fg-hero-row">
          <p>
            LastDB is in alpha. It runs as one local daemon. Your apps send HTTP requests to it over a Unix socket.
            Build your app for one person first: steps 1 to 7. Then let people share a database (step 8)
            and publish the app (step 9).
          </p>
          <div className="fg-actions">
            <Link to="/#install" className="fg-btn fg-btn-primary">Install LastDB</Link>
            <Link to="/apps" className="fg-btn">Apps</Link>
          </div>
        </div>
        <p className="fg-note">
          Install first if you do not have a node yet. The install by hand and the node checks are in the{' '}
          <Link to="/docs">Docs</Link>.
        </p>
      </section>

      {/* 1. WHAT LASTDB IS */}
      <section className="fg-section" id="concepts">
        <div className="fg-rail">
          01 &middot; What LastDB is
          <p>Steps 1 to 7 are an app for one person. No account and no network.</p>
        </div>
        <div className="fg-body">
          <h2>Records, found by key.</h2>

          <p className="fg-lede">LastDB is a key-value database. You find a record by its key. There is no read that returns everything, except the key listing in step 5.</p>

          <dl className="fg-faq" style={{ marginTop: 28 }}>
            <div>
              <dt>Daemon</dt>
              <dd>The background process, <code>lastdbd</code>. It holds the data on this machine.</dd>
            </div>
            <div>
              <dt>Socket</dt>
              <dd>The file <code>~/.lastdb/data/folddb.sock</code>. Your requests go to this file. The name is the real file name; it is not a product name.</dd>
            </div>
            <div>
              <dt>Schema</dt>
              <dd>A named record type. It lists its fields and its keys.</dd>
            </div>
            <div>
              <dt>Record</dt>
              <dd>One stored value of one schema. It sits at one key.</dd>
            </div>
            <div>
              <dt>Primary key</dt>
              <dd>The key that finds a record. It has a <code>hash</code>, the first part of the key. A schema can also use a <code>range</code>, the second part. This guide uses a hash only.</dd>
            </div>
            <div>
              <dt>Alternate key</dt>
              <dd>A second named key that finds the same record. You give its value when you write the record.</dd>
            </div>
            <div>
              <dt>Query</dt>
              <dd>A read. It must name a key. A read with no key is refused.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 2. HEALTH CHECK */}
      <section className="fg-section" id="health">
        <div className="fg-rail">02 &middot; Check the node</div>
        <div className="fg-body">
          <h2>Check the node.</h2>

          <p className="fg-lede">Run these two requests. Both use the socket.</p>

        <div className="fg-code-stack">
          <div>
            <Code head="Health and status">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/health
curl -s --unix-socket ~/.lastdb/data/folddb.sock http://localhost/api/status`}</Code>
            <p className="fg-note">
              <code>/health</code> returns <code>{`{"status":"ok", ...}`}</code> with the API version and the node instance id.
              <code> /api/status</code> returns a summary of the running node.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* 3. DECLARE A SCHEMA */}
      <section className="fg-section" id="schema">
        <div className="fg-rail">03 &middot; Declare a schema</div>
        <div className="fg-body">
          <h2>Declare a schema.</h2>

          <p className="fg-lede">A schema must exist before you write to it. This example declares a <code>note</code>. Each note has an id, a tag, and a body. The id is the primary key. The tag is an alternate key, so you can find notes by tag.</p>

        <div className="fg-code-stack">
          <div>
            <Code head="POST /api/schemas/declare">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
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
  }'`}</Code>
            <p className="fg-note">
              <code>namespace</code> is your app name. It cannot contain a slash.
              The schema becomes <code>notes/note</code>. Use that name in the next steps.
            </p>
            <p className="fg-note">
              Declaring the same shape again is safe. The reply shows <code>resolution</code> as <code>reuse</code> when the schema already exists, and <code>register</code> when it is new.
              Changing a field or a key of an installed schema is refused. Declare a new schema name instead.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* 4. WRITE AND READ */}
      <section className="fg-section" id="records">
        <div className="fg-rail">04 &middot; Write and read</div>
        <div className="fg-body">
          <h2>Write a record, read it back.</h2>

        <div className="fg-code-stack">
          <div>
            <Code head="POST /api/mutation" sub="write">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
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
  }'`}</Code>
            <p className="fg-note">
              <code>key_value</code> is the primary key. <code>alternates</code> gives one value for each named alternate key.
              Every field in <code>record</code> must be declared in step 3.
              <code> expected</code> set to <code>absent</code> means the key must not exist yet.
              The reply has <code>ok: true</code> and <code>success: true</code>.
            </p>
          </div>

          <div>
            <Code head="POST /api/query" sub="read by primary key">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"schema_name":"notes/note","filter":{"HashKey":"n1"}}'`}</Code>
            <p className="fg-note">
              <code>HashKey</code> selects one record by its primary hash.
              The reply has <code>ok: true</code> and a <code>results</code> list. Each result has a <code>key</code> and its <code>fields</code>.
              A schema with a range uses <code>HashRangeKey</code> with both <code>hash</code> and <code>range</code>.
            </p>
          </div>

          <div>
            <Code head="POST /api/query" sub="read by alternate key">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  -X POST http://localhost/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"schema_name":"notes/note","filter":{"HashKey":"work"},"key_name":"by_tag"}'`}</Code>
            <p className="fg-note">
              Add <code>key_name</code> to read by an alternate key. The <code>HashKey</code> value is the alternate key value, here the tag.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* 5. LIST KEYS */}
      <section className="fg-section" id="list">
        <div className="fg-rail">05 &middot; List keys</div>
        <div className="fg-body">
          <h2>List the keys of a schema.</h2>

          <p className="fg-lede">
          <span className="bold">This is the one whole-schema read.</span> It lists every key of the schema.
          It returns one page at a time, and it does not return the field values. Use it to find keys, then read each record by key in step 4.
        </p>

        <div className="fg-code-stack">
          <div>
            <Code head="GET /api/list">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  "http://localhost/api/list?schema=notes/note&limit=2"`}</Code>
            <p className="fg-note">
              <code>limit</code> sets the page size. The default is 100. The maximum is 1000.
              The reply has <code>list.keys</code>, <code>list.has_more</code>, and <code>list.next_cursor</code>.
            </p>
          </div>

          <div>
            <Code head="Next page">{`curl -s --unix-socket ~/.lastdb/data/folddb.sock \\
  "http://localhost/api/list?schema=notes/note&limit=2&cursor=CURSOR"`}</Code>
            <p className="fg-note">
              Replace <code>CURSOR</code> with the <code>next_cursor</code> value from the last reply, percent-encoded.
              Stop when <code>has_more</code> is false.
              Add <code>&amp;hash=n1</code> to list only the keys under one hash.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* 6. CLI EQUIVALENTS */}
      <section className="fg-section" id="cli">
        <div className="fg-rail">06 &middot; Command line</div>
        <div className="fg-body">
          <h2>The same reads from the command line.</h2>

          <p className="fg-lede">The <code>lastdb</code> command runs the same reads. Add <code>--json</code> for the raw reply.</p>

        <div className="fg-code-stack">
          <div>
            <Code head="lastdb">{`lastdb status
lastdb get notes/note --key-hash n1
lastdb get-keys notes/note --limit 2
lastdb get-keys notes/note --key-hash work --key-name by_tag`}</Code>
            <p className="fg-note">
              <code>get</code> reads one record by key. <code>get-keys</code> lists keys, as step 5 does.
              <code> --key-name</code> needs <code>--key-hash</code>.
              Writes go through the socket request in step 4.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* 7. ERRORS */}
      <section className="fg-section" id="errors">
        <div className="fg-rail">07 &middot; Errors</div>
        <div className="fg-body">
          <h2>Errors name the problem.</h2>

          <p className="fg-lede">A failed request returns a 4xx or 5xx status. A 400 from this socket returns a JSON body that names the problem. This example comes from a read with no key:</p>

        <div className="fg-code-stack">
          <div>
            <Code head="400 Bad Request">{`{
  "ok": false,
  "kind": "full_schema_scan_not_allowed",
  "error": "product apps are keyed-access only; unfiltered schema queries are not supported",
  "message": "full_schema_scan_not_allowed: unfiltered query on product schema 'note' is not supported; add a keyed filter using the structured remediation",
  "schema_name": "note",
  "schema_id": "notes/note",
  "remediation": { "action": "add_key_filter", "request_key": "filter", "...": "trimmed" }
}`}</Code>
            <p className="fg-note">
              <code>kind</code> is the error code. Fix the request and send it again.
              A malformed mutation or query body returns <code>kind</code>, <code>error</code>, and sometimes <code>key</code> and <code>try</code>, with a corrected example.
            </p>
          </div>
        </div>
        </div>
      </section>


      {/* 8. SHARE A DATABASE */}
      <section className="fg-section" id="share">
        <div className="fg-rail">
          08 &middot; Share a database
          <p>Steps 8 and 9 are for many people. Shown with the lastdb command line.</p>
        </div>
        <div className="fg-body">
          <h2>Share a database.</h2>

          <p className="fg-lede">A node holds several named databases. One person, the <span className="bold">publisher</span>, shares a whole database with other people. Data for a different audience goes in a different database.</p>

        <div className="fg-code-stack">
          <div>
            <Code head="1. The recipient exports a contact file">{`lastdb share contact --out ben.contact`}</Code>
            <p className="fg-note">The recipient sends this file to the publisher. Each side also gives the other their public key over a channel they already trust.</p>
          </div>
          <div>
            <Code head="2. The publisher creates a database and invites">{`lastdb db create family-notes
lastdb --db family-notes share invite \\
  --recipient ben.contact --recipient-key "$BEN_KEY" \\
  --out ben.invite`}</Code>
            <p className="fg-note">The invitation is encrypted for that one recipient. The read permission in it lasts 24 hours unless you pass <code>--expires-in-hours</code>.</p>
          </div>
          <div>
            <Code head="3. The recipient accepts">{`lastdb share accept --publisher "$ANA_KEY" \\
  --name family-notes ben.invite`}</Code>
            <p className="fg-note">The database appears on the recipient&rsquo;s node and stays in step with the publisher&rsquo;s.</p>
          </div>
        </div>
          <h3 style={{ marginTop: 36 }}>Who can write</h3>
          <div className="fg-two">
            <p>Everyone invited can read the whole database. The publisher grants writing with <code>lastdb share contributors grant</code> and removes it with <code>lastdb share contributors revoke</code>.</p>
            <p>A change from another person goes, encrypted, to the publisher&rsquo;s node. That node checks the change against the sharing rules and the schema. It publishes the changes that pass and drops the ones that fail. Your app does not enforce this, so a modified copy of your app cannot get around it.</p>
          </div>
          <p className="fg-note">The cloud between the nodes is a central service. It stores and passes along encrypted bytes that it cannot read. It is not a peer-to-peer network.</p>
        </div>
      </section>

      {/* 9. PUBLISH YOUR APP */}
      <section className="fg-section" id="publish">
        <div className="fg-rail">09 &middot; Publish your app</div>
        <div className="fg-body">
          <h2>Publish your app.</h2>

          <p className="fg-lede">An app has no server, so there is nothing to deploy. A release is a signed entry in the App Registry.</p>

        <div className="fg-code-stack">
          <div>
            <Code head="Publish and install">{`lastdb app publish --manifest manifest.json
lastdb app install your-app`}</Code>
            <p className="fg-note">
              The manifest names the app, its schemas, and the commit to install. Each person installs the app by name, and it runs on their own Mac.
            </p>
            <p className="fg-note">
              Publishing needs a paid Exemem subscription. Exemem is the cloud service that LastDB uses for backup and sharing.
              People who use a published app pay nothing to use it. Building and running an app on your own Mac needs no subscription.
            </p>
          </div>
        </div>
        </div>
      </section>

      <section className="fg-section" id="next">
        <div className="fg-rail">Next</div>
        <div className="fg-body">
          <h2>Where to go from here.</h2>
          <p className="fg-lede">The interactive guide shows the layers, their parts, and their connections.</p>
          <p className="fg-more">
            <a href="/explore/#diagram">Explore the system &rarr;</a>{' '}&nbsp;{' '}
            <Link to="/apps">Full catalog of apps &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/docs">Install and node health: Docs &rarr;</Link>
          </p>
        </div>
      </section>
    </>
  );
}
