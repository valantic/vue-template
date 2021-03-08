import { RESIZE_DEBOUNCE } from '../setup/globals';

/**
 * Defines a custom 'resizeend' event which debounces the native
 * resize event by a given value.
 *
 * e.g. window.addEventListener('resizeend', (event) => {});
 */
export default {
  install(/* app */) {
    const event = document.createEvent('CustomEvent');
    let debounce;

    event.initCustomEvent('resizeend', true, true, {});

    window.addEventListener('resize', () => {
      clearTimeout(debounce);

      debounce = setTimeout(() => {
        window.dispatchEvent(event);
      }, RESIZE_DEBOUNCE);
    });
  },
};
