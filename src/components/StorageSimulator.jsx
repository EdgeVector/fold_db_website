import { useCallback, useId, useMemo, useState } from 'react';

/** Real laststore constants — labeled on the page; scale only shrinks demo thresholds. */
export const REAL = {
  COMMIT_LOG_FILE: 16 << 20,
  SEAL_MIN: 64 << 10,
  SEAL_MAX: 8 << 20,
  MAX_MEMORY: 256 << 20,
  BLOCK: 16 << 10,
  MERGE_WIDTH: 8,
  MAX_MERGE_INPUTS: 64,
  BASE_PIECES: 64,
  MIN_PIECE: 256 << 10,
  MAX_PIECE: 1 << 30,
  MAX_LEVELS: 32,
  TIER_SHARE: 16,
  TIER_MIN: 1 << 20,
  STALE_FLOOR: 64 << 10,
  STALE_SHARE: 8,
};

const SCALE_OPTIONS = [1, 4, 16, 64, 256];
const BURST_OPTIONS = [1, 8, 32, 64];
const SIZE_OPTIONS = [
  { label: '1 KiB', bytes: 1 << 10 },
  { label: '4 KiB', bytes: 4 << 10 },
  { label: '16 KiB', bytes: 16 << 10 },
  { label: '64 KiB', bytes: 64 << 10 },
];

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) {
    const k = n / 1024;
    return Number.isInteger(k) ? `${k} KiB` : `${k.toFixed(1)} KiB`;
  }
  const m = n / (1024 * 1024);
  return Number.isInteger(m) ? `${m} MiB` : `${m.toFixed(1)} MiB`;
}

function scaled(real, scale) {
  return Math.max(1, Math.floor(real / scale));
}

function sealThreshold(runFileBytes, scale) {
  const real = Math.min(REAL.SEAL_MAX, Math.max(REAL.SEAL_MIN, Math.floor(runFileBytes / 4)));
  return scaled(real, scale);
}

function reclaimReady(hidden, total, scale) {
  const floor = scaled(REAL.STALE_FLOOR, scale);
  return hidden > floor && hidden * REAL.STALE_SHARE > total;
}

function tierOver(tier, total, scale) {
  const min = scaled(REAL.TIER_MIN, scale);
  return tier > min && tier * REAL.TIER_SHARE > total;
}

function pieceTarget(bytes, scale) {
  const min = scaled(REAL.MIN_PIECE, scale);
  const max = scaled(REAL.MAX_PIECE, scale);
  return Math.min(max, Math.max(min, Math.floor(bytes / REAL.BASE_PIECES) || min));
}

function pushEvent(events, text) {
  const next = [{ id: `${Date.now()}-${Math.random()}`, text }, ...events];
  return next.slice(0, 8);
}

function emptyDevice(name) {
  return { name, seq: 0, cloudLog: [], pending: [] };
}

function emptyStore() {
  return {
    commitLogBytes: 0,
    commitLogStale: 0,
    commitLogTombs: 0,
    commitLogTombstoneKeyBytes: 0,
    commitLogTombstoneBytes: 0,
    commitLogHiddenBytes: 0,
    commitLogCount: 0,
    logKeys: new Set(),
    levels: [[]],
    base: [],
    liveBytes: 0,
    staleBytes: 0,
    recordBytes: new Map(),
    nextKey: 1,
    fileCount: 0,
  };
}

/** Estimate the bytes hidden in older runs by a newer write. */
function markStaleInRuns(store, bytes) {
  let left = bytes;
  const levels = store.levels.map((level) => level.map((run) => ({ ...run })));
  const base = store.base.map((run) => ({ ...run }));
  for (const level of levels) {
    for (const run of level) {
      if (left <= 0) break;
      const take = Math.min(run.liveBytes, left);
      if (take <= 0) continue;
      run.liveBytes -= take;
      run.staleBytes += take;
      left -= take;
    }
  }
  for (const run of base) {
    if (left <= 0) break;
    const take = Math.min(run.liveBytes, left);
    if (take <= 0) continue;
    run.liveBytes -= take;
    run.staleBytes += take;
    left -= take;
  }
  return { ...store, levels, base };
}

