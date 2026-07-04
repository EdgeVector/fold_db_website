import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Section from '../components/Section';

// Hand-drawn architectural figures (draftsman style: thin uniform strokes,
// poché hatch for stored/inert things, joint marks, mono caps labels, a single
// accent for the "live command"). Rendered as inline SVG so there's no auto-layout.
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

// 1 — one fenced block, two readers. A human reads it as illustration; an agent
// reads it as an instruction to run verbatim. Same fence, opposite meanings.
const TWO_READERS = `${SVG_OPEN('0 0 660 250')}
  <rect x="250" y="86" width="160" height="94" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="330" y="74" text-anchor="middle" fill="#928374" font-size="11" letter-spacing="1.5">ONE CODE FENCE</text>
  <text x="266" y="112" fill="#ebdbb2" font-size="11">&#96;&#96;&#96;bash</text>
  <text x="266" y="134" fill="#ebdbb2" font-size="11">&nbsp;&nbsp;&hellip;</text>
  <text x="266" y="156" fill="#ebdbb2" font-size="11">&#96;&#96;&#96;</text>

  <rect x="34" y="103" width="150" height="60" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="109" y="128" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">A HUMAN</text>
  <text x="109" y="146" text-anchor="middle" fill="#928374" font-size="10">reads it &mdash; documentation</text>

  <rect x="476" y="103" width="150" height="60" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="551" y="128" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">AN AGENT</text>
  <text x="551" y="146" text-anchor="middle" fill="#83a598" font-size="10">runs it &mdash; verbatim</text>

  <line x1="250" y1="133" x2="186" y2="133" stroke="#928374" stroke-width="1"/>
  <polygon points="184,133 193,129 193,137" fill="#928374"/>
  <line x1="410" y1="133" x2="474" y2="133" stroke="#83a598" stroke-width="1"/>
  <polygon points="476,133 467,129 467,137" fill="#83a598"/>

  <text x="330" y="214" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">THE FENCE NEVER SAYS WHICH ONE IT MEANT</text>
</svg>`;

// 2 — inside the fence: one real command, three lines of prose that a shell
// would still try to execute. The linter marks the data lines.
const WHAT_HIDES = `${SVG_OPEN('0 0 660 268')}
  <rect x="34" y="34" width="592" height="196" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="50" y="58" fill="#928374" font-size="11">&#96;&#96;&#96;bash</text>

  <text x="66" y="92" fill="#ebdbb2" font-size="12">git fetch origin main</text>
  <rect x="470" y="80" width="4" height="4" fill="#83a598"/>
  <text x="486" y="92" fill="#83a598" font-size="10" letter-spacing="1">COMMAND &mdash; OK</text>

  <text x="66" y="124" fill="#ebdbb2" font-size="12">## GOAL: ship the fix</text>
  <rect x="470" y="112" width="4" height="4" fill="#fb4934"/>
  <text x="486" y="124" fill="#928374" font-size="10" letter-spacing="1">HEADING &mdash; DATA</text>

  <text x="66" y="156" fill="#ebdbb2" font-size="12">- reproduce on latest</text>
  <rect x="470" y="144" width="4" height="4" fill="#fb4934"/>
  <text x="486" y="156" fill="#928374" font-size="10" letter-spacing="1">BULLET &mdash; DATA</text>

  <text x="66" y="188" fill="#ebdbb2" font-size="12">[[card-1298]] &middot; :9001</text>
  <rect x="470" y="176" width="4" height="4" fill="#fb4934"/>
  <text x="486" y="188" fill="#928374" font-size="10" letter-spacing="1">PROSE &mdash; DATA</text>

  <text x="50" y="216" fill="#928374" font-size="11">&#96;&#96;&#96;</text>
  <text x="330" y="252" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">THREE OF THESE FOUR LINES ARE NOT COMMANDS</text>
</svg>`;

