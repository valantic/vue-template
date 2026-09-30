# vue-template docs

`vue-template` is valantic's Vue 3 + TypeScript boilerplate for frontends that get mounted into
server-rendered pages (primarily a CMS template), not a single-page application: the server owns the
page (navigation, layout, initial data), Vue owns the interactive widgets placed on it. New client
projects are started from this repo and diverge from there.

This folder documents the project's own features — stores, plugins, compositions, directives, build
setup. General conventions (BEM, the Vue/Options-API rules, Pinia patterns, translations) are already
covered in depth in the [README](../README.md) — see the [BEM](../README.md#bem),
[Vue.js](../README.md#vuejs), [Pinia](../README.md#pinia) and [Translations](../README.md#translations)
sections there; the docs here link to those instead of repeating them.

## App bootstrap (`src/main.ts`)

```ts
const vuePlugins = plugins; // src/setup/plugins.ts
const pinia = createPinia();
let vueOptions = options; // src/setup/options.ts

if (import.meta.env.DEV) {
  const styleguideOptions = await import('@!production/styleguide/setup');
  vueOptions = { ...vueOptions, ...styleguideOptions.options };
  vuePlugins.push(...styleguideOptions.plugins);
}

const app = createApp(vueOptions);
pinia.use(api); // src/stores/plugins/api.ts
vuePlugins.forEach(({ plugin, options }) => app.use(plugin, options));
app.use(pinia);
app.mount('#app');
```

1. **Root options** (`src/setup/options.ts`) define the root component config. In a fresh checkout
   it's just `export default {}` — there's no fixed app shell, because what renders on a given page
   depends on which components the server template includes.
2. **Plugins** (`src/setup/plugins.ts`) are registered on the app instance. i18n is registered first
   because plugin registration order must keep it before the BEM-related setup (see the comment at the
   top of `plugins.ts`). See [plugins.md](./plugins.md) for what each one does.
3. **Dev-only styleguide**: only when `import.meta.env.DEV` is true, `src/styleguide/setup` is
   dynamically imported (via the `@!production` alias, see [build-modes.md](./build-modes.md)) and
   merged into both the root options and the plugin list. See [styleguide.md](./styleguide.md).
4. **Pinia** is created and given the custom `api` plugin, which adds a `$api` HTTP client (with
   notification handling) to every store, before Pinia itself is registered on the app. See
   [state-and-data-flow.md](./state-and-data-flow.md).
5. The app is mounted on `#app` — whatever DOM node the server template provided.

The `@` alias maps to `src/` everywhere (`vite.config.ts`, tests, TypeScript config) — use
`@/setup/...`, `@/stores/...`, etc. instead of relative `../../` chains.

## Feature docs

- [build-modes.md](./build-modes.md) — the `app`/`pimcore` Vite build modes, manual chunk splitting,
  and the shared breakpoints table
- [state-and-data-flow.md](./state-and-data-flow.md) — the Pinia stores (`session`, `breadcrumb`,
  `notification`), the `window.initialData` pattern, and the `$api` Pinia plugin
- [i18n.md](./i18n.md) — the `vue-i18n` setup, locale loading, and translation key conventions
- [styleguide.md](./styleguide.md) — the dev-only local component catalogue in `src/styleguide/`
- [plugins.md](./plugins.md) — the plugins registered by default in `src/setup/plugins.ts` (BEM,
  viewport, resize-end, dayjs, tooltip, `v-focus`) and the SSR-related global components
- [consent-and-analytics.md](./consent-and-analytics.md) — the Cookiebot consent plugin and the Google
  Tag Manager plugin (both opt-in, not registered by default)
- [compositions.md](./compositions.md) — the `src/compositions/` composables (`form-states`, `themes`,
  `uuid`)
- [directives-and-helpers.md](./directives-and-helpers.md) — the auto-registered custom directives
  (`v-outside-click`, `v-price`) and the `getApiUrl` helper
