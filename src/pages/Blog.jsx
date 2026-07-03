import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import Label from '../components/Label';

const POSTS = [
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
