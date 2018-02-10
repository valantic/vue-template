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

    function loadMessages(locale) {
      if (!Object.keys(VueI18nInstance.messages).includes(locale)) {
        return import(`../../languages/${locale}`).then((localeMessages) => {
          VueI18nInstance.setLocaleMessage(locale, localeMessages);

          return locale;
        });
      }

      return Promise.resolve(locale);
    }

    // eslint-disable-next-line no-param-reassign
    Vue.supportedLanguages = function supportedLanguages() {
      return availableLanguages;
    };

    // eslint-disable-next-line no-param-reassign
    Vue.setLocale = function setLocale(locale) {
      if (VueI18nInstance.locale !== locale) {
        return loadMessages(locale).then((newLocale) => {
          VueI18nInstance.locale = newLocale;
        });
      }

      return Promise.resolve(locale);
    };
  },
};