// 3 — the gate: every prompt / skill / card file walks a lint before anything
// can run. Prose in a shell fence is rejected until it moves to a quoted body.
const THE_GATE = `${SVG_OPEN('0 0 660 250')}
  <rect x="34" y="86" width="150" height="72" fill="url(#poche)" stroke="#928374" stroke-width="1"/>
  <text x="109" y="116" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PROMPT &middot; SKILL</text>
  <text x="109" y="134" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">&amp; CARD FILES</text>

  <line x1="184" y1="122" x2="238" y2="122" stroke="#928374" stroke-width="1"/>
  <polygon points="240,122 231,118 231,126" fill="#928374"/>

  <rect x="242" y="82" width="176" height="80" fill="none" stroke="#83a598" stroke-width="1"/>
  <text x="330" y="112" text-anchor="middle" fill="#ebdbb2" font-size="12" letter-spacing="1.5">THE LINT</text>
  <text x="330" y="132" text-anchor="middle" fill="#928374" font-size="10">walks every shell fence</text>
  <text x="330" y="148" text-anchor="middle" fill="#928374" font-size="10">line by line</text>

  <polyline points="418,102 470,102 470,62 512,62" fill="none" stroke="#928374" stroke-width="1"/>
  <polygon points="514,62 505,58 505,66" fill="#928374"/>
  <rect x="516" y="42" width="110" height="40" fill="none" stroke="#928374" stroke-width="1"/>
  <text x="571" y="60" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">PASS</text>
  <text x="571" y="75" text-anchor="middle" fill="#928374" font-size="9">merges &middot; may run</text>

  <polyline points="418,142 470,142 470,196 512,196" fill="none" stroke="#fb4934" stroke-width="1"/>
  <polygon points="514,196 505,192 505,200" fill="#fb4934"/>
  <rect x="516" y="172" width="110" height="48" fill="none" stroke="#fb4934" stroke-width="1"/>
  <text x="571" y="192" text-anchor="middle" fill="#ebdbb2" font-size="11" letter-spacing="1">REJECT</text>
  <text x="571" y="207" text-anchor="middle" fill="#928374" font-size="9">move to &lt;&lt;&apos;EOF&apos;</text>
  <text x="571" y="217" text-anchor="middle" fill="#928374" font-size="9">pass via stdin</text>

  <text x="330" y="232" text-anchor="middle" fill="#928374" font-size="10" letter-spacing="0.5">THE CHECK RUNS BEFORE THE SHELL DOES</text>
</svg>`;

