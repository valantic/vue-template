import { i18n } from '@/setup/i18n';
import store from '@/store/index';

/**
 * Root component setup for styleguidist.
 *
 * @param   {Object}    previewComponent    The to be displayed component
 *
 * @returns {Object}
 */
// @ts-ignore
export default previewComponent => ({
  i18n,
  store,
  // @ts-ignore
  render(createElement) {
    return createElement(previewComponent);
  }
});
