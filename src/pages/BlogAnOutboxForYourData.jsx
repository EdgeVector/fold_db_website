import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored data, dimension lines, joint marks, mono caps labels,
// a single accent for the path under consent). Inline SVG — no auto-layout.
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

// 1 — staging gate: nothing leaves until you approve; reject sends nothing.
const OUTBOX = `${SVG_OPEN('0 0 680 270')}
  <rect x="24" y="112" width="120" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="84" y="138" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">STAGE</text>
  <text x="84" y="156" text-anchor="middle" fill="#928374" font-size="10">pick the fields</text>

  <line x1="144" y1="140" x2="194" y2="140" stroke="#928374" stroke-width="1"/>
  <polygon points="196,140 187,136 187,144" fill="#928374"/>

  <rect x="196" y="100" width="160" height="80" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="276" y="134" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">OUTBOX</text>
  <text x="276" y="152" text-anchor="middle" fill="#928374" font-size="10">pending</text>
  <text x="276" y="167" text-anchor="middle" fill="#928374" font-size="10">nothing sent yet</text>

  <line x1="356" y1="140" x2="402" y2="140" stroke="#928374" stroke-width="1"/>
  <rect x="402" y="136" width="8" height="8" fill="#928374"/>
  <text x="406" y="124" text-anchor="middle" fill="#928374" font-size="9" letter-spacing="2">YOU DECIDE</text>

  <polyline points="410,140 458,140 458,84 518,84" fill="none" stroke="#83a598" stroke-width="1"/>
  <polygon points="520,84 511,80 511,88" fill="#83a598"/>
  <text x="468" y="74" fill="#83a598" font-size="10" letter-spacing="1.5">APPROVE</text>
  <rect x="520" y="60" width="136" height="50" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="588" y="82" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RECIPIENT</text>
  <text x="588" y="99" text-anchor="middle" fill="#83a598" font-size="10">encrypted send</text>

  <polyline points="410,140 458,140 458,206 518,206" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>
  <text x="468" y="196" fill="#928374" font-size="10" letter-spacing="1.5">REJECT</text>
  <text x="524" y="202" fill="#928374" font-size="11" letter-spacing="0.5">DISCARDED</text>
  <text x="524" y="217" fill="#928374" font-size="10">nothing left the node</text>
</svg>`;

// 2 — a slice carries the fields you chose, not the database.
const SLICE = `${SVG_OPEN('0 0 660 256')}
  <text x="40" y="46" fill="#928374" font-size="11" letter-spacing="1.5">ON YOUR NODE</text>
  <rect x="40" y="58" width="210" height="156" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <rect x="58" y="74" width="174" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="58" y="100" width="174" height="20" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="58" y="126" width="174" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <rect x="58" y="152" width="174" height="20" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="58" y="178" width="174" height="20" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="145" y="88" text-anchor="middle" fill="#928374" font-size="10">field</text>
  <text x="145" y="114" text-anchor="middle" fill="#83a598" font-size="10">field &mdash; chosen</text>
  <text x="145" y="140" text-anchor="middle" fill="#928374" font-size="10">field</text>
  <text x="145" y="166" text-anchor="middle" fill="#83a598" font-size="10">field &mdash; chosen</text>
  <text x="145" y="192" text-anchor="middle" fill="#928374" font-size="10">field</text>

  <line x1="262" y1="136" x2="396" y2="136" stroke="#83a598" stroke-width="1"/>
  <polygon points="398,136 389,132 389,140" fill="#83a598"/>
  <text x="330" y="126" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1">only the chosen</text>

  <text x="410" y="46" fill="#83a598" font-size="11" letter-spacing="1.5">THE SLICE</text>
  <rect x="410" y="58" width="210" height="156" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="428" y="100" width="174" height="20" fill="none" stroke="#83a598" stroke-width="1"/>
  <rect x="428" y="152" width="174" height="20" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="515" y="114" text-anchor="middle" fill="#ebdbb2" font-size="10">field</text>
  <text x="515" y="166" text-anchor="middle" fill="#ebdbb2" font-size="10">field</text>
  <text x="515" y="200" text-anchor="middle" fill="#928374" font-size="10">the rest stays home</text>
</svg>`;

// 3 — consent runs both ways: no subscription without a valid, signed invite.
const CONSENT = `${SVG_OPEN('0 0 660 226')}
  <rect x="40" y="78" width="150" height="68" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="115" y="108" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">OWNER</text>
  <text x="115" y="126" text-anchor="middle" fill="#928374" font-size="10">issues the invite</text>

  <rect x="470" y="78" width="150" height="68" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="545" y="108" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">RECIPIENT</text>
  <text x="545" y="126" text-anchor="middle" fill="#928374" font-size="10">accepts it</text>

  <line x1="190" y1="100" x2="468" y2="100" stroke="#83a598" stroke-width="1"/>
  <polygon points="470,100 461,96 461,104" fill="#83a598"/>
  <text x="330" y="90" text-anchor="middle" fill="#83a598" font-size="10" letter-spacing="1.5">SIGNED INVITE</text>

  <line x1="470" y1="126" x2="192" y2="126" stroke="#928374" stroke-width="1"/>
  <polygon points="190,126 199,122 199,130" fill="#928374"/>
  <text x="330" y="142" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="1.5">ACCEPT</text>

  <line x1="330" y1="170" x2="330" y2="184" stroke="#928374" stroke-width="1"/>
  <text x="330" y="200" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="0.5">NO VALID, SIGNED INVITE &mdash; NO SUBSCRIPTION</text>
</svg>`;

