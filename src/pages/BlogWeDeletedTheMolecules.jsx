import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";

// Technical line drawings: ink for structure, muted for hatch and secondary
// labels, one accent for the new shape. Colours come only from var(--token).
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
            color: "var(--muted)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            marginTop: "12px",
            textTransform: "uppercase",
            fontFamily: "var(--mono)",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const SVG_DEFS = `
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" stroke-width="1"/>
    </pattern>
  </defs>`;

const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;background:transparent;font-family:var(--mono)">${SVG_DEFS}`;

// Fig 1 — the keys behind one record, before and after.
const KEYS_PER_RECORD = `${SVG_OPEN("0 0 660 270")}
  <text x="36" y="28" fill="var(--muted)" font-size="11" letter-spacing="1.5">BEFORE · FORMATS 4–6</text>
  <text x="372" y="28" fill="var(--accent)" font-size="11" letter-spacing="1.5">AFTER · FORMAT 7</text>

  <!-- before: tips, one per field -->
  <rect x="40"  y="56" width="26" height="26" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <rect x="74"  y="56" width="26" height="26" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <rect x="108" y="56" width="26" height="26" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <rect x="142" y="56" width="26" height="26" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="184" y="74" fill="var(--ink)" font-size="11">4 TIPS</text>
  <text x="184" y="90" fill="var(--muted)" font-size="10">one per field</text>

  <!-- before: atoms, hatched = stored values -->
  <rect x="40"  y="112" width="26" height="26" fill="url(#hatch)" stroke="var(--ink)" stroke-width="1"/>
  <rect x="74"  y="112" width="26" height="26" fill="url(#hatch)" stroke="var(--ink)" stroke-width="1"/>
  <rect x="108" y="112" width="26" height="26" fill="url(#hatch)" stroke="var(--ink)" stroke-width="1"/>
  <text x="184" y="130" fill="var(--ink)" font-size="11">3 ATOMS</text>
  <text x="184" y="146" fill="var(--muted)" font-size="10">immutable values</text>

  <!-- before: counters -->
  <rect x="40"  y="168" width="26" height="26" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="74"  y="168" width="26" height="26" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 2"/>
  <rect x="108" y="168" width="26" height="26" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="184" y="186" fill="var(--ink)" font-size="11">3 COUNTERS</text>
  <text x="184" y="202" fill="var(--muted)" font-size="10">one per atom</text>

  <text x="40" y="244" fill="var(--ink)" font-size="12" letter-spacing="1.5">10 KEYS PER RECORD</text>

  <!-- divider -->
  <line x1="336" y1="40" x2="336" y2="254" stroke="var(--line)" stroke-width="1" stroke-dasharray="2 4"/>

  <!-- after: one record -->
  <rect x="376" y="84" width="150" height="86" fill="url(#hatch)" stroke="var(--accent)" stroke-width="2"/>
  <rect x="396" y="108" width="110" height="38" fill="var(--surface)" stroke="var(--accent)" stroke-width="1"/>
  <text x="451" y="132" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1.5">RECORD</text>
  <text x="376" y="196" fill="var(--muted)" font-size="10">every field in one value</text>

  <text x="376" y="244" fill="var(--accent)" font-size="12" letter-spacing="1.5">1 KEY PER RECORD</text>
</svg>`;

