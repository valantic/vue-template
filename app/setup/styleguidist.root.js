import { i18n } from './i18n';

export default previewComponent => ({
  i18n,
  components: {
    sApp: {
      template: '<div class="s-app"><slot></slot></div>'
    }
  },
  render(createElement) {
    // v-app to support vuetify plugin
    return createElement(previewComponent);
  }
});

