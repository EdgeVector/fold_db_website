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
  <text x="56" y="52" fill="var(--ink)" font-size="11" letter-spacing="1">HOME · ONE DATABASE ON DISK</text>

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
  <text x="330" y="328" text-anchor="middle" fill="var(--muted)" font-size="10" letter-spacing="0.5">FOUR THINGS · NOTHING ELSE IS LIVE DATA</text>
</svg>`;

// Write path: commit log → run → durable → CURRENT swap.
const WRITE_FIGURE = `<svg viewBox="0 0 660 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto;font-family:var(--mono)">
  <rect x="24" y="48" width="120" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="84" y="76" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">COMMIT</text>
  <text x="84" y="94" text-anchor="middle" fill="var(--muted)" font-size="10">log</text>

  <line x1="144" y1="80" x2="176" y2="80" stroke="var(--ink)" stroke-width="1"/>
  <polygon points="176,76 186,80 176,84" fill="var(--ink)"/>

  <rect x="186" y="48" width="120" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="246" y="76" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">SEAL</text>
  <text x="246" y="94" text-anchor="middle" fill="var(--muted)" font-size="10">new run</text>

  <line x1="306" y1="80" x2="338" y2="80" stroke="var(--ink)" stroke-width="1"/>
  <polygon points="338,76 348,80 338,84" fill="var(--ink)"/>

  <rect x="348" y="48" width="120" height="64" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="408" y="76" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">DURABLE</text>
  <text x="408" y="94" text-anchor="middle" fill="var(--muted)" font-size="10">on disk</text>

  <line x1="468" y1="80" x2="500" y2="80" stroke="var(--accent)" stroke-width="1"/>
  <polygon points="500,76 510,80 500,84" fill="var(--accent)"/>

  <rect x="510" y="48" width="126" height="64" fill="none" stroke="var(--accent)" stroke-width="1"/>
  <text x="573" y="76" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="0.5">CURRENT</text>
  <text x="573" y="94" text-anchor="middle" fill="var(--accent)" font-size="10">atomic swap</text>

  <text x="330" y="160" text-anchor="middle" fill="var(--muted)" font-size="11" letter-spacing="0.5">READERS SEE WHOLE COMMITS ONLY</text>
  <text x="330" y="184" text-anchor="middle" fill="var(--muted)" font-size="10">a crash leaves unnamed files · on restart they are deleted · nothing to replay</text>
</svg>`;

export default function DocsHowStorageWorks() {
  return (
    <>
      <DocsHeader
        title="How storage works"
        path="/docs/how-storage-works"
        heading={<>How LastDB keeps data <em>on disk.</em></>}
        lede="Each named database lives in a folder called a home. This page is a plain-English walk through that folder: what a run is, how a write becomes durable, how a read finds a key, and why deletes wait for a merge."
        description="How LastDB stores data on disk: the home folder, immutable runs, encrypted blocks, the write path through CURRENT, lookups, delete markers, and merges."
        reviewed="Last reviewed 27 November 2026 against the laststore disk format README."
      />

      <section className="fg-section" id="home">
        <div className="fg-rail">
          01 &middot; The home
          <p>One folder per database. Four things live there.</p>
        </div>
        <div className="fg-body">
          <h2>A home holds the live set.</h2>
          <p className="fg-lede">
            Each database is a directory called a home. Inside it you will find a small descriptor that
            identifies the home, a <code>LOCK</code> file so only one process writes at a time,{' '}
            <code>CURRENT</code> (the official list of live data files), and a <code>runs/</code> folder
            for those files.
          </p>
          <div role="img" aria-label="A home folder contains a descriptor, a LOCK file, CURRENT, and a runs directory.">
            <ArchFigure svg={HOME_FIGURE} caption="Fig. 1 — The home folder" />
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
          <p>Durable first. Visible second.</p>
        </div>
        <div className="fg-body">
          <h2>Publish only after the bytes land.</h2>
          <p className="fg-lede">
            Changes collect in a commit log, get sealed into a new run, are made durable on disk, and
            only then get published by atomically swapping in a new <code>CURRENT</code>.
          </p>
          <div role="img" aria-label="Write path: commit log, seal a new run, make it durable, then atomically swap CURRENT.">
            <ArchFigure svg={WRITE_FIGURE} caption="Fig. 2 — The write path" />
          </div>
          <div className="fg-two">
            <p>
              A reader always sees whole commits. It holds one <code>CURRENT</code> for the length of the
              read, so it never sees a half-published write.
            </p>
            <p>
              A crash cannot corrupt the live set. On restart, files that <code>CURRENT</code> does not
              name are deleted. There is nothing to replay.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="read">
        <div className="fg-rail">
          04 &middot; Reading
          <p>Newest run first. Newest version wins.</p>
        </div>
        <div className="fg-body">
          <h2>Lookups walk runs newest to oldest.</h2>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>Skip what cannot hold the key.</h3>
                <p>A bloom filter skips runs that definitely do not hold the key.</p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>Read two blocks on a hit.</h3>
                <p>A hit reads one index block and one data block.</p>
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
              Instead a delete writes a tiny marker instantly.
            </p>
            <p>
              A background merge later rewrites files once and drops everything deleted in one sweep.
              That is what keeps writes fast and crash-safe.
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
              Deleted and replaced data gets reclaimed once it passes one eighth of the home, with a
              64&nbsp;KiB minimum.
            </p>
            <p>
              Merges reserve free disk space before writing, so they never run the disk out mid-merge.
            </p>
          </div>
          <p className="fg-note">
            Source of truth for the disk format:{' '}
            <a href="https://github.com/EdgeVector/lastdb/blob/main/vendor/laststore/README.md">
              laststore README
            </a>
            . The interactive system guide is in <a href="/explore/#diagram">Explore</a>.
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
