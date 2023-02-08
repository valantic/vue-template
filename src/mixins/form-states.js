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
          'default',
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
   * @returns {{isActive: *, hasFocus: *, hasHover: (hover|{type, default}|*)}}
   */
  data() {
    return {
      mixinIsActive: this.active,
      mixinHasFocus: this.focus,
      mixinHasHover: this.hover,
    };
  },

  computed: {
    /**
     * Sets the mixinIsChecked state for the stateModifiers.
     *
     * @returns {Boolean}
     */
    mixinIsChecked: {
      get() {
        return Array.isArray(this.checked) ? this.checked.includes(this.value) : this.checked;
      },
      set(value) {
        return value;
      }
    },

    /**
     * Defines the default Modifier classes, have to be merged with custom classes or include directly in component.
     *
     * @returns {{state: *, active: *, disabled: *, focus: *, hover: *, checked: *}}
     */
    mixinStateModifiers() {
      return {
        state: this.state,
        active: this.isActive,
        disabled: this.disabled,
        focus: this.hasFocus,
        hover: this.hasHover,
        checked: this.isChecked,
      };
    },

    /**
     * Checks if the component is in default state.
     *
     * @returns {Boolean}
     */
    mixinHasDefaultState() {
      return this.state === 'default';
    },

    /**
     * Checks the current state and delivers the correct state icon, which can be used for e.g. in input fields.
     *
     * @returns {String}
     */
    mixinStateIcon() {
      switch (this.state) {
        case 'error':
          return 'i-error';

        case 'success':
          return 'i-check';

        case 'info':
          return 'i-info';

        default:
          return '';
      }
    }
  }
};
