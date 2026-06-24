import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Mermaid from '../components/Mermaid';

// What happens when you register a superset of a schema that already has data.
const EXPANSION_DIAGRAM = `flowchart LR
  V1["Schema v1<br/>(the fields you had)"]
  REG{{"register a superset:<br/>same shape + new fields"}}
  V2["Schema v2<br/>(old fields + new ones)"]
  DATA[("your existing<br/>records")]
  V1 --> REG --> V2
  V2 -. "auto-generated<br/>field-mappers (v2 → v1)" .-> V1
  V1 --- DATA
  V2 --- DATA`;

// The subtlety: reads of an OLD record route through the predecessor.
const READTHROUGH_DIAGRAM = `flowchart TB
  subgraph OLD["A record written before the change"]
    direction TB
    RO["read it under v2"] --> MAP["field-mappers"]
    MAP -->|"old fields: mapped from v1 ✓"| OK1["correct values"]
    MAP -.->|"new fields: no source<br/>to map from"| EMPTY["read as empty"]
  end
  subgraph NEW["A record written after the change"]
    direction TB
    RN["read it under v2"] --> NAT["native v2 record"]
    NAT -->|"every field present ✓"| OK2["correct values"]
  end`;

// The design move that makes the transition a non-event.
const FALLBACK_DIAGRAM = `flowchart LR
  Q(["need a value, e.g. the card's repo"]) --> F{"is the new<br/>field set?"}
  F -->|yes| UF["use the field"]
  F -->|"no (older record)"| FB["fall back to the<br/>value's old home"]
  UF --> OK(["always correct"])
  FB --> OK`;

export default function BlogEvolvingALiveSchema() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Evolving a schema on a live database - LastDB</title>
        <meta name="description" content="LastDB let us add fields to a live, in-use database with zero downtime and zero data loss. Then we learned a subtle thing about what 'old data just works' really means — and the one design move that makes a schema change a non-event." />
        <meta property="og:title" content="Evolving a schema on a live database — what 'just works' really means" />
        <meta property="og:description" content="Adding fields to a live LastDB schema: zero-downtime expansion, field-mappers, and the read-through subtlety we learned to design around." />
        <link rel="canonical" href="https://thelastdb.com/blog/evolving-a-live-schema" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Evolving a schema on a live database</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">We added a batch of new fields to a database that was in active use &mdash; no downtime, no migration script, no data loss. It mostly &ldquo;just worked.&rdquo; The interesting part is the one place it <em>didn&rsquo;t</em>, and what that taught us about schema change.</p>

      <p>We build LastDB using two of our own apps that run on it: <span className="bold">Brain</span> (a knowledge base) and <span className="bold">Kanban</span> (the task board our agents pull work from). The board had grown a habit of hiding important facts &mdash; which repo a task targets, whether it&rsquo;s blocked, how urgent it is &mdash; inside the free-text body of each card, where every reader had to re-parse them. We wanted those to be real, first-class <span className="bold">fields</span>. On a board that agents were reading and writing every few minutes.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Adding fields without a migration</h2>
      <p>In a lot of databases, &ldquo;add some columns to a table full of live data&rdquo; means a migration window, a backfill script, and a held breath. In LastDB it&rsquo;s an <span className="bold">expansion</span>: you register a schema that is a <em>superset</em> of one that already exists &mdash; same shape, plus the new fields &mdash; and LastDB recognizes it as the next version of that schema. It keeps both versions, and it auto-generates <span className="bold">field-mappers</span> so the old version&rsquo;s data is reachable through the new one.</p>

      <Mermaid chart={EXPANSION_DIAGRAM} />

      <p>The practical result: we registered the wider schema, pointed the app at it, and every existing record was still there and still correct. We checked the obvious way &mdash; counting the live records under the old shape and under the new one. <span className="bold white">Identical, down to the row.</span> No window, no script, nothing to roll back. That part genuinely just works, and it&rsquo;s the whole reason you can evolve a schema under a running system instead of scheduling an outage.</p>

      <Section variant="rose">
        <h2><span className="bold">The subtlety: &ldquo;old data works&rdquo; isn&rsquo;t &ldquo;old data has the new fields&rdquo;</span></h2>
        <p>Here&rsquo;s the thing we had to learn the un-obvious way. When you read a record that was written <em>before</em> the change, LastDB serves it by mapping from the previous version. The fields that existed back then map straight through &mdash; that&rsquo;s why all your old data reads perfectly. But the <span className="bold">brand-new fields have nothing to map from</span>. There was no such field when that record was written, so it reads as empty &mdash; no matter what you try to write into it afterward, because the read still resolves through the predecessor.</p>
        <p>Records created <em>after</em> the change are native to the new shape and carry every field. So you end up with a board where new cards are fully populated and older cards show blanks for the new fields &mdash; not because anything is broken, but because that&rsquo;s what &ldquo;the old data is preserved exactly as it was&rdquo; literally means.</p>
      </Section>

      <Mermaid chart={READTHROUGH_DIAGRAM} />

      <p>We spent a while convinced something was racing us &mdash; a stale process overwriting the new fields right after we filled them. It wasn&rsquo;t. A clean test settled it: write a new field onto an old record, read it back immediately (there it is), read it again a moment later (gone). Nothing was clobbering anything. The read was simply resolving through the older version of the record the whole time, where that field has never existed.</p>

      <h2>The move that makes it a non-event</h2>
      <p>Once you see it clearly, the fix isn&rsquo;t to fight it &mdash; it&rsquo;s to <span className="bold">not depend on a backfill that can&rsquo;t happen</span>. Every reader of the new fields prefers them, but falls back to where that information already lived (for us, the card body) when the field is empty.</p>

      <Mermaid chart={FALLBACK_DIAGRAM} />

      <p>That one rule dissolves the whole problem:</p>
      <ul>
        <li><span className="bold white">New records</span> get the clean, structured field immediately.</li>
        <li><span className="bold white">Old records</span> keep working untouched, served by the fallback.</li>
        <li><span className="bold white">There&rsquo;s no migration to finish</span> and no flag day &mdash; the system is correct at every moment of the transition, and old records simply adopt the new field the next time they&rsquo;re genuinely rewritten.</li>
      </ul>

      <h2>The lesson</h2>
      <p>&ldquo;Zero-downtime schema change&rdquo; is a real and wonderful thing &mdash; LastDB&rsquo;s expansion gave us exactly that, with the old data provably intact. But &ldquo;your old data is preserved&rdquo; and &ldquo;your old data retroactively grows new fields&rdquo; are different promises, and only the first one is physically free. The engineering that matters is on the <em>read</em> side: design the consumers so a newly-added field is an <span className="bold">upgrade where it&rsquo;s present and a no-op where it isn&rsquo;t</span>. Do that, and evolving a live schema stops being an event you schedule and becomes a change you just ship.</p>

      <p className="dim">This whole episode &mdash; the change, the confused debugging, and the fix &mdash; ran inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>, on <Link to="/apps">Brain and Kanban</Link>, open-source apps built on LastDB.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
