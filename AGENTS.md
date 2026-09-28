# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Cursor, Copilot, etc.) when working with code in
this repository.

## What this is

`vue-template` is valantic's **Vue 3 + TypeScript boilerplate** for frontends integrated into a CMS (primarily
Pimcore), not a SPA: components are mounted on specific DOM nodes in server-rendered pages. Projects are started from
it or pull its updates in (see "Integrate vue-template into an other repository" in `README.md`). It is not versioned,
tagged or published, and has no release scripts — do not add any.

## Commands

- `npm test` — full check: `npm run lint && npm run test:unit -- --watch=false`. Run before considering work done.
- `npm run lint` — runs `lint:eslint`, `lint:stylelint`, and `tsc` (type-check via `vue-tsc`) together.
- `npm run test:unit` — Vitest, run from `tests/`. To run a single test file: `npm run test:unit -- <path>`. To run a
  single test by name: `npm run test:unit -- -t "<test name>"`.
- `npm run fix:stylelint` — Stylelint with `--fix` (uses `.stylelintrc.fix.js`).
- `npm run prettier` — formats the whole repo in place.
- `npm run dev` / `npm run serve` — Vite dev server / preview of the built app.
- `npm run build` — Vite build. Build modes (`vite.builds.json`): `app` (default), `pimcore` (CMS stylesheet only).
  Profile build: `npm run build:profile`.
- `npm run build:icons` — regenerates the SVG sprite from `src/assets/icons/*.svg` and updates the icon TS type. Run
  this after adding/removing an icon SVG.
- `npm run clean:caches` — clears `.eslintcache`, `.stylelintcache`, `node_modules/.cache`.

## Architecture

### App Bootstrap (`src/main.ts`)

- Creates Vue app from `src/setup/options.ts` (root component config)
- Registers plugins from `src/setup/plugins.ts` (i18n, BEM, viewport, directives, etc.)
- In dev mode, dynamically imports styleguide setup (`src/styleguide/setup.ts`) which adds styleguide routes/components
- Pinia store is initialized with an `api` plugin (`src/stores/plugins/api.ts`)

### Path Alias

`@` maps to `src/`. Use `@/setup/...`, `@/components/...` etc. everywhere — no relative paths needed across modules.

### Component Naming (BEM Namespaces)

| Prefix | Meaning                                                          |
| ------ | ---------------------------------------------------------------- |
| `c-`   | Regular component (can contain other components)                 |
| `e-`   | Element component (leaf node, no child components)               |
| `l-`   | Layout component (outermost wrappers)                            |
| `s-`   | Styleguide-only component (keep in `src/styleguide/components/`) |

All component filenames and template usage use `kebab-case`. Names must be singular.

### BEM in Templates

Use the `b()` method (from `vue-bem-cn` plugin) for BEM class binding — `b()` uses the component `name` as the block:

```vue
<div :class="b()">           <!-- block -->
<div :class="b('header')">   <!-- block__header -->
<div :class="b({ active })"> <!-- block--active modifier -->
```

### Pinia Stores (`src/stores/`)

Store files are singular (e.g. `session.ts`, `notification.ts`). Convention for naming:

- `get*` — getters
- `set*` — setter actions
- `api*` — actions that make HTTP requests
- `data*` — actions handling initial data injection

Initial data is injected via `window.initialData` in the HTML before the app script, then picked up in store `setup()` methods.

### Compositions (`src/compositions/`)

Reusable composition functions (Vue 3 composables). Used in component `setup()` to share logic. Key ones: `form-states.ts`, `themes.ts`, `uuid.ts`.

### Plugins (`src/plugins/`)

Custom Vue plugins: `vue-bem-cn` (BEM class helper), `viewport` (breakpoint tracking), `resize-end` (debounced resize), `tooltip` (floating-vue wrapper), `dayjs` (date formatting), `v-focus` (auto-focus directive).

### Translations

All user-visible text goes through `vue-i18n`. Keys are namespaced by component: `c-component-name.keyName`. Translation files live in `src/translations/`. Use `$t()` in templates, never `v-t` directive. For usage outside components, import `i18n` from `@/setup/i18n`.

### Styleguide (`src/styleguide/`)

Dev-only living styleguide. Loaded conditionally in `src/main.ts` only when `import.meta.env.DEV`. Contains demo pages, mock data, MSW handlers, and styleguide-only components. The `@!production` alias (same as `@`) exists as a marker — files imported via it are excluded from production builds via Rollup's `external: [/!dev/]` filter.

### Build Outputs

Configured in `vite.builds.json`. Output goes to `dist/<mode>/`. Manual chunk splitting groups: `vue+pinia+axios`, `vue-i18n`, `dayjs`, `vuelidate`, `embla-carousel`, `floating-vue+body-scroll-lock`, `pikaday`.

### Testing (`tests/unit/specs/`)

Vitest + jsdom + `@vue/test-utils`. Test files follow `*.test.ts` naming. Blueprints for new tests in `blueprints/`.

### Breakpoints

Defined in `src/setup/globals.ts`: `xxs(0) xs(480) sm(768) md(1024) lg(1200) xl(1440)`. Must stay in sync with SCSS variables.

### Key conventions

