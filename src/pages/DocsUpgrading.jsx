import { Link } from 'react-router-dom';
import { DocsHeader, RelatedDocs } from './Docs';

// Paste-facing blocks: no `#` comment lines. Interactive zsh does not treat them as comments.
const UPGRADE_NOW = `lastdb upgrade --check
lastdb upgrade
lastdb upgrade --status`;

const UPGRADE_CHOICES = `lastdb upgrade --version 0.23.49
lastdb upgrade --channel nightly
lastdb upgrade --rollback`;

const CONFIG = `channel = "stable"
auto = "apply"
window = "02:00-05:00"`;

const SERVICE = `lastdb service install`;

function Code({ head, sub, children }) {
  return (
    <div className="fg-code">
      {head && <div className="fg-code-head">{head}{sub && <span>{sub}</span>}</div>}
      <pre>{children}</pre>
    </div>
  );
}

export default function DocsUpgrading() {
  return (
    <>
      <DocsHeader
        title="Upgrading LastDB"
        path="/docs/upgrading"
        heading={<>LastDB updates <em>itself.</em></>}
        lede="Once LastDB is installed as a service, it checks a signed release list every hour and installs new releases at night. This page explains the command, the automatic settings, staged rollout, and how to go back."
        description="How LastDB upgrades itself: the lastdb upgrade command and its options, the auto, channel and window settings, staged rollout, rollback, and withdrawn releases."
        reviewed="Last reviewed 27 November 2026 against the self-update design."
      />

      <section className="fg-section" id="how">
        <div className="fg-rail">
          01 &middot; How it works
          <p>A signed list, a copy next to the old one, and a way back.</p>
        </div>
        <div className="fg-body">
          <h2>LastDB keeps the old release until the new one proves itself.</h2>
          <p className="fg-lede">
            Each release is a pair of programs, <code>lastdb</code> and <code>lastdbd</code>, listed in a release list that
            LastDB signs. Your copy of LastDB has the matching public key built in. It reads the list over HTTPS, checks the
            signature, and refuses a list that is not signed or that is older than one it has already seen.
          </p>
          <ol className="fg-steps">
            <li>
              <span className="fg-num">01</span>
              <div>
                <h3>Download and check.</h3>
                <p>
                  The new pair goes into a staging folder first. Its hashes must match the signed list. On a Mac, Apple&rsquo;s
                  signature and notarization are checked too. The new daemon must also open your existing data
                  folder format. If the format would change, the upgrade stops before it touches anything and prints the
                  one-time copy steps.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">02</span>
              <div>
                <h3>Drain, then stop.</h3>
                <p>
                  LastDB stops taking new writes for a short time (they wait, nothing is dropped), sends what it holds to your
                  cloud backup if backup is connected, and then stops cleanly. It never forces the old daemon to quit.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">03</span>
              <div>
                <h3>Switch, verify, soak.</h3>
                <p>
                  The service always runs <code>~/.lastdb/current/lastdbd</code>, so a switch moves the <code>current</code> link
                  to the new folder and starts the daemon. LastDB then checks that it answers, that your data reads back the same,
                  and that it stays healthy for about five minutes.
                </p>
              </div>
            </li>
            <li>
              <span className="fg-num">04</span>
              <div>
                <h3>Keep or roll back.</h3>
                <p>
                  If any check fails, LastDB goes back to the previous pair on its own and remembers not to try that version
                  again by itself. If everything holds, the previous pair stays on disk so you can go back by hand.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="fg-section" id="command">
        <div className="fg-rail">
          02 &middot; The command
          <p>Run it any time. It never needs the hourly check.</p>
        </div>
        <div className="fg-body">
          <h2><code>lastdb upgrade</code> and its options.</h2>
          <div className="fg-code-stack">
            <Code head="Look, then upgrade, then look again">{UPGRADE_NOW}</Code>
            <Code head="Pick a release, switch channel, or go back">{UPGRADE_CHOICES}</Code>
          </div>
          <dl className="fg-faq">
            <div>
              <dt><code>lastdb upgrade</code></dt>
              <dd>Installs the newest active release that is newer than the one you run. A hand-run upgrade ignores the staged rollout share.</dd>
            </div>
            <div>
              <dt><code>--check</code></dt>
              <dd>Reads and verifies the list and says what would be installed. It changes nothing.</dd>
            </div>
            <div>
              <dt><code>--version &lt;v&gt;</code></dt>
              <dd>Installs one named active release, even if it is not newer.</dd>
            </div>
            <div>
              <dt><code>--channel &lt;stable|nightly&gt;</code></dt>
              <dd>Changes the channel LastDB follows, then installs that channel&rsquo;s newest active release.</dd>
            </div>
            <div>
              <dt><code>--rollback</code></dt>
              <dd>Goes back to the previous pair and marks the version you leave as rejected, so automatic runs skip it.</dd>
            </div>
            <div>
              <dt><code>--status</code></dt>
              <dd>Prints the current and previous release, the channel, the next planned upgrade, and the last attempts. <code>lastdb status</code> also shows one upgrade line.</dd>
            </div>
            <div>
              <dt><code>--clear-rejected &lt;v&gt;</code></dt>
              <dd>Removes the mark from a rejected version so an automatic run may try it again.</dd>
            </div>
            <div>
              <dt><code>--accept-backup-behind</code></dt>
              <dd>
                An upgrade refuses to continue when your cloud backup is behind and cannot catch up before the stop. This flag
                continues anyway. Your local data is intact either way; what you accept is an older recovery point in the cloud.
                Automatic runs never use it.
              </dd>
            </div>
            <div>
              <dt><code>--pair &lt;dir&gt;</code></dt>
              <dd>Installs a pair you built or downloaded yourself. It skips the list, so the self-check cannot vouch for it.</dd>
            </div>
            <div>
              <dt><code>--json</code></dt>
              <dd>Prints the result as JSON.</dd>
            </div>
            <div>
              <dt><code>--auto</code></dt>
              <dd>The hourly check. You do not run it by hand; see the next section.</dd>
            </div>
          </dl>
          <p className="fg-note">
            Every run ends with one sentence that says what happened. The exit code tells a script the same thing:
            0 upgraded or already current, 2 refused before any change, 3 rolled back, 4 needs a person, 5 busy because another
            upgrade is running.
          </p>
        </div>
      </section>

      <section className="fg-section" id="automatic">
        <div className="fg-rail">
          03 &middot; Automatic upgrades
          <p>Three settings: <code>auto</code>, <code>channel</code>, <code>window</code>.</p>
        </div>
        <div className="fg-body">
          <h2>Quiet by default, and easy to turn off.</h2>
          <p className="fg-lede">
            <code>lastdb service install</code> adds an hourly update check to the same background job that already keeps your
            apps current. The settings live in <code>~/.lastdb/upgrade/config.toml</code>.
          </p>
          <div className="fg-code-stack">
            <Code head="~/.lastdb/upgrade/config.toml" sub="the defaults">{CONFIG}</Code>
          </div>
          <dl className="fg-faq">
            <div>
              <dt><code>auto</code></dt>
              <dd>
                <code>apply</code> checks every hour and installs inside the window. <code>check</code> checks and records what is
                available, and <code>lastdb status</code> shows it, but never installs. <code>off</code> does neither.
              </dd>
            </div>
            <div>
              <dt><code>channel</code></dt>
              <dd><code>stable</code> gets releases that passed the full qualification. <code>nightly</code> gets the daily build, with no staged rollout.</dd>
            </div>
            <div>
              <dt><code>window</code></dt>
              <dd>The local-time hours when an automatic install may run, for example <code>02:00-05:00</code>. Outside the window the hourly check only reads and records.</dd>
            </div>
          </dl>
          <p className="fg-note">
            Automatic runs take the newest active release that is newer than yours and inside your rollout share. They never use
            <code> --accept-backup-behind</code>, never retry a version that was rolled back, and stop after one failure per
            version. A copy of LastDB that was installed with <code>--pair</code> is never replaced automatically.
          </p>
        </div>
      </section>

      <section className="fg-section" id="rollout">
        <div className="fg-rail">
          04 &middot; Staged rollout
          <p>A new stable release reaches a few installs first.</p>
        </div>
        <div className="fg-body">
          <h2>Stable releases go out slowly.</h2>
          <p className="fg-lede">
            A new stable release starts at 10 percent of installs. After 24 hours it moves to 50 percent, and after 48 hours to
            100 percent. If the release is pulled in that time, the installs that never took it never will.
          </p>
          <div className="fg-two">
            <p>
              Your share is decided on your own machine. LastDB keeps a random install id in <code>~/.lastdb/upgrade</code>,
              mixes it with the version number, and compares the result with the rollout percent. The id is never sent anywhere.
            </p>
            <p>
              Rollout only slows automatic upgrades. Running <code>lastdb upgrade</code> yourself, or naming a version with
              <code> --version</code>, does not wait for your share.
            </p>
          </div>
        </div>
      </section>

      <section className="fg-section" id="rollback">
        <div className="fg-rail">
          05 &middot; Rollback and withdrawal
          <p>Going back needs no network.</p>
        </div>
        <div className="fg-body">
          <h2>Two ways back, and one that happens for you.</h2>
          <ul>
            <li>
              <strong>Automatic.</strong> If the new release fails a check during the switch, verification or the soak, LastDB
              returns to the previous pair, starts it, checks it, and marks the failed version rejected. The exit code is 3.
            </li>
            <li>
              <strong>By hand.</strong> <code>lastdb upgrade --rollback</code> does the same on request. The previous pair is a
              folder on disk, so no download is needed.
            </li>
            <li>
              <strong>Withdrawal.</strong> If a release turns out to be bad, the project marks it withdrawn in the signed list.
              A withdrawn release is never offered again, and a fixed build ships as a new version. If you run a withdrawn
              release and <code>auto</code> is <code>apply</code>, LastDB rolls back at the next hourly check, even outside the
              window, as long as the previous release is not withdrawn too. With any other setting, <code>lastdb status</code>
              tells you.
            </li>
          </ul>
          <p className="fg-note">
            If a rollback itself cannot finish, the exit code is 4. Both pairs stay on disk, nothing deletes your data or a
            program folder, and <code>lastdb upgrade --status</code> prints where things stand.
          </p>
        </div>
      </section>

      <section className="fg-section" id="install-paths">
        <div className="fg-rail">
          06 &middot; Installers
          <p>Two ways to install; one way to update.</p>
        </div>
        <div className="fg-body">
          <h2>The installer script and Homebrew both end in the same place.</h2>
          <div className="fg-two">
            <p>
              The <Link to="/docs/install">installer script</Link> downloads the stable release, checks its hash, and runs
              <code> lastdb service install</code> for you. After that, LastDB updates itself.
            </p>
            <p>
              With Homebrew, install the formula and run the command once yourself. <code>brew upgrade lastdb</code> then only
              refreshes the installer copy kept by Homebrew; it does not restart or replace the running service.
            </p>
          </div>
          <div className="fg-code-stack">
            <Code head="Set up the service once, after a Homebrew install">{SERVICE}</Code>
          </div>
          <p className="fg-note">
            A node that already runs under another service name can be taken over once, without moving any data, with
            <code> lastdb service adopt --label &lt;name&gt;</code>. The daemon must be running, and the job keeps its name and home. For a node started with <code>brew services</code>, leave it running and use <code>homebrew.mxcl.lastdb</code>; do not use <code>brew services</code> for LastDB afterwards. Windows is not supported.
          </p>
        </div>
      </section>

      <RelatedDocs currentPath="/docs/upgrading" number="07" />
    </>
  );
}
