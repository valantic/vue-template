<template>
  <div :class="b(panelModifiers)">
    <div :class="b('heading', headingModifiers)">
      <e-heading v-if="heading" tag-name="h2" underline>
        {{ heading }}
      </e-heading>
    </div>
    <div :class="b('content', contentModifiers)">
      <slot></slot>
    </div>
    <div
      v-if="triangleButton"
      :class="b('triangle-button', triangleButtonModifiers)"
      @click="onTriangleButtonClick"
      @mouseover="onPlusToggle"
      @mouseout="onPlusToggle">
      <div ref="shadow" :class="b('shadow', shadowModifiers)"></div>
      <span ref="plus" :class="b('plus', plusModifiers)"></span>
    </div>
  </div>
</template>

<script>
  import propScale from '@/helpers/prop.scale';
  import touchDevice from '../mixins/touch-device';

  export default {
    name: 'c-panel',
    // status: 1,

    // components: {},
    mixins: [
      touchDevice,
    ],

    props: {
      /**
       * Defines the spacing of the heading
       *
       * Valid values: `[0, 500]`
       */
      headingSpacing: propScale(0, [
        0,
        500
      ]),

      /**
       * Defines the spacing of the content
       *
       * Valid values: `[0, 500]`
       */
      contentSpacing: propScale(500, [
        0,
        500
      ]),

      /**
       * Defines the heading of the panel
       *
       */
      heading: {
        type: String,
        default: null,
      },

      /**
       * Defines the border of the panel
       *
       * Valid values: `[0, 1, 2]`
       */
      border: propScale(0, [
        0,
        1,
        2
      ]),

      /**
       * Defines the border color of the panel
       *
       * Valid values: `[yellow, blue, gray]`
       */
      color: {
        type: String,
        default: 'blue',
        validator(value) {
          return [
            'yellow',
            'blue',
            'gray'
          ].includes(value);
        },
      },

      /**
       * Defines if the triangle shaped button shall be displayed or not
       */
      triangleButton: {
        type: Boolean,
        default: false
      },

      /**
       * Defines if the triangle shaped button is initially open or not
       */
      triangleButtonOpen: {
        type: Boolean,
        default: false
      },

      /**
       * Defines the size of the triangle button
       *
       * Valid values: `[0, 500]`
       */
      triangleButtonSize: propScale(0, [
        0,
        500
      ]),

      /**
       * Defines the plus color of the plus for the triangle button
       *
       * Valid values: `[white, blue]`
       */
      triangleButtonPlusColor: {
        type: String,
        default: 'white',
        validator(value) {
          return [
            'white',
            'blue'
          ].includes(value);
        },
      },

    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns an Object of modifiers.
       *
       * @returns {Object}
       */
      panelModifiers() {
        return {
          border: this.border,
          color: this.color,
        };
      },

      /**
       * Returns an Object of heading modifiers.
       *
       * @returns {Object}
       */
      headingModifiers() {
        return {
          spacing: this.headingSpacing,
        };
      },

      /**
       * Returns an Object of content modifiers.
       *
       * @returns {Object}
       */
      contentModifiers() {
        return {
          spacing: this.contentSpacing,
        };
      },

      /**
       * Returns an Object of button modifiers.
       *
       * @returns {Object}
       */
      triangleButtonModifiers() {
        return {
          size: this.triangleButtonSize,
        };
      },

      /**
       * Returns an Object of shadow modifiers.
       *
       * @returns {Object}
       */
      shadowModifiers() {
        return {
          color: this.color,
        };
      },

      /**
       * Returns an Object of plus button modifiers.
       *
       * @returns {Object}
       */
      plusModifiers() {
        return {
          size: this.triangleButtonSize,
          color: this.triangleButtonPlusColor,
          open: this.triangleButtonOpen,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() { },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Event handler for plus toggle.
       */
      onPlusToggle() {
        if (!this.hasTouch) { // onPlusToggle() gets triggered on touch devices as well, which is not what we want.
          this.$refs.plus.classList.toggle('c-panel__plus--hover');
          this.$refs.shadow.classList.toggle('c-panel__shadow--hover');
        }
      },

      /**
       * Event handler for triangle button click.
       *
       * @param {Event} event - The related DOM event.
       */
      onTriangleButtonClick(event) {
        /**
         * Click event.
         *
         * @event click
         * @type {object}
         */
        this.$emit('click', event);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">

  $_shadow-blur-radius: 5px;

  .c-panel {
    position: relative;
    background-color: $color-grayscale--1000;

    &--border-1 {
      border-bottom: 1px solid;
    }

    &--border-2 {
      border-bottom: 2px solid;
    }

    &--color-yellow {
      border-color: $color-primary--1;
    }

    &--color-blue {
      border-color: $color-secondary--1;
    }

    &--color-gray {
      border-color: $color-grayscale--600;
    }

    &__heading--spacing-0,
    &__content--spacing-0 {
      padding: $spacing--0;
    }

    &__heading--spacing-500,
    &__content--spacing-500 {
      padding: $spacing--10;
    }

    &__triangle-button {
      position: absolute;
      bottom: 0;
      right: 0;
      border: none;
      cursor: pointer;
      overflow: hidden;
    }

    &__triangle-button--size-0 {
      width: 29px;
      height: 29px;
    }

    &__triangle-button--size-500 {
      width: $spacing--40;
      height: $spacing--40;
    }

    &__shadow {
      position: absolute;
      width: $spacing--100;
      height: $spacing--100;
      top: 7px;
      right: -70px;
      transform: rotate(135deg);
      box-shadow: inset 0 0 $_shadow-blur-radius $color-grayscale--200;
      box-shadow: inset 0 0 $_shadow-blur-radius $color-grayscale--200, 0 0 0 $color-grayscale--200;
      transition: box-shadow $transition-duration-300;
    }

    &__shadow--color-yellow {
      background-color: $color-primary--1;
    }

    &__shadow--color-blue {
      background-color: $color-secondary--1;
    }

    &__shadow--color-gray {
      background-color: $color-grayscale--600;
    }

    &__shadow--hover {
      box-shadow: inset 0 0 0 $color-grayscale--200, 0 0 $_shadow-blur-radius $color-grayscale--200;
    }

    &__plus {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      transform-origin: 50% 50%;
      transform: rotate(0deg);
      transition: $transition-duration-300 ease-out;
    }

    &__plus--size-0 {
      width: 13px;
      height: 13px;
    }

    &__plus--size-500 {
      width: $spacing--20;
      height: $spacing--20;
    }

    &__plus--open {
      transform: rotate(135deg);
    }

    &__plus::before {
      content: "";
      position: absolute;
      display: block;
      background-color: $color-grayscale--1000;
      transition: $transition-duration-300 ease-out;
    }

    &__plus::after {
      content: "";
      position: absolute;
      display: block;
      background-color: $color-grayscale--1000;
      transition: $transition-duration-300 ease-out;
    }

    &__plus--size-0::before {
      right: 2px;
      bottom: 6px;
      width: 9px;
      height: 1px;
    }

    &__plus--size-0::after {
      right: 6px;
      bottom: 2px;
      width: 1px;
      height: 9px;
    }

    &__plus--size-500::before {
      right: 3px;
      bottom: 9px;
      width: 13px;
      height: 1px;
    }

    &__plus--size-500::after {
      right: 9px;
      bottom: 3px;
      width: 1px;
      height: 13px;
    }

    &__plus--color-white::before,
    &__plus--color-white::after {
      background-color: $color-grayscale--1000;
    }

    &__plus--color-blue::before,
    &__plus--color-blue::after {
      background-color: $color-secondary--2;
    }

    &__plus--hover::before {
      background-color: $color-secondary--2;
    }

    &__plus--hover::after {
      background-color: $color-secondary--2;
    }
  }

</style>
