import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Mermaid from '../components/Mermaid';

// The app owns its schema; the database stores data against whatever shape the
// app declares. Upgrading a field is an app change, not a database operation.
const OWNERSHIP_DIAGRAM = `flowchart LR
  APP["Kanban app<br/>declares the shape of a card"] -->|"its schema"| DB[("LastDB<br/>stores records<br/>against that shape")]
  UP{{"want a new field?"}} -->|"the APP declares<br/>a richer shape"| APP
  DB -. "no DB change,<br/>no migration job" .-> DB`;

// Adding fields is an expansion: existing data stays put, new fields are simply
// empty until something writes them. No ALTER, no backfill, no downtime.
const EXPANSION_DIAGRAM = `flowchart LR
  V1["card: 10 fields"] -->|"app declares a superset"| V2["card: 18 fields<br/>(same 10 + 8 new)"]
  DATA[("every existing card")]
  V1 --- DATA
  V2 -. "the 10 you had keep<br/>pointing at the same data" .-> DATA
  V2 --> NEW["the 8 new fields:<br/>empty until written"]`;

// Because the DB serves both shapes at once, the app rollout needs no flag day.
const ROLLOUT_DIAGRAM = `flowchart TB
  BOARD[("the live board<br/>(one set of cards)")]
  OLDV["app v1 (old fields)"] -->|"reads & writes fine"| BOARD
  NEWV["app v2 (new fields)"] -->|"reads & writes fine"| BOARD
  BOARD --> NOTE["both versions valid at once<br/>→ roll out gradually, no cutover"]`;

export default function BlogEvolvingALiveSchema() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Upgrading a field, no migration required - LastDB</title>
        <meta name="description" content="We added structured fields to our Kanban app's data model while it was in active use. On most databases that's a migration — a schema change, a maintenance window, a backfill. On LastDB it required no database change and no migration at all, because the app owns its schema and the database adapts to it." />
        <meta property="og:title" content="Upgrading a field, no migration required" />
        <meta property="og:description" content="How we evolved our app's data model on LastDB with zero database changes, zero migrations, and zero downtime." />
        <link rel="canonical" href="https://thelastdb.com/blog/evolving-a-live-schema" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Upgrading a field, no migration required</h1>
      <p className="post-meta dim">2026-06-24</p>

      <p className="bold white">We just upgraded a core piece of our Kanban app&rsquo;s data model &mdash; turning facts that used to live in free text into real, structured fields &mdash; while the app was in active use. On most databases that&rsquo;s a migration: a schema change, a maintenance window, a backfill script. Here it was none of those. <span className="white">We changed the app. The database didn&rsquo;t change at all.</span></p>

      <p>We build LastDB using two of our own apps that run on it: <span className="bold">Brain</span> and <span className="bold">Kanban</span>, the task board our agents pull work from. Kanban had grown a habit of stuffing important facts &mdash; which repo a task targets, whether it&rsquo;s blocked, how urgent it is &mdash; into the free-text body of each card. We wanted those to be first-class <span className="bold">fields</span>. The interesting part is what that upgrade did <em>not</em> require.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The app owns its schema</h2>
      <p>In LastDB, the shape of your data is declared by the <span className="bold">app</span>, not hand-built into the database as tables you then have to alter. The database stores records against whatever shape the app declares. So &ldquo;add a field&rdquo; is fundamentally an <span className="bold">app-level change</span> &mdash; Kanban declares a richer card &mdash; not a database operation you schedule and babysit.</p>

      <Mermaid chart={OWNERSHIP_DIAGRAM} />

      <Section variant="sage">
        <h2><span className="bold">What the upgrade actually was</span></h2>
        <p>Kanban&rsquo;s card went from 10 fields to 18. To make that real, the app declared the new, wider shape &mdash; a <span className="bold">superset</span> of the old one. LastDB recognized it as the next version of the same card and <span className="bold">expanded</span> it: the 10 existing fields keep pointing at the data already on disk, and the 8 new fields are simply empty until something writes them.</p>
        <p>No <code>ALTER TABLE</code>. No backfill job. No maintenance window. Nothing to roll back. We checked the obvious way &mdash; counting the live cards before and after &mdash; and it was identical, down to the row.</p>
      </Section>

      <Mermaid chart={EXPANSION_DIAGRAM} />

      <p>That&rsquo;s the whole point of an app-owned schema: evolving your data model is a property of shipping a new version of the <em>app</em>, not a database project with its own runbook.</p>

      <h2>No flag day, either</h2>
      <p>Here&rsquo;s the part that surprised even us. Because LastDB happily serves <span className="bold">both</span> the old and the new card shape at the same time, we didn&rsquo;t need a coordinated cutover. The new app code rolled out gradually, and while it did, old and new versions were reading and writing the same board side by side &mdash; the old code working with its 10 fields, the new code with all 18, against the same data, with no errors and no flag day.</p>

      <Mermaid chart={ROLLOUT_DIAGRAM} />

      <p>An older writer just doesn&rsquo;t set the new fields; a newer one does. The new fields fill in naturally as the new version takes over. There&rsquo;s no moment where the system is half-migrated and brittle, because there&rsquo;s no migration to be halfway through.</p>

      <h2>Why this matters</h2>
      <p>The cost of changing a data model is one of the quiet taxes on building software: it turns a one-line product idea (&ldquo;tasks should have a priority&rdquo;) into a migration, a deploy plan, and a held breath. LastDB&rsquo;s model &mdash; the app declares its schema, the database adapts, both versions coexist &mdash; collapses that back down to what it should be: <span className="bold">an app change.</span> The same local-first, you-own-your-data philosophy behind LastDB is why evolving the data on top of it doesn&rsquo;t drag the database into it.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB &mdash; inside our <Link to="/blog/building-lastdb-with-agents">autonomous build loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
