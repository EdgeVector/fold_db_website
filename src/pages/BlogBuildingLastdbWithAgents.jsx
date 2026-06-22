import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';
import Mermaid from '../components/Mermaid';

const LAYERS_DIAGRAM = `flowchart TB
  You(["You: set North Stars, clear the 5 gates"])
  subgraph DATA["DATA — the brain: facts and rules"]
    direction LR
    NS["North Star"]
    AP["Active Programs"]
    AC["Autonomy Contract: dev = no gate"]
    DM["Driving Model: prototype / harden / maintain"]
  end
  subgraph LOOP["THE LOOP — scheduled routines"]
    direction LR
    PD["program-driver"] --> GR["groom"] --> PU["pickup"] --> AG["worker agent"] --> WA["watch"]
  end
  You --> DATA
  DATA --> LOOP
  AG --> RES["merged PRs on dev"]
  WA -. "surfaces only the 5 gates" .-> You`;

const LIFECYCLE_DIAGRAM = `flowchart LR
  A["You set a North Star"] --> B{"mode?"}
  B -->|prototype| C["agent builds the rough working version"]
  B -->|harden| D["agent finds edge cases, stabilizes, proves it by running the app"]
  B -->|maintain| E["routines keep it healthy, in the background"]
  C --> F["merged on dev"]
  D --> F`;