- **No grandchild BEM selectors**: `.c-card__header-title` not `.c-card__header__title`
- **No global state classes** (`.is-active`): use BEM modifiers instead
- **Components don't style other components** — use modifiers for cross-component style influence
- **SCSS color variables** use numeric scale (`$color-primary--100`) not semantic names
- **Blueprints** in `/blueprints/` — always base new components/tests/styleguide entries on them
- Required Node.js/npm versions: see `engines` in `package.json` and `.nvmrc`

## Code conventions

Follow the repo's ESLint/Stylelint/Prettier config and `.editorconfig`. On top of that:

- Naming: files `kebab-case`; types, interfaces and enums `PascalCase`; functions, properties and variables
  `camelCase`. Singular names for single things (types, enums, components, stores), plural only for collections. Use
  whole, descriptive words — identifiers have at least 3 characters (`id-length`), except the ones whitelisted in the
  ESLint config.
- TypeScript: never use `any` — use `unknown` plus narrowing or a generic; if `any` is unavoidable, isolate it and
  comment why. Use `type` for object shapes; `interface` only for features exclusive to it, without an `I` prefix.
- Control flow: no `while` or plain `for` loops (use array methods, or `for...of` when `await`/`break`/`continue` is
  needed), no `switch` (use object literals or `if`/`else`), no one-line `if` bodies.
- Comments only where the code is not self-explanatory, in JSDoc style.
- Vue: components use the Options API with `defineComponent` and `<script lang="ts">` — never `<script setup>` or the
  Composition API style. Use method shorthand (not arrow functions) in `methods`/`computed`. Base new files on
  `blueprints/` and keep their structure, lifecycle-hook order and commented-out blocks.
- Templates: no loop index as `v-for` key, no `v-text`, move complex conditions into `computed`. Declare every emitted
  event in `emits`; remove event listeners in `unmounted`.
- State management: Pinia, never Vuex.
- Styles: no hard-coded colors — reuse the existing color variables (add a new `kebab-case` variable if needed).

valantic developers find the full guidelines in the internal ai-cornerstone repository (`guidelines/frontend/`, skills
`frontend-best-practices` and `vue-best-practices`).

## Working rules

These rules are identical in every valantic shared-frontend repo.

- Git: never commit unless explicitly asked. Never push unless explicitly asked in that request. Never pull or
  create/switch branches (`git pull`, `git checkout`, `git switch`, `git branch`, …). Branch names are
  `feature/<name>` or `bugfix/<name>`.
- Never run a release script or `npm publish` unless explicitly asked.
- Never install, update or remove npm packages without approval. Never edit generated or vendored files
  (`node_modules/`, `dist/`, lock files by hand).
- Priorities: correctness, simplicity, consistency with the existing code, maintainability, minimal changes. Prefer the
  smallest correct change.
- Understand the existing code and search for existing implementations before adding new ones; reuse over new
  abstractions. Do not refactor unrelated code, change public APIs, or change behavior outside the task's scope.
- Before finishing, run `npm test` and fix failures caused by the change. Every change gets a changelog entry and,
  where a feature changes, a doc update (see Changelog and Documentation below).
- If a requirement is unclear, ask. If only an implementation detail is unclear, follow the existing patterns in this
  repo.

## Changelog (required for every task)

`CHANGELOG.md` follows the convention shared by all valantic shared-frontend repos.

- Every change that alters behavior, fixes a bug, or adds/removes something consumers can see gets one entry under
  `## unreleased` in the same change — do not defer it to a follow-up task.
- Format: `- [type] Description.` — one entry per logical change, kept as a flat list (no "Added"/"Fixed" category
  subheadings), so each entry stays self-contained and merge conflicts can be resolved line by line.
- Allowed prefixes ([Conventional Commits](https://www.conventionalcommits.org/) types): `[feat]`, `[fix]`,
  `[refactor]`, `[perf]`, `[docs]`, `[test]`, `[build]`, `[ci]`, `[chore]`, `[revert]`. Older prefixes in released
  sections (`[ENHANCEMENT]`, `(Change)`, …) are history — do not reuse them and do not rewrite old entries.
- Write the description so it is understandable without the diff: name the affected module and the effect for
  consumers.
- Breaking changes are grouped under a `### Breaking Changes` subheading placed directly under `## unreleased`, above
  the regular entries. They keep their prefix and must end with a **Migration:** sentence stating what consumers
  have to do.
- A change is breaking if projects based on this template have to adapt when pulling it in: removed/renamed
  components, props, stores, plugins, aliases, build modes or config files, or changed BEM class names. When in
  doubt, list it under `### Breaking Changes` rather than omit the migration note.
- Headings: title `# Changelog`, unreleased section `## unreleased` (exact, lowercase — release tooling matches it
  literally), released sections `## vX.Y.Z`. Only the unreleased section is edited; released sections stay as they
  are.

## Documentation

This repo keeps its own feature docs in a `docs/` folder (with an index at `docs/README.md`) — this is separate from
the workspace-level `docs/` at the root of `valantic/` and must not be skipped in favor of it.

- Every notable feature (a Pinia store, a plugin, a composition, a build mode, etc.) gets one Markdown file under
  `docs/` describing its purpose, public API, and usage.
- When adding, changing, or removing a feature, update the matching doc in the same change — do not defer it to a
  follow-up task.
- `docs/README.md` is the index; add a one-line link to every new doc file there.