// Fig 2 — p95 latency, format 6 vs format 7, drawn to scale within each row.
const P95_BARS = `${SVG_OPEN("0 0 660 276")}
  <text x="36" y="26" fill="var(--muted)" font-size="10" letter-spacing="1.5">P95 LATENCY · FORMAT 6 (HATCH) VS FORMAT 7 (OUTLINE)</text>

  <text x="36" y="56" fill="var(--muted)" font-size="10" letter-spacing="1.5">COLD-READ/32</text>
  <rect x="36" y="64" width="400" height="14" fill="url(#hatch)" stroke="var(--muted)" stroke-width="1"/>
  <text x="444" y="75" fill="var(--muted)" font-size="10">17.99 ms</text>
  <rect x="36" y="84" width="54.3" height="14" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="98" y="95" fill="var(--accent)" font-size="10">2.44 ms</text>

  <text x="36" y="124" fill="var(--muted)" font-size="10" letter-spacing="1.5">INSERT/128</text>
  <rect x="36" y="132" width="400" height="14" fill="url(#hatch)" stroke="var(--muted)" stroke-width="1"/>
  <text x="444" y="143" fill="var(--muted)" font-size="10">98.99 ms</text>
  <rect x="36" y="152" width="119.2" height="14" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="163" y="163" fill="var(--accent)" font-size="10">29.51 ms</text>

  <text x="36" y="192" fill="var(--muted)" font-size="10" letter-spacing="1.5">UPDATE/128</text>
  <rect x="36" y="200" width="400" height="14" fill="url(#hatch)" stroke="var(--muted)" stroke-width="1"/>
  <text x="444" y="211" fill="var(--muted)" font-size="10">112.34 ms</text>
  <rect x="36" y="220" width="112.2" height="14" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="156" y="231" fill="var(--accent)" font-size="10">31.50 ms</text>

  <text x="36" y="256" fill="var(--muted)" font-size="10" letter-spacing="1.5">CONCURRENT-READ/32 · FLAT</text>
  <text x="444" y="256" fill="var(--muted)" font-size="10">13.42 → 13.23 ms</text>
</svg>`;

