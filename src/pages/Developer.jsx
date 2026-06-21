import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import SchemaRegistry from '../components/SchemaRegistry';

export default function Developer() {
  return (
    <>
      <Helmet>
        <title>Developer Guide - Last DB</title>
        <meta name="description" content="LastDB developer documentation. REST API reference, access policies, trust distance, transforms, CLI commands, and architecture overview." />
        <meta property="og:title" content="Developer Guide - Last DB" />
        <meta property="og:description" content="LastDB developer documentation. REST API, access policies, transforms, trust distance, and architecture." />
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

      <p className="bold white">LastDB is in alpha. This guide describes the developer experience as it comes together &mdash; the project is under active development, and contributions are welcome.</p>

      <p>LastDB is a database where data is never accessed directly. Every query is checked against the access policies on the data it touches &mdash; trust distance, credentials, and transforms &mdash; and returns only the authorized projection. AI powers schema detection, keyword extraction, and natural language queries.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* QUICK START */}
      <Section variant="amber">
        <h2 id="quickstart"><span className="bold">QUICK START</span> <span className="dim">Up and running in 5 minutes</span></h2>

        <div className="card-stack">
          <Card><p><Label color="yellow">1. INSTALL</Label></p>
            <pre>brew install edgevector/folddb/lastdb</pre>
            <p className="dim">Installs the lastdb and lastdb_server binaries (macOS &amp; Linux). The old <span className="bold">folddb</span>/<span className="bold">folddb_server</span> command names keep working as aliases.</p></Card>

          <Card><p><Label color="yellow">2. CONFIGURE</Label></p>
            <pre>export FOLD_OPENROUTER_API_KEY=&quot;sk-...&quot;</pre>
            <p className="dim">Required for AI-powered ingestion and natural language queries</p></Card>

          <Card><p><Label color="yellow">3. RUN</Label></p>
            <pre>{`brew services start lastdb
curl -s http://127.0.0.1:9001/api/health   # confirm the node is up`}</pre>
            <p className="dim">Starts the LastDB daemon in the background &middot; API and dashboard at <span className="bold">localhost:9001</span></p>
            <pre>lastdb_server --port 9001   # run it in the foreground instead</pre></Card>

          <Card><p><Label color="yellow">4. INGEST SAMPLE DATA</Label></p>
            <pre>{`curl -s -X POST http://localhost:9001/api/ingestion/process \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "engineer",
      "joined": "2024-03-15"
    }
  }' | jq .`}</pre>
            <p className="dim">AI detects the schema, creates it if needed, writes the data, and indexes keywords</p></Card>

          <Card><p><Label color="yellow">5. QUERY IT BACK</Label></p>
            <pre>{`curl -s -X POST http://localhost:9001/api/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "schema_name": "person_profile",
    "fields": ["name", "email", "role"]
  }' | jq .`}</pre>
            <p className="dim">Use the schema name from step 4&rsquo;s response</p></Card>

          <Card><p><Label color="yellow">6. SEARCH THE INDEX</Label></p>
            <pre>curl -s &quot;http://localhost:9001/api/native-index/search?term=john&quot; | jq .</pre>
            <p className="dim">Returns all indexed entries matching the search term</p></Card>
        </div>
      </Section>

      {/* ACCESS POLICIES */}
      <Section variant="sage">
        <h2 id="access-policies"><span className="bold">ACCESS POLICIES</span> <span className="dim">How access is enforced</span></h2>

        <p>Each field carries a value, a security label, a trust-distance policy (Wn Rm), and optional capability constraints. Queries are evaluated against these policies under an access context C&nbsp;=&nbsp;(user, &tau;, keys).</p>

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
            <p><Label color="green">TRUST DISTANCE POLICIES</Label></p>
            <pre>{`// Each field has a Wn Rm policy
// W = max write distance, R = max read distance
{
  "fields": {
    "name":      { "policy": "W0 R1" },
    "diagnosis": { "policy": "W1 R1" },
    "lab_results": { "policy": "W1 R3" }
  }
}
// τ=0: owner (read/write all)
// τ=1: doctor (read/write all)
// τ=3: researcher (read lab_results only)
// τ=10: unauthorized (nothing)`}</pre>
          </Card>

          <Card>
            <p><Label color="green">TRANSFORMS</Label></p>
            <pre>{`// Reversible: read + write, inverse propagates
// e.g., currency conversion (EUR ↔ USD)
{
  "transform": "currency_convert",
  "reversible": true,
  "source_fold": "raw_financials",
  "source_field": "amount_usd"
}

// Irreversible: read-only, no recovery
// e.g., hash for de-identification
{
  "transform": "sha256_hash",
  "reversible": false,
  "source_fold": "patient_record",
  "source_field": "name"
}`}</pre>
          </Card>

          <Card>
            <p><Label color="green">CRYPTOGRAPHIC CAPABILITIES</Label></p>
            <pre>{`// Bounded read/write quotas tied to public keys
{
  "capabilities": [
    {
      "type": "RX",
      "public_key": "pk_researcher_abc",
      "quota": 100
    },
    {
      "type": "WX",
      "public_key": "pk_doctor_xyz",
      "quota": 50
    }
  ]
}
// Quota decrements per operation
// Access revoked when quota reaches 0`}</pre>
          </Card>

          <Card>
            <p><Label color="green">PAYMENT POLICIES</Label></p>
            <pre>{`// Cost as a function of trust distance
{
  "payment": {
    "cost_function": "linear",
    "base": 0.01,
    "per_distance": 0.005
  }
}
// τ=1 (doctor): $0.015
// τ=3 (researcher): $0.025
// τ=10 (distant): $0.06
// Monotonically non-decreasing:
//   closer users pay no more than distant ones`}</pre>
          </Card>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section variant="slate">
        <h2 id="architecture"><span className="bold">HOW IT WORKS</span> <span className="dim">The ingestion-to-query pipeline</span></h2>

        <pre className="compare-table">{`
Files / JSON / APIs
       |
       v
  AI Ingestion -----> Schema Service (detects or creates schema)
       |
       v
  Policy Registration -> Registry (policy definition + transforms)
       |
       v
  Mutation ----------> Append-Only Store (encrypted, signed, immutable)
       |
       v
  Keyword Indexing --> AI extracts and normalizes searchable terms
       |
       v
  Query -------------> Execution Engine evaluates policies under access context`}</pre>

        <div className="grid-3">
          <Card><p><Label color="blue">INGEST</Label></p><p>
            Send data in any format. AI analyzes the structure and maps it to a schema automatically.</p></Card>

          <Card><p><Label color="blue">SCHEMA</Label></p><p>
            The global schema service checks for existing compatible schemas or creates new ones.</p></Card>

          <Card><p><Label color="blue">STORE</Label></p><p>
            Data is written to the append-only store with AES-256-GCM encryption at rest. Every write is signed and immutable.</p></Card>

          <Card><p><Label color="blue">INDEX</Label></p><p>
            AI extracts keywords and normalizes terms (dates, names, etc.) for search.</p></Card>

          <Card><p><Label color="blue">EVALUATE</Label></p><p>
            The execution engine checks all four policy layers and applies transforms before returning results.</p></Card>

          <Card><p><Label color="blue">AUDIT</Label></p><p>
            Every access &mdash; successful or failed &mdash; is recorded in the append-only audit log with user identity, timestamp, schema, and operation.</p></Card>
        </div>
      </Section>

      {/* CODE EXAMPLES */}
      <Section variant="rose">
        <h2 id="code"><span className="bold">CODE EXAMPLES</span> <span className="dim">HTTP API &amp; TypeScript</span></h2>

        <p>Most integrations use the HTTP API at <span className="bold">localhost:9001</span>. All endpoints accept and return JSON.</p>
        <p className="dim">Rust library API is also available for embedded use &mdash; see <a href="https://github.com/EdgeVector" target="_blank" rel="noreferrer">EdgeVector on GitHub</a>.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="red">HTTP &mdash; INGEST JSON</Label></p>
            <pre>{`curl -X POST http://localhost:9001/api/ingestion/process \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": {
      "title": "Quarterly Report",
      "content": "Revenue grew 15% in Q3...",
      "author": "Jane Smith",
      "date": "2024-09-30"
    }
  }'`}</pre>
            <p className="dim">AI determines schema, writes data, and indexes keywords in one call</p>
          </Card>

          <Card>
            <p><Label color="red">HTTP &mdash; QUERY DATA</Label></p>
            <pre>{`curl -X POST http://localhost:9001/api/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "schema_name": "quarterly_report",
    "fields": ["title", "content", "author"]
  }'`}</pre>
            <p className="dim">Structured query &mdash; returns all matching molecules</p>
          </Card>

          <Card>
            <p><Label color="red">HTTP &mdash; NATURAL LANGUAGE</Label></p>
            <pre>{`curl -X POST http://localhost:9001/api/llm-query/agent \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What reports did Jane write?"
  }'`}</pre>
            <p className="dim">AI agent plans and executes queries across all schemas</p>
          </Card>

          <Card>
            <p><Label color="red">HTTP &mdash; SEARCH INDEX</Label></p>
            <pre>curl &quot;http://localhost:9001/api/native-index/search?term=revenue&quot;</pre>
            <p className="dim">Fast keyword search across all indexed data</p>
          </Card>

          <Card>
            <p><Label color="red">HTTP &mdash; UPLOAD FILE</Label></p>
            <pre>{`curl -X POST http://localhost:9001/api/ingestion/upload \\
  -F "file=@report.pdf"`}</pre>
            <p className="dim">Upload any file &mdash; AI extracts content, converts to JSON, and ingests</p>
          </Card>

          <Card>
            <p><Label color="red">TYPESCRIPT &mdash; FRONTEND CLIENTS</Label></p>
            <pre>{`import {
  schemaClient,
  securityClient,
  systemClient
} from "../api/clients";

// Schema operations with automatic caching
const response = await schemaClient.getSchemas();
if (response.success) {
  const schemas = response.data; // Fully typed
}

// System monitoring with 30-second cache
const status = await systemClient.getSystemStatus();`}</pre>
            <p className="dim">Available clients: SchemaClient &middot; SecurityClient &middot; SystemClient &middot; TransformClient &middot; IngestionClient &middot; MutationClient</p>
          </Card>
        </div>
      </Section>

      {/* REST API REFERENCE */}
      <Section variant="lavender">
        <h2 id="api"><span className="bold">REST API REFERENCE</span> <span className="dim">All endpoints at localhost:9001</span></h2>

        <p>Full OpenAPI spec available at <a href="http://localhost:9001/api/openapi.json" target="_blank" rel="noreferrer">localhost:9001/api/openapi.json</a> when the server is running.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">SCHEMAS</Label></p>
            <pre className="compare-table">{`GET  /api/schemas                    List all schemas
GET  /api/schema/{name}              Get schema by name
GET  /api/schema/{name}/keys         List keys (paginated)
POST /api/schemas/load               Load from schema dirs
POST /api/schema/{name}/approve      Approve a schema
POST /api/schema/{name}/block        Block a schema
GET  /api/backfill/{hash}            Get backfill status`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">INGESTION</Label></p>
            <pre className="compare-table">{`POST /api/ingestion/process          Ingest JSON data
POST /api/ingestion/upload           Upload a file
POST /api/ingestion/validate         Validate without ingesting
POST /api/ingestion/batch-folder     Batch ingest a folder
GET  /api/ingestion/status           Ingestion status
GET  /api/ingestion/config           Get ingestion config
POST /api/ingestion/config           Save ingestion config
GET  /api/ingestion/progress         All active progress
GET  /api/ingestion/progress/{id}    Progress by ID`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">SMART FOLDER</Label></p>
            <pre className="compare-table">{`POST /api/ingestion/smart-folder/scan
                                     AI-classify files
POST /api/ingestion/smart-folder/ingest
                                     Ingest recommended
POST /api/ingestion/smart-folder/resume
                                     Resume a batch
POST /api/ingestion/smart-folder/cancel
                                     Cancel a batch
GET  /api/ingestion/batch/{batch_id}
                                     Batch status`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">QUERY &amp; MUTATION</Label></p>
            <pre className="compare-table">{`POST /api/query                      Execute a query
POST /api/mutation                   Execute a mutation
POST /api/mutations/batch            Batch mutations
GET  /api/native-index/search        Keyword search (?term=)
GET  /api/indexing/status            Indexing status`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">LLM QUERY</Label></p>
            <pre className="compare-table">{`POST /api/llm-query/agent            Agent-based NL query
POST /api/llm-query/analyze          Analyze a query
POST /api/llm-query/execute          Execute a query plan
POST /api/llm-query/chat             Chat endpoint
POST /api/llm-query/analyze-followup Follow-up analysis
GET  /api/llm-query/backfill/{hash}  Backfill status`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">SYSTEM</Label></p>
            <pre className="compare-table">{`GET  /api/system/status              System health
GET  /api/system/public-key          Node public key
GET  /api/system/private-key         Node private key
GET  /api/system/database-config     Database config
POST /api/system/database-config     Update DB config
POST /api/system/reset-database      Reset database
POST /api/system/setup               Apply setup
POST /api/system/complete-path       Path completion
GET  /api/system/auto-identity       Auto-gen identity
GET  /api/openapi.json               OpenAPI spec`}</pre>
          </Card>
        </div>
      </Section>

      {/* CLI REFERENCE */}
      <Section variant="sage">
        <h2 id="cli"><span className="bold">CLI REFERENCE</span> <span className="dim">lastdb command line</span></h2>

        <div className="grid-2">
          <Card>
            <p><Label color="green">STATUS &amp; SCHEMAS</Label></p>
            <pre>{`lastdb status                          # Node health + config
lastdb schema list                     # List all schemas
lastdb schema get my_schema            # Inspect a schema
lastdb schema approve my_schema        # Approve pending
lastdb schema block my_schema          # Block a schema
lastdb schema load                     # Load from schema dirs`}</pre>
          </Card>

          <Card>
            <p><Label color="green">INGEST</Label></p>
            <pre>{`lastdb ingest file data.json           # Ingest a JSON file
lastdb ingest file < data.json         # Ingest from stdin
lastdb ingest smart-scan ~/Documents   # AI-classify files
lastdb ingest smart ~/Documents --all  # Scan + ingest all
lastdb ingest smart ~/Documents \\
  --files a.json,b.csv                 # Ingest specific files`}</pre>
          </Card>

          <Card>
            <p><Label color="green">QUERY &amp; SEARCH</Label></p>
            <pre>{`lastdb query tweets --fields text,author
                                       # Structured query
lastdb search "machine learning"       # Keyword search
lastdb ask "recent purchases over $50"
                                       # Natural language (AI)`}</pre>
          </Card>

          <Card>
            <p><Label color="green">MUTATE</Label></p>
            <pre>{`lastdb mutate run tweets \\
  --type create \\
  --fields '{"text":"hello"}'          # Single mutation
lastdb mutate batch mutations.json     # Batch from file`}</pre>
          </Card>

          <Card>
            <p><Label color="green">SYSTEM</Label></p>
            <pre>{`lastdb config show                     # Show config
lastdb config path                     # Config file path
lastdb reset --confirm                 # Reset database
lastdb transform list                  # List transforms
lastdb backfill stats                  # Backfill stats
lastdb completions bash                # Shell completions`}</pre>
          </Card>

          <Card>
            <p><Label color="green">GLOBAL FLAGS</Label></p>
            <pre>{`lastdb --json <command>                # JSON output
lastdb -v <command>                    # Verbose output
lastdb --config path/to/config.toml <command>
lastdb --user-hash abc123 <command>
lastdb --data-path /tmp/mydb <command>
lastdb --schema-service-url http://... <command>`}</pre>
          </Card>
        </div>
      </Section>

      {/* CONFIGURATION */}
      <Section variant="amber">
        <h2 id="config"><span className="bold">CONFIGURATION</span> <span className="dim">Environment variables</span></h2>

        <pre className="compare-table">{`
VARIABLE                         PURPOSE
${'─'.repeat(65)}
FOLD_OPENROUTER_API_KEY          API key for AI ingestion
FOLD_SCHEMA_SERVICE_URL          Schema service (default: schema.folddb.com)
FOLD_CONFIG                      Path to config file
FOLD_LOG_LEVEL                   trace | debug | info | warn | error
FOLD_STORAGE_MODE                Storage backend ("s3" for cloud)
FOLD_S3_BUCKET                   S3 bucket for database storage
FOLD_S3_REGION                   AWS region for S3
FOLD_UPLOAD_STORAGE_MODE         Upload storage ("s3" for cloud)`}</pre>
      </Section>

      {/* SCHEMA REGISTRY */}
      <Section variant="lavender">
        <h2 id="schemas"><span className="bold">SCHEMA REGISTRY</span> <span className="dim">Live from the global schema service</span></h2>

        <p>Browse the global schema registry. Schemas define data structure and permissions for interoperability across nodes. During ingestion, AI checks this registry for compatible schemas before creating new ones.</p>

        <SchemaRegistry />
      </Section>

      {/* DOCUMENTATION LINKS */}
      <Section variant="slate">
        <h2 id="docs"><span className="bold">DOCUMENTATION</span> <span className="dim">Deeper reading</span></h2>

        <div className="grid-2">
          <Card><p><Label color="blue">THE PAPER</Label></p><p>
            &ldquo;Fold DB: Compute Without Exposure&rdquo; &mdash; formal model, proofs, and architecture.<br />
            <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer">fold_db_paper.pdf</a></p></Card>

          <Card><p><Label color="blue">ELI5 PAPER</Label></p><p>
            A plain-language walkthrough of the same ideas, no formal notation.<br />
            <a href="/papers/fold_db_paper_eli5.pdf" target="_blank" rel="noreferrer">fold_db_paper_eli5.pdf</a></p></Card>

          <Card><p><Label color="blue">EDGEVECTOR</Label></p><p>
            Explore the projects &mdash; <a href="https://github.com/EdgeVector" target="_blank" rel="noreferrer">github.com/EdgeVector</a></p></Card>
        </div>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
