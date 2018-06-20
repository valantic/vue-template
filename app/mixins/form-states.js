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
     * Form states for class names (default, error, success, warning, info)
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
    },

    /**
     * Adds checked state
     */
    checked: {
      type: Boolean,
      default: false,
    },
  },

  /**
   * Default data for the mixin props (will be merged with the components data function).
   *
   * @returns {{isActive: *, isDisabled: *, hasFocus: *, isHover: (hover|{type, default}|*), isChecked: *}}
   */
  data() {
    return {
      isActive: this.active,
      isDisabled: this.disabled,
      hasFocus: this.focus,
      isHover: this.hover,
      isChecked: this.checked,
    };
  },

  computed: {

    /**
     * Defines the default Modifier classes, have to be merged with custom classes or include directly in component.
     *
     * @returns {{state: *, active: *, disabled: *, focus: *, hover: *, checked: *}}
     */
    stateModifiers() {
      return {
        state: this.state,
        active: this.isActive,
        disabled: this.isDisabled,
        focus: this.hasFocus,
        hover: this.isHover,
        checked: this.isChecked,
      };
    },

    /**
     * Checks if the component is in default state.
     *
     * @returns {Boolean}
     */
    hasDefaultState() {
      return this.state === 'default';
    },
  }
};
