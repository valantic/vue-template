<!-- This component has no <template> because of dynamic root element -->

<script>
  export default {
    name: 'e-button',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the width of the button
       *
       * Valid values: `full`
       */
      width: {
        type: String,
        default: null,
        validator(value) {
          return [
            'full',
          ].includes(value);
        },
      },

      /**
       * Inverts the button style
       */
      inverted: {
        type: Boolean,
        default: false,
      },

      /**
       * Modifies the inner spacing for the button.
       *
       * Valid values: `0, 500`
       */
      spacing: {
        type: [String, Number],
        default: '500',
        validator(value) {
          return [
            0,
            500
          ].includes(parseInt(value, 10));
        }
      },

      /**
       * If `true` the button gets the negative style
       */
      negative: {
        type: Boolean,
        default: false,
      },

      /**
       * IF `true` the button shows a progress animation
       */
      progress: {
        type: Boolean,
        default: false,
      },

      hover: {
        type: Boolean,
        default: false,
      },

      focus: {
        type: Boolean,
        default: false,
      },

      active: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        hasHover: this.$props.hover,
        isActive: this.$props.active,
        hasFocus: this.$props.focus,
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      onMouseEnter() {
        this.hasHover = true;
      },
      onMouseLeave() {
        this.hasHover = false;
      },
      onMouseDown() {
        this.isActive = true;
      },
      onMouseUp() {
        this.isActive = false;
      },
      onFocus() {
        this.hasFocus = true;
      },
      onBlur() {
        this.hasFocus = false;
      },
    },

    /**
     * Creates a button or button like link based on defined/missing href link
     *
     * @param   {function}    createElement   Vue helper
     *
     * @returns {*}
     */
    render(createElement) {
      const {
        width,
        inverted,
        spacing,
        negative,
        progress,
        hover,
        focus,
        active,
        disabled,
      } = this.$props;
      const options = {
        class: this.b({
          width,
          inverted,
          spacing,
          negative,
          progress,
          hover: hover || this.hasHover,
          focus: focus || this.hasFocus,
          active: active || this.isActive,
          disabled,
        }),
        attrs: {
          ...this.$attrs,
          disabled,
        },
        on: {
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          focus: this.onFocus,
          blur: this.onBlur,
        },
      };
      const isButton = !this.$attrs.href;
      const element = isButton ? 'button' : 'a';

      if (!isButton && !options.attrs.role) {
        options.attrs.role = 'button';
      }

      return createElement(
        element,
        options,
        this.$slots.default, // TODO: How to handle progress state?
      );
    },
  };
</script>

<style lang="scss">
  .e-button {
    display: inline-block;
    background: $color-primary--3;
    border: 1px solid $color-primary--2;
    padding: $spacing--10;

    &:hover:not([disabled]),
    &--hover:not([disabled]) {
      border: 5px solid red;
    }

    &:focus,
    &--focus {
      border: 5px solid blue;
    }

    &:active,
    &--active {
      border: 5px solid green;
    }

    &[disabled],
    &--disabled {
      border-color: $color-grayscale--400;
      color: $color-grayscale--400;
    }

    &--width-full {
      display: block;
      width: 100%;
    }

    &--inverted {
      background: $color-primary--2;
      color: $color-primary--3;
    }

    &--progress {
      text-indent: -200vw;

      &::after {
        content: "...";
        display: block;
      }
    }
  }
</style>
