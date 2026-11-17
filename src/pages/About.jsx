import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArchFigure from '../components/ArchFigure';

// Hand-drawn figures in the site's diagram style: thin uniform strokes, hatch
// for stored data, joint marks, dimension lines, plain monospace labels.
// Each drawing is 400 units wide so its labels stay readable on a phone, and
// is capped at 600 pixels so they do not grow oversized on a wide screen.
// Colour and type come only from the variables in public/site.css.
const svgOpen = (height, hatchId, label) => `<svg viewBox="0 0 400 ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" style="width:100%;height:auto;max-width:600px;display:block;margin:0 auto;font-family:var(--mono)">
  <defs>
    <pattern id="${hatchId}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--line)" stroke-width="1"/>
    </pattern>
  </defs>`;

// 1 — the usual shape: every app keeps its own database of everyone.
const siloColumn = (cx, name) => `
  <rect x="${cx - 50}" y="14" width="100" height="32" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="${cx}" y="34" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1.5">${name}</text>
  <rect x="${cx - 2}" y="46" width="4" height="4" fill="var(--muted)"/>
  <line x1="${cx}" y1="50" x2="${cx}" y2="72" stroke="var(--muted)" stroke-width="1"/>
  <rect x="${cx - 50}" y="72" width="100" height="48" fill="url(#about-hatch-1)" stroke="var(--ink)" stroke-width="1"/>
  <rect x="${cx - 40}" y="82" width="80" height="28" fill="var(--surface)"/>
  <text x="${cx}" y="95" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1">DATABASE</text>
  <text x="${cx}" y="106" text-anchor="middle" fill="var(--muted)" font-size="9">of everyone</text>
  ${[-36, -12, 12, 36].map((dx, i) => `
  <line x1="${cx + dx}" y1="159" x2="${cx + dx / 3}" y2="120" stroke="var(--muted)" stroke-width="1"/>
  <circle cx="${cx + dx}" cy="164" r="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/>
  <text x="${cx + dx}" y="182" text-anchor="middle" fill="var(--muted)" font-size="8">${i + 1}</text>`).join('')}`;

const FIG_SILOS = `${svgOpen(232, 'about-hatch-1', 'Three apps. Each app has its own database that holds everyone, so the same four people are stored again in every app.')}
  ${siloColumn(70, 'APP A')}
  ${siloColumn(200, 'APP B')}
  ${siloColumn(330, 'APP C')}
  <line x1="20" y1="194" x2="20" y2="206" stroke="var(--muted)" stroke-width="1"/>
  <line x1="380" y1="194" x2="380" y2="206" stroke="var(--muted)" stroke-width="1"/>
  <line x1="20" y1="200" x2="380" y2="200" stroke="var(--muted)" stroke-width="1"/>
  <text x="200" y="222" text-anchor="middle" fill="var(--muted)" font-size="9.5" letter-spacing="0.5">THE SAME FOUR PEOPLE, HELD AGAIN BY EVERY APP</text>
</svg>`;

// 2 — the LastDB shape: one node per person, a shared database on both nodes.
const personNode = (x, who, role) => `
  <circle cx="${x + 22}" cy="20" r="5" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/>
  <text x="${x + 34}" y="24" fill="var(--ink)" font-size="10" letter-spacing="1">${who}</text>
  <text x="${x + 150}" y="24" text-anchor="end" fill="var(--muted)" font-size="9">${role}</text>
  <rect x="${x}" y="36" width="150" height="132" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="${x + 75}" y="54" text-anchor="middle" fill="var(--muted)" font-size="9" letter-spacing="1.5">LASTDB NODE</text>
  <rect x="${x + 14}" y="64" width="122" height="36" fill="url(#about-hatch-2)" stroke="var(--muted)" stroke-width="1"/>
  <rect x="${x + 27}" y="73" width="96" height="18" fill="var(--surface)"/>
  <text x="${x + 75}" y="86" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1">PRIVATE</text>
  <rect x="${x + 14}" y="114" width="122" height="36" fill="url(#about-hatch-2)" stroke="var(--accent)" stroke-width="1"/>
  <rect x="${x + 27}" y="123" width="96" height="18" fill="var(--surface)"/>
  <text x="${x + 75}" y="136" text-anchor="middle" fill="var(--accent)" font-size="10" letter-spacing="1">FAMILY-NOTES</text>
  <rect x="${x + 73}" y="150" width="4" height="4" fill="var(--accent)"/>
  <line x1="${x + 75}" y1="154" x2="${x + 75}" y2="206" stroke="var(--accent)" stroke-width="1"/>
  <rect x="${x + 73}" y="206" width="4" height="4" fill="var(--accent)"/>`;

