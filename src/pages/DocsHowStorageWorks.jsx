import { Link } from 'react-router-dom';
import ArchFigure from '../components/ArchFigure';
import StorageSimulator from '../components/StorageSimulator';
import { DocsHeader, RelatedDocs } from './Docs';

// One LastDB install folder. Hand-authored; colours and type from site.css.
const INSTALL_FIGURE = `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;display:block;margin:0 auto;font-family:var(--mono)">
  <defs>
    <pattern id="storage-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect x="24" y="20" width="672" height="372" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
  <text x="40" y="44" fill="var(--ink)" font-size="12" letter-spacing="1">LASTDB FOLDER · ONE PER INSTALLATION</text>

  <rect x="40" y="60" width="200" height="48" fill="url(#storage-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <text x="140" y="82" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">identity.key</text>
  <text x="140" y="98" text-anchor="middle" fill="var(--muted)" font-size="9">seed · never leaves device</text>

  <rect x="256" y="60" width="200" height="48" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="356" y="82" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">cloud-credentials</text>
  <text x="356" y="98" text-anchor="middle" fill="var(--muted)" font-size="9">relay connection</text>

  <rect x="472" y="60" width="200" height="48" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="572" y="82" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">ops-history/</text>
  <text x="572" y="98" text-anchor="middle" fill="var(--muted)" font-size="9">local request log</text>

  <rect x="40" y="128" width="310" height="152" fill="none" stroke="var(--accent)" stroke-width="1.2"/>
  <text x="56" y="150" fill="var(--accent)" font-size="11" letter-spacing="1">data/ · PERSONAL DATABASE</text>
  <rect x="56" y="164" width="130" height="96" fill="url(#storage-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <text x="121" y="198" text-anchor="middle" fill="var(--ink)" font-size="11">disk-run/</text>
  <text x="121" y="216" text-anchor="middle" fill="var(--muted)" font-size="9">records store</text>
  <text x="121" y="232" text-anchor="middle" fill="var(--muted)" font-size="9">logged</text>
  <rect x="204" y="164" width="130" height="96" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="269" y="198" text-anchor="middle" fill="var(--ink)" font-size="11">disk-cas/</text>
  <text x="269" y="216" text-anchor="middle" fill="var(--muted)" font-size="9">file blob store</text>
  <text x="269" y="232" text-anchor="middle" fill="var(--muted)" font-size="9">unlogged</text>

  <rect x="370" y="128" width="302" height="72" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="386" y="150" fill="var(--ink)" font-size="11" letter-spacing="1">databases/</text>
  <text x="386" y="172" fill="var(--muted)" font-size="10">registry.json · &lt;id&gt;/data/ siblings</text>
  <text x="386" y="190" fill="var(--muted)" font-size="10">same records + file stores</text>

  <rect x="370" y="212" width="302" height="68" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="386" y="234" fill="var(--ink)" font-size="11" letter-spacing="1">received-shares-v1/</text>
  <text x="386" y="256" fill="var(--muted)" font-size="10">&lt;id&gt;/ received share registrations</text>

  <rect x="40" y="300" width="632" height="72" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="56" y="324" fill="var(--ink)" font-size="11" letter-spacing="1">log-sync/&lt;database id&gt;/ · PER-DEVICE SYNC BOOKKEEPING</text>
  <text x="56" y="346" fill="var(--muted)" font-size="10">birth · snapshot-* · reclaim-* · incoming/ · authored/uploaded/received/proposals</text>
  <text x="56" y="364" fill="var(--muted)" font-size="10">Data from every device merges into the same store. Only this bookkeeping (and cloud logs) is per device.</text>
</svg>`;

const RECORDS_FIGURE = `<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;font-family:var(--mono)">
  <defs>
    <pattern id="storage-run-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect x="30" y="24" width="600" height="200" fill="none" stroke="var(--ink)" stroke-width="1.2"/>
  <text x="46" y="48" fill="var(--ink)" font-size="11" letter-spacing="1">RECORDS STORE · disk-run/</text>

  <rect x="46" y="64" width="170" height="56" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="131" y="88" text-anchor="middle" fill="var(--ink)" font-size="11">descriptor</text>
  <text x="131" y="106" text-anchor="middle" fill="var(--muted)" font-size="9">laststore-run-home-v2</text>

  <rect x="232" y="64" width="120" height="56" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="292" y="88" text-anchor="middle" fill="var(--ink)" font-size="11">CURRENT</text>
  <text x="292" y="106" text-anchor="middle" fill="var(--accent)" font-size="9">live run list</text>

  <rect x="368" y="64" width="240" height="56" fill="url(#storage-run-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <text x="488" y="88" text-anchor="middle" fill="var(--ink)" font-size="11">runs/*.ldrun</text>
  <text x="488" y="106" text-anchor="middle" fill="var(--muted)" font-size="9">immutable sorted runs</text>

  <rect x="46" y="136" width="200" height="64" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="146" y="162" text-anchor="middle" fill="var(--ink)" font-size="11">commit-log/</text>
  <text x="146" y="180" text-anchor="middle" fill="var(--muted)" font-size="9">16 MiB files · then seal</text>

  <rect x="262" y="136" width="120" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="322" y="162" text-anchor="middle" fill="var(--ink)" font-size="11">LOCK</text>
  <text x="322" y="180" text-anchor="middle" fill="var(--muted)" font-size="9">one writer</text>

  <rect x="398" y="136" width="210" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="503" y="162" text-anchor="middle" fill="var(--ink)" font-size="11">accepted-files/</text>
  <text x="503" y="180" text-anchor="middle" fill="var(--muted)" font-size="9">not in a snapshot</text>

  <text x="330" y="252" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="0.4">PLUS local-file-refs.json · app-grants.json BESIDE THE TWO STORES</text>
</svg>`;

