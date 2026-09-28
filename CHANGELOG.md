# Changelog

## unreleased

- [ci] Aligned `.github/workflows/test.yml` with the other shared-frontend repos: job `test`, step "Run tests"
  (the old label claimed checks that don't run here), Node version read from `.nvmrc`, token limited to
  `contents: read`.
- [ci] `security.yml` now runs daily instead of hourly, uses `actions/checkout@v7` and pins
  `aquasecurity/trivy-action` to the commit SHA of `v0.36.0` instead of the movable tag.
- [chore] Harmonized the copyright line in `LICENSE` to `2017-present, valantic CEC Schweiz AG`, matching the README.
- [docs] Restructured `AGENTS.md` to the shared outline (new `What this is` and `Commands` sections) and added the
  shared `## Working rules` section (git rules, no release/publish or dependency changes without approval, engineering
  priorities, `npm test` before finishing).
- [docs] Added a `## Code conventions` section to `AGENTS.md` summarizing the valantic frontend guidelines (incl.
  Options API, Pinia).
- [docs] Added `CONTRIBUTING.md` (Getting started / Developing / Changelog / Releasing, shared outline).
- [docs] Replaced the duplicated `CLAUDE.md` content with a pointer to `AGENTS.md`, like the other repos, and made
  `AGENTS.md` refer to `engines`/`.nvmrc` for the Node.js/npm versions (the copy there was outdated).
- [docs] Added a `## Contributing` section to `README.md` linking `CONTRIBUTING.md`.
- [docs] Documented in `AGENTS.md`/`CLAUDE.md` that this boilerplate is not versioned, tagged or released.
- [docs] Adopted the shared shared-frontend changelog convention (`# Changelog` title, `unreleased` / `vX.Y.Z`
  headings, `[feat]`/`[fix]`/… prefixes, `### Breaking Changes` with migration notes), documented in `AGENTS.md` and
  `CLAUDE.md`. Merged the legacy `CHANGES.md` (webpack era, up to v7.0.0) unchanged into a `## Legacy` section at the
  end of this file and removed `CHANGES.md`.
- [docs] Added a repo banner (`.github/assets/banner.jpeg`) to the top of `README.md`, matching the `vue-styleguide`
  convention.

- [docs] Restructured `README.md` to follow the `vue-styleguide` schema (centered header with tagline/links, `About this
project`) and added the shared "from valantic - with love" footer.

- [chore] Reordered `package.json` top-level keys to match the `vue-styleguide` boilerplate ordering.

- [chore] Bumped `engines.node` to `>=22 <26` (was `>=22 <25`) to allow Node 25. Updated `.nvmrc` from `24` to `25`. Added
  `min-release-age=7` and `ignore-scripts=true` to `.npmrc`.

- [ci] Renamed the CI workflow to "CI Test" and updated it to `actions/checkout@v7`, `actions/setup-node@v7`, and Node 25.
- [docs] Streamlined `.github/PULL_REQUEST_TEMPLATE.md` and `.gitlab/merge_request_templates/Frontend.md` by removing the
  obsolete checklist sections.
- [docs] Added a Documentation section to AGENTS.md/CLAUDE.md requiring feature docs to live in this repo's own `docs/`
  folder (indexed by `docs/README.md`), separate from the workspace-level `docs/`.
- [refactor] Replaced the axios HTTP client with a `fetch`-based transport, `apiRequest` (plus `ApiError`,
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
  - [fix] `$api.put()` now issues a real HTTP PUT instead of a POST. This was a pre-existing bug in
    the axios-based `api.ts` (inherited by both axios-removal branches at first), fixed here as its
    own reviewed change rather than silently during the transport swap.
  - Supersedes the previously moved `createFetchInstance` helper (never released).
  - Dropped `blob`/`arraybuffer` response-type support from the `r-api-request.vue` styleguide demo
    (and its now-unused `/api-request/download` mock handler) since the new transport doesn't offer
    a `responseType` option — see the improvements list in the workspace doc referenced above.
  - Requires a `@valantic/frontend-utils` release containing this helper and a bump of the version
    pinned in `package.json` before this resolves.

## Legacy (former `CHANGES.md`, webpack era up to v7.0.0)

Kept for reference. These entries predate the Vite rewrite and its version line; they are not edited.

### Next (never released)

- (Enhancement) Updated vue-styleguide to version 2.0.1
- (feature) Improved styleguide routes.
- (feature) Updated packages.
- (Feature) Adds component s-navigation-filter for filtering sidebar navigation links
- (Feature) Adds styleguide build information to the index page.
- (Feature) Adds support for local webpack dist (Pimcore).
- (Feature) Adds auto-reload for scss file changes.
- (Breaking) Refactors e-checkbox, so the styling of the states does not need to rely on JS anymore.
- (Breaking) Removes e-with-root component.
  - The same behaviour can be achieved with :is=""
- (Breaking) Sprite support for e-icon.
- (Breaking) Removes touch-device mixin
- (Breaking) Removes c-panel
- (Breaking) Refactors e-picture (inverts sizes definition, adds additional options)
- (Breaking) Issue 168 Replace multiselect
  - Replaces the old c-multiselect component with a new e-multiselect component
  - Refactoring and remove project specific features
  - Makes the component simpler and more generic usable
  - Adds v-model handling
- (Change) Fixes invalid greyscale order.
- (Change) Replaces deprecated webpack-manifest-plugin with webpack-assets-manifest.
- (Change) Simplifies s-readme styles, so they align more with the current project.
- (Change) Updates browser support table.
- (Change) Makes form mixin imports absolute to prevent ESLint errors.
- (Change) Removes deprecated prop from e-checkbox demos.
- (Change) Adds multi line demo for e-checkbox.
- (Change) Adds translation best practices to readme.
- (Change) Enables console errors for HTML inside of translations
- (Update) Updates all NPM packages to the current version. Except:
  - stylus-loader: was removed, because not required anymore
  - stylus: was removed because not required anymore
  - vue-js-modal because version 2.0 is not ready
  - uglifyjs-webpack-plugin: was replaced with terser-webpack-plugin because deprecated
- (Change) Issue 163: Replaces Reboot Styles with Reset npm package, removes some default spacing styles
- (Change) Issue 159: Replace SCSS slash division
  - Updates the sass plugin to version 1.39.2 which makes it possible to use the @use "math:div" function.
  - Replaces the SCSS divisions by "slash" with the math.div() Sass function
  - Activates the `hoistUseStatements` option in the sass-loader plugin
- (Change) Issue 144 / 166:
  - Removes global scss imports
  - Replaces usages of `@import` with `@use` and `@forward`
  - Replaces usages of `@extends` with `@mixins` as extends is not supported by scss namespaces
  - Uses local imports for scss mixins, functions and variables
- (Bug) Fixes broken styleguide build.
- (Breaking) Issue 157: Updates to Vue 3 and Typescript
  - Changes all JS files and Vue SFC files to be written in Typescript
  - Adjusts Store Modules Syntax to be benefit from typings
  - Adjusts custom V-Model Syntax as it is not supported in Vue 3 anymore
  - Replace Mixins by Compositions to benefit from typings
  - Updates Directive Hooks to work with Vue 3
  - Removes IE11 Polyfills as Vue 3 does not support IE11 anymore
  - Removes Spryker related code
  - Removes Components Collapse, CollapseGroup, Modal, ModalStack
  - Removes EventBus as it is not supported anymore in Vue 3
  - Removes Pimcore Directives
- (Change) Issue 171: Updates to Webpack 5

### v7.0.0 (2020-09-29)

- (Breaking) Changes the query hash in the webpack config to a file hash by default to prevent proxy caching.
- (Feature) Adds 'isMobile' computed to the '$viewport' helper/tools.
- (Change) Changes remote asset protocols to https to prevent security exceptions on styleguide server.
- (Change) Reverts router mode to 'history' for styleguide build.
- (Change) Replaces relative imports with alias based ones.
- (Change) Adds postcss as standalone NPM package because it is no longer a dependency of the postcss-loader.
- (Change) Updates roadmap in readme file.
- (Update) Updates all NPM packages to the current version. Except:
  - babel-core because it is still needed by jest/vue-jest
  - babel-eslint because of the issue https://github.com/babel/babel-eslint/issues/815
  - vue-js-modal because version 2.0 is not ready

### v6.0.0 (2020-08-25)

- (Breaking) Refactors c-modal header component to slot.
- (Feature) New outside click directive.
- (Feature) New e-table component.
- (Bug) Refactors the Google Analytics dataLayer condition. Testing for a native array could be problematic, since it
  may be replaced during initialisation.
- (Update) Updates all NPM packages to the current version. Except:
  - babel-core because it is still needed by jest/vue-jest
  - babel-eslint because of the issue https://github.com/babel/babel-eslint/issues/815
  - vue-js-modal because version 2.0 is not ready
- (Removed) Removes e-link component.

### v5.0.0 (2020-07-24)

- Updates all NPM packages to the current version (2020-07-24, except babel-eslint because of an
  issue, https://github.com/babel/babel-eslint/issues/815)
- Updates and extends Vue Styleguidist documentations
- Replaces styleguide components section in Vue Styleguidist with pages
- Extends e-select with the optional props to define alternative value and label sources
- Extends e-select with the possibility to disable the placeholder entry

### v4.0.0 (2020-03-20)

- Updates all NPM packages to the current version (2020-03-18, except babel-eslint because of an issue.
  See https://github.com/babel/babel-eslint/issues/815)
- Removes Vuetify because version 2 created a massive overhead in builded files
- Adds separate translation files for styleguide #77
- Adds state flags for components in styleguidist to track state #69
- Refactors entire webpack configuration
- Adds code splitting for polyfill code #62
- Changes folder structure slightly

### v3.1.0 (2019-02-14)

- Adds status label to components. #70
- update eslint config. #68
- update vue-i18n. #72
- Add scale validator. #67
- Replace moment.js with dayjs. #73
- Fix issue with backdrop in c-modal.
