# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (mode=app)
npm run test:unit    # Run unit tests (watch mode)
npm run test         # Lint + unit tests (no watch)
npm run lint         # ESLint + Stylelint + TypeScript check
npm run lint:eslint  # ESLint only
npm run lint:stylelint # Stylelint only
npm run tsc          # Type-check only (vue-tsc)
npm run fix:stylelint # Auto-fix stylelint issues
npm run prettier     # Format all files
npm run build:icons  # Rebuild SVG sprite + update TS icon types
npm run clean:caches # Clear ESLint/Stylelint/Vite caches
```

Run a single test file:

```bash
npx vitest run tests/unit/specs/directives/price.test.ts
```

Build modes: `app` (default), `pimcore` (CMS stylesheet only). Profile build: `npm run build:profile`.

## Architecture

This is a **Vue 3 + TypeScript component library** designed for CMS integration (primarily Pimcore), not a SPA. Components are mounted on specific DOM nodes in server-rendered pages.

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

## Key Conventions

- **No grandchild BEM selectors**: `.c-card__header-title` not `.c-card__header__title`
- **No global state classes** (`.is-active`): use BEM modifiers instead
- **Components don't style other components** — use modifiers for cross-component style influence
- **SCSS color variables** use numeric scale (`$color-primary--100`) not semantic names
- **Blueprints** in `/blueprints/` — always base new components/tests/styleguide entries on them
- Node >=22 <25, npm >=10 <12 required
