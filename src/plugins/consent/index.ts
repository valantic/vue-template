import { reactive, watch } from 'vue';

// TODO: an active Cookiebot.com plan/integration is required.

export { default as cConsentGatekeeper } from './c-consent-gatekeeper.vue';

// @see https://www.cookiebot.com/en/developer/#h-properties
export enum ConsentGroup {
  Necessary = 'necessary',
  // TODO: add additional groups.
}

export const consentState = reactive({
  isCookiebotAvailable: !!window.Cookiebot,
  consent: { ...window.Cookiebot?.consent },
});

/**
 * Updates the internal consent state.
 */
function updateConsentState(): void {
  consentState.consent = { ...window.Cookiebot?.consent };
}

/**
 * Shows the Cookiebot consent options.
 */
export function showConsentDialog(): void {
  window.Cookiebot?.show();
}

if (!consentState.isCookiebotAvailable) {
  window.addEventListener(
    'CookiebotOnLoad',
    () => {
      consentState.isCookiebotAvailable = true;
    },
    { once: true }
  );
}

window.addEventListener('CookiebotOnConsentReady', updateConsentState);

watch(() => consentState.isCookiebotAvailable, updateConsentState, { immediate: true });
