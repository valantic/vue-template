import { Plugin } from 'vue';
import { RESIZE_DEBOUNCE } from '@/setup/globals';

/**
 * Defines a custom 'resizeend' event which debounces the native
 * resize event by a given value.
 *
 * e.g. window.addEventListener('resizeend', (event) => {});
 */
const plugin: Plugin = {
  install(/* app */) {
    const event = document.createEvent('CustomEvent');
    let debounce: ReturnType<typeof setTimeout>;

    event.initCustomEvent('resizeend', true, true, {});

    window.addEventListener('resize', () => {
      clearTimeout(debounce);

      debounce = setTimeout(() => {
        window.dispatchEvent(event);
      }, RESIZE_DEBOUNCE);
    });
  },
};

export default plugin;
