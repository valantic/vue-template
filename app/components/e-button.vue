<!-- This component has no <template> because of dynamic root element -->

<script>
  import eProgress from './e-progress';

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
            'auto',
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
        default: 0,
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
       * If `true` the button shows a progress animation
       */
      progress: {
        type: Boolean,
        default: false,
      },

      /**
       * A flag to toggle between primary and secondary styling
       */
      primary: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the hover state
       */
      hover: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the focus state
       */
      focus: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the active state
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the button
       */
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
        this.isActive = false;
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
      onClick(event) {
        this.$el.blur();

        /**
         * Click event
         *
         * @event click
         *
         * @type {object}
         */
        this.$emit('click', event);
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
        primary,
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
          primary,
        }),
        attrs: {
          ...this.$attrs,
          disabled: progress || disabled,
        },
        on: {
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          focus: this.onFocus,
          blur: this.onBlur,
          click: this.onClick
        },
      };
      const isButton = !this.$attrs.href;
      const element = isButton ? 'button' : 'a';
      let content = this.$slots.default;

      if (progress) {
        content = [
          createElement( // e-progress
            eProgress,
            {
              props: {
                spacing: '0',
                negative: true
              }
            }
          )
        ];
      }

      if (!isButton && !options.attrs.role) {
        options.attrs.role = 'button';
      }

      return createElement(
        element,
        options,
        [
          createElement( // Wrapper is needed to prevent content shifting in IE11
            'span',
            {
              class: this.b('inner')
            },
            content,
          )
        ],
      );
    },
  };
</script>

<style lang="scss">
  $_e-button__radius: 3px;

  .e-button {
    @include font(14, 18, $font-weight--semi-bold);

    position: relative;
    display: inline-block;
    background: transparent;
    padding: 6px $spacing--10;
    border: 0;
    color: $color-grayscale--400;
    border-radius: $_e-button__radius;
    outline: none;
    min-width: 165px;
    text-align: center;
    cursor: pointer;

    &::before, // TODO: create mixin
    &::after {
      position: absolute;
      display: block;
      content: "";
      top: 0;
      right: 0;
      left: 0;
      border: 1px solid $color-grayscale--500;
      border-radius: $_e-button__radius;
      height: 20%;
    }

    &::before {
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &::after {
      top: auto;
      bottom: 0;
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &:focus,
    &--focus {
      color: $color-primary--3;
      background-color: $color-grayscale--500;
      outline: none;
      border: 0; // Overwrite link style

      &::before,
      &::after {
        display: none;
      }
    }

    &:hover,
    &--hover {
      color: $color-primary--3;
      background-color: $color-grayscale--500;
      border-bottom: 0; // Overwrite link styles

      &:not([disabled])::before,
      &:not([disabled])::after {
        display: none;
      }
    }

    &:active:not([disabled]),
    &--active:not([disabled]) {
      color: $color-primary--3;
      background-color: $color-grayscale--400;
      position: relative;

      &::before,
      &::after {
        display: none;
      }
    }

    &[disabled],
    &--disabled,
    &[disabled]:hover,
    &--disabled:hover {
      background-color: transparent;
      border-color: $color-grayscale--600;
      color: $color-grayscale--500;
      cursor: default;
    }

    &--width-full {
      display: block;
      width: 100%;
    }

    &--width-auto {
      min-width: 0;
    }

    &--inverted {
      background: $color-primary--2;
      color: $color-primary--3;

      &::before,
      &::after {
        display: none;
      }
    }

    &--spacing-0 {
      padding: 0;
    }

    &--progress,
    &--progress[disabled],
    &--progress[disabled]:hover,
    &--progress[disabled]:focus,
    &--progress:hover,
    &--progress:focus {
      background-color: $color-grayscale--400; // TODO: double check with Christoph what the correct value should be

      &::before,
      &::after {
        display: none;
      }
    }

    &__inner {
      position: relative;
      display: inline-block;
      vertical-align: bottom;
    }

    .e-progress {
      margin-top: -2px; // Creates unified height for text/progress button
      margin-bottom: -1px;
    }
  }

  .e-button--primary {
    &:not([disabled]) {
      color: $color-secondary--2;

      &::before,
      &::after {
        border-width: 2px;
        border-color: $color-primary--1;
      }

      &.e-button:focus,
      &.e-button--focus {
        color: $color-primary--3;
        background-color: $color-primary--1;
      }

      &.e-button:hover:not([disabled]),
      &.e-button--hover:not([disabled]) {
        color: $color-primary--3;
        background-color: $color-primary--1;
      }

      &.e-button:active:not([disabled]),
      &.e-button--active:not([disabled]) {
        color: $color-primary--3;
        background-color: $color-secondary--2;
      }
    }

    &.e-button--progress,
    &.e-button--progress[disabled],
    &.e-button--progress[disabled]:hover,
    &.e-button--progress[disabled]:focus,
    &.e-button--progress:hover,
    &.e-button--progress:focus {
      background-color: $color-secondary--2;

      &::before,
      &::after {
        display: none;
      }
    }
  }
</style>
