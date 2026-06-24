import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Mermaid from '../components/Mermaid';

// Zero-migration schema change: register a superset, the new fields' siblings
// keep pointing at the existing data.
const EXPANSION_DIAGRAM = `flowchart LR
  V1["Schema v1<br/>(the fields you had)"]
  REG{{"register a superset:<br/>same shape + new fields"}}
  V2["Schema v2<br/>(old fields + new ones)"]
  DATA[("your existing<br/>records")]
  V1 --> REG --> V2
  V2 -. "shared fields keep pointing<br/>at the same data" .-> DATA
  V1 --- DATA`;

// The real culprit: two code versions writing the same record mid-rollout.
const CLOBBER_DIAGRAM = `flowchart TB
  REC[("a record being<br/>actively rewritten")]
  NEW["NEW code<br/>writes {…, repo, status}"] -->|"sets the new fields"| REC
  OLD["OLD code (still running<br/>during the rollout)<br/>writes {… only the old fields}"] -->|"doesn't know the<br/>new fields exist"| REC
  REC --> OUT{"who wrote last?"}
  OUT -->|new code| GOOD["new fields present ✓"]
  OUT -->|old code| GONE["new fields blank again"]`;

// The controlled experiment that settled it.
const EXPERIMENT_DIAGRAM = `flowchart LR
  ISO(["one isolated node<br/>(no other writers)"]) --> W["write the new field<br/>on an existing record"]
  W --> WAIT["drain background work"]
  WAIT --> R["read it back"]
  R --> OK(["persists — every time ✓<br/>the database was fine"])`;

export default function BlogEvolvingALiveSchema() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The database bug that wasn't - LastDB</title>
        <meta name="description" content="We added fields to a live LastDB database with zero downtime and zero migration. Then the new fields seemed to vanish on old records. We nearly shipped two different wrong explanations before a controlled experiment proved the database was fine all along — the real culprit was a mixed-version rollout." />
        <meta property="og:title" content="The database bug that wasn't" />
        <meta property="og:description" content="Zero-migration schema expansion, a vanishing-field mystery, and why a single live observation is never a root cause." />
        <link rel="canonical" href="https://thelastdb.com/blog/evolving-a-live-schema" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">The database bug that wasn&rsquo;t</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">We added fields to a database that was in active use &mdash; zero downtime, zero migration, zero data loss. Then the new fields appeared to <em>vanish</em> from older records. We came within an inch of shipping two confident, opposite, wrong explanations before a controlled experiment showed the database had been fine the whole time.</p>

      <p>We build LastDB using two of our own apps that run on it: <span className="bold">Brain</span> and <span className="bold">Kanban</span>, the task board our agents pull work from. The board kept important facts &mdash; which repo a task targets, whether it&rsquo;s blocked &mdash; buried in free-text. We wanted them as real <span className="bold">fields</span>, on a board being read and written every few minutes.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The good part: changing a schema with no migration</h2>
      <p>In a lot of databases, &ldquo;add columns to a table full of live data&rdquo; means a migration window and a held breath. In LastDB it&rsquo;s an <span className="bold">expansion</span>: you register a schema that&rsquo;s a superset of one that already exists, and LastDB treats it as the next version &mdash; the shared fields keep pointing at the data you already had, and the new fields are simply empty until something writes them. No window, no backfill script, nothing to roll back.</p>

      <Mermaid chart={EXPANSION_DIAGRAM} />

      <p>We registered the wider schema, pointed the app at it, and checked the obvious way: count the live records under the old shape and the new one. <span className="bold white">Identical, down to the row.</span> That part genuinely just worked.</p>

      <Section variant="rose">
        <h2><span className="bold">The mystery: new fields that wouldn&rsquo;t stay written</span></h2>
        <p>Then we tried to fill the new fields on the existing cards &mdash; and they wouldn&rsquo;t stick. Write a value, read it back immediately: there. Read again a few seconds later: <em>gone.</em> No error, no warning. Just&hellip; empty again.</p>
        <p>Our first instinct was a tidy story: &ldquo;old records are preserved exactly, so new fields read as empty &mdash; that&rsquo;s graceful by design.&rdquo; We even drafted a post saying so. It was wrong. Our <em>second</em> instinct was the opposite: &ldquo;the write is silently dropped &mdash; it&rsquo;s a database bug.&rdquo; We filed it as one. That was wrong too.</p>
      </Section>

      <h2>The tell we almost missed</h2>
      <p>One detail didn&rsquo;t fit either story: when the value reverted, the record&rsquo;s <span className="bold">last-modified timestamp didn&rsquo;t change.</span> If the database were silently dropping our write, the record we wrote would still be <em>our</em> write. And if something were overwriting it, the timestamp would move. Neither matched. That&rsquo;s the moment to stop theorizing about the live system and build a clean one.</p>

      <h2>The experiment that settled it</h2>
      <p>We reproduced the whole sequence on a single, isolated node &mdash; one writer, nothing else running: create a record, expand the schema, write the new field on that pre-existing record, let the background work drain, read it back.</p>

      <Mermaid chart={EXPERIMENT_DIAGRAM} />

      <p>It persisted. Every time. The new field got its own storage on first write and read back cleanly &mdash; we even checked that the write and the read resolved to the <em>same</em> underlying location. <span className="bold white">The database was never the problem.</span></p>

      <Section variant="sage">
        <h2><span className="bold">The actual culprit: a mixed-version rollout</span></h2>
        <p>The board wasn&rsquo;t being written by one program. It was being written by a <span className="bold">fleet</span> &mdash; and during the rollout, some of those writers were still running the <em>old</em> code, which didn&rsquo;t know the new fields existed. New code would set <code>repo</code>; moments later an old-code writer would rewrite the same actively-edited record without it. The field flickered in and out depending on who wrote last. The records that <em>weren&rsquo;t</em> being actively rewritten kept their new values just fine.</p>
      </Section>

      <Mermaid chart={CLOBBER_DIAGRAM} />

      <h2>The lessons</h2>
      <ul>
        <li><span className="bold white">Zero-migration schema change is real</span> &mdash; and it held up: existing data was provably intact, and new fields work on old records the moment a single writer owns them.</li>
        <li><span className="bold white">A single live observation is not a root cause.</span> A busy production system is the worst place to reason about <em>why</em> something happens. The reproduction that matters is the one you can run in isolation.</li>
        <li><span className="bold white">Design so a rollout can&rsquo;t hurt.</span> Our readers prefer the new field but fall back to where the value already lived, so nothing breaks while a deploy is in flight &mdash; and the new fields simply take over as the last old writer ages out.</li>
        <li><span className="bold white">Be willing to be wrong twice.</span> We almost shipped &ldquo;graceful feature,&rdquo; then almost shipped &ldquo;database bug.&rdquo; The honest answer was neither &mdash; and the only thing that got us there was a controlled test instead of a confident narrative.</li>
      </ul>

      <p className="dim">This whole episode &mdash; the change, two wrong theories, and the experiment that corrected them &mdash; ran inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>, on <Link to="/apps">Brain and Kanban</Link>, open-source apps built on LastDB.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
