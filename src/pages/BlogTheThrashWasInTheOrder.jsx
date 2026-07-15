import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored work, joint marks, mono caps labels, one accent).
function ArchFigure({ svg, caption }) {
  return (
    <figure style={{ margin: '34px 0', textAlign: 'center' }}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && (
        <figcaption style={{ color: '#928374', fontSize: '11px', letterSpacing: '0.06em', marginTop: '10px', textTransform: 'uppercase' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const SVG_DEFS = `
  <defs>
    <pattern id="poche" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#504945" stroke-width="1"/>
    </pattern>
  </defs>`;
const SVG_OPEN = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:660px;display:block;margin:0 auto" font-family="'IBM Plex Mono', monospace">${SVG_DEFS}`;

// Fig 1 — the wrong cycle: download every target, then maybe upload.
const WRONG_ORDER = `${SVG_OPEN('0 0 660 300')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">ONE SYNC TICK — OLD ORDER</text>

  <rect x="36" y="48" width="100" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="86" y="68" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PERSONAL</text>
  <text x="86" y="84" text-anchor="middle" fill="#83a598" font-size="10">download · 0 new</text>

  <line x1="136" y1="70" x2="168" y2="70" stroke="#928374" stroke-width="1"/>
  <polygon points="170,70 161,66 161,74" fill="#928374"/>

  <rect x="172" y="40" width="300" height="60" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="322" y="64" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">ORG · ORG · ORG · &hellip; &times; N</text>
  <text x="322" y="84" text-anchor="middle" fill="#928374" font-size="10">download each before any upload</text>

  <line x1="472" y1="70" x2="520" y2="70" stroke="#504945" stroke-width="1" stroke-dasharray="3 3"/>
  <rect x="522" y="48" width="100" height="44" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="572" y="68" text-anchor="middle" fill="#504945" font-size="11" letter-spacing="1">UPLOAD</text>
  <text x="572" y="84" text-anchor="middle" fill="#504945" font-size="10">never reached</text>

  <line x1="36" y1="130" x2="624" y2="130" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="36" y="160" fill="#928374" font-size="11" letter-spacing="1.5">WHAT STATUS SHOWED</text>
  <rect x="36" y="176" width="200" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="136" y="204" text-anchor="middle" fill="#ebdbb2" font-size="12">DOWNLOAD = 0</text>
  <text x="136" y="226" text-anchor="middle" fill="#928374" font-size="10">cursor already at head</text>

  <rect x="260" y="176" width="200" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="360" y="204" text-anchor="middle" fill="#ebdbb2" font-size="12">PENDING = THOUSANDS</text>
  <text x="360" y="226" text-anchor="middle" fill="#928374" font-size="10">local work waiting to go up</text>

  <rect x="484" y="176" width="140" height="70" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="554" y="204" text-anchor="middle" fill="#83a598" font-size="12">RSS SPIKE</text>
  <text x="554" y="226" text-anchor="middle" fill="#928374" font-size="10">on org #1</text>

  <text x="330" y="280" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">THE QUEUE LOOKED GUILTY. THE ORDER WAS.</text>
</svg>`;

// Fig 2 — personal first.
const RIGHT_ORDER = `${SVG_OPEN('0 0 660 250')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">ONE SYNC TICK — PERSONAL FIRST</text>

  <rect x="36" y="52" width="120" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="96" y="74" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">1 · PERSONAL</text>
  <text x="96" y="92" text-anchor="middle" fill="#83a598" font-size="10">download</text>

  <line x1="156" y1="78" x2="196" y2="78" stroke="#83a598" stroke-width="1"/>
  <polygon points="198,78 189,74 189,82" fill="#83a598"/>
  <rect x="194" y="74" width="4" height="4" fill="#83a598"/>

  <rect x="200" y="52" width="120" height="52" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="260" y="74" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">2 · UPLOAD</text>
  <text x="260" y="92" text-anchor="middle" fill="#83a598" font-size="10">bounded batch</text>

  <line x1="320" y1="78" x2="360" y2="78" stroke="#928374" stroke-width="1"/>
  <polygon points="362,78 353,74 353,82" fill="#928374"/>

  <rect x="364" y="52" width="140" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="434" y="74" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">3 · ONE SCOPED</text>
  <text x="434" y="92" text-anchor="middle" fill="#928374" font-size="10">optional · capped</text>

  <rect x="528" y="52" width="96" height="52" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="576" y="74" text-anchor="middle" fill="#504945" font-size="11" letter-spacing="1">REST</text>
  <text x="576" y="92" text-anchor="middle" fill="#504945" font-size="10">next ticks</text>

  <line x1="36" y1="140" x2="36" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="320" y1="140" x2="320" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="36" y1="147" x2="320" y2="147" stroke="#928374" stroke-width="1"/>
  <text x="178" y="174" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">PERSONAL CATCH-UP NEVER WAITS ON ORGS</text>

  <line x1="364" y1="140" x2="364" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="504" y1="140" x2="504" y2="154" stroke="#928374" stroke-width="1"/>
  <line x1="364" y1="147" x2="504" y2="147" stroke="#928374" stroke-width="1"/>
  <text x="434" y="174" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">AT MOST ONE PER TICK</text>

  <text x="330" y="220" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="0.5">ORDER IS A MEMORY BUDGET</text>
  <text x="330" y="240" text-anchor="middle" fill="#928374" font-size="11">caps on the wrong phase look like &ldquo;the fix failed&rdquo;</text>
</svg>`;

// Fig 3 — lived-in registry vs clean test fixture.
const LIVED_IN = `${SVG_OPEN('0 0 660 240')}
  <text x="165" y="30" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">CLEAN FIXTURE</text>
  <rect x="60" y="48" width="210" height="120" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="88" y="72" width="154" height="36" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="165" y="94" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PERSONAL ONLY</text>
  <text x="165" y="140" text-anchor="middle" fill="#928374" font-size="10">tests pass · no thrash</text>
  <text x="165" y="158" text-anchor="middle" fill="#928374" font-size="10">never multiplies work</text>

  <line x1="330" y1="40" x2="330" y2="200" stroke="#504945" stroke-width="1" stroke-dasharray="2 4"/>

  <text x="495" y="30" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">LIVED-IN NODE</text>
  <rect x="390" y="48" width="210" height="120" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="495" y="80" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PERSONAL</text>
  <text x="495" y="104" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">+ N SHARED LOGS</text>
  <text x="495" y="128" text-anchor="middle" fill="#928374" font-size="10">same label · many ids</text>
  <text x="495" y="148" text-anchor="middle" fill="#928374" font-size="10">stale registrations · real data</text>

  <text x="330" y="214" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">REGISTRY SHAPE IS PART OF THE SYSTEM UNDER TEST</text>
</svg>`;

export default function BlogTheThrashWasInTheOrder() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Thrash Was in the Order - LastDB</title>
        <meta
          name="description"
          content="We re-enabled cloud sync after a memory incident and thrashed again. Status said download=0 and pending was huge. The bug was cycle order: every shared-log download before any personal upload."
        />
        <meta property="og:title" content="The Thrash Was in the Order" />
        <meta
          property="og:description"
          content="Download idle, pending full, swap climbing, never reached upload. Two wrong diagnoses. The schedule was downloading every registered shared log first."
        />
        <link rel="canonical" href="https://thelastdb.com/blog/the-thrash-was-in-the-order" />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">The Thrash Was in the Order</h1>
      <p className="post-meta dim">2026-07-15</p>

      <p className="bold white">
        We re-enabled cloud sync after a memory incident. Within minutes the machine was swapping
        hard again. Status said download was idle (zero new entries) and the local pending queue was
        thousands deep. We still never saw an upload start. The thrash was not the queue. It was the
        order of work inside one sync tick.
      </p>

      <p>
        This is a write-up of what we got wrong, what the logs actually meant, and what we changed so
        we do not re-learn it under pressure. It is not a product pitch. The point is the failure
        mode.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What we thought was wrong</h2>

      <p>
        <span className="bold white">Diagnosis 1: download catch-up.</span> The first incident looked
        like unbounded concurrent fetches on a cold cursor. That path is real. We put hard
        per-cycle caps on download (entry count, byte budget, per-object size) and shipped them.
        Re-enabling sync was supposed to be the end of it.
      </p>

      <p>
        Re-enable failed again. The download line in the log was explicit:{' '}
        <span className="bold white">0 new entries</span>, cursor already at head. Pending stayed
        large. Swap climbed. The process never logged &ldquo;beginning upload.&rdquo; So we wrote a
        second story.
      </p>

      <p>
        <span className="bold white">Diagnosis 2: the pending outbox.</span> If download is idle and
        pending is fat, the engine must be materializing thousands of multi-megabyte batches into
        RAM before seal. We bounded that path too: queue depth, entries per tick, bytes per tick.
        We stopped force-admitting an oversize head &ldquo;so catch-up can progress&rdquo; &mdash;
        that rule alone is a thrash vector. Those caps were necessary. They were still not the
        mainline cause of this re-enable failure.
      </p>

      <h2>What was actually wrong</h2>

      <p>
        When we finally logged the target list at the start of a cycle, the picture flipped. One
        personal log. Then roughly two dozen shared (org) logs after it &mdash; many of them stale
        dogfood registrations that shared a human-readable label but not an identity. Personal
        download finished in milliseconds. The first shared download alone drove resident set size
        into multi-gigabyte territory. Upload ran only after <em>every</em> target finished
        downloading. A few kilobytes of personal work never got a turn.
      </p>

      <ArchFigure
        svg={WRONG_ORDER}
        caption="Fig. 1 — Old tick: personal download, then every shared log, then upload. Status pointed at the queue; the schedule never reached it."
      />

      <Section variant="rose">
        <h2>
          <span className="bold">If download is idle and pending is fat, log the schedule</span>
        </h2>
        <p>
          Target count, labels, &ldquo;personal download complete,&rdquo; &ldquo;beginning
          upload,&rdquo; selected bytes. We spent a long time capping the wrong phase because the
          status summary looked like an outbox problem. Caps on the wrong phase look exactly like
          &ldquo;the fix did not work.&rdquo;
        </p>
      </Section>

      <h2>What we changed</h2>

      <p>
        A multi-device account is not one pipe. There is personal history, and there may be shared
        logs. Shared pull matters. Letting shared pull monopolize a tick does not.
      </p>

      <p>The corrected tick:</p>

      <ol>
        <li>
          <span className="bold white">Download personal</span> &mdash; including the key check that
          has to pass before we append personal ciphertext.
        </li>
        <li>
          <span className="bold white">Upload a bounded batch</span> &mdash; entry and byte caps;
          never force-admit an object larger than the budget.
        </li>
        <li>
          <span className="bold white">At most one scoped download</span> after that. If the active
          shared-target count is absurdly high (we used &gt;4 as a leak signal), skip scoped work
          for the tick and clean the registry offline.
        </li>
      </ol>

      <ArchFigure
        svg={RIGHT_ORDER}
        caption="Fig. 2 — Personal first: personal download, bounded upload, then at most one shared download. The rest wait."
      />

      <p>
        We also put the process memory guard back to the ceiling we actually meant to ship (6&nbsp;GiB
        on this machine). Mid-incident someone had raised it so restarts would stop. That does not
        fix thrash; it only delays noticing it. Verification was a multi-sample status window under
        that guard: last-success advancing, RSS under limit, no guard restart, swap not ballooning
        into the tens of gigabytes.
      </p>

      <h2>Stale registrations as input, not atmosphere</h2>

      <p>
        Having ~20 shared-log registrations under the same product label was bad hygiene. Leaving
        them active made every tick a fan-out. Deactivating them was correct ops.
      </p>

      <p>
        It also exposed a missing invariant: the sync engine assumed a small target list. Unit tests
        use personal-only or one shared prefix. A long-lived node accumulates probes, abandoned
        workspaces, and labels that collide while the underlying ids do not. If work per tick is
        linear in active targets, the registry is part of the performance envelope &mdash; same as
        outbox depth or object size.
      </p>

      <ArchFigure
        svg={LIVED_IN}
        caption="Fig. 3 — Fixture shape vs lived-in registry. Linear work per target is fine until N is not."
      />

      <h2>What not to do next time</h2>

      <ul>
        <li>
          <span className="bold white">Do not only cap the phase the status summary names.</span>{' '}
          Status said download idle + pending fat. The hang was between personal download and
          upload, on target N of many.
        </li>
        <li>
          <span className="bold white">Do not schedule all downloads before any upload</span> when
          personal catch-up is what keeps the machine usable. Shared catch-up can round-robin across
          ticks.
        </li>
        <li>
          <span className="bold white">Do not force-admit oversize heads</span> to &ldquo;make
          progress.&rdquo; Progress that thrash-kills the process is not progress.
        </li>
        <li>
          <span className="bold white">Do not raise the memory guard to clear restarts</span> and
          call the incident closed. Prove under the limit you intend to keep.
        </li>
        <li>
          <span className="bold white">Do not treat registry cardinality as configuration trivia.</span>{' '}
          Log it. Cap per-tick work. Deactivate leaks.
        </li>
      </ul>

      <Section variant="sage">
        <h2>
          <span className="bold">The short version</span>
        </h2>
        <p>
          A sync engine is a scheduler. This one looked busy downloading shared logs while personal
          upload starved. We misread that as an outbox memory bug. Instrument phase order and target
          count early; personal-first is a reliability property, not a polish item.
        </p>
      </Section>

      <p className="dim">
        Earlier sync postmortem:{' '}
        <Link to="/blog/anatomy-of-a-sync-outage">Anatomy of a Sync Outage</Link>
        {' · '}
        related mis-diagnosis pattern:{' '}
        <Link to="/blog/the-fix-was-subtraction">The Fix Was Subtraction</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
