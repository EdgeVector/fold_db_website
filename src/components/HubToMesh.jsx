import { useEffect, useRef } from 'react';

// The home page picture. It opens as the usual shape: every person joined by a
// spoke to one database in the middle. It then changes, once, into the LastDB
// shape: each person has their own node and links directly to neighbours.
// After that the mesh lives on. People and links come and go at random, and
// everyone drifts a little. The replay button plays it again from the hub.
//
// The picture is a logical one: where the data lives and who shares with whom.
// It does not draw the encrypted cloud that carries the links; the caption says so.
//
// The drawing is plain SVG driven from one effect, so React renders the frame
// (captions, button, empty svg) and never re-renders during the animation.
// Colours come from classes in styles.css, which read the variables in site.css.

const NS = 'http://www.w3.org/2000/svg';
const HOLD = 2.2;          // seconds the hub stands before it changes
const GO = 3.5;            // seconds the change takes
const DRIFT = 4;           // how far a person sways, in drawing units
const PEOPLE_EVERY = 1.45; // mean seconds between a person arriving or leaving
const LINKS_EVERY = 0.75;  // mean seconds between a link drawing or retracting
const DENSE = 0.71;        // share of possible links kept switched on
const BOUNCE = 0.45;       // spring in a newcomer's entrance

// Two layouts. A phone gets fewer people in a taller frame, drawn larger, so the
// rings and the counter stay readable at 340 pixels wide.
const WIDE = {
  w: 1040, h: 420, strip: 24, people: 92, late: 30, gap: 40, clear: 78, near: 104, first: 84,
  hub: 44, ring: 7.5, dot: 2.7, orbits: [118, 196], note: 20,
};
const NARROW = {
  w: 520, h: 440, strip: 34, people: 34, late: 11, gap: 58, clear: 78, near: 150, first: 122,
  hub: 42, ring: 11, dot: 4, orbits: [104, 176], note: 26,
};

const clamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const ease = (x) => { const c = clamp(x); return c * c * (3 - 2 * c); };

