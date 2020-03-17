import Vuetify from 'vuetify/lib';
import { i18n } from '@/setup/i18n';
import store from '@/store/index';

/**
 * Root component setup for styleguidist.
 *
 * @param   {Object}    previewComponent    The to be displayed component
 *
 * @returns {Object}
 */
export default previewComponent => ({
  i18n,
  vuetify: new Vuetify(), // TODO: only enable if required by project.
  store,
  render(createElement) {
    return createElement(previewComponent);
  }
});
