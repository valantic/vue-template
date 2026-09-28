# Plugins registered by default (`src/setup/plugins.ts`)

These are the plugins `src/setup/plugins.ts` registers on every app instance (in this order — i18n
first, see [README.md](./README.md#app-bootstrap-srcmaints)): `vue-bem-cn`, the `viewport`/`resize-end`
pair, custom directives, the SSR-related global components, `v-focus`, `dayjs`, and `tooltip`. For the
Cookiebot consent plugin and the Google Tag Manager plugin, which exist in `src/plugins/` but are
**not** registered here by default, see
[consent-and-analytics.md](./consent-and-analytics.md).

## `vue-bem-cn` (`src/plugins/vue-bem-cn/`)

Provides the `b()` helper used in templates for BEM class binding (`b()` → block, `b('header')` →
`block__header`, `b({ active })` → `block--active`), using the component's own `name` as the BEM block
name. Registered with `{ hyphenate: true }`. See the [BEM section](../README.md#bem) of the README for
the naming convention itself. The plugin's own comment notes: if the `VueBemCn` method name is changed,
the global type declaration in `shims-plugins.d.ts` must be updated too.

## `viewport` (`src/plugins/viewport.ts`)

Adds `app.config.globalProperties.$viewport`, a reactive object exposing, based on `window.innerWidth`
against the shared `BREAKPOINTS` table (`src/setup/globals.ts`, see
[build-modes.md](./build-modes.md#breakpoints-one-source-of-truth-kept-in-sync-by-hand)):

- `isXxs` / `isXs` / `isSm` / `isMd` / `isLg` / `isXl` — booleans, each true once the viewport is at
  least that breakpoint's width (`isXxs` is true only below `xs`).
- `isMobile` — `true` when `isSm` is `false` (i.e. narrower than the `sm` breakpoint).
- `currentViewport` — the short name (e.g. `'md'`) of the highest breakpoint the current width still
  satisfies.

The width is only re-read on a `resizeend` event (see below), not on every native `resize` event.

## `resize-end` (`src/plugins/resize-end.ts`)

Registers a global `resizeend` custom event that fires a fixed `RESIZE_DEBOUNCE` (100ms,
`src/setup/globals.ts`) after the native `resize` event stops firing. Doesn't expose anything on the
app instance — it's plumbing that `viewport` (and anything else that wants a debounced resize) listens
to directly: `window.addEventListener('resizeend', () => { ... })`.

## `dayjs` (`src/plugins/dayjs.ts`)

Adds `app.config.globalProperties.$dayjs` (the configured `dayjs` instance) and, at install time,
switches the global dayjs locale to `'de-ch'` and loads the `customParseFormat`, `isSameOrBefore`,
`isSameOrAfter`, and `isBetween` plugins. Also exports the `DateFormat` enum
(`DD_MM_YYYY`, `DD_MM_YYYY_HH_mm`, `dddd_DD_MMMM_YYYY`, `dddd_DD_MMMM_YYYY_HH_mm`) with the format
strings used consistently across the project.

## `tooltip` (`src/plugins/tooltip.ts`)

A one-line re-export of the [`floating-vue`](https://floating-vue.starpad.dev/) plugin
(`{ plugin: FloatingVue }`) with no custom options — see floating-vue's own component documentation for
usage.

## `v-focus` (`src/plugins/v-focus/`)

Registers two directives that together implement a "spotlight" effect: `v-focus-mask` (put on an outer
wrapper, or any element that should be dimmed/covered while something is focused) and `v-focus-item`
(put on an element that can receive focus, bound to a boolean). Multiple, independent `v-focus-item`s
can be focused separately or together; every `v-focus-mask` on the page reacts to every `v-focus-item`
— it's not possible to scope a mask to only some items. Styles ship with the plugin
(`styles/focus-item.scss`, `styles/focus-mask.scss`).

## Custom directives (`src/setup/directives.ts`)

Not itself a hand-written plugin, but registered in the same list: it auto-discovers and registers
every module under `src/directives/*.ts` (via `import.meta.glob`) as a Vue directive, named after each
module's own `name` export. See
[directives-and-helpers.md](./directives-and-helpers.md) for what those directives (`v-outside-click`,
`v-price`) do.

## SSR-related global components (`src/setup/ssr-components.ts`)

Registered as a plugin alongside the others. Globally registers a fixed set of components —
`l-default`, `c-header`, `c-footer` — via `app.component(...)`, so they're available anywhere in a
template without an explicit local import. The source marks these with an `// SSR related` comment;
they're the layout/header/footer components meant to wrap whatever the server template mounts the app
into.
