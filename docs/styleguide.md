# The local styleguide (`src/styleguide/`)

`src/styleguide/` is a dev-only, local, browsable catalogue of this project's own components, built on
top of the separate `@valantic/vue-styleguide` npm package (which provides the generic demo-page
layout components, router config helpers, and a "readme" test page). If you're looking for a specific
component's demo markup, it's here; if you're looking for how the demo-page wrapper components or the
router page-list mechanics work, that's in the `vue-styleguide` package itself.

## Contents

```
src/styleguide/
├── components/        # s- prefixed, styleguide-only components (demo widgets, layout helpers)
├── demo-pages/         # the demo content shown per real component/element/layout/directive
├── mock-data/          # fixture data fed into demo pages
├── msw-handlers/        # Mock Service Worker request handlers for demo API calls
├── routes/              # route definitions per category (components/directives/elements/layouts/general)
├── setup/               # options.ts, plugins.ts, routes.ts, msw-setup.ts
├── styleguide.vue
└── translations.json    # styleguide-only i18n strings (see i18n.md)
```

Components here use the `s-` BEM prefix (see the [BEM section](../README.md#bem) of the README) — the
visual signal that a component belongs only to the dev styleguide and must never be imported from real
component code.

## Wiring (`src/styleguide/setup/`)

`src/main.ts` dynamically imports `src/styleguide/setup` only when `import.meta.env.DEV` is true (see
[README.md](./README.md#app-bootstrap-srcmaints)):

```ts
// setup/index.ts
export { default as options } from './options';
export { default as plugins } from './plugins';
```

- `setup/plugins.ts` adds a Vue Router instance — the only place in this project Vue Router shows up,
  since regular pages don't do client-side routing, but a local demo catalogue needs navigable pages.
- `setup/routes.ts` assembles the full route list: it starts from `styleguideRouterConfig` /
  `styleguideTestPages` (from `@valantic/vue-styleguide`) for the root route and the "readme" page, then
  appends this project's own route groups from `src/styleguide/routes/{general,elements,layouts,
components,directives}.ts`, plus a catch-all redirect back to the styleguide root.
- `setup/msw-setup.ts` collects every handler under `src/styleguide/msw-handlers/*.ts` (via
  `import.meta.glob`) and starts a Mock Service Worker (`msw/browser`) instance with
  `onUnhandledRequest: 'bypass'`, so demo pages calling `$api` get realistic mocked responses instead of
  hitting a real backend.

## Kept out of production: the `@!production` alias

`src/main.ts` imports the styleguide setup via `@!production/styleguide/setup` rather than
`@/styleguide/setup`. `@!production` resolves to the exact same path as `@` (see the `alias` map in
`vite.config.ts`) — it's not a different directory, it's a marker. The production build excludes
anything matched by `/!dev/` from the bundle (`rolldownOptions.external: [/!dev/]`, see
[build-modes.md](./build-modes.md)). Combined with the `import.meta.env.DEV` guard around the dynamic
`import()`, the whole styleguide subtree — components, mock data, MSW, routes — is stripped from
production output entirely, rather than merely tree-shaken. This matters because the styleguide pulls
in `msw` and other demo-only dependencies that should never ship to a real client-facing bundle.