export default function BlogAnOutboxForYourData() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>An Outbox for Your Data - LastDB</title>
        <meta name="description" content="Sharing data with someone else is normally fire-and-forget: a permission flips and bytes leave your machine before you've decided which bytes. We gave sharing an outbox. Nothing leaves your node until you stage it, see exactly what's in it, and approve — or reject, and nothing was ever sent." />
        <meta property="og:title" content="An Outbox for Your Data" />
        <meta property="og:description" content="Consent at the moment of departure: a staging outbox for cross-user sharing, where you review the exact slice before a single byte leaves your node." />
        <link rel="canonical" href="https://thelastdb.com/blog/an-outbox-for-your-data" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">An Outbox for Your Data</h1>
      <p className="post-meta dim">2026-06-29</p>

      <p className="bold white">Sharing data with someone else is, almost everywhere, fire-and-forget. You flip a permission, a row syncs, and the bytes are gone &mdash; in motion before you have finished the thought of <em>which</em> bytes. You learn what you shared the way you learn about a leak: afterward, by audit. We gave sharing an <span className="white">outbox</span>. Nothing leaves your node until you stage it, look at exactly what is in it, and approve it &mdash; or reject it, and nothing was ever sent.</p>

      <p>LastDB is a local-first database: your data lives on your machine, not in someone else&rsquo;s cloud by default. That makes sharing a deliberate act rather than the ambient condition. So we built the act to match &mdash; not a switch that opens a pipe, but a step that stages a parcel and waits for you.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Staging, not sending</h2>
      <p>When you decide to share, LastDB does not send. It <span className="bold">stages</span>. The thing you want to give &mdash; a saved query, a view, a handful of fields &mdash; is gathered into a self-contained parcel we call a <span className="bold">slice</span>, and that slice is parked in a pending outbox. No network send has happened. The slice sits there, addressed but unsent, until the one person who can authorize its departure &mdash; you, the owner &mdash; says so.</p>

      <ArchFigure svg={OUTBOX} caption="Fig. 1 — staged, then held; approve sends, reject sends nothing" />

      <Section variant="sage">
        <h2><span className="bold">Approve, or reject</span></h2>
        <p>A pending delivery has exactly two exits. <span className="bold">Approve</span> it, and the slice goes out over the encrypted share path to its recipient. <span className="bold">Reject</span> it, and it is discarded &mdash; not recalled, not deleted-after-the-fact, but never sent in the first place. The default state of your data is <span className="bold">at rest, with you</span>. Departure is the exception, and the exception requires a yes.</p>
      </Section>

      <h2>You review the actual parcel</h2>
      <p>An approve gate is only as honest as what it lets you see. A checkbox that says &ldquo;share my data?&rdquo; is not consent; it is a dare. So the pending item shows you the <span className="bold">contents</span> &mdash; which schemas, and the exact fields carried for each. A slice is not your database in miniature. It is precisely the fields you chose, lifted out and packaged; everything you did not choose stays home, untouched and unmentioned.</p>

      <ArchFigure svg={SLICE} caption="Fig. 2 — a slice carries the fields you picked, not the whole store" />

      <p>This is the part that the fire-and-forget model cannot offer, because by the time it could show you the parcel, the parcel is already gone. Review is only meaningful <em>before</em> departure. The outbox exists so that &ldquo;what am I about to share?&rdquo; is a question with an answer, asked at the one moment the answer can still change the outcome.</p>

      <h2>Consent runs both ways</h2>
      <p>An outbox protects the sender. The other half of the problem is the receiver: you should not be able to enroll someone into a flow of your data without their say-so either. So a subscription only comes into being on a <span className="bold">valid, signed invite</span>. The owner issues an invite; the recipient accepts it; and the acceptance only forms a subscription if the invite is well-formed and genuinely signed by the owner. A forged or malformed invite creates nothing.</p>

      <ArchFigure svg={CONSENT} caption="Fig. 3 — a subscription forms only on a valid, signed invite" />

      <p>The symmetry is the point. You cannot be made to send what you have not approved, and you cannot be made to receive from a handshake you did not complete. Consent sits on both ends of the wire, not just the one that happens to be convenient.</p>

      <Section variant="rose">
        <h2><span className="bold">Consent belongs at the moment of departure</span></h2>
        <p>Most systems put the consent decision far from the act &mdash; in a settings page, a role grant, a policy written months ago and forgotten. The data then moves on its own schedule, and the gap between &ldquo;I once allowed this&rdquo; and &ldquo;this just left&rdquo; is where surprises live. The outbox closes that gap. The decision and the departure are the <span className="bold">same event</span>: you see the parcel, and you let it go, in one motion. Nothing is in flight that you did not just look at.</p>
      </Section>

      <p>None of this is exotic. It is the oldest idea in correspondence &mdash; you write the letter, you read it over, you decide to mail it &mdash; applied to a database that, unlike most, still treats your data as <span className="bold">yours</span> right up until the second it isn&rsquo;t.</p>

      <p className="dim">More on how LastDB keeps the shape of your data in your hands: <Link to="/blog/evolving-a-live-schema">Against Migration</Link>. Built with <Link to="/apps">open-source apps on LastDB</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
