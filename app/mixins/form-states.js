/**
 * Mixin can be used to add default form states to a form-element.
 * For modifiers class names combine the component modifier() computed function with the stateModifier()
 * computed function
 *
 * @mixin
 */
export default {
  props: {
    /**
     * form states for class names (default, error, success, warning, info)
     */
    state: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'error',
          'success',
          'warning',
          'info',
          'default'
        ].includes(value);
      }
    },

    /**
     * Forces active state
     */
    active: {
      type: Boolean,
      default: false
    },

    /**
     * Forces disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Forces focus state
     */
    focus: {
      type: Boolean,
      default: false
    },

    /**
     * Adds hover state
     */
    hover: {
      type: Boolean,
      default: false,
    }
  },

  /**
   * Default data for the mixin props (will be merged with the components data function)
   *
   * @returns {{isActive: *, isDisabled: *, hasFocus: *, isHover: (hover|{type, default}|*)}}
   */
  data() {
    return {
      isActive: this.active,
      isDisabled: this.disabled,
      hasFocus: this.focus,
      isHover: this.hover
    };
  },

  computed: {

    /**
     * Defines the default Modifier classes, have to be merged with custom classes or include directly in component
     *
     * @returns {{state: *, active: *, disabled: *, focus: *, hover: *}}
     */
    stateModifiers() {
      return {
        state: this.state,
        active: this.isActive,
        disabled: this.isDisabled,
        focus: this.hasFocus,
        hover: this.isHover
      };
    }
  }
};
