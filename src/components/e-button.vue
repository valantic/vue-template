<template>
  <component :is="type"
             :class="b(modifiers)"
             :style="style"
             v-bind="attributes"
             @touchstart="hasTouch = true"
             @mouseenter="onMouseEnter"
             @mouseleave="onMouseLeave"
             @mousedown="onMouseDown"
             @mouseup="onMouseUp"
             @focus="onFocus"
             @blur="onBlur"
             @click="onClick"
  >
    <!-- span is required to prevent content shifting in IE11. -->
    <span :class="b('inner')">
      <e-progress v-if="progress"
                  :spacing="0"
                  negative
      />
      <!-- @slot Button content. -->
      <slot v-else></slot>
    </span>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import propScale from '@/helpers/prop.scale';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';
  import eProgress from './e-progress.vue';

  interface IAttributes {
    role: string | null;
    disabled: boolean;
    [key: string]: string | boolean | null;
  }

  interface IElementDimensions {
    width: string;
    height: string;
  }

  /**
   * Renders a `<button>` or `<a>` element (based on existing `href` attribute) with button style.
   * The component uses a `<slot>` to render the content.
   *
   * [You can also define inherited attributes for `<button>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/button#Attribute)
   *
   * [You can also define inherited attributes for `<a>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/a#Attribute)
   */
  export default defineComponent({
    name: 'e-button',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eProgress
    },

    props: {
      /**
       * Defines the width of the button
       *
       * Valid values: `[full, auto]`
       */
      width: {
        type: String,
        default: null,
        validator: (value: string) => [
          'full',
          'auto',
        ].includes(value),
      },

      /**
       * Modifies the inner spacing for the button.
       *
       * Valid values: `[0, 500]`
       */
      spacing: propScale(500, [
        0,
        500,
      ]),

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
        hasHover: this.hover,

        /**
         * @type {Boolean} Internal flag to determine active state.
         */
        isActive: this.active,

        /**
         * @type {Boolean} Internal flag to determine focus state.
         */
        hasFocus: this.focus,

        /**
         * Sets the element type for the component.
         */
        type: this.$attrs.href ? 'a' : 'button',

        /**
         * Determines if the current device uses touch.
         */
        hasTouch: false,
      };
    },

    computed: {
      /**
       * Returns an Object of class modifiers.
       *
       * @returns {Object}
       */
      modifiers(): IModifiers {
        return {
          width: this.width,
          spacing: this.spacing,
          negative: this.negative,
          progress: this.progress,
          disabled: this.disabled,
          primary: this.primary,
          hover: this.hover || this.hasHover,
          focus: this.focus || this.hasFocus,
          active: this.active || this.isActive,
          touch: this.hasTouch,
        };
      },

      /**
       * Returns an Object of attributes.
       *
       * @returns {Object}
       */
      attributes(): IAttributes {
        return {
          role: this.$attrs.href ? 'button' : null, // Fallback
          ...this.$attrs,
          disabled: this.disabled || this.progress,
        };
      },

      /**
       * Returns inline styles to keep dimensions during progress state.
       *
       * @returns {Object}
       */
      style(): IElementDimensions | null {
        return this.progress && this.width !== 'full'
          ? this.getElementDimensions()
          : null;
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

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
       */
      onClick(event: Event): void {
        this.$el.blur();

        /**
         * Click event
         *
         * @event click
         *
         * @property {Event} event - The original DOM event.
         */
        this.$emit('click', event);
      },

      /**
       * Returns the current width and height of the button.
       *
       * @returns {Object}
       */
      getElementDimensions(): IElementDimensions | null {
        const element = this.$el;

        return element
          ? { width: `${element.offsetWidth}px`, height: `${element.offsetHeight}px` }
          : null;
      },
    },
  });
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
      color: $color-grayscale--300;
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
