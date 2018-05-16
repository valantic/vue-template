import VueI18n from 'vue-i18n';
import { I18N_FALLBACK, I18N_FALLBACK_MESSAGES } from './i18n';

const i18n = new VueI18n({
  locale: I18N_FALLBACK,
  fallbackLocale: I18N_FALLBACK,
  messages: {
    [I18N_FALLBACK]: I18N_FALLBACK_MESSAGES,
  },
});

export default previewComponent => ({
  i18n,
  components: {
    sApp: {
      template: '<div class="s-app"><slot></slot></div>'
    }
  },
  render(createElement) {
    // v-app to support vuetify plugin
    return createElement(
      's-app',
      [createElement(previewComponent)]
    );
  }
});

