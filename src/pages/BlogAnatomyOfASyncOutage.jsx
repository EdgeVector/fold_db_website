import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for the path that matters). Inline SVG — no auto-layout.
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

// 1 — the request path. The device blamed "auth"; the 500 came from the sync
// service timing out while it waited on the object store.
const PATH = `${SVG_OPEN('0 0 660 248')}
  <rect x="24" y="40" width="120" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="84" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">DEVICE</text>
  <text x="84" y="81" text-anchor="middle" fill="#928374" font-size="10">wants to sync</text>

  <line x1="144" y1="68" x2="214" y2="68" stroke="#928374" stroke-width="1"/>
  <polygon points="216,68 207,64 207,72" fill="#928374"/>

  <rect x="216" y="40" width="130" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="281" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">API GATEWAY</text>
  <text x="281" y="81" text-anchor="middle" fill="#928374" font-size="10">10s patience</text>

  <line x1="346" y1="68" x2="416" y2="68" stroke="#928374" stroke-width="1"/>
  <polygon points="418,68 409,64 409,72" fill="#928374"/>

  <rect x="418" y="40" width="130" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="483" y="64" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">SYNC SERVICE</text>
  <text x="483" y="81" text-anchor="middle" fill="#928374" font-size="10">presign · list</text>

  <line x1="483" y1="96" x2="483" y2="150" stroke="#928374" stroke-width="1"/>
  <polygon points="483,152 479,143 487,143" fill="#928374"/>
  <rect x="406" y="152" width="154" height="56" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="483" y="178" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">OBJECT STORE</text>
  <text x="483" y="195" text-anchor="middle" fill="#ebdbb2" font-size="10">the log · snapshots</text>

  <text x="556" y="124" fill="#928374" font-size="10" letter-spacing="1">waits here</text>
  <line x1="554" y1="120" x2="500" y2="110" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <path d="M 281 96 L 281 176 L 142 176 L 142 96" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <polygon points="142,96 138,105 146,105" fill="#83a598"/>
  <text x="212" y="171" text-anchor="middle" fill="#83a598" font-size="11" letter-spacing="1">HTTP 500</text>
  <text x="212" y="196" text-anchor="middle" fill="#928374" font-size="10">"auth error" — it was neither</text>
</svg>`;

// 2 — the hot-path scan. Every upload asked a one-line question and got a
// full-bucket scan in reply.
const SCAN = `${SVG_OPEN('0 0 660 250')}
  <text x="36" y="40" fill="#928374" font-size="11" letter-spacing="1.5">EVERY UPLOAD ASKS</text>
  <rect x="36" y="54" width="220" height="44" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="146" y="74" text-anchor="middle" fill="#ebdbb2" font-size="12">"is there room?"</text>
  <text x="146" y="90" text-anchor="middle" fill="#83a598" font-size="10">one cheap lookup — &lt;1ms</text>

  <text x="300" y="74" fill="#928374" font-size="11">answered by</text>

  <text x="430" y="40" fill="#928374" font-size="11" letter-spacing="1.5">WHAT IT ACTUALLY DID</text>
  <rect x="430" y="54" width="196" height="120" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="528" y="92" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">SCAN EVERY</text>
  <text x="528" y="110" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1">OBJECT</text>
  <text x="528" y="134" text-anchor="middle" fill="#928374" font-size="10">~35,000 of them</text>
  <text x="528" y="150" text-anchor="middle" fill="#928374" font-size="10">page by page</text>

  <line x1="528" y1="174" x2="528" y2="200" stroke="#928374" stroke-width="1"/>
  <polygon points="528,202 524,193 532,193" fill="#928374"/>
  <text x="528" y="222" text-anchor="middle" fill="#83a598" font-size="12" letter-spacing="1">20s &gt; 10s LIMIT — TIMEOUT</text>
</svg>`;

