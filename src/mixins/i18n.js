import { I18N_LOCALES, i18nLoadMessages, i18nSetLocale } from '@/setup/i18n';

export default {
  data() {
    return {
      /**
       * An array of supported locale identifiers
       */
      mixinI18nLocales: I18N_LOCALES,
    };
  },
  methods: {
    i18nLoadMessages,
    i18nSetLocale,
  },
};
