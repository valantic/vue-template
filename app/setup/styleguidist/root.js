import { i18n } from '@/setup/i18n';

/**
 * Root component setup for styleguidist
 *
 * @param   {object}    previewComponent    The to be displayed component
 *
 * @returns {object}
 */
export default previewComponent => ({
  i18n,
  render(createElement) {
    // v-app to support vuetify plugin
    return createElement(previewComponent);
  }
});
