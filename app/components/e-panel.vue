<template>
  <div :class="b({ contour: contour, color: color })">
    <!-- TODO replace with e-headline -->
    <!-- eslint-disable max-len -->
    <div v-if="hasHeadline" :class="b('headline', { 'spacing-top': headlineSpacingTop, 'spacing-right': headlineSpacingRight, 'spacing-bottom': headlineSpacingBottom, 'spacing-left': headlineSpacingLeft })">
      <span :class="b('headline-underline')">{{ headline }}</span>
    </div>
    <!-- eslint-disable max-len -->
    <div :class="b('content', { 'spacing-top': contentSpacingTop, 'spacing-right': contentSpacingRight, 'spacing-bottom': contentSpacingBottom, 'spacing-left': contentSpacingLeft })">
      foo<br>bar<br>
      foo<br>bar<br>
    </div>
    <div
      v-if="triangleButton"
      :class="b('triangle-button', { size: triangleButtonSize, contour: contour, color: color })"
      @click="$emit('triangle-pressed')"
      @mouseover="mouseOver"
      @mouseout="mouseOut">
      <span :class="b('plus', { size: triangleButtonSize, 'plus-color': triangleButtonPlusColor })"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'e-panel',
    // components: {},
    // mixins: [],

    props: {

      /**
       * Defines the top spacing of the content
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      contentSpacingTop: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the right spacing of the content
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      contentSpacingRight: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the bottom spacing of the content
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      contentSpacingBottom: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the left spacing of the content
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      contentSpacingLeft: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the top spacing of the headline
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      headlineSpacingTop: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the right spacing of the headline
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      headlineSpacingRight: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the bottom spacing of the headline
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      headlineSpacingBottom: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the left spacing of the headline
       *
       * Valid values: `000`, `100`, `200`, `300`, `400`
       */
      headlineSpacingLeft: {
        type: String,
        default: '100',
        validator(value) {
          return ['000', '100', '200', '300', '400'].includes(value);
        },
      },

      /**
       * Defines the headline of the panel
       *
       */
      headline: {
        type: String,
        default: null,
      },

      /**
       * Defines the contour of the panel
       *
       * Valid values: `thin`, `thick`
       */
      contour: {
        type: String,
        default: 'thin',
        validator(value) {
          return [
            'thin',
            'thick'
          ].includes(value);
        },
      },

      /**
       * Defines the contour color of the panel
       *
       * Valid values: `yellow`, `blue`
       */
      color: {
        type: String,
        default: 'yellow',
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
       * Defines the size of the triangle button
       *
       * Valid values: `small`, `big`
       */
      triangleButtonSize: {
        type: String,
        default: 'small',
        validator(value) {
          return [
            'small',
            'big'
          ].includes(value);
        },
      },

      /**
       * Defines the plus color of the plus for the triangle button
       *
       * Valid values: `white`, `blue`
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
      hasHeadline() {
        return this.headline !== null && this.headline !== '';
      }
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
      mouseOver(event) {
        const plus = event.target.classList.contains('e-panel__plus') ? event.target : event.target.firstChild;
        const button = plus.parentNode;

        plus.classList.add('e-panel__plus--hover');
        button.classList.add('e-panel__triangle-button--hover');
      },
      mouseOut(event) {
        const plus = event.target.classList.contains('e-panel__plus') ? event.target : event.target.firstChild;
        const button = plus.parentNode;

        plus.classList.remove('e-panel__plus--hover');
        button.classList.remove('e-panel__triangle-button--hover');
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-panel {
    position: relative;
    overflow: hidden;
    background-color: $color-grayscale--1000;

    &--contour-thin {
      border-bottom: 1px solid;
    }

    &--contour-thick {
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

    &__headline {
      padding: $spacing--10;
    }

    &__headline-underline {
      /* TODO - should we define line-height variables? */
      @include font($font-size: $font-size--18, $line-height: 23px);

      display: inline-block;
      color: $color-secondary--1;
      border-bottom: 1px solid $color-primary--1;
      padding-bottom: $spacing--5;
    }

    &__content {
      padding: $spacing--10;
    }

    &__headline--spacing-top-000,
    &__content--spacing-top-000 {
      padding-top: $spacing--0;
    }

    &__headline--spacing-top-100,
    &__content--spacing-top-100 {
      padding-top: $spacing--10;
    }

    &__headline--spacing-top-200,
    &__content--spacing-top-200 {
      padding-top: $spacing--15;
    }

    &__headline--spacing-top-300,
    &__content--spacing-top-300 {
      padding-top: $spacing--20;
    }

    &__headline--spacing-top-400,
    &__content--spacing-top-400 {
      padding-top: $spacing--30;
    }

    &__headline--spacing-right-000,
    &__content--spacing-right-000 {
      padding-right: $spacing--0;
    }

    &__headline--spacing-right-100,
    &__content--spacing-right-100 {
      padding-right: $spacing--10;
    }

    &__headline--spacing-right-200,
    &__content--spacing-right-200 {
      padding-right: $spacing--15;
    }

    &__headline--spacing-right-300,
    &__content--spacing-right-300 {
      padding-right: $spacing--20;
    }

    &__headline--spacing-right-400,
    &__content--spacing-right-400 {
      padding-right: $spacing--30;
    }

    &__headline--spacing-bottom-000,
    &__content--spacing-bottom-000 {
      padding-bottom: $spacing--0;
    }

    &__headline--spacing-bottom-100,
    &__content--spacing-bottom-100 {
      padding-bottom: $spacing--10;
    }

    &__headline--spacing-bottom-200,
    &__content--spacing-bottom-200 {
      padding-bottom: $spacing--15;
    }

    &__headline--spacing-bottom-300,
    &__content--spacing-bottom-300 {
      padding-bottom: $spacing--20;
    }

    &__headline--spacing-bottom-400,
    &__content--spacing-bottom-400 {
      padding-bottom: $spacing--30;
    }

    &__headline--spacing-left-000,
    &__content--spacing-left-000 {
      padding-left: $spacing--0;
    }

    &__headline--spacing-left-100,
    &__content--spacing-left-100 {
      padding-left: $spacing--10;
    }

    &__headline--spacing-left-200,
    &__content--spacing-left-200 {
      padding-left: $spacing--15;
    }

    &__headline--spacing-left-300,
    &__content--spacing-left-300 {
      padding-left: $spacing--20;
    }

    &__headline--spacing-left-400,
    &__content--spacing-left-400 {
      padding-left: $spacing--30;
    }

    &__triangle-button {
      position: absolute;
      bottom: 0;
      right: 0;
      border: none;
      cursor: pointer;
    }

    &__triangle-button--size-small {
      width: 22px;
      height: 22px;
    }

    &__triangle-button--size-big {
      width: 33px;
      height: 33px;
    }

    &__triangle-button--contour-thin {
      bottom: -1px;
    }

    &__triangle-button--contour-thick {
      bottom: -2px;
    }

    &__triangle-button--color-yellow {
      background-color: $color-primary--1;
    }

    &__triangle-button--color-blue {
      background-color: $color-secondary--1;
    }

    &__triangle-button::after {
      content: "";
      display: block;
      position: absolute;
      box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.3);
      transform: rotate(-41deg);
      background-color: $color-grayscale--1000;
    }

    &__triangle-button--hover::after {
      box-shadow: inset 0 2px 2px -2px rgba(0, 0, 0, 0.3);
      transform: rotate(139deg);
    }

    &__triangle-button--size-small::after {
      width: 36px;
      height: 20px;
      bottom: 7px;
      right: 1px;
    }

    &__triangle-button--size-big::after {
      width: 50px;
      height: 25px;
      bottom: 12px;
      right: 0;
    }

    &__plus {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      transform-origin: 50% 50%;
      transform: rotate(0deg);
      transition: 0.25s ease-out;
    }

    &__plus--size-small {
      width: 13px;
      height: 13px;
    }

    &__plus--size-big {
      width: 19px;
      height: 18px;
    }

    &__plus--hover {
      transform: rotate(135deg);
    }

    &__plus::before {
      content: "";
      position: absolute;
      display: block;
      background-color: $color-grayscale--1000;
    }

    &__plus::after {
      content: "";
      position: absolute;
      display: block;
      background-color: $color-grayscale--1000;
    }

    &__plus--size-small::before {
      right: 2px;
      bottom: 6px;
      width: 9px;
      height: 1px;
    }

    &__plus--size-small::after {
      right: 6px;
      bottom: 2px;
      width: 1px;
      height: 9px;
    }

    &__plus--size-big::before {
      right: 3px;
      bottom: 9px;
      width: 13px;
      height: 1px;
    }

    &__plus--size-big::after {
      right: 9px;
      bottom: 3px;
      width: 1px;
      height: 13px;
    }

    &__plus--plus-color-white::before,
    &__plus--plus-color-white::after {
      background-color: $color-grayscale--1000;
    }

    &__plus--plus-color-blue::before,
    &__plus--plus-color-blue::after {
      background-color: $color-secondary--2;
    }
  }
</style>
