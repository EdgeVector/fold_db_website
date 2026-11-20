/* A navigable relationship map over the source-reviewed guide content. */
(() => {
  const G=window.GUIDE;
  const layers=Object.fromEntries(G.layers.map(l=>[l.id,l]));
  const parts=Object.fromEntries(G.layers.flatMap(l=>l.parts.map(p=>[p.id,{...p,layer:l.id}])));
  // Optional account setup is not unfinished work. Only explicit availability limits use dashes.
  const limited=p=>['candidate','unconnected','planned','dev-operation','dev','disabled'].includes(p?.status);
  const edges=[
    ["app-remove", "managed-app-install", "removes versions placed by"],
    ["app-remove", "app-grant", "revokes"],
    ["app-remove", "app-updates", "stops automatic reinstall by"],
    ["app-remove", "schema", "preserves"],
    ["app-remove", "record", "preserves"],
    ["node", "request-stats", "report completed calls through"],
    ["socket-workers", "request-stats", "record completed requests in"],
    ["request-stats", "schema", "groups read and write items by"],
    ["schema-advice", "app-registry", "reads public definitions pinned by"],
    ["app-publish", "account-payments", "can obtain a temporary publishing credential through"],
    ["app", "query-replies", "can check the record after a lost write reply through"],
    ["query-replies", "conditions", "return the revision required by"],
    ["conditions", "record-value", "guard the complete replacement of"],
    ["app", "compound-keys", "constructs explicit ranges with"],
    ["alternate-entries", "range-pages", "preserve duplicate-address members across"],
    ["ttl", "conditions", "checks the captured revision through"],
    ["alternate-entries", "lookup-key-derivation", "use each key’s own rules from"],
    ["format-writer", "lookup-key-derivation", "uses keys recreated by"],
    ["lookup-key-derivation", "hash-protection", "supplies the secret keys for"],
    ["lookup-key-derivation", "range-context", "uses schema order checked by"],
    ["local-schema-declaration", "lookup-key-derivation", "supplies key identities for"],
    ["format-writer", "expiry-tracking", "checks the schema owner of"],
    ["ttl", "expiry-tracking", "follows every hash-list page in"],
    ["record-value", "format-writer", "passes structure and final-size checks through"],
    ["format-writer", "local-schema-declaration", "validates and saves definitions from"],
    ["app-publish", "app-registry", "publishes permitted entries to"],
    ["app-publish", "app-compatibility", "signs the observed versions for"],
    ["app-publish", "managed-app-install", "has explicit signer trust in"],
    ["app-publish", "node", "records interface versions reported by"],
    ["app-publish", "app-publish-rules", "requires"],
    ["format-writer", "alternate-format", "uses the definitions of"],
    ["format-writer", "accepted-writes", "encodes and checks records from"],
    ["format-writer", "alternate-entries", "derives pointer changes for"],
    ["format-writer", "flush", "leaves saving to"],
    ["format-writer", "warm-set", "prepares saved records for"],
    ["node", "socket-workers", "serves separate owner and app sockets with"],
    ["app-publish-rules", "node", "reads app-owned schemas from"],
    ["app-publish-rules", "local-schema-declaration", "uses the same identity rules as"],
    ["schema-advice", "registry", "runs on"],
    ["schema-advice", "canonical-vocabulary", "compares draft fields with"],
    ["schema-advice", "local-schema-declaration", "does not block"],
    ["app-registry", "managed-app-install", "supplies the signed source commit to"],
    ["managed-app-install", "app", "switches stable command links for"],
    ["managed-app-install", "app-compatibility", "requires the selected interface from"],
    ["app-updates", "managed-app-install", "reuse approved instructions through"],
    ["app-updates", "app-registry", "poll the saved channel in"],
    ["app-updates", "app-rollback", "attempt recovery through"],
    ["app-rollback", "managed-app-install", "restores a retained version from"],
    ["app-rollback", "app-compatibility", "checks the prior version against"],
    ["app", "local-schema-declaration", "supplies fields, types, and keys to"],
    ["local-schema-declaration", "node", "runs locally on"],
    ["local-schema-declaration", "schema", "checks and loads"],
    ["local-schema-declaration", "field", "requires a declared type for each"],
    ["local-schema-declaration", "registry", "works without calling"],
    ["app-registry", "app-list-cache", "keeps verified catalog bytes in"],
    ["app-list-cache", "app-compatibility", "retains one catalog per API version for"],
    ["ttl", "expiry-progress", "remembers checked deleted keys through"],
    ["accepted-writes", "expiry-progress", "clear a skipped position after an older live write in"],
    ["expiry-progress", "range-pages", "continues from the last checked key through"],
    ["storage-reports", "record-home", "count live records in"],
    ["storage-reports", "node", "provide owner reports through"],
    ["ttl", "record-delete", "removes expired records through"],
    ["record", "record-value", "stores its fields in"],
    ["record-value", "record-home", "uses"],
    ["record-value", "schema", "keeps the fields declared by a"],
    ["record-home", "run-home", "uses the ordered files of a"],
    ["home-creation", "record-home", "creates the supported format for"],
    ["record-home", "alternate-format", "needs format 15 recognized by"],
    ["record-home", "flush", "saves a complete request through"],
    ["record-home", "alternate-entries", "updates its record and"],
    ["record-delete", "record-value", "saves a separate deletion stamp for"],
    ["record-delete", "alternate-entries", "removes affected"],
    ["schema-conversion", "schema", "preserve existing fields in a"],
    ["schema-conversion", "field-reuse", "keep values separate from"],
    ["schema-conversion", "alternate-format", "require the admission rules in"],
    ["schema-conversion", "record", "require an explicit copy of each older"],
    ["alternate-keys", "compound-keys", "can use explicit ranges prepared by"],
    ["compound-keys", "alternate-entries", "supply the coordinates for"],
    ["compound-keys", "alternate-format", "require the format checked by"],
    ["compound-keys", "record", "choose a list position for a"],
    ["field", "field-reuse", "has a reusable definition through"],
    ["field-reuse", "schema", "keeps record values owned by"],
    ["field-reuse", "canonical-vocabulary", "can reuse standard definitions from"],
    ["field-reuse", "alternate-keys", "keeps field meaning separate from"],
    ["schema", "alternate-keys", "can declare"],
    ["alternate-keys", "alternate-entries", "store routes through"],
    ["alternate-keys", "record", "find the same"],
    ["alternate-keys", "key", "retain the primary mutation"],
    ["alternate-keys", "alternate-format", "need a compatible layout checked by"],
    ["alternate-entries", "read-view", "check recorded addresses in one"],
    ["alternate-entries", "record", "point to the primary key of a"],
    ["alternate-entries", "snapshot-commit", "share the record’s"],
    ["alternate-entries", "hash-protection", "use separate key spaces for"],
    ["accepted-writes", "alternate-entries", "update affected"],
    ["delete-purge", "alternate-entries", "remove affected"],
    ["alternate-format", "run-home", "checks the saved layout of a"],
    ["home-creation", "alternate-format", "uses the same format as"],
    ["app", "alternate-keys", "can select by name"],
    ["read-metadata", "run-lookup", "reuses checked lookup blocks for"],
    ["read-metadata", "read-view", "lasts only for one"],
    ["read-metadata", "memory-budget", "uses a separate bounded allowance from"],
    ["read-metadata", "warm-set", "keeps temporary lookup blocks outside"],
    ["query-replies", "record", "include every stored field of each"],
    ["query-replies", "key", "require the usual scope from"],
    ["query-replies", "range-pages", "return records selected by"],
    ["accepted-writes", "write-read-reuse", "avoid repeated reads through"],
    ["write-read-reuse", "read-view", "uses one saved state from"],
    ["write-read-reuse", "run-lookup", "reuses exact results from"],
    ["write-read-reuse", "warm-set", "keeps its results separate from"],
    ["write-read-reuse", "memory-budget", "has a separate bounded allowance from"],
    ["file-delete-recovery", "snapshot-commit", "checks completed record changes from"],
    ["file-delete-recovery", "disk-root", "checks both saved positions in"],
    ["delete-purge", "file-delete-recovery", "protects file removal through"],
    ["run-merge", "space-reservation", "reserves each output through"],
    ["registry", "canonical-vocabulary", "checks definitions through"],
    ["canonical-vocabulary", "field", "checks the name and meaning of"],
    ["canonical-vocabulary", "schema", "offers meanings for fields in"],
    ["app", "canonical-vocabulary", "can read standard definitions from"],
    ["home-creation", "range-context", "sets the default typed rules used by"],
    ["node", "disk-cleanup", "accepts an owner request for"],
    ["disk-cleanup", "run-home", "cleans record files in"],
    ["disk-cleanup", "run-merge", "requests work below normal thresholds through"],
    ["disk-cleanup", "delete-purge", "keeps physical cleanup separate from"],
    ["accepted-writes", "memory-budget", "releases its private allowance before warm charges in"],
    ["range-protection", "run-encryption", "protects typed values through"],
    ["node", "home-creation", "sets up a new node through"],
    ["home-creation", "run-home", "prepares both disk homes in"],
    ["home-creation", "run-encryption", "requires the node key for"],
    ["home-creation", "disk-root", "completes setup before normal use of"],
    ["run-values", "run-files", "supply unchanged values to"],
    ["run-values", "run-encryption", "receive disk protection from"],
    ["run-lookup", "run-values", "returns"],
    ["run-merge", "run-base", "moves older records into"],
    ["run-merge", "stale-byte-count", "selects work with"],
    ["stale-byte-count", "run-files", "counts obsolete record bytes in"],
    ["stale-byte-count", "run-base", "can trigger a rewrite of"],
    ["run-base", "disk-root", "save step progress through"],
    ["run-lookup", "run-base", "opens one range file at a time in"],
    ["range-pages", "range-context", "carry next-page rules through"],
    ["range-context", "schema", "captures the declaration from"],
    ["range-context", "read-view", "keeps comparison separate from"],
    ["disk-root", "run-home", "uses an encrypted file list in"],
    ["run-home", "run-files", "stores records in"],
    ["run-home", "run-lookup", "serves keyed reads through"],
    ["run-home", "run-merge", "combines old files through"],
    ["run-home", "run-encryption", "protects blocks through"],
    ["snapshot-commit", "run-files", "adds a new run file through"],
    ["read-view", "run-lookup", "reads run homes through"],
    ["run-lookup", "run-files", "finds the newest key in"],
    ["run-lookup", "warm-set", "supplies fetched records to"],
    ["run-merge", "run-files", "combines older files from"],
    ["run-encryption", "disk-root", "protects the run file list selected by"],
    ["run-merge", "delete-purge", "keeps physical marker removal separate from"],
    ["app-compatibility", "app", "states version needs for"],
    ["app-registry", "app-compatibility", "selects an exact interface through"],
    ["node", "app-compatibility", "reports supported versions for"],
    ["range-pages", "record", "can reuse checked range values in"],
    ["accepted-writes", "write-queue", "places complete prepared changes in"],
    ["write-queue", "snapshot-commit", "shares immediate disk work through"],
    ["app-access", "socket-workers", "checks the connecting OS user before"],
    ["socket-workers", "accepted-writes", "can await disk completion of"],
    ["socket-workers", "write-queue", "releases its worker while a write waits in"],
    ["app", "node", "sends a request to"],
    ["app", "schema", "chooses"],
    ["node", "core-state", "coordinates"],
    ["app-access", "app", "accepts owner-user connections from"],
    ["registry", "schema", "offers separate advice about"],
    ["app-registry", "app", "lists signed source commits for"],
    ["schema", "field", "names"],
    ["schema", "key", "declares"],
    ["record", "app", "returns all its stored fields to"],
    ["schema", "core-state", "has definitions in"],
    ["core-state", "warm-set", "includes fetched records in"],
    ["recency", "warm-set", "select clean records to purge from"],
    ["holds", "warm-set", "protect records in"],
    ["accepted-writes", "core-state", "publish only after disk completion into"],
    ["accepted-writes", "flush", "retain changes until completion of"],
    ["memory-budget", "warm-set", "account for bytes in"],
    ["read-view", "core-state", "captures matching state from"],
    ["read-view", "disk-root", "checks its view before reading"],
    ["read-view", "warm-set", "admits successful fetches into"],
    ["key", "range-pages", "sets the hash and range for"],
    ["range-pages", "read-view", "fetch selected values through"],
    ["range-protection", "range-pages", "preserves the order used by"],
    ["flush", "snapshot-commit", "submits complete changes to"],
    ["snapshot-commit", "disk-root", "refuses unsafe locks before publishing"],
    ["space-reservation", "accepted-writes", "reserves output before"],
    ["ttl", "delete-purge", "uses the chosen removal operation in"],
    ["hash-protection", "key", "protects exact-key representation for"],
    ["range-protection", "key", "preserves range order for"],
    ["conditions", "accepted-writes", "check current facts before"],
    ["holds", "read-view", "retain values used by"],
    ["key", "run-lookup", "finds stored values through"],
    ["write-queue", "run-merge", "starts background file work through"],
    ["delete-purge", "run-merge", "leaves unused disk bytes for"],
    ["run-merge", "disk-root", "publishes replacement file lists through"],
    ["schema", "record", "owns"],
    ["field", "record-value", "has its value inside"],
    ["key", "record-value", "locates"],
    ["record-value", "warm-set", "can remain in"],
    ["record-home", "warm-set", "publishes saved records to"],
    ["warm-set", "flush", "admits writes after"],
    ["delete-purge", "record-delete", "uses"],
    ["record-delete", "run-merge", "leaves physical cleanup to"],
    ["record-value", "run-encryption", "protects stored bytes through"],
    ["app-grant", "app-access", "uses the separate app socket in"],
    ["managed-app-install", "app-grant", "registers or restores"],
    ["app-publish", "app-grant", "signs the declarations used by"],
    ["app-grant", "socket-workers", "uses a separate bounded pool in"],
    ["app-publish", "registry", "pushes signed definitions to"],
    ["managed-app-install", "registry", "fetches missing signed definitions from"],
    ["managed-app-install", "local-schema-declaration", "places checked definitions through"],
    ["change-feed", "accepted-writes", "stages numbered entries with"],
    ["change-feed", "record-delete", "reports deleted keys from"],
    ["change-feed", "app", "returns keys to refresh for"],
    ["app-api", "database", "selects"],
    ["app-databases", "database", "creates and lists"],
    ["app-databases", "named-members", "exposes owner grant actions for"],
    ["app-databases", "submission-status", "exposes"],
    ["app-databases", "open-read-link", "mints and accepts"],
    ["app-api", "guest-record-read", "requires a durable store for"],
    ["app-api", "file-blob", "reads local bytes from"],
    ["app-api", "conditions", "checks"],
    ["record", "record-authorship", "retains local"],
    ["record", "record-metadata", "contains"],
    ["record", "file-blob", "can own"],
    ["record", "inline-file", "can retain"],
    ["record-authorship", "record-value", "is stored in"],
    ["file-blob", "local-file-reference", "may use"],
    ["file-blob", "run-blob-home", "may keep bytes in"],
    ["file-blob", "file-dependencies", "uses checks from"],
    ["file-blob", "record-file-lifetime", "follows"],
    ["inline-file", "record-file-lifetime", "follows"],
    ["local-file-reference", "file-encryption", "keeps original bytes outside"],
    ["file-encryption", "run-encryption", "uses local"],
    ["flush", "accepted-stream", "can save"],
    ["accepted-stream", "automatic-backup", "is not yet consumed by"],
    ["snapshot-commit", "disk-holds", "preserves active reads with"],
    ["run-merge", "disk-holds", "retains files needed by"],
    ["run-blob-home", "file-delete-recovery", "finishes interrupted removals with"],
    ["schema-removal", "record-file-lifetime", "removes owned data through"],
    ["schema-removal", "schema", "retires"],
    ["file-dependencies", "file-encryption", "checks local bytes using"],
    ["automatic-backup", "frontier", "uploads queued entries from"],
    ["automatic-backup", "byte-backup-client", "sends requests through"],
    ["automatic-backup", "owner-device-sync", "has limits described by"],
    ["automatic-backup", "cloud-cutover", "does not prove"],
    ["recovery-chain", "frontier", "contains independent"],
    ["recovery-chain", "local-approval", "is checked by"],
    ["recovery-chain", "write-order", "chooses record values with"],
    ["recovery-chain", "cloud-files", "can name"],
    ["recovery-chain", "named-members", "carries"],
    ["recovery-chain", "unified-mutation-log", "distinguishes entry kinds in"],
    ["frontier", "local-approval", "records local acceptance from"],
    ["byte-backup-client", "cloud-destinations", "sends signed requests to"],
    ["byte-backup-client", "backup-transport", "has security limits described by"],
    ["cloud-destinations", "named-members", "gates access using"],
    ["cloud-destinations", "local-approval", "does not replace"],
    ["cloud-destinations", "cloud-files", "stores separate bytes for"],
    ["cloud-access", "account-payments", "uses"],
    ["cloud-access", "saved-cloud-credentials", "needs"],
    ["manual-cloud-connection", "saved-cloud-credentials", "saves"],
    ["manual-cloud-connection", "automatic-backup", "wakes"],
    ["cloud-cutover", "saved-cloud-credentials", "currently checks only"],
    ["cloud-cutover", "named-members", "is a prerequisite for"],
    ["restore", "restore-checks", "must satisfy"],
    ["restore", "named-recovery", "writes winners through"],
    ["restore", "restored-account", "prepares"],
    ["restore", "prod-recovery", "has evidence limits in"],
    ["restore", "recovery-chain", "reads named streams from"],
    ["restore-checks", "local-approval", "verifies entries with"],
    ["restore-checks", "frontier", "needs complete named"],
    ["named-recovery", "record", "materializes a limited form of"],
    ["named-recovery", "file-blob", "does not yet reconstruct"],
    ["owner-device-sync", "write-order", "depends on"],
    ["owner-device-sync", "share-cache", "does not yet populate"],
    ["share-spec", "database", "defines a collection in"],
    ["share-spec", "social-setup", "has an app example in"],
    ["social-app", "social-setup", "installs"],
    ["social-app", "social-circles", "manages"],
    ["social-app", "sharing-requests", "reviews"],
    ["social-app", "share-messages", "creates and accepts"],
    ["social-app", "app-databases", "calls"],
    ["social-circles", "named-members", "requests signed roles from"],
    ["sharing-requests", "social-circles", "plans access changes through"],
    ["named-members", "direct-member-write", "can authorize"],
    ["named-members", "submission-status", "can authorize"],
    ["named-members", "frontier", "queues signed entries in"],
    ["named-members", "local-approval", "is enforced by"],
    ["share-messages", "open-read-link", "carries sensitive material from"],
    ["share-messages", "share-cache", "registers through"],
    ["open-read-link", "named-members", "does not replace"],
    ["open-read-link", "cloud-cutover", "checks local readiness through"],
    ["share-cache", "guest-record-read", "must be ready for"],
    ["share-cache", "named-recovery", "still needs a connected path to"],
    ["unified-mutation-log", "direct-member-write", "includes"],
    ["unified-mutation-log", "publisher-intake", "needs incorporation through"],
    ["submission-status", "publisher-intake", "does not prove"],
    ["submission-status", "frontier", "saves proposals in"],
    ["direct-member-write", "write-order", "selects a winner with"],
    ["direct-member-write", "app-api", "is not yet connected to"],
    ["local-approval", "publisher-intake", "is distinct from"],
    ["node", "automatic-backup", "starts"],
    ["node-status", "automatic-backup", "reports errors from"],
    ["stable-release", "prod-recovery", "does not establish"],
    ["private-diagnostics", "node-status", "keeps diagnostics separate from"]
  ].map(([from,to,label,kind])=>({from,to,label,kind:kind||([parts[from],parts[to]].some(limited)?'design':'current')}));
  const meta={
    services:{title:'Apps & services',color:'var(--muted)',fill:'var(--tint-grey)',summary:'Apps ask. The node coordinates.',preview:'App · node · access · registries'},
    model:{title:'The data model',color:'var(--accent)',fill:'var(--tint-blue)',summary:'One structure across the system.',preview:'Schema → key → record → file'},
    memory:{title:'Memory',color:'var(--ok)',fill:'var(--tint-mint)',summary:'Current values and prepared writes.',preview:'Warm set · range pages · holds'},
    disk:{title:'Disk',color:'var(--amber)',fill:'var(--tint-peach)',summary:'Records, files, and durable changes.',preview:'Commit · files · compaction'},
    cloud:{title:'Cloud',color:'var(--sky)',fill:'var(--tint-sky)',summary:'Signed history; delivery is incomplete.',preview:'Grants · relay · limited restore'},
    share:{title:'Share',color:'var(--teal)',fill:'var(--tint-teal)',summary:'Signed roles and local validation.',preview:'People · permissions · changes'},
    protection:{title:'Keys & protection',color:'var(--violet)',fill:'var(--tint-lilac)',summary:'Find data and protect its content.',preview:'Key protection · encryption · write order'},
    lifetime:{title:'Life & deletion',color:'var(--warn)',fill:'var(--tint-rose)',summary:'Retain needed bytes; remove data with its owner.',preview:'Record files · expiry · deletion'}
  };
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state={area:'all',selected:null,group:null,scale:1,x:0,y:0,filter:'',expanded:false};
  const diskSteps=[
    ['format-writer','Prepare the change','Build the complete record and its related updates.'],
    ['write-queue','Queue the work','Ready requests can share one disk commit.'],
    ['snapshot-commit','Save the state','Save every related change before publishing the new state.'],
    ['flush','Return success','Publish the saved state in memory, then send the ack.']
  ];
  const diskGroups=[
    {title:'Read saved data',summary:'Find records by key in a consistent saved view.',ids:['record-home','run-home','disk-root','read-view','run-files','run-values','run-lookup','alternate-entries']},
    {title:'Store large files',summary:'Keep each record’s file bytes in a separate home.',ids:['run-blob-home','file-delete-recovery']},
    {title:'Make room safely',summary:'Combine old files and keep bytes that readers still need.',ids:['space-reservation','disk-holds','run-base','stale-byte-count','run-merge','disk-cleanup']},
    {title:'Saved changes and home setup',summary:'Retain changes for sync or open a compatible home.',ids:['accepted-stream','alternate-format','home-creation']}
  ];
  function diskOverview(){return `<section class="disk-overview" aria-label="Disk overview"><header><span class="eyebrow">Disk · the main path</span><h2>Save first. Then return success.</h2><p>A write follows these four steps. Select a step for its explanation.</p></header><ol class="disk-write-path">${diskSteps.map(([id,title,description],i)=>`<li><button data-diagram-part="${id}"><span class="disk-step-number" aria-hidden="true">${i+1}</span><span><strong>${title}</strong><span class="disk-step-description">${description}</span></span><span class="disk-step-open" aria-hidden="true">↗</span></button></li>`).join('')}</ol><p class="disk-backup-note">Cloud backup happens separately. A local success does not confirm a cloud copy.</p><h3>Explore a detail when you need it</h3><div class="disk-detail-groups">${diskGroups.map(group=>`<details><summary><strong>${group.title}</strong><span>${group.summary}</span></summary><div class="diagram-part-menu">${group.ids.map(id=>`<button data-diagram-part="${id}"><span>${esc(parts[id].name)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div></details>`).join('')}</div></section>`;}
  // These are navigation groups, not additional system parts or data-flow edges.
  const serviceGroups=[
    {id:'local',title:'Local node',summary:'Handle requests and see what the node is doing.',ids:['node','socket-workers','query-replies','storage-reports','node-status','request-stats']},
    {id:'requests',title:'App requests & access',summary:'Read, write, share, and understand the two sockets.',ids:['app','app-api','app-databases','app-grant','app-access','change-feed']},
    {id:'schemas',title:'Schema definitions',summary:'Define fields and keys, retrieve published definitions, and get optional advice.',ids:['registry','canonical-vocabulary','schema-advice','local-schema-declaration']},
    {id:'install',title:'App installation & updates',summary:'Choose a compatible app, install it, and manage its versions.',ids:['app-registry','app-compatibility','app-list-cache','managed-app-install','app-remove','app-updates','app-rollback']},
    {id:'publish',title:'App publishing & releases',summary:'Check and sign releases before offering them to app owners.',ids:['app-publish-rules','app-publish','stable-release']},
    {id:'cloud',title:'Cloud access',summary:'Authorize backup requests and manage account eligibility.',ids:['cloud-access','account-payments','backup-transport']}
  ];
  const serviceGroupByPart=Object.fromEntries(serviceGroups.flatMap(group=>group.ids.map(id=>[id,group.id])));
  const groupsFor=area=>area==='share'?G.shareGroups:area==='services'?serviceGroups:[];
  const groupByPart=Object.fromEntries([...serviceGroups,...G.shareGroups].flatMap(g=>g.ids.map(id=>[id,g.id])));
  const currentGroup=()=>groupsFor(state.area).find(g=>g.id===state.group);
  const partContext=p=>[meta[p.layer].title,groupsFor(p.layer).find(group=>group.id===groupByPart[p.id])?.title].filter(Boolean).join(' / ');
  const partCount=count=>`${count} ${count===1?'part':'parts'}`;
  function serviceOverview(){
    const group=currentGroup(),groups=groupsFor(state.area),areaTitle=meta[state.area].title;
    const cards=group?group.ids.map(id=>{const p=parts[id];return `<button data-diagram-part="${id}"><strong>${esc(p.name)}</strong><span>${esc(p.short)}</span><small>${partStatus(p)} <b aria-hidden="true">↗</b></small></button>`;}):groups.map(g=>`<button data-diagram-group="${g.id}"><strong>${esc(g.title)}</strong><span>${esc(g.summary)}</span><small>${partCount(g.ids.length)} <b aria-hidden="true">→</b></small></button>`);
    return `<section class="service-overview" aria-label="${group?esc(group.title):esc(areaTitle)+' overview'}"><header><span class="eyebrow">${group?esc(areaTitle)+' · '+partCount(group.ids.length):esc(areaTitle)+' · '+groups.length+' groups'}</span><h2 tabindex="-1">${group?esc(group.title):state.area==='share'?'Share a purpose. Choose your rules.':'Start with one job.'}</h2><p>${group?esc(group.summary):state.area==='share'?'Start with content and people. Explore signed roles, local entry validation, and the unfinished approval and delivery paths.':'Apps and services have different jobs. Open a group, then choose a part to see how it connects.'}</p>${state.area==='share'&&!group?'<a class="text-button" href="#share">Social, Medical, and Finance examples →</a>':''}</header><div class="service-group-cards">${cards.join('')}</div><p class="service-overview-note">${group?'Select a part for its purpose, limits, and connections across the system.':'All '+layers[state.area].parts.length+' parts remain available here and through search.'}</p></section>`;
  }
  let host=null,svg=null,nodes={},layoutBox={x:0,y:0,w:1240,h:1030},drag=null,pointers=new Map(),pinch=null,suppressClick=false,resizeObserver=null,narrowLayout=false;
  const overviewBoxes={services:{x:20,y:20,w:360,h:160},model:{x:445,y:20,w:360,h:160},share:{x:870,y:20,w:355,h:160},memory:{x:20,y:330,w:320,h:170},disk:{x:465,y:330,w:320,h:170},cloud:{x:910,y:330,w:315,h:170},protection:{x:65,y:640,w:480,h:160},lifetime:{x:700,y:640,w:480,h:160}};
  const overviewEdges=[
    ['share','cloud','signed entries'],['services','model','uses schemas and keys'],['model','memory','current records'],['model','disk','saved records'],
    ['memory','disk','save before ack'],['disk','cloud','not connected','design'],
    ['protection','memory','checks and protects'],['protection','disk','protects stored content'],
    ['lifetime','disk','record and file removal'],['lifetime','cloud','separate backup rules']
  ];
  function wrapped(text,max=25){const words=text.split(' '),out=[];let line='';for(const word of words){if(line&&line.length+word.length+1>max){out.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)out.push(line);return out;}
  function textLines(text,x,y,max,cls,lineHeight=18){return `<text class="${cls}" x="${x}" y="${y}">${wrapped(text,max).map((line,i)=>`<tspan x="${x}" dy="${i?lineHeight:0}">${esc(line)}</tspan>`).join('')}</text>`;}
  function endpoint(a,b){const ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;const dx=bx-ax,dy=by-ay;if(Math.abs(dx)/(a.w/2)>Math.abs(dy)/(a.h/2))return{x:ax+Math.sign(dx)*a.w/2,y:ay};return{x:ax,y:ay+Math.sign(dy)*a.h/2};}
  function curve(a,b){const p=endpoint(a,b),q=endpoint(b,a),horizontal=p.x===a.x||p.x===a.x+a.w;const dx=Math.abs(q.x-p.x)*.5,dy=Math.abs(q.y-p.y)*.5;const path=horizontal?`M${p.x},${p.y} C${p.x+Math.sign(q.x-p.x)*Math.max(35,dx)},${p.y} ${q.x-Math.sign(q.x-p.x)*Math.max(35,dx)},${q.y} ${q.x},${q.y}`:`M${p.x},${p.y} C${p.x},${p.y+Math.sign(q.y-p.y)*Math.max(35,dy)} ${q.x},${q.y-Math.sign(q.y-p.y)*Math.max(35,dy)} ${q.x},${q.y}`;return {path,x:(p.x+q.x)/2,y:(p.y+q.y)/2};}
  function arrow(a,b,label,design=false,showLabel=true){const c=curve(a,b);return `<g class="diagram-edge ${design?'design':''}"><path d="${c.path}" marker-end="url(#diagram-arrow${design?'-design':''})"/>${showLabel?`<g transform="translate(${c.x},${c.y})"><rect x="${-Math.max(50,label.length*4.8)}" y="-16" width="${Math.max(100,label.length*9.6)}" height="32" rx="5"/><text text-anchor="middle" y="6">${esc(label)}</text></g>`:''}</g>`;}
  function defs(){return `<defs><marker id="diagram-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1,1 L7,4 L1,7" fill="none" stroke="var(--muted)" stroke-width="1.4"/></marker><marker id="diagram-arrow-design" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1,1 L7,4 L1,7" fill="none" stroke="var(--sky)" stroke-width="1.4"/></marker><pattern id="diagram-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="var(--line)"/></pattern></defs>`;}
  function overview(){nodes={};const boxes=narrowLayout?{services:{x:20,y:20,w:610,h:160},model:{x:20,y:280,w:610,h:160},memory:{x:20,y:580,w:290,h:170},disk:{x:340,y:580,w:290,h:170},protection:{x:20,y:920,w:290,h:190},cloud:{x:340,y:920,w:290,h:170},lifetime:{x:20,y:1240,w:290,h:190},share:{x:340,y:1240,w:290,h:190}}:overviewBoxes;layoutBox=narrowLayout?{x:0,y:0,w:650,h:1490}:{x:0,y:0,w:1245,h:890};let html='';html+=overviewEdges.map(([a,b,label,kind])=>arrow(boxes[a],boxes[b],label,kind==='design',a!=='services'&&(!narrowLayout||a==='disk'))).join('');html+=Object.entries(boxes).map(([id,b])=>{const m=meta[id];return `<g class="diagram-area" data-diagram-area="${id}" tabindex="0" role="button" aria-label="Zoom into ${esc(m.title)}, ${layers[id].parts.length} parts" style="--area-color:${m.color}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="16" fill="${m.fill}"/><text x="${b.x+23}" y="${b.y+32}" class="diagram-area-count">${layers[id].number} / ${layers[id].parts.length} PARTS</text><text x="${b.x+23}" y="${b.y+70}" class="diagram-area-title">${m.title}</text>${textLines(m.summary,b.x+23,b.y+106,25,'diagram-area-summary',26)}<text x="${b.x+b.w-28}" y="${b.y+35}" class="diagram-area-open" text-anchor="end">↗</text></g>`;}).join('');return html;}
  function layerGraph(){
    const area=layers[state.area],selected=parts[state.selected];
    const connected=selected?edges.filter(e=>e.from===selected.id||e.to===selected.id):[];
    const neighbors=[...new Set(connected.flatMap(e=>[e.from,e.to]).filter(id=>id!==selected?.id))];
    // Use the explanation's related-part order, then any remaining named connections.
    const ordered=selected?[...new Set([...(selected.links||[]).filter(id=>neighbors.includes(id)),...neighbors])]:[];
    const visible=selected?[selected.id,...ordered.slice(0,6)]:area.parts.map(p=>p.id);
    const visibleSet=new Set(visible);
    const shown=connected.filter(e=>visibleSet.has(e.from)&&visibleSet.has(e.to));
    nodes={};
    visible.forEach((id,i)=>{
      let x,y;
      if(selected){
        if(narrowLayout){x=i===0?155:20+((i-1)%2)*270;y=i===0?90:265+Math.floor((i-1)/2)*145;}
        else{x=i===0?355:i<=3?30:680;y=i===0?270:110+((i-1)%3)*160;}
      }else{x=30+(i%(narrowLayout?2:3))*(narrowLayout?270:285);y=96+Math.floor(i/(narrowLayout?2:3))*145;}
      nodes[id]={x,y,w:240,h:102,part:parts[id],outside:parts[id].layer!==state.area};
    });
    layoutBox={x:0,y:0,w:narrowLayout?550:950,h:selected?(narrowLayout?265+Math.ceil((visible.length-1)/2)*145+65:640):96+Math.ceil(visible.length/(narrowLayout?2:3))*145+65};
    const note=selected?`${shown.length} OF ${connected.length} CONNECTIONS · ALL LISTED IN THE EXPLANATION`:`${area.parts.length} PARTS · SELECT ONE TO SEE ITS CONNECTIONS`;
    let html=`<text x="30" y="32" class="diagram-layer-heading">${esc(meta[state.area].title)}</text><text x="30" y="59" class="diagram-map-note">${note}</text>`;
    html+=shown.map(e=>arrow(nodes[e.from],nodes[e.to],e.label,e.kind==='design',false)).join('');
    html+=Object.entries(nodes).map(([id,n])=>{
      const p=parts[id],m=meta[p.layer],chosen=id===state.selected;
      return `<g class="diagram-node ${chosen?'selected':''} ${limited(p)?'design':''}" data-diagram-part="${id}" tabindex="0" role="button" aria-label="${esc(p.name)}${n.outside?', in '+esc(meta[p.layer].title):''}. ${esc(p.short)}" aria-pressed="${chosen}" style="--area-color:${m.color}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="10" fill="${chosen?m.fill:'var(--surface)'}"/><circle cx="${n.x+17}" cy="${n.y+20}" r="3.5" fill="${m.color}"/>${textLines(p.name,n.x+28,n.y+27,18,'diagram-node-title',24)}<text class="diagram-node-caption" x="${n.x+16}" y="${n.y+n.h-16}">${n.outside?esc(meta[p.layer].title)+' ↗':p.status&&p.status!=='current'?partStatus(p):'Select to understand'}</text></g>`;
    }).join('');
    return html;
  }
  function draw(fit=true){
    if(!host)return;
    svg=host.querySelector('#diagram-svg');if(!svg)return;
    narrowLayout=host.querySelector('.diagram-stage').clientWidth<520;
    const disk=state.area==='disk'&&!state.selected,services=groupsFor(state.area).length>0&&!state.selected,simple=disk||services;
    host.querySelector('#diagram-disk-overview').hidden=!disk;
    const serviceView=host.querySelector('#diagram-service-overview');
    serviceView.hidden=!services;if(services)serviceView.innerHTML=serviceOverview();
    svg.style.display=simple?'none':'';
    host.querySelector('.diagram-stage').classList.toggle('summary-view',simple);
    host.querySelector('.diagram-body').classList.toggle('summary-view',simple);
    svg.innerHTML=`${defs()}<g id="diagram-content">${simple?'':state.area==='all'?overview():layerGraph()}</g>`;
    if(fit){state.scale=1;state.x=0;state.y=0;}setView();updateToolbar();inspect();
  }
  function setView(){if(!svg)return;const w=layoutBox.w/state.scale,h=layoutBox.h/state.scale,cx=layoutBox.x+layoutBox.w/2+state.x,cy=layoutBox.y+layoutBox.h/2+state.y;svg.setAttribute('viewBox',`${cx-w/2} ${cy-h/2} ${w} ${h}`);const v=host.querySelector('#diagram-zoom-value');if(v)v.textContent=`${Math.round(state.scale*100)}%`;}
  function zoom(factor){state.scale=Math.min(4,Math.max(.65,state.scale*factor));setView();}
  function updateToolbar(){
    const group=currentGroup(),area=state.area==='all'?'Whole system':meta[state.area].title;
    const areaButton=host.querySelector('#diagram-current-area');
    areaButton.textContent=area;areaButton.disabled=!group;areaButton.dataset.diagramArea=state.area;
    host.querySelector('#diagram-group-breadcrumb').hidden=!group;
    host.querySelector('#diagram-current-group').textContent=group?.title||'';
    host.querySelector('#diagram-location').textContent=state.area==='all'?`${G.layers.length} areas · ${Object.keys(parts).length} parts`:`${area} · ${layers[state.area].parts.length} parts`;
    host.querySelector('#diagram-area-select').value=state.area;
    host.querySelector('#diagram-overview').disabled=state.area==='all';
    host.querySelector('#diagram-clear').hidden=!state.selected;
    host.querySelector('#diagram-clear').textContent=group?'← '+group.title:state.area==='disk'?'← Disk overview':'Clear selection ×';
    host.querySelector('.diagram-stage').classList.toggle('in-layer',state.area!=='all');
  }
  const partStatus=p=>p.status==='dev-operation'?'DEV only':p.status==='candidate'?'Unreleased source':p.status==='configured'?'Implemented · service setup':p.status==='optin'?'Implemented · optional':p.status==='manual'?'Implemented · manual':p.status==='unconnected'?'Source only · not connected':p.status==='dev'?'DEV only · release off':p.status==='planned'?'Future design':p.status==='disabled'?'Release disabled':'Current source';
  const edgeStatus=e=>[parts[e.from],parts[e.to]].some(p=>p.status==='unconnected')?' · SOURCE ONLY, NOT CONNECTED':[parts[e.from],parts[e.to]].some(p=>p.status==='dev-operation')?' · DEV ONLY':[parts[e.from],parts[e.to]].some(p=>p.status==='candidate')?' · UNRELEASED SOURCE':[parts[e.from],parts[e.to]].some(p=>p.status==='planned')?' · FUTURE DESIGN':[parts[e.from],parts[e.to]].some(p=>p.status==='dev')?' · DEV ONLY':[parts[e.from],parts[e.to]].some(p=>p.status==='disabled')?' · RELEASE OFF':[parts[e.from],parts[e.to]].some(p=>p.status==='configured')?' · SERVICE OPT-IN':[parts[e.from],parts[e.to]].some(p=>p.status==='optin')?' · OWNER OPT-IN':[parts[e.from],parts[e.to]].some(p=>p.status==='manual')?' · MANUAL, PERMISSION REQUIRED':' · CONDITIONAL PATH';
  function sourceLink(p){return p.source?`<a href="https://github.com/${p.repository||'EdgeVector/lastdb'}/blob/${p.revision||G.revision}/${esc(p.source)}" target="_blank" rel="noopener noreferrer">Read its source ↗</a>`:`<a href="/explore/sources/design-notes.html" target="_blank" rel="noopener noreferrer">Design notes ↗</a>`;}
  function inspect(){const panel=host.querySelector('#diagram-inspector');panel.scrollTop=0;if(!state.selected){const area=state.area==='all'?null:layers[state.area];panel.innerHTML=`<div class="diagram-inspector-top"><span class="eyebrow">${area?'Inside this area':'Start with the connections'}</span><h2>${area?esc(meta[state.area].title):'The whole system.'}</h2><p>${area?esc(area.intro):'This map shows the inside of one node: one person’s LastDB on their own Mac. Apps send requests. A write reaches disk before memory publication and success. Cloud backup is separate from local success. The replacement protocol uses signed history. Ordinary-write capture, received delivery, and general restore are incomplete. Share uses publisher-signed read, submit, and write grants. Local entry validation exists. Automatic publisher incorporation and received delivery remain unfinished. Signed transport does not itself encrypt the payload.'}</p></div><div class="diagram-inspector-body"><div class="explain-label">How to explore</div><ol class="diagram-instructions"><li>Select an area to zoom into its parts.</li><li>Select a part to see what it does and why.</li><li>Follow a connection to another part.</li></ol>${area?`<div class="explain-label">Parts in this area</div><div class="diagram-part-menu">${area.parts.map(p=>`<button data-diagram-part="${p.id}">${esc(p.name)} <span>↗</span></button>`).join('')}</div>`:`<div class="diagram-note"><strong>Whole-record storage.</strong><p>Format 15 derives lookup keys when needed and removes an extra file-encryption wrapper. Old dedicated shared homes and portable journals are refused. Registered Shares use separate personal-format homes. A replacement supplies every field and address to keep. An unchanged attachment stays separate.</p></div><div class="diagram-note cloud-note"><strong>Cloud is being reconnected.</strong><p>Signed history and grant checks are implemented. Dashed connections identify unfinished integration. Account setup alone does not establish complete backup or sharing.</p></div>`}</div>`;return;}
    const p=parts[state.selected],connections=edges.filter(e=>e.from===p.id||e.to===p.id);panel.innerHTML=`<div class="diagram-inspector-top" style="background:${meta[p.layer].fill}"><div class="diagram-part-context"><span>${esc(partContext(p))}</span><span>${partStatus(p)}</span></div><h2>${esc(p.name)}</h2><p>${esc(p.what)}</p></div><div class="diagram-inspector-body"><section><div class="explain-label">Why it exists</div><p>${esc(p.why)}</p></section><section class="diagram-example"><div class="explain-label">Example</div><p>${esc(p.example)}</p></section><section><div class="explain-label">Its connections · ${connections.length}</div><div class="diagram-connection-list">${connections.map(e=>{const other=e.from===p.id?e.to:e.from;return `<button data-diagram-part="${other}"><span class="diagram-connection-direction">${e.from===p.id?'OUT →':'← IN'}${e.kind==='design'?edgeStatus(e):''}</span><span><strong>${esc(parts[e.from].name)}</strong> ${esc(e.label)} <strong>${esc(parts[e.to].name)}</strong>.</span><small>${esc(partContext(parts[other]))} · select to follow ↗</small></button>`;}).join('')}</div></section><details class="optional-details"><summary>Limits and source</summary><p>${esc(p.limit)}</p><div class="diagram-source">${sourceLink(p)}</div></details><a class="secondary diagram-full-link" href="#${p.layer}/${p.id}">Open the full explanation →</a></div>`;}
  function chooseArea(id){state.area=layers[id]?id:'all';state.selected=null;state.group=null;state.filter='';const input=host.querySelector('#diagram-search');if(input)input.value='';hideResults();history.replaceState(null,'',`#diagram${state.area==='all'?'':'/'+state.area}`);draw();if(groupsFor(state.area).length)host.querySelector('.service-overview h2').focus();announce(state.area==='all'?'Whole system view':`Inside ${meta[state.area].title}. ${layers[state.area].parts.length} selectable parts.`);}
  function chooseGroup(id){
    const group=groupsFor(state.area).find(g=>g.id===id);if(!group)return;
    state.group=id;state.selected=null;hideResults();
    history.replaceState(null,'',`#diagram/${state.area}/group/${id}`);draw();host.querySelector('.service-overview h2').focus();
    announce(`${group.title}. ${group.ids.length} selectable ${group.ids.length===1?'part':'parts'}.`);
  }
  function choosePart(id){const p=parts[id];if(!p)return;state.area=p.layer;state.selected=id;state.group=groupByPart[id]||null;hideResults();history.replaceState(null,'',`#diagram/${p.layer}/${p.id}`);draw();announce(`${p.name} selected. Its purpose and connections appear beside the diagram.`);}
  function announce(text){host.querySelector('#diagram-announcement').textContent=text;}
  function hideResults(){const el=host.querySelector('#diagram-search-results');if(el){el.hidden=true;el.innerHTML='';}}
  function searchRank(p,q){const name=p.name.toLowerCase(),term=q.trim().toLowerCase();return name===term?0:name.includes(term)?1:p.short.toLowerCase().includes(term)?2:3;}
  function search(q){state.filter=q;const el=host.querySelector('#diagram-search-results');if(!q.trim()){hideResults();return;}const hits=Object.values(parts).filter(p=>[p.name,p.short,p.what,p.why,p.example,p.limit,meta[p.layer].title].join(' ').toLowerCase().includes(q.toLowerCase())).sort((a,b)=>searchRank(a,q)-searchRank(b,q)).slice(0,12);el.hidden=false;el.innerHTML=hits.length?hits.map(p=>`<button data-diagram-part="${p.id}"><strong>${esc(p.name)}</strong><small>${esc(partContext(p))} · ${esc(p.short)}</small></button>`).join(''):'<p>No part matches. Try “record” or “snapshot”.</p>';}
  function expand(){state.expanded=!state.expanded;host.querySelector('#diagram-shell').classList.toggle('expanded',state.expanded);document.body.classList.toggle('diagram-is-expanded',state.expanded);host.querySelector('#diagram-expand').textContent=state.expanded?'Close expanded view ↙':'Expand ↗';host.querySelector('#diagram-expand').setAttribute('aria-pressed',String(state.expanded));}
  function pointerDown(e){if(e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),scale:state.scale};drag=null;e.preventDefault();return;}drag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:state.x,startY:state.y,moved:false};}
  function pointerMove(e){if(pointers.has(e.pointerId))pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pinch&&pointers.size===2){const[a,b]=[...pointers.values()];state.scale=Math.min(4,Math.max(.65,pinch.scale*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(1,pinch.distance)));setView();suppressClick=true;return;}if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>5){drag.moved=true;suppressClick=true;svg.setPointerCapture(e.pointerId);svg.classList.add('is-dragging');const rect=svg.getBoundingClientRect();const units=Math.max(layoutBox.w/state.scale/rect.width,layoutBox.h/state.scale/rect.height);state.x=drag.startX-dx*units;state.y=drag.startY-dy*units;setView();}}
  function pointerUp(e){pointers.delete(e.pointerId);if(pinch){pinch=null;suppressClick=true;}if(drag?.id===e.pointerId){if(drag.moved)suppressClick=true;drag=null;}svg.classList.remove('is-dragging');if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);setTimeout(()=>{suppressClick=false;},0);}
  function mount(target,sub){if(host)unmount();host=target;const segments=location.hash.slice(1).split('/');const alias=G.aliases[segments[2]];segments[2]=alias||segments[2];state.area=parts[segments[2]]?parts[segments[2]].layer:layers[sub]?sub:'all';state.selected=parts[segments[2]]?.layer===state.area?segments[2]:null;state.group=groupByPart[state.selected]||((segments[2]==='group'&&groupsFor(state.area).some(g=>g.id===segments[3]))?segments[3]:null);state.expanded=false;host.className='diagram-page';host.innerHTML=`<div class="diagram-page-title"><div><div class="eyebrow">An interactive system map</div><h1>See how it connects.</h1><p class="intro">Zoom into an area. Select a part. Follow a connection to another part.</p></div><span class="badge note">${Object.keys(parts).length} parts · one system</span></div><div id="diagram-shell" class="diagram-shell"><div class="diagram-toolbar"><div class="diagram-breadcrumb"><button id="diagram-overview" data-diagram-command="overview">Whole system</button><span aria-hidden="true">/</span><button id="diagram-current-area" disabled>Whole system</button><span id="diagram-group-breadcrumb" hidden><span aria-hidden="true">/</span> <strong id="diagram-current-group"></strong></span></div><div class="diagram-tools"><label class="sr-only" for="diagram-area-select">Zoom into an area</label><select id="diagram-area-select"><option value="all">Whole system</option>${G.layers.map(l=>`<option value="${l.id}">${esc(meta[l.id].title)}</option>`).join('')}</select><button id="diagram-expand" data-diagram-command="expand" aria-pressed="false">Expand ↗</button></div></div><div class="diagram-body"><div class="diagram-canvas-column"><div class="diagram-find"><label class="sr-only" for="diagram-search">Find a part in the diagram</label><input id="diagram-search" type="search" placeholder="Find a part in the map…" autocomplete="off"><div id="diagram-search-results" hidden></div><button id="diagram-clear" data-diagram-command="clear" hidden>Clear selection ×</button></div><div class="diagram-stage"><div id="diagram-disk-overview" hidden>${diskOverview()}</div><div id="diagram-service-overview" hidden></div><svg id="diagram-svg" role="group" aria-label="Interactive LastDB system diagram. Select an area or a part." tabindex="0"></svg><div class="diagram-zoom-controls"><button data-diagram-command="out" aria-label="Zoom out">−</button><span id="diagram-zoom-value">100%</span><button data-diagram-command="in" aria-label="Zoom in">+</button><button data-diagram-command="fit">Fit view</button></div><span class="diagram-stage-location" id="diagram-location"></span></div><div class="diagram-legend"><span><i></i>Implemented connection</span>${edges.some(e=>e.kind==='design')?'<span><i class="dashed"></i>Proposed or unavailable path</span>':''}<span class="diagram-pan-hint">Drag to move · + / − to zoom</span><button class="diagram-read-below" data-diagram-command="explain">Read the explanation ↓</button></div><div class="diagram-context-note">Select a part to see a few direct connections. Every connection remains in its explanation. Arrows show duties or data movement, not every internal call.</div></div><aside id="diagram-inspector" class="diagram-inspector" aria-label="Selected part explanation"></aside></div><div id="diagram-announcement" class="sr-only" role="status" aria-live="polite"></div></div><p class="site-note">Source review: ${G.reviewed}. The map uses the same reviewed explanations as the guide. It does not connect to your database.</p>`;
    svg=host.querySelector('#diagram-svg');host.addEventListener('click',onClick);host.addEventListener('keydown',onKey);host.querySelector('#diagram-area-select').addEventListener('change',e=>chooseArea(e.target.value));host.querySelector('#diagram-search').addEventListener('input',e=>search(e.target.value));svg.addEventListener('pointerdown',pointerDown);svg.addEventListener('pointermove',pointerMove);svg.addEventListener('pointerup',pointerUp);svg.addEventListener('pointercancel',pointerUp);svg.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(e.deltaY<0?1.12:1/1.12);}},{passive:false});draw();resizeObserver=new ResizeObserver(entries=>{if(host&&(entries[0].contentRect.width<520)!==narrowLayout)draw();});resizeObserver.observe(host.querySelector('.diagram-stage'));}
  function onClick(e){if(suppressClick)return;const node=e.target.closest('[data-diagram-part]'),area=e.target.closest('[data-diagram-area]'),group=e.target.closest('[data-diagram-group]'),command=e.target.closest('[data-diagram-command]');if(node){choosePart(node.dataset.diagramPart);return;}if(area){chooseArea(area.dataset.diagramArea);return;}if(group){chooseGroup(group.dataset.diagramGroup);return;}if(command){const action=command.dataset.diagramCommand;if(action==='overview')chooseArea('all');if(action==='clear'){if(currentGroup()){chooseGroup(state.group);return;}state.selected=null;history.replaceState(null,'',`#diagram/${state.area}`);draw();announce(state.area==='disk'?'Disk overview. Four write steps and expandable details.':'Selection cleared. Choose a part to see its connections.');}if(action==='explain')host.querySelector('#diagram-inspector').scrollIntoView({behavior:'smooth',block:'start'});if(action==='in')zoom(1.25);if(action==='out')zoom(.8);if(action==='fit'){state.scale=1;state.x=0;state.y=0;setView();}if(action==='expand')expand();}}
  function onKey(e){const node=e.target.closest('[data-diagram-part],[data-diagram-area]');if(node&&node.tagName.toLowerCase()==='g'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onClick({target:node});return;}if(e.key==='Escape'){hideResults();if(state.expanded)expand();return;}if(e.target===svg){if(['+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')zoom(1.25);if(e.key==='-')zoom(.8);if(e.key==='Home'){state.scale=1;state.x=state.y=0;}if(e.key==='ArrowLeft')state.x-=80/state.scale;if(e.key==='ArrowRight')state.x+=80/state.scale;if(e.key==='ArrowUp')state.y-=80/state.scale;if(e.key==='ArrowDown')state.y+=80/state.scale;setView();}}
  function unmount(){if(resizeObserver){resizeObserver.disconnect();resizeObserver=null;}if(host){host.removeEventListener('click',onClick);host.removeEventListener('keydown',onKey);}document.body.classList.remove('diagram-is-expanded');host=null;svg=null;drag=null;pinch=null;pointers.clear();}
  window.LastDBDiagram={mount,unmount,edges};
})();
