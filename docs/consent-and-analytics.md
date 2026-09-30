# Consent and analytics plugins (opt-in)

These two plugins live under `src/plugins/` but, unlike the ones in
[plugins.md](./plugins.md), are **not** registered in `src/setup/plugins.ts` by default — a project
that wants them adds them to the plugin list itself.

## Consent (`src/plugins/consent/`)

A thin wrapper around a [Cookiebot](https://www.cookiebot.com/) integration. The source flags with a
`TODO` that it assumes an active Cookiebot plan/integration is already wired up on the page — treat it
as a starting point to adapt to whatever consent management platform a project actually uses, not a
drop-in.

- `consentState` — a reactive object with `isCookiebotAvailable` (seeded from `!!window.Cookiebot`, then
  flipped to `true` once, on the `CookiebotOnLoad` event) and `consent` (a copy of
  `window.Cookiebot?.consent`, refreshed on the `CookiebotOnConsentReady` event and whenever
  `isCookiebotAvailable` changes).
- `showConsentDialog()` — calls `window.Cookiebot?.show()` to open Cookiebot's consent UI.
- `ConsentGroup` enum — currently only `Necessary = 'necessary'`; the source comments it's meant to be
  extended with the consent groups a project actually uses (see
  [Cookiebot's own properties reference](https://www.cookiebot.com/en/developer/#h-properties)).
- `cConsentGatekeeper` — a component exported from this module (`c-consent-gatekeeper.vue`) for gating
  content behind a consent group.

## Google Tag Manager (`src/plugins/google-tag-manager.ts`)

Registers `app.config.globalProperties.$gtm`, a typed wrapper around `window.dataLayer.push()` covering
the standard GA4 ecommerce events — `pushViewItem`, `pushViewItemList`, `pushAddToCart`,
`pushRemoveFromCart`, `pushViewCart`, `pushSelectItem`, `pushAddToWishlist`, `pushBeginCheckout`,
`pushAddPaymentInfo`, `pushAddShippingInfo`, `pushPurchase` — plus `pushLogin`, `pushSignUp`, and
`pushSearch`. Call `this.$gtm.pushViewItem(item)` etc. instead of pushing to `window.dataLayer`
directly, so event payload shapes stay consistent across components. A generic `push(payload)` is also
exposed for anything not covered by the typed helpers.

- Throws if `window.dataLayer`/`window.dataLayer.push` isn't available — the page is expected to have
  already initialized GTM's `dataLayer` array.
- `debug: true` in the plugin's install options (or calling `$gtm.debug(true)` at runtime) logs every
  pushed payload and the current `dataLayer` to the console, but only outside production builds
  (`import.meta.env.MODE !== 'production'`).
- `GaListNames` enum (`Catalog`, `Search results`) is the starting set of list names passed to
  list-aware events like `pushViewItemList`/`pushAddToCart`/`pushSelectItem` — the source comments it's
  meant to be extended per project.
