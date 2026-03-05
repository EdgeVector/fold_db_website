import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';
import TypingAnimation from '../components/TypingAnimation';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Fold DB - Compute Without Exposure</title>
        <meta name="description" content="Fold DB is a database where data is never accessed directly. Folds enforce per-field access policies, transforms, trust distance, and payment gates on every query." />
        <meta property="og:title" content="Fold DB - Compute Without Exposure" />
        <meta property="og:description" content="A database where queries pass through policy-enforcing folds. Trust distance, cryptographic capabilities, payment gates, and security labels — four layers of access control on every operation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://folddb.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Fold DB - Compute Without Exposure" />
        <meta name="twitter:description" content="A database where queries pass through policy-enforcing folds. Four layers of access control on every operation." />
        <link rel="canonical" href="https://folddb.com" />
      </Helmet>
      <AsciiTitle />
      <br />
      <TypingAnimation />
      <hr className="decorative-rule" aria-hidden="true" />
      <h1 className="tagline">Compute Without Exposure.</h1>
      <hr className="decorative-rule" aria-hidden="true" />
      <br />
      <p>Fold DB is a database where <span className="bold white">data is never accessed directly</span>. Every query passes through a <span className="bold white">fold</span> &mdash; a policy-enforcing interface that checks trust distance, verifies credentials, applies transforms, and returns only what the caller is authorized to see.</p>

      <p><span className="bold white">Folds</span> as access control | <span className="bold white">Four-layer</span> policy enforcement | <span className="bold white">Append-only</span> audit</p>

      <p>
        <a href="#vision" className="link-btn">[Discover the Vision]</a>{'  '}
        <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer" className="link-btn">[Read the Paper]</a>{'  '}
        <a href="/papers/fold_db_paper_eli5.pdf" target="_blank" rel="noreferrer" className="link-btn">[ELI5 Version]</a>{'  '}
        <Link to="/guide" className="link-btn">[User Guide]</Link>{'  '}
        <Link to="/developer" className="link-btn">[Developer Guide]</Link>{'  '}
        <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer" className="link-btn">[GitHub]</a>
      </p>

      <Section variant="rose">
        <h2 id="problem"><span className="bold">THE PROBLEM</span> <span className="dim">Sharing data across trust boundaries</span></h2>

        <p>Traditional access control operates at the perimeter &mdash; once data reaches a processing host, the system has limited ability to constrain what happens to it. Fine-grained, per-field enforcement is rare.</p>

        <div className="grid-3">
          <Card><p><Label color="red">COARSE ACCESS</Label></p><p>
            You either have access or you don&rsquo;t. There&rsquo;s no way to show a researcher <span className="bold">de-identified</span> data while showing a doctor the full record &mdash; from the same underlying store, enforced by the database itself.</p></Card>

          <Card><p><Label color="red">NO ECONOMIC CONTROLS</Label></p><p>
            Who paid for access? Traditional databases don&rsquo;t know and don&rsquo;t care. Payment verification lives outside the data layer entirely, creating gaps between authorization and economic reality.</p></Card>

          <Card><p><Label color="red">TRUST IS BINARY</Label></p><p>
            You&rsquo;re either &ldquo;authorized&rdquo; or &ldquo;unauthorized.&rdquo; There&rsquo;s no concept of <span className="bold">distance</span> &mdash; your doctor, a researcher, and a stranger all get the same access level or none at all.</p></Card>
        </div>
      </Section>

      <Section variant="sage" id="vision">
        <h2><span className="bold">THE FOLD</span> <span className="dim">A single abstraction for data sovereignty</span></h2>

        <p>A fold is a <span className="bold white">policy-enforcing interface</span> over stored data. Raw values are never returned to callers. Each query passes through a fold that checks the caller&rsquo;s trust distance, verifies cryptographic credentials and payment, applies transforms, and returns only the authorized projection. If any check fails, the query returns nothing &mdash; no partial results, no error messages that leak structure.</p>

        <div className="grid-2">
          <Card><p><Label color="green">01 TRUST DISTANCE</Label></p><p>
            Every user has a <span className="bold">trust distance</span> (&tau;) from the data owner. &tau;&nbsp;=&nbsp;0 is the owner, &tau;&nbsp;=&nbsp;1 is their doctor, &tau;&nbsp;=&nbsp;3 is a researcher. Each field carries a policy like W1&nbsp;R3 &mdash; writable at distance&nbsp;&le;&nbsp;1, readable at distance&nbsp;&le;&nbsp;3. Trust is additive through chains and uses shortest path.</p></Card>

          <Card><p><Label color="green">02 CRYPTOGRAPHIC CAPABILITIES</Label></p><p>
            Fields can require key-based authorization with <span className="bold">bounded quotas</span>. RX<sub>10</sub>(pk) grants 10 reads to the holder of public key pk. When the counter reaches zero, access is revoked. Neither trust distance nor capabilities alone suffice &mdash; both must pass.</p></Card>

          <Card><p><Label color="green">03 SECURITY LABELS</Label></p><p>
            Each field carries a label from a <span className="bold">security lattice</span>. Transforms can only move information to equal or higher security levels &mdash; never downward. This prevents a fold from laundering sensitive data into a lower-classified output.</p></Card>

          <Card><p><Label color="green">04 PAYMENT GATES</Label></p><p>
            A fold can require <span className="bold">payment</span> as a condition of access. Cost is a function of trust distance &mdash; closer users pay less, distant users pay more. Queries return nothing unless payment is verified, integrating economics into the enforcement path.</p></Card>
        </div>

        <p className="dim">All four checks are conjunctive: every applicable check must succeed. Failure at any layer returns Nothing.</p>
      </Section>

      <Section variant="slate">
        <h2 id="how-it-works"><span className="bold">ARCHITECTURE</span> <span className="dim">Five components of a Fold DB node</span></h2>

        <div className="grid-3">
          <Card><p><Label color="blue">REGISTRY</Label></p><p>
            Stores fold definitions, field metadata, and policy configurations. Each fold declares its fields, trust-distance policies, capability constraints, security labels, and payment requirements.</p></Card>

          <Card><p><Label color="blue">EXECUTION ENGINE</Label></p><p>
            Evaluates fold computations under a given access context (user, trust distance, keys). Enforces all four policy layers and applies transforms. Returns the authorized projection or Nothing.</p></Card>

          <Card><p><Label color="blue">TRANSFORM LIBRARY</Label></p><p>
            Vetted transformation functions &mdash; reversible (read/write) or irreversible (read-only, e.g. hashing). Transforms derive fields across folds, forming a <span className="bold">DAG</span> with independent policy checks at each node.</p></Card>

          <Card><p><Label color="blue">APPEND-ONLY STORE</Label></p><p>
            Immutable log of all data writes. Every value ever written is retained, enabling <span className="bold">history traversal, audit, and rollback</span>. Previous values are never deleted. All data encrypted at rest with AEAD.</p></Card>

          <Card><p><Label color="blue">AUDIT SERVICE</Label></p><p>
            Records every access event &mdash; reads, failed queries, payment transactions, and trust distance changes. Signed entries are <span className="bold">non-repudiable</span>. Separate from data storage.</p></Card>

          <Card><p><Label color="blue">AI QUERY ENGINE</Label></p><p>
            Detects schemas on ingestion, extracts searchable keywords, and translates <span className="bold">natural language questions</span> into structured fold queries. Runs locally (Ollama) or via API (OpenRouter).</p></Card>
        </div>
      </Section>

      <Section variant="amber">
        <h2 id="compare"><span className="bold">COMPARE</span> <span className="dim">Traditional access control vs. fold-based access</span></h2>

        <pre className="compare-table"><span className="dim">PROPERTY             TRADITIONAL DATABASE          FOLD DB</span>{'\n'}<span className="dim">---------------------------------------------------------------------</span>{'\n'}Data access          <span className="dim">Direct reads / SQL queries</span>    Only through folds{'\n'}Access granularity   <span className="dim">Table or row level</span>           Per-field, per-fold{'\n'}Trust model           <span className="dim">Binary (authorized / not)</span>    Trust distance (&tau; = 0..n){'\n'}Economic controls    <span className="dim">External billing system</span>      Payment gates in query path{'\n'}Info flow control    <span className="dim">Application-level</span>            Lattice labels on every field{'\n'}Failure behavior     <span className="dim">Error messages / partial</span>     Nothing (no leakage){'\n'}Transform control    <span className="dim">Application code</span>             Registered, auditable, composable{'\n'}Audit                <span className="dim">Optional logging</span>             Append-only, non-repudiable{'\n'}Data history         <span className="dim">Overwrite on update</span>          All versions retained</pre>
      </Section>

      <Section variant="lavender">
        <h2 id="example"><span className="bold">EXAMPLE</span> <span className="dim">Hospital medical record with three folds</span></h2>

        <p>A patient stores a medical record with three fields: <span className="bold">name</span>, <span className="bold">diagnosis</span>, and <span className="bold">lab results</span>. Three folds expose different views of the same data:</p>

        <div className="grid-3">
          <Card><p><Label color="purple">FOLD 1: CLINICAL</Label></p><p>
            Exposes all three fields unchanged. Policy <span className="bold">W1 R1</span> &mdash; the patient&rsquo;s doctor (&tau;&nbsp;=&nbsp;1) can read and write. Every write is cryptographically signed.</p></Card>

          <Card><p><Label color="purple">FOLD 2: RESEARCH</Label></p><p>
            Same three fields, but name is <span className="bold">irreversibly hashed</span> (de-identified). Policy <span className="bold">W0 R3</span> &mdash; readable at greater distance, but only the owner can write.</p></Card>

          <Card><p><Label color="purple">FOLD 3: ANALYTICS</Label></p><p>
            Derives a <span className="bold">risk score</span> from diagnosis and lab results of Fold 2. Policy <span className="bold">W0 R5</span>. Both Fold 2 and Fold 3 policies must pass to reach the score.</p></Card>
        </div>

        <pre className="compare-table"><span className="dim">CALLER                    FOLD 1 (CLINICAL)    FOLD 2 (RESEARCH)    FOLD 3 (ANALYTICS)</span>{'\n'}<span className="dim">{'─'.repeat(79)}</span>{'\n'}Attending physician (&tau;=1)  All fields           All (hashed name)    Risk score{'\n'}External researcher (&tau;=3)  <span className="dim">Nothing</span>              All (hashed name)    Risk score{'\n'}Unauthorized user (&tau;=10)   <span className="dim">Nothing</span>              <span className="dim">Nothing</span>              <span className="dim">Nothing</span></pre>

        <p className="dim">Same data, different access levels, enforced by the database. The researcher never sees the patient&rsquo;s name. The unauthorized user gets nothing &mdash; no partial results, no error messages.</p>
      </Section>

      <Section variant="rose">
        <h2 id="ufs"><span className="bold">UNIVERSAL FOLD SERVICE</span> <span className="dim">Write once, run across all users</span></h2>

        <p>The fold model separates <span className="bold white">what computation runs</span> from <span className="bold white">whose data it runs on</span>. A Universal Fold Service publishes shared schemas that any data owner can adopt. Code written against a published schema runs identically across all adopters.</p>

        <div className="grid-3">
          <Card><p><Label color="red">POPULATION HEALTH</Label></p><p>
            A public health agency publishes a schema with age, BMI, blood pressure, cholesterol. Patients adopt it through their own folds with their own trust policies. A risk-stratification program runs across all adopters &mdash; patients who deny access are <span className="bold">silently excluded</span>.</p></Card>

          <Card><p><Label color="red">CREDIT SCORING</Label></p><p>
            A regulator publishes a credit schema. Banks map internal data to standard fields. A scoring model runs identically across all institutions. Each institution&rsquo;s fold enforces its own policies &mdash; some require payment, others restrict to regulators at &tau;&nbsp;&le;&nbsp;2.</p></Card>

          <Card><p><Label color="red">FEDERATED ML</Label></p><p>
            A research consortium publishes a training schema. Each institution applies irreversible differential-privacy transforms. Training sees only transformed, privacy-preserving values &mdash; never raw data. Institutions that revoke access are silently dropped.</p></Card>
        </div>

        <p className="dim">Users who deny access are invisible to the program &mdash; no error, no enumeration, no side channel.</p>
      </Section>

      <Section variant="sage">
        <h2 id="transforms"><span className="bold">TRANSFORMS</span> <span className="dim">Composable, auditable computation</span></h2>

        <p>Transforms derive fields across folds, forming a directed acyclic graph (DAG) with independent policy checks at each node.</p>

        <div className="grid-2">
          <Card><p><Label color="green">REVERSIBLE</Label></p><p>
            Field is readable and writable. Writes apply the inverse transform and propagate to the source fold. Example: <span className="bold">currency conversion</span> &mdash; submit in EUR, stored in USD, the inverse converts back.</p></Card>

          <Card><p><Label color="green">IRREVERSIBLE</Label></p><p>
            Field is read-only. The original value cannot be recovered. Example: <span className="bold">cryptographic hashing</span> for de-identification, k-anonymization, differential-privacy noise addition.</p></Card>
        </div>

        <p>The <span className="bold white">Universal Transform Registry</span> provides a shared catalog of vetted transforms. Content-addressed by hash &mdash; immutable, globally referenceable, and auditable by inspecting hashes alone.</p>
      </Section>

      <Section variant="slate">
        <h2 id="security"><span className="bold">SECURITY</span> <span className="dim">Data minimality with proof</span></h2>

        <p>Fold DB addresses four threats:</p>

        <div className="grid-2">
          <Card><p><Label color="blue">UNAUTHORIZED ACCESS</Label></p><p>
            Every query passes through a fold that checks trust distance, capabilities, and payment. Failure yields Nothing &mdash; <span className="bold">no data, no structural leakage</span>.</p></Card>

          <Card><p><Label color="blue">DATA TAMPERING</Label></p><p>
            Every write requires a <span className="bold">cryptographic signature</span>. The append-only store is immutable &mdash; entries are never modified or deleted after insertion.</p></Card>

          <Card><p><Label color="blue">INFORMATION LEAKAGE</Label></p><p>
            Monadic bind prevents partial results. Irreversible transforms prevent inversion. <span className="bold">Lattice labels</span> prevent transforms from downgrading data to a lower classification.</p></Card>

          <Card><p><Label color="blue">REPUDIATION</Label></p><p>
            Every access, payment, and transformation is recorded in the <span className="bold">append-only audit log</span> with user identity, timestamp, fold, and operation.</p></Card>
        </div>

        <p><span className="bold white">Data Minimality Property:</span> A query can never return more information than the caller is authorized to see. Proven by structural induction on the fold DAG. <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer" className="link-btn">[Read the proof]</a></p>
      </Section>

      <Section variant="amber">
        <h2 id="status"><span className="bold">STATUS</span> <span className="dim">Pre-launch &mdash; in active development</span></h2>

        <p>Fold DB has <span className="bold white">not launched yet</span>. The paper describes the target architecture. We are actively building toward it. The codebase is open source and contributions are welcome.</p>

        <p>
          <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer" className="link-btn">[Read the Paper]</a>{'  '}
          <a href="/papers/fold_db_paper_eli5.pdf" target="_blank" rel="noreferrer" className="link-btn">[ELI5 Version]</a>{'  '}
          <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer" className="link-btn">[View on GitHub]</a>{'  '}
          <Link to="/developer" className="link-btn">[Developer Guide]</Link>{'  '}
          <a href="https://schema.folddb.com" target="_blank" rel="noreferrer" className="link-btn">[Schema Registry]</a>
        </p>
      </Section>
    </>
  );
}
