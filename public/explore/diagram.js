/* A navigable relationship map over the source-reviewed guide content. */
(() => {
  const G=window.GUIDE;
  const layers=Object.fromEntries(G.layers.map(l=>[l.id,l]));
  const parts=Object.fromEntries(G.layers.flatMap(l=>l.parts.map(p=>[p.id,{...p,layer:l.id}])));
  const edges=[
    ["restore","file-blob","prepares on-request downloads for","design"],
    ["log-backup","file-blob","uploads queued personal versions of","design"],
    ["record-file-lifetime","byte-backup-client","queues personal cloud releases for","design"],
    ["portable-schema","record-value","preserve each shared definition ID in"],
    ["inline-file","record-value","belongs to"],
    ["inline-file","record-metadata","is described by a marker in"],
    ["inline-file","run-home","stores its separate row in"],
    ["inline-file","run-encryption","protects stored bytes with"],
    ["inline-file","cloud-files","requires matching bytes during"],
    ["inline-file","shared-log","carries bytes in"],
    ["query-replies","inline-file","returns only the marker of"],
    ["file-blob","inline-file","can share one record with"],
    ["file-blob","saved-cloud-credentials","uses account access for on-request downloads from"],
    ["snapshot-cleanup","run-merge","removes hidden versions through"],
    ["snapshot-cleanup","disk-holds","rechecks before creating"],
    ["snapshot-cleanup","space-reservation","reserves replacement space through"],
    ["snapshot","snapshot-cleanup","prepares new running captures with"],
    ["shared-snapshot-command","snapshot-cleanup","prepares new captures with"],
    ["run-backup-files","inline-file","includes the row for"],

    ["shared-database","shared-automatic","can enable"],
    ["shared-automatic","node","runs in"],
    ["shared-automatic","shared-log","uploads through"],
    ["shared-automatic","portable-replay","receives through"],
    ["shared-automatic","shared-object-upload","lets the publisher schedule"],
    ["shared-automatic","saved-cloud-credentials","requires a DEV connection from"],
    ["shared-automatic","shared-writer-rejoin","reports missing history for"],
    ["shared-automatic","backup-status","reports progress through"],
    ["shared-automatic","shared-snapshot-command","shares the publication lock with"],

    ["shared-database","shared-writer-rejoin","offers explicit DEV recovery through"],
    ["shared-writer-rejoin","shared-log","confirms pending changes through"],
    ["shared-writer-rejoin","shared-recovery","rebuilds current shared state through"],
    ["shared-writer-rejoin","shared-private-home","preserves device-only data in"],
    ["shared-writer-rejoin","disk-holds","refuses unfinished snapshot holds in"],
    ["shared-writer-rejoin","run-home","retains ownership while replacing"],
    ["shared-writer-rejoin","portable-schema","requires exact bindings from"],
    ["shared-writer-rejoin","write-order","preserves the writer identity used by"],
    ["shared-private-home","run-home","adds device-private storage beside"],
    ["shared-private-home","record-home","journals cross-home changes from"],
    ["shared-private-home","run-encryption","derives a separate key through"],
    ["shared-object-upload","shared-private-home","exclude device-only data in"],
    ["shared-object-upload","cloud-destinations","route original files to"],
    ["shared-recovery","shared-private-home","creates and validates fresh"],
    ["shared-database","shared-private-home","requires the dedicated layout in"],

    ["shared-snapshot-command","node","runs through the owner socket of"],
    ["shared-snapshot-command","shared-log","sends changes through"],
    ["shared-snapshot-command","shared-object-upload","coordinates"],
    ["shared-snapshot-command","portable-schema","loads exact definitions from"],
    ["shared-snapshot-command","saved-cloud-credentials","requires a DEV connection from"],
    ["shared-log","shared-retention","release accepted local mutations through"],
    ["portable-replay","shared-retention","advances older-home cleanup when idle through"],
    ["shared-retention","record-file-lifetime","releases versions no longer needed by"],
    ["shared-retention","format-writer","commits reference and file changes through"],
    ["shared-retention","run-merge","leaves physical run-file removal to"],
    ["shared-delete-cleanup","shared-retention","keeps delete-stamp cleanup separate from"],

    ["shared-log","record-home","saves outgoing mutations in the same request as"],
    ["shared-log","record-file-lifetime","retain exact prior versions through"],
    ["shared-object-upload","read-view","capture one committed root through"],
    ["shared-object-upload","disk-holds","keep their chosen source files through"],
    ["shared-object-upload","portable-schema","bind exact definitions from"],
    ["shared-database","ttl","refuses expiry policies from"],
    ["shared-database","schema-removal","blocks uncoordinated retirement through"],
    ["write-order","record-home","saves local writer progress with"],
    ["record-delete","write-order","keeps a separate applied-delete position from"],
    ["portable-replay","shared-delete-cleanup","attempts"],
    ["shared-log","shared-delete-cleanup","supply confirmed upload progress to"],
    ["shared-delete-cleanup","record-delete","removes eligible stamps saved by"],
    ["shared-object-upload","shared-delete-cleanup","capture the saved replay boundary from"],
    ["shared-recovery","shared-delete-cleanup","preserves the saved replay boundary from"],
    ["shared-database","shared-log","uses explicit DEV commands for"],
    ["shared-database","shared-recovery","requires new writers to complete"],
    ["shared-log","shared-object-upload","require exact objects prepared through"],
    ["shared-log","portable-replay","carry complete mutations for"],
    ["shared-object-upload","shared-recovery","publish the original files used by"],
    ["shared-object-upload","record-file-lifetime","bind uploaded file versions from"],
    ["shared-recovery","portable-replay","coordinates staged application through"],
    ["shared-recovery","restore-checks","reuses native checkpoint checks from"],
    ["shared-recovery","restore","is separate from the connected V2 path in"],
    ["shared-recovery","prod-recovery","has separate evidence from ordinary recovery in"],
    ["portable-replay","portable-schema","validates each record against an accepted definition in"],
    ["portable-replay","write-order","compares complete-record stamps from"],
    ["portable-replay","record-delete","respects the saved stamps from"],
    ["portable-replay","record-file-lifetime","admits only winning versions through"],
    ["portable-replay","format-writer","commits record and pointer changes through"],
    ["portable-schema","schema","carries the full typed definition of"],
    ["portable-schema","shared-log","travels before records in"],
    ["node","node-status","exposes health and request activity through"],
    ["node-status","warm-set","reports memory use for"],
    ["node-status","socket-workers","reports request activity through"],
    ["node-status","backup-status","includes coverage from"],
    ["restore-checks","field-key-bundles","validate primary and alternate rules from"],
    ["app","query-replies","can check the record after a lost write reply through"],
    ["query-replies","conditions","return the revision required by"],
    ["conditions","record-value","guard the complete replacement of"],
    ["app","compound-keys","constructs explicit ranges with"],
    ["alternate-entries","range-pages","preserve duplicate-address members across"],
    ["ttl","conditions","checks the captured revision through"],
    ["record-metadata","record-file-lifetime","selects the retained file for"],
    ["alternate-entries","field-key-bundles","use each key’s own rules from"],
    ["format-writer","field-key-bundles","creates and saves"],
    ["field-key-bundles","hash-protection","supply the secret keys for"],
    ["field-key-bundles","range-context","save the rules checked by"],
    ["local-schema-declaration","field-key-bundles","establishes missing"],
    ["format-writer","file-encryption","owns the payloads created by"],
    ["format-writer","expiry-tracking","checks the schema owner of"],
    ["ttl","expiry-tracking","follows every hash-list page in"],
    ["retention-backfill","expiry-tracking","adds existing records to"],
    ["schema-removal","expiry-tracking","clears all bounded pages of"],
    ["record-value","format-writer","passes structure and final-size checks through"],
    ["format-writer","write-order","saves the author clock used by"],
    ["format-writer","change-notices","assigns positions and encodes"],
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
    ["file-dependencies","run-blob-home","requires a live stored file in"],
    ["local-export","file-blob","omits the bytes and marker of"],
    ["app-publish","app-publish-rules","requires"],
    ["stable-release","node","qualifies the packaged"],
    ["stable-release","app-registry","requires signed entries from"],
    ["stable-release","app-compatibility","proves the selected app commits for"],
    ["stable-release","app-publish","prepares unsigned declarations through"],
    ["stable-release","managed-app-install","installs exact app commits through"],
    ["stable-release","alternate-format","records the supported"],
    ["stable-release","restore","qualifies packaged code separately from"],
    ["format-writer","alternate-format","uses the definitions of"],
    ["format-writer","accepted-writes","encodes and checks records from"],
    ["format-writer","alternate-entries","derives pointer changes for"],
    ["format-writer","record-file-lifetime","checks every changed record through"],
    ["format-writer","flush","leaves saving to"],
    ["format-writer","warm-set","prepares saved records for"],
    ["prod-recovery","restore","runs without the release switch through"],
    ["prod-recovery","snapshot","recovers the accepted"],
    ["prod-recovery","automatic-backup","creates cloud copies through"],
    ["prod-recovery","log-backup","recovers later changes from"],
    ["prod-recovery","recovery-chain","verifies the complete"],
    ["prod-recovery","restore-checks","requires"],
    ["prod-recovery","cloud-destinations","uses both"],
    ["prod-recovery","alternate-format","records the supported"],
    ["database","record-home","uses one local record space in"],
    ["node","socket-workers","serves through one owner socket with"],
    ["app-publish-rules","node","reads app-owned schemas from"],
    ["app-publish-rules","local-schema-declaration","uses the same identity rules as"],
    ["app-publish","schema-advice","prints optional findings from"],
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
    ["local-schema-declaration","schema-registration","is separate from"],
    ["byte-backup-client","backup-declarations","includes","design"],
    ["snapshot","backup-declarations","declares no earlier recovery need in","design"],
    ["log-backup","backup-declarations","names its base and previous change in","design"],
    ["backup-declarations","backup-dependencies","supply exact earlier links to","design"],
    ["backup-declarations","recovery-chain","describe required links in","design"],
    ["app-publish","app-registry","supplies publisher-signed entries to"],
    ["app-publish","node","records interface versions reported by"],
    ["app-publish","app-compatibility","signs the interface declaration used by"],
    ["app-registry","app-list-cache","keeps verified catalog bytes in"],
    ["app-list-cache","app-compatibility","retains one catalog per API version for"],
    ["query-replies","record-metadata","return one block of"],
    ["snapshot","cloud-byte-pieces","plans its native files with","design"],
    ["schema","schema-removal","can be removed through"],
    ["schema-removal","record-home","releases personal records from"],
    ["schema-removal","alternate-entries","removes the declared"],
    ["schema-removal","disk-holds","leaves physical retention to"],
    ["ttl","expiry-progress","remembers checked deleted keys through"],
    ["accepted-writes","expiry-progress","clear a skipped position after an older live write in"],
    ["expiry-progress","range-pages","continues from the last checked key through"],
    ["local-export","range-pages","continues simple keyed selections with"],
    ["storage-reports","record-home","count live records in"],
    ["storage-reports","node","provide owner reports through"],
    ["record-pages","query-replies","return their continuation through"],
    ["home-creation","mutation-log","sets private folder access required by"],
    ["search-rebuild","record-pages","continues past deleted records with"],
    ["ttl","record-delete","uses the record cutoff and","design"],
    ["run-backup-files","record-home","preserve the native files of","design"],
    ["record","record-value","stores its fields in"],
    ["record-value","record-home","uses"],
    ["record-value","schema","keeps the fields declared by a"],
    ["record-value","file-blob","can own one"],
    ["record-home","run-home","uses the ordered files of a"],
    ["home-creation","record-home","creates the supported format for","design"],
    ["record-home","alternate-format","needs format 14 recognized by"],
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
    ["registry-records","verifier-queue","send accepted publish and revoke requests through"],
    ["field","field-reuse","has a reusable definition through"],
    ["field-reuse","schema","keeps record values owned by"],
    ["field-reuse","canonical-vocabulary","uses checked definitions from"],
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
    ["alternate-format","run-backup-files","preserves its marker through"],
    ["restore-checks","alternate-format","check the saved marker of"],
    ["app","alternate-keys","can select by name"],
    ["private-diagnostics","node","limit new error output from"],
    ["private-diagnostics","app-access","exclude arbitrary credential text from reports about"],
    ["account-payments","cloud-access","check the saved account through"],
    ["account-payments","app","expose status and hosted links through"],
    ["account-payments","automatic-backup","do not activate","design"],
    ["read-metadata","run-lookup","reuses checked lookup blocks for"],
    ["read-metadata","read-view","lasts only for one"],
    ["read-metadata","memory-budget","uses a separate bounded allowance from"],
    ["read-metadata","warm-set","keeps temporary lookup blocks outside"],
    ["query-replies","record","include every stored field of each"],
    ["query-replies","key","require the usual scope from"],
    ["query-replies","keyed-conditions","refuse count mode with"],
    ["query-replies","range-pages","can omit metadata from"],
    ["schema-registration","registry","controls new definitions in"],
    ["schema-registration","registry-records","checks the saved app owner in"],
    ["schema-registration","canonical-vocabulary","requires permission before changes to"],
    ["schema-registration","registry-definitions","allows checked new definitions into"],
    ["accepted-writes","write-read-reuse","avoid repeated reads through"],
    ["write-read-reuse","read-view","uses one saved state from"],
    ["write-read-reuse","run-lookup","reuses exact results from"],
    ["write-read-reuse","warm-set","keeps its results separate from"],
    ["write-read-reuse","memory-budget","has a separate bounded allowance from"],
    ["file-delete-recovery","run-blob-home","finishes saved removals in"],
    ["file-delete-recovery","snapshot-commit","checks completed record changes from"],
    ["file-delete-recovery","disk-root","checks both saved positions in"],
    ["delete-purge","file-delete-recovery","protects file removal through"],
    ["run-backup-files","file-delete-recovery","require no unfinished work in","design"],
    ["run-merge","space-reservation","reserves each output through"],
    ["backup-dependencies","recovery-chain","checks the earlier links of","design"],
    ["backup-dependencies","backup-manifest","verifies accepted identities in","design"],
    ["backup-dependencies","snapshot","identifies required earlier","design"],
    ["backup-dependencies","log-backup","identifies required earlier","design"],
    ["backup-dependencies","restore","describes dependencies needed by","design"],
    ["registry","registry-definitions","saves checked definitions through"],
    ["canonical-vocabulary","registry-definitions","commits checked meanings with"],
    ["registry-definitions","schema","save separately published definitions of"],
    ["registry-definitions","field","save canonical and declared definitions of"],
    ["registry-generation","registry-definitions","selects a separate set of"],
    ["registry-definitions","registry-records","keep app ownership separate in"],
    ["stopped-backup","node","requires a clean stop of","design"],
    ["stopped-backup","manual-cloud-connection","requires a saved","design"],
    ["stopped-backup","automatic-backup","can keep the enabled policy for","design"],
    ["stopped-backup","snapshot","captures a","design"],
    ["stopped-backup","byte-backup-client","uploads through","design"],
    ["stopped-backup","disk-root","checks unchanged file lists in","design"],
    ["stopped-backup","disk-holds","retains exact files through","design"],
    ["stopped-backup","cloud-byte-pieces","checks uploaded pieces described by","design"],
    ["file-encryption","blob-storage-encryption","protects file contents before"],
    ["blob-storage-encryption","run-blob-home","protects each file entry in"],
    ["blob-storage-encryption","run-encryption","precedes"],
    ["registry","registry-generation","can select a"],
    ["registry-generation","canonical-vocabulary","selects its own"],
    ["registry-generation","registry-records","separates releases but shares app ownership in"],
    ["automatic-backup","mutation-log","enables local retention in","design"],
    ["snapshot-commit","mutation-log","retains complete backup changes in","design"],
    ["mutation-log","run-files","retain original encrypted files from","design"],
    ["mutation-log","run-blob-home","retain file additions and removals from","design"],
    ["snapshot","mutation-log","establishes the starting boundary for","design"],
    ["automatic-backup","manual-cloud-connection","requires a saved","design"],
    ["automatic-backup","snapshot","requests","design"],
    ["automatic-backup","log-backup","schedules frequent","design"],
    ["automatic-backup","byte-backup-client","submits one job at a time to","design"],
    ["automatic-backup","backup-status","reports backup positions and schedule through","design"],
    ["mutation-log","log-backup","supply complete ordered entries to","design"],
    ["log-backup","frontier","advances the accepted","design"],
    ["log-backup","backup-manifest","records its base and predecessor in","design"],
    ["log-backup","cloud-destinations","routes native files through","design"],
    ["log-backup","cloud-byte-pieces","plans encrypted files with","design"],
    ["log-backup","recovery-chain","adds an accepted link to","design"],
    ["snapshot","recovery-chain","provides the full base of","design"],
    ["backup-manifest","recovery-chain","names and verifies links in","design"],
    ["recovery-chain","restore","provides the exact ordered state to","design"],
    ["recovery-chain","restore-checks","must pass final","design"],
    ["mutation-log","backup-status","report local saved positions and gaps through","design"],
    ["registry","canonical-vocabulary","checks definitions through"],
    ["canonical-vocabulary","field","checks the name and meaning of"],
    ["canonical-vocabulary","schema","checks declared fields in"],
    ["canonical-vocabulary","registry-records","checks stored release definitions in"],
    ["app","canonical-vocabulary","can propose checked definitions through"],
    ["home-creation","range-context","sets the default typed rules used by"],
    ["run-backup-files","backup-key-selection","use","design"],
    ["restore-checks","backup-key-selection","use"],
    ["backup-key-selection","run-lookup","reuses verified keys and blocks from"],
    ["backup-key-selection","backup-read-buffers","verifies blocks through"],
    ["backup-key-selection","memory-budget","uses a separate bounded allowance from"],
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
    ["search-rebuild","search-fields","uses the same field rules as"],
    ["search-delivery","search-rebuild","marks missed changes for"],
    ["accepted-writes","memory-budget","releases its private allowance before warm charges in"],
    ["range-protection","run-encryption","protects typed values through"],
    ["restore","range-context","recovers the saved rules for","design"],
    ["node","manual-cloud-connection","accepts the owner request through","design"],
    ["manual-cloud-connection","saved-cloud-credentials","saves account access as","design"],
    ["byte-backup-client","saved-cloud-credentials","reads checked account access from","design"],
    ["saved-cloud-credentials","registry","can select the matching environment for","design"],
    ["saved-cloud-credentials","cloud-access","supply the saved account key for","design"],
    ["restored-account","saved-cloud-credentials","saves newly checked access as","design"],
    ["cloud-byte-pieces","byte-backup-client","requests file slices through","design"],
    ["manual-cloud-connection","cloud-access","checks the existing account through","design"],
    ["manual-cloud-connection","byte-backup-client","permits a separate request to","design"],
    ["backup-status","manual-cloud-connection","reports the saved"],
    ["snapshot","run-backup-files","retains the record-home cut through","design"],
    ["run-backup-files","run-home","capture record files from","design"],
    ["run-backup-files","run-blob-home","capture stored file bytes from","design"],
    ["run-backup-files","cloud-destinations","route each native file through","design"],
    ["run-backup-files","backup-manifest","describe both saved homes in","design"],
    ["restore","run-backup-files","recovers original native bytes from","design"],
    ["run-backup-files","backup-read-buffers","check required values through","design"],
    ["backup-read-buffers","run-encryption","verifies protected bytes from"],
    ["backup-read-buffers","memory-budget","uses a separate allowance from"],
    ["restore","backup-read-buffers","checks native bytes through","design"],
    ["registry","registry-records","stores app definitions through"],
    ["registry-records","app","check the saved owner of"],
    ["node","home-creation","sets up a new node through"],
    ["home-creation","run-home","prepares both disk homes in"],
    ["home-creation","run-encryption","requires the node key for"],
    ["home-creation","disk-root","completes setup before normal use of"],
    ["node","search-rebuild","must stop before"],
    ["search-rebuild","search-service","prepares fresh source records for"],
    ["search-rebuild","run-home","opens existing run files through"],
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
    ["byte-backup-client","cloud-destinations","requires access to both stores in","design"],
    ["cloud-destinations","backup-manifest","bind object destinations named by","design"],
    ["cloud-access","cloud-destinations","checks account readiness for","design"],
    ["file-blob","cloud-destinations","uploads personal versions to B2 through","design"],
    ["run-home","run-blob-home","keeps attached files apart in"],
    ["file-blob","run-blob-home","stores file bytes in run homes through"],
    ["run-blob-home","run-files","uses the same ordered format as"],
    ["run-blob-home","run-encryption","has its own key from"],
    ["snapshot-commit","run-blob-home","saves new file bytes first in"],
    ["range-pages","range-context","carry next-page rules through"],
    ["range-context","schema","captures the declaration from"],
    ["range-context","read-view","keeps comparison separate from"],
    ["node","backup-status","reports backup work through"],
    ["backup-status","byte-backup-client","observes local work in"],
    ["backup-status","frontier","compares local writes with the automatic policy’s","design"],
    ["disk-root","run-home","uses an encrypted file list in"],
    ["run-home","run-files","stores logical records in"],
    ["run-home","run-lookup","serves keyed reads through"],
    ["run-home","run-merge","combines old files through"],
    ["run-home","run-encryption","protects blocks through"],
    ["snapshot-commit","run-files","adds a new run file through"],
    ["read-view","run-lookup","reads run homes through"],
    ["run-lookup","run-files","finds the newest key in"],
    ["run-lookup","warm-set","supplies fetched logical records to"],
    ["run-merge","disk-holds","retains old read files through"],
    ["run-merge","run-files","combines older files from"],
    ["run-encryption","disk-root","protects the run file list selected by"],
    ["run-merge","delete-purge","keeps physical marker removal separate from"],
    ["node","local-export","serves owner requests for"],
    ["local-export","record","selects data described by"],
    ["restore","restore-checks","must pass","design"],
    ["byte-backup-client","snapshot","retains one exact","design"],
    ["byte-backup-client","disk-holds","keeps uncertain work protected by","design"],
    ["byte-backup-client","backup-manifest","publishes reconstruction details through","design"],
    ["byte-backup-client","restore","supplies accepted bytes to","design"],
    ["restore-checks","byte-backup-client","must pass before a restored source enters","design"],
    ["app-compatibility","app","states version needs for"],
    ["app-registry","app-compatibility","selects an exact interface through"],
    ["node","app-compatibility","reports supported versions for"],
    ["change-notices","app-compatibility","use a separate format described by"],
    ["ttl","retention-backfill","can include older records through"],
    ["schema","retention-backfill","supplies the active policy for"],
    ["retention-backfill","snapshot-commit","saves each page through"],
    ["key","keyed-conditions","selects candidate records for"],
    ["read-view","keyed-conditions","keeps field values consistent for"],
    ["keyed-conditions","record","evaluate stored fields on each"],
    ["range-pages","record","can reuse checked range values in"],
    ["accepted-writes","write-queue","places complete prepared changes in"],
    ["write-queue","snapshot-commit","shares immediate disk work through"],
    ["app-access","socket-workers","defines allowed requests for"],
    ["socket-workers","accepted-writes","can await disk completion of"],
    ["socket-workers","write-queue","releases its worker while a write waits in"],
    ["restore","restored-account","supplies a completed home for","design"],
    ["restored-account","cloud-access","obtains checked account access through","design"],
    ["cloud-access","byte-backup-client","supplies permission for","design"],
    ["app","node","sends a request to"],
    ["app","schema","chooses"],
    ["node","core-state","coordinates"],
    ["app-access","app","controls normal access for"],
    ["registry","schema","offers separate advice about"],
    ["app-registry","app","lists signed source commits for"],
    ["search-service","key","returns candidates for"],
    ["share-messages","shared-database","delivers invitations for","design"],
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
    ["read-view","disk-root","captures a complete state from"],
    ["read-view","warm-set","admits successful fetches into"],
    ["key","range-pages","sets the hash and range for"],
    ["range-pages","read-view","fetch selected values through"],
    ["range-protection","range-pages","preserves the order used by"],
    ["flush","snapshot-commit","submits complete changes to"],
    ["snapshot-commit","disk-root","publishes the new"],
    ["disk-holds","disk-root","protect captured file lists from"],
    ["space-reservation","accepted-writes","reserves output before"],
    ["ttl","delete-purge","uses the chosen removal operation in"],
    ["disk-root","snapshot","supplies one exact saved state to","design"],
    ["disk-holds","snapshot","retain required files for","design"],
    ["snapshot","frontier","fixes the","design"],
    ["snapshot","cloud-files","coordinates separate blob uploads through","design"],
    ["file-blob","cloud-files","needs verified coverage from","design"],
    ["file-encryption","cloud-files","protects original bytes for","design"],
    ["snapshot","backup-manifest","records its exact data in","design"],
    ["cloud-files","backup-manifest","keeps personal blobs outside","design"],
    ["backup-manifest","restore","defines the accepted data for","design"],
    ["frontier","restore","must match during","design"],
    ["restore","disk-root","publishes a fresh verified","design"],
    ["file-dependencies","cloud-files","identifies files for","design"],
    ["accepted-writes","change-notices","prepare data and"],
    ["change-notices","snapshot-commit","join the same"],
    ["accepted-writes","search-delivery","can send a batch after disk publication through"],
    ["guaranteed-write","cloud-access","requires a cloud grant through","design"],
    ["hash-protection","key","protects exact-key representation for"],
    ["range-protection","key","preserves range order for"],
    ["file-encryption","file-blob","protects the bytes of"],
    ["conditions","accepted-writes","check current facts before"],
    ["holds","read-view","retain values used by"],
    ["key","run-lookup","finds stored values through"],
    ["write-queue","run-merge","starts background file work through"],
    ["delete-purge","run-merge","leaves unused disk bytes for"],
    ["run-merge","disk-root","publishes replacement file lists through"],
    ["byte-backup-client","run-backup-files","copies original native bytes from","design"],
    ["run-backup-files","cloud-byte-pieces","supply requested byte ranges to","design"],
    ["cloud-byte-pieces","cloud-destinations","keeps each piece in its chosen","design"],
    ["cloud-byte-pieces","backup-manifest","records file positions in","design"],
    ["cloud-byte-pieces","restore","describes how to rebuild files for","design"],
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
    ["record-pages","range-pages","keeps owner page order separate from"],
    ["record-pages","read-view","uses one"],
    ["file-dependencies","record-value","checks the file marker in"],
    ["record-value","run-encryption","protects stored bytes through"],
    ["byte-backup-client","backup-transport","sends authorized requests through","design"],
    ["cloud-byte-pieces","backup-transport","describes pieces sent through","design"],
    ["backup-transport","cloud-access","checks account permission through","design"],
    ["backup-transport","cloud-destinations","transfers approved bytes to","design"],
    ["backup-transport","backup-manifest","checks receipts used by","design"],
    ["stopped-backup","frontier","advances the enabled policy to its verified","design"]
  ].map(([from,to,label,kind])=>({from,to,label,kind:kind||([parts[from],parts[to]].some(part=>['candidate','unconnected','planned','dev-operation'].includes(part?.status))?'design':'current')}));
  const meta={
    services:{title:'Apps & services',color:'#65776a',fill:'#e9efea',summary:'Apps ask. The node coordinates.',preview:'App · node · access · registries'},
    model:{title:'The data model',color:'#55764f',fill:'#e3eddf',summary:'One structure across the system.',preview:'Schema → key → record → file'},
    memory:{title:'Memory',color:'#52774a',fill:'#e2eddf',summary:'Current values and prepared writes.',preview:'Warm set · range pages · holds'},
    disk:{title:'Disk',color:'#9b803d',fill:'#f2ead5',summary:'Records, files, and shared private state.',preview:'Commit · files · compaction'},
    cloud:{title:'Cloud',color:'#6c8ba2',fill:'#e7eff6',summary:'A separate copy for recovery.',preview:'Snapshot · changes · restore'},
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
    {title:'Read saved data',summary:'Find records by key in a consistent saved view.',ids:['record-home','shared-private-home','run-home','disk-root','read-view','run-files','run-values','run-lookup','alternate-entries']},
    {title:'Store large files',summary:'Keep each record’s file bytes in a separate home.',ids:['run-blob-home','file-delete-recovery']},
    {title:'Make room safely',summary:'Combine old files and keep bytes that readers or backups still need.',ids:['space-reservation','disk-holds','run-base','stale-byte-count','run-merge','disk-cleanup']},
    {title:'Backup and home setup',summary:'Prepare a clean snapshot, retain changes, or open a compatible home.',ids:['snapshot-cleanup','mutation-log','alternate-format','home-creation']}
  ];
  function diskOverview(){return `<section class="disk-overview" aria-label="Disk overview"><header><span class="eyebrow">Disk · the main path</span><h2>Save first. Then return success.</h2><p>A write follows these four steps. Select a step for its explanation.</p></header><ol class="disk-write-path">${diskSteps.map(([id,title,description],i)=>`<li><button data-diagram-part="${id}"><span class="disk-step-number" aria-hidden="true">${i+1}</span><span><strong>${title}</strong><span class="disk-step-description">${description}</span></span><span class="disk-step-open" aria-hidden="true">↗</span></button></li>`).join('')}</ol><p class="disk-backup-note">Cloud backup happens separately. A local success does not confirm a cloud copy.</p><h3>Explore a detail when you need it</h3><div class="disk-detail-groups">${diskGroups.map(group=>`<details><summary><strong>${group.title}</strong><span>${group.summary}</span></summary><div class="diagram-part-menu">${group.ids.map(id=>`<button data-diagram-part="${id}"><span>${esc(parts[id].name)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div></details>`).join('')}</div></section>`;}
  // These are navigation groups, not additional system parts or data-flow edges.
  const serviceGroups=[
    {id:'local',title:'Local node & requests',summary:'Run apps, handle requests, and see what the node is doing.',ids:['app','node','app-access','socket-workers','query-replies','storage-reports','node-status','backup-status']},
    {id:'schemas',title:'Schema definitions',summary:'Define fields and keys, with shared vocabulary and optional advice.',ids:['registry','canonical-vocabulary','schema-advice','local-schema-declaration','schema-registration','registry-definitions','registry-generation','portable-schema']},
    {id:'install',title:'App installation & updates',summary:'Choose a compatible app, install it, and manage its versions.',ids:['app-registry','app-compatibility','app-list-cache','managed-app-install','app-updates','app-rollback']},
    {id:'publish',title:'App publishing & releases',summary:'Check and sign releases before offering them to app owners.',ids:['app-publish-rules','app-publish','ci-app-publisher','stable-release','registry-records','verifier-queue']},
    {id:'search',title:'Search & change feeds',summary:'Send saved changes to other tools and keep search outside the database.',ids:['search-service','search-delivery','search-fields','search-rebuild','change-notices']},
    {id:'cloud',title:'Cloud access & sharing',summary:'Authorize backup requests, manage account access, and share selected data.',ids:['cloud-access','backup-transport','account-payments','local-export','share-messages']}
  ];
  const serviceGroupByPart=Object.fromEntries(serviceGroups.flatMap(group=>group.ids.map(id=>[id,group.id])));
  const currentGroup=()=>state.area==='services'?serviceGroups.find(group=>group.id===state.group):null;
  const partContext=p=>[meta[p.layer].title,serviceGroups.find(group=>group.id===serviceGroupByPart[p.id])?.title].filter(Boolean).join(' / ');
  function serviceOverview(){
    const group=currentGroup();
    const cards=group?group.ids.map(id=>{const p=parts[id];return `<button data-diagram-part="${id}"><strong>${esc(p.name)}</strong><span>${esc(p.short)}</span><small>${partStatus(p)} <b aria-hidden="true">↗</b></small></button>`;}):serviceGroups.map(g=>`<button data-diagram-group="${g.id}"><strong>${esc(g.title)}</strong><span>${esc(g.summary)}</span><small>${g.ids.length} parts <b aria-hidden="true">→</b></small></button>`);
    return `<section class="service-overview" aria-label="${group?esc(group.title):'Apps and services overview'}"><header><span class="eyebrow">${group?'Apps & services · '+group.ids.length+' parts':'Apps & services · '+serviceGroups.length+' groups'}</span><h2 tabindex="-1">${group?esc(group.title):'Start with one job.'}</h2><p>${group?esc(group.summary):'Apps and services have different jobs. Open a group, then choose a part to see how it connects.'}</p></header><div class="service-group-cards">${cards.join('')}</div><p class="service-overview-note">${group?'Select a part for its purpose, limits, and connections across the system.':'All '+layers.services.parts.length+' parts remain available here and through search.'}</p></section>`;
  }
  let host=null,svg=null,nodes={},layoutBox={x:0,y:0,w:1240,h:1030},drag=null,pointers=new Map(),pinch=null,suppressClick=false,resizeObserver=null,narrowLayout=false;
  const overviewBoxes={services:{x:20,y:20,w:420,h:160},model:{x:800,y:20,w:425,h:160},memory:{x:20,y:310,w:320,h:170},disk:{x:465,y:310,w:320,h:170},cloud:{x:910,y:310,w:315,h:170},protection:{x:65,y:620,w:480,h:160},lifetime:{x:700,y:620,w:480,h:160}};
  const overviewEdges=[
    ['services','model','uses schemas and keys'],['model','memory','current records'],['model','disk','saved records'],
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
  function overview(){nodes={};const boxes=narrowLayout?{services:{x:20,y:20,w:610,h:160},model:{x:20,y:280,w:610,h:160},memory:{x:20,y:580,w:290,h:170},disk:{x:340,y:580,w:290,h:170},protection:{x:20,y:920,w:290,h:190},cloud:{x:340,y:920,w:290,h:170},lifetime:{x:20,y:1240,w:610,h:160}}:overviewBoxes;layoutBox=narrowLayout?{x:0,y:0,w:650,h:1490}:{x:0,y:0,w:1245,h:870};let html='';html+=overviewEdges.map(([a,b,label,kind])=>arrow(boxes[a],boxes[b],label,kind==='design',!narrowLayout||a==='services'||a==='disk')).join('');html+=Object.entries(boxes).map(([id,b])=>{const m=meta[id];return `<g class="diagram-area ${id==='cloud'?'design':''}" data-diagram-area="${id}" tabindex="0" role="button" aria-label="Zoom into ${esc(m.title)}, ${layers[id].parts.length} parts" style="--area-color:${m.color}"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="16" fill="${m.fill}"/><text x="${b.x+23}" y="${b.y+32}" class="diagram-area-count">${layers[id].number} / ${layers[id].parts.length} PARTS${id==='cloud'?' · OWNER OPT-IN':''}</text><text x="${b.x+23}" y="${b.y+70}" class="diagram-area-title">${m.title}</text>${textLines(m.summary,b.x+23,b.y+106,25,'diagram-area-summary',26)}<text x="${b.x+b.w-28}" y="${b.y+35}" class="diagram-area-open" text-anchor="end">↗</text></g>`;}).join('');return html;}
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
      return `<g class="diagram-node ${chosen?'selected':''} ${p.design||['candidate','unconnected','dev-operation'].includes(p.status)?'design':''}" data-diagram-part="${id}" tabindex="0" role="button" aria-label="${esc(p.name)}${n.outside?', in '+esc(meta[p.layer].title):''}. ${esc(p.short)}" aria-pressed="${chosen}" style="--area-color:${m.color}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="10" fill="${chosen?m.fill:'#fff'}"/><circle cx="${n.x+17}" cy="${n.y+20}" r="3.5" fill="${m.color}"/>${textLines(p.name,n.x+28,n.y+27,18,'diagram-node-title',24)}<text class="diagram-node-caption" x="${n.x+16}" y="${n.y+n.h-16}">${n.outside?esc(meta[p.layer].title)+' ↗':p.design||['unconnected','dev-operation'].includes(p.status)?partStatus(p):'Select to understand'}</text></g>`;
    }).join('');
    return html;
  }
  function draw(fit=true){
    if(!host)return;
    svg=host.querySelector('#diagram-svg');if(!svg)return;
    narrowLayout=host.querySelector('.diagram-stage').clientWidth<520;
    const disk=state.area==='disk'&&!state.selected,services=state.area==='services'&&!state.selected,simple=disk||services;
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
    host.querySelector('#diagram-location').textContent=state.area==='all'?`7 areas · ${Object.keys(parts).length} parts`:`${area} · ${layers[state.area].parts.length} parts`;
    host.querySelector('#diagram-area-select').value=state.area;
    host.querySelector('#diagram-overview').disabled=state.area==='all';
    host.querySelector('#diagram-clear').hidden=!state.selected;
    host.querySelector('#diagram-clear').textContent=group?'← '+group.title:state.area==='disk'?'← Disk overview':'Clear selection ×';
    host.querySelector('.diagram-stage').classList.toggle('in-layer',state.area!=='all');
  }
  const partStatus=p=>p.status==='dev-operation'?'DEV only':p.status==='candidate'?'Unreleased source':p.status==='configured'?'Service opt-in':p.status==='optin'?'Owner opt-in':p.status==='manual'?'Manual · opt-in':p.status==='unconnected'?'Source only · not connected':p.status==='dev'?'DEV only · release off':p.status==='planned'?'Future design':p.design?'Source exists · release off':'Current source';
  const edgeStatus=e=>[parts[e.from],parts[e.to]].some(p=>p.status==='dev-operation')?' · DEV ONLY':[parts[e.from],parts[e.to]].some(p=>p.status==='candidate')?' · UNRELEASED SOURCE':[parts[e.from],parts[e.to]].some(p=>p.status==='unconnected')?' · SOURCE ONLY, NOT CONNECTED':[parts[e.from],parts[e.to]].some(p=>p.status==='planned')?' · FUTURE DESIGN':[parts[e.from],parts[e.to]].some(p=>p.status==='dev')?' · DEV ONLY':[parts[e.from],parts[e.to]].some(p=>p.status==='disabled')?' · RELEASE OFF':[parts[e.from],parts[e.to]].some(p=>p.status==='configured')?' · SERVICE OPT-IN':[parts[e.from],parts[e.to]].some(p=>p.status==='optin')?' · OWNER OPT-IN':[parts[e.from],parts[e.to]].some(p=>p.status==='manual')?' · MANUAL, PERMISSION REQUIRED':' · CONDITIONAL PATH';
  function sourceLink(p){return p.source?`<a href="https://github.com/EdgeVector/lastdb/blob/${p.revision||G.revision}/${esc(p.source)}" target="_blank" rel="noopener noreferrer">Read its source ↗</a>`:`<a href="/explore/sources/design-notes.html" target="_blank" rel="noopener noreferrer">Design notes ↗</a>`;}
  function inspect(){const panel=host.querySelector('#diagram-inspector');panel.scrollTop=0;if(!state.selected){const area=state.area==='all'?null:layers[state.area];panel.innerHTML=`<div class="diagram-inspector-top"><span class="eyebrow">${area?'Inside this area':'Start with the connections'}</span><h2>${area?esc(meta[state.area].title):'The whole system.'}</h2><p>${area?esc(area.intro):'Apps send requests. A write reaches disk before memory publication and success. Cloud backup is separate from local success. Restore checks a selected backup before creating a separate home.'}</p></div><div class="diagram-inspector-body"><div class="explain-label">How to explore</div><ol class="diagram-instructions"><li>Select an area to zoom into its parts.</li><li>Select a part to see what it does and why.</li><li>Follow a connection to another part.</li></ol>${area?`<div class="explain-label">Parts in this area</div><div class="diagram-part-menu">${area.parts.map(p=>`<button data-diagram-part="${p.id}">${esc(p.name)} <span>↗</span></button>`).join('')}</div>`:`<div class="diagram-note"><strong>Whole-record storage.</strong><p>Format 14 separates shared data from device-private state and removes field history. A replacement supplies complete fields and addresses. An unchanged attachment stays separate.</p></div><div class="diagram-note cloud-note"><strong>Opt-in backup; checked recovery.</strong><p>Dashed lines mark limited or inactive paths. Each part states whether it needs owner permission or service configuration, remains release disabled, is DEV-only, is unconnected source, is unreleased source, or is future design.</p></div>`}</div>`;return;}
    const p=parts[state.selected],connections=edges.filter(e=>e.from===p.id||e.to===p.id);panel.innerHTML=`<div class="diagram-inspector-top" style="background:${meta[p.layer].fill}"><div class="diagram-part-context"><span>${esc(partContext(p))}</span><span>${partStatus(p)}</span></div><h2>${esc(p.name)}</h2><p>${esc(p.what)}</p></div><div class="diagram-inspector-body"><section><div class="explain-label">Why it exists</div><p>${esc(p.why)}</p></section><section class="diagram-example"><div class="explain-label">Example</div><p>${esc(p.example)}</p></section><section><div class="explain-label">Its connections · ${connections.length}</div><div class="diagram-connection-list">${connections.map(e=>{const other=e.from===p.id?e.to:e.from;return `<button data-diagram-part="${other}"><span class="diagram-connection-direction">${e.from===p.id?'OUT →':'← IN'}${e.kind==='design'?edgeStatus(e):''}</span><span><strong>${esc(parts[e.from].name)}</strong> ${esc(e.label)} <strong>${esc(parts[e.to].name)}</strong>.</span><small>${esc(partContext(parts[other]))} · select to follow ↗</small></button>`;}).join('')}</div></section><details class="optional-details"><summary>Limits and source</summary><p>${esc(p.limit)}</p><div class="diagram-source">${sourceLink(p)}</div></details><a class="secondary diagram-full-link" href="#${p.layer}/${p.id}">Open the full explanation →</a></div>`;}
  function chooseArea(id){state.area=layers[id]?id:'all';state.selected=null;state.group=null;state.filter='';const input=host.querySelector('#diagram-search');if(input)input.value='';hideResults();history.replaceState(null,'',`#diagram${state.area==='all'?'':'/'+state.area}`);draw();if(state.area==='services')host.querySelector('.service-overview h2').focus();announce(state.area==='all'?'Whole system view':`Inside ${meta[state.area].title}. ${layers[state.area].parts.length} selectable parts.`);}
  function chooseGroup(id){
    const group=serviceGroups.find(g=>g.id===id);if(!group)return;
    state.area='services';state.group=id;state.selected=null;hideResults();
    history.replaceState(null,'',`#diagram/services/group/${id}`);draw();host.querySelector('.service-overview h2').focus();
    announce(`${group.title}. ${group.ids.length} selectable parts.`);
  }
  function choosePart(id){const p=parts[id];if(!p)return;state.area=p.layer;state.selected=id;state.group=serviceGroupByPart[id]||null;hideResults();history.replaceState(null,'',`#diagram/${p.layer}/${p.id}`);draw();announce(`${p.name} selected. Its purpose and connections appear beside the diagram.`);}
  function announce(text){host.querySelector('#diagram-announcement').textContent=text;}
  function hideResults(){const el=host.querySelector('#diagram-search-results');if(el){el.hidden=true;el.innerHTML='';}}
  function searchRank(p,q){const name=p.name.toLowerCase(),term=q.trim().toLowerCase();return name===term?0:name.includes(term)?1:p.short.toLowerCase().includes(term)?2:3;}
  function search(q){state.filter=q;const el=host.querySelector('#diagram-search-results');if(!q.trim()){hideResults();return;}const hits=Object.values(parts).filter(p=>[p.name,p.short,p.what,p.why,p.example,p.limit,meta[p.layer].title].join(' ').toLowerCase().includes(q.toLowerCase())).sort((a,b)=>searchRank(a,q)-searchRank(b,q)).slice(0,12);el.hidden=false;el.innerHTML=hits.length?hits.map(p=>`<button data-diagram-part="${p.id}"><strong>${esc(p.name)}</strong><small>${esc(partContext(p))} · ${esc(p.short)}</small></button>`).join(''):'<p>No part matches. Try “record” or “snapshot”.</p>';}
  function expand(){state.expanded=!state.expanded;host.querySelector('#diagram-shell').classList.toggle('expanded',state.expanded);document.body.classList.toggle('diagram-is-expanded',state.expanded);host.querySelector('#diagram-expand').textContent=state.expanded?'Close expanded view ↙':'Expand ↗';host.querySelector('#diagram-expand').setAttribute('aria-pressed',String(state.expanded));}
  function pointerDown(e){if(e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()];pinch={distance:Math.hypot(a.x-b.x,a.y-b.y),scale:state.scale};drag=null;e.preventDefault();return;}drag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:state.x,startY:state.y,moved:false};}
  function pointerMove(e){if(pointers.has(e.pointerId))pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pinch&&pointers.size===2){const[a,b]=[...pointers.values()];state.scale=Math.min(4,Math.max(.65,pinch.scale*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(1,pinch.distance)));setView();suppressClick=true;return;}if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>5){drag.moved=true;suppressClick=true;svg.setPointerCapture(e.pointerId);svg.classList.add('is-dragging');const rect=svg.getBoundingClientRect();const units=Math.max(layoutBox.w/state.scale/rect.width,layoutBox.h/state.scale/rect.height);state.x=drag.startX-dx*units;state.y=drag.startY-dy*units;setView();}}
  function pointerUp(e){pointers.delete(e.pointerId);if(pinch){pinch=null;suppressClick=true;}if(drag?.id===e.pointerId){if(drag.moved)suppressClick=true;drag=null;}svg.classList.remove('is-dragging');if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);setTimeout(()=>{suppressClick=false;},0);}
  function mount(target,sub){if(host)unmount();host=target;const segments=location.hash.slice(1).split('/');const alias=G.aliases[segments[2]];segments[2]=alias||segments[2];state.area=alias&&parts[alias]?parts[alias].layer:layers[sub]?sub:'all';state.selected=parts[segments[2]]?.layer===state.area?segments[2]:null;state.group=state.area==='services'?(serviceGroupByPart[state.selected]||((segments[2]==='group'&&serviceGroups.some(g=>g.id===segments[3]))?segments[3]:null)):null;state.expanded=false;host.className='diagram-page';host.innerHTML=`<div class="diagram-page-title"><div><div class="eyebrow">An interactive system map</div><h1>See how it connects.</h1><p class="intro">Zoom into an area. Select a part. Follow a connection to another part.</p></div><span class="badge note">${Object.keys(parts).length} parts · one system</span></div><div id="diagram-shell" class="diagram-shell"><div class="diagram-toolbar"><div class="diagram-breadcrumb"><button id="diagram-overview" data-diagram-command="overview">Whole system</button><span aria-hidden="true">/</span><button id="diagram-current-area" disabled>Whole system</button><span id="diagram-group-breadcrumb" hidden><span aria-hidden="true">/</span> <strong id="diagram-current-group"></strong></span></div><div class="diagram-tools"><label class="sr-only" for="diagram-area-select">Zoom into an area</label><select id="diagram-area-select"><option value="all">Whole system</option>${G.layers.map(l=>`<option value="${l.id}">${esc(meta[l.id].title)}</option>`).join('')}</select><button id="diagram-expand" data-diagram-command="expand" aria-pressed="false">Expand ↗</button></div></div><div class="diagram-body"><div class="diagram-canvas-column"><div class="diagram-find"><label class="sr-only" for="diagram-search">Find a part in the diagram</label><input id="diagram-search" type="search" placeholder="Find a part in the map…" autocomplete="off"><div id="diagram-search-results" hidden></div><button id="diagram-clear" data-diagram-command="clear" hidden>Clear selection ×</button></div><div class="diagram-stage"><div id="diagram-disk-overview" hidden>${diskOverview()}</div><div id="diagram-service-overview" hidden></div><svg id="diagram-svg" role="group" aria-label="Interactive LastDB system diagram. Select an area or a part." tabindex="0"></svg><div class="diagram-zoom-controls"><button data-diagram-command="out" aria-label="Zoom out">−</button><span id="diagram-zoom-value">100%</span><button data-diagram-command="in" aria-label="Zoom in">+</button><button data-diagram-command="fit">Fit view</button></div><span class="diagram-stage-location" id="diagram-location"></span></div><div class="diagram-legend"><span><i></i>Current connection</span><span><i class="dashed"></i>Limited or inactive path</span><span class="diagram-pan-hint">Drag to move · + / − to zoom</span><button class="diagram-read-below" data-diagram-command="explain">Read the explanation ↓</button></div><div class="diagram-context-note">Select a part to see a few direct connections. Every connection remains in its explanation. Arrows show duties or data movement, not every internal call.</div></div><aside id="diagram-inspector" class="diagram-inspector" aria-label="Selected part explanation"></aside></div><div id="diagram-announcement" class="sr-only" role="status" aria-live="polite"></div></div><p class="site-note">Source review: ${G.reviewed}. The map uses the same reviewed explanations as the guide. It does not connect to your database.</p>`;
    svg=host.querySelector('#diagram-svg');host.addEventListener('click',onClick);host.addEventListener('keydown',onKey);host.querySelector('#diagram-area-select').addEventListener('change',e=>chooseArea(e.target.value));host.querySelector('#diagram-search').addEventListener('input',e=>search(e.target.value));svg.addEventListener('pointerdown',pointerDown);svg.addEventListener('pointermove',pointerMove);svg.addEventListener('pointerup',pointerUp);svg.addEventListener('pointercancel',pointerUp);svg.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(e.deltaY<0?1.12:1/1.12);}},{passive:false});draw();resizeObserver=new ResizeObserver(entries=>{if(host&&(entries[0].contentRect.width<520)!==narrowLayout)draw();});resizeObserver.observe(host.querySelector('.diagram-stage'));}
  function onClick(e){if(suppressClick)return;const node=e.target.closest('[data-diagram-part]'),area=e.target.closest('[data-diagram-area]'),group=e.target.closest('[data-diagram-group]'),command=e.target.closest('[data-diagram-command]');if(node){choosePart(node.dataset.diagramPart);return;}if(area){chooseArea(area.dataset.diagramArea);return;}if(group){chooseGroup(group.dataset.diagramGroup);return;}if(command){const action=command.dataset.diagramCommand;if(action==='overview')chooseArea('all');if(action==='clear'){if(currentGroup()){chooseGroup(state.group);return;}state.selected=null;history.replaceState(null,'',`#diagram/${state.area}`);draw();announce(state.area==='disk'?'Disk overview. Four write steps and expandable details.':'Selection cleared. Choose a part to see its connections.');}if(action==='explain')host.querySelector('#diagram-inspector').scrollIntoView({behavior:'smooth',block:'start'});if(action==='in')zoom(1.25);if(action==='out')zoom(.8);if(action==='fit'){state.scale=1;state.x=0;state.y=0;setView();}if(action==='expand')expand();}}
  function onKey(e){const node=e.target.closest('[data-diagram-part],[data-diagram-area]');if(node&&node.tagName.toLowerCase()==='g'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onClick({target:node});return;}if(e.key==='Escape'){hideResults();if(state.expanded)expand();return;}if(e.target===svg){if(['+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')zoom(1.25);if(e.key==='-')zoom(.8);if(e.key==='Home'){state.scale=1;state.x=state.y=0;}if(e.key==='ArrowLeft')state.x-=80/state.scale;if(e.key==='ArrowRight')state.x+=80/state.scale;if(e.key==='ArrowUp')state.y-=80/state.scale;if(e.key==='ArrowDown')state.y+=80/state.scale;setView();}}
  function unmount(){if(resizeObserver){resizeObserver.disconnect();resizeObserver=null;}if(host){host.removeEventListener('click',onClick);host.removeEventListener('keydown',onKey);}document.body.classList.remove('diagram-is-expanded');host=null;svg=null;drag=null;pinch=null;pointers.clear();}
  window.LastDBDiagram={mount,unmount,edges};
})();