function initialState() {
  return {
    // 16× keeps the 1 MiB base-fold floor large enough that L0 can reach MERGE_WIDTH 8
    // before a base fold, so seals → 8-into-1 merges are visible. 64× folds too early.
    scale: 16,
    recordBytes: 1 << 10,
    burst: 8,
    activeDevice: 0,
    devices: [emptyDevice('Device A')],
    store: emptyStore(),
    relay: { snapshot: null, entries: [], trimmed: 0 },
    events: [
      {
        id: 'boot',
        text: 'Simulator ready. Writes fill the commit log; at the default 16× scale you should see seals, then 8→1 merges, before a base fold. Real constants stay labeled in captions.',
      },
    ],
  };
}

function runFileBytes(store) {
  let n = 0;
  for (const level of store.levels) {
    for (const run of level) n += run.fileBytes;
  }
  for (const piece of store.base) n += piece.fileBytes;
  return n;
}

function allRuns(store) {
  const out = [];
  for (const level of store.levels) out.push(...level);
  out.push(...store.base);
  return out;
}

function logicalTotal(store) {
  return store.liveBytes + store.staleBytes;
}

function countFiles(store) {
  let n = store.commitLogCount > 0 ? 1 : 0;
  for (const level of store.levels) n += level.length;
  n += store.base.length;
  return n;
}

function splitBase(bytes, scale, tombstones = 0) {
  if (bytes <= 0) return [];
  const target = pieceTarget(bytes, scale);
  const pieces = [];
  let left = bytes;
  let tombs = tombstones;
  let i = 0;
  while (left > 0) {
    const size = Math.min(target, left);
    const share = bytes > 0 ? size / bytes : 0;
    const pieceTombs = Math.floor(tombs * share);
    pieces.push({
      id: `base-${Date.now()}-${i++}`,
      fileBytes: size,
      liveBytes: size - pieceTombs,
      staleBytes: pieceTombs,
      tombstones: pieceTombs > 0 ? Math.max(1, Math.round(pieceTombs / Math.max(1, size / 8))) : 0,
      records: Math.max(1, Math.round(size / (4 << 10))),
    });
    left -= size;
    tombs -= pieceTombs;
  }
  return pieces;
}