const CI_SWITCH = "https://github.com/EdgeVector/lastdb/actions/runs/41254200450";
const CI_TODAY = "https://github.com/EdgeVector/lastdb/actions/runs/44196800207";
const CI_TODAY_2 = "https://github.com/EdgeVector/lastdb/actions/runs/44183519720";
const CI_TODAY_3 = "https://github.com/EdgeVector/lastdb/actions/runs/44161789187";
const CI_NIGHTLY = "https://github.com/EdgeVector/lastdb/actions/runs/44056084661";

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function BlogWeDeletedTheMolecules() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>We Deleted the Molecules - LastDB</title>
        <meta
          name="description"
          content="LastDB used to store one record as about ten keys: atoms, counters, and per-field tips. Now a record is one key. On the same generated workload the database came out about 40% smaller at the switch, and p95 latency on cold batch reads and batch writes fell by 70% or more. The numbers, the sources, and what we gave up."
        />
        <meta property="og:title" content="We Deleted the Molecules" />
        <meta
          property="og:description"
          content="One record, one key. What replacing atoms and molecules with whole records did to LastDB's size and latency, with the CI runs and the caveats."
        />
        <link
          rel="canonical"
          href="https://thelastdb.com/blog/we-deleted-the-molecules"
        />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          &larr; Blog
        </Link>
      </p>

      <h1 className="tagline">We Deleted the Molecules</h1>
      <p className="post-meta dim">2026-11-17</p>

      <p className="bold white">
        Until the end of October, LastDB stored one record as about ten keys: an
        atom for each field value, a counter for each atom, and a tip for each
        field. On October 31 we made a record one key with one value, and
        within a day the old machinery was removed. On the same generated
        workload the database came out about 40% smaller at the switch, and p95
        latency on cold batch reads and batch writes fell by 70% or more in our
        local comparison. This post is the before and after, with the CI runs behind every
        number and a list of what does not match.
      </p>

      <h2>The old shape</h2>

      <p>
        LastDB&rsquo;s first storage model was built for history. A field&rsquo;s
        value was an <span className="bold white">atom</span>: immutable,
        content-addressed, never edited in place. A{" "}
        <span className="bold white">molecule</span> was the index of one
        field. Its entries, the tips, said which atom was current for which
        key. A row was never stored as a row. It was assembled at read time from
        the current atom of each of its fields.
      </p>

      <p>
        That model is what the July posts describe. In{" "}
        <Link to="/blog/thin-tips-and-honest-history">
          Thin Tips and Honest History
        </Link>{" "}
        we wrote about the per-field tip and its version chain.{" "}
        <Link to="/blog/last-store">Last Store</Link> counted what a node has to
        hold: tips, atoms, indexes, sync planes. Those posts are accurate for
        the formats they describe, formats 4 to 6. The current code no longer
        contains that layout.
      </p>

      <h2>What it cost</h2>

      <p>
        We counted keys on a generated benchmark home: 10,000 records, four
        fields each. The node&rsquo;s own inventory reported{" "}
        <span className="bold white">100,015 keys</span> in the main store:
        30,001 atom values, 40,000 per-key molecule entries (the tips), and
        30,001 atom counters. That is three atoms, four tips, and three counters
        for each record. The node&rsquo;s schema report on a format 7 home of
        the same records says 10,000 records and no atoms.
      </p>

      <ArchFigure
        svg={KEYS_PER_RECORD}
        caption="Fig. 1 — The keys behind one four-field record, counted from the node's inventory on a generated home. The count is for this benchmark record; a record with other fields has its own count."
      />

      <p>
        Ten keys is not just ten writes. Counters decided when an atom, a
        molecule or a file could leave the store, so there was a drain that
        removed dead molecules and a planner for the atom counters. A read had
        to find the tip, then the atom, for each field, then assemble the row.
        The cost showed up in the
        places we kept tuning.{" "}
        <Link to="/blog/checking-every-shelf">Checking Every Shelf</Link> was
        mostly about making molecule-wide walks cheaper. This change makes the
        thing being walked smaller.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">The change</span>
        </h2>
        <p>
          A record is one key and one value. All of its fields are in the value,
          under one key per primary key. A write replaces the value. A read
          fetches it. At the switch, peer sync merged a record field by field, so
          two devices that changed different fields of the same record could
          still agree.
        </p>
        <p>
          The in-memory graph from{" "}
          <Link to="/blog/memory-first-disk-later">Memory First, Disk Later</Link>{" "}
          also changed shape. Its unit used to be an atom per field; now it is
          the record, and a warm entry means one record key whatever the fields.
        </p>
      </Section>

      <p>
        The work landed as a numbered series of pull requests, from the new key
        space to the removal of the old code. The record key space and the new
        home format merged on October 31 (
        <Ext href="https://github.com/EdgeVector/lastdb/pull/911">#911</Ext>).
        The same day, every new home became format 7 (
        <Ext href="https://github.com/EdgeVector/lastdb/pull/929">#929</Ext>).
        Over October 31 and November 1 the molecule drain, the counters, the
        atom readers and the atom and molecule types were removed, finishing
        with a sweep of leftovers (
        <Ext href="https://github.com/EdgeVector/lastdb/pull/989">#989</Ext>).
        There is no migration. A new home is format 7, and an older home moves
        by one copy of its records through the program that wrote it.
      </p>

      <h2>What it did to size</h2>

      <p>
        Our CI has a growth lane that seeds 512 records, runs three rounds of
        updates, then inserts up to 2,048 records, and reports the compacted
        database size per live record. A single CI run,{" "}
        <Ext href={CI_SWITCH}>run 41254200450</Ext>, measured format 6 against
        format 7 on the same lane. The baseline is{" "}
        <code>6d5362f3</code>, the last commit that still created format 6
        homes; the candidate is the pull request that made the benchmark
        accept a format 7 home.
      </p>

      <ul>
        <li>
          <span className="bold white">Read-only seed, 512 records:</span>{" "}
          1,132 bytes per record &rarr; 673 (&minus;40.5%).
        </li>
        <li>
          <span className="bold white">After three update rounds:</span> 1,374
          &rarr; 913 (&minus;33.6%).
        </li>
        <li>
          <span className="bold white">Insert, 2,048 records:</span> 1,188
          &rarr; 793 (&minus;33.3%).
        </li>
      </ul>

      <p>
        We repeated the comparison locally on a probe that writes the same
        generated records in batches of 128, updates all of them, and measures
        the database after a clean flush. At 10,000 records the database went
        from 11.19 MiB to 6.68 MiB (&minus;40.3%). At 50,000 records it went
        from 55.73 MiB to 32.17 MiB (&minus;42.3%). That is 1,174 bytes per
        record down to 701, and 1,169 down to 675. The two sources agree on the
        range, about a third to two fifths.
      </p>

      <h2>Where the size ended up</h2>

      <p>
        The format number has moved a long way since format 7. The benchmark
        homes are format 15 today. On the same growth lane, the latest CI run on
        main (<Ext href={CI_TODAY}>run 44196800207</Ext>) reports{" "}
        <span className="bold white">612, 620 and 608 bytes</span> per live
        record for the same three cases, against format 6&rsquo;s 1,132, 1,374
        and 1,188. The nightly run (
        <Ext href={CI_NIGHTLY}>run 44056084661</Ext>) reports 608 bytes per live
        record at 18,432 live records. Against format 6, that is 46% to 55%
        fewer bytes per record.
      </p>

      <p>
        We do not credit all of that to the October 31 switch. The switch
        itself took about a third to two fifths off. The rest comes from later
        format changes and other work, and we have not separated them.
      </p>

      <h2>What it did to latency</h2>

      <p>
        For latency we ran the project&rsquo;s own benchmark harness on a format
        6 build and a format 7 build, five alternating pairs, 10,000 records,
        256 samples per case. These are p95 medians across the five pairs, in
        milliseconds, format 6 to format 7:
      </p>

      <ArchFigure
        svg={P95_BARS}
        caption="Fig. 2 — p95 latency, drawn to scale within each row. Reads that are already warm and concurrent did not move."
      />

      <ul>
        <li>
          <span className="bold white">Cold batch read (32 records):</span>{" "}
          17.99 &rarr; 2.44. Throughput on that case went from 64.7 to 455.2
          requests per second.
        </li>
        <li>
          <span className="bold white">Batch insert (128 records):</span> 98.99
          &rarr; 29.51.
        </li>
        <li>
          <span className="bold white">Batch update (128 records):</span>{" "}
          112.34 &rarr; 31.50.
        </li>
        <li>
          <span className="bold white">Single insert and single update:</span>{" "}
          6.59 &rarr; 4.14 and 7.28 &rarr; 4.40.
        </li>
        <li>
          <span className="bold white">Sixteen concurrent writers:</span> 67.89
          &rarr; 23.17.
        </li>
        <li>
          <span className="bold white">Concurrent reads:</span> about flat.
          Sixteen readers went from 7.18 to 6.81 and thirty-two from 13.42 to
          13.23.
        </li>
      </ul>

      <p>
        The CI run above saw the same direction with a wider and noisier gap:
        cold batch read 14.52 &rarr; 1.60, batch insert 193.53 &rarr; 90.28, and
        batch update 283.75 &rarr; 67.98, from two pairs on a hosted runner.
        Warm concurrent reads did not get faster, and we are not going to say
        they did. The win is in writes and in the first read of a record, which
        is where assembling a row from atoms used to cost.
      </p>

      <h2>Where it ended up</h2>

      <p>
        The same harness runs on every push to main. On three runs from
        November 17 (
        <Ext href={CI_TODAY}>44196800207</Ext>,{" "}
        <Ext href={CI_TODAY_2}>44183519720</Ext> and{" "}
        <Ext href={CI_TODAY_3}>44161789187</Ext>), p95 sits at:
      </p>

      <ul>
        <li>
          <span className="bold white">Cold batch read (32):</span> about 1.5
          ms (1.47 in the latest run, 1.47 to 1.69 across the three).
        </li>
        <li>
          <span className="bold white">Batch insert (128):</span> about 12 to 17
          ms (14.73 in the latest run).
        </li>
        <li>
          <span className="bold white">Batch update (128):</span> about 16 ms
          in the latest run, with one of the three runs at 22.25.
        </li>
      </ul>

      <p>
        As with size, this is not the switch alone. It is the switch plus what
        built on it.<sup>1</sup>
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">What we gave up</span>
        </h2>
        <ul>
          <li>
            <span className="bold white">A smaller value limit.</span> An atom
            could carry up to 256 KiB by default. A record is capped at 64 KiB.
            An over-cap write is refused with a typed error, not truncated.
          </li>
          <li>
            <span className="bold white">Aggregates.</span> We removed the
            aggregate write side with the molecules rather than port it.
          </li>
          <li>
            <span className="bold white">In-place upgrade.</span> There is no
            migration of an older home. Moving one is a copy.
          </li>
        </ul>
      </Section>

      <h2>How we measured, and what does not match</h2>

      <ul>
        <li>
          <span className="bold white">Dev-release builds.</span> Every build in
          this post, ours and CI&rsquo;s, uses the <code>dev-release</code>{" "}
          profile. These are not tuned release binaries.
        </li>
        <li>
          <span className="bold white">Two machines.</span> The local
          comparison ran on a shared eight-vCPU box, five alternating pairs,
          medians. CI runs on hosted runners with two pairs. Use the ratios.
          The absolute times are not portable between the two, and we have not
          compared them.
        </li>
        <li>
          <span className="bold white">The before is a commit, not a flag.</span>{" "}
          The format 6 baseline <code>6d5362f3</code> already contains the first
          record code, but still creates format 6 homes. The record build is the
          first commit where every new home is format 7.
        </li>
        <li>
          <span className="bold white">The workload moved after October 31.</span>{" "}
          The benchmark has since added a spread seed and cold-read cases over
          it, writes whole records, and reads each stored record back. A read
          change that shares opened run readers landed on November 16. So
          today&rsquo;s cold-read time is not attributable to the record switch
          alone, and we compare today&rsquo;s figures to format 6 only for size,
          with that caveat.
        </li>
        <li>
          <span className="bold white">Synthetic data.</span> The workload is
          generated records with a 512-byte hex body. It is not production data.
          We have no production numbers for this change and are not claiming
          any.
        </li>
        <li>
          <span className="bold white">Noisy cells are left out.</span>{" "}
          Concurrent writes at 32 clients flipped between runs, including one
          where the new build looked slower, so we do not quote that case in
          either direction. The concurrent-write numbers above are for 16
          writers and fewer, from the five-pair run.
        </li>
      </ul>

      <p className="dim">
        <sup>1</sup> The &ldquo;where it ended up&rdquo; figures are from CI
        runs on main on 2026-11-17, before lastdb{" "}
        <Ext href="https://github.com/EdgeVector/lastdb/pull/1757">#1757</Ext>{" "}
        merged at 4:00 PM Pacific the same day. That change moved the benchmark
        scripts onto <code>/v1/read</code> and <code>/v1/write</code>, and its
        own description says measurements before and after it are not
        comparable. The figures in this post are all from before it. The
        format 6 and format 7 comparison, which is the heart of the post, is
        unaffected, because both sides ran the old scripts.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <p className="dim">
        Related:{" "}
        <Link to="/blog/thin-tips-and-honest-history">
          Thin Tips and Honest History
        </Link>
        {" · "}
        <Link to="/blog/last-store">Last Store</Link>
        {" · "}
        <Link to="/blog/checking-every-shelf">Checking Every Shelf</Link>
        {" · "}
        <Link to="/blog/memory-first-disk-later">Memory First, Disk Later</Link>
        {" · "}
        <Link to="/blog">Blog index</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          &larr; Blog
        </Link>
      </p>
    </article>
  );
}
