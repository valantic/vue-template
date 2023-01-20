import VueI18n from 'vue-i18n';
import Vue from 'vue'; // Default language
import fallbackMessages from '../translations/de';
import numberFormats from './localization';

const pageLang = document?.documentElement?.lang;

Vue.use(VueI18n);

export const I18N_FALLBACK = 'de';
export const I18N_FALLBACK_MESSAGES = fallbackMessages;
export const I18N_LOCALES = [I18N_FALLBACK, 'fr'];

// Add styleguide only translations
if (process.env.NODE_ENV !== 'production') {
  const styleguideTranslations = require('./styleguide.translations'); // eslint-disable-line global-require

  if (styleguideTranslations[I18N_FALLBACK]) {
    Object.entries(styleguideTranslations[I18N_FALLBACK]).forEach(([key, value]) => {
      I18N_FALLBACK_MESSAGES[key] = value;
    });
  }
}

const dateTimeFormats = { // @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#parameter
  month: { // January, February, March, ...
    month: 'long',
  },
};

export const i18n = new VueI18n({
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  warnHtmlInMessage: process.env.NODE_ENV !== 'production' ? 'error' : 'off',
  dateTimeFormats: {
    [I18N_FALLBACK]: dateTimeFormats,
    [pageLang]: dateTimeFormats,
  },

  /**
   * Callback for the 'missing' event, during translation lookup.
   *
   * @param {String} locale - The current locale.
   * @param {String} messageKey - The request message key.
   */
  missing(locale, messageKey) {
    console.error(`No '${locale}' translations found for '${messageKey}'`); // eslint-disable-line no-console
  },
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
  numberFormats,
});

/**
 * Load messages for given locale if not already loaded.
 *
 * @param   {String}    locale    A locale identifier
 *
 * @returns {Promise}
 */
export const i18nLoadMessages = function(locale) {
  if (!Object.keys(i18n.messages).includes(locale)) {
    return import(/* webpackChunkName: 'lang-[request]' */`../translations/${locale}`)
      .then((localeMessages) => {
        // Add styleguide only translations
        if (process.env.NODE_ENV !== 'production') {
          const styleguideTranslations = require('./styleguide.translations'); // eslint-disable-line global-require

          if (styleguideTranslations[locale]) {
            Object.entries(styleguideTranslations[locale]).forEach(([key, value]) => {
              localeMessages[key] = value;
            });
          }
        }

        i18n.setLocaleMessage(locale, localeMessages);

        return locale;
      }); // eslint-disable-line vue/script-indent
  }

  return Promise.resolve(locale);
};

/**
 * Sets the application locale to the given value.
 * Loads locale messages if needed.
 *
 * @param   {String}    locale    A locale identifier
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
      i18n.setDateTimeFormat(locale, dateTimeFormats);
    });
  }

  return Promise.resolve(locale);
};

i18nSetLocale(pageLang);
