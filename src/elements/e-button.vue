<template>
  <component
    :is="type"
    :class="b(modifiers)"
    :style="style"
    v-bind="attributes"
    @touchstart.passive="hasTouch = true"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @focus="onFocus"
    @blur="onBlur"
    @click="onClick"
  >
    <!-- span is required to prevent content shifting in E11. -->
    <span :class="b('inner')">
      <e-loading-indicator
        v-if="progress"
        :spacing="0"
      />
      <!-- @slot Button content. -->
      <slot v-else></slot>
    </span>
  </component>
</template>

<script lang="ts">
  import propScale from '@valantic/frontend-utils/src/helpers/prop-scale';
  import { defineComponent } from 'vue';
  import eLoadingIndicator from '@/elements/e-loading-indicator.vue';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';
  import eProgress from './e-progress.vue';

  type Attributes = {
    [key: string]: string | boolean | null | undefined;
    role: string | null;
    disabled: boolean | undefined;
  };

  type ElementDimensions = {
    width: string;
    height: string;
  };

  type Data = {
    hasHover: boolean;
    isActive: boolean;
    hasFocus: boolean;
    hasTouch: boolean;
  };

  export const BUTTON_WIDTH_VARIANTS = ['default', 'full', 'auto'];
  export const BUTTON_STYLE_VARIANTS = ['text', 'primary', 'secondary'];

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

    components: {
      eLoadingIndicator,
      eProgress,
    },

    props: {
      /**
       * Defines the width of the button
       */
      width: {
        type: String,
        default: 'default',
        validator: (value: string) => BUTTON_WIDTH_VARIANTS.includes(value),
      },

      /**
       * Define the variant of the button
       */
      variant: {
        type: String,
        default: 'text',
        validator: (value: string) => BUTTON_STYLE_VARIANTS.includes(value),
      },

      /**
       * Define the spacing of the button
       */
      spacing: propScale(500, [0, 100, 500]),

      /**
       * If `true` the button gets the inverted style
       */
      inverted: {
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

      /**
       * Overwrites the element of the button component.
       * This option to overwrite the default "anchor" or "button" tag should get only used for edge cases where
       * a button has to be inside another anchor tag or similar.
       */
      element: {
        type: String,
        default: null,
      },
    },

    emits: {
      click(payload: Event): boolean {
        return typeof payload === 'object';
      },
    },

    data(): Data {
      return {
        /**
         * Internal flag to determine hover state.
         */
        hasHover: this.hover,

        /**
         * Internal flag to determine active state.
         */
        isActive: this.active,

        /**
         * Internal flag to determine focus state.
         */
        hasFocus: this.focus,

        /**
         * Determines if the current device uses touch.
         */
        hasTouch: false,
      };
    },

    computed: {
      /**
       * Returns an Object of class modifiers.
       */
      modifiers(): Modifiers {
        return {
          variant: this.variant,
          width: this.width,
          inverted: this.inverted,
          progress: this.progress,
          disabled: this.disabled,
          hover: this.hover || this.hasHover,
          focus: this.focus || this.hasFocus,
          active: this.active || this.isActive,
          touch: this.hasTouch,
          spacing: this.spacing,
        };
      },

      /**
       * Returns an Object of attributes.
       */
      attributes(): Attributes {
        const attributes: Attributes = {
          role: this.$attrs.href ? null : 'button', // Fallback,
          ...this.$attrs,
          disabled: undefined,
        };

        if (this.disabled) {
          attributes.disabled = true;
        }

        return attributes;
      },

      /**
       * Returns inline styles to keep dimensions during progress state.
       */
      style(): ElementDimensions | null {
        return this.progress && this.width !== 'full' ? this.getElementDimensions() : null;
      },

      /**
       * Gets the type of the component (DOM element).
       */
      type(): string {
        return this.element || (this.$attrs.href ? 'a' : 'button');
      },
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
         */
        this.$emit('click', event);
      },

      /**
       * Returns the current width and height of the button.
       */
      getElementDimensions(): ElementDimensions | null {
        const element = this.$el;

        return element ? { width: `${element.offsetWidth}px`, height: `${element.offsetHeight}px` } : null;
      },
    },
  });