// 3 — the deploy that didn't. The fix landed in $LATEST; traffic ran a
// published version behind an alias.
const ALIAS = `${SVG_OPEN('0 0 660 234')}
  <text x="40" y="40" fill="#83a598" font-size="11" letter-spacing="1.5">WHERE THE FIX LANDED</text>
  <rect x="40" y="54" width="200" height="60" fill="none" stroke="#83a598" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="140" y="80" text-anchor="middle" fill="#ebdbb2" font-size="13" letter-spacing="1.5">$LATEST</text>
  <text x="140" y="98" text-anchor="middle" fill="#928374" font-size="10">updated — and unused</text>

  <text x="420" y="40" fill="#928374" font-size="11" letter-spacing="1.5">WHERE TRAFFIC WENT</text>
  <rect x="420" y="54" width="200" height="60" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="520" y="80" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.2">LIVE (ALIAS)</text>
  <text x="520" y="98" text-anchor="middle" fill="#928374" font-size="10">&rarr; PUBLISHED VERSION</text>

  <text x="330" y="158" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">ALL REQUESTS</text>
  <line x1="330" y1="166" x2="330" y2="190" stroke="#928374" stroke-width="1"/>
  <polyline points="330,190 520,190 520,116" fill="none" stroke="#928374" stroke-width="1"/>
  <polygon points="520,116 516,125 524,125" fill="#928374"/>

  <polyline points="330,190 140,190 140,116" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="235" y="210" text-anchor="middle" fill="#504945" font-size="10">no path here</text>
</svg>`;

// 4 — the log that never shrank. Compaction folds old entries into a snapshot
// and truncates; the list stays small.
const COMPACT = `${SVG_OPEN('0 0 660 236')}
  <text x="36" y="38" fill="#928374" font-size="11" letter-spacing="1.5">WHAT WE HAD</text>
  <rect x="36" y="50" width="40" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="56" y="98" text-anchor="middle" fill="#928374" font-size="9">1 SNAP</text>
  <rect x="92" y="50" width="452" height="34" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="318" y="72" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">35,000 LOG ENTRIES — NEVER TRUNCATED</text>
  <line x1="544" y1="67" x2="590" y2="67" stroke="#928374" stroke-width="1"/>
  <polygon points="592,67 583,63 583,71" fill="#928374"/>
  <text x="600" y="71" fill="#83a598" font-size="10">list: 20s</text>

  <text x="36" y="150" fill="#83a598" font-size="11" letter-spacing="1.5">WHAT COMPACTION GIVES</text>
  <rect x="36" y="162" width="40" height="34" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="56" y="210" text-anchor="middle" fill="#928374" font-size="9">1 SNAP</text>
  <rect x="92" y="162" width="120" height="34" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="152" y="184" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">RECENT ONLY</text>
  <line x1="212" y1="179" x2="590" y2="179" stroke="#504945" stroke-width="1" stroke-dasharray="3 4"/>
  <polygon points="592,179 583,175 583,183" fill="#83a598"/>
  <text x="600" y="183" fill="#83a598" font-size="10">list: &lt;1s</text>
</svg>`;

