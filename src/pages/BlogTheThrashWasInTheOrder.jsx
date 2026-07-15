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
// Personal finishes; org stack never ends; upload never starts.
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

// Fig 2 — personal first: download personal, upload, then at most one scoped.
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
  <text x="495" y="148" text-anchor="middle" fill="#928374" font-size="10">dogfood residue · real work</text>

  <text x="330" y="214" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">ABSURD HYGIENE DEBT &mdash; EXCELLENT STRESS TEST</text>
</svg>`;

export default function BlogTheThrashWasInTheOrder() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Thrash Was in the Order - LastDB</title>
        <meta
          name="description"
          content="Cloud sync re-enable blew memory while status said download=0 and pending was huge. We capped the wrong phases first. The real bug was cycle order: every shared log before any personal upload. On diagnosis, dogfood residue, and personal-first catch-up."
        />
        <meta property="og:title" content="The Thrash Was in the Order" />
        <meta
          property="og:description"
          content="When sync thrash shows download idle and a fat pending queue, the queue may be innocent. Cycle order &mdash; personal first, scoped later, never all-orgs-before-upload &mdash; is a memory budget. A lived-in node taught us that."
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
        We turned cloud sync back on after a memory incident. Within minutes the machine was
        swapping hard again. Status said the download side was idle &mdash; zero new entries &mdash;
        and the local pending queue was thousands deep. So we capped uploads. We capped batch sizes.
        We still never saw an upload start. <span className="white">The thrash was not the queue. It was the order of work in a single tick.</span>
      </p>

      <p>
        We build LastDB on LastDB: our own tools run on a Mini node that syncs to the cloud like
        anyone else&rsquo;s. When that node thrashes, we feel it first. That is also why we get a
        kind of testing money can&rsquo;t buy &mdash; a database that has been through dogfood,
        experiments, and a few too many shared workspaces, not a clean fixture with one empty prefix.
      </p>

      <h2>
        <span className="bold">Two wrong stories, then the right one</span>
      </h2>

      <p>
        The first story was pure download catch-up: unbounded concurrent fetches on a cold cursor.
        That path is real, and we did put hard per-cycle caps on it. Shipping those caps and
        re-enabling sync was supposed to be the end of the incident.
      </p>

      <p>
        Re-enable failed again. Logs said <span className="bold white">download: 0 new entries</span>.
        Pending stayed large. Swap climbed. The process never printed &ldquo;beginning upload.&rdquo;
        So the second story wrote itself: the pending queue must be materializing multi-megabyte
        batches into RAM. We bounded that path too &mdash; queue depth, entries per tick, bytes per
        tick, refuse a poison-size head instead of force-admitting it &ldquo;to make progress.&rdquo;
      </p>

      <p>
        Still wrong as the mainline. When we finally logged the target list at the start of a cycle,
        the picture flipped: one personal log, then roughly two dozen shared (org) logs stacked after
        it, many of them leftover dogfood identities that all wore the same human label. Personal
        download finished in milliseconds. The first shared download alone pushed resident memory
        into the multi-gigabyte range. Upload was scheduled after <em>every</em> target finished
        downloading. A few kilobytes of personal upload never got a turn.
      </p>

      <ArchFigure
        svg={WRONG_ORDER}
        caption="Fig. 1 — Old cycle order: personal download, then every shared log, then upload. Status blamed the queue; the schedule starved it."
      />

      <Section variant="rose">
        <h2>
          <span className="bold">The lesson in one line</span>
        </h2>
        <p>
          If your status says download is idle and pending is fat, instrument{' '}
          <span className="bold white">cycle order and target cardinality</span> before you rewrite
          the queue. Caps on the wrong phase look exactly like &ldquo;the fix didn&rsquo;t work.&rdquo;
        </p>
      </Section>

      <h2>
        <span className="bold">Personal first is a reliability property</span>
      </h2>

      <p>
        Cloud sync on a multi-device account is not one pipe. There is personal history, and there
        may be one or more shared logs (team workspaces, experiments, integrations). Pulling shared
        history matters. Letting shared pull monopolize a tick does not.
      </p>

      <p>
        The corrected tick is boring on purpose:
      </p>

      <ol>
        <li>
          <span className="bold white">Download personal</span> &mdash; prove the key, take any new
          personal entries, finish.
        </li>
        <li>
          <span className="bold white">Upload a bounded personal batch</span> &mdash; drain the local
          outbox under entry and byte caps. Never force-admit a single object larger than the budget.
        </li>
        <li>
          <span className="bold white">At most one scoped download</span> &mdash; and if the registry
          has ballooned past a small active count, skip scoped entirely until someone cleans it up.
        </li>
      </ol>

      <ArchFigure
        svg={RIGHT_ORDER}
        caption="Fig. 2 — Personal-first: personal download, bounded upload, then at most one shared log. The rest wait for later ticks."
      />

      <p>
        After that change, the same machine that had been thrashing held a long prove window: last
        successful sync kept advancing, resident memory stayed under a hard process guard, and swap
        stopped doing the multi-tens-of-gigabytes impression of a horror movie. We also restored the
        memory guard to its real ceiling instead of raising it mid-incident. Raising the guard is not
        a fix; it is how you hide the fire.
      </p>

      <h2>
        <span className="bold">Dogfood residue is a fuzzer</span>
      </h2>

      <p>
        Having twenty shared-log registrations all labeled like the same product org is absurd
        hygiene. Leaving them active is how you turn every sync tick into a fan-out. Tombstoning them
        was the right ops move.
      </p>

      <p>
        It was also a gift. No unit test would have invented that shape of registry on purpose. A
        clean fixture has personal and maybe one shared prefix. A lived-in node has experiments that
        never got deactivated, probes that stuck around, and labels that collide while the underlying
        identities do not. Linear work per tick becomes a surprise only if you assume the registry
        stays tiny.
      </p>

      <ArchFigure
        svg={LIVED_IN}
        caption="Fig. 3 — Clean fixtures do not thrash. Lived-in registries multiply work. Both are true; only one is your laptop."
      />

      <Section variant="sage">
        <h2>
          <span className="bold">What we keep</span>
        </h2>
        <ul>
          <li>
            <span className="bold white">Order before micro-caps.</span> Personal catch-up must not
            wait on every shared log.
          </li>
          <li>
            <span className="bold white">Cardinality is a budget.</span> N active shared targets is
            N opportunities to blow a tick. Cap scoped work per cycle; refuse to run a stampede when
            the registry looks like a leak.
          </li>
          <li>
            <span className="bold white">Size gates without force-admit.</span> &ldquo;Always take the
            first item so something progresses&rdquo; is how a multi-megabyte poison head owns RAM.
          </li>
          <li>
            <span className="bold white">Phase logs beat queue depth alone.</span> Target count,
            labels, &ldquo;personal complete,&rdquo; &ldquo;beginning upload,&rdquo; and selected
            bytes would have cut this incident short.
          </li>
          <li>
            <span className="bold white">Prove under the real guard.</span> Multi-sample status over
            tens of minutes, with the memory ceiling you actually ship, not the temporary one you
            raised so restarts would stop.
          </li>
        </ul>
      </Section>

      <h2>
        <span className="bold">Why write it down</span>
      </h2>

      <p>
        We almost published the tidy story: we capped downloads, then capped uploads, then everything
        was fine. That would have been a lie of ordering. The durable learning is smaller and meaner:{' '}
        <span className="bold white">a sync engine is a scheduler</span>, and schedulers fail by
        starving the wrong queue while looking busy on the wrong phase.
      </p>

      <p>
        Dogfood made the bug loud. Personal-first made it boring again. Boring is the goal.
      </p>

      <p className="dim">
        Related reading:{' '}
        <Link to="/blog/anatomy-of-a-sync-outage">Anatomy of a Sync Outage</Link>
        {' · '}
        <Link to="/blog/the-fix-was-subtraction">The Fix Was Subtraction</Link>
        {' · '}
        <Link to="/blog/the-parallelism-tax">The Parallelism Tax</Link>
        {' · '}
        <Link to="/apps">Apps we build on LastDB</Link>
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