</script>

<style lang="scss">
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  /* stylelint-disable nesting-selector-no-missing-scoping-root */
  @mixin progressHover($background-color, $fragment-background-color) {
    &.e-button--progress,
    &.e-button--progress[disabled],
    &.e-button--progress[disabled]:hover,
    &.e-button--progress[disabled]:focus,
    &.e-button--progress:hover,
    &.e-button--progress:focus {
      background-color: $background-color;

      .e-loading-indicator__fragment {
        background-color: $fragment-background-color;
      }
    }
  }
  /* stylelint-enable nesting-selector-no-missing-scoping-root */

  .e-button {
    @include mixins.hover-effect--default();

    position: relative;
    display: inline-block;
    outline: none;
    cursor: pointer;
    color: var(--theme-color-primary--1);
    font-size: variables.$font-size--regular;
    text-align: center;

    &--focus,
    &:focus {
      outline: none;
    }

    &:active:not([disabled]),
    &--active:not([disabled]) {
      position: relative;
    }

    &--hover:not(&--touch),
    &:hover:not(&--touch) {
      text-decoration: underline;
    }

    &--focus path,
    &--hover:not(&--touch) path,
    &:focus path,
    &:hover:not(&--touch) path {
      fill: variables.$va-color-primary--3;
    }

    &[disabled],
    &--disabled,
    &[disabled]:hover,
    &--disabled:hover {
      opacity: 0.4;
      cursor: not-allowed;
      text-decoration: none;
    }

    &--width-full {
      display: block;
      width: 100%;
    }

    &--progress,
    &--progress[disabled],
    &--progress[disabled]:hover,
    &--progress[disabled]:focus,
    &--progress:hover,
    &--progress:focus {
      overflow: hidden; // Prevents overflow of animation
    }

    &__inner {
      position: relative;
    }

    .e-loading-indicator__fragment {
      background-color: var(--theme-color-grayscale--0);
    }
  }

  .e-button--inverted {
    color: var(--theme-color-grayscale--1000);

    .e-loading-indicator__fragment {
      background-color: var(--theme-color-grayscale--1000);
    }
  }

  .e-button--variant-primary,
  .e-button--variant-secondary {
    min-width: 15.625rem;
    border-radius: 6.25rem;

    .e-loading-indicator {
      justify-content: center;
      min-height: 1.5rem;
    }

    &.e-button--width-auto {
      min-width: unset;
    }

    &.e-button--spacing-0 {
      padding: 0;
    }

    &.e-button--spacing-100 {
      padding: 0.3rem 1rem;
    }

    &.e-button--spacing-500 {
      padding: 0.6rem 1.5rem;
    }

    &.e-button:focus,
    &.e-button--focus {
      opacity: 0.7;
    }

    &.e-button:hover,
    &.e-button:hover:not(.e-button--touch),
    &.e-button--hover:not(.e-button--touch) {
      text-decoration: none;
    }

    &.e-button[disabled],
    &.e-button--disabled,
    &.e-button[disabled]:hover,
    &.e-button--disabled:hover {
      opacity: 0.4;
      cursor: not-allowed;
      text-decoration: none;
    }
  }

  .e-button--variant-primary {
    @include progressHover(var(--theme-color-primary--1), var(--theme-color-grayscale--1000));

    background-color: var(--theme-color-primary--1);
    color: var(--theme-color-grayscale--1000);

    &.e-button--inverted {
      @include progressHover(var(--theme-color-grayscale--1000), var(--theme-color-primary--1));

      background-color: var(--theme-color-grayscale--1000);
      color: var(--theme-color-primary--1);
    }
  }

  .e-button--variant-secondary {
    @include progressHover(transparent, var(--theme-color-primary--1));

    border: 2px solid var(--theme-color-primary--1);
    color: var(--theme-color-primary--1);

    &.e-button--inverted {
      @include progressHover(transparent, var(--theme-color-grayscale--1000));

      border-color: var(--theme-color-grayscale--1000);
      color: var(--theme-color-grayscale--1000);
    }
  }
</style>