/** Run compaction / seal steps until quiet. Returns { store, events }. */
function settle(store, scale, events, { forceSeal = false } = {}) {
  let s = {
    ...store,
    levels: store.levels.map((l) => l.map((r) => ({ ...r }))),
    base: store.base.map((r) => ({ ...r })),
    logKeys: new Set(store.logKeys || []),
  };
  let ev = events;
  let guard = 0;
  let force = forceSeal;

  while (guard++ < 40) {
    const threshold = sealThreshold(runFileBytes(s), scale);
    if (s.commitLogBytes > 0 && (force || s.commitLogBytes >= threshold)) {
      force = false;
      const stale = Math.min(s.commitLogStale + s.commitLogTombstoneBytes, s.commitLogBytes);
      const live = Math.max(0, s.commitLogBytes - stale);
      const run = {
        id: `run-${Date.now()}-${guard}`,
        fileBytes: s.commitLogBytes,
        liveBytes: live,
        staleBytes: stale,
        tombstones: s.commitLogTombs,
        tombstoneKeyBytes: s.commitLogTombstoneKeyBytes,
        hiddenBytes: s.commitLogHiddenBytes,
        records: s.commitLogCount,
      };
      if (s.levels.length === 0) s.levels = [[]];
      s.levels[0] = [run, ...s.levels[0]];
      const sealed = s.commitLogBytes;
      s = {
        ...s,
        commitLogBytes: 0,
        commitLogStale: 0,
        commitLogTombs: 0,
        commitLogTombstoneKeyBytes: 0,
        commitLogTombstoneBytes: 0,
        commitLogHiddenBytes: 0,
        commitLogCount: 0,
        logKeys: new Set(),
        fileCount: countFiles(s),
      };
      ev = pushEvent(
        ev,
        `Sealed ${fmtBytes(sealed)} from the commit log into a sorted run (threshold ${fmtBytes(threshold)}; real rule: run_bytes/4 clamped ${fmtBytes(REAL.SEAL_MIN)}–${fmtBytes(REAL.SEAL_MAX)}).`,
      );
      continue;
    }

    let merged = false;
    for (let level = 0; level < s.levels.length; level++) {
      if (s.levels[level].length >= REAL.MERGE_WIDTH) {
        const inputs = s.levels[level].slice(0, REAL.MERGE_WIDTH);
        const rest = s.levels[level].slice(REAL.MERGE_WIDTH);
        const fileBytes = inputs.reduce((a, r) => a + r.fileBytes, 0);
        const liveBytes = inputs.reduce((a, r) => a + r.liveBytes, 0);
        const staleBytes = inputs.reduce((a, r) => a + r.staleBytes, 0);
        const tombstones = inputs.reduce((a, r) => a + r.tombstones, 0);
        const tombstoneKeyBytes = inputs.reduce((a, r) => a + (r.tombstoneKeyBytes || 0), 0);
        const hiddenBytes = inputs.reduce((a, r) => a + (r.hiddenBytes || 0), 0);
        const records = inputs.reduce((a, r) => a + r.records, 0);
        const out = {
          id: `merge-${Date.now()}-${level}`,
          fileBytes,
          liveBytes,
          staleBytes,
          tombstones,
          tombstoneKeyBytes,
          hiddenBytes,
          records,
        };
        const nextLevels = s.levels.map((l, i) => (i === level ? rest : [...l]));
        while (nextLevels.length <= level + 1) nextLevels.push([]);
        if (level + 1 >= REAL.MAX_LEVELS - 1) {
          // Fold into base pieces instead of inventing infinite levels in the demo.
          nextLevels[level] = rest;
          const combined = [...s.base, out];
          const totalBytes = combined.reduce((a, r) => a + r.fileBytes, 0);
          const totalStale = combined.reduce((a, r) => a + r.staleBytes, 0);
          s = {
            ...s,
            levels: nextLevels,
            base: splitBase(totalBytes, scale, totalStale),
            fileCount: 0,
          };
          s.fileCount = countFiles(s);
          ev = pushEvent(
            ev,
            `${REAL.MERGE_WIDTH} runs at level ${level} folded toward the base (MERGE_WIDTH ${REAL.MERGE_WIDTH}).`,
          );
        } else {
          nextLevels[level + 1] = [out, ...nextLevels[level + 1]];
          s = { ...s, levels: nextLevels, fileCount: 0 };
          s.fileCount = countFiles(s);
          ev = pushEvent(
            ev,
            `${REAL.MERGE_WIDTH} runs merged into 1 at level ${level}→${level + 1} because a level reaches MERGE_WIDTH ${REAL.MERGE_WIDTH} (max ${REAL.MAX_MERGE_INPUTS} inputs per step).`,
          );
        }
        merged = true;
        break;
      }
    }
    if (merged) continue;

    const tiered = s.levels.flat();
    const tierBytes = tiered.reduce((a, r) => a + r.liveBytes + r.staleBytes, 0);
    const total = logicalTotal(s) || tierBytes + s.base.reduce((a, r) => a + r.liveBytes + r.staleBytes, 0);
    const hiddenTier = tiered.reduce((a, r) => a + (r.hiddenBytes || 0), 0);
    const tombstoneKeyBytes = tiered.reduce((a, r) => a + (r.tombstoneKeyBytes || 0), 0);
    const staleTier = hiddenTier + tombstoneKeyBytes;
    const wantBase =
      tiered.length > 0 &&
      (tierOver(tierBytes, Math.max(total, 1), scale) || reclaimReady(staleTier, Math.max(total, 1), scale));

    if (wantBase) {
      const inputs = tiered.slice(0, REAL.MAX_MERGE_INPUTS);
      const reason = reclaimReady(staleTier, Math.max(total, 1), scale)
        ? `tiered hidden bytes plus tombstone-key bytes (${fmtBytes(staleTier)}) exceeded 1/${REAL.STALE_SHARE} of ${fmtBytes(Math.max(total, 1))} (floor ${fmtBytes(scaled(REAL.STALE_FLOOR, scale))}; real floor ${fmtBytes(REAL.STALE_FLOOR)})`
        : `tiered ${fmtBytes(tierBytes)} exceeded 1/${REAL.TIER_SHARE} of ${fmtBytes(Math.max(total, 1))} and the ${fmtBytes(scaled(REAL.TIER_MIN, scale))} floor (real floor ${fmtBytes(REAL.TIER_MIN)})`;

      let live = inputs.reduce((a, r) => a + r.liveBytes, 0) + s.base.reduce((a, r) => a + r.liveBytes, 0);
      let stale = inputs.reduce((a, r) => a + r.staleBytes, 0) + s.base.reduce((a, r) => a + r.staleBytes, 0);
      // Tombstones drop when folded into the base.
      const dropped = stale;
      live = Math.max(0, live);
      stale = 0;
      const nextLevels = s.levels.map(() => []);
      while (nextLevels.length && nextLevels.every((l) => l.length === 0)) {
        /* keep one empty L0 */
        break;
      }
      s = {
        ...s,
        levels: [[]],
        base: splitBase(live + stale, scale, 0),
        staleBytes: Math.max(0, s.staleBytes - dropped),
        liveBytes: live,
        fileCount: 0,
      };
      s.fileCount = countFiles(s);
      ev = pushEvent(
        ev,
        `Base fold fired because ${reason}. Tombstones dropped; base split into ~${REAL.BASE_PIECES} pieces (piece ${fmtBytes(REAL.MIN_PIECE)}–${fmtBytes(REAL.MAX_PIECE)}, target bytes/${REAL.BASE_PIECES}). Reclaimed ${fmtBytes(dropped)} stale.`,
      );
      continue;
    }

    break;
  }

  s.fileCount = countFiles(s);
  return { store: s, events: ev };
}