const FIG_NODES = `${svgOpen(304, 'about-hatch-2', 'Ana and Ben each run their own LastDB node. Each node holds a private database and a copy of the shared database family-notes. The two copies stay in step through a cloud that holds only encrypted bytes it cannot read.')}
  ${personNode(16, 'ANA', 'publisher')}
  ${personNode(234, 'BEN', 'invited')}
  <rect x="60" y="210" width="280" height="46" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="200" y="230" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1.5">THE CLOUD</text>
  <text x="200" y="245" text-anchor="middle" fill="var(--muted)" font-size="9">encrypted bytes it cannot read</text>
  <line x1="16" y1="268" x2="16" y2="280" stroke="var(--muted)" stroke-width="1"/>
  <line x1="384" y1="268" x2="384" y2="280" stroke="var(--muted)" stroke-width="1"/>
  <line x1="16" y1="274" x2="384" y2="274" stroke="var(--muted)" stroke-width="1"/>
  <text x="200" y="295" text-anchor="middle" fill="var(--muted)" font-size="9.5" letter-spacing="0.5">ONE NODE PER PERSON — NO DATABASE OF EVERYONE</text>
</svg>`;

// 3 — what sits where on one person's Mac, and what the cloud holds.
const layerApp = (x, name, note) => `
  <rect x="${x}" y="14" width="112" height="36" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="${x + 56}" y="30" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1">${name}</text>
  <text x="${x + 56}" y="43" text-anchor="middle" fill="var(--muted)" font-size="9">${note}</text>
  <rect x="${x + 54}" y="50" width="4" height="4" fill="var(--muted)"/>
  <line x1="${x + 56}" y1="54" x2="${x + 56}" y2="72" stroke="var(--muted)" stroke-width="1"/>`;

const layerDb = (x, name) => `
  <rect x="${x}" y="126" width="92" height="36" fill="url(#about-hatch-3)" stroke="var(--muted)" stroke-width="1"/>
  <rect x="${x + 11}" y="135" width="70" height="18" fill="var(--surface)"/>
  <text x="${x + 46}" y="148" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1">${name}</text>`;

const FIG_LAYERS = `${svgOpen(326, 'about-hatch-3', 'Apps talk over a Unix socket to one LastDB node on the Mac. The node holds named databases: one private, one for family, one for a team. An optional link goes to the cloud, which holds encrypted copies for backup and sharing.')}
  ${layerApp(16, 'BRAIN', 'notes')}
  ${layerApp(144, 'LASTSECRETS', 'credentials')}
  ${layerApp(272, 'YOUR APP', 'same requests')}
  <line x1="72" y1="72" x2="328" y2="72" stroke="var(--muted)" stroke-width="1"/>
  <line x1="200" y1="72" x2="200" y2="92" stroke="var(--muted)" stroke-width="1"/>
  <rect x="198" y="92" width="4" height="4" fill="var(--muted)"/>
  <text x="210" y="87" fill="var(--muted)" font-size="9" letter-spacing="1">UNIX SOCKET</text>
  <rect x="40" y="96" width="320" height="104" fill="none" stroke="var(--ink)" stroke-width="1"/>
  <text x="200" y="115" text-anchor="middle" fill="var(--ink)" font-size="11" letter-spacing="1.5">LASTDB NODE</text>
  ${layerDb(56, 'PRIVATE')}
  ${layerDb(154, 'FAMILY')}
  ${layerDb(252, 'TEAM')}
  <text x="200" y="185" text-anchor="middle" fill="var(--muted)" font-size="9">named databases, on this Mac's disk</text>
  <rect x="198" y="200" width="4" height="4" fill="var(--muted)"/>
  <line x1="200" y1="204" x2="200" y2="238" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="210" y="225" fill="var(--muted)" font-size="9" letter-spacing="1">OPT-IN</text>
  <rect x="70" y="238" width="260" height="46" fill="none" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="200" y="258" text-anchor="middle" fill="var(--ink)" font-size="10" letter-spacing="1.5">THE CLOUD</text>
  <text x="200" y="273" text-anchor="middle" fill="var(--muted)" font-size="9">encrypted copies for backup and sharing</text>
  <line x1="40" y1="294" x2="40" y2="306" stroke="var(--muted)" stroke-width="1"/>
  <line x1="360" y1="294" x2="360" y2="306" stroke="var(--muted)" stroke-width="1"/>
  <line x1="40" y1="300" x2="360" y2="300" stroke="var(--muted)" stroke-width="1"/>
  <text x="200" y="320" text-anchor="middle" fill="var(--muted)" font-size="9.5" letter-spacing="0.5">READS AND WRITES HAPPEN ON THE MAC</text>
</svg>`;

