import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";

// Technical line drawings, inverted for the dark site chrome: white ink,
// gray for hatch and secondary labels. No accent colour.
function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: "34px 0", textAlign: "center" }}>
      <div
        style={{
          background: "transparent",
          maxWidth: 660,
          margin: "0 auto",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption
          style={{
            color: "#888",
            fontSize: "11px",
            letterSpacing: "0.06em",
            marginTop: "12px",
            textTransform: "uppercase",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ink #fff · dim #888 · hatch #666
const SVG_DEFS = `
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#666" stroke-width="1"/>
    </pattern>
  </defs>`;

const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;background:transparent" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">${SVG_DEFS}`;

// Fig 1 — the schema travels; the lifetime does not.
const WHERE_IT_LIVES = `${SVG_OPEN("0 0 660 270")}
  <text x="36" y="28" fill="#888" font-size="11" letter-spacing="1.5">WHERE THE LIFETIME LIVES</text>

  <!-- published schema: cut-corner document, dashed = shared / not yours -->
  <polygon points="40,70 176,70 196,90 196,200 40,200" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="4 3"/>
  <polyline points="176,70 176,90 196,90" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="118" y="112" text-anchor="middle" fill="#fff" font-size="12" letter-spacing="1.5">PUBLISHED</text>
  <text x="118" y="130" text-anchor="middle" fill="#fff" font-size="12" letter-spacing="1.5">SCHEMA</text>
  <text x="118" y="158" text-anchor="middle" fill="#888" font-size="10">fields · key layout</text>
  <text x="118" y="174" text-anchor="middle" fill="#888" font-size="10">immutable · shared</text>

  <!-- connector: schema adopted by node -->
  <line x1="196" y1="135" x2="300" y2="135" stroke="#fff" stroke-width="1"/>
  <rect x="194" y="133" width="4" height="4" fill="#fff"/>
  <polygon points="300,135 291,131 291,139" fill="#fff"/>
  <text x="248" y="124" text-anchor="middle" fill="#888" font-size="10">ADOPT</text>

  <!-- your node: container rectangle -->
  <rect x="300" y="50" width="320" height="196" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="316" y="72" fill="#fff" font-size="12" letter-spacing="1.5">YOUR NODE</text>

  <!-- node-local state: cylinder, hatched = stored -->
  <path d="M 330 118 A 40 8 0 0 1 410 118 L 410 196 A 40 8 0 0 1 330 196 Z" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <ellipse cx="370" cy="118" rx="40" ry="8" fill="#282828" stroke="#fff" stroke-width="1"/>
  <text x="370" y="226" text-anchor="middle" fill="#888" font-size="10">NODE-LOCAL STATE</text>

  <!-- retention policy: cut-corner document, solid = yours -->
  <polygon points="470,96 582,96 598,112 598,196 470,196" fill="none" stroke="#fff" stroke-width="1"/>
  <polyline points="582,96 582,112 598,112" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="534" y="128" text-anchor="middle" fill="#fff" font-size="12" letter-spacing="1.5">RETENTION</text>
  <text x="534" y="146" text-anchor="middle" fill="#fff" font-size="12" letter-spacing="1.5">POLICY</text>
  <text x="534" y="170" text-anchor="middle" fill="#888" font-size="10">ttl = 30d</text>
  <text x="534" y="184" text-anchor="middle" fill="#888" font-size="10">set by the owner</text>

  <!-- policy -> state -->
  <line x1="470" y1="157" x2="410" y2="157" stroke="#fff" stroke-width="1"/>
  <rect x="468" y="155" width="4" height="4" fill="#fff"/>
  <rect x="408" y="155" width="4" height="4" fill="#fff"/>

  <!-- the point -->
  <text x="330" y="262" fill="#888" font-size="10">THE SCHEMA TRAVELS. THE LIFETIME DOES NOT.</text>
</svg>`;

// Fig 2 — one sweep pass: a cutoff on a time-sorted series, then a bounded purge.
const ONE_SWEEP = `${SVG_OPEN("0 0 660 300")}
  <text x="36" y="28" fill="#888" font-size="11" letter-spacing="1.5">ONE SWEEP PASS</text>

  <!-- time axis -->
  <line x1="40" y1="130" x2="620" y2="130" stroke="#888" stroke-width="1"/>
  <polygon points="620,130 611,126 611,134" fill="#888"/>
  <text x="600" y="150" text-anchor="end" fill="#888" font-size="10">TIME (RANGE KEY)</text>

  <!-- rows: small squares on the axis; expired ones highlighted with a heavier stroke -->
  <rect x="60"  y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="2"/>
  <rect x="104" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="2"/>
  <rect x="148" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="2"/>
  <rect x="192" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="2"/>
  <rect x="236" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="2"/>
  <rect x="324" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="368" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="412" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="456" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="500" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="544" y="92" width="24" height="24" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>

  <!-- cutoff -->
  <line x1="292" y1="56" x2="292" y2="150" stroke="#fff" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="292" y="48" text-anchor="middle" fill="#fff" font-size="10">CUTOFF = NOW − TTL</text>

  <!-- dimension lines -->
  <line x1="60" y1="70" x2="260" y2="70" stroke="#888" stroke-width="1"/>
  <line x1="60" y1="66" x2="60" y2="74" stroke="#888" stroke-width="1"/>
  <line x1="260" y1="66" x2="260" y2="74" stroke="#888" stroke-width="1"/>
  <text x="160" y="62" text-anchor="middle" fill="#888" font-size="10">EXPIRED</text>
  <line x1="324" y1="70" x2="568" y2="70" stroke="#888" stroke-width="1"/>
  <line x1="324" y1="66" x2="324" y2="74" stroke="#888" stroke-width="1"/>
  <line x1="568" y1="66" x2="568" y2="74" stroke="#888" stroke-width="1"/>
  <text x="446" y="62" text-anchor="middle" fill="#888" font-size="10">KEPT</text>

  <!-- expired keys drop into the purge flow -->
  <polyline points="204,116 204,190" fill="none" stroke="#fff" stroke-width="1"/>
  <rect x="202" y="114" width="4" height="4" fill="#fff"/>
  <rect x="202" y="188" width="4" height="4" fill="#fff"/>

  <!-- gate: backup snapshot in progress? -->
  <polygon points="40,190 100,166 160,190 100,214" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="100" y="187" text-anchor="middle" fill="#fff" font-size="9">BACKUP</text>
  <text x="100" y="199" text-anchor="middle" fill="#fff" font-size="9">CUT HELD?</text>
  <text x="100" y="236" text-anchor="middle" fill="#888" font-size="10">YES → SKIP THIS TICK</text>

  <!-- gate -> purge, fed by the expired keys -->
  <line x1="160" y1="190" x2="240" y2="190" stroke="#fff" stroke-width="1"/>
  <rect x="158" y="188" width="4" height="4" fill="#fff"/>
  <text x="180" y="182" text-anchor="middle" fill="#888" font-size="10">NO</text>

  <!-- purge: process rectangle -->
  <rect x="240" y="166" width="170" height="48" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="325" y="186" text-anchor="middle" fill="#fff" font-size="11" letter-spacing="1.5">PURGE</text>
  <text x="325" y="203" text-anchor="middle" fill="#888" font-size="10">≤ 64 keys per batch</text>
  <rect x="238" y="188" width="4" height="4" fill="#fff"/>

  <!-- purge -> audit row -->
  <line x1="410" y1="190" x2="470" y2="190" stroke="#fff" stroke-width="1"/>
  <rect x="408" y="188" width="4" height="4" fill="#fff"/>
  <polygon points="470,190 461,186 461,194" fill="#fff"/>

  <!-- audit row: small document -->
  <polygon points="470,166 540,166 552,178 552,214 470,214" fill="none" stroke="#fff" stroke-width="1"/>
  <polyline points="540,166 540,178 552,178" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="511" y="186" text-anchor="middle" fill="#fff" font-size="9">AUDIT</text>
  <text x="511" y="199" text-anchor="middle" fill="#fff" font-size="9">ROW</text>

  <!-- status readout -->
  <text x="40" y="272" fill="#888" font-size="10">STATUS: policies · passes · rows reaped · failures · hold time per policy</text>
  <text x="40" y="288" fill="#888" font-size="10">SAME HARD-DELETE PATH AS A USER DELETE. NEVER CREATES AN ABSENT SCHEMA.</text>
</svg>`;

// Fig 3 — three planes for one telemetry source.
const THREE_PLANES = `${SVG_OPEN("0 0 660 330")}
  <text x="36" y="28" fill="#888" font-size="11" letter-spacing="1.5">THREE PLANES FOR ONE SOURCE</text>

  <!-- the source: an actor -->
  <circle cx="90" cy="160" r="30" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="90" y="164" text-anchor="middle" fill="#fff" font-size="11" letter-spacing="1.5">SOURCE</text>
  <text x="90" y="210" text-anchor="middle" fill="#888" font-size="10">a node, a job,</text>
  <text x="90" y="224" text-anchor="middle" fill="#888" font-size="10">a device</text>

  <!-- fan-out bus -->
  <line x1="120" y1="160" x2="170" y2="160" stroke="#fff" stroke-width="1"/>
  <rect x="118" y="158" width="4" height="4" fill="#fff"/>
  <line x1="170" y1="76" x2="170" y2="244" stroke="#fff" stroke-width="1"/>
  <line x1="170" y1="76" x2="220" y2="76" stroke="#fff" stroke-width="1"/>
  <line x1="170" y1="160" x2="220" y2="160" stroke="#fff" stroke-width="1"/>
  <line x1="170" y1="244" x2="220" y2="244" stroke="#fff" stroke-width="1"/>
  <rect x="218" y="74" width="4" height="4" fill="#fff"/>
  <rect x="218" y="158" width="4" height="4" fill="#fff"/>
  <rect x="218" y="242" width="4" height="4" fill="#fff"/>

  <!-- plane 1: current state, one document, overwritten in place -->
  <polygon points="222,56 296,56 310,70 310,96 222,96" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <polyline points="296,56 296,70 310,70" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="330" y="70" fill="#fff" font-size="11" letter-spacing="1.5">CURRENT STATE</text>
  <text x="330" y="86" fill="#888" font-size="10">Hash(source) · one row, overwritten</text>
  <text x="330" y="100" fill="#888" font-size="10">no lifetime needed</text>

  <!-- plane 2: rollups, a time-sorted row of squares with a TTL span -->
  <rect x="222" y="148" width="22" height="22" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="252" y="148" width="22" height="22" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="282" y="148" width="22" height="22" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="312" y="148" width="22" height="22" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="342" y="148" width="22" height="22" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <rect x="372" y="148" width="22" height="22" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2"/>
  <line x1="222" y1="184" x2="364" y2="184" stroke="#888" stroke-width="1"/>
  <line x1="222" y1="180" x2="222" y2="188" stroke="#888" stroke-width="1"/>
  <line x1="364" y1="180" x2="364" y2="188" stroke="#888" stroke-width="1"/>
  <text x="293" y="200" text-anchor="middle" fill="#888" font-size="10">TTL 30d</text>
  <text x="420" y="154" fill="#fff" font-size="11" letter-spacing="1.5">ROLLUPS</text>
  <text x="420" y="170" fill="#888" font-size="10">HashRange(source#bucket, period)</text>
  <text x="420" y="184" fill="#888" font-size="10">one bounded row per period</text>

  <!-- plane 3: raw samples sealed in a chunk, manifest row in LastDB -->
  <polygon points="222,244 236,222 282,222 296,244 282,266 236,266" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <text x="259" y="248" text-anchor="middle" fill="#fff" font-size="9">CHUNK</text>
  <line x1="296" y1="244" x2="330" y2="244" stroke="#fff" stroke-width="1"/>
  <rect x="294" y="242" width="4" height="4" fill="#fff"/>
  <rect x="328" y="242" width="4" height="4" fill="#fff"/>
  <polygon points="330,226 380,226 390,236 390,262 330,262" fill="none" stroke="#fff" stroke-width="1"/>
  <polyline points="380,226 380,236 390,236" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="360" y="248" text-anchor="middle" fill="#fff" font-size="9">MANIFEST</text>
  <text x="420" y="238" fill="#fff" font-size="11" letter-spacing="1.5">RAW SAMPLES</text>
  <text x="420" y="254" fill="#888" font-size="10">compressed chunk in file storage,</text>
  <text x="420" y="268" fill="#888" font-size="10">manifest row in LastDB · TTL 90d</text>

  <!-- legend -->
  <polygon points="40,296 62,296 68,302 68,314 40,314" fill="none" stroke="#fff" stroke-width="1"/>
  <text x="76" y="309" fill="#888" font-size="10">record</text>
  <rect x="136" y="298" width="16" height="16" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <text x="160" y="309" fill="#888" font-size="10">one row</text>
  <polygon points="226,305 232,296 246,296 252,305 246,314 232,314" fill="url(#hatch)" stroke="#fff" stroke-width="1"/>
  <text x="260" y="309" fill="#888" font-size="10">sealed chunk</text>
  <rect x="352" y="298" width="16" height="16" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="376" y="309" fill="#888" font-size="10">next period, not yet written</text>
</svg>`;

export default function BlogRowsThatExpire() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Rows That Expire - LastDB</title>
        <meta
          name="description"
          content="LastDB now lets a node give any schema a lifetime. Why the lifetime lives on the node and not on the published schema, how one sweep pass works, why the first pass reaped zero rows, and what this lets us keep in the database."
        />
        <meta property="og:title" content="Rows That Expire" />
        <meta
          property="og:description"
          content="Per-schema TTL is live in LastDB. Telemetry, health samples, and run history can now live in the database without growing it forever."
        />
        <link
          rel="canonical"
          href="https://thelastdb.com/blog/rows-that-expire"
        />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">Rows That Expire</h1>
      <p className="post-meta dim">2026-09-21</p>

      <p className="bold white">
        LastDB can now give a schema a lifetime. One command sets it. The node
        erases rows older than that lifetime on its own, through the same
        hard-delete path a user delete takes. That one knob changes what belongs
        in the database. Telemetry, health samples, job history, and other data
        that is useful for a while can now live in LastDB without growing it
        forever.
      </p>

      <pre
        style={{
          background: "#282828",
          border: "1px solid #504945",
          padding: "12px 14px",
          margin: "0.9em 0",
          fontSize: "13px",
          lineHeight: 1.55,
          overflowX: "auto",
        }}
      >
        {"lastdb schema-retention set --schema MetricRollup --ttl 30d\n"}
        {"lastdb schema-retention get --schema MetricRollup\n"}
        {"lastdb schema-retention clear --schema MetricRollup"}
      </pre>

      <h2>The question</h2>

      <p>
        The request, in August, was one sentence: store short-lived telemetry in
        LastDB and make sure it does not keep making the database bigger.
      </p>

      <p>
        We already had most of the parts. A hard delete existed. It erased a
        record from every read path at once and wrote an audit row. A small
        reaper existed too. It drained two of the node&rsquo;s own internal
        telemetry series down to a row cap on a timer, settled when it found
        nothing, and gave up loudly after repeated failures. A TTL is that
        reaper generalized on two axes: it counts{" "}
        <span className="bold white">time instead of rows</span>, and it applies
        to <span className="bold white">any schema</span> instead of two
        hard-coded ones. The mechanism was three to five days of work. The
        decisions around it took longer.
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">The rule we had to read again</span>
        </h2>
        <p>
          LastDB has a settled rule about delete: it erases now. No grace
          period, no trash can, no timer. A TTL looked like a timer, so the
          first agent assigned the work stopped and asked.
        </p>
        <p>
          The two are opposites. The delete rule protects a decision the user
          made: when you delete a record, nothing waits around to be reaped
          later. A TTL schedules an erasure{" "}
          <span className="bold white">nobody asked for</span>, on data{" "}
          <span className="bold white">nobody wrote by hand</span>. The first
          rule forbids a timer that delays an erasure. The second adds a timer
          that causes one. We wrote that distinction into the rule itself, so
          the next agent to read &ldquo;no retention timer&rdquo; beside a TTL
          task does not stall the same way.
        </p>
      </Section>

      <h2>Where the lifetime lives</h2>

      <p>
        The design went through three drafts in two days. The first draft put a{" "}
        <code>ttl_seconds</code> field on the published schema definition. We
        rejected it, for a reason that turned out to be wrong: we said the field
        would change the schema&rsquo;s identity hash and stop two
        otherwise-identical schemas from merging. We then read the identity
        algorithm instead of the struct. Retention never enters it. The
        objection was asserted from the shape of the code, not from what it
        computes.
      </p>

      <p>
        The second draft split it: a retention class on the schema, an enforced
        window on the node. The third draft is the one that shipped, and it is
        simpler than both.{" "}
        <span className="bold white">
          A lifetime is always a local setting.
        </span>{" "}
        Nothing about retention enters the published schema, its content hash,
        or the signals that decide whether two schemas are the same thing.
      </p>

      <ArchFigure
        svg={WHERE_IT_LIVES}
        caption="Fig. 1 — A published schema is immutable and shared. The retention policy is a record in node-local state, set by the node owner."
      />

      <p>Three reasons, in order of weight:</p>

      <ol>
        <li>
          <span className="bold white">Sovereignty.</span> LastDB is local-first
          and user-owned. A lifetime declared on the published schema would let
          a remote schema author schedule deletion on your machine. Deletion is
          the one operation where the node owner&rsquo;s say should be final.
          The earlier draft optimized for &ldquo;the declaration travels&rdquo;
          and undervalued this.
        </li>
        <li>
          <span className="bold white">Correctability.</span> Published schemas
          are immutable. A mistaken one-hour lifetime on data that needs ninety
          days would be frozen forever. A local setting is one command to fix.
        </li>
        <li>
          <span className="bold white">Precedent.</span> Retention is a
          deployment property in every comparable system we could name: metric
          stores, log pipelines, message queues, log rotation. None of them put
          it in the data definition.
        </li>
      </ol>

      <p>
        The cost is that the declaration does not travel. A second node that
        adopts the same schema learns nothing about its intended lifetime, and
        each operator sets each series by hand. We accepted that cost. A
        proposal where an app <em>proposes</em> a default at install time and
        the node owner keeps the final say is written down but not built.
      </p>

      <h2>One sweep pass</h2>

      <p>
        A policy is a small record in the node&rsquo;s local schema state: the
        schema name, the lifetime in seconds, and for partitioned series the
        list of partitions it covers. The node&rsquo;s periodic self-check
        starts a sweep. One sweep runs at a time.
      </p>

      <ArchFigure
        svg={ONE_SWEEP}
        caption="Fig. 2 — Expired keys are those below the cutoff. The sweep skips while a backup snapshot is held, then purges in bounded batches through the audited hard-delete path."
      />

      <p>The sweep keeps every safety property the old reaper had:</p>

      <ul>
        <li>
          It never creates a schema. A node that never wrote a series must not
          be given one by the thing meant to shrink it.
        </li>
        <li>
          It skips while a cloud backup snapshot is in progress, so a backup
          never sees half a purge.
        </li>
        <li>
          It selects expired keys without a scan. Time-ordered series use their
          range key: every key below <code>now &minus; ttl</code> is expired.
          Keyed and single-record schemas use a small written-at index the write
          path maintains.
        </li>
        <li>
          It purges at most 64 keys per batch, through the same hard-delete path
          a user delete takes, and each batch writes an audit row.
        </li>
        <li>
          It reports. <code>lastdb status</code> shows the policy count, passes,
          rows reaped, failures, and the exclusive hold time each policy cost.
          The kill switch is <code>LASTDB_TTL_SWEEP=0</code>.
        </li>
      </ul>

      <Section variant="rose">
        <h2>
          <span className="bold">The first pass reaped zero rows</span>
        </h2>
        <p>
          On August 26 we set four policies on the run history of our own
          scheduled agent jobs and asked how much came back. The answer was
          zero. Four separate causes, all real, none of them the purge path:
        </p>
        <ul>
          <li>
            A partitioned policy stored with an empty partition list produced
            zero filters. The sweep did nothing and said nothing.
          </li>
          <li>
            One series used ISO timestamp strings as its range key. The cutoff
            is a zero-padded number. A string like <code>2026-08-…</code> never
            sorts below a twenty-digit number, so nothing ever expired.
          </li>
          <li>
            One series had a single live row. Its 30 MiB was version churn under
            that row, which a lifetime cannot touch. That is a separate
            retention window on superseded versions, shipped the same week.
          </li>
          <li>
            The sweep latched <em>settled</em> after its first empty pass, and
            nothing released the latch. Even the corrected policy waited for a
            restart.
          </li>
        </ul>
        <p>
          After a supervised restart the first real reap ran:{" "}
          <span className="bold white">5,430 rows</span> purged in 64-key chunks
          over about 35 minutes, node healthy throughout. The latch fix landed a
          few days later. The sweep now re-checks its policies on every tick,
          because time and local policy both change without a restart.
        </p>
      </Section>

      <p>
        Today the primary node reports{" "}
        <code>
          enabled=true policies=3 passes=1065 failures=0 settled=false
        </code>
        . The constraints that remain are stated, not hidden. A time-ordered
        series needs a numeric, zero-padded time as its range key. A partitioned
        policy needs an explicit partition list, so a dynamic set of millions of
        partitions is not a fit for this sweep yet. And a purge makes rows
        unreachable; the disk comes back at compaction, not at purge time.
      </p>

      <h2>What this lets us keep in LastDB</h2>

      <p>
        Before this, telemetry-class data had two bad homes. Keep it in LastDB
        and watch the store grow without bound. Keep it somewhere else and lose
        the point-read, the sync, and the encryption at rest that the rest of
        the app already gets. A lifetime gives it a third home. It also forced a
        rule we now apply to every new schema:{" "}
        <span className="bold white">shape follows lifecycle.</span> A fact has
        to justify its key, its write rate, its history, and its physical row
        count before it gets a schema.
      </p>

      <ArchFigure
        svg={THREE_PLANES}
        caption="Fig. 3 — One source, three planes. Current state is one row. Rollups are bounded rows with a lifetime. Raw high-rate samples are sealed chunks with a manifest row."
      />

      <p>For anything that pulses, the shape is three planes:</p>

      <ol>
        <li>
          <span className="bold white">Current state</span> &mdash; one keyed
          row per source, overwritten in place. A heartbeat, a lease, the last
          known status. It never grows, so it needs no lifetime.
        </li>
        <li>
          <span className="bold white">Rollups</span> &mdash; one bounded row
          per fixed period, keyed by source and time bucket, with a lifetime.
          This is where a low-rate series lives directly.
        </li>
        <li>
          <span className="bold white">Raw samples</span> &mdash; a high-rate
          series never gets one permanent row per pulse. It goes into compressed
          chunks in file storage, with a manifest row in LastDB that carries the
          chunk reference, count, checksum, and time bounds. The manifest
          carries the lifetime.
        </li>
      </ol>

      <p>
        We run LastDB on LastDB, so the first consumers were our own. The
        node&rsquo;s own health samples live in the database it serves and now
        expire after thirty days. Our fleet of scheduled agent jobs writes a
        summary of every run and a current status per job; those keep ninety
        days. None of that data needed a second system. All of it would have
        been a slow leak without a lifetime.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">What a lifetime is not</span>
        </h2>
        <p>
          A lifetime bounds the live history. It does not make a row cheaper
          while the row exists, and it does not return bytes the moment a row
          expires. If a series is too hot to store one row per sample, a
          lifetime does not fix that; a rollup or a chunk does. A lifetime is a
          design input, in the same sentence as the key layout. Name the fact,
          name the reads, state how long it lives and who owns that number, and
          estimate the rows. Then set the policy.
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />

      <p className="dim">
        Related:{" "}
        <Link to="/blog/thin-tips-and-honest-history">
          Thin Tips and Honest History
        </Link>
        {" · "}
        <Link to="/blog/last-store">Last Store</Link>
        {" · "}
        <Link to="/blog">Blog index</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
