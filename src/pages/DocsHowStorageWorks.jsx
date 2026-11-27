import { Link } from 'react-router-dom';
import ArchFigure from '../components/ArchFigure';
import { DocsHeader, RelatedDocs } from './Docs';

// Home folder layout. Hand-authored; colours and type come from site.css.
const HOME_FIGURE = `<svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;font-family:var(--mono)">
  <defs>
    <pattern id="storage-home-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect x="40" y="28" width="580" height="250" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="56" y="52" fill="var(--ink)" font-size="11" letter-spacing="1">HOME · ONE LASTSTORE FOLDER</text>

  <rect x="60" y="72" width="250" height="56" fill="url(#storage-home-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <text x="185" y="96" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1">DESCRIPTOR</text>
  <text x="185" y="114" text-anchor="middle" fill="var(--muted)" font-size="10">identifies this home</text>

  <rect x="330" y="72" width="250" height="56" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="455" y="96" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1">LOCK</text>
  <text x="455" y="114" text-anchor="middle" fill="var(--muted)" font-size="10">one writer at a time</text>

  <rect x="60" y="144" width="250" height="56" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="185" y="168" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1">CURRENT</text>
  <text x="185" y="186" text-anchor="middle" fill="var(--accent)" font-size="10">official list of live runs</text>

  <rect x="330" y="144" width="250" height="112" fill="url(#storage-home-hatch)" stroke="var(--ink)" stroke-width="1"/>
  <text x="455" y="176" text-anchor="middle" fill="var(--ink)" font-size="12" letter-spacing="1">RUNS/</text>
  <text x="455" y="198" text-anchor="middle" fill="var(--muted)" font-size="10">immutable data files</text>
  <text x="455" y="220" text-anchor="middle" fill="var(--muted)" font-size="10">each written once</text>
  <text x="455" y="238" text-anchor="middle" fill="var(--muted)" font-size="10">never changed in place</text>

  <line x1="40" y1="298" x2="40" y2="312" stroke="var(--muted)" stroke-width="1"/>
  <line x1="620" y1="298" x2="620" y2="312" stroke="var(--muted)" stroke-width="1"/>
  <line x1="40" y1="305" x2="620" y2="305" stroke="var(--muted)" stroke-width="1"/>
  <text x="330" y="328" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="0.5">THE SEALED RUN SET · RECORD HOMES ALSO KEEP A COMMIT LOG</text>
</svg>`;

// Write path: durable log commit first; later seal publishes a run via CURRENT.
const WRITE_FIGURE = `<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;font-family:var(--mono)">
  <rect x="40" y="36" width="160" height="64" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="120" y="64" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">COMMIT LOG</text>
  <text x="120" y="82" text-anchor="middle" fill="var(--accent)" font-size="10">durable · readable</text>

  <line x1="200" y1="68" x2="248" y2="68" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="224" y="58" text-anchor="middle" fill="var(--muted)" font-size="9">later</text>
  <polygon points="248,64 258,68 248,72" fill="var(--muted)"/>

  <rect x="258" y="36" width="120" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="318" y="64" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">SEAL</text>
  <text x="318" y="82" text-anchor="middle" fill="var(--muted)" font-size="10">new run</text>

  <line x1="378" y1="68" x2="410" y2="68" stroke="var(--ink)" stroke-width="1"/>
  <polygon points="410,64 420,68 410,72" fill="var(--ink)"/>

  <rect x="420" y="36" width="100" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="470" y="64" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">DURABLE</text>
  <text x="470" y="82" text-anchor="middle" fill="var(--muted)" font-size="10">on disk</text>

  <line x1="520" y1="68" x2="548" y2="68" stroke="var(--accent)" stroke-width="1"/>
  <polygon points="548,64 558,68 548,72" fill="var(--accent)"/>

  <rect x="558" y="36" width="70" height="64" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="593" y="64" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="0.5">CURRENT</text>
  <text x="593" y="82" text-anchor="middle" fill="var(--accent)" font-size="9">swap</text>

  <text x="330" y="140" text-anchor="middle" fill="var(--muted)" font-size="11" letter-spacing="0.5">A FLUSHED LOG COMMIT IS LIVE BEFORE THE SEAL</text>
  <text x="330" y="168" text-anchor="middle" fill="var(--muted)" font-size="10">readers see whole commits · sealed runs advance CURRENT</text>
  <text x="330" y="196" text-anchor="middle" fill="var(--muted)" font-size="10">unnamed run files are deleted on restart · durable log frames above CURRENT replay</text>
</svg>`;

