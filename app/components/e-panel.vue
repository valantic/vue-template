<template>
  <div :class="b({ border: border, color: color })">
    <!-- TODO replace with e-heading -->
    <div v-if="hasHeading" :class="b('heading', headingModifiers)">
      <span :class="b('heading-underline')">{{ heading }}</span>
    </div>
    <div :class="b('content', contentModifiers)">
      <slot></slot>
    </div>
    <div
      v-if="triangleButton"
      ref="button"
      :class="b('triangle-button', triangleButtonModifiers)"
      @click="onTriangleButtonClick"
      @mouseover="onPlusToggle"
      @mouseout="onPlusToggle">
      <span ref="plus" :class="b('plus', plusModifiers)"></span>
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
       * Defines the spacing of the heading
       *
       * Valid values: `0`, `500`
       */
      headingSpacing: {
        type: Number,
        default: 500,
        validator(value) {
          return [0, 500].includes(value);
        },
      },

      /**
       * Defines the spacing of the content
       *
       * Valid values: `0`, `500`
       */
      contentSpacing: {
        type: Number,
        default: 500,
        validator(value) {
          return [0, 500].includes(value);
        },
      },

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
       * Valid values: `0`, `1`, `2`
       */
      border: {
        type: Number,
        default: 0,
      },

      /**
       * Defines the border color of the panel
       *
       * Valid values: `yellow`, `blue`, `gray`
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
      hasHeading() {
        return this.heading;
      },
      headingModifiers() {
        return {
          spacing: this.headingSpacing.toString(), /* TODO - remove .toString() once vue-bem-cn accepts numbers */
        };
      },
      contentModifiers() {
        return {
          spacing: this.contentSpacing.toString(), /* TODO - remove .toString() once vue-bem-cn accepts numbers */
        };
      },
      triangleButtonModifiers() {
        return {
          size: this.triangleButtonSize,
          border: this.border,
          color: this.color,
        };
      },
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
      onPlusToggle() {
        this.$refs.plus.classList.toggle('e-panel__plus--hover');
        this.$refs.button.classList.toggle('e-panel__triangle-button--hover');
      },
      onTriangleButtonClick() {
        this.$emit('triangle-pressed');
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-panel {
    position: relative;
    overflow: hidden;
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

    /* TODO - remove when e-heading is implemented */
    &__heading-underline {
      @include font($font-size: $font-size--18, $line-height: 23px);

      display: inline-block;
      color: $color-secondary--1;
      border-bottom: 1px solid $color-primary--1;
      padding-bottom: $spacing--5;
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
    }

    &__triangle-button--size-small {
      width: 22px;
      height: 22px;
    }

    &__triangle-button--size-big {
      width: 33px;
      height: 33px;
    }

    &__triangle-button--border-1 {
      bottom: -1px;
    }

    &__triangle-button--border-2 {
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
      box-shadow: 0 2px 2px -2px rgba($color-grayscale--0, 0.3);
      transform: rotate(-41deg);
      background-color: $color-grayscale--1000;
    }

    &__triangle-button--hover::after {
      box-shadow: inset 0 2px 2px -2px rgba($color-grayscale--0, 0.3);
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

    &__plus--hover,
    &__plus--open {
      transform: rotate(135deg);
    }

    &__plus--open {
      &.e-panel__plus--hover {
        transform: rotate(270deg);
      }
    }

    &__plus::before {
      content: "";
      position: absolute;
      display: block;
      background-color: $color-grayscale--1000;
      transition: 0.25s ease-out;
    }

    &__plus::after {
      content: "";
      position: absolute;
      display: block;
      background-color: $color-grayscale--1000;
      transition: 0.25s ease-out;
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

    &__plus--color-white::before,
    &__plus--color-white::after {
      background-color: $color-grayscale--1000;
    }

    &__plus--color-blue::before,
    &__plus--color-blue::after {
      background-color: $color-secondary--2;
    }

    &__plus--hover::before {
      background-color: $color-grayscale--1000;
    }

    &__plus--hover::after {
      background-color: $color-grayscale--1000;
    }
  }
</style>