export default function About() {
  return (
    <>
      <Helmet>
        <title>About - LastDB</title>
        <meta name="description" content="Why LastDB exists: a multi-user app usually starts with one database that holds everyone. LastDB starts with one node per person, on their own Mac, and lets people share whole databases by invitation." />
        <meta property="og:title" content="About - LastDB" />
        <meta property="og:description" content="The problem with a database of everyone, the LastDB model of one node per person, and the principles behind it." />
        <link rel="canonical" href="https://thelastdb.com/about" />
      </Helmet>

      {/* HERO */}
      <section className="fg-hero">
        <div className="fg-eyebrow">About &middot; why LastDB exists</div>
        <h1>Bring the app to the data, <em>not the data to the app.</em></h1>
        <div className="fg-hero-row">
          <p>
            A multi-user app usually starts with one database that holds everyone.
            LastDB starts with one person and one node, on their own Mac, and lets people share from there.
          </p>
          <div className="fg-actions">
            <Link to="/#install" className="fg-btn fg-btn-primary">Install LastDB</Link>
            <Link to="/apps" className="fg-btn">See the apps</Link>
          </div>
        </div>
      </section>

      {/* 01 PROBLEM */}
      <section className="fg-section" id="problem">
        <div className="fg-rail">01 &middot; The problem</div>
        <div className="fg-body">
          <h2>Every app builds its own database of everyone.</h2>
          <div className="fg-figure fg-figure-inline">
            <ArchFigure svg={FIG_SILOS} caption="Fig. 1 — One database of everyone, in every app" />
          </div>
          <div className="fg-two">
            <p>
              To let people use an app together, the developer builds one place that holds all of them.
              The developer runs that database, writes the sync, and holds every user&rsquo;s data
              in an account that must be protected.
            </p>
            <p>
              The next app does all of it again. People end up with one copy of their life in each app,
              and own none of them. No single system holds the full picture, and the person it describes
              controls no part of it.
            </p>
          </div>
        </div>
      </section>

      {/* 02 MODEL */}
      <section className="fg-section" id="model">
        <div className="fg-rail">02 &middot; The LastDB model</div>
        <div className="fg-body">
          <h2>One node per person. Shared databases between people.</h2>
          <div className="fg-figure fg-figure-inline">
            <ArchFigure svg={FIG_NODES} caption="Fig. 2 — Each person holds their own data and shares a whole database" />
          </div>
          <div className="fg-two">
            <p>
              Each person runs one LastDB on their own Mac. That is their node. Apps become clients
              of the person&rsquo;s database and stop being the owners of the data. That inversion is the thesis:
              the app comes to the data.
            </p>
            <p>
              A node holds several named databases, some private and some shared. One person, the publisher,
              shares a whole database with other people by invitation. A family, a team, or a club is a
              database that its members all hold. No database holds everyone.
            </p>
          </div>
          <p className="fg-note">
            An app built this way has no backend. The developer&rsquo;s code runs on each person&rsquo;s machine,
            next to the data, and the developer hosts nothing.
          </p>
        </div>
      </section>

      {/* 03 LAYERS */}
      <section className="fg-section" id="architecture">
        <div className="fg-rail">03 &middot; Layers</div>
        <div className="fg-body">
          <h2>The data lives on the Mac. The cloud carries encrypted copies.</h2>
          <div className="fg-figure fg-figure-inline">
            <ArchFigure svg={FIG_LAYERS} caption="Fig. 3 — Apps, the node, and the cloud" />
          </div>
          <div className="fg-two">
            <p>
              The node is one background service. Apps read and write it by key over a local Unix socket.
              Reads and writes happen on the Mac, so an app for one person needs no account and no network.
            </p>
            <p>
              The cloud is a central service, and it is optional until a person wants backup or sharing.
              It stores and passes along end-to-end encrypted bytes that it cannot read. It runs none of the app&rsquo;s code.
              Backup is set up with <span className="bold">lastdb backup connect</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 04 PRINCIPLES */}
      <section className="fg-section" id="principles">
        <div className="fg-rail">04 &middot; Principles</div>
        <div className="fg-body">
          <h2>Four rules the design follows.</h2>
          <div className="fg-cards">
            <div className="fg-cardx fg-c1">
              <small>01 &middot; OWNERSHIP</small>
              <h3>The person holds the data.</h3>
              <p>Apps are clients of a person&rsquo;s database, not keepers of copies. Swap an app and the data stays where it was.</p>
            </div>
            <div className="fg-cardx fg-c2">
              <small>02 &middot; ORDER</small>
              <h3>One person first, then many.</h3>
              <p>Declare a schema, write, and read by key. That is a complete app for one person. To share, the app sends the same requests, addressed to a shared database.</p>
            </div>
            <div className="fg-cardx fg-c3">
              <small>03 &middot; SHARING</small>
              <h3>Share on purpose.</h3>
              <p>A database is shared whole, by invitation. Everyone invited can read it. The publisher grants writing by schema and can revoke it.</p>
            </div>
            <div className="fg-cardx fg-c4">
              <small>04 &middot; THE CLOUD</small>
              <h3>The cloud carries. It does not read.</h3>
              <p>The cloud holds encrypted bytes and runs no app code. The checks on shared data run on the publisher&rsquo;s own LastDB.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 HOW IT WORKS */}
      <section className="fg-section" id="how-it-works">
        <div className="fg-rail">
          05 &middot; How it works
          <p>The short version. The developer guide has the requests.</p>
        </div>
        <div className="fg-body">
          <dl className="fg-faq">
            <div>
              <dt>Schemas and keys</dt>
              <dd>
                A schema names its fields, its primary key, and any named alternate keys. A record holds one value
                for each field. Every read names a key, either a hash or a hash plus a range. There is no SQL.
              </dd>
            </div>
            <div>
              <dt>Apps</dt>
              <dd>
                An app is a program that talks to the node over a local Unix socket. Brain and LastSecrets are apps.
                You can write your own in any language that can send HTTP over a Unix socket.
              </dd>
            </div>
            <div>
              <dt>Sharing</dt>
              <dd>
                The recipient exports a contact file with <span className="bold">lastdb share contact</span>.
                The publisher can check it against a key they already trust with{' '}
                <span className="bold">lastdb share verify-contact</span>, then writes an invitation that only
                that recipient can open. A change from another person goes, encrypted, to the publisher&rsquo;s LastDB,
                which checks it against the sharing rules and the schema before anyone else receives it.
              </dd>
            </div>
            <div>
              <dt>Publishing</dt>
              <dd>
                An app has no server. A release is a signed entry in the App Registry. Each person installs the app
                by name, and it runs on their Mac.
              </dd>
            </div>
            <div>
              <dt>Search</dt>
              <dd>
                LastSeek is the search service. It keeps a semantic index beside the node, outside the database.
                It is coming, and it is not in the App Registry yet. Until it is, Brain finds notes by name and by keyword.
              </dd>
            </div>
          </dl>
          <p className="fg-more"><Link to="/developer">Read the developer guide &rarr;</Link></p>
        </div>
      </section>

      {/* 06 STATUS */}
      <section className="fg-section" id="status">
        <div className="fg-rail">06 &middot; Status</div>
        <div className="fg-body">
          <h2>Alpha, on macOS.</h2>
          <div className="fg-two">
            <p>
              LastDB is alpha and in active development. It runs on macOS on Apple Silicon only, and it is not ready
              for production. The starter apps in the App Registry are Brain and LastSecrets.
            </p>
            <p>
              The database and the apps are free. Publishing an app needs a paid Exemem subscription;
              Exemem is the cloud service LastDB uses for backup and sharing. People who use a published app
              pay nothing to use it.
            </p>
          </div>
          <p className="fg-more">
            <Link to="/#install">Install on the home page &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/apps">Apps &rarr;</Link>{' '}&nbsp;{' '}
            <Link to="/developer">Developer &rarr;</Link>{' '}&nbsp;{' '}
            <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer">Paper &rarr;</a>
          </p>
        </div>
      </section>
    </>
  );
}
