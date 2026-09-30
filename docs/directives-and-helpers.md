# Custom directives and helpers

## Directives (`src/directives/`)

Auto-registered: `src/setup/directives.ts` globs every module under `src/directives/*.ts` and registers
each one as a Vue directive named after its own exported `name`. Adding a new file here is enough to
make it available as `v-<name>` — no manual registration needed.

### `v-outside-click` (`src/directives/outside-click.ts`)

Invokes a handler when a click, touchend, or scroll happens outside the bound element:

```vue
<div v-outside-click="closeDropdown"></div>
<div v-outside-click="{ handler: closeDropdown, excludeRefs: ['trigger'] }"></div>
```

- Bind either a plain handler function, or an options object: `{ handler, excludeRefs?, excludeIds?,
excludeElements? }`. Throws at mount time if no handler can be resolved from the binding.
- `excludeRefs` — template ref names (resolved against the bound element's owning component instance)
  whose elements should not count as "outside".
- `excludeIds` — DOM element ids (looked up via `document.getElementById`) to exclude the same way.
- `excludeElements` — `HTMLElement`s to exclude directly.
- Internally distinguishes a touch-scroll from a tap so that scrolling past the element's edge on touch
  devices doesn't fire the handler.

### `v-price` (`src/directives/price.ts`)

Formats the bound numeric value as a price string and sets it as the element's `textContent`, via
`formatPrice()` from `@valantic/frontend-utils`. This directive is only a thin template wrapper — the
currency/locale formatting logic itself lives in `frontend-utils`.

```vue
<span v-price="10"></span>
<!-- 10.00 -->
<span v-price.currencyBefore="10"></span>
<!-- CHF 10.00 -->
<span v-price.currencyAfter="10"></span>
<!-- 10.00 CHF -->
```

Locale is hardcoded to `de-CH`. `binding.value` must be a number (or a numeric string) — a non-numeric
value clears the element's content; `0` is a valid value and is formatted normally.

## Helper: `getApiUrl` (`src/helpers/get-api-url.ts`)

`getApiUrl(urlKey, values)` looks up a URL template from `src/setup/api-urls.json` by key and
substitutes `{placeholder}` tokens from `values`:

```ts
// src/setup/api-urls.json: { "getCart": "/api/cart/{id}" }
getApiUrl('getCart', { id: '42' }); // '/api/cart/42'
```

Throws if `urlKey` doesn't exist in `api-urls.json`. Centralizing backend URL templates in one JSON
file — rather than hardcoding paths per store/component — means a project only edits one file when a
backend route changes.
