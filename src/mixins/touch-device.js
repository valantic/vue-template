/**
 * Mixin can be used to add the "hasTouch" identifier.
 *
 * @mixin
 */
export default {
  /**
   * Default data for the mixin props (will be merged with the components data function).
   *
   * @returns {{isActive: *, hasFocus: *, hasHover: (hover|{type, default}|*)}}
   */
  data() {
    return {
      /**
       * @type {Boolean} Defines if the user is on a touch device.
       */
      hasTouch: 'ontouchstart' in document.documentElement
        || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    };
  },
};