export default function BlogBuildingLastdbWithAgents() {
  return (
    <>
      <Helmet>
        <title>Building LastDB with an autonomous agent loop - Last DB</title>
        <meta name="description" content="We let AI agents build LastDB toward goals we set — and merge their own pull requests — while we sleep. Here is the system that makes that safe: a North-Star-steered autonomous development loop." />
        <meta property="og:title" content="Building LastDB with an autonomous agent loop" />
        <meta property="og:description" content="The North Star model, the dev = no gate contract, and the scheduled-routine loop that builds LastDB autonomously." />
        <link rel="canonical" href="https://thelastdb.com/blog/building-lastdb-with-agents" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Building LastDB with an autonomous agent loop</h1>
      <p className="post-meta dim">2026-06-22</p>

      <p className="bold white">We let AI agents build LastDB toward goals we set &mdash; and merge their own pull requests &mdash; while we sleep. Here&rsquo;s the system that makes that safe instead of chaotic.</p>

      <p>Most &ldquo;AI coding&rdquo; demos show a human prompting an agent, watching it work, and steering every turn. That&rsquo;s autocomplete with extra steps. We wanted something different: <span className="bold">set a destination, walk away, and come back to merged, working code.</span> This is how the LastDB development loop actually works.</p>

      <p>And there&rsquo;s a twist we like: the loop is driven by two of our own apps &mdash; <span className="bold">Brain</span> (a personal knowledge base) and <span className="bold">Kanban</span> (a task board) &mdash; both open-source apps built <em>on LastDB</em>. We build LastDB using software that runs on LastDB.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>Three kinds of pieces</h2>
      <p>The whole system is built from three kinds of things. Keeping them straight is the trick:</p>
      <ul>
        <li><span className="bold white">Data</span> &mdash; inert facts. <em>What</em> we&rsquo;re building and the <em>rules of engagement.</em> These live in Brain. They don&rsquo;t do anything on their own; something has to read them.</li>
        <li><span className="bold white">Harness</span> &mdash; a recipe. The enforced, written-down process an agent follows.</li>
        <li><span className="bold white">Routine</span> &mdash; a recipe plus an alarm clock. A harness that fires itself on a schedule.</li>
      </ul>
      <p>So a routine is just a harness with a timer, and data is what they all read.</p>

      <Mermaid chart={LAYERS_DIAGRAM} />

      <Section variant="sage">
        <h2><span className="bold">The unit of work is a North Star</span></h2>
        <p>We don&rsquo;t hand agents tickets. We set <span className="bold">North Stars</span> &mdash; destinations with a checkable &ldquo;done.&rdquo; Each feature is its own North Star, and every North Star carries a <span className="bold">mode</span> that tells the agent what kind of work this is:</p>
        <ul>
          <li><span className="bold white">prototype</span> &mdash; no working version exists yet; build the rough end-to-end version.</li>
          <li><span className="bold white">harden</span> &mdash; a rough version exists; stress it, find the edge cases, stabilize it, and prove it by <em>running the app</em>, not just passing tests.</li>
          <li><span className="bold white">maintain</span> &mdash; shipped and stable; keep it healthy in the background.</li>
        </ul>
        <p>A North Star moves through those modes over its life. The agent reads the mode and picks its approach.</p>
      </Section>

      <Mermaid chart={LIFECYCLE_DIAGRAM} />

      <h2>The contract: drive by default, stop at five gates</h2>
      <p>The reason most &ldquo;autonomous&rdquo; setups stall is that they ask permission constantly. Ours has one rule: <span className="bold">drive everything to done on the development track without asking.</span> Build, test, security-review, fix, and merge &mdash; all autonomous.</p>
      <p>The agents stop for exactly five things, the genuinely human decisions:</p>
      <ol>
        <li><span className="bold white">Production cutover</span> &mdash; flipping a feature on for real users.</li>
        <li><span className="bold white">Anything public or outward-facing</span> &mdash; like, well, publishing this blog post.</li>
        <li><span className="bold white">Money, legal, or business.</span></li>
        <li><span className="bold white">A genuinely novel direction</span> with no precedent.</li>
        <li><span className="bold white">Anything irreversible.</span></li>
      </ol>
      <p>Everything else is the agent&rsquo;s call. This single contract is what turns a pile of capable agents into a loop that actually finishes things.</p>

      <h2>The loop</h2>
      <p>A handful of small scheduled routines pass work down a line:</p>
      <ul>
        <li><span className="bold">program-driver</span> turns each North Star into the next concrete card.</li>
        <li><span className="bold">groom</span> promotes the ready cards.</li>
        <li><span className="bold">pickup</span> fans out a worker agent per card.</li>
        <li><span className="bold">the worker</span> builds the change, opens a pull request, and drives it through the merge queue to <em>merged</em> &mdash; a card isn&rsquo;t &ldquo;done&rdquo; until its code is actually in the repo.</li>
        <li><span className="bold">watch</span> reconciles the board: advancing what&rsquo;s stuck, and &mdash; critically &mdash; flagging anything it can&rsquo;t resolve.</li>
      </ul>
      <p>That last word matters more than it looks.</p>

      <Section variant="rose">
        <h2><span className="bold">A bug worth bragging about</span></h2>
        <p>Recently a card sat finished-but-unmoved on the board for five days. The reconciler had a stale assumption baked into its recipe &mdash; it skipped a whole class of cards on a belief that was no longer true &mdash; and, worse, it skipped them <em>silently</em>. Nobody was told.</p>
        <p>The fix wasn&rsquo;t just correcting the assumption. It was making a rule: <span className="bold">a piece of work is either moved forward or it&rsquo;s surfaced to a human &mdash; silence is now a bug.</span> A finished task can no longer quietly stall where no one sees it. We&rsquo;d rather the system interrupt you with &ldquo;I&rsquo;m stuck on this&rdquo; than let work rot invisibly.</p>
        <p>That&rsquo;s the real difference between a demo and a system you can walk away from: not that it never gets stuck, but that it can&rsquo;t get stuck <em>quietly</em>.</p>
      </Section>

      <h2>What this means</h2>
      <p>The humans set destinations and answer five kinds of questions. Everything else &mdash; the building, testing, reviewing, merging, and the honest &ldquo;I need you on this one&rdquo; &mdash; runs on its own. The same local-first, you-own-your-data philosophy behind LastDB is the philosophy behind how we build it: the tools work for you, in the open, without asking to phone home for permission.</p>

      <p className="dim">Built with <Link to="/apps">Brain and Kanban</Link> &mdash; open-source apps on LastDB.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </>
  );
}
