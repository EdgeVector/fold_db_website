import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";

// Technical line drawings: ink for structure, muted for hatch and secondary
// labels, one accent for the publisher side. Colours come only from var(--token).
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
    <marker id="arrow-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--ink)"/>
    </marker>
    <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/>
    </marker>
  </defs>`;

const SVG_OPEN = (vb) =>
  `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;background:transparent;font-family:var(--mono)">${SVG_DEFS}`;

// Fig 1 — one publisher, two logs in Exemem, many receivers.
const TWO_LOGS = `${SVG_OPEN("0 0 660 380")}
  <!-- publisher node -->
  <rect x="20" y="40" width="150" height="220" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="95" y="66" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1.5">PUBLISHER</text>
  <text x="95" y="82" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1.5">NODE</text>
  <text x="95" y="132" text-anchor="middle" fill="var(--muted)" font-size="10">signed member</text>
  <text x="95" y="146" text-anchor="middle" fill="var(--muted)" font-size="10">entries</text>
  <text x="95" y="172" text-anchor="middle" fill="var(--muted)" font-size="10">write scopes</text>
  <text x="95" y="198" text-anchor="middle" fill="var(--muted)" font-size="10">record rules</text>
  <text x="95" y="236" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1">DECIDES</text>

  <!-- exemem -->
  <rect x="250" y="20" width="180" height="310" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="340" y="42" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="1.5">EXEMEM · CIPHERTEXT</text>

  <rect x="272" y="62" width="136" height="80" fill="url(#hatch)" stroke="var(--accent)" stroke-width="2"/>
  <rect x="284" y="84" width="112" height="36" fill="var(--surface)" stroke="var(--accent)" stroke-width="1"/>
  <text x="340" y="106" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1">PUBLISHER LOG</text>
  <text x="340" y="160" text-anchor="middle" fill="var(--muted)" font-size="10">publisher appends</text>
  <text x="340" y="174" text-anchor="middle" fill="var(--muted)" font-size="10">everyone reads</text>

  <rect x="272" y="196" width="136" height="80" fill="none" stroke="var(--ink)" stroke-width="1" stroke-dasharray="4 3"/>
  <rect x="284" y="218" width="112" height="36" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/>
  <text x="340" y="240" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1">SHADOW LOG</text>
  <text x="340" y="296" text-anchor="middle" fill="var(--muted)" font-size="10">receivers append</text>
  <text x="340" y="310" text-anchor="middle" fill="var(--muted)" font-size="10">only the publisher reads</text>
  <text x="340" y="324" text-anchor="middle" fill="var(--muted)" font-size="10">(the inbox, in the code)</text>

  <!-- receivers -->
  <rect x="510" y="40" width="130" height="220" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="575" y="66" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1.5">RECEIVER</text>
  <text x="575" y="82" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1.5">NODES</text>
  <text x="575" y="132" text-anchor="middle" fill="var(--muted)" font-size="10">read the</text>
  <text x="575" y="146" text-anchor="middle" fill="var(--muted)" font-size="10">whole database</text>
  <text x="575" y="196" text-anchor="middle" fill="var(--muted)" font-size="10">propose changes,</text>
  <text x="575" y="210" text-anchor="middle" fill="var(--muted)" font-size="10">never write</text>

  <!-- 3: publisher appends accepted changes -->
  <line x1="170" y1="102" x2="270" y2="102" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#arrow-accent)"/>
  <text x="220" y="94" text-anchor="middle" fill="var(--accent)" font-size="12">3</text>
  <!-- 4: receivers read the publisher log -->
  <line x1="410" y1="102" x2="508" y2="102" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#arrow-accent)"/>
  <text x="459" y="94" text-anchor="middle" fill="var(--accent)" font-size="12">4</text>
  <!-- 1: receivers propose -->
  <line x1="508" y1="236" x2="410" y2="236" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#arrow-ink)"/>
  <text x="459" y="228" text-anchor="middle" fill="var(--ink)" font-size="12">1</text>
  <!-- 2: publisher reads the shadow log and decides -->
  <line x1="270" y1="236" x2="172" y2="236" stroke="var(--ink)" stroke-width="1.5" marker-end="url(#arrow-ink)"/>
  <text x="221" y="228" text-anchor="middle" fill="var(--ink)" font-size="12">2</text>

  <text x="20" y="354" fill="var(--muted)" font-size="10">1 a receiver proposes, encrypted for the publisher · 2 the publisher reads and decides</text>
  <text x="20" y="370" fill="var(--muted)" font-size="10">3 the publisher appends accepted changes · 4 every receiver reads the publisher log</text>
</svg>`;