function start(fig, usualEl, oursEl, againEl) {
  const narrow = window.matchMedia('(max-width: 600px)').matches;
  const L = narrow ? NARROW : WIDE;
  const CX = L.w / 2;
  const CY = L.h / 2;
  fig.setAttribute('viewBox', `0 0 ${L.w} ${L.h + L.strip}`);
  fig.classList.toggle('htm-narrow', narrow);

  let seed = 20261116;
  const rnd = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const el = (parent, name, attrs) => {
    const e = document.createElementNS(NS, name);
    Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k]));
    parent.appendChild(e);
    return e;
  };

  const pattern = el(el(fig, 'defs', {}), 'pattern', {
    id: 'htm-hatch', width: 9, height: 9, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)',
  });
  el(pattern, 'line', { class: 'htm-hatch', x1: 0, y1: 0, x2: 0, y2: 9 });

  // Construction lines: two dotted circles around the hub.
  const orbits = L.orbits.map((r) => el(fig, 'circle', { class: 'htm-orbit', cx: CX, cy: CY, r }));

  // People: scattered, none too close together, none where the hub stands.
  const nodes = [];
  for (let tries = 0; nodes.length < L.people && tries < 40000; tries += 1) {
    const x = 26 + rnd() * (L.w - 52);
    const y = 24 + rnd() * (L.h - 48);
    let ok = (x - CX) ** 2 + (y - CY) ** 2 > L.clear * L.clear;
    for (let i = 0; ok && i < nodes.length; i += 1) {
      if ((nodes[i].bx - x) ** 2 + (nodes[i].by - y) ** 2 < L.gap * L.gap) ok = false;
    }
    if (ok) {
      nodes.push({
        bx: x, by: y, x, y,
        w1: 0.55 + rnd() * 0.5, w2: 0.5 + rnd() * 0.5, p1: rnd() * 6.283, p2: rnd() * 6.283,
      });
    }
  }
  // About a third of the people are not there at the start.
  nodes.map((n, i) => i).sort(() => rnd() - 0.5).slice(0, L.late).forEach((i) => { nodes[i].late = true; });

  // Possible links: each person to up to five near neighbours. The nearest three start switched on.
  const seen = {};
  const links = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, k) => [k, (a.bx - b.bx) ** 2 + (a.by - b.by) ** 2])
      .filter((e) => e[0] !== i && e[1] < L.near * L.near)
      .sort((u, w) => u[1] - w[1])
      .slice(0, 5)
      .forEach((e, rank) => {
        const key = `${Math.min(i, e[0])}-${Math.max(i, e[0])}`;
        const first = rank < 3 && e[1] < L.first * L.first;
        if (seen[key]) { if (first) seen[key].first = true; return; }
        const b = nodes[e[0]];
        const mx = (a.bx + b.bx) / 2 - CX;
        const my = (a.by + b.by) / 2 - CY;
        seen[key] = { a, b, first, far: Math.sqrt(mx * mx + my * my) };
        links.push(seen[key]);
      });
  });
  links.sort((u, w) => u.far - w.far);

  nodes.forEach((n) => { if (!n.late) n.spoke = el(fig, 'line', { class: 'htm-spoke' }); });
  // Every possible link is drawn as a faint dotted line. A link that is switched on is drawn solid over it.
  links.forEach((l) => { l.ghost = el(fig, 'line', { class: 'htm-latent' }); });
  links.forEach((l) => { l.el = el(fig, 'line', { class: 'htm-link', pathLength: 1, 'stroke-dasharray': '1 1.2' }); });
  const hubBack = el(fig, 'circle', { class: 'htm-hub-back', cx: CX, cy: CY });
  const hub = el(fig, 'circle', { class: 'htm-hub', cx: CX, cy: CY, fill: 'url(#htm-hatch)' });
  nodes.forEach((n) => { n.ring = el(fig, 'circle', { class: 'htm-own' }); });
  nodes.forEach((n) => { n.dot = el(fig, 'circle', { class: 'htm-person' }); });
  const text = (x, y, anchor, words) => {
    const t = el(fig, 'text', { class: 'htm-note', x, y, 'text-anchor': anchor });
    t.textContent = words;
    return t;
  };
  const hubNote = text(CX, CY + L.hub + L.note, 'middle', 'ONE DATABASE');
  const tally = text(2, L.h + L.strip - 6, 'start', '');
  if (!narrow) text(L.w - 2, L.h + L.strip - 6, 'end', 'FIG. 1 — FROM HUB TO MESH');

  // The living part. Once the mesh has formed, people and links come and go at random.
  let clock = 0;
  let nextNode = 0;
  let nextLink = 0;
  const reset = () => {
    seed = 7; clock = 0; nextNode = HOLD + GO + 0.8; nextLink = HOLD + GO + 1.2;
    nodes.forEach((n) => { n.here = !n.late; n.since = -100; });
    links.forEach((l) => { l.on = l.first; l.since = -100; });
  };
  const nodeEvent = (now) => {
    const here = nodes.filter((n) => n.here).length;
    const arrive = rnd() < (here < nodes.length * 0.78 ? 0.85 : here > nodes.length * 0.93 ? 0.15 : 0.5);
    const pool = nodes.filter((n) => n.here !== arrive && now - n.since > (arrive ? 2.5 : 7));
    if (!pool.length) return;
    const n = pool[Math.floor(rnd() * pool.length)];
    n.here = arrive; n.since = now;
  };
  const linkEvent = (now) => {
    const live = links.filter((l) => l.a.here && l.b.here && now - l.a.since > 2 && now - l.b.since > 2);
    const on = live.filter((l) => l.on).length;
    const add = rnd() < (on < live.length * (DENSE - 0.09) ? 0.8 : on > live.length * (DENSE + 0.09) ? 0.2 : 0.5);
    const pool = live.filter((l) => l.on !== add && now - l.since > 3.5);
    if (!pool.length) return;
    const l = pool[Math.floor(rnd() * pool.length)];
    l.on = add; l.since = now;
  };
  // A phone shows a third as many people, so changes come less often.
  const pace = narrow ? 2.4 : 1;
  const advance = (to) => {
    while (nextNode <= to || nextLink <= to) {
      if (nextNode <= nextLink) { nodeEvent(nextNode); nextNode += PEOPLE_EVERY * pace * (0.5 + rnd()); }
      else { linkEvent(nextLink); nextLink += LINKS_EVERY * pace * (0.5 + rnd()); }
    }
    clock = to;
  };

  // tm = seconds since the start.
  const render = (tm) => {
    const p = clamp((tm - HOLD) / GO);
    const pull = ease(p / 0.45);
    const shrink = ease((p - 0.08) / 0.4);
    const grow = ease((p - 0.3) / 0.3);
    const sway = DRIFT * ease((p - 0.5) / 0.5);

    nodes.forEach((n) => {
      n.x = n.bx + sway * Math.sin(tm * n.w1 + n.p1);
      n.y = n.by + sway * Math.cos(tm * n.w2 + n.p2);
      const age = tm - n.since;
      let vis;
      if (n.here) {               // pops in, then links
        const k = clamp(age / 0.7);
        vis = ease(k) + BOUNCE * Math.sin(Math.PI * k) * (1 - k);
        n.lv = ease((age - 0.6) / 0.9);
      } else {                    // lets go of its links, then leaves
        vis = 1 - ease((age - 0.5) / 0.7);
        n.lv = 1 - ease(age / 0.6);
      }
      let size;
      let dotSize;
      if (n.since < 0) { size = n.late ? 0 : grow; dotSize = n.late ? 0 : 1; }
      else { size = vis; dotSize = Math.min(1, vis); }
      n.ring.setAttribute('cx', n.x.toFixed(1)); n.ring.setAttribute('cy', n.y.toFixed(1));
      n.ring.setAttribute('r', (L.ring * size).toFixed(2)); n.ring.setAttribute('opacity', size < 0.02 ? 0 : 1);
      n.dot.setAttribute('cx', n.x.toFixed(1)); n.dot.setAttribute('cy', n.y.toFixed(1));
      n.dot.setAttribute('r', (L.dot * dotSize).toFixed(2));
      if (n.spoke) {
        n.spoke.setAttribute('x1', n.x.toFixed(1)); n.spoke.setAttribute('y1', n.y.toFixed(1));
        n.spoke.setAttribute('x2', (CX + (n.x - CX) * pull).toFixed(1));
        n.spoke.setAttribute('y2', (CY + (n.y - CY) * pull).toFixed(1));
        n.spoke.setAttribute('stroke-opacity', (0.65 * (1 - pull * pull)).toFixed(3));
      }
    });

    const r = L.hub * (1 - shrink);
    [hub, hubBack].forEach((c) => { c.setAttribute('r', r.toFixed(2)); c.setAttribute('opacity', r < 0.5 ? 0 : 1); });
    orbits.forEach((c) => c.setAttribute('opacity', (1 - pull).toFixed(3)));
    hubNote.setAttribute('opacity', (1 - ease(p / 0.2)).toFixed(3));

    const count = links.length;
    let drawn = 0;
    links.forEach((l, i) => {
      const age = tm - l.since;
      const own = l.on ? ease(age / 0.9) : 1 - ease(age / 0.7);
      const e = Math.min(ease((p - 0.45 - 0.2 * (i / count)) / 0.35), own, l.a.lv, l.b.lv);
      // The line grows out of whichever person has been there longer.
      const from = l.a.lv >= l.b.lv ? l.a : l.b;
      const to = from === l.a ? l.b : l.a;
      l.el.setAttribute('x1', from.x.toFixed(1)); l.el.setAttribute('y1', from.y.toFixed(1));
      l.el.setAttribute('x2', to.x.toFixed(1)); l.el.setAttribute('y2', to.y.toFixed(1));
      l.el.setAttribute('stroke-dashoffset', (1 - e).toFixed(3));
      l.el.setAttribute('opacity', e < 0.01 ? 0 : 1);
      const faint = Math.min(ease((p - 0.5) / 0.4), l.a.lv, l.b.lv);
      l.ghost.setAttribute('x1', l.a.x.toFixed(1)); l.ghost.setAttribute('y1', l.a.y.toFixed(1));
      l.ghost.setAttribute('x2', l.b.x.toFixed(1)); l.ghost.setAttribute('y2', l.b.y.toFixed(1));
      l.ghost.setAttribute('opacity', faint.toFixed(3));
      if (e > 0.5) drawn += 1;
    });
    const present = nodes.filter((n) => (n.since < 0 ? !n.late : n.here)).length;
    const pad = (v) => String(v).padStart(3, '0');
    if (p < 0.5) {
      tally.textContent = narrow
        ? `PEOPLE ${pad(present)} · DATABASES 001`
        : `PEOPLE ${pad(present)} · DATABASES 001 · ALL IN THE MIDDLE`;
    } else {
      tally.textContent = narrow
        ? `NODES ${pad(present)} · SHARED ${pad(drawn)}`
        : `PEOPLE ${pad(present)} · NODES ${pad(present)} · SHARED DATABASES ${pad(drawn)}`;
    }

    // The old words fade out before the new ones fade in, so the two never overlap.
    const out = ease((p - 0.28) / 0.14);
    const into = ease((p - 0.46) / 0.14);
    usualEl.style.opacity = (1 - out).toFixed(3);
    oursEl.style.opacity = into.toFixed(3);
    usualEl.setAttribute('aria-hidden', into > 0.5);
    oursEl.setAttribute('aria-hidden', into <= 0.5);
    const show = ease((p - 0.85) / 0.15);
    againEl.style.opacity = show.toFixed(3);
    againEl.style.pointerEvents = show > 0.5 ? 'auto' : 'none';
  };

  reset();
  // A fixed moment for review: /?t=20 draws second 20 and stops.
  const fixed = new URLSearchParams(window.location.search).get('t');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fixed !== null || still) {
    const at = fixed !== null ? parseFloat(fixed) || 0 : HOLD + GO + 60;
    advance(at); render(at);
    return () => { fig.replaceChildren(); };
  }

  // The clock starts when the picture is on screen, so nobody misses the change
  // from hub to mesh, and it stops while the picture is off screen.
  let last = null;
  let frame = 0;
  let inView = false;
  const tick = (now) => {
    const dt = last === null ? 0 : Math.min(0.1, (now - last) / 1000);
    last = now;
    advance(clock + dt); render(clock);
    frame = inView ? requestAnimationFrame(tick) : 0;
  };
  const watch = new IntersectionObserver((entries) => {
    inView = entries[entries.length - 1].isIntersecting;
    if (inView && !frame) { last = null; frame = requestAnimationFrame(tick); }
  }, { threshold: 0.35 });
  watch.observe(fig);
  const replay = () => { reset(); last = null; };
  againEl.addEventListener('click', replay);
  render(0);
  return () => {
    watch.disconnect();
    cancelAnimationFrame(frame);
    againEl.removeEventListener('click', replay);
    fig.replaceChildren();
  };
}