function applyWrites(state, count, asDelete = false, asUpdate = false) {
  let { store, events, devices, activeDevice, scale, recordBytes } = state;
  const device = { ...devices[activeDevice], pending: [...devices[activeDevice].pending] };
  let live = store.liveBytes;
  let stale = store.staleBytes;
  let logBytes = store.commitLogBytes;
  let logStale = store.commitLogStale;
  let logTombs = store.commitLogTombs;
  let logTombstoneKeyBytes = store.commitLogTombstoneKeyBytes;
  let logTombstoneBytes = store.commitLogTombstoneBytes;
  let logHiddenBytes = store.commitLogHiddenBytes;
  let logCount = store.commitLogCount;
  const recordMap = new Map(store.recordBytes);
  const logKeys = new Set(store.logKeys || []);
  let nextKey = store.nextKey;
  let nextStore = { ...store };

  for (let i = 0; i < count; i++) {
    let key;
    let bytes = recordBytes;
    if (asDelete || asUpdate) {
      const keys = [...recordMap.keys()];
      if (keys.length === 0) {
        events = pushEvent(events, 'No live records to update or delete.');
        break;
      }
      key = keys[Math.floor(Math.random() * keys.length)];
      const prev = recordMap.get(key) || bytes;
      const inLog = logKeys.has(key);
      if (asDelete) {
        stale += prev;
        live = Math.max(0, live - prev);
        recordMap.delete(key);
        bytes = Math.max(64, Math.floor(String(key).length + 8)); // tombstone is small
        if (inLog) {
          // Prior value still only in the unsealed log — hide it there.
          logStale += prev;
        } else {
          // Prior value lives in a sealed run — mark that run stale.
          nextStore = markStaleInRuns(nextStore, prev);
          logHiddenBytes += prev;
        }
        logTombs += 1;
        logTombstoneKeyBytes += String(key).length;
        logTombstoneBytes += bytes;
        logKeys.delete(key);
        device.pending.push({ seq: device.seq + device.pending.length + 1, kind: 'delete', key, bytes });
      } else {
        stale += prev;
        live = live - prev + bytes;
        recordMap.set(key, bytes);
        if (inLog) {
          logStale += prev;
        } else {
          nextStore = markStaleInRuns(nextStore, prev);
          logHiddenBytes += prev;
        }
        logKeys.add(key);
        device.pending.push({ seq: device.seq + device.pending.length + 1, kind: 'update', key, bytes });
      }
    } else {
      key = nextKey++;
      recordMap.set(key, bytes);
      live += bytes;
      logKeys.add(key);
      device.pending.push({ seq: device.seq + device.pending.length + 1, kind: 'put', key, bytes });
    }
    logBytes += bytes;
    logCount += 1;
  }

  const nextDevices = devices.map((d, i) => (i === activeDevice ? device : d));
  nextStore = {
    ...nextStore,
    commitLogBytes: logBytes,
    commitLogStale: logStale,
    commitLogTombs: logTombs,
    commitLogTombstoneKeyBytes: logTombstoneKeyBytes,
    commitLogTombstoneBytes: logTombstoneBytes,
    commitLogHiddenBytes: logHiddenBytes,
    commitLogCount: logCount,
    logKeys,
    liveBytes: live,
    staleBytes: stale,
    recordBytes: recordMap,
    nextKey,
  };
  nextStore.fileCount = countFiles(nextStore);

  const verb = asDelete ? 'Deleted' : asUpdate ? 'Updated' : 'Wrote';
  events = pushEvent(
    events,
    `${verb} ${count} record${count === 1 ? '' : 's'} (${fmtBytes(recordBytes)} each) on ${device.name}. Commit log now ${fmtBytes(logBytes)} / seal at ${fmtBytes(sealThreshold(runFileBytes(nextStore), scale))}.`,
  );

  const settled = settle(nextStore, scale, events);
  return {
    ...state,
    devices: nextDevices,
    store: settled.store,
    events: settled.events,
  };
}