const LASTDB = "https://github.com/EdgeVector/lastdb";

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function BlogHowSharingWorks() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>How Sharing Works: A Log You Write and a Shadow Log They Write - LastDB</title>
        <meta
          name="description"
          content="How sharing works in LastDB. You write to a publisher log that everyone reads. Everyone else writes to a shadow log that only you read, and your own node decides which of their changes to apply. What the node checks, what the cloud can see, and what is still a limit."
        />
        <meta property="og:title" content="How Sharing Works: A Log You Write and a Shadow Log They Write" />
        <meta
          property="og:description"
          content="Receivers propose through a shadow log, and the publisher's node decides what to apply. The two logs, the checks, and the limits."
        />
        <link
          rel="canonical"
          href="https://thelastdb.com/blog/how-sharing-works"
        />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          &larr; Blog
        </Link>
      </p>

      <h1 className="tagline">How Sharing Works: A Log You Write and a Shadow Log They Write</h1>
      <p className="post-meta dim">2026-11-18</p>

      <p className="bold white">
        Recently, we took another look at how sharing could work in LastDB. As
        we&rsquo;ve been reworking multi-device sync, we realized that some of
        what we learned applies to sharing as well.
      </p>

      <p>
        In multi-device sync, there is one mutation log for all the devices to
        write to, and then a snapshot. The snapshot lets us reclaim space and
        avoid keeping deletes in the mutation log. The primary device produces
        the snapshot.
      </p>

      <p>
        We realized the same model can be applied to sharing. Say you want to
        share photos with other people. You publish a photo, and you
        don&rsquo;t necessarily want other people to change the photo, but you
        might allow them to comment on it. What you have is a mutation log that
        you write to, and a snapshot, and everyone else writes to a{" "}
        <span className="bold white">shadow log</span>.
      </p>

      <p>
        The shadow log lets you read the mutations that they want to apply.
        Your code, running locally, then decides which ones are appropriate,
        applies them to your database, and publishes them as the
        publisher&rsquo;s log. That way everyone can see them, or they can go
        into the snapshot when it&rsquo;s snapshotting time.
      </p>

      <p>
        This way you get to share your data and also restrict how other people
        can write to it.
      </p>

      <p>
        What we like about this approach is that it can scale up really well,
        because the code and the rules can be arbitrarily defined by the code
        that&rsquo;s running in your own node. You can make it as complex or as
        simple as you want.
      </p>

      <p>
        There&rsquo;s no cloud configuration. It&rsquo;s just your local app
        reading the shadow log and deciding what to apply to your database.
      </p>

      <p>
        The rest of this post is how that works in the code on main, and where it
        goes from here. One note on names: in the code the shadow log is called the inbox, and the log you
        publish is called the publisher log. This post says shadow log and
        publisher log. The People app, which sets up sharing for you, gets its
        own post.
      </p>

      <h2>The two logs in the code</h2>

      <p>
        A personal database has one log. A shared database has exactly two logs
        in Exemem, under the same database ID, and their positions are
        independent.
      </p>

      <ul>
        <li>
          <span className="bold white">The publisher log</span> is the
          database. Only the publisher appends to it, and it holds only the
          publisher&rsquo;s entries. Every active receiver reads it, and every
          receiver sees the same entries in the same order.
        </li>
        <li>
          <span className="bold white">The shadow log</span> is where
          receivers propose changes. Any active receiver can append to it. Only
          the publisher can read it.
        </li>
      </ul>

      <ArchFigure
        svg={TWO_LOGS}
        caption="Fig. 1 — One shared database. Receivers append proposals to the shadow log, and only the publisher reads them. Accepted changes go into the publisher log, which everyone reads."
      />

      <p>
        There is no mixed log. A receiver&rsquo;s proposal never lands in the
        publisher log. A contribution reaches readers only after the publisher
        commits it and appends that committed change to its own log. Someone
        who is not on the member list can do none of these things.
      </p>

      <p>
        A shared database has exactly one publisher. If two people want to
        share something with the same group, each creates and shares their own
        database, and a member&rsquo;s node holds both as separate received
        databases. A node can hold at most 32 received shares. LastDB itself
        has no idea what a group is. It knows a database and a list of node
        keys, and the People app decides which list of people is linked to
        which databases. Data is encrypted on the node before it leaves, and
        Exemem stores ciphertext.
      </p>

      <h2>What a receiver does when it writes</h2>

      <p>
        A received database is read only on the receiver&rsquo;s own node, and a
        normal write to it is refused. To change something, the receiver&rsquo;s
        app posts a proposal to its local node. The node answers that the
        proposal was submitted and writes nothing to the receiver&rsquo;s
        database. It encrypts the proposal for the publisher, signs the request
        with its node key, and appends it to the shadow log. Exemem checks that
        the sender is an active member and stores the encrypted proposal. It
        cannot read it. The operation in a proposal is at most 96 KiB, and a
        receiver cannot propose a purge or a file attachment.
      </p>

      <p>
        The receiver&rsquo;s app can ask for the status of its own proposal and
        show it as pending. The publisher supplies the outcome, published or
        discarded, when it finishes with the proposal. A receiver sees only the
        outcome of its own proposals.
      </p>

      <h2>What the publisher&rsquo;s node decides</h2>

      <p>
        The publisher&rsquo;s node downloads the shadow log, decrypts each
        proposal, and decides. The decision itself is a pure function of the
        sender&rsquo;s grant, the proposal, and the current local version of the
        record. For each proposal the node:
      </p>

      <ol>
        <li>
          Reads the sender&rsquo;s signed member entry and requires it to be
          active, with the contributor role and a write scope. A
          reader&rsquo;s proposal, a revoked member&rsquo;s proposal, and a
          proposal from a key with no entry are discarded.
        </li>
        <li>
          Checks that the schema the proposal writes is inside that
          member&rsquo;s write scope. A scope is a list of schema names, a list
          of exact schema definitions, or all schemas. The definition named in
          the proposal must match the definition installed in the database.
        </li>
        <li>Applies the record rules, described below.</li>
        <li>
          Commits the change to its own copy of the database, then appends it to
          the publisher log under the publisher&rsquo;s key, then marks the
          shadow log entry processed. A change that fails any check is
          discarded and never reaches the publisher log.
        </li>
      </ol>

      <p>
        An accepted change is then an ordinary entry in the publisher log, and
        every receiver gets it when it syncs, including the one that proposed
        it. Because the check is on the publisher&rsquo;s node, the
        receiver&rsquo;s app does not enforce anything. Apps read the grants to
        decide what to offer, and a modified copy of an app that sends a write
        it was not granted gets it discarded.
      </p>

      <p>
        The decision is made by code on the publisher&rsquo;s node, not in the
        cloud. Today the node ships with a schema write scope for each person and
        a built-in rule for comments, described next. Those are the first rules,
        not the limit of the design.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">Example: comments on shared photos</span>
        </h2>
        <p>
          Say the publisher shares an album. Each photo is a record in a Photo
          schema, and each comment is a record in the standard{" "}
          <code>social/Comment</code> schema. A friend&rsquo;s grant names only{" "}
          <code>social/Comment</code> as writable.
        </p>
        <ul>
          <li>
            The friend proposes a new comment. It is inside the scope, and
            anyone with a comment grant may create one. It is accepted. The
            node fills in the comment&rsquo;s author from the verified sender,
            so the sender cannot choose it.
          </li>
          <li>
            The friend proposes a change to the photo. Photo is not in the
            scope, so it is discarded.
          </li>
          <li>
            The friend proposes to edit their own comment, naming the version
            they are editing. The node keeps the original creator of each
            comment in a small file beside the download journal, not in the
            record, and it matches the sender. It is accepted. An edit that
            does not name a version is discarded.
          </li>
          <li>
            A second friend proposes to overwrite the first
            friend&rsquo;s comment. The creator does not match, so it is
            discarded. Deletes of comments from receivers are not accepted
            either.
          </li>
          <li>
            The publisher can edit or delete any comment, because the publisher
            writes to its own database directly.
          </li>
        </ul>
      </Section>

      <p>
        The rule that you can only replace your own comment is the first
        built-in record rule, and today it covers the one standard schema,{" "}
        <code>social/Comment</code>. For every other schema, the control that
        ships today is the write scope: whether a member may write that schema
        at all. A conditional replace of an existing record is also discarded if
        the record has changed since the receiver last saw it. On any create,
        LastDB records the verified sender as the author. Richer rules, such as
        ones an app writes for its own schemas, are the direction this goes, and
        they are not shipped yet.
      </p>

      <h2>The member list is one signed entry per member</h2>

      <p>
        The publisher signs one small entry for each member: the database, the
        member&rsquo;s node key, a role (read or submit), a state (active or
        revoked), the schemas the member may write, a sequence number for that
        member, the publisher&rsquo;s key, the time, and the signature. Exemem
        verifies the signature and stores the entry as that member&rsquo;s own
        row. A new entry for a member is accepted only as the next sequence
        number for that member. A request from a member is checked against that
        one row, which is a single read however many members the database has,
        and the publisher&rsquo;s node also reads one entry when it checks a
        proposal.
      </p>

      <p>
        This replaced a single signed document that listed every member. That
        document was one stored item and one request body, it capped a database
        at about 1,500 members, and every change re-sent all of it. The target
        for the entry design is 10,000 members per database. We have not
        published a load test for that number.
      </p>

      <ul>
        <li>
          A revoked member keeps its row with the state set to revoked. A
          revoked key comes back only when the publisher explicitly regrants it.
          The publisher&rsquo;s node enforces that rule before it signs.
        </li>
        <li>
          A row with no signed entry gives no access. Shared databases made
          before this change were not converted: the publisher adds each member
          again once.
        </li>
        <li>
          Entries are signed, not encrypted. Exemem can see which node keys are
          in a database, their roles, and the schema names they may write. It
          cannot read records or proposals. The cloud holds who is a member. It does
          not decide which changes are applied.
        </li>
      </ul>

      <Section variant="rose">
        <h2>
          <span className="bold">What is not done</span>
        </h2>
        <ul>
          <li>
            Revoking a member stops new reads and new proposals. It does not
            take back records the member already downloaded, and keys are not
            rotated in this version.
          </li>
          <li>
            The publisher&rsquo;s node has to be running for proposals to be
            decided. While it is off, proposals wait in the shadow log and no
            proposed change is published.
          </li>
          <li>
            A whole-database share has one active publisher device. If a second
            device with the same publisher key publishes, the first reports
            that it cannot continue shared sync. Replicas and a handoff between
            devices need a design we have not shipped.
          </li>
          <li>
            Rules beyond the schema scope and the comment rule are not built
            yet. Today there is no per-record ownership rule for schemas other
            than the standard comment schema.
          </li>
          <li>
            A node can publish a snapshot of a shared database, and receivers
            can install one. The automatic log cutoff that reclaims space after
            a snapshot is only wired up for personal databases so far.
          </li>
          <li>
            The People app, which turns circles of people into these databases
            and grants, is not finished. It gets its own post.
          </li>
        </ul>
      </Section>

      <h2>Where this stands</h2>

      <p>
        The per-member entries are merged on main in lastdb (
        <Ext href={`${LASTDB}/pull/1749`}>#1749</Ext> and{" "}
        <Ext href={`${LASTDB}/pull/1751`}>#1751</Ext>) and in the Exemem
        service, and the service change was deployed to DEV and PROD after it
        merged. The two-log shape, with no mixed-log path, is merged as lastdb{" "}
        <Ext href={`${LASTDB}/pull/1768`}>#1768</Ext>. The design is written up
        in the lastdb repository at{" "}
        <Ext
          href={`${LASTDB}/blob/main/docs/designs/shared-database-mutation-logs.md`}
        >
          <code>docs/designs/shared-database-mutation-logs.md</code>
        </Ext>
        .
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <p className="dim">
        Related:{" "}
        <Link to="/blog/we-deleted-the-molecules">We Deleted the Molecules</Link>
        {" · "}
        <Link to="/blog/the-lastdb-app-registry">The LastDB App Registry</Link>
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
