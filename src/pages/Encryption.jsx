import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';

export default function Encryption() {
  return (
    <>
      <Helmet>
        <title>E2E Encryption - Fold DB</title>
        <meta name="description" content="How Fold DB encrypts your data at rest. AES-256-GCM encryption with local key management and blinded search." />
        <meta property="og:title" content="E2E Encryption - Fold DB" />
        <meta property="og:description" content="How Fold DB encrypts your data at rest. AES-256-GCM encryption with local key management and blinded search." />
        <link rel="canonical" href="https://folddb.com/encryption" />
      </Helmet>
      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <pre className="ascii">{`
##### ##### #####
#         # #
###     ##  ###
#     #     #
##### ##### #####`.trim()}</pre>

      <h1 className="tagline">E2E Encryption</h1>

      <p>Your data is encrypted at rest on your device. Fold DB uses AES-256-GCM encryption so that even if someone accesses your storage files, they see only ciphertext.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* THE PROMISE */}
      <Section variant="sage">
        <h2 id="promise"><span className="bold">THE PROMISE</span> <span className="dim">Zero-knowledge by design</span></h2>

        <p>All data stored by Fold DB is encrypted at rest. Your encryption key lives on your machine &mdash; it is <span className="bold">never sent anywhere</span>. The database files on disk contain only ciphertext.</p>

        <div className="grid-3">
          <Card><p><Label color="green">LOCAL ENCRYPTION</Label></p><p>
            All encryption and decryption happens locally on your machine. Keys are stored at <span className="bold">~/.fold_db/e2e.key</span> and never leave your device.</p></Card>

          <Card><p><Label color="green">AES-256-GCM</Label></p><p>
            Industry-standard authenticated encryption. Each record gets a random nonce. Tamper-evident &mdash; any modification to ciphertext is detected on decryption.</p></Card>

          <Card><p><Label color="green">BLINDED SEARCH INDEX</Label></p><p>
            Keywords are blinded with HMAC-SHA256 before indexing. The on-disk index contains only opaque tokens &mdash; search works without exposing plaintext terms.</p></Card>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section variant="slate">
        <h2 id="how-it-works"><span className="bold">HOW IT WORKS</span> <span className="dim">Write, read, and search paths</span></h2>

        <pre className="compare-table">{`
`}<span className="dim">WRITE PATH</span>{`

  Client (plaintext)
       |
       v
  Compute atom UUID from plaintext (SHA256)
       |
       v
  Encrypt content: AES-256-GCM(encryption_key, nonce, json)
       |
       v
  Extract keywords from plaintext (AI)
       |
       v
  Blind each keyword: HMAC-SHA256(index_key, keyword)
       |
       v
  Store: ciphertext + blind tokens --> Local DB (opaque bytes on disk)


`}<span className="dim">READ PATH</span>{`

  Client requests record by key
       |
       v
  Local DB returns ciphertext from disk
       |
       v
  Decrypt: AES-256-GCM(encryption_key, ciphertext) --> plaintext JSON


`}<span className="dim">SEARCH PATH</span>{`

  User searches for "developer"
       |
       v
  Client computes: blind_token = HMAC-SHA256(index_key, "developer")
       |
       v
  Server matches blind tokens (exact match, no plaintext needed)
       |
       v
  Returns matching record references
       |
       v
  Client fetches and decrypts matching records locally`}</pre>

        <div className="grid-3">
          <Card><p><Label color="blue">WRITE</Label></p><p>
            Content is encrypted with AES-256-GCM before storage. Keywords are blinded with HMAC-SHA256. The database stores ciphertext and blind tokens &mdash; never plaintext.</p></Card>

          <Card><p><Label color="blue">READ</Label></p><p>
            The database returns raw ciphertext from disk. Fold DB decrypts locally using your encryption key. Plaintext exists only in memory during your session.</p></Card>

          <Card><p><Label color="blue">SEARCH</Label></p><p>
            Search terms are blinded client-side before querying. The server matches blind tokens without knowing what you searched for. Results are decrypted locally.</p></Card>
        </div>
      </Section>

      {/* KEY MANAGEMENT */}
      <Section variant="amber">
        <h2 id="keys"><span className="bold">KEY MANAGEMENT</span> <span className="dim">Local key generation &amp; HKDF derivation</span></h2>

        <pre className="compare-table">{`
  First launch: generate 32-byte random secret
       |
       v
  Store at ~/.fold_db/e2e.key (user-readable only)
       |
       v
  HKDF-SHA256 expands to two keys:
       |
       +-- info="fold:content-key" --> Encryption Key (AES-256-GCM)
       |
       +-- info="fold:index-key"   --> Index Key (HMAC-SHA256)`}</pre>

        <div className="grid-2">
          <Card><p><Label color="yellow">FIRST-TIME SETUP</Label></p>
            <p>1. Fold DB generates a cryptographically random 32-byte secret<br />
              2. Secret is stored at <span className="bold">~/.fold_db/e2e.key</span> (chmod 600)<br />
              3. HKDF derives encryption key + index key<br />
              4. All data written to disk is encrypted from the start</p></Card>

          <Card><p><Label color="yellow">SUBSEQUENT LAUNCHES</Label></p>
            <p>1. Fold DB reads secret from ~/.fold_db/e2e.key<br />
              2. HKDF derives the same encryption + index keys<br />
              3. All previously encrypted data is immediately accessible<br />
              4. Key file is the only thing you need to back up</p></Card>
        </div>

        <p className="section-subheading"><span className="bold">KEY STORAGE</span></p>

        <pre className="compare-table"><span className="dim">FILE                     PERMISSIONS    CONTENTS</span>{'\n'}<span className="dim">{'─'.repeat(79)}</span>{'\n'}~/.fold_db/e2e.key       600 (owner)    32-byte random secret (base64){'\n'}~/.fold_db/data/         700 (owner)    Encrypted database files (ciphertext){'\n'}~/.fold_db/index/        700 (owner)    Blinded search tokens (HMAC)</pre>
      </Section>

      {/* WHAT'S ENCRYPTED */}
      <Section variant="rose">
        <h2 id="scope"><span className="bold">WHAT&rsquo;S ENCRYPTED</span> <span className="dim">Encrypted vs plaintext by design</span></h2>

        <div className="grid-2">
          <Card><p><Label color="red">ENCRYPTED (OPAQUE ON DISK)</Label></p>
            <p><span className="bold">Atom content</span> &mdash; All user data values in the local database<br />
              AES-256-GCM with random nonce per atom</p>
            <p><span className="bold">Index keywords</span> &mdash; Search terms in the native index<br />
              HMAC-SHA256 blind tokens (deterministic for exact match)</p>
            <p><span className="bold">File attachments</span> &mdash; Binary files stored alongside data<br />
              Chunked AES-256-GCM (encrypt before writing to disk)</p></Card>

          <Card><p><Label color="red">PLAINTEXT (STRUCTURAL METADATA)</Label></p>
            <p><span className="bold">Schema names</span> &mdash; e.g. &ldquo;person_profile&rdquo;, &ldquo;medical_record&rdquo;<br />
              <span className="dim">Required for schema routing and validation</span></p>
            <p><span className="bold">Field names</span> &mdash; e.g. &ldquo;name&rdquo;, &ldquo;email&rdquo;, &ldquo;diagnosis&rdquo;<br />
              <span className="dim">Required for structured queries and schema enforcement</span></p>
            <p><span className="bold">Storage keys</span> &mdash; e.g. &ldquo;atom:uuid&rdquo;, &ldquo;ref:mol_uuid&rdquo;<br />
              <span className="dim">Required for key-value lookups and data retrieval</span></p>
            <p><span className="bold">Timestamps &amp; UUIDs</span> &mdash; Record metadata<br />
              <span className="dim">Required for ordering, deduplication, and versioning</span></p></Card>
        </div>

        <p className="dim">Structural metadata is intentionally plaintext &mdash; it enables schema validation, query routing, and deduplication without exposing user data content. See Section 5.3 of the <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer">paper</a> for the formal encryption-at-rest specification.</p>
      </Section>

      {/* CODE EXAMPLES */}
      <Section variant="lavender">
        <h2 id="code"><span className="bold">CODE EXAMPLES</span> <span className="dim">Web Crypto API</span></h2>

        <p>These examples illustrate the core cryptographic operations Fold DB performs internally.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="purple">1. KEY GENERATION</Label></p>
            <pre>{`// On first launch, generate a random secret
const secret = crypto.getRandomValues(
  new Uint8Array(32)
);

// Store at ~/.fold_db/e2e.key (base64)
// chmod 600 — owner-readable only
const encoded = btoa(
  String.fromCharCode(...secret)
);
// writeFile("~/.fold_db/e2e.key", encoded)`}</pre>
            <p className="dim">The 32-byte secret is generated once and stored locally. Back up this file to preserve access to your encrypted data.</p>
          </Card>

          <Card>
            <p><Label color="purple">2. DERIVE ENCRYPTION KEYS</Label></p>
            <pre>{`const enc = (s) => new TextEncoder().encode(s);

// Import secret as HKDF base key
const baseKey = await crypto.subtle.importKey(
  "raw", secret, "HKDF", false, ["deriveKey"]
);

// Derive AES-256-GCM encryption key
const encryptionKey = await crypto.subtle
  .deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: enc("fold:e2e:v1"),
      info: enc("fold:content-key")
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

// Derive HMAC key for search blinding
const indexKey = await crypto.subtle
  .deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: enc("fold:e2e:v1"),
      info: enc("fold:index-key")
    },
    baseKey,
    { name: "HMAC", hash: "SHA-256", length: 256 },
    false,
    ["sign"]
  );`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">3. ENCRYPT / DECRYPT ATOM</Label></p>
            <pre>{`async function encryptAtom(key, data) {
  const plaintext = new TextEncoder()
    .encode(JSON.stringify(data));
  const nonce = crypto.getRandomValues(
    new Uint8Array(12)
  );
  const ciphertext = await crypto.subtle
    .encrypt(
      { name: "AES-GCM", iv: nonce },
      key,
      plaintext
    );
  // Prepend nonce to ciphertext
  const out = new Uint8Array(
    12 + ciphertext.byteLength
  );
  out.set(nonce);
  out.set(new Uint8Array(ciphertext), 12);
  return out;
}

async function decryptAtom(key, encrypted) {
  const nonce = encrypted.slice(0, 12);
  const ciphertext = encrypted.slice(12);
  const plaintext = await crypto.subtle
    .decrypt(
      { name: "AES-GCM", iv: nonce },
      key,
      ciphertext
    );
  return JSON.parse(
    new TextDecoder().decode(plaintext)
  );
}`}</pre>
          </Card>

          <Card>
            <p><Label color="purple">4. BLIND SEARCH TOKEN</Label></p>
            <pre>{`async function blindToken(indexKey, term) {
  const data = new TextEncoder().encode(term);
  const sig = await crypto.subtle.sign(
    "HMAC", indexKey, data
  );
  // Use first 16 bytes, base64url encode
  const bytes = new Uint8Array(sig).slice(0, 16);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\\+/g, "-")
    .replace(/\\//g, "_")
    .replace(/=+$/, "");
}

// Search for "developer" without revealing
// the search term to the server:
const token = await blindToken(
  indexKey, "developer"
);
const results = await fetch(
  \`/api/native-index/search?term=\${token}\`
);
// Server matches blind tokens, returns
// record references. Client decrypts locally.`}</pre>
          </Card>
        </div>
      </Section>

      {/* SDK QUICK START */}
      <Section variant="sage">
        <h2 id="sdk"><span className="bold">API USAGE</span> <span className="dim">Transparent encryption via REST API</span></h2>

        <p>Fold DB handles encryption transparently. You write normal ingest/query calls to the local REST API &mdash; encryption and decryption happen automatically.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="green">INGEST DATA</Label></p>
            <pre>{`// Ingest via local REST API
// Fold DB encrypts before writing to disk
const response = await fetch(
  "http://localhost:9001/api/ingest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: {
        name: "John Doe",
        email: "john@example.com",
        role: "engineer",
      }
    })
  }
);

// Data is now encrypted at rest
// Keywords extracted and blinded in index`}</pre>
          </Card>

          <Card>
            <p><Label color="green">QUERY DATA</Label></p>
            <pre>{`// Query via local REST API
// Fold DB decrypts results in memory
const results = await fetch(
  "http://localhost:9001/api/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      schema: "person_profile",
      fields: ["name", "email", "role"],
    })
  }
);

// Response contains plaintext
const data = await results.json();

// Natural language search
// Search terms are blinded automatically
const hits = await fetch(
  "http://localhost:9001/api/ask?q=engineers"
);`}</pre>
          </Card>
        </div>

        <p className="dim">Encryption is handled by Fold DB internally. The REST API accepts and returns plaintext &mdash; all crypto operations happen transparently in the local process.</p>
      </Section>

      {/* LIMITATIONS */}
      <Section variant="slate">
        <h2 id="limitations"><span className="bold">LIMITATIONS</span> <span className="dim">Known trade-offs</span></h2>

        <div className="grid-2">
          <Card><p><Label color="blue">EXACT-MATCH SEARCH ONLY</Label></p><p>
            HMAC is deterministic but not order-preserving. Blinded search works for exact keyword matches only &mdash; no prefix, substring, or fuzzy search on encrypted tokens. Natural language queries use the AI engine which decrypts in memory.</p></Card>

          <Card><p><Label color="blue">LLM SEES PLAINTEXT IN MEMORY</Label></p><p>
            AI-powered natural language queries require plaintext. Content is decrypted in memory, processed by the local LLM (Ollama) or sent to a configured API (OpenRouter), then discarded.</p></Card>

          <Card><p><Label color="blue">KEY FILE IS CRITICAL</Label></p><p>
            If you lose <span className="bold">~/.fold_db/e2e.key</span>, your encrypted data is unrecoverable. Back up this file securely. There is no password reset or recovery mechanism by design.</p></Card>

          <Card><p><Label color="blue">NO KEY ROTATION WITHOUT RE-INDEX</Label></p><p>
            Replacing your key file invalidates all existing blind tokens in the index. A full re-encryption and index rebuild is required. Key rotation is supported but expensive.</p></Card>
        </div>
      </Section>

      {/* DOCUMENTATION */}
      <Section variant="amber">
        <h2 id="docs"><span className="bold">DOCUMENTATION</span> <span className="dim">Deeper reading</span></h2>

        <div className="grid-3">
          <Card><p><Label color="yellow">DESIGN DOC</Label></p><p>
            Full encryption architecture, threat model, and implementation plan.<br />
            <a href="https://github.com/shiba4life/fold_db/blob/master/docs/DESIGN_E2E_ENCRYPTION.md" target="_blank" rel="noreferrer">DESIGN_E2E_ENCRYPTION.md</a></p></Card>

          <Card><p><Label color="yellow">ARCHITECTURE</Label></p><p>
            Fold DB storage architecture, encryption layer, and local API design.<br />
            <a href="https://github.com/shiba4life/fold_db/blob/master/docs/ARCHITECTURE.md" target="_blank" rel="noreferrer">ARCHITECTURE.md</a></p></Card>

          <Card><p><Label color="yellow">SOURCE CODE</Label></p><p>
            FoldDB is open source. Browse the code, file issues, or contribute.<br />
            <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer">github.com/shiba4life/fold_db</a></p></Card>
        </div>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />
    </>
  );
}
