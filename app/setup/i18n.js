import VueI18n from 'vue-i18n';
import Vue from 'vue'; // Default language
import fallbackMessages from '../translations/en';
import numberFormats from '../translations/numbers';

const pageLang = document && document.documentElement && document.documentElement.lang;

Vue.use(VueI18n);

export const I18N_FALLBACK = 'en';
export const I18N_FALLBACK_MESSAGES = fallbackMessages;
export const I18N_LOCALES = [I18N_FALLBACK, 'de'];

export const i18n = new VueI18n({
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
  numberFormats,
});

/**
 * Load messages for given locale if not already loaded
 *
 * @param   {string}    locale    A locale identifier
 *
 * @returns {Promise}
 */
export const i18nLoadMessages = function(locale) {
  if (!Object.keys(i18n.messages).includes(locale)) {
    return import(/* webpackChunkName: 'lang-[request]' */ `../translations/${locale}`)
      .then((localeMessages) => {
        i18n.setLocaleMessage(locale, localeMessages);

        return locale;
      }); // eslint-disable-line vue/script-indent
  }

  return Promise.resolve(locale);
};

/**
 * Sets the application locale to the given value
 * Loads locale messages if needed
 *
 * @param   {string}    locale    A locale identifier
 *
 * @returns {Promise}
 */
export const i18nSetLocale = function(locale) { // eslint-disable-line no-param-reassign
  if (!I18N_LOCALES.includes(locale)) {
    locale = I18N_FALLBACK;
  }

  if (i18n.locale !== locale) {
    return i18nLoadMessages(locale).then((newLocale) => {
      i18n.locale = newLocale;
    });
  }

  return Promise.resolve(locale);
};

i18nSetLocale(pageLang);
