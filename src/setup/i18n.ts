import { IntlDateTimeFormat, createI18n } from 'vue-i18n';
import fallbackMessages from '../translations/de.json';

type MessagesSchema = typeof fallbackMessages;

export const PAGE_LANG = document?.documentElement?.lang;

export const I18N_FALLBACK = 'de';
export const I18N_FALLBACK_MESSAGES = fallbackMessages;
export const I18N_LOCALES = [I18N_FALLBACK, 'fr'];

const datetimeFormats: IntlDateTimeFormat = {
  month: {
    // January, February, March, ...
    month: 'long',
  },
  weekday: {
    // Monday, Tuesday, Wednesday, ...
    weekday: 'long',
  },
};

// Add styleguide only translations
if (import.meta.env.MODE !== 'production') {
  const styleguideTranslations = import.meta.glob('./styleguide.translations.json', { eager: true })[
    './styleguide.translations.json'
  ] as Record<string, object>;

  if (styleguideTranslations[I18N_FALLBACK]) {
    Object.entries(styleguideTranslations[I18N_FALLBACK]).forEach(([key, value]) => {
      // @ts-ignore Needed because typescript cannot assign index.
      I18N_FALLBACK_MESSAGES[key] = value;
    });
  }
}

const i18n = createI18n<[MessagesSchema], 'de'>({
  legacy: true, // Inject translation methods
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  datetimeFormats: {
    [I18N_FALLBACK]: datetimeFormats,
    [PAGE_LANG]: datetimeFormats,
  },

  // eslint-disable-next-line unicorn/no-negated-condition
  warnHtmlInMessage: import.meta.env.MODE !== 'production' ? 'error' : 'off',

  /**
   * Callback for the 'missing' event, during translation lookup.
   */
  missing(locale, messageKey) {
    console.error(`No '${locale}' translations found for '${messageKey}'`); // eslint-disable-line no-console
  },
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
  numberFormats: {
    de: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
      },
      percent: {
        style: 'percent',
        useGrouping: false,
      },
    },
  },
});

export default i18n;

/**
 * Load messages for given locale if not already loaded.
 */
export const i18nLoadMessages = (locale: string): Promise<string> => {
  if (!Object.keys(i18n.global.messages).includes(locale)) {
    return import(`../translations/${locale}.json`).then(({ default: localeMessages }) => {
      // Add styleguide only translations
      if (import.meta.env.MODE !== 'production') {
        const styleguideTranslations = import.meta.glob('./styleguide.translations.json', { eager: true })[
          './styleguide.translations.json'
        ] as Record<string, object>;
        const localeStyleguideTranslations = styleguideTranslations[locale];

        if (localeStyleguideTranslations) {
          Object.entries(localeStyleguideTranslations).forEach(([key, value]) => {
            localeMessages[key] = value;
          });
        }
      }

      i18n.global.setLocaleMessage(locale, localeMessages);

      return locale;
    });
  }

  return Promise.resolve(locale);
};

/**
 * Sets the application locale to the given value.
 * Loads locale messages if needed.
 */
export const i18nSetLocale = (locale: string): Promise<void> => {
  if (!I18N_LOCALES.includes(locale)) {
    locale = I18N_FALLBACK;
  }

  if (i18n.global.locale !== locale) {
    return i18nLoadMessages(locale).then((newLocale) => {
      import('../stores/plugins/api').then((module) => {
        module.axiosInstance.defaults.headers.common.locale = newLocale;
      });
      // @ts-ignore -- 'locale' is a reactive, not a string. @see https://github.com/intlify/vue-i18n-next/issues/785
      i18n.global.locale.value = newLocale;
    });
  }

  return Promise.resolve();
};

i18nSetLocale(PAGE_LANG || I18N_FALLBACK);
