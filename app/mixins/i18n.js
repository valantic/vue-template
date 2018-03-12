import { I18N_LOCALES } from '@/setup/i18n';

export default {
  data() {
    return {
      /**
       * An array of supported locale identifiers
       */
      i18nLocales: I18N_LOCALES,
    };
  },
  methods: {
    /**
     * Load messages for given locale if not already loaded
     *
     * @param   {string}    locale    A locale identifier
     *
     * @returns {Promise}
     */
    i18nLoadMessages(locale) {
      const { $i18n } = window.vm;

      if (!Object.keys($i18n.messages).includes(locale)) {
        return import(/* webpackChunkName: 'lang-[request]' */ `../translations/${locale}`).then((localeMessages) => {
          $i18n.setLocaleMessage(locale, localeMessages);

          return locale;
        });
      }

      return Promise.resolve(locale);
    },

    /**
     * Sets the application locale to the given value
     * Loads locale messages if needed
     *
     * @param   {string}    locale    A locale identifier
     *
     * @returns {Promise}
     */
    i18nSetLocale(locale) { // eslint-disable-line no-param-reassign
      const { $i18n } = window.vm;

      if ($i18n.locale !== locale) {
        return this.i18nLoadMessages(locale).then((newLocale) => {
          $i18n.locale = newLocale;
        });
      }

      return Promise.resolve(locale);
    },
  },
};
