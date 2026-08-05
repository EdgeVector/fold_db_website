import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import Label from '../components/Label';

/**
 * Feature Blog — what you can install and use today.
 *
 * Sibling of the Dev Blog (/blog), which is engineering notes about how we
 * build LastDB. Posts here are user-facing: get it, open it, use it.
 */
const POSTS = [
  {
    slug: 'kanban-factory',
    title: 'Kanban Factory',
    date: '2026-08-05',
    tag: 'DASHBOARD',
    blurb:
      'A live floor view of your own Kanban board. Cards move when your work actually moves, scheduled jobs show up as a crew with names, and nothing animates unless something really changed. Clone it, run one command, open a browser tab. Read-only against your board.',
  },
];

export default function Features() {
  return (
    <>
      <Helmet>
        <title>Feature Blog - LastDB</title>
        <meta
          name="description"
          content="Features you can install and use on LastDB: what each one does, how to get it, and how to open it. Written for people who want to run the thing, not read about how it was built."
        />
        <meta property="og:title" content="Feature Blog - LastDB" />
        <meta
          property="og:description"
          content="What to install, how to open it, what it does. One post per shipped LastDB feature."
        />
        <link rel="canonical" href="https://thelastdb.com/features" />
      </Helmet>

      <p><Link to="/" className="link-btn">[&larr; Home]</Link></p>

      <h1 className="tagline">Feature Blog</h1>
      <p>
        Things you can install and use today. Each post says what the feature
        does, how to get it, and how to open it &mdash; in that order.
      </p>
      <p className="dim">
        Looking for engineering notes on how LastDB is built? That&rsquo;s the{' '}
        <Link to="/blog">Dev Blog</Link>.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <div className="blog-list">
        {POSTS.map(post => (
          <Card key={post.slug} className="blog-list-item">
            <p className="post-meta">
              <Label color="green">{post.date}</Label>{'  '}
              <Label color="blue">{post.tag}</Label>
            </p>
            <h2><Link to={`/features/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.blurb}</p>
            <p><Link to={`/features/${post.slug}`} className="link-btn">[Read &rarr;]</Link></p>
          </Card>
        ))}
      </div>
    </>
  );
}
