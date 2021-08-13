<template>
  <div :class="b(componentModifiers)">
    <div :class="b('inner')">
      <div :class="b('bubble')"></div>
      <div :class="b('bubble')"></div>
      <div :class="b('bubble')"></div>
    </div>
    <span class="invisible">
      {{ loadingMessage }}
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import propScale from '@/helpers/prop.scale';

  export default defineComponent({
    name: 'e-progress',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    props: {
      /**
       * Inverts the loading style
       */
      negative: {
        type: Boolean,
        default: false
      },

      /**
       * Sets the inner spacing for the animation
       *
       * Valid values: `[0, 500]`
       */
      spacing: propScale(500, [
        0,
        500
      ]),

      /**
       * Defines a fallback message. "e-progress.loading" is used by default
       */
      message: {
        type: String,
        default: null // Translation can not be set here because it will not be computed
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns a readable loading message.
       *
       * @returns {String}
       */
      loadingMessage(): string {
        return this.message || this.$t('e-progress.loading');
      },

      /**
       * Returns all modifiers for the component main class.
       *
       * @returns {Object}
       */
      componentModifiers(): object {
        return {
          negative: this.negative,
          spacing: this.spacing,
        };
      },
    },
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
</script>

<style lang="scss">
  @use 'sass:math';

  $_e-progress__animation-duration: 2000ms;
  $_e-progress--padding: $spacing--5;

  @keyframes e-progress-rotation-animation {
    0% {
      transform: translate(-50% * -6, 0) scale(0) rotate(0.02deg); // NOTE: the rotation smooths animation in FF.
    }

    50% {
      transform: translate(-50%, 0) scale(1) rotate(0.02deg);
    }

    100% {
      transform: translate(-50% * 8, 0) scale(0) rotate(0.02deg);
    }
  }

  .e-progress {
    font-size: 1rem;
    padding: $_e-progress--padding;
    display: flex;
    align-items: center;

    &--spacing-0 {
      padding: 0;
    }

    &__inner {
      position: relative;
      width: calc(1em * 4);
      height: 1em;
      float: left;
    }

    &__bubble {
      height: 0.6em;
      width: 0.6em;
      left: 50%;
      background-color: $color-secondary--1;
      position: absolute;
      margin: $spacing--5 auto 0;
      border-radius: 50%;
      animation: e-progress-rotation-animation $_e-progress__animation-duration linear infinite;

      &:nth-child(1) {
        animation-delay: math.div($_e-progress__animation-duration, 3 * -1);
      }

      &:nth-child(2) {
        animation-delay: math.div($_e-progress__animation-duration, 3 * -2);
      }

      &:nth-child(3) {
        animation-delay: math.div($_e-progress__animation-duration, 3 * -3);
      }
    }
  }

  .e-progress--negative {
    .e-progress__bubble {
      background-color: $color-primary--3;
    }
  }
</style>
