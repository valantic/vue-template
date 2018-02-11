import VueI18n from 'vue-i18n';
import messages from '../../languages/en'; // Default language
import options from '../options';

const defaultLanguage = 'en'; // TODO: set based on environment
const availableLanguages = [defaultLanguage, 'de'];

export default {
  install(Vue /* , options */) {
    Vue.use(VueI18n);

    const VueI18nInstance = new VueI18n({
      locale: defaultLanguage,
      fallbackLocale: defaultLanguage,
      messages: {
        [defaultLanguage]: messages,
      },
    });

    options.i18n = VueI18nInstance;

    /**
     * Load messages for given locale if not already loaded
     *
     * @param   {string}    locale    A locale identifier
     *
     * @returns {Promise}
     */
    function loadMessages(locale) {
      if (!Object.keys(VueI18nInstance.messages).includes(locale)) {
        return import(`../../languages/${locale}`).then((localeMessages) => {
          VueI18nInstance.setLocaleMessage(locale, localeMessages);

          return locale;
        });
      }

      return Promise.resolve(locale);
    }

    /**
     * Returns an array of supported locale identifiers
     *
     * @returns {Array}
     */
    Vue.supportedLanguages = function supportedLanguages() { // eslint-disable-line no-param-reassign
      return availableLanguages;
    };

    /**
     * Sets the application locale to the given value
     * Loads locale messages if needed
     *
     * @param   {string}    locale    A locale identifier
     *
     * @returns {Promise}
     */
    Vue.setLocale = function setLocale(locale) { // eslint-disable-line no-param-reassign
      if (VueI18nInstance.locale !== locale) {
        return loadMessages(locale).then((newLocale) => {
          VueI18nInstance.locale = newLocale;
        });
      }

      return Promise.resolve(locale);
    };
  },
};
