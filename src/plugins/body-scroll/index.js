import './styles.scss';

let oldScrollPosition = 0;
const block = 'no-scroll';

/**
 * This plugin extends the Vue prototype with a helper to modify the body scroll state.
 */
export default {
  install(Vue) {
    /**
     * Function set's a "no-scroll" modifier class to the body which provides body from scrolling.
     *
     * @param {Boolean} enableScroll - true => scroll enabled / false = scroll disabled
     * @param {String} [axis='x-y'] - Creates an axis modifier for the scroll class.
     * @param {Boolean} [isFixed=true] - Controls if 'position:fixed' shall be added.
     */
    Vue.prototype.$bodyScroll = function bodyScroll(enableScroll, axis = 'x-y', isFixed = true) {
      const { body } = document;
      const axisModifier = axis ? `--${axis}` : '';
      const positionModifier = isFixed ? '--position-fixed' : '';

      if (enableScroll) {
        body.classList.remove(block); // IE11 does not support multiple classes for remove().

        if (axisModifier) {
          body.classList.remove(block + axisModifier);
        }

        if (positionModifier) {
          body.classList.remove(block + positionModifier);
        }

        body.style.removeProperty('max-width');

        // Scroll to old position
        if (oldScrollPosition) {
          window.scrollTo(0, oldScrollPosition);
        }
      } else {
        oldScrollPosition = window.pageYOffset;

        body.classList.add(block); // IE11 does not support multiple classes for remove().

        if (axisModifier) {
          body.classList.add(block + axisModifier);
        }

        if (positionModifier) {
          body.classList.add(block + positionModifier);
        }
      }
    };
  }
};