export default function DocsHowStorageWorks() {
  return (
    <>
      <DocsHeader
        title="How storage works"
        path="/docs/how-storage-works"
        heading={<>How LastDB lays out <em>one install</em> on disk.</>}
        lede="One folder per installation. Databases inside it. Each database is a records store plus a file blob store. This page explains the picture, why it looks like that, how writes and sync move through it, and lets you poke a scaled simulator."
        description="How LastDB storage works: one install folder, records store and file store, LSM seals and merges, cloud logs, snapshots, and an interactive simulator."
        reviewed="Last reviewed 27 November 2026 against lastdb docs/home-format.md and vendor/laststore (seal, commit_log, compaction, writer)."
      />

      <section className="fg-section" id="picture">
        <div className="fg-rail">
          01 &middot; The picture
          <p>One folder. Databases inside. Two stores each.</p>
        </div>
        <div className="fg-body">
          <h2>One install folder holds every database.</h2>
          <p className="fg-lede">
            LastDB is not “one folder per device identity in the cloud.” On a machine you get one
            installation folder. Inside it: the node seed, relay credentials, your personal database,
            any sibling databases you own, shares you received, and per-database sync bookkeeping.
          </p>
          <div role="img" aria-label="LastDB install folder with identity, databases, personal data stores, and log-sync.">
            <ArchFigure svg={INSTALL_FIGURE} caption="Fig. 1 — One LastDB folder per installation" />
          </div>
          <div className="fg-two">
            <p>
              <strong>identity.key</strong> is the 32-byte node seed. It never leaves the device. The
              recovery phrase encodes it. Owned database identities and keys derive from it.
              Received shares use the read key supplied by their publisher.
            </p>
            <p>
              <strong>data/</strong> is the personal database. Owned siblings live under{' '}
              <code>databases/&lt;id&gt;/data/</code>. Received shares live under{' '}
              <code>received-shares-v1/&lt;id&gt;/</code>. The registry lists owned databases.
            </p>
          </div>
          <p className="fg-lede fg-lede-follow">
            Each database has two stores: a <strong>records store</strong> (<code>disk-run/</code>,
            opened logged) and a <strong>file blob store</strong> (<code>disk-cas/</code>, unlogged,
            content-addressed on the relay by SHA-256 of stored bytes). Small sidecars sit beside
            them: <code>local-file-refs.json</code>, <code>app-grants.json</code>.
          </p>
          <div role="img" aria-label="Records store contents: descriptor, CURRENT, runs, commit-log, LOCK, accepted-files.">
            <ArchFigure svg={RECORDS_FIGURE} caption="Fig. 2 — Records store (disk-run/)" />
          </div>
          <p className="fg-note">
            One rule about sync: <strong>store rows travel in a snapshot; side files do not.</strong>{' '}
            Before a snapshot, <code>commit-log/</code> is sealed into runs and <code>CURRENT</code>.
            The snapshot waits until every spool entry is acknowledged. <code>accepted-files/</code>{' '}
            never enters the snapshot; LastDB retires each file after its spool entry is acknowledged.
            {' '}<code>log-sync/</code> also stays outside.
          </p>
        </div>
      </section>

      <section className="fg-section" id="why">
        <div className="fg-rail">
          02 &middot; Why this layout
          <p>What it is optimized for.</p>
        </div>
        <div className="fg-body">
          <h2>Built for fast local writes and cheap, verifiable sync.</h2>
          <p className="fg-lede">
            The layout is an LSM-style records engine plus per-device signed cloud logs that merge into
            one store. Terms below are defined once.
          </p>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>Fast local writes</h3>
                <p>
                  A write appends an encrypted frame to the <strong>commit log</strong> (16&nbsp;MiB
                  files) and is readable immediately. Later a <strong>seal</strong> freezes logged
                  commits into a sorted immutable <strong>run</strong> (<code>.ldrun</code>) and
                  publishes it via <code>CURRENT</code>. Seal threshold = run bytes / 4, clamped
                  64&nbsp;KiB–8&nbsp;MiB. The memory-layer seal threshold counts 256&nbsp;MiB of
                  encoded log bytes, not total process memory. Blocks are 16&nbsp;KiB.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>Cheap snapshots and backups</h3>
                <p>
                  Runs are immutable, so a <strong>snapshot</strong> is “upload the files the relay
                  does not already hold, plus a signed entry naming stream heads.” Afterward the
                  publisher asks the relay to drop covered cloud-log entries and older snapshots.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3>Untrusted, replaceable relay</h3>
                <p>
                  Each device appends sealed, signed entries to its own hash chain — the{' '}
                  <strong>cloud log</strong> (the spool / outbox). Entries are sealed once with the
                  database key at rest and uploaded as-is. The relay is untrusted storage: one
                  snapshot plus the cloud-log entries after it. Every device verifies and merges
                  deterministically.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">04</span>
              <div>
                <h3>Deletes that reclaim space</h3>
                <p>
                  Deletes write <strong>tombstones</strong>. Cleanup first seals any unsealed
                  commits. Eight runs fold into one (
                  <code>MERGE_WIDTH</code> 8, up to 64 inputs). The base splits into ~64 pieces
                  (256&nbsp;KiB–1&nbsp;GiB, target bytes/64). A base fold runs when the tier above
                  exceeds 1/16 of total and &gt;1&nbsp;MiB, or hidden value bytes plus tombstone-key
                  bytes in tiered runs exceed 1/8 of total, above a 64&nbsp;KiB floor. Tombstones
                  drop when folded into the base. Up to 32 levels.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="fg-section" id="walkthrough">
        <div className="fg-rail">
          03 &middot; Walk-through
          <p>Writes, deletes, sync, snapshots.</p>
        </div>
        <div className="fg-body">
          <h2>Follow one change from disk to relay.</h2>
          <div className="fg-two">
            <p>
              <strong>Write.</strong> Append to the commit log; readers see the whole commit. When
              the log crosses the seal threshold, commits become a sorted run and{' '}
              <code>CURRENT</code> swaps in. The file blob store skips the log: each commit writes a
              run directly.
            </p>
            <p>
              <strong>Delete.</strong> A tombstone hides the old value. Cleanup first seals
              unsealed commits, then later merge and base-fold steps drop obsolete data. Space does
              not return when the delete API returns.
            </p>
          </div>
          <div className="fg-two">
            <p>
              <strong>Sync.</strong> A captured personal write also becomes the next cloud-log
              entry for this device, sealed and signed in the same commit. Upload sends those
              bytes; other devices verify the chain and merge by last-writer stamps. Each device
              merges data into its own local database. Shared databases keep separate signed logs
              under <code>log-sync/&lt;id&gt;/</code>.
            </p>
            <p>
              <strong>Snapshot.</strong> Wait for the current spool to be acknowledged, seal the
              commit log, and capture the store files. Upload those files and publish a signed
              snapshot entry. New writes can continue after capture. Ask the relay to trim what
              the snapshot covers. Restore installs those files and resumes streams after the
              named heads.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="simulator">
        <div className="fg-rail">
          04 &middot; Simulator
          <p>Poke seals, merges, sync, and trim.</p>
        </div>
        <div className="fg-body">
          <h2>Watch the store and the cloud logs move.</h2>
          <p className="fg-lede">
            Add records, burst writes, update and delete, add a second device, then Sync or Snapshot.
            Thresholds shrink with the speed control so effects show quickly; the captions always
            name the real constants from laststore.
          </p>
          <StorageSimulator />
        </div>
      </section>

      <section className="fg-section" id="novel">
        <div className="fg-rail">
          05 &middot; Is this novel?
          <p>Mostly no. The combination is unusual.</p>
        </div>
        <div className="fg-body">
          <h2>Familiar pieces, one personal-database packaging.</h2>
          <div className="fg-two">
            <p>
              <strong>LSM trees</strong> — LevelDB, RocksDB, Cassandra. Base pieces are close to
              RocksDB tiered / universal compaction.
            </p>
            <p>
              <strong>Per-device signed append-only chains</strong> merged deterministically —
              Secure Scuttlebutt, Automerge / local-first, Git.
            </p>
          </div>
          <div className="fg-two">
            <p>
              <strong>Snapshot + log with trimming</strong> — Postgres base backup + WAL, Litestream.
            </p>
            <p>
              <strong>Untrusted relay with end-to-end sealing</strong> — Signal, 1Password, Keybase.
            </p>
          </div>
          <p className="fg-note">
            What is less common is all of it in one personal database with an open, replaceable relay
            protocol. Closest relatives: Scuttlebutt and Ink &amp; Switch local-first research.
          </p>
          <p className="fg-note">
            Disk engine:{' '}
            <a href="https://github.com/EdgeVector/lastdb/blob/2d8149ed3d8baf3dcd81b19255909b71c03178e5/vendor/laststore/README.md">
              laststore README
            </a>
            . Install layout:{' '}
            <a href="https://github.com/EdgeVector/lastdb/blob/2d8149ed3d8baf3dcd81b19255909b71c03178e5/docs/home-format.md">
              home-format.md
            </a>
            .
          </p>
          <p className="fg-more">
            <Link to="/developer">Build an app: the developer guide &rarr;</Link>
          </p>
        </div>
      </section>

      <RelatedDocs currentPath="/docs/how-storage-works" number="06" />
    </>
  );
}
