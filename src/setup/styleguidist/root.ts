/* eslint-disable */
// TODO remove eslint-disable when styleguideist is working again
import { ComponentPublicInstance } from 'vue';

/**
 * Root component setup for styleguidist.
 */
export default (previewComponent: ComponentPublicInstance) => ({
  render(createElement: any) {
    return createElement(previewComponent);
  }
});
