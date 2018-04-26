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
     * set's active state
     */
    active: {
      type: Boolean,
      default: false
    },

    /**
     * set's disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * set's focus state
     */
    focus: {
      type: Boolean,
      default: false
    }
  },
  computed: {

    /**
     * Defines the default Modifier classes, have to be merged with custom classes or include directly in component
     *
     * @returns {{state: *, active: *, disabled: *, focus: *}}
     */
    defaultModifiers() {
      return {
        state: this.state,
        active: this.active,
        disabled: this.disabled,
        focus: this.hasFocus
      };
    }
  }
};