export default function HubToMesh() {
  const fig = useRef(null);
  const usual = useRef(null);
  const ours = useRef(null);
  const again = useRef(null);

  useEffect(() => start(fig.current, usual.current, ours.current, again.current), []);

  return (
    <div className="htm">
      <div className="htm-swap">
        <div className="htm-state" ref={usual}>
          <div className="htm-tag">The usual shape</div>
          <h2>Everyone connects to one database in the middle.</h2>
          <p>
            Every read and write goes through the company that runs the app.
            <span className="htm-more"> It holds everything, and everything stops when it does.</span>
          </p>
        </div>
        <div className="htm-state htm-ours" ref={ours} style={{ opacity: 0 }}>
          <div className="htm-tag">The LastDB shape</div>
          <h2>People connect to each other, with no database in the middle.</h2>
          <p>
            Each ring is one person&rsquo;s node, on their own machine. A line is a database two people share
            <span className="htm-more">, carried by an encrypted cloud that cannot read it. People and connections come and go</span>.
          </p>
        </div>
      </div>
      <button ref={again} type="button" className="htm-again" aria-label="Play again from the start" title="Play again">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.6-5.9" /><path d="M4 4v5h5" /></svg>
      </button>
      <svg
        ref={fig}
        className="htm-fig"
        viewBox="0 0 1040 444"
        role="img"
        aria-label="The same people drawn two ways in turn. First, all are joined by spokes to one database in the middle. Then each has their own node and links directly to neighbours, with no database in the middle."
      />
    </div>
  );
}