function syncDevices(state) {
  let { devices, relay, events, activeDevice } = state;
  const nextDevices = devices.map((d) => ({ ...d, cloudLog: [...d.cloudLog], pending: [...d.pending] }));
  let entries = [...relay.entries];
  let uploaded = 0;

  for (const d of nextDevices) {
    while (d.pending.length) {
      const item = d.pending.shift();
      d.seq = item.seq;
      const entry = {
        id: `${d.name}-${item.seq}`,
        device: d.name,
        seq: item.seq,
        kind: item.kind,
        bytes: item.bytes,
      };
      d.cloudLog.push(entry);
      entries.push(entry);
      uploaded += 1;
    }
  }

  events = pushEvent(
    events,
    uploaded
      ? `Sync: uploaded ${uploaded} sealed cloud-log entr${uploaded === 1 ? 'y' : 'ies'} to the relay. Each device appends to its own signed hash chain; the relay is untrusted storage.`
      : 'Sync: nothing pending. Cloud-log entries upload as already sealed with the database key.',
  );

  return {
    ...state,
    devices: nextDevices,
    activeDevice: Math.min(activeDevice, nextDevices.length - 1),
    relay: { ...relay, entries },
    events,
  };
}

function takeSnapshot(state) {
  let { store, scale, events, devices, relay } = state;
  if (devices.some((device) => device.pending.length > 0)) {
    return {
      ...state,
      events: pushEvent(events, 'Snapshot unavailable: sync every pending spool entry first.'),
    };
  }
  // Snapshot seals the commit log first (force seal — do not invent bytes).
  let nextStore = { ...store };
  let nextEvents = events;
  if (nextStore.commitLogBytes > 0) {
    const settled = settle(nextStore, scale, nextEvents, { forceSeal: true });
    nextStore = settled.store;
    nextEvents = settled.events;
  }

  const heads = devices.map((d) => ({ device: d.name, seq: d.seq }));
  const covered = new Set(
    heads.flatMap((h) =>
      relay.entries.filter((e) => e.device === h.device && e.seq <= h.seq).map((e) => e.id),
    ),
  );
  const kept = relay.entries.filter((e) => !covered.has(e.id));
  const trimmed = relay.entries.length - kept.length + (relay.snapshot ? 1 : 0);

  nextEvents = pushEvent(
    nextEvents,
    `Snapshot published: records-store files (descriptor, CURRENT, runs) + a signed snapshot entry naming stream heads. Relay drops covered cloud-log entries and older snapshots (${trimmed} object${trimmed === 1 ? '' : 's'} trimmed). Rule: rows in the store travel in a snapshot; files beside the store do not.`,
  );

  return {
    ...state,
    store: { ...nextStore, fileCount: countFiles(nextStore) },
    relay: {
      snapshot: {
        id: `snap-${Date.now()}`,
        heads,
        runFiles: allRuns(nextStore).length,
        liveBytes: nextStore.liveBytes,
      },
      entries: kept,
      trimmed: relay.trimmed + trimmed,
    },
    events: nextEvents,
  };
}