export default function DocsHowStorageWorks() {
  return (
    <>
      <DocsHeader
        title="How storage works"
        path="/docs/how-storage-works"
        heading={<>How LastDB keeps data <em>on disk.</em></>}
        lede="On-disk data lives in folders called homes. This page is a plain-English walk through one home: what a run is, how a write becomes durable, how a read finds a key, and why deletes wait for a merge."
        description="How LastDB stores data on disk: homes, immutable runs, encrypted blocks, the commit log and CURRENT write path, lookups, delete markers, and merges."
        reviewed="Last reviewed 27 November 2026 against the laststore disk format and the Explore design notes for homes and the commit log."
      />

      <section className="fg-section" id="home">
        <div className="fg-rail">
          01 &middot; The home
          <p>One LastStore folder. Four named parts for the sealed set.</p>
        </div>
        <div className="fg-body">
          <h2>A home holds a sealed set of runs.</h2>
          <p className="fg-lede">
            A home is a directory. Inside it you will find a small descriptor that identifies the home,
            a <code>LOCK</code> file so only one process writes at a time, <code>CURRENT</code> (the
            official list of live data files), and a <code>runs/</code> folder for those files.
          </p>
          <p className="fg-note">
            LastDB uses one home for records and another for record files (attachments). The diagram
            below is one home; both homes share this shape.
          </p>
          <div role="img" aria-label="A home folder contains a descriptor, a LOCK file, CURRENT, and a runs directory.">
            <ArchFigure svg={HOME_FIGURE} caption="Fig. 1 — One home folder" />
          </div>
        </div>
      </section>

      <section className="fg-section" id="run">
        <div className="fg-rail">
          02 &middot; A run
          <p>One file of records, written once.</p>
        </div>
        <div className="fg-body">
          <h2>Runs are immutable.</h2>
          <p className="fg-lede">
            A run is one file of records sorted by key. It is written once and never changed. Each record
            is a key plus a value, or a key plus a delete marker.
          </p>
          <div className="fg-two">
            <p>
              The file is split into blocks. Each block is compressed with zstd when that makes it
              smaller, then encrypted with AES-256-GCM using a key derived from the home&rsquo;s key.
            </p>
            <p>
              Everything is encrypted at rest, block by block. A reader that does not hold the home key
              cannot read the records.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="write">
        <div className="fg-rail">
          03 &middot; Writing
          <p>Log first. Seal later.</p>
        </div>
        <div className="fg-body">
          <h2>Commits land in a log before a seal.</h2>
          <p className="fg-lede">
            On the record home, a write appends a complete commit to an encrypted commit log and flushes
            it. That commit is durable and readable right away. A later seal freezes those logged
            commits into a new run, makes the run durable, and only then publishes it by atomically
            swapping in a new <code>CURRENT</code>.
          </p>
          <div role="img" aria-label="Write path: durable commit log first, then a later seal into a new run and an atomic CURRENT swap.">
            <ArchFigure svg={WRITE_FIGURE} caption="Fig. 2 — Commit log, then seal" />
          </div>
          <div className="fg-two">
            <p>
              A reader always sees whole commits. Reads consult the logged commits first, then the sealed
              runs named by <code>CURRENT</code>.
            </p>
            <p>
              A crash cannot leave a half-published run in the live set. On restart, run files that{' '}
              <code>CURRENT</code> does not name are deleted. Durable log frames above the sealed frontier
              are replayed.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="read">
        <div className="fg-rail">
          04 &middot; Reading
          <p>Log first, then runs newest to oldest.</p>
        </div>
        <div className="fg-body">
          <h2>Lookups check the log, then the runs.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>Skip what cannot hold the key.</h3>
                <p>
                  After the logged commits, lookups walk sealed runs newest to oldest. A bloom filter
                  skips runs that definitely do not hold the key.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>Read two blocks on a hit.</h3>
                <p>A hit in a run reads one index block and one data block.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3>Newest version wins.</h3>
                <p>If the newest version is a delete marker, the record is gone.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="fg-section" id="deletes">
        <div className="fg-rail">
          05 &middot; Deletes
          <p>A marker now. Reclaim later.</p>
        </div>
        <div className="fg-body">
          <h2>Deletes are not instant on disk.</h2>
          <div className="fg-two">
            <p>
              Runs are never edited in place, so removing one record would mean rewriting a whole file.
              Instead a delete saves a small marker that hides the old value from later reads.
            </p>
            <p>
              When these markers are estimated to hide enough logical data, background work seals them into a run.
              A later base merge removes obsolete data. Readers can delay removal of old files.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="merge">
        <div className="fg-rail">
          06 &middot; Merging
          <p>Eight into one. Space first.</p>
        </div>
        <div className="fg-body">
          <h2>Merges reclaim deleted and replaced data.</h2>
          <p className="fg-lede">
            Eight runs of a level merge into one, keeping only the newest version of each key.
          </p>
          <div className="fg-two">
            <p>
              Base compaction becomes eligible when obsolete data exceeds both 64&nbsp;KiB and
              one eighth of the logical bytes in the runs. Those bytes are counted before compression.
            </p>
            <p>
              Merges reserve disk space before writing. If space is insufficient, they preserve the
              previous saved state and leave the work for later.
            </p>
          </div>
          <p className="fg-note">
            Disk format reference:{' '}
            <a href="https://github.com/EdgeVector/lastdb/blob/main/vendor/laststore/README.md">
              laststore README
            </a>
            . Commit-log and dual-home detail is in the{' '}
            <a href="/explore/#diagram">Explore</a> guide.
          </p>
          <p className="fg-more">
            <Link to="/developer">Build an app: the developer guide &rarr;</Link>
          </p>
        </div>
      </section>

      <RelatedDocs currentPath="/docs/how-storage-works" number="07" />
    </>
  );
}
