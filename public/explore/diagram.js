/* A navigable relationship map over the source-reviewed guide content. */
(() => {
  const G=window.GUIDE;
  const layers=Object.fromEntries(G.layers.map(l=>[l.id,l]));
  const parts=Object.fromEntries(G.layers.flatMap(l=>l.parts.map(p=>[p.id,{...p,layer:l.id}])));
  const edges=[
    ["manual-cloud-connection","initial-backup","requests a starting base through"],
    ["cloud-access","account-payments","checks eligibility managed through"],
    ["socket-workers","named-members","dispatches live member requests for"],
    ["saved-queries","node","executes inside"],
    ["initial-backup","accepted-stream","preserves the base before"],
    ["initial-backup","disk-holds","keeps its captured runs with"],
    ["initial-backup","run-home","captures the starting state of"],
    ["initial-backup","run-blob-home","includes stored files from"],
    ["automatic-backup","initial-backup","publishes the saved base from"],
    ["initial-backup","native-snapshot","publishes its saved files through"],
    ["lagging-device-recovery","native-snapshot","installs the required base from"],
    ["lagging-device-recovery","accepted-stream","waits for confirmed publication of"],
    ["lagging-device-recovery","owner-device-sync","preserves device identity for"],
    ["lagging-device-recovery","restore-checks","rechecks staged and source data with"],
    ["lagging-device-recovery","node","requests a clean reopen of"],
    ["covered-log-cleanup","native-snapshot","requires a verified base from"],
    ["covered-log-cleanup","recovery-chain","removes only the covered prefix of"],
    ["covered-log-cleanup","lagging-device-recovery","can require newer clients with"],
    ["covered-log-cleanup","cloud-access","requires owner and service approval through"],
    ["prod-recovery","lagging-device-recovery","records a DEV cutoff pass for"],
    ["prod-recovery","covered-log-cleanup","records a DEV signed-reclaim pass for"],
    ["account-payments","cloud-access","uses the selected account at"],
    ["account-payments","saved-cloud-credentials","authenticates using"],
    ["manual-cloud-connection","account-payments","provides account access for"],
    ["frontier","owner-device-sync","keeps device positions for"],
    ["native-snapshot","prod-recovery","has separate operational evidence in"],
    ["native-snapshot","disk-holds","retains the captured files through"],
    ["native-snapshot","run-home","captures original files from"],
    ["native-snapshot","run-blob-home","captures stored attachments from"],
    ["native-snapshot","cloud-destinations","uploads its inventory to"],
    ["native-snapshot","accepted-stream","covers its captured position in"],
    ["native-snapshot","restore","provides a checked file base for"],
    ["native-snapshot","recovery-chain","provides the base required by"],
    ["automatic-backup","native-snapshot","publishes initial and requested bases through"],
    ["native-snapshot","local-file-reference","refuses external bytes held by"],
    ["owner-device-sync","unified-mutation-log","publishes and receives changes through"],
    ["owner-device-sync","write-order","chooses whole records using"],
    ["owner-device-sync","accepted-stream","preserves pending local changes in"],
    ["owner-device-sync","named-recovery","uses durable replay from"],
    ["native-snapshot","owner-device-sync","forks the restored author stream for"],
    ["social-app","named-members","reads and updates confirmed access through"],
    ["social-app","share-messages","returns sealed receipts from"],
    ["social-app","share-spec","filters database choices by"],
    ["social-app","database-session","issues a selected intent through"],
    ["social-app","guest-record-read","opens ready received data through"],
    ["social-app","local-approval","does not yet implement"],
    ["database-session","app-access","limits token-bearing requests within"],
    ["database-session","database","selects exactly one"],
    ["database-session","guest-record-read","allows received data reads through"],
    ["app","database-session","can send a selected token from"],
    ["app","database","selects an ID or local name from"],
    ["node","share-cache","opens receiver stores through"],
    ["database","guest-record-read","routes registered Share reads through"],
    ["guest-record-read","alternate-keys","supports verified lookups through"],
    ["guest-record-read","query-replies","returns ordinary records through"],
    ["files-sharing","database","selects an owned or received store through"],
    ["share-messages","database","register a received Share in"],
    ["files-sharing","unified-mutation-log","sends completed files through"],
    ["share-messages","share-cache","register read permission in"],
    ["share-cache","guest-record-read","provide local records for"],
    ["share-cache","disk-holds","keep current read files safe with"],
    ["share-cache","run-encryption","protect received records with"],
    ["files-sharing","share-cache","reads locally synchronized data from"],
    ["files-sharing","share-messages","requires an invitation from"],
    ["files-sharing","record-value","stores file chunks as"],
    ["files-sharing","key","finds every catalog and chunk by"],
    ["database","share-cache","keeps received records separate in"],
    ["local-file-reference","file-blob","is an alternative source for"],
    ["local-file-reference","record-metadata","keeps its marker in"],
    ["local-file-reference","record-file-lifetime","uses the removal rules in"],
    ["local-file-reference","file-encryption","leaves the original outside"],
    ["guest-permission","run-encryption","keeps the read token separate from the content key used by"],
    ["guest-permission","share-messages","travels encrypted inside"],
    ["guest-record-read","key","uses declared addresses from"],
    ["guest-record-read","record-value","returns the complete stored fields of"],
    ["guest-record-read","inline-file","can verify and return"],
    ["guest-record-read","file-blob","reads verified attachments from"],
    ["inline-file","record-value","belongs to"],
    ["inline-file","record-metadata","is described by a marker in"],
    ["inline-file","run-home","stores its separate row in"],
    ["inline-file","run-encryption","protects stored bytes with"],
    ["query-replies","inline-file","returns only the marker of"],
    ["file-blob","inline-file","can share one record with"],
    ["write-order","record-home","saves local writer progress with"],
    ["record-delete","write-order","keeps a separate applied-delete position from"],
    ["node","node-status","exposes health and request activity through"],
    ["node-status","socket-workers","reports request activity through"],
    ["app","query-replies","can check the record after a lost write reply through"],
    ["query-replies","conditions","return the revision required by"],
    ["conditions","record-value","guard the complete replacement of"],
    ["app","compound-keys","constructs explicit ranges with"],
    ["alternate-entries","range-pages","preserve duplicate-address members across"],
    ["ttl","conditions","checks the captured revision through"],
    ["record-metadata","record-file-lifetime","selects the retained file for"],
    ["alternate-entries","lookup-key-derivation","use each key’s own rules from"],
    ["format-writer","lookup-key-derivation","uses keys recreated by"],
    ["lookup-key-derivation","hash-protection","supplies the secret keys for"],
    ["lookup-key-derivation","range-context","uses schema order checked by"],
    ["local-schema-declaration","lookup-key-derivation","supplies key identities for"],
    ["format-writer","file-encryption","owns the payloads created by"],
    ["file-encryption","run-blob-home","supplies encrypted file entries to"],
    ["file-encryption","run-encryption","protects file content before"],
    ["format-writer","expiry-tracking","checks the schema owner of"],
    ["ttl","expiry-tracking","follows every hash-list page in"],
    ["schema-removal","expiry-tracking","clears all bounded pages of"],
    ["record-value","format-writer","passes structure and final-size checks through"],
    ["format-writer","write-order","saves the author clock used by"],
    ["format-writer","local-schema-declaration","validates and saves definitions from"],
    ["format-writer","schema-removal","owns the saved deletion formats for"],
    ["ci-app-publisher","stable-release","supplies signed entries before"],
    ["ci-app-publisher","app-publish","consumes checked declarations from"],
    ["ci-app-publisher","app-registry","publishes permitted entries to"],
    ["ci-app-publisher","app-compatibility","signs the observed versions for"],
    ["ci-app-publisher","managed-app-install","has explicit signer trust in"],
    ["ci-app-publisher","node","uses app-operation evidence from"],
    ["record-value","record-file-lifetime","owns its optional file through"],
    ["record-metadata","file-blob","reports the marker for"],
    ["file-blob","record-file-lifetime","has one owner through"],
    ["record-file-lifetime","record-home","saves marker and file changes through"],
    ["record-file-lifetime","run-blob-home","changes the record’s own path in"],
    ["record-file-lifetime","file-delete-recovery","uses interrupted deletion recovery from"],
    ["record-file-lifetime","run-merge","leaves old physical bytes for"],
    ["record-delete","record-file-lifetime","removes its file through"],
    ["schema-removal","record-file-lifetime","removes each record’s file through"],
    ["accepted-writes","record-file-lifetime","include file changes governed by"],
    ["file-dependencies","run-blob-home","checks stored file bytes from"],
    ["app-publish","app-publish-rules","requires"],
    ["stable-release","node","qualifies the packaged"],
    ["stable-release","app-registry","requires signed entries from"],
    ["stable-release","app-compatibility","proves the selected app commits for"],
    ["stable-release","app-publish","prepares unsigned declarations through"],
    ["stable-release","managed-app-install","installs exact app commits through"],
    ["stable-release","alternate-format","records the supported"],
    ["format-writer","alternate-format","uses the definitions of"],
    ["format-writer","accepted-writes","encodes and checks records from"],
    ["format-writer","alternate-entries","derives pointer changes for"],
    ["format-writer","record-file-lifetime","checks every changed record through"],
    ["format-writer","flush","leaves saving to"],
    ["format-writer","warm-set","prepares saved records for"],
    ["database","record-home","uses one local record space in"],
    ["node","socket-workers","serves through one owner socket with"],
    ["app-publish-rules","node","reads app-owned schemas from"],
    ["app-publish-rules","local-schema-declaration","uses the same identity rules as"],
    ["schema-advice","registry","runs on"],
    ["schema-advice","canonical-vocabulary","compares draft fields with"],
    ["schema-advice","local-schema-declaration","does not block"],
    ["app-registry","managed-app-install","supplies the signed source commit to"],
    ["managed-app-install","app","switches stable command links for"],
    ["managed-app-install","app-compatibility","requires the selected interface from"],
    ["app-updates","managed-app-install","reuse approved instructions through"],
    ["app-updates","app-registry","poll the saved channel in"],
    ["app-updates","app-rollback","attempt recovery through"],
    ["app-rollback","managed-app-install","restores a retained version from"],
    ["app-rollback","app-compatibility","checks the prior version against"],
    ["app","local-schema-declaration","supplies fields, types, and keys to"],
    ["local-schema-declaration","node","runs locally on"],
    ["local-schema-declaration","schema","checks and loads"],
    ["local-schema-declaration","field","requires a declared type for each"],
    ["local-schema-declaration","registry","works without calling"],
    ["app-publish","app-registry","supplies publisher-signed entries to"],
    ["app-publish","node","records interface versions reported by"],
    ["app-publish","app-compatibility","signs the interface declaration used by"],
    ["app-registry","app-list-cache","keeps verified catalog bytes in"],
    ["app-list-cache","app-compatibility","retains one catalog per API version for"],
    ["query-replies","record-metadata","return one block of"],
    ["schema","schema-removal","can be removed through"],
    ["schema-removal","record-home","releases personal records from"],
    ["schema-removal","alternate-entries","removes the declared"],
    ["schema-removal","disk-holds","leaves physical retention to"],
    ["ttl","expiry-progress","remembers checked deleted keys through"],
    ["accepted-writes","expiry-progress","clear a skipped position after an older live write in"],
    ["expiry-progress","range-pages","continues from the last checked key through"],
    ["storage-reports","record-home","count live records in"],
    ["storage-reports","node","provide owner reports through"],
    ["ttl","record-delete","uses the record cutoff and","design"],
    ["record","record-value","stores its fields in"],
    ["record-value","record-home","uses"],
    ["record-value","schema","keeps the fields declared by a"],
    ["record-value","file-blob","can own one"],
    ["record-home","run-home","uses the ordered files of a"],
    ["home-creation","record-home","creates the supported format for","design"],
    ["record-home","alternate-format","needs format 15 recognized by"],
    ["record-home","flush","saves a complete request through"],
    ["record-home","alternate-entries","updates its record and"],
    ["record-delete","record-value","saves a separate deletion stamp for"],
    ["record-delete","alternate-entries","removes affected"],
    ["schema-conversion","schema","preserve existing fields in a"],
    ["schema-conversion","field-reuse","keep values separate from"],
    ["schema-conversion","alternate-format","require the admission rules in"],
    ["schema-conversion","record","require an explicit copy of each older"],
    ["alternate-keys","compound-keys","can use explicit ranges prepared by"],
    ["compound-keys","alternate-entries","supply the coordinates for"],
    ["compound-keys","alternate-format","require the format checked by"],
    ["compound-keys","record","choose a list position for a"],
    ["field","field-reuse","has a reusable definition through"],
    ["field-reuse","schema","keeps record values owned by"],
    ["field-reuse","canonical-vocabulary","can reuse standard definitions from"],
    ["field-reuse","alternate-keys","keeps field meaning separate from"],
    ["schema","alternate-keys","can declare"],
    ["alternate-keys","alternate-entries","store routes through"],
    ["alternate-keys","record","find the same"],
    ["alternate-keys","key","retain the primary mutation"],
    ["alternate-keys","alternate-format","need a compatible layout checked by"],
    ["alternate-entries","read-view","check recorded addresses in one"],
    ["alternate-entries","record","point to the primary key of a"],
    ["alternate-entries","snapshot-commit","share the record’s"],
    ["alternate-entries","hash-protection","use separate key spaces for"],
    ["accepted-writes","alternate-entries","update affected"],
    ["delete-purge","alternate-entries","remove affected"],
    ["alternate-format","run-home","checks the saved layout of a"],
    ["home-creation","alternate-format","uses the same format as"],
    ["restore-checks","alternate-format","check the saved marker of"],
    ["app","alternate-keys","can select by name"],
    ["private-diagnostics","node","limit new error output from"],
    ["private-diagnostics","app-access","exclude arbitrary credential text from reports about"],
    ["read-metadata","run-lookup","reuses checked lookup blocks for"],
    ["read-metadata","read-view","lasts only for one"],
    ["read-metadata","memory-budget","uses a separate bounded allowance from"],
    ["read-metadata","warm-set","keeps temporary lookup blocks outside"],
    ["query-replies","record","include every stored field of each"],
    ["query-replies","key","require the usual scope from"],
    ["query-replies","range-pages","can omit metadata from"],
    ["accepted-writes","write-read-reuse","avoid repeated reads through"],
    ["write-read-reuse","read-view","uses one saved state from"],
    ["write-read-reuse","run-lookup","reuses exact results from"],
    ["write-read-reuse","warm-set","keeps its results separate from"],
    ["write-read-reuse","memory-budget","has a separate bounded allowance from"],
    ["file-delete-recovery","run-blob-home","finishes saved removals in"],
    ["file-delete-recovery","snapshot-commit","checks completed record changes from"],
    ["file-delete-recovery","disk-root","checks both saved positions in"],
    ["delete-purge","file-delete-recovery","protects file removal through"],
    ["run-merge","space-reservation","reserves each output through"],
    ["registry","canonical-vocabulary","checks definitions through"],
    ["canonical-vocabulary","field","checks the name and meaning of"],
    ["canonical-vocabulary","schema","offers meanings for fields in"],
    ["app","canonical-vocabulary","can read standard definitions from"],
    ["home-creation","range-context","sets the default typed rules used by"],
    ["node","disk-cleanup","accepts an owner request for"],
    ["disk-cleanup","run-home","cleans record files in"],
    ["disk-cleanup","run-blob-home","cleans stored file bytes in"],
    ["disk-cleanup","run-merge","requests work below normal thresholds through"],
    ["disk-cleanup","disk-holds","waits for active reads protected by"],
    ["disk-cleanup","delete-purge","keeps physical cleanup separate from"],
    ["node","search-delivery","must explicitly enable"],
    ["search-delivery","search-fields","selects values through"],
    ["search-delivery","search-service","supplies optional batches to"],
    ["search-fields","schema","reads field classifications from"],
    ["search-fields","file-blob","omits keys and file bytes from"],
    ["accepted-writes","memory-budget","releases its private allowance before warm charges in"],
    ["range-protection","run-encryption","protects typed values through"],
    ["node","home-creation","sets up a new node through"],
    ["home-creation","run-home","prepares both disk homes in"],
    ["home-creation","run-encryption","requires the node key for"],
    ["home-creation","disk-root","completes setup before normal use of"],
    ["run-values","run-files","supply unchanged values to"],
    ["run-values","run-encryption","receive disk protection from"],
    ["run-lookup","run-values","returns"],
    ["run-merge","run-base","moves older records into"],
    ["run-merge","stale-byte-count","selects work with"],
    ["stale-byte-count","run-files","counts obsolete record bytes in"],
    ["stale-byte-count","run-base","can trigger a rewrite of"],
    ["run-base","disk-root","save step progress through"],
    ["run-base","disk-holds","retain earlier read files through"],
    ["run-lookup","run-base","opens one range file at a time in"],
    ["run-home","run-blob-home","keeps attached files apart in"],
    ["file-blob","run-blob-home","stores file bytes in run homes through"],
    ["run-blob-home","run-files","uses the same ordered format as"],
    ["run-blob-home","run-encryption","has its own key from"],
    ["snapshot-commit","run-blob-home","saves new file bytes first in"],
    ["range-pages","range-context","carry next-page rules through"],
    ["range-context","schema","captures the declaration from"],
    ["range-context","read-view","keeps comparison separate from"],
    ["disk-root","run-home","uses an encrypted file list in"],
    ["run-home","run-files","stores records in"],
    ["run-home","run-lookup","serves keyed reads through"],
    ["run-home","run-merge","combines old files through"],
    ["run-home","run-encryption","protects blocks through"],
    ["snapshot-commit","run-files","adds a new run file through"],
    ["read-view","run-lookup","reads run homes through"],
    ["run-lookup","run-files","finds the newest key in"],
    ["run-lookup","warm-set","supplies fetched records to"],
    ["run-merge","disk-holds","retains old read files through"],
    ["run-merge","run-files","combines older files from"],
    ["run-encryption","disk-root","protects the run file list selected by"],
    ["run-merge","delete-purge","keeps physical marker removal separate from"],
    ["app-compatibility","app","states version needs for"],
    ["app-compatibility","search-delivery","checks the declared notice format for"],
    ["app-registry","app-compatibility","selects an exact interface through"],
    ["node","app-compatibility","reports supported versions for"],
    ["range-pages","record","can reuse checked range values in"],
    ["accepted-writes","write-queue","places complete prepared changes in"],
    ["write-queue","snapshot-commit","shares immediate disk work through"],
    ["app-access","socket-workers","checks the connecting OS user before"],
    ["socket-workers","accepted-writes","can await disk completion of"],
    ["socket-workers","write-queue","releases its worker while a write waits in"],
    ["app","node","sends a request to"],
    ["app","schema","chooses"],
    ["node","core-state","coordinates"],
    ["app-access","app","accepts owner-user connections from"],
    ["registry","schema","offers separate advice about"],
    ["app-registry","app","lists signed source commits for"],
    ["search-service","key","returns candidates for"],
    ["database","schema","selects"],
    ["schema","field","names"],
    ["schema","key","declares"],
    ["record","app","returns all its stored fields to"],
    ["schema","core-state","has definitions in"],
    ["core-state","warm-set","includes fetched records in"],
    ["recency","warm-set","select clean records to purge from"],
    ["holds","warm-set","protect records in"],
    ["accepted-writes","core-state","publish only after disk completion into"],
    ["accepted-writes","flush","retain changes until completion of"],
    ["memory-budget","warm-set","account for bytes in"],
    ["read-view","core-state","captures matching state from"],
    ["read-view","disk-root","checks its view before reading"],
    ["read-view","warm-set","admits successful fetches into"],
    ["key","range-pages","sets the hash and range for"],
    ["range-pages","read-view","fetch selected values through"],
    ["range-protection","range-pages","preserves the order used by"],
    ["flush","snapshot-commit","submits complete changes to"],
    ["snapshot-commit","disk-root","refuses unsafe locks before publishing"],
    ["disk-holds","disk-root","keep files selected by"],
    ["space-reservation","accepted-writes","reserves output before"],
    ["ttl","delete-purge","uses the chosen removal operation in"],
    ["accepted-writes","search-delivery","can send a batch after disk publication through"],
    ["hash-protection","key","protects exact-key representation for"],
    ["range-protection","key","preserves range order for"],
    ["file-encryption","file-blob","protects the bytes of"],
    ["conditions","accepted-writes","check current facts before"],
    ["holds","read-view","retain values used by"],
    ["key","run-lookup","finds stored values through"],
    ["write-queue","run-merge","starts background file work through"],
    ["delete-purge","run-merge","leaves unused disk bytes for"],
    ["run-merge","disk-root","publishes replacement file lists through"],
    ["schema","record","owns"],
    ["field","record-value","has its value inside"],
    ["key","record-value","locates"],
    ["record-value","warm-set","can remain in"],
    ["record-home","warm-set","publishes saved records to"],
    ["warm-set","flush","admits writes after"],
    ["write-order","record-value","identifies the complete revision of"],
    ["delete-purge","record-delete","uses"],
    ["record-delete","run-merge","leaves physical cleanup to"],
    ["record-metadata","record-value","belongs to"],
    ["file-dependencies","record-value","checks the file marker in"],
    ["record-value","run-encryption","protects stored bytes through"],
    ["database","share-spec","in shareable mode uses"],
    ["database","run-encryption","uses a distinct content key with"],
    ["saved-queries","database","copies between selected owned"],
    ["saved-queries","share-spec","projects only fields admitted by"],
    ["saved-queries","key","selects records using"],
    ["saved-queries","conditions","checks revisions through"],
    ["saved-queries","flush","follows completed writes from"],
    ["node","saved-queries","follows saved selections through"],
    ["files-sharing","share-spec","checks shareable publication eligibility with"],
    ["unified-mutation-log","share-spec","checks shareable publication eligibility with"],
    ["database","unified-mutation-log","requests cloud creation and activation through"],
    ["node","unified-mutation-log","runs the background worker for"],
    ["flush","accepted-stream","saves enabled capture before success in"],
    ["accepted-stream","snapshot-commit","share the durable commit boundary with"],
    ["accepted-stream","unified-mutation-log","supply eligible saved changes to"],
    ["accepted-stream","share-spec","in shareable mode are filtered by"],
    ["accepted-stream","local-file-reference","retain a checked source path for"],
    ["saved-queries","accepted-stream","create destination changes captured in"],
    ["unified-mutation-log","named-recovery","recovers expired cursors through"],
    ["unified-mutation-log","named-members","refreshes shareable grant revisions from"],
    ["named-recovery","share-cache","replays into the registered signed store in"],
    ["named-recovery","guest-record-read","requires a durable prefix before"],
    ["named-recovery","flush","waits for durable replay through"],
    ["named-recovery","file-blob","downloads and verifies referenced bytes for"],
    ["named-recovery","run-encryption","uses the database content key from"],
    ["named-members","share-messages","grants access before sealing"],
    ["named-members","database","binds each signed member list to"],
    ["run-encryption","unified-mutation-log","binds encrypted entries and files for"],
    ["named-members","local-approval","would identify permitted senders for","design"],
    ["unified-mutation-log","local-approval","would deliver changes for","design"],
    ["local-approval","guest-record-read","would choose the accepted local view for","design"],
    ["node","automatic-backup","runs one signed worker through"],
    ["automatic-backup","accepted-stream","reads saved changes from"],
    ["automatic-backup","unified-mutation-log","publishes through"],
    ["automatic-backup","cloud-cutover","waits for"],
    ["automatic-backup","saved-cloud-credentials","requires account access from"],
    ["automatic-backup","restore","supplies published changes for"],
    ["saved-cloud-credentials","accepted-stream","enable personal capture at startup in"],
    ["saved-cloud-credentials","registry","select the matching service for"],
    ["saved-cloud-credentials","cloud-access","supply saved account access to"],
    ["manual-cloud-connection","saved-cloud-credentials","saves existing access as"],
    ["manual-cloud-connection","cloud-access","prepares account access for"],
    ["node","manual-cloud-connection","accepts an explicit request through"],
    ["restored-account","saved-cloud-credentials","saves existing access as"],
    ["restore","restored-account","leaves later connection to"],
    ["cloud-cutover","database","confirms one selected"],
    ["cloud-cutover","cloud-access","requires a matching live reply from"],
    ["cloud-cutover","unified-mutation-log","permits signed work through"],
    ["accepted-stream","automatic-backup","block publication on gaps or missing baseline in"],
    ["unified-mutation-log","cloud-files","uploads required objects through"],
    ["cloud-files","byte-backup-client","transfer exact sealed objects through"],
    ["cloud-files","cloud-destinations","upload file objects to"],
    ["cloud-files","restore","supply required objects during"],
    ["local-file-reference","cloud-files","must remain unchanged until upload through"],
    ["file-blob","cloud-files","uploads eligible bytes through"],
    ["inline-file","cloud-files","supplies attachment bytes for"],
    ["cloud-files","file-encryption","reseal replayed bytes for local storage with"],
    ["byte-backup-client","backup-transport","uses authenticated requests through"],
    ["byte-backup-client","saved-cloud-credentials","reads account access from"],
    ["backup-transport","cloud-destinations","transfers authorized objects to"],
    ["backup-transport","cloud-access","requests permission through"],
    ["cloud-access","cloud-destinations","routes eligible requests to"],
    ["unified-mutation-log","frontier","tracks separate delivery positions in"],
    ["accepted-stream","frontier","track local saved and published positions in"],
    ["frontier","restore","is separate from the cloud head selected by"],
    ["restore","restore-checks","requires a continuous prefix verified by"],
    ["restore","recovery-chain","replays retained changes from"],
    ["restore","named-recovery","rebuilds the selected store through"],
    ["restore","home-creation","stages a fresh destination through"],
    ["restore","saved-cloud-credentials","requires account access from"],
    ["restore-checks","file-dependencies","validates required objects through"],
    ["recovery-chain","named-recovery","requires a saved base for expired-cursor catch-up through"],
    ["named-recovery","cloud-files","fetches and verifies required objects through"],
    ["named-recovery","frontier","saves completed replay in"],
    ["file-dependencies","cloud-files","identify required objects for"],
    ["prod-recovery","restore","records a DEV snapshot pass for"],
    ["prod-recovery","named-recovery","has no new PROD qualification for"],
    ["node-status","automatic-backup","does not prove cloud coverage from"],
    ["backup-read-buffers","memory-budget","use bounded working memory alongside"],
    ["backup-read-buffers","run-encryption","authenticate native blocks protected by"],
    ["named-members","cloud-access","checks saved account and endpoint with"],
    ["stable-release","restore","qualifies packaged code separately from"],
    ["guaranteed-write","cloud-access","requires a cloud grant through"],
    ["write-order","unified-mutation-log","distinguishes local revisions from merge order in"]
  ].map(([from,to,label,kind])=>({from,to,label,kind:kind||([parts[from],parts[to]].some(part=>['candidate','unconnected','planned','dev-operation'].includes(part?.status))?'design':'current')}));
  const meta={
    services:{title:'Apps & services',color:'#65776a',fill:'#e9efea',summary:'Apps ask. The node coordinates.',preview:'App · node · access · registries'},
    model:{title:'The data model',color:'#55764f',fill:'#e3eddf',summary:'One structure across the system.',preview:'Schema → key → record → file'},
    memory:{title:'Memory',color:'#52774a',fill:'#e2eddf',summary:'Current values and prepared writes.',preview:'Warm set · range pages · holds'},
    disk:{title:'Disk',color:'#9b803d',fill:'#f2ead5',summary:'Records, files, and durable changes.',preview:'Commit · files · compaction'},
    cloud:{title:'Cloud',color:'#6c8ba2',fill:'#e7eff6',summary:'Backup and checked recovery.',preview:'Signed log · files · recovery'},
    share:{title:'Share',color:'#508d84',fill:'#e1efeb',summary:'Shared changes and local choices.',preview:'People · log · local acceptance'},
    protection:{title:'Keys & protection',color:'#897396',fill:'#eee7f2',summary:'Find data and protect its content.',preview:'Key protection · encryption · write order'},
    lifetime:{title:'Life & deletion',color:'#9c7850',fill:'#f1e8dc',summary:'Retain needed bytes; remove data with its owner.',preview:'Record files · expiry · deletion'}
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
    {title:'Saved changes and home setup',summary:'Retain changes for sync or open a compatible home.',ids:['accepted-stream','initial-backup','alternate-format','home-creation']}
  ];
  function diskOverview(){return `<section class="disk-overview" aria-label="Disk overview"><header><span class="eyebrow">Disk · the main path</span><h2>Save first. Then return success.</h2><p>A write follows these four steps. Select a step for its explanation.</p></header><ol class="disk-write-path">${diskSteps.map(([id,title,description],i)=>`<li><button data-diagram-part="${id}"><span class="disk-step-number" aria-hidden="true">${i+1}</span><span><strong>${title}</strong><span class="disk-step-description">${description}</span></span><span class="disk-step-open" aria-hidden="true">↗</span></button></li>`).join('')}</ol><p class="disk-backup-note">Cloud backup happens separately. A local success does not confirm a cloud copy.</p><h3>Explore a detail when you need it</h3><div class="disk-detail-groups">${diskGroups.map(group=>`<details><summary><strong>${group.title}</strong><span>${group.summary}</span></summary><div class="diagram-part-menu">${group.ids.map(id=>`<button data-diagram-part="${id}"><span>${esc(parts[id].name)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div></details>`).join('')}</div></section>`;}
  // These are navigation groups, not additional system parts or data-flow edges.
  const serviceGroups=[
    {id:'local',title:'Local node & requests',summary:'Run apps, handle requests, and see what the node is doing.',ids:['app','node','app-access','database-session','socket-workers','query-replies','storage-reports','node-status']},
    {id:'schemas',title:'Schema definitions',summary:'Define fields and keys, with shared vocabulary and optional advice.',ids:['registry','canonical-vocabulary','schema-advice','local-schema-declaration']},
    {id:'install',title:'App installation & updates',summary:'Choose a compatible app, install it, and manage its versions.',ids:['app-registry','app-compatibility','app-list-cache','managed-app-install','app-updates','app-rollback']},
    {id:'publish',title:'App publishing & releases',summary:'Check and sign releases before offering them to app owners.',ids:['app-publish-rules','app-publish','ci-app-publisher','stable-release']},
    {id:'search',title:'Search',summary:'Keep search outside the database, with an optional inbox for saved changes.',ids:['search-service','search-delivery','search-fields']},
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
    return `<section class="service-overview" aria-label="${group?esc(group.title):esc(areaTitle)+' overview'}"><header><span class="eyebrow">${group?esc(areaTitle)+' · '+partCount(group.ids.length):esc(areaTitle)+' · '+groups.length+' groups'}</span><h2 tabindex="-1">${group?esc(group.title):state.area==='share'?'Share a purpose. Choose your rules.':'Start with one job.'}</h2><p>${group?esc(group.summary):state.area==='share'?'Start with content and people, then follow changes into the local view. Local approval is a proposed step.':'Apps and services have different jobs. Open a group, then choose a part to see how it connects.'}</p>${state.area==='share'&&!group?'<a class="text-button" href="#share">Social, Medical, and Finance examples →</a>':''}</header><div class="service-group-cards">${cards.join('')}</div><p class="service-overview-note">${group?'Select a part for its purpose, limits, and connections across the system.':'All '+layers[state.area].parts.length+' parts remain available here and through search.'}</p></section>`;
  }
  let host=null,svg=null,nodes={},layoutBox={x:0,y:0,w:1240,h:1030},drag=null,pointers=new Map(),pinch=null,suppressClick=false,resizeObserver=null,narrowLayout=false;
  const overviewBoxes={services:{x:20,y:20,w:360,h:160},model:{x:445,y:20,w:360,h:160},share:{x:870,y:20,w:355,h:160},memory:{x:20,y:330,w:320,h:170},disk:{x:465,y:330,w:320,h:170},cloud:{x:910,y:330,w:315,h:170},protection:{x:65,y:640,w:480,h:160},lifetime:{x:700,y:640,w:480,h:160}};
  const overviewEdges=[
    ['share','cloud','encrypted changes','design'],['services','model','uses schemas and keys'],['model','memory','current records'],['model','disk','saved records'],
    ['memory','disk','save before ack'],['disk','cloud','opt-in backup','design'],
    ['protection','memory','checks and protects'],['protection','disk','protects stored content'],
    ['lifetime','disk','record and file removal'],['lifetime','cloud','separate backup rules','design']
  ];
  function wrapped(text,max=25){const words=text.split(' '),out=[];let line='';for(const word of words){if(line&&line.length+word.length+1>max){out.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)out.push(line);return out;}
  function textLines(text,x,y,max,cls,lineHeight=18){return `<text class="${cls}" x="${x}" y="${y}">${wrapped(text,max).map((line,i)=>`<tspan x="${x}" dy="${i?lineHeight:0}">${esc(line)}</tspan>`).join('')}</text>`;}
  function endpoint(a,b){const ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;const dx=bx-ax,dy=by-ay;if(Math.abs(dx)/(a.w/2)>Math.abs(dy)/(a.h/2))return{x:ax+Math.sign(dx)*a.w/2,y:ay};return{x:ax,y:ay+Math.sign(dy)*a.h/2};}
  function curve(a,b){const p=endpoint(a,b),q=endpoint(b,a),horizontal=p.x===a.x||p.x===a.x+a.w;const dx=Math.abs(q.x-p.x)*.5,dy=Math.abs(q.y-p.y)*.5;const path=horizontal?`M${p.x},${p.y} C${p.x+Math.sign(q.x-p.x)*Math.max(35,dx)},${p.y} ${q.x-Math.sign(q.x-p.x)*Math.max(35,dx)},${q.y} ${q.x},${q.y}`:`M${p.x},${p.y} C${p.x},${p.y+Math.sign(q.y-p.y)*Math.max(35,dy)} ${q.x},${q.y-Math.sign(q.y-p.y)*Math.max(35,dy)} ${q.x},${q.y}`;return {path,x:(p.x+q.x)/2,y:(p.y+q.y)/2};}
  function arrow(a,b,label,design=false,showLabel=true){const c=curve(a,b);return `<g class="diagram-edge ${design?'design':''}"><path d="${c.path}" marker-end="url(#diagram-arrow${design?'-design':''})"/>${showLabel?`<g transform="translate(${c.x},${c.y})"><rect x="${-Math.max(50,label.length*4.8)}" y="-16" width="${Math.max(100,label.length*9.6)}" height="32" rx="5"/><text text-anchor="middle" y="6">${esc(label)}</text></g>`:''}</g>`;}
  function defs(){return `<defs><marker id="diagram-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1,1 L7,4 L1,7" fill="none" stroke="#8b9b82" stroke-width="1.4"/></marker><marker id="diagram-arrow-design" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1,1 L7,4 L1,7" fill="none" stroke="#8fa5b6" stroke-width="1.4"/></marker><pattern id="diagram-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#dce2d6"/></pattern></defs>`;}
  function overview(){nodes={};const boxes=narrowLayout?{services:{x:20,y:20,w:610,h:160},model:{x:20,y:280,w:610,h:160},memory:{x:20,y:580,w:290,h:170},disk:{x:340,y:580,w:290,h:170},protection:{x:20,y:920,w:290,h:190},cloud:{x:340,y:920,w:290,h:170},lifetime:{x:20,y:1240,w:290,h:190},share:{x:340,y:1240,w:290,h:190}}:overviewBoxes;layoutBox=narrowLayout?{x:0,y:0,w:650,h:1490}:{x:0,y:0,w:1245,h:890};let html='';html+=overviewEdges.map(([a,b,label,kind])=>arrow(boxes[a],boxes[b],label,kind==='design',a!=='services'&&(!narrowLayout||a==='disk'))).join('');html+=Object.entries(boxes).map(([id,b])=>{const m=meta[id];return `<g class="diagram-area ${id==='cloud'?'design':''}" data-diagram-area="${id}" tabindex="0" role="button" aria-label="Zoom into ${esc(m.title)}, ${layers[id].parts.length} parts" style="--area-color:${m.color}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="16" fill="${m.fill}"/><text x="${b.x+23}" y="${b.y+32}" class="diagram-area-count">${layers[id].number} / ${layers[id].parts.length} PARTS${id==='cloud'?' · OWNER OPT-IN':''}</text><text x="${b.x+23}" y="${b.y+70}" class="diagram-area-title">${m.title}</text>${textLines(m.summary,b.x+23,b.y+106,25,'diagram-area-summary',26)}<text x="${b.x+b.w-28}" y="${b.y+35}" class="diagram-area-open" text-anchor="end">↗</text></g>`;}).join('');return html;}
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
      return `<g class="diagram-node ${chosen?'selected':''} ${p.design||['candidate','unconnected','dev-operation','planned'].includes(p.status)?'design':''}" data-diagram-part="${id}" tabindex="0" role="button" aria-label="${esc(p.name)}${n.outside?', in '+esc(meta[p.layer].title):''}. ${esc(p.short)}" aria-pressed="${chosen}" style="--area-color:${m.color}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="10" fill="${chosen?m.fill:'#fff'}"/><circle cx="${n.x+17}" cy="${n.y+20}" r="3.5" fill="${m.color}"/>${textLines(p.name,n.x+28,n.y+27,18,'diagram-node-title',24)}<text class="diagram-node-caption" x="${n.x+16}" y="${n.y+n.h-16}">${n.outside?esc(meta[p.layer].title)+' ↗':p.design||['unconnected','dev-operation','planned'].includes(p.status)?partStatus(p):'Select to understand'}</text></g>`;
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
  const partStatus=p=>p.status==='dev-operation'?'DEV only':p.status==='candidate'?'Unreleased source':p.status==='configured'?'Service opt-in':p.status==='optin'?'Owner opt-in':p.status==='manual'?'Manual · opt-in':p.status==='unconnected'?'Source only · not connected':p.status==='dev'?'DEV only · release off':p.status==='planned'?'Future design':p.design?'Source exists · release off':'Current source';
  const edgeStatus=e=>[parts[e.from],parts[e.to]].some(p=>p.status==='unconnected')?' · SOURCE ONLY, NOT CONNECTED':[parts[e.from],parts[e.to]].some(p=>p.status==='dev-operation')?' · DEV ONLY':[parts[e.from],parts[e.to]].some(p=>p.status==='candidate')?' · UNRELEASED SOURCE':[parts[e.from],parts[e.to]].some(p=>p.status==='planned')?' · FUTURE DESIGN':[parts[e.from],parts[e.to]].some(p=>p.status==='dev')?' · DEV ONLY':[parts[e.from],parts[e.to]].some(p=>p.status==='disabled')?' · RELEASE OFF':[parts[e.from],parts[e.to]].some(p=>p.status==='configured')?' · SERVICE OPT-IN':[parts[e.from],parts[e.to]].some(p=>p.status==='optin')?' · OWNER OPT-IN':[parts[e.from],parts[e.to]].some(p=>p.status==='manual')?' · MANUAL, PERMISSION REQUIRED':' · CONDITIONAL PATH';
  function sourceLink(p){return p.source?`<a href="https://github.com/EdgeVector/lastdb/blob/${p.revision||G.revision}/${esc(p.source)}" target="_blank" rel="noopener noreferrer">Read its source ↗</a>`:`<a href="/explore/sources/design-notes.html" target="_blank" rel="noopener noreferrer">Design notes ↗</a>`;}
  function inspect(){const panel=host.querySelector('#diagram-inspector');panel.scrollTop=0;if(!state.selected){const area=state.area==='all'?null:layers[state.area];panel.innerHTML=`<div class="diagram-inspector-top"><span class="eyebrow">${area?'Inside this area':'Start with the connections'}</span><h2>${area?esc(meta[state.area].title):'The whole system.'}</h2><p>${area?esc(area.intro):'Apps send requests. A write reaches disk before memory publication and success. Cloud backup is separate from local success. Recovery uses a checked snapshot and later signed changes. A fresh restore and recovery of a lagging personal device have separate checks. Share connects people, permissions, and a local view. Its proposed approval step is marked separately.'}</p></div><div class="diagram-inspector-body"><div class="explain-label">How to explore</div><ol class="diagram-instructions"><li>Select an area to zoom into its parts.</li><li>Select a part to see what it does and why.</li><li>Follow a connection to another part.</li></ol>${area?`<div class="explain-label">Parts in this area</div><div class="diagram-part-menu">${area.parts.map(p=>`<button data-diagram-part="${p.id}">${esc(p.name)} <span>↗</span></button>`).join('')}</div>`:`<div class="diagram-note"><strong>Whole-record storage.</strong><p>Format 15 derives lookup keys when needed and removes an extra file-encryption wrapper. Old dedicated shared homes and portable journals are refused. Registered Shares use separate personal-format homes. A replacement supplies every field and address to keep. An unchanged attachment stays separate.</p></div><div class="diagram-note cloud-note"><strong>Opt-in backup; checked recovery.</strong><p>Dashed lines mark limited or inactive paths. Each part states whether it needs owner permission or service configuration, remains release disabled, is DEV-only, is unconnected source, is unreleased source, or is future design.</p></div>`}</div>`;return;}
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
  function mount(target,sub){if(host)unmount();host=target;const segments=location.hash.slice(1).split('/');const alias=G.aliases[segments[2]];segments[2]=alias||segments[2];state.area=parts[segments[2]]?parts[segments[2]].layer:layers[sub]?sub:'all';state.selected=parts[segments[2]]?.layer===state.area?segments[2]:null;state.group=groupByPart[state.selected]||((segments[2]==='group'&&groupsFor(state.area).some(g=>g.id===segments[3]))?segments[3]:null);state.expanded=false;host.className='diagram-page';host.innerHTML=`<div class="diagram-page-title"><div><div class="eyebrow">An interactive system map</div><h1>See how it connects.</h1><p class="intro">Zoom into an area. Select a part. Follow a connection to another part.</p></div><span class="badge note">${Object.keys(parts).length} parts · one system</span></div><div id="diagram-shell" class="diagram-shell"><div class="diagram-toolbar"><div class="diagram-breadcrumb"><button id="diagram-overview" data-diagram-command="overview">Whole system</button><span aria-hidden="true">/</span><button id="diagram-current-area" disabled>Whole system</button><span id="diagram-group-breadcrumb" hidden><span aria-hidden="true">/</span> <strong id="diagram-current-group"></strong></span></div><div class="diagram-tools"><label class="sr-only" for="diagram-area-select">Zoom into an area</label><select id="diagram-area-select"><option value="all">Whole system</option>${G.layers.map(l=>`<option value="${l.id}">${esc(meta[l.id].title)}</option>`).join('')}</select><button id="diagram-expand" data-diagram-command="expand" aria-pressed="false">Expand ↗</button></div></div><div class="diagram-body"><div class="diagram-canvas-column"><div class="diagram-find"><label class="sr-only" for="diagram-search">Find a part in the diagram</label><input id="diagram-search" type="search" placeholder="Find a part in the map…" autocomplete="off"><div id="diagram-search-results" hidden></div><button id="diagram-clear" data-diagram-command="clear" hidden>Clear selection ×</button></div><div class="diagram-stage"><div id="diagram-disk-overview" hidden>${diskOverview()}</div><div id="diagram-service-overview" hidden></div><svg id="diagram-svg" role="group" aria-label="Interactive LastDB system diagram. Select an area or a part." tabindex="0"></svg><div class="diagram-zoom-controls"><button data-diagram-command="out" aria-label="Zoom out">−</button><span id="diagram-zoom-value">100%</span><button data-diagram-command="in" aria-label="Zoom in">+</button><button data-diagram-command="fit">Fit view</button></div><span class="diagram-stage-location" id="diagram-location"></span></div><div class="diagram-legend"><span><i></i>Current connection</span><span><i class="dashed"></i>Limited or inactive path</span><span class="diagram-pan-hint">Drag to move · + / − to zoom</span><button class="diagram-read-below" data-diagram-command="explain">Read the explanation ↓</button></div><div class="diagram-context-note">Select a part to see a few direct connections. Every connection remains in its explanation. Arrows show duties or data movement, not every internal call.</div></div><aside id="diagram-inspector" class="diagram-inspector" aria-label="Selected part explanation"></aside></div><div id="diagram-announcement" class="sr-only" role="status" aria-live="polite"></div></div><p class="site-note">Source review: ${G.reviewed}. The map uses the same reviewed explanations as the guide. It does not connect to your database.</p>`;
    svg=host.querySelector('#diagram-svg');host.addEventListener('click',onClick);host.addEventListener('keydown',onKey);host.querySelector('#diagram-area-select').addEventListener('change',e=>chooseArea(e.target.value));host.querySelector('#diagram-search').addEventListener('input',e=>search(e.target.value));svg.addEventListener('pointerdown',pointerDown);svg.addEventListener('pointermove',pointerMove);svg.addEventListener('pointerup',pointerUp);svg.addEventListener('pointercancel',pointerUp);svg.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(e.deltaY<0?1.12:1/1.12);}},{passive:false});draw();resizeObserver=new ResizeObserver(entries=>{if(host&&(entries[0].contentRect.width<520)!==narrowLayout)draw();});resizeObserver.observe(host.querySelector('.diagram-stage'));}
  function onClick(e){if(suppressClick)return;const node=e.target.closest('[data-diagram-part]'),area=e.target.closest('[data-diagram-area]'),group=e.target.closest('[data-diagram-group]'),command=e.target.closest('[data-diagram-command]');if(node){choosePart(node.dataset.diagramPart);return;}if(area){chooseArea(area.dataset.diagramArea);return;}if(group){chooseGroup(group.dataset.diagramGroup);return;}if(command){const action=command.dataset.diagramCommand;if(action==='overview')chooseArea('all');if(action==='clear'){if(currentGroup()){chooseGroup(state.group);return;}state.selected=null;history.replaceState(null,'',`#diagram/${state.area}`);draw();announce(state.area==='disk'?'Disk overview. Four write steps and expandable details.':'Selection cleared. Choose a part to see its connections.');}if(action==='explain')host.querySelector('#diagram-inspector').scrollIntoView({behavior:'smooth',block:'start'});if(action==='in')zoom(1.25);if(action==='out')zoom(.8);if(action==='fit'){state.scale=1;state.x=0;state.y=0;setView();}if(action==='expand')expand();}}
  function onKey(e){const node=e.target.closest('[data-diagram-part],[data-diagram-area]');if(node&&node.tagName.toLowerCase()==='g'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onClick({target:node});return;}if(e.key==='Escape'){hideResults();if(state.expanded)expand();return;}if(e.target===svg){if(['+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')zoom(1.25);if(e.key==='-')zoom(.8);if(e.key==='Home'){state.scale=1;state.x=state.y=0;}if(e.key==='ArrowLeft')state.x-=80/state.scale;if(e.key==='ArrowRight')state.x+=80/state.scale;if(e.key==='ArrowUp')state.y-=80/state.scale;if(e.key==='ArrowDown')state.y+=80/state.scale;setView();}}
  function unmount(){if(resizeObserver){resizeObserver.disconnect();resizeObserver=null;}if(host){host.removeEventListener('click',onClick);host.removeEventListener('keydown',onKey);}document.body.classList.remove('diagram-is-expanded');host=null;svg=null;drag=null;pinch=null;pointers.clear();}
  window.LastDBDiagram={mount,unmount,edges};
})();
