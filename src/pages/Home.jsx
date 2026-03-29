import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Card from '../components/Card';
import Label from '../components/Label';
import AsciiTitle from '../components/AsciiTitle';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FoldDB - Your data. Your connections. Your terms.</title>
        <meta name="description" content="FoldDB gives you a private, encrypted database on your device. Import your Apple data, back up to the cloud, and connect with people — all without giving up control." />
        <meta property="og:title" content="FoldDB - Your data. Your connections. Your terms." />
        <meta property="og:description" content="A personal database you own. Import Apple data, encrypted cloud backup, privacy-preserving discovery. Download for Mac." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://folddb.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="FoldDB - Your data. Your connections. Your terms." />
        <meta name="twitter:description" content="A personal database you own. Import Apple data, encrypted cloud backup, privacy-preserving discovery." />
        <link rel="canonical" href="https://folddb.com" />
      </Helmet>

      <AsciiTitle />

      {/* Hero */}
      <div className="hero">
        <h1 className="hero-headline">Your data. Your connections. Your terms.</h1>
        <p className="hero-sub">
          FoldDB is a personal database that lives on your device.
          Import your data, encrypt everything, find your people &mdash;
          without handing control to any platform.
        </p>
        <div className="hero-cta">
          <a href="https://github.com/shiba4life/fold_db/releases/latest" target="_blank" rel="noreferrer" className="btn-primary">Download for Mac</a>
          <span className="dim hero-or">or</span>
          <code className="brew-cmd">brew install --cask folddb</code>
        </div>
      </div>

      <hr className="decorative-rule" aria-hidden="true" />

      {/* Demo Video */}
      <Section variant="slate" id="demo">
        <h2><span className="bold">SEE IT IN ACTION</span></h2>
        <div className="video-embed">
          <div className="video-placeholder">
            <span className="dim">[Demo video coming soon]</span>
          </div>
        </div>
      </Section>

      {/* Section 1: Import Apple Data */}
      <Section variant="sage" id="import">
        <h2><span className="bold">IMPORT YOUR APPLE DATA</span></h2>

        <div className="grid-2">
          <div>
            <p>Your iPhone already has years of data &mdash; contacts, messages, health records, photos, notes. FoldDB imports it all into a single, private database on your Mac.</p>
            <p><span className="bold white">No cloud upload. No third-party access. Just your data, organized and searchable.</span></p>
            <p>Supported sources:</p>
            <pre className="compare-table">{
`  `}<span style={{color:'#b8bb26'}}>Contacts</span>{`       address book, relationships
  `}<span style={{color:'#b8bb26'}}>Messages</span>{`       iMessage + SMS history
  `}<span style={{color:'#b8bb26'}}>Health</span>{`         workouts, vitals, sleep
  `}<span style={{color:'#b8bb26'}}>Photos</span>{`         library with metadata
  `}<span style={{color:'#b8bb26'}}>Notes</span>{`          all notebooks and folders
  `}<span style={{color:'#b8bb26'}}>Calendar</span>{`       events and reminders`}
            </pre>
          </div>
          <Card>
            <pre className="compare-table">{
`  `}<span style={{color:'#fe8019'}}>$</span>{` folddb import --apple

  `}<span style={{color:'#83a598'}}>Scanning</span>{` Apple data sources...

  `}<span style={{color:'#b8bb26'}}>Found:</span>{`
    2,847 contacts
    41,203 messages
    1,294 health records
    8,621 photos
    347 notes

  `}<span style={{color:'#fabd2f'}}>Importing</span>{` into local FoldDB...
  `}<span style={{color:'#b8bb26'}}>Done.</span>{` All data encrypted at rest.`}
            </pre>
          </Card>
        </div>
      </Section>

      {/* Section 2: Encrypted Cloud Backup */}
      <Section variant="rose" id="backup">
        <h2><span className="bold">ENCRYPTED CLOUD BACKUP</span></h2>

        <div className="grid-2">
          <Card>
            <pre className="compare-table">{
`  `}<span style={{color:'#fabd2f'}}>Your Device</span>{`
      |
      | encrypted write log
      v
  `}<span style={{color:'#83a598'}}>Cloud Storage</span>{` (Backblaze B2)
      |
      `}<span style={{color:'#fb4934'}}>Cannot read your data</span>{`
      |
      v
  `}<span style={{color:'#fabd2f'}}>Your Other Devices</span>{`
      |
      | decrypt locally
      v
  `}<span style={{color:'#b8bb26'}}>Full sync</span>
            </pre>
          </Card>
          <div>
            <p>Your database syncs across devices through encrypted cloud backup. <span className="bold white">The cloud stores ciphertext &mdash; it cannot read, index, or monetize your data.</span></p>
            <p>Every write is encrypted before it leaves your device. Every read is decrypted locally. The server is a dumb pipe.</p>

            <div className="privacy-badge">
              <Label color="green">ZERO-KNOWLEDGE</Label>
              <span>Cloud infrastructure never sees plaintext</span>
            </div>
            <div className="privacy-badge">
              <Label color="green">DEVICE-SIDE KEYS</Label>
              <span>Encryption keys live on your hardware</span>
            </div>
            <div className="privacy-badge">
              <Label color="green">APPEND-ONLY LOG</Label>
              <span>Full audit trail of every change</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Discovery */}
      <Section variant="lavender" id="discovery">
        <h2><span className="bold">FIND YOUR PEOPLE</span></h2>
        <p className="section-subtitle dim">Privacy-preserving discovery</p>

        <p>FoldDB lets you discover people with shared interests, skills, or experiences &mdash; <span className="bold white">without revealing who you are or what you know until you choose to.</span></p>

        <div className="grid-3">
          <Card>
            <p><Label color="purple">BROADCAST</Label></p>
            <p>Publish anonymized embeddings of your interests and expertise. Others can find semantic matches without seeing your raw data.</p>
          </Card>
          <Card>
            <p><Label color="purple">MATCH</Label></p>
            <p>Discover people whose data overlaps with yours. The system finds connections &mdash; you decide which ones to pursue.</p>
          </Card>
          <Card>
            <p><Label color="purple">CONNECT</Label></p>
            <p>When both parties opt in, establish an end-to-end encrypted channel. Share exactly what you want, nothing more.</p>
          </Card>
        </div>

        <pre className="compare-table">{
`
  `}<span style={{color:'#d3869b'}}>You</span>{`                                    `}<span style={{color:'#d3869b'}}>Them</span>{`
   |                                       |
   | anonymized embedding                  | anonymized embedding
   v                                       v
  `}<span style={{color:'#83a598'}}>{`+-------------------------------------------+`}</span>{`
  `}<span style={{color:'#83a598'}}>{`|`}</span>{`          `}<span className="bold white">Discovery Network</span>{`                 `}<span style={{color:'#83a598'}}>{`|`}</span>{`
  `}<span style={{color:'#83a598'}}>{`|`}</span>{`    `}<span className="dim">semantic matching, no raw data</span>{`        `}<span style={{color:'#83a598'}}>{`|`}</span>{`
  `}<span style={{color:'#83a598'}}>{`+-------------------------------------------+`}</span>{`
                      |
                `}<span style={{color:'#b8bb26'}}>mutual opt-in</span>{`
                      |
              `}<span style={{color:'#fabd2f'}}>E2E encrypted channel</span>
        </pre>

        <p><span className="bold white">No social graph is stored on any server.</span> Connections exist only on participant devices.</p>
      </Section>

      {/* Section 4: Auto Social Features */}
      <Section variant="amber" id="social">
        <h2><span className="bold">SOCIAL FEATURES, BUILT IN</span></h2>

        <p>Once your data is in FoldDB and discovery is active, social features emerge automatically. No separate app required.</p>

        <div className="grid-2">
          <Card>
            <p><Label color="yellow">SHARED INTERESTS</Label></p>
            <p>FoldDB surfaces people near you with overlapping interests, reading lists, music taste, or professional skills &mdash; all derived from your local data, never uploaded.</p>
          </Card>
          <Card>
            <p><Label color="yellow">GROUP FORMATION</Label></p>
            <p>When enough people share a semantic cluster, FoldDB suggests a group. Encrypted group channels form on-device. No server-side group management.</p>
          </Card>
          <Card>
            <p><Label color="yellow">LOCAL EVENTS</Label></p>
            <p>Discover nearby activities matching your interests. Event data is broadcast as anonymized embeddings &mdash; you see what is relevant without revealing your location to a platform.</p>
          </Card>
          <Card>
            <p><Label color="yellow">DIRECT MESSAGING</Label></p>
            <p>End-to-end encrypted messaging between connected users. Messages stored in your FoldDB, searchable alongside all your other data. No message server.</p>
          </Card>
        </div>
      </Section>

      {/* Privacy Promise */}
      <Section variant="sage" id="privacy">
        <h2><span className="bold">THE PRIVACY PROMISE</span></h2>

        <div className="grid-3">
          <Card>
            <p><Label color="green">YOUR DEVICE</Label></p>
            <p>All data lives on your hardware. Computation happens locally. Your device is the database server.</p>
          </Card>
          <Card>
            <p><Label color="green">YOUR KEYS</Label></p>
            <p>Encryption keys never leave your device. No platform, including us, can read your data.</p>
          </Card>
          <Card>
            <p><Label color="green">YOUR CHOICE</Label></p>
            <p>Every piece of data shared with another person or app requires your explicit permission. Revoke access at any time.</p>
          </Card>
        </div>
      </Section>

      {/* Download CTA */}
      <Section variant="slate" id="download">
        <h2><span className="bold">GET STARTED</span></h2>

        <div className="download-block">
          <div className="download-option">
            <p><Label color="blue">MAC APP</Label></p>
            <a href="https://github.com/shiba4life/fold_db/releases/latest" target="_blank" rel="noreferrer" className="btn-primary">Download FoldDB.dmg</a>
            <p className="dim">macOS 13+ &middot; Apple Silicon &amp; Intel</p>
          </div>

          <div className="download-divider dim">or</div>

          <div className="download-option">
            <p><Label color="blue">HOMEBREW</Label></p>
            <pre className="compare-table brew-block">brew install --cask folddb</pre>
          </div>
        </div>

        <p>
          <a href="/papers/fold_db_paper.pdf" target="_blank" rel="noreferrer" className="link-btn">[Read the Paper]</a>{'  '}
          <a href="/papers/fold_db_paper_eli5.pdf" target="_blank" rel="noreferrer" className="link-btn">[ELI5 Version]</a>{'  '}
          <a href="https://github.com/shiba4life/fold_db" target="_blank" rel="noreferrer" className="link-btn">[View on GitHub]</a>{'  '}
          <Link to="/developer" className="link-btn">[Developer Guide]</Link>{'  '}
          <Link to="/encryption" className="link-btn">[Encryption Details]</Link>
        </p>
      </Section>

    </>
  );
}
