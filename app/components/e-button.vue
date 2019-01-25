<!-- This component has no <template> because of dynamic root element -->

<script>
  import touchDevice from '../mixins/touch-device';
  import eProgress from './e-progress';

  /**
   * Renders a `<button>` or `<a>` element (based on existing `href` attribute) with button style.
   * The component uses a `<slot>` to render the content.
   *
   * @link [You can also define inherited attributes for `<button>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/button#Attribute)
   * @link [You can also define inherited attributes for `<a>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/a#Attribute)
   */
  export default {
    name: 'e-button',
    // components: {},
    mixins: [
      touchDevice,
    ],

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
       * Modifies the inner spacing for the button.
       *
       * Valid values: `0, 500, 600, 700`
       */
      spacing: {
        type: [String, Number],
        default: 500,
        validator(value) {
          return [
            0,
            500,
            600,
            700,
          ].includes(parseInt(value, 10));
        },
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
        /**
         * @type {Boolean} Internal flag to determine hover state.
         */
        hasHover: this.$props.hover,

        /**
         * @type {Boolean} Internal flag to determine active state.
         */
        isActive: this.$props.active,

        /**
         * @type {Boolean} Internal flag to determine focus state.
         */
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

      /**
       * Mouseenter event handler.
       */
      onMouseEnter() {
        this.hasHover = true;
      },

      /**
       * Mouseleave event handler.
       */
      onMouseLeave() {
        this.hasHover = false;
        this.isActive = false;
      },

      /**
       * Mousedown event handler.
       */
      onMouseDown() {
        this.isActive = true;
      },

      /**
       * Mouseup event handler.
       */
      onMouseUp() {
        this.isActive = false;
      },

      /**
       * Focus event handler.
       */
      onFocus() {
        this.hasFocus = true;
      },

      /**
       * Blur event handler.
       */
      onBlur() {
        this.hasHover = false;
        this.hasFocus = false;
      },

      /**
       * Click event handler.
       *
       * @param {Event} event - The click event instance.
       */
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

      /**
       * Returns the current width and height of the button.
       *
       * @returns {Object}
       */
      getElementDimensions() {
        return {
          width: `${this.$el.offsetWidth}px`,
          height: `${this.$el.offsetHeight}px`,
        };
      },
    },

    /**
     * Creates a button or button like link based on defined/missing href link.
     *
     * @param   {Function}    createElement   Vue helper
     *
     * @returns {*}
     */
    render(createElement) {
      const {
        width,
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
          spacing,
          negative,
          progress,
          hover: hover || this.hasHover,
          focus: focus || this.hasFocus,
          active: active || this.isActive,
          touch: this.hasTouch,
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
          click: this.onClick,
        },
      };
      const isButton = !this.$attrs.href;
      const element = isButton ? 'button' : 'a';
      let content = this.$slots.default;

      if (progress) {
        if (this.$el) { // If already initially a 'progress' button, there will be no element at this point.
          options.style = this.width !== 'full' ? this.getElementDimensions() : null; // Defines width/height to keep button dimension.
        }

        content = [
          createElement( // e-progress
            eProgress,
            {
              props: {
                spacing: '0',
                negative: true,
              },
            },
          ),
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
              class: this.b('inner'),
            },
            content,
          ),
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
    border: 1px solid $color-grayscale--500;
    color: $color-grayscale--400;
    border-radius: $_e-button__radius;
    outline: none;
    min-width: 165px;
    text-align: center;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }

    &--focus,
    &:focus {
      color: $color-primary--3;
      background-color: $color-grayscale--500;
      outline: none;
      border: 1px solid $color-grayscale--500;
    }

    &:active:not([disabled]),
    &--active:not([disabled]) {
      color: $color-primary--3;
      background-color: $color-grayscale--400;
      position: relative;
    }

    &--hover:not(&--touch),
    &:hover:not(&--touch) {
      color: $color-primary--3;
      background-color: $color-grayscale--500;
    }

    &--focus path,
    &--hover:not(&--touch) path,
    &:focus path,
    &:hover:not(&--touch) path {
      fill: $color-primary--3;
    }

    &[disabled],
    &--disabled,
    &[disabled]:hover,
    &--disabled:hover {
      background-color: transparent;
      border-color: $color-grayscale--600;
      color: $color-grayscale--450;
      cursor: default;
      pointer-events: none;
    }

    &--width-full {
      display: block;
      width: 100%;
    }

    &--width-auto {
      min-width: 0;
    }

    &--negative {
      background: $color-primary--2;
      color: $color-primary--3;
    }

    &--spacing-0 {
      padding: 0;
    }

    &--spacing-600 {
      padding-left: $spacing--40;
      padding-right: $spacing--40;
    }

    &--spacing-700 {
      padding-left: $spacing--70;
      padding-right: $spacing--70;
    }

    &--progress,
    &--progress[disabled],
    &--progress[disabled]:hover,
    &--progress[disabled]:focus,
    &--progress:hover,
    &--progress:focus {
      background-color: $color-grayscale--400;
      overflow: hidden; // Prevents overflow of animation
    }

    &__inner {
      position: relative;
      display: inline-block;
      vertical-align: baseline;
    }

    .e-progress {
      margin-top: -2px; // Creates unified height for text/progress button
      margin-bottom: -1px;
    }
  }

  .e-button--primary {
    &:not([disabled]) {
      color: $color-secondary--2;

      &.e-button:focus,
      &.e-button--focus {
        color: $color-primary--3;
        background-color: $color-primary--1;
      }

      &.e-button:hover:not(.e-button--touch),
      &.e-button--hover:not(.e-button--touch) {
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
    }
  }
</style>
