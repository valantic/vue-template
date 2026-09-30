# State and data flow

Because this project isn't a SPA (see [README.md](./README.md)), it can't rely on "app boots, then
fetches everything it needs" — the server has already rendered the page with real data by the time Vue
mounts. State management is built around getting that server-known data into Pinia cleanly, and around
a consistent shape for stores that do need to talk to an API afterwards.

For general Pinia conventions (module structure, composition-vs-options store style) see the
[Pinia section](../README.md#pinia) of the README. This page covers what's specific to this project:
the store naming convention, the three stores that ship with the template, the `window.initialData`
pattern, and the `$api` Pinia plugin.

## Pinia store naming convention

Stores live in `src/stores/`, one file per store, named in the singular (`session.ts`, `breadcrumb.ts`,
`notification.ts`). Within a store, method names follow a small vocabulary:

| Prefix  | Meaning                                                         |
| ------- | --------------------------------------------------------------- |
| `get*`  | a getter                                                        |
| `set*`  | a setter action (mutates state directly, no request)            |
| `api*`  | an action that performs an HTTP request (via the `$api` plugin) |
| `data*` | an action that handles injecting initial server-provided data   |

## The three stores

### `session` (`src/stores/session.ts`)

Plain getter/setter state, no network or initial-data concerns:

- `state.theme` (default `'theme-01'`) — the active theme id. Read via composition
  [`themes.ts`](./compositions.md), set via `setTheme(id)`.
- `state.googleMapsApiKey` — `null` in production; in dev mode it's seeded from the
  `VITE_GOOGLE_MAPS_API_KEY` env variable.
- `getTheme` getter returns `state.theme`.

### `breadcrumb` (`src/stores/breadcrumb.ts`)

`state.items: BreadcrumbItem[]` (`{ name, url }`), seeded from `window.initialData.breadcrumb.items` if
that's an array, otherwise `[]`. No actions or getters beyond the state itself.

### `notification` (`src/stores/notification.ts`)

Holds the app's toast/message queue:

- `state.notifications: MappedNotificationItem[]` — each item gets a numeric `id` assigned via an
  internal counter (`addId`). On store creation, it's seeded from two sources: any messages left in
  `window.localStorage` under the `appNotifications` key (`getNotificationsFromStorage`, used for a
  message that needs to survive a redirect), and `window.initialData.notification.messages`.
- `showNotification(notification)` action — pushes a notification (unless `showToUser === false`), and
  first calls `handleRedirectOrReload`, which — if the notification carries a `redirectUrl` — stores the
  notification in `localStorage` and either `location.reload()`s (if `pageReload` is set) or navigates
  to `redirectUrl`.
- `popNotification(id)` — removes a notification by id.
- `showUnknownError()` — pushes a generic translated error message
  (`global-messages.unknown-api-error`).
- `mapApiResponseMessages(messages)` — a standalone exported function (not a store action) that turns an
  API response's `{ success, info, error }` message arrays into `NotificationItem[]`, tagging each with
  its type and mapping `action: 'PAGE_RELOAD'` to `pageReload: true`. Used by both the store's own
  initial-data handling and the `$api` plugin below.

## Getting server-rendered data into a store: `window.initialData`

Before the app's script tag runs, the server template writes an inline script that sets a global, keyed
by store name (`src/setup/globals.ts`'s `Store` enum: `session`, `breadcrumb`, `notification`):

```html
<script>
  window.initialData = {
    breadcrumb: {
      items: [
        /* ... */
      ],
    },
    notification: {
      messages: {
        success: [
          /* ... */
        ],
      },
    },
  };
</script>
```

A store reads its own slice of `window.initialData` inside its `state()` function. This means: **the
store's default/fallback state always exists on its own** — a component or test can use the store with
no `window.initialData` set at all; production pages just happen to always set it. Because the read
happens inside `state()`, it happens once, at store creation time — there's no polling or re-reading of
`window.initialData` later. If data changes after that point, it comes in through an `api*` action
instead.

## The `$api` Pinia plugin (`src/stores/plugins/api.ts`)

Registered once in `src/main.ts` via `pinia.use(api)`, so every store gets a `this.$api` object with
`get`/`post`/`put`/`patch`/`delete` methods. It wraps a shared Axios instance
(`axiosInstance`, exported from the same file) and adds two behaviors uniformly, so individual stores
don't reimplement them:

- **Notification handling.** If a response body (success or error) includes a `messages` field
  (`{ success?, info?, error? }`), the plugin maps it via `mapApiResponseMessages` and forwards it to
  the `notification` store's `showNotification` — a store calling `this.$api.post(...)` doesn't need to
  manually surface server-side validation errors or success toasts. On an error response with no
  `messages` (and not an aborted/timed-out request), it falls back to `showUnknownError()`.
- **Request de-duplication via `uniqueId`.** `get(url, config, uniqueId)` and `put(url, data, config,
uniqueId)` take an optional third/fourth `uniqueId` argument (not a `config` field): passing the same
  `uniqueId` on a second call aborts the request from the previous call with that id before starting the
  new one. This is meant for cases like search-as-you-type firing overlapping requests — a store action
  picks a stable `uniqueId` and the plugin does the abort bookkeeping. `post`, `patch`, and `delete` do
  not support `uniqueId`.

A store action that fetches data conventionally starts with `api`, e.g. `apiFetchSomething()`, to make
it visually distinct from `set*` (synchronous, local) and `data*` (initial-data-only) actions.

### Locale header

`axiosInstance` is created with its `locale` header set to `PAGE_LANG` (the page's `<html lang="...">`
attribute, from `src/setup/i18n.ts`). When the app locale changes via `i18nSetLocale()`, that function
updates `axiosInstance.defaults.headers.common.locale` to match — so a locale switch (see
[i18n.md](./i18n.md)) is reflected in subsequent API requests without stores passing it explicitly on
every call.