function RunBar({ run, maxBytes, kind }) {
  const width = Math.max(8, Math.round((run.fileBytes / Math.max(maxBytes, 1)) * 100));
  const stalePct = run.fileBytes ? Math.round((run.staleBytes / run.fileBytes) * 100) : 0;
  return (
    <div
      className={`ssim-run ssim-run-${kind}`}
      style={{ width: `${width}%` }}
      title={`${fmtBytes(run.fileBytes)} · live ${fmtBytes(run.liveBytes)} · stale ${fmtBytes(run.staleBytes)}`}
    >
      <span className="ssim-run-live" style={{ width: `${100 - stalePct}%` }} />
      {stalePct > 0 && <span className="ssim-run-stale" style={{ width: `${stalePct}%` }} />}
      <span className="ssim-run-label">
        {fmtBytes(run.fileBytes)}
        {run.tombstones ? ` · ${run.tombstones} tomb` : ''}
      </span>
    </div>
  );
}

export default function StorageSimulator() {
  const [state, setState] = useState(initialState);
  const formId = useId();
  const { store, devices, relay, scale, recordBytes, burst, activeDevice, events } = state;

  const threshold = sealThreshold(runFileBytes(store), scale);
  const logPct = Math.min(100, Math.round((store.commitLogBytes / Math.max(threshold, 1)) * 100));
  const maxRun = Math.max(
    1,
    ...allRuns(store).map((r) => r.fileBytes),
    store.commitLogBytes,
    threshold,
  );

  const stats = useMemo(
    () => ({
      live: store.liveBytes,
      stale: store.staleBytes,
      files: store.fileCount,
      runs: allRuns(store).length,
      records: store.recordBytes.size,
      threshold,
    }),
    [store, threshold],
  );

  const onWrite = useCallback(
    (n, opts = {}) => setState((s) => applyWrites(s, n, opts.del, opts.upd)),
    [],
  );

  return (
    <div className="ssim" aria-label="Interactive storage simulator">
      <div className="ssim-toolbar">
        <div className="ssim-field">
          <label htmlFor={`${formId}-scale`}>Speed / scale</label>
          <select
            id={`${formId}-scale`}
            value={scale}
            onChange={(e) =>
              setState((s) => {
                const nextScale = Number(e.target.value);
                const settled = settle(s.store, nextScale, pushEvent(s.events, `Scale set to ${nextScale}× (thresholds ÷ ${nextScale}; real constants unchanged).`));
                return { ...s, scale: nextScale, store: settled.store, events: settled.events };
              })
            }
          >
            {SCALE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}× faster thresholds
              </option>
            ))}
          </select>
        </div>
        <div className="ssim-field">
          <label htmlFor={`${formId}-size`}>Record size</label>
          <select
            id={`${formId}-size`}
            value={recordBytes}
            onChange={(e) => setState((s) => ({ ...s, recordBytes: Number(e.target.value) }))}
          >
            {SIZE_OPTIONS.map((o) => (
              <option key={o.bytes} value={o.bytes}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="ssim-field">
          <label htmlFor={`${formId}-burst`}>Burst</label>
          <select
            id={`${formId}-burst`}
            value={burst}
            onChange={(e) => setState((s) => ({ ...s, burst: Number(e.target.value) }))}
          >
            {BURST_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} records
              </option>
            ))}
          </select>
        </div>
        <div className="ssim-field">
          <label htmlFor={`${formId}-device`}>Writing device</label>
          <select
            id={`${formId}-device`}
            value={activeDevice}
            onChange={(e) => setState((s) => ({ ...s, activeDevice: Number(e.target.value) }))}
          >
            {devices.map((d, i) => (
              <option key={d.name} value={i}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ssim-actions" role="group" aria-label="Simulator actions">
        <button type="button" className="ssim-btn ssim-btn-primary" onClick={() => onWrite(1)}>
          Add 1
        </button>
        <button type="button" className="ssim-btn" onClick={() => onWrite(burst)}>
          Burst {burst}
        </button>
        <button type="button" className="ssim-btn" onClick={() => onWrite(1, { upd: true })}>
          Update
        </button>
        <button type="button" className="ssim-btn" onClick={() => onWrite(1, { del: true })}>
          Delete
        </button>
        <button
          type="button"
          className="ssim-btn"
          disabled={devices.length >= 2}
          onClick={() =>
            setState((s) => {
              const devicesNext = [...s.devices, emptyDevice('Device B')];
              return {
                ...s,
                devices: devicesNext,
                activeDevice: devicesNext.length - 1,
                events: pushEvent(
                  s.events,
                  'Device B added and selected. This demo combines both devices’ local store activity in one view; each keeps its own cloud log. Only sync bookkeeping is per device.',
                ),
              };
            })
          }
        >
          Add device B
        </button>
        <button type="button" className="ssim-btn" onClick={() => setState((s) => syncDevices(s))}>
          Sync
        </button>
        <button
          type="button"
          className="ssim-btn"
          disabled={devices.some((device) => device.pending.length > 0)}
          onClick={() => setState((s) => takeSnapshot(s))}
        >
          Snapshot
        </button>
        <button type="button" className="ssim-btn ssim-btn-quiet" onClick={() => setState(initialState())}>
          Reset
        </button>
      </div>

      {devices.some((device) => device.pending.length > 0) && (
        <p className="ssim-scale-note">Sync pending spool entries before you publish a snapshot.</p>
      )}

      <p className="ssim-scale-note">
        Scaled seal threshold now: <strong>{fmtBytes(stats.threshold)}</strong>. Real rule:{' '}
        <code>run_bytes / 4</code> clamped {fmtBytes(REAL.SEAL_MIN)}–{fmtBytes(REAL.SEAL_MAX)}. Commit-log files are{' '}
        {fmtBytes(REAL.COMMIT_LOG_FILE)}; blocks {fmtBytes(REAL.BLOCK)}; encoded-log seal threshold {fmtBytes(REAL.MAX_MEMORY)}; MERGE_WIDTH{' '}
        {REAL.MERGE_WIDTH}; MAX_LEVELS {REAL.MAX_LEVELS}.
      </p>
      <p className="ssim-scale-note">
        This model estimates hidden value bytes from record sizes; LastStore measures hidden bytes by run overlap.
        The newer run carries that overlap estimate, including values hidden in the base.
        Tombstone-key bytes are tracked separately here.
      </p>

      <div className="ssim-grid">
        <section className="ssim-panel" aria-labelledby={`${formId}-log`}>
          <h3 id={`${formId}-log`}>Commit log</h3>
          <div className="ssim-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={logPct} aria-label="Commit log fill toward seal">
            <div className="ssim-meter-fill" style={{ width: `${logPct}%` }} />
          </div>
          <p className="ssim-meta">
            {fmtBytes(store.commitLogBytes)} / {fmtBytes(threshold)} · {store.commitLogCount} frame
            {store.commitLogCount === 1 ? '' : 's'} · {stats.records} live key{stats.records === 1 ? '' : 's'}
          </p>
        </section>

        <section className="ssim-panel" aria-labelledby={`${formId}-stats`}>
          <h3 id={`${formId}-stats`}>Store bytes</h3>
          <ul className="ssim-stats">
            <li>
              <span>Live</span>
              <strong>{fmtBytes(stats.live)}</strong>
            </li>
            <li>
              <span>Stale / tombstones</span>
              <strong>{fmtBytes(stats.stale)}</strong>
            </li>
            <li>
              <span>Run + log files</span>
              <strong>{stats.files}</strong>
            </li>
            <li>
              <span>Sealed runs</span>
              <strong>{stats.runs}</strong>
            </li>
          </ul>
        </section>
      </div>

      <section className="ssim-panel" aria-labelledby={`${formId}-levels`}>
        <h3 id={`${formId}-levels`}>Records store · levels and base</h3>
        {store.levels.map((level, i) =>
          level.length === 0 && i > 0 ? null : (
            <div className="ssim-level" key={`L${i}`}>
              <div className="ssim-level-label">L{i}</div>
              <div className="ssim-level-runs">
                {level.length === 0 ? (
                  <span className="ssim-empty">empty</span>
                ) : (
                  level.map((run) => <RunBar key={run.id} run={run} maxBytes={maxRun} kind="tier" />)
                )}
              </div>
            </div>
          ),
        )}
        <div className="ssim-level">
          <div className="ssim-level-label">Base</div>
          <div className="ssim-level-runs">
            {store.base.length === 0 ? (
              <span className="ssim-empty">no base pieces yet</span>
            ) : (
              <>
                {store.base.slice(0, 12).map((run) => (
                  <RunBar key={run.id} run={run} maxBytes={maxRun} kind="base" />
                ))}
                {store.base.length > 12 && (
                  <span className="ssim-empty">+{store.base.length - 12} more pieces</span>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <div className="ssim-grid">
        <section className="ssim-panel" aria-labelledby={`${formId}-clouds`}>
          <h3 id={`${formId}-clouds`}>Per-device cloud logs</h3>
          <div className="ssim-chains">
            {devices.map((d) => (
              <div key={d.name} className="ssim-chain">
                <div className="ssim-chain-head">
                  {d.name}
                  <span>
                    seq {d.seq}
                    {d.pending.length ? ` · ${d.pending.length} pending` : ''}
                  </span>
                </div>
                <ol className="ssim-chain-list">
                  {d.cloudLog.length === 0 && d.pending.length === 0 ? (
                    <li className="ssim-empty">no entries yet</li>
                  ) : (
                    <>
                      {d.cloudLog.length > 6 && (
                        <li className="ssim-empty">… {d.cloudLog.length - 6} earlier</li>
                      )}
                      {d.cloudLog.slice(-6).map((e) => (
                        <li key={e.id}>
                          #{e.seq} {e.kind} · {fmtBytes(e.bytes)}
                        </li>
                      ))}
                      {d.pending.slice(0, 3).map((e) => (
                        <li key={`p-${e.seq}`} className="ssim-pending">
                          pending {e.kind} · {fmtBytes(e.bytes)}
                        </li>
                      ))}
                      {d.pending.length > 3 && (
                        <li className="ssim-pending">… {d.pending.length - 3} more pending</li>
                      )}
                    </>
                  )}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section className="ssim-panel" aria-labelledby={`${formId}-relay`}>
          <h3 id={`${formId}-relay`}>Relay (untrusted)</h3>
          {relay.snapshot ? (
            <p className="ssim-meta">
              Snapshot <code>snap-…{relay.snapshot.id.slice(-4)}</code> · {fmtBytes(relay.snapshot.liveBytes)} live ·{' '}
              {relay.snapshot.runFiles} run file{relay.snapshot.runFiles === 1 ? '' : 's'} · heads{' '}
              {relay.snapshot.heads.map((h) => `${h.device}@${h.seq}`).join(', ')}
            </p>
          ) : (
            <p className="ssim-meta">No snapshot yet — relay can hold cloud-log entries only.</p>
          )}
          <ol className="ssim-chain-list">
            {relay.entries.length === 0 ? (
              <li className="ssim-empty">no cloud-log entries on relay</li>
            ) : (
              <>
                {relay.entries.length > 8 && (
                  <li className="ssim-empty">… {relay.entries.length - 8} earlier on relay</li>
                )}
                {relay.entries.slice(-8).map((e) => (
                  <li key={e.id}>
                    {e.device} #{e.seq} {e.kind}
                  </li>
                ))}
              </>
            )}
          </ol>
          <p className="ssim-meta">Trimmed over time: {relay.trimmed}</p>
        </section>
      </div>

      <section className="ssim-panel ssim-caption" aria-live="polite" aria-atomic="false">
        <h3>What just happened</h3>
        <ul>
          {events.map((e) => (
            <li key={e.id}>{e.text}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
