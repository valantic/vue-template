# vue-template

## unreleased

- Restructured `README.md` to follow the `vue-styleguide` schema (centered header with tagline/links, `About this
project`) and added the shared "from valantic - with love" footer.

- Reordered `package.json` top-level keys to match the `vue-styleguide` boilerplate ordering.

- Bumped `engines.node` to `>=22 <26` (was `>=22 <25`) to allow Node 25. Updated `.nvmrc` from `24` to `25`. Added
  `min-release-age=7` and `ignore-scripts=true` to `.npmrc`.

- Renamed the CI workflow to "CI Test" and updated it to `actions/checkout@v7`, `actions/setup-node@v7`, and Node 25.
- Streamlined `.github/PULL_REQUEST_TEMPLATE.md` and `.gitlab/merge_request_templates/Frontend.md` by removing the
  obsolete checklist sections.
- Added a Documentation section to AGENTS.md/CLAUDE.md requiring feature docs to live in this repo's own `docs/`
  folder (indexed by `docs/README.md`), separate from the workspace-level `docs/`.
- Replaced the axios HTTP client with a `fetch`-based transport, `apiRequest` (plus `ApiError`,
  `isSilentAbortError`, and its supporting types/helpers), sourced from `@valantic/frontend-utils`
  (`src/helpers/api-request.ts`) rather than a local file, so it can be reused across projects
  without a Vue dependency. `src/stores/plugins/api.ts` (the Pinia plugin) now builds on it,
  keeping the notification wiring, `uniqueId`/`AbortController` cancellation stack (still `get`-only,
  matching the previous axios-based behavior), and locale header sync.
  - This design (and its exact behaviors — 30s default timeout, `key[]=value` query param
    serialization) matches the `feature/replace-axios-with-native-fetch` branch, chosen over an
    earlier, more feature-rich port (retries, baseURL, XSRF forwarding) because it stays a scoped,
    behavior-preserving dependency swap; see
    `docs/shared-frontend/axios-to-fetch-helper-migration.md` at the workspace root.
  - (Fix) `$api.put()` now issues a real HTTP PUT instead of a POST. This was a pre-existing bug in
    the axios-based `api.ts` (inherited by both axios-removal branches at first), fixed here as its
    own reviewed change rather than silently during the transport swap.
  - Supersedes the previously moved `createFetchInstance` helper (never released).
  - Dropped `blob`/`arraybuffer` response-type support from the `r-api-request.vue` styleguide demo
    (and its now-unused `/api-request/download` mock handler) since the new transport doesn't offer
    a `responseType` option — see the improvements list in the workspace doc referenced above.
  - Requires a `@valantic/frontend-utils` release containing this helper and a bump of the version
    pinned in `package.json` before this resolves.
