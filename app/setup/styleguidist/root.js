import { i18n } from '@/setup/i18n';

/**
 * Root component setup for styleguidist.
 *
 * @param   {Object}    previewComponent    The to be displayed component
 *
 * @returns {Object}
 */
export default previewComponent => ({
  i18n,
  render(createElement) {
    // v-app to support vuetify plugin
    return createElement(previewComponent);
  }
});
