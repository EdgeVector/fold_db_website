import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import Label from '../components/Label';

const POSTS = [
  {
    slug: 'do-you-have-an-api-key',
    title: 'Key, Llama, Gateway',
    date: '2026-06-24',
    blurb: 'Two fashionable ways to greet a user, both insults: ask for an API key, or ask them to download a llama. The same gesture — the software handing you its unfinished work. We take the third position: a gateway. Ease without surrender.',
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
