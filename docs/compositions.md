# Compositions (`src/compositions/`)

Reusable composition functions (Vue 3 composables), used from a component's `setup()` to share logic
(components themselves stay Options API — see the [Vue.js section](../README.md#vuejs) of the README).

## `form-states.ts`

`formStates(inputState: Ref<FieldState>)` returns the reactive state most form-element components
(inputs, selects, etc.) share:

- `active`, `focus`, `hover` — plain writable `Ref<boolean>`s the component toggles itself (e.g. on
  `@focus`/`@blur`/`@mouseenter`).
- `stateModifiers` — a computed combining `state` (from `inputState`) with `active`/`focus`/`hover`,
  meant to be spread into a BEM modifier object.
- `stateIcon` — a computed mapping `FieldState.Error` → `'i-error'`, `.Success` → `'i-check'`, `.Info` →
  `'i-info'`, everything else (including `.Default` and `.Warning`) → `null`.
- `hasDefaultState` — a computed, `true` when `inputState.value === FieldState.Default`.

The `FieldState` enum (`Default`, `Success`, `Info`, `Warning`, `Error`) is exported from the same file.
The module also exports `withProps()`, a factory for the standard `state` prop declaration (`String`,
default `'default'`, validated against the five `FieldState` values) — use it instead of redeclaring the
prop per component: `props: { ...withProps() }`.

## `themes.ts`

`(customTheme?: string) => { theme: ComputedRef<string> }` — resolves the active theme name, preferring
the given `customTheme` argument and falling back to the `session` Pinia store's `getTheme` (see
[state-and-data-flow.md](./state-and-data-flow.md#session-srcstoressessionts)).

## `uuid.ts`

`() => { uuid: number }` — hands out a module-scoped, monotonically increasing numeric id on each call
(starting at `1`). Use it when a component instance needs a stable unique id (e.g. for `id`/`for`
attribute pairs) without pulling in a UUID library. The id is unique per call, not per component
instance — call it once in `setup()` and reuse the returned value, not on every render.
