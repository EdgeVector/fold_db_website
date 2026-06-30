import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import Label from '../components/Label';

const POSTS = [
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
