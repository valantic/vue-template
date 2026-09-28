# Build modes, chunking, and breakpoints

## Two build modes: `app` and `pimcore`

`vite.builds.json` defines the build "modes" this project can produce, each with its own entry
point(s) and output directory (`dist/<mode>/`):

```json
{
  "modes": {
    "app": { "input": ["./src/main.ts", "./src/setup/scss/themes/theme-default.scss"] },
    "pimcore": { "input": ["./src/pimcore/pimcore.scss"] }
  },
  "profileBuild": "app"
}
```

- **`app`** (`npm run build`, `vite build --mode=app`) is the full build: it compiles `src/main.ts`
  (the whole Vue app — components, stores, plugins, i18n) plus the default theme's SCSS
  (`src/setup/scss/themes/theme-default.scss`).
- **`pimcore`** builds only `src/pimcore/pimcore.scss` — no JavaScript at all. This is for pages that
  need the CMS's own styling aligned with this project's design tokens but don't need an interactive
  Vue bundle.

`vite.config.ts` reads `vite.builds.json` and, for the `build` command, throws if the given `--mode`
isn't a known mode (unless it's the special `profile` mode) — an unrecognized mode fails the build
immediately.

There's also a `profile` mode (`npm run build:profile`), which builds using the `profileBuild` entry
(`app`) and adds `rollup-plugin-visualizer`, producing a flamegraph of bundle composition at
`./stats/index.html`.

## Manual chunk splitting

The `app` build's Rolldown output config (`rolldownOptions.output.codeSplitting.groups` in
`vite.config.ts`) groups modules into chunks by priority, highest first:

1. **`vue`** (priority 20) — anything under `node_modules/vue` or `node_modules/pinia`, isolated into
   its own chunk since the framework core changes far less often than app code.
2. **`vendor`** (priority 10) — every other `node_modules` package not already claimed by `vue`.
3. **`project`** (priority 5) — this project's own source files, but only when a module is shared by
   at least two entry points/chunks (`minShareCount: 2`) and is at least 10000 bytes (`minSize`) —
   small or single-use modules stay inlined in whichever chunk imports them.

Anything matched by `/!dev/` — the styleguide subtree reached through the `@!production` alias (see
[styleguide.md](./styleguide.md)) — is excluded from the bundle entirely via `rolldownOptions.external`,
so it never becomes part of any chunk.

If you add a new third-party dependency, it lands in the `vendor` chunk unless it's a `vue`/`pinia`
package — no manual chunk configuration is needed per dependency. Only add an override to
`codeSplitting.groups` if a specific heavy, rarely-used dependency needs to be isolated into its own
chunk.

## Breakpoints: one source of truth, kept in sync by hand

Responsive breakpoints are defined once, in TypeScript, in `src/setup/globals.ts`:

```ts
export const BREAKPOINTS = {
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
};
```

This is consumed in two ways:

- **At runtime**, by the `viewport` plugin (see [plugins.md](./plugins.md)), which exposes reactive
  booleans (`this.$viewport.isSm`, `.isMobile`, `.currentViewport`, ...) to every component for
  JS-level responsive logic.
- **At build time**, indirectly: SCSS has its own copy of the same values as Sass variables, used in
  `@media` queries for responsive CSS.

The TypeScript object and the SCSS variables are **not generated from a single source** — both
`globals.ts` and `AGENTS.md` call this out explicitly ("Keep in sync with SCSS variables!"). If you
add, remove, or change a breakpoint, update both places, or `$viewport` booleans and actual CSS layout
will disagree about where a breakpoint falls. When touching breakpoints, grep for the SCSS breakpoint
variables under `src/setup/scss/` alongside `globals.ts` in the same change.
