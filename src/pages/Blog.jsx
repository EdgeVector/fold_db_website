import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import Label from '../components/Label';

const POSTS = [
  {
    slug: 'memory-first-disk-later',
    title: 'Memory First, Disk Later',
    date: '2026-07-30',
    blurb:
      'Our data measured under a gigabyte; reading one record took three seconds. In one working session we inverted the order of authority — memory becomes the primary, disk the diary. Point reads 2,970ms → 48ms, the write pipeline seconds → under twenty milliseconds, measured on clones of the real production database, incident included.',
  },
  {
    slug: 'last-store',
    title: 'Last Store',
    date: '2026-07-29',
    blurb:
      'LastDB no longer sits on a single opaque embedded bag for local bytes. Last Store is our own local engine: segment files, named collections, hash groups, and compact that actually reclaims disk. Why we left the previous store, what we measured, and what that means for you.',
  },
  {
    slug: 'checking-every-shelf',
    title: 'Checking Every Shelf',
    date: '2026-07-29',
    blurb:
      'Our own board and knowledge apps got slow. First theory: semantic search. Real bug: hot reads walked every hash group because their scan keys had no shelf label. What we measured, what we fixed, and the before/after — list ~11s → ~1s, card show ~8s → tens of ms.',
  },
  {
    slug: 'kanban-factory',
    title: 'The Factory Floor',
    date: '2026-07-16',
    blurb:
      'We built a live theater for our real Kanban board: cards hop lanes when work actually moves, scheduled jobs show up as a crew with personalities, and the only animation that fires is a real delta — not fake motion to look busy. Screen recording included.',
  },
  {
    slug: 'thin-tips-and-honest-history',
    title: 'Thin Tips and Honest History',
    date: '2026-07-16',
    blurb:
      'We slimmed current-field pointers, stopped writing a fat mutation log by default, and kept real per-key history as a small tip-version chain. Same reads and multi-device last-writer-wins; less bulk for free — and a clearer story about where the bytes go.',
  },
  {
    slug: 'the-thrash-was-in-the-order',
    title: 'The Thrash Was in the Order',
    date: '2026-07-15',
    blurb:
      'Re-enabled cloud sync after a memory incident; thrashed again. Status said download=0 and pending was thousands deep. We capped downloads, then the outbox — and never reached upload. Root cause: one tick downloaded every registered shared log before any personal upload, on a node with ~20 stale org registrations. What we changed (personal-first, per-tick scoped cap, no force-admit oversize) and the misreads to avoid next time.',
  },
  {
    slug: 'the-stop-work-order',
    title: 'The Stop-Work Order',
    date: '2026-07-13',
    blurb: 'A decommissioning report. Over three days we removed 275,958 lines of Rust — 61% of the total — while the agent fleet continued normal operations on everything else. The coordination mechanism was a single machine-readable stop-work order: a P0 Situation with named blocked actions that every agent checks before changing anything, plus Kanban cards to keep the removal small and revertable, Brain to keep the decisions on file, and a responder routine verifying progress every few hours — including the one card that slipped the fence and was moved back within minutes. The readings: −515,831 lines across 1,548 files, CI merge gate 2.5 → 1.2 minutes, full suite 11 → 6.3 minutes, and a release channel that went from a four-hour DMG pipeline with zero green tags in its final week to a seven-minute tarball.',
  },
  {
    slug: 'the-fix-was-subtraction',
    title: 'The Fix Was Subtraction',
    date: '2026-07-05',
    blurb: 'The slowest thing in our own tooling wasn’t a missing feature — it was a small tower of fixes, each one correct, each added to survive a mistake nobody had noticed. To read one record by name, the client hauled the whole collection over the wire, a thousand-plus rows, and kept one. Around that scan had grown a retry loop (the scan flaked), a fast-miss heuristic (retrying every absent row was expensive), and a retry cap (a fresh collection stalled the loop). Every layer defended the scan; none defended anything the reader needed. And the store served a keyed read the whole time — one row off the index in hundredths of a second. Replacing the scan didn’t tune the tower, it deleted it: 20s → 0.1s, and less code than before. On measuring per-phase before you name a cause — we blamed load with the CPU 62% idle, then the auth handshake that failed in 0.03s — and on how complexity accretes to defend a wrong assumption.',
  },
  {
    slug: 'read-me-dont-run-me',
    title: 'Read Me, Don’t Run Me',
    date: '2026-07-03',
    blurb: 'A Markdown code fence is a promise to a human — “here’s roughly the command I mean” — and an instruction to a machine: run this, verbatim. We build LastDB with a fleet of agents that read their own skill and card files and shell out the commands inside them, which means those files are documentation and script at once. Then prose lands inside a ```bash fence — a heading, a bullet, a card header — and the shell tries to run English. Sometimes it errors; sometimes it quietly “succeeds”; worst case an agent wraps the whole block in eval. The fix isn’t a rule in a style guide — it’s a lint that walks every shell fence line by line and refuses prose on a command line, before anything runs. Injection, moved up a floor: into the documents we hand to machines.',
  },
  {
    slug: 'declared-not-registered',
    title: 'Declared, Not Registered',
    date: '2026-07-03',
    blurb: 'A central schema registry is a phone call you have to make before you’re allowed to work: publish the shape upstream, wait for the world to acknowledge the name. We deleted the call. An app now declares its schema to its own node, and the name it gets back is exactly the one the central registry would assign — the same 64 characters — because a schema’s canonical name is a fingerprint of its shape, not a registrar’s decree. How content-addressing makes local declaration and central registration converge without ever consulting each other, the small per-app adapter the node keeps, and the honest last inch we’re still closing.',
  },
  {
    slug: 'the-second-binary',
    title: 'The Second Binary',
    date: '2026-07-03',
    blurb: 'Two builds of our dev tool, weeks of work apart, both reported v0.3.0 — and both were telling the truth. The investigation that started as "is the dev node up to date?" ended with "the dev node should not exist." Why a separate dev binary is a standing invitation to drift, how every reason for ours had quietly expired, and how the safety we liked about it — a playground that physically can\'t touch production data — survives the merge as construction, not discipline.',
  },
  {
    slug: 'self-hosting-the-forge',
    title: 'The Forge Comes Home',
    date: '2026-07-02',
    blurb: 'On June 23rd every merge in our org froze for hours — not a bug, a billing switch on someone else’s computer. We build a local-first database, and our own source of truth was the least local thing we owned. So we moved the monorepo to a self-hosted forge on our own disk — GitHub demoted to a warm daily mirror, twenty open PRs migrated in an evening, sixteen landed by the fleet within the hour. Plus the lesson the mirror taught us: its definition of tidy is total.',
  },
  {
    slug: 'machinery-listening-to-silence',
    title: 'Machinery Listening to Silence',
    date: '2026-07-02',
    blurb: 'Our database core carried a pub/sub event bus from an earlier design. In production it published exactly one kind of event — and ran five subscriber loops per boot, four of them waiting forever on events that never came. Worse, the unused machinery invented a bug: a committed, durable write returned to the client as an error. We deleted the whole thing — about fourteen hundred lines, seven perpetual tasks — and made the one real behavior a direct call. The cost of an abstraction you don’t use isn’t zero. It’s negative.',
  },
  {
    slug: 'the-parallelism-tax',
    title: 'The Parallelism Tax',
    date: '2026-07-02',
    blurb: 'We split our test suite into 267 parallel shards to make CI faster. It worked — and the monthly compute bill went up roughly a hundredfold, until our provider refused to start any more jobs. The catch nobody prices in: every parallel job re-pays a fixed setup cost before its first test, so parallelism buys wall-clock with money. The fix — run only what a change can touch — and the three guardrails that stop it recurring.',
  },
  {
    slug: 'n-plus-one-six-bugs',
    title: 'The N+1 That Looked Like Six Bugs',
    date: '2026-07-02',
    blurb: 'For three days our own database greeted us with a blank window, and we diagnosed six different bugs. There was one: a textbook N+1 in the data browser — one request per schema, hundreds at once — that blew through the file-descriptor budget macOS grants a GUI app and killed the embedded server seconds after every launch. The full descent: six confident wrong diagnoses, the restart reflex that re-armed the bug, the two-command A/B that isolated the descriptor budget, the five releases it took to ship one small fix — including a safety gate that failed because it matched — and the hostile-path proof at the end.',
  },
  {
    slug: 'argument-list-too-long',
    title: 'Argument List Too Long',
    date: '2026-07-01',
    blurb: 'A little script that had run cleanly a hundred times started failing every run — and the error came from the kernel, not our code. The data wasn’t wrong; there was just too much of it to hand over the way we were handing it. An invisible ceiling that scales in exact proportion to how well things are going, why the error blames the one innocent tool, and the three-line fix.',
  },
  {
    slug: 'prove-it-to-land',
    title: 'Prove It To Land',
    date: '2026-06-30',
    blurb: 'A green pull request is not proof the thing works — it is proof that some code compiled and nobody objected. When agents write and merge their own code, that gap is exactly where bugs ship from. So we closed it: nothing lands unless it proves the user-visible capability works, checked by something other than the author. The gate, and the two ways code lies about being finished.',
  },
  {
    slug: 'progress-that-reports-itself',
    title: 'Progress That Reports Itself',
    date: '2026-06-30',
    blurb: 'No one filled in a status report this week. We still know, to the feature, what shipped, what’s mid-build, and what one decision is sitting in someone’s queue — because it’s a rollup of a durable notes store, a card per feature, and the commits that actually landed, not a form anyone filled in.',
  },
  {
    slug: 'cant-not-wont',
    title: 'Can’t, Not Won’t',
    date: '2026-06-30',
    blurb: 'We wanted to hand a new user working AI chat with no API key to paste — which tempts you to run a server in the middle that reads every message. We threw that away. Here’s how we arrived at hosted chat we are physically unable to read: a blind relay that knows who but not what, a sealed enclave that knows what but not who, and the honest list of what you still have to trust.',
  },
  {
    slug: 'anatomy-of-a-sync-outage',
    title: 'Anatomy of a Sync Outage',
    date: '2026-06-28',
    blurb: 'Cloud sync went down, and the error pointed at the wrong thing entirely. What looked like one bug was three — stacked, each hiding the one behind it — and we fixed the first two before realizing neither was what users were hitting: a scan on a hot path, a list that couldn’t finish, and a fix that never ran. The whole descent, told straight, plus the rules we took from it.',
  },
  {
    slug: 'speedups-we-didnt-write',
    title: 'A week of speedups we didn’t write',
    date: '2026-06-28',
    blurb: 'The database got materially faster last week — one operation from ~4.4 seconds to ~10 milliseconds, another from ~7 hours to ~15 minutes. No human wrote those changes. The autonomous loop found the slow paths, wrote the fixes, wrote the benchmarks that prove they worked, and merged its own pull requests — including one win it found and chose not to take.',
  },
  {
    slug: 'evolving-a-live-schema',
    title: 'Against Migration',
    date: '2026-06-24',
    blurb: 'Adding a field to a live system is conventionally a crisis: a window, a script, a rollback plan. We added eight to a running application and convened none of it. The database was not consulted. The migration is not a technical necessity — it is a tax.',
  },
  {
    slug: 'building-lastdb-with-agents',
    title: 'Building LastDB with an autonomous agent loop',
    date: '2026-06-22',
    blurb: 'We let AI agents build LastDB toward goals we set — and merge their own pull requests — while we sleep. Here is the system that makes that safe instead of chaotic.',
  },
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog - LastDB</title>
        <meta name="description" content="How we build LastDB: engineering notes on our autonomous, North-Star-steered AI development loop. A local-first database, built in the open." />
        <meta property="og:title" content="Blog - LastDB" />
        <meta property="og:description" content="Engineering notes on how we build LastDB with an autonomous agent loop." />
        <link rel="canonical" href="https://thelastdb.com/blog" />
      </Helmet>

      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Blog</h1>
      <p>Notes on how we build LastDB &mdash; the process, in the open. <span className="dim">(We share how we work, not what&rsquo;s under the hood.)</span></p>

      <hr className="decorative-rule" aria-hidden="true" />

      <div className="blog-list">
        {POSTS.map(post => (
          <Card key={post.slug} className="blog-list-item">
            <p className="post-meta"><Label color="green">{post.date}</Label></p>
            <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.blurb}</p>
            <p><Link to={`/blog/${post.slug}`} className="link-btn">[Read &rarr;]</Link></p>
          </Card>
        ))}
      </div>
    </>
  );
}
