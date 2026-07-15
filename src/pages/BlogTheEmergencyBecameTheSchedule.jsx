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

// Fig 1 — the durable outbox pin: local writes rejected while upload sips.
const OUTBOX_PIN = `${SVG_OPEN('0 0 660 280')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">WHAT STATUS LOOKED LIKE</text>

  <rect x="36" y="48" width="140" height="56" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="106" y="72" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">LOCAL WRITE</text>
  <text x="106" y="90" text-anchor="middle" fill="#928374" font-size="10">app · agent · metric</text>

  <line x1="176" y1="76" x2="220" y2="76" stroke="#928374" stroke-width="1"/>
  <polygon points="222,76 213,72 213,80" fill="#928374"/>

  <rect x="224" y="48" width="180" height="56" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="314" y="72" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">DURABLE OUTBOX</text>
  <text x="314" y="90" text-anchor="middle" fill="#83a598" font-size="10">at cap · reject new work</text>

  <line x1="404" y1="76" x2="456" y2="76" stroke="#504945" stroke-width="1" stroke-dasharray="3 3"/>
  <rect x="458" y="48" width="166" height="56" fill="none" stroke="#504945" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="541" y="72" text-anchor="middle" fill="#504945" font-size="11" letter-spacing="1">CLOUD UPLOAD</text>
  <text x="541" y="90" text-anchor="middle" fill="#504945" font-size="10">1 entry / tick</text>

  <line x1="36" y1="140" x2="624" y2="140" stroke="#504945" stroke-width="1" stroke-dasharray="2 3"/>

  <text x="36" y="168" fill="#928374" font-size="11" letter-spacing="1.5">THE MATH OF THE EMERGENCY CAP</text>
  <rect x="36" y="184" width="588" height="64" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="330" y="212" text-anchor="middle" fill="#ebdbb2" font-size="12">100,000 ENTRIES &times; 1 / 30s  &asymp;  35 DAYS TO EMPTY</text>
  <text x="330" y="232" text-anchor="middle" fill="#928374" font-size="10">local writes stay rejected for the entire drain</text>
</svg>`;

// Fig 2 — false quota: estimate vs reality.
const FALSE_QUOTA = `${SVG_OPEN('0 0 660 270')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">QUOTA PRE-CHECK ON A BATCH PRESIGN</text>

  <rect x="36" y="48" width="260" height="100" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="166" y="78" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1">IF SIZE OMITTED</text>
  <text x="166" y="104" text-anchor="middle" fill="#ebdbb2" font-size="13">1,000 &times; 1 MiB</text>
  <text x="166" y="128" text-anchor="middle" fill="#83a598" font-size="12" letter-spacing="1">= 1 GiB ESTIMATE</text>

  <rect x="340" y="48" width="284" height="100" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="482" y="78" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1">WHAT WAS ACTUALLY USED</text>
  <text x="482" y="104" text-anchor="middle" fill="#ebdbb2" font-size="13">~90 MiB ON THE METER</text>
  <text x="482" y="128" text-anchor="middle" fill="#83a598" font-size="12" letter-spacing="1">OF 1 GiB FREE QUOTA</text>

  <line x1="330" y1="168" x2="330" y2="188" stroke="#928374" stroke-width="1"/>
  <polygon points="330,190 326,181 334,181" fill="#928374"/>

  <rect x="120" y="196" width="420" height="48" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="218" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="0.5">ERROR: QUOTA EXCEEDED</text>
  <text x="330" y="234" text-anchor="middle" fill="#928374" font-size="10">the gate used a default, not a measurement</text>
</svg>`;

// Fig 3 — adaptive: resources shape the cycle.
const ADAPTIVE = `${SVG_OPEN('0 0 660 260')}
  <text x="36" y="28" fill="#928374" font-size="11" letter-spacing="1.5">ONE UPLOAD CYCLE — RESOURCE-SHAPED</text>

  <rect x="36" y="52" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="91" y="80" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">RAM</text>
  <text x="91" y="100" text-anchor="middle" fill="#928374" font-size="10">vs kill line</text>

  <rect x="162" y="52" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="217" y="80" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">CPU</text>
  <text x="217" y="100" text-anchor="middle" fill="#928374" font-size="10">parallelism</text>

  <rect x="288" y="52" width="110" height="70" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="343" y="80" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">NETWORK</text>
  <text x="343" y="100" text-anchor="middle" fill="#928374" font-size="10">success rate</text>

  <line x1="404" y1="87" x2="448" y2="87" stroke="#83a598" stroke-width="1"/>
  <polygon points="450,87 441,83 441,91" fill="#83a598"/>

  <rect x="452" y="52" width="172" height="70" fill="url(#poche)" stroke="#83a598" stroke-width="1"/>
  <text x="538" y="78" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">THIS TICK</text>
  <text x="538" y="98" text-anchor="middle" fill="#83a598" font-size="10">byte budget + concurrency</text>

  <text x="36" y="160" fill="#928374" font-size="11" letter-spacing="1.5">TWO LAYERS OF TRUTH ABOUT SIZE</text>
  <rect x="36" y="176" width="280" height="52" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="176" y="198" text-anchor="middle" fill="#ebdbb2" font-size="11">PRESIGN GATE</text>
  <text x="176" y="216" text-anchor="middle" fill="#928374" font-size="10">honest estimate · untrusted</text>

  <rect x="344" y="176" width="280" height="52" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="484" y="198" text-anchor="middle" fill="#ebdbb2" font-size="11">AFTER PUT</text>
  <text x="484" y="216" text-anchor="middle" fill="#83a598" font-size="10">server measures the object</text>
</svg>`;