export default function BlogReadMeDontRunMe() {
  return (
    <article className="blog-post">
      <Helmet>
        <title>Read Me, Don&rsquo;t Run Me - LastDB</title>
        <meta name="description" content="A Markdown code fence is ambiguous: a human reads it as an illustration, an agent runs it as an instruction. When the autonomous fleet that builds LastDB started shelling commands out of its own skill and card files, prose inside a ```bash fence became a live command. We fixed it with a lint that runs before the shell does — the text-vs-command boundary, enforced mechanically." />
        <meta property="og:title" content="Read Me, Don't Run Me" />
        <meta property="og:description" content="A ```bash fence looks like documentation to a person and an instruction to a machine. Feed the same file to both and prose meant to be read gets executed. The lint that keeps card text off the command line." />
        <link rel="canonical" href="https://thelastdb.com/blog/read-me-dont-run-me" />
      </Helmet>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>

      <h1 className="tagline">Read Me, Don&rsquo;t Run Me</h1>
      <p className="post-meta dim">2026-07-03</p>

      <p className="bold white">A fenced code block in Markdown is a promise a document makes to a human: <span className="white">&ldquo;here is roughly the command I mean.&rdquo;</span> To a person reading it, the fence is an illustration. To a machine that copies fenced blocks into a shell, the fence is an instruction &mdash; run this, verbatim. Most of the time that&rsquo;s harmless, because most of what sits in a <span className="white">&#96;&#96;&#96;bash</span> block really is a command. Then one day it isn&rsquo;t, and the machine finds out the hard way.</p>

      <p>We build LastDB with a fleet of autonomous agents. They read their own instructions &mdash; skill files, routine files, the body of a task card &mdash; and those instructions are Markdown, full of fenced shell blocks the agents are expected to run. Which means the files are two things at once: <span className="bold">documentation a person maintains</span>, and <span className="bold">a script a machine executes</span>. The trouble lives in the gap between those two readings.</p>

      <hr className="decorative-rule" aria-hidden="true" />

      <h2>The fence with two meanings</h2>
      <p>Open any of our skill files and you&rsquo;ll find prose and commands interleaved &mdash; a heading explaining what a step is for, a bullet list of what to check, and then a fenced block of the actual shell to run. A human glides over that document effortlessly, because a person <em>knows</em> that <span className="bold">## Goal</span> is a section title and <span className="bold">git fetch origin</span> is a command. The distinction is obvious to a reader and completely invisible to a fence. Markdown never marks which lines it meant you to run.</p>

      <ArchFigure svg={TWO_READERS} caption="Fig. 1 — the same fence is documentation to a human and an instruction to a machine; it never says which" />

      <p>So the failure mode writes itself. Somewhere &mdash; a hastily authored skill, a task card whose body got pasted into a fenced block for tidy rendering &mdash; a chunk of <span className="bold">prose</span> ends up inside a <span className="white">&#96;&#96;&#96;bash</span> fence. A heading. A bulleted checklist. A card header like <span className="bold">GOAL:</span> or <span className="bold">VERIFY:</span>. A cross-reference in double brackets. To the human author it still looks like a nicely formatted note. To an agent primed to run fenced shell, it looks like four commands, and it will try to run all four.</p>

      <ArchFigure svg={WHAT_HIDES} caption="Fig. 2 — one real command, three lines of prose a shell would still try to execute" />

      <Section variant="rose">
        <h2><span className="bold">Prose doesn&rsquo;t fail cleanly</span></h2>
        <p>You might hope running English through a shell just errors out politely. It doesn&rsquo;t. <span className="bold">## GOAL: ship the fix</span> is a comment, so the shell shrugs and moves on &mdash; and now the agent believes it ran the block successfully. A bullet like <span className="bold">- reproduce on latest</span> is a command named <span className="bold">-</span> that fails in a way that looks like an environment problem, not a content problem. And the genuinely bad case is an agent that, trying to be helpful, decides the messy block just needs to be <span className="bold">&ldquo;cleaned up and run&rdquo;</span> &mdash; wrapping the whole thing in an <span className="bold">eval</span> and executing prose as if it were a program. The file looked fine the whole time. It rendered beautifully.</p>
      </Section>

      <h2>A boundary you can&rsquo;t enforce by hand</h2>
      <p>The instinct is to write a rule in the contributor guide: <span className="dim">&ldquo;don&rsquo;t put card text inside shell blocks.&rdquo;</span> But a rule that lives in a human&rsquo;s memory is exactly the wrong place to keep a boundary between <em>read this</em> and <em>run this</em> &mdash; because the person who breaks it is a tired author at midnight, and the thing that suffers is a machine at 3 a.m. with no author present to catch the mistake. Discipline doesn&rsquo;t scale to a fleet that reads faster than anyone can review.</p>

      <p>So we made the boundary mechanical. A small linter now walks every prompt, skill, routine, and card file we ship, and for each fenced shell block it goes down the block <span className="bold">line by line</span>. A line that looks like a command is fine. A line that looks like <span className="bold">Markdown or card text</span> &mdash; a heading, a bullet, a blockquote, a card field label, a <span className="bold">[[wikilink]]</span>, a bare token like <span className="bold">:9001</span> &mdash; is flagged, because a shell would try to execute it. It knows to leave real heredoc bodies alone (text deliberately quoted with <span className="bold">&lt;&lt;&apos;EOF&apos;</span> is data on purpose). Anything else that&rsquo;s prose-in-a-command-fence, it refuses to let the file land.</p>

      <ArchFigure svg={THE_GATE} caption="Fig. 3 — every instruction file passes the lint before an agent can run it" />

      <Section variant="sage">
        <h2><span className="bold">The rule, in one line</span></h2>
        <p>Text is data, not a script. If a block has headings, bullets, card headers, cross-references, or prose in it, it is something to be <span className="bold">read</span> &mdash; and it belongs in a quoted body file passed to a command over stdin, never pasted onto a command line. The shell is for intentional commands only. The lint doesn&rsquo;t trust anyone to remember that; it checks, every file, every time, before anything runs.</p>
      </Section>

      <h2>The general shape of the bug</h2>
      <p>This is an old lesson wearing new clothes. Every injection bug in history is the same confusion: a value that was meant to be <span className="bold">data</span> gets interpreted as <span className="bold">code</span> because nothing kept the two apart. SQL injection is a string that was supposed to be a name and got run as a query. This is that bug, moved up a floor &mdash; into the documents we hand to machines that act on them. The moment your instructions are both prose <em>and</em> program, you need a hard line between the part to read and the part to run, and you need something other than good intentions to hold that line.</p>

      <p>The fix isn&rsquo;t clever. It&rsquo;s a fence around the fence: a check that runs <span className="bold">before</span> the shell does, so the ambiguity gets resolved by a linter at authoring time instead of by an agent at runtime. Read me, or run me &mdash; but the file has to say which, and now it has to prove it.</p>

      <p className="dim">More on how the fleet builds LastDB safely: <Link to="/blog/prove-it-to-land">Prove It To Land</Link>, on why a green pull request isn&rsquo;t proof, and <Link to="/blog/building-lastdb-with-agents">Building LastDB with an autonomous agent loop</Link>.</p>

      <p><Link to="/blog" className="link-btn">[&larr; Blog]</Link></p>
    </article>
  );
}