export default function BlogAnatomyOfASyncOutage() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Anatomy of a Sync Outage - LastDB</title>
        <meta name="description" content="Cloud sync went down. What looked like one bug was three, stacked — each hiding the one behind it — and two of our first diagnoses were wrong. A debugging tale, and the rules we took from it." />
        <meta property="og:title" content="Anatomy of a Sync Outage" />
        <meta property="og:description" content="Three bugs in a trenchcoat: a scan on a hot path, a list that couldn't finish, and a fix that never ran. The whole descent, honestly told, plus how we keep it from recurring." />
        <link rel="canonical" href="https://thelastdb.com/blog/anatomy-of-a-sync-outage" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Anatomy of a Sync Outage</h1>
      <p className="post-meta dim">2026-06-28</p>

      <p className="bold white">Cloud sync stopped. Uploads failed for everyone, and the error in the app pointed at the wrong thing entirely. What looked like one bug turned out to be three &mdash; stacked, each hiding the one behind it. <span className="white">We fixed the first two before realizing neither was what users were hitting.</span> This is the whole descent, told straight, and the rules we walked away with.</p>

      <p>We build LastDB on LastDB &mdash; our own tools run on it, and they sync to the cloud like anyone else&rsquo;s. So when sync broke, it broke for us too, which is the only reason this story has a happy ending: we were the affected user, and we could poke it directly.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The error that lied</h2>
      <p>The app reported a sync failure that read, in effect: <span className="bold white">&ldquo;auth error: HTTP 500.&rdquo;</span> So the first instinct was to go look at authentication. That was a trap. The string was assembled by a generic wrapper that turns <em>any</em> server-side failure on the sync path into an &ldquo;auth&rdquo;-flavored message. Authentication was fine. The 500 was coming from somewhere else, wearing auth&rsquo;s coat.</p>

      <p>This is the shape of every hard outage: the first message you read is a label, not a location. The path a sync upload travels is short &mdash; device, gateway, the sync service, the object store &mdash; and a 500 with the body <span className="bold">&ldquo;Internal Server Error&rdquo;</span> is the gateway&rsquo;s way of saying it gave up waiting for the service behind it. Not an auth rejection. A timeout.</p>

      <ArchFigure svg={PATH} caption="Fig. 1 — the path of a sync. The device blamed auth; the gateway had simply run out of patience" />

      <h2>The first wrong turn</h2>
      <p>Before we found the timeout, we found something that looked like a cause and wasn&rsquo;t. The sync service logs were full of failures talking to one of our object-storage backends, and reproducing the call by hand returned an error rendered as the bare words <span className="bold white">&ldquo;service error.&rdquo;</span> Unmasked, the real message was concrete and alarming: the storage account had blown through its <span className="bold">daily transaction cap</span>. Every call was getting rejected.</p>

      <p>That sent us down a satisfying path: raise the cap, ship the obvious storage fix, declare the incident closed. It was real &mdash; the cap really was exhausted &mdash; but it was a <span className="bold white">symptom, not the disease.</span> The sync data lives in a different store, one that was perfectly healthy. The transaction cap was being eaten by the same runaway behavior that was breaking sync, but lifting it wouldn&rsquo;t bring sync back. We&rsquo;d found <em>a</em> problem. It wasn&rsquo;t <em>the</em> problem.</p>

      <Section variant="rose">
        <h2><span className="bold">Lesson: a masked error is a lie of omission</span></h2>
        <p>The SDK printed every failure &mdash; a permissions denial, a quota wall, a missing record &mdash; as the same two words: &ldquo;service error.&rdquo; That uniform vagueness cost us hours, because two completely different failures looked identical in the logs. An error that hides its cause is worse than no error: it&rsquo;s a confident pointer in the wrong direction.</p>
      </Section>

      <h2>Layer one: a scan where there should have been a question</h2>
      <p>The actual timeout lived in the upload path. Before handing back an upload URL, the sync service did a quota check. A quota check should be a single cheap lookup: <span className="bold">how much is this account using?</span> &mdash; one read of a number we already keep.</p>

      <p>A recent change had quietly turned that question into a survey. To keep the usage number fresh, it reconciled the figure by <span className="bold white">listing every object the account owned</span> &mdash; on the upload path, on every upload. For a small account, invisible. For a large one, ruinous: the scan took longer than the service was allowed to run, so it never finished. And it got worse. The reconcile only recorded &ldquo;done&rdquo; on success, so a scan that timed out left no mark &mdash; which meant the <em>next</em> upload tried the same doomed scan, and the next. A permanent loop of timeouts, each one a 500, each one a failed sync.</p>

      <ArchFigure svg={SCAN} caption="Fig. 2 — a one-line question, answered by a full-bucket scan on every single upload" />

      <p>We took the scan off the hot path. The quota check went back to reading the number it already had &mdash; the survey moved out of the request entirely. Presigns dropped from <span className="bold">ten seconds (and failing)</span> to <span className="bold white">a hundred milliseconds.</span> We shipped it, watched the error logs go quiet, and called it fixed.</p>

      <h2>Declaring victory too early</h2>
      <p>It was not fixed. Two things had fooled us.</p>

      <p>The first was <span className="bold">metric lag.</span> The dashboards that should have confirmed the fix were averaging over a window that still contained the broken minutes. The graph looked like it was healing because old data was aging out, not because new data was healthy. We read a falling line as success when it was just arithmetic.</p>

      <p>The second was worse, and it&rsquo;s the most useful thing in this whole post.</p>

      <Section variant="rose">
        <h2><span className="bold">Layer three: the fix that never ran</span></h2>
        <p>Our deploy had updated the service&rsquo;s code, but production doesn&rsquo;t serve the latest code. It serves a <span className="bold white">published, frozen version</span>, reached through a stable pointer &mdash; an alias &mdash; with warm capacity held against it. We&rsquo;d updated the editable draft. The alias still pointed at the old frozen version. The fix was sitting in production, deployed, and <span className="bold">completely unreachable by a single real request.</span></p>
      </Section>

      <p>This is why the first two fixes appeared to do nothing: <em>they did nothing</em>, because nothing ran them. The moment we published the new version and moved the alias to point at it, the change took effect &mdash; and the presign timeouts vanished for real.</p>

      <ArchFigure svg={ALIAS} caption="Fig. 3 — the fix landed in the draft; every request ran the frozen version behind the alias" />

      <h2>Layer two: the list that couldn&rsquo;t finish</h2>
      <p>With presigns fast and the alias pointed correctly, sync started flowing &mdash; partially. Uploads landed. But the app still showed errors, and about half of all requests still timed out. There was a second, independent scan we hadn&rsquo;t touched.</p>

      <p>To sync, a device first <span className="bold">lists</span> what&rsquo;s already in the cloud, then uploads what&rsquo;s missing. That list paginates the account&rsquo;s entire log. And here we hit the real, underlying rot: this account&rsquo;s log had grown to roughly <span className="bold white">35,000 entries</span> &mdash; with exactly one snapshot. The log was never being <span className="bold">compacted.</span> Listing 35,000 objects took about twenty seconds, which &mdash; you&rsquo;ve learned the rhythm by now &mdash; is longer than the service was allowed to run.</p>

      <p>A healthy log is small: a recent snapshot, plus the handful of entries written since. Compaction is what keeps it that way &mdash; it folds old entries into a snapshot and truncates them. Without it, the log grows forever, and one ordinary day it grows past the point where you can even list it.</p>

      <ArchFigure svg={COMPACT} caption="Fig. 4 — compaction folds the log into a snapshot and truncates it; without it, the list eventually can't finish" />

      <p>The honest immediate fix was a stopgap: we raised the service&rsquo;s time limit so a twenty-second list could complete. That bought sync back. But it is explicitly a band-aid &mdash; the log keeps growing, twenty seconds creeps toward the ceiling, and the only durable fix is to make compaction keep the log small. We wrote that down as the next thing to do, in plain view, so the band-aid wouldn&rsquo;t be mistaken for a cure.</p>

      <h2>How we actually knew it was fixed</h2>
      <p>Three times we&rsquo;d believed a graph and been wrong. So for the last fix we stopped trusting metrics and went looking for ground truth. Because we run our own tools on LastDB, there was a direct way to get it: <span className="bold white">make a real write.</span> One small change in one of our apps produces a real sync &mdash; the exact request that had been failing all day.</p>

      <Section variant="sage">
        <h2><span className="bold">Verify against reality, not the dashboard</span></h2>
        <p>We made the write, watched a single real sync travel the whole path &mdash; list completes, upload lands, object appears in the store &mdash; and only then believed it. The final confirmation wasn&rsquo;t a chart. It was the sync indicator in the app going green. A metric tells you about a population; a real request tells you about <em>the thing in front of you.</em> When you&rsquo;re unsure, reach for the second one.</p>
      </Section>

      <h2>What we changed</h2>
      <ul>
        <li><span className="bold white">The scan came off the upload path.</span> The quota check reads the number we already keep; it never lists a bucket to answer a routine question.</li>
        <li><span className="bold white">The fix was published and the alias moved</span> &mdash; so the running version is actually the fixed one &mdash; then folded into our normal deploy so it can&rsquo;t drift back.</li>
        <li><span className="bold white">The time limit was raised as a safety net</span>, not a solution, with a note saying exactly that, pointing at the real fix.</li>
        <li><span className="bold white">Compaction</span> &mdash; keeping the log small so the list is fast &mdash; was filed as the priority follow-up, because everything above is downstream of it.</li>
      </ul>

      <h2>How we keep it from happening again</h2>
      <p>Every line of this outage was a known anti-pattern we&rsquo;d let slip onto a hot path. The fixes are specific; the rules are general.</p>

      <ul>
        <li><span className="bold white">Keep scans off hot paths.</span> A request that runs on every action must do bounded, predictable work. Expensive reconciliation belongs in the background &mdash; event-driven or scheduled &mdash; feeding a number the hot path can read in one shot. &ldquo;While we&rsquo;re here, let&rsquo;s also recompute the truth&rdquo; is how a fast path dies.</li>
        <li><span className="bold white">Bound every pagination.</span> Any loop that walks &ldquo;all of something&rdquo; will, given enough time, walk too much. Cap it, or hand back a cursor and let the caller paginate. Two separate timeouts in this incident were the same unbounded loop wearing different hats.</li>
        <li><span className="bold white">Compaction is not optional.</span> Append-only logs are wonderful until they&rsquo;re thirty-five thousand entries long. If a structure grows with use, something must shrink it on a schedule &mdash; and you should alert when it stops, long before a list can&rsquo;t finish.</li>
        <li><span className="bold white">Unmask your errors.</span> &ldquo;Service error&rdquo; is not an error message; it&rsquo;s a shrug. Surface the real cause &mdash; the status, the code, the resource &mdash; at the point of failure. The hours you save are your own.</li>
        <li><span className="bold white">Deploy where traffic actually goes.</span> If production serves a pinned version behind an alias, then updating the draft is theater. Make the deploy and the verification target the alias, so &ldquo;it&rsquo;s deployed&rdquo; and &ldquo;it&rsquo;s running&rdquo; are the same sentence.</li>
        <li><span className="bold white">Alarm on the wall before you hit it.</span> A quota, a cap, a time limit &mdash; each should page you on the approach, not on the crash. The transaction cap blew silently; the first we knew of it was the failures it caused.</li>
        <li><span className="bold white">A timeout is a safety net, not a fix.</span> Raising a limit so slow work can finish buys time and hides the slowness. Fine, as long as you say so out loud and point at the real repair. A band-aid mistaken for a cure is just a slower outage.</li>
        <li><span className="bold white">Tell &ldquo;a real problem&rdquo; from &ldquo;the user&rsquo;s problem.&rdquo;</span> We fixed two genuine bugs that weren&rsquo;t what anyone was hitting. Finding something broken is not the same as finding the break. Keep asking, against real traffic, until the symptom is actually gone.</li>
      </ul>

      <p>None of these are clever. That&rsquo;s the point: outages are rarely a failure of cleverness. They&rsquo;re ordinary shortcuts &mdash; a scan here, a missing bound there, a deploy aimed at the wrong target &mdash; that wait quietly until an account gets big enough to find them all at once. The work isn&rsquo;t avoiding the brilliant mistake. It&rsquo;s refusing the ordinary one, on the path that runs a thousand times a minute.</p>

      <p className="dim">More on how we build in the open: <Link to="/blog/building-lastdb-with-agents">our autonomous build loop</Link>, and <Link to="/blog/speedups-we-didnt-write">a week of speedups we didn&rsquo;t write</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