export default function BlogTheEmergencyBecameTheSchedule() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>The Emergency Became the Schedule - LastDB</title>
        <meta
          name="description"
          content="A durable sync outbox filled to the cap and local writes started failing. Status blamed quota at 90 MiB of 1 GiB free. The real limits were a one-entry emergency upload cap and a 1 MiB-per-entry default estimate on the presign gate."
        />
        <meta property="og:title" content="The Emergency Became the Schedule" />
        <meta
          property="og:description"
          content="Emergency upload caps and a false quota estimate pinned a healthy node. Resource-shaped throughput and honest size on the gate fixed the drain — without making the client the meter of record."
        />
        <link
          rel="canonical"
          href="https://thelastdb.com/blog/the-emergency-became-the-schedule"
        />
      </Helmet>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>

      <h1 className="tagline">The Emergency Became the Schedule</h1>
      <p className="post-meta dim">2026-07-15</p>

      <p className="bold white">
        The durable cloud-sync outbox hit its ceiling. New local writes failed before they hit
        storage, so unsynced work could not be dropped. Status said the free-tier quota was full —
        while the meter showed about 90&nbsp;MiB used of a 1&nbsp;GiB allowance. Upload was not
        racing a real resource. It was still obeying an emergency schedule we had never fully
        taken back.
      </p>

      <p>
        This is the sister story to{' '}
        <Link to="/blog/the-thrash-was-in-the-order" className="link-btn">
          The Thrash Was in the Order
        </Link>
        : same week of cloud-sync recovery, different wrong limiter. There the bug was{' '}
        <span className="bold white">what ran first</span> in a tick. Here it was{' '}
        <span className="bold white">how much of the upload work a tick was allowed to do</span>,
        and a quota gate that believed a default instead of a measurement.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Two systems, one stuck feeling</h2>

      <p>
        LastDB keeps cloud intent durable on the device: accepted local changes that need to go
        upland land in an outbox that survives restarts. That is the right shape when the network
        is slower than local work. The outbox also has a hard ceiling, so the node never commits
        a local mutation it cannot later account for as sync intent.
      </p>

      <p>
        When that ceiling fills, the product is honest and brutal: write fails. Metrics fail.
        Anything that must append to the outbox fails. The machine still answers reads. It just
        stops accepting the class of work that needs a free outbox slot.
      </p>

      <ArchFigure
        svg={OUTBOX_PIN}
        caption="Fig. 1 — Durable outbox at cap; upload still on the emergency sip"
      />

      <p>
        Status made it look like the cloud was full. The free-tier line was roughly ninety megabytes
        of a gigabyte. The error text still said quota exceeded. That combination is a special kind
        of gaslight: the numbers on the same screen disagree, and you still trust the red one.
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">What we thought</span>
        </h2>
        <p>
          First: raise the emergency upload cap a little (one entry per tick &rarr; a handful) so
          the outbox can drain in weeks instead of a geological era. Second: free some cloud space
          and try again. Both were partial truths. Neither named the limiter that was still
          inventing &ldquo;full.&rdquo;
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The emergency that never left</h2>

      <p>
        After a memory thrash on re-enable, we had clamped how much work a single sync tick could
        hold in RAM. That was correct. We also left upload throughput at an{' '}
        <span className="bold white">emergency entry count</span> — first one object per tick, later
        a small constant — so a fat batch of pending work could not decode itself into multi-gigabyte
        spikes again.
      </p>

      <p>
        Entry count is a terrible product rate limit once the per-object size gate exists. The real
        resources are free RAM under the process kill line, CPU for seal and concurrent puts, and
        how fast the network is actually finishing work. A constant of one (or eight) is the same
        class of mistake as treating &ldquo;max open connections&rdquo; as the thing that protects
        a server when the real scarce resource is workers.
      </p>

      <p>
        The arithmetic is unforgiving. An outbox of a hundred thousand entries at one successful
        object every thirty seconds is about a month of full drain — during which every new local
        write that needs a slot is refused. Raising the constant helps. It does not make the
        limiter honest.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">Lesson</span>
        </h2>
        <p>
          Emergency caps are for the incident window. If they stay after the size gate is real,
          they stop being safety and become schedule. Throughput should be derived from measured
          headroom and measured success — with a floor so recovery still moves, and a ceiling so a
          tick cannot own the machine.
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The quota that was not full</h2>

      <p>
        Even with more entries per tick, uploads could still die at the cloud gate with a free-tier
        quota error while the account meter sat well under the limit. The pre-check for a batch
        of upload URLs multiplies a per-entry size by the batch length. If the client does not send
        a size, the service assumes a large default — on the order of a megabyte per log object.
      </p>

      <ArchFigure
        svg={FALSE_QUOTA}
        caption="Fig. 2 — Default estimate invents a full free tier from a healthy meter"
      />

      <p>
        A thousand-entry chunk at one megabyte each is a gigabyte of{' '}
        <span className="bold white">fiction</span>. Add that fiction to a real ninety megabytes
        used and the free tier looks blown even though the real objects in the batch are a few
        kilobytes each. The error message reports the real meter and the imaginary sum in the same
        breath. You are not over quota. You are over a default.
      </p>

      <p>
        That is not the same as trusting the client for billing. The gate is admission: is there
        roughly room to try. After a successful put, the service measures the object (head of the
        stored body) and credits actual size. The estimate is allowed to be wrong in principle; it
        is not allowed to be a megabyte of silence when the client already sealed the bytes.
      </p>

      <Section variant="sage">
        <h2>
          <span className="bold">Lesson</span>
        </h2>
        <p>
          Separate <span className="bold white">gate</span> from{' '}
          <span className="bold white">meter</span>. The gate may take an untrusted estimate so
          presign stays cheap. The meter must measure. Honest clients should send the real sealed
          size so free tiers and paid tiers both fail for the right reasons — not because a
          default turned a healthy account into a full one.
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What we shipped</h2>

      <p>
        <span className="bold white">Resource-shaped upload.</span> Each sync tick re-derives a
        byte budget and a put concurrency from live process memory against the memory-guard kill
        line, available parallelism, and a smoothed success rate of recent uploads. Entry count
        becomes a derived ceiling, not the product knob. When the network is slow, the budget
        shrinks so the node does not fill RAM faster than the wire drains.
      </p>

      <p>
        <span className="bold white">Honest size on the gate.</span> Before asking for upload
        URLs, the device sends the maximum sealed ciphertext size in the batch. The free-tier
        pre-check multiplies that by batch length. A thousand small objects no longer look like a
        gigabyte of fiction.
      </p>

      <ArchFigure
        svg={ADAPTIVE}
        caption="Fig. 3 — RAM, CPU, and network set the tick; size on the gate is honest, size after put is measured"
      />

      <p>
        On a lived-in node, the difference is not subtle. Upload selection moved from a handful of
        entries per tick to thousands when headroom allowed. The false free-tier reject at
        &ldquo;~90&nbsp;MiB of 1&nbsp;GiB&rdquo; stopped showing up once the estimate matched the
        seal. The outbox actually moved — not in a constant of one forever, but in resource-sized
        bites that could recover.
      </p>

      <p>
        We also had to clear a real space problem first: a multi-gigabyte cloud snapshot sitting on
        a free tier that only allows a gigabyte. That is a different story (and a product
        conversation about free-tier snapshot policy). The point here is the two soft failures that
        made a healthy recovery look like permanent full: an emergency schedule and a default that
        lied about size.
      </p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>What we will not claim</h2>

      <p>
        We did not make it impossible for a hostile client to understate size on the gate. Presign
        happens before the body exists; the server cannot measure what has not been put. A hostile
        client can still win a single overshoot. The durable answers are: measure after put, refuse
        the next gate when the meter is truly full, and put hard object-size limits where the
        platform allows them. That is the honest design, not &ldquo;trust the client forever.&rdquo;
      </p>

      <p>
        We also did not make the free tier hold a multi-gigabyte full-store snapshot. Resource-shaped
        upload does not invent free cloud capacity. It only stops inventing full when you are not.
      </p>

      <Section variant="rose">
        <h2>
          <span className="bold">The reading</span>
        </h2>
        <p>
          If a recovery path still fails after you fixed the thrash, look for the emergency
          constant you forgot to retire — and for any gate that multiplies a default by batch
          size. The first turns safety into schedule. The second turns a healthy meter into a
          full account. Both feel like &ldquo;the cloud is broken.&rdquo; Both were us.
        </p>
      </Section>

      <hr className="decorative-rule" aria-hidden="true" />

      <p className="dim">
        Related: the cycle-order thrash that came first —{' '}
        <Link to="/blog/the-thrash-was-in-the-order">The Thrash Was in the Order</Link>
        {' · '}
        an earlier sync outage where the error said auth and the work was a bucket scan —{' '}
        <Link to="/blog/anatomy-of-a-sync-outage">Anatomy of a Sync Outage</Link>
        {' · '}
        how apps attach to a local node —{' '}
        <Link to="/blog/how-an-app-runs-on-lastdb">How an App Runs on LastDB</Link>.
      </p>

      <p>
        <Link to="/blog" className="link-btn">
          [&larr; Blog]
        </Link>
      </p>
    </article>
  );
}
