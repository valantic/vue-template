<template>
  <div
    :class="b(componentModifiers)"
    role="alert"
    aria-busy="true"
  >
    <div :class="b('inner')">
      <span :class="b('fragment')"></span>
      <span :class="b('fragment')"></span>
      <span :class="b('fragment')"></span>
    </div>
    <div
      class="invisible"
      aria-live="assertive"
    >
      {{ loadingMessage }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import propScale from '@/helpers/prop.scale';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  /**
   * Displays a loading indicator.
   */
  export default defineComponent({
    name: 'e-loading-indicator',

    // components: {},

    props: {
      /**
       * Sets the inner spacing for the animation
       */
      size: {
        type: String,
        default: 'default',
        validator: (value: string) => ['default', 'medium'].includes(value),
      },

      /**
       * Sets the inner spacing for the animation
       */
      spacing: propScale(500, [0, 500]),

      /**
       * Defines a fallback message. "e-progress.loading" is used by default
       */
      message: {
        type: String,
        default: null, // Translation can not be set here because it will not be computed
      },

      /**
       * Show the item in full width.
       */
      fullwidth: {
        type: Boolean,
        default: false,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns a readable loading message.
       */
      loadingMessage(): string {
        return this.message || this.$t('e-loading-indicator.loading');
      },

      /**
       * Returns all modifiers for the component main class.
       */
      componentModifiers(): Modifiers {
        const { size, spacing, fullwidth } = this;

        return {
          size,
          spacing,
          fullwidth,
        };
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:math';
  @use 'sass:map';
  @use '@/setup/scss/variables';
  @use '@/setup/scss/mixins';

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

  .e-loading-indicator {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: variables.$font-size--regular;

    &--spacing-0 {
      padding: 0;
    }

    &--size-medium {
      font-size: variables.$font-size--biggest;
    }

    &--fullwidth {
      position: absolute;
      top: 0;
      left: 0;
      z-index: map.get(variables.$va-z-index, 'navigation') - 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(var(--theme-color-grayscale--1000-rgb), 0.3);
      backdrop-filter: blur(5px);
    }

    &__inner {
      position: relative;
      display: block;
      float: left;
      width: calc(1em * 4);
      height: 1em;
    }

    &__fragment {
      $loading-animation-duration: 2000ms;

      position: absolute;
      left: 50%;
      display: block;
      width: 0.6em;
      height: 0.6em;
      margin: 5px auto 0;
      background-color: var(--theme-color-primary--1);
      animation: e-progress-rotation-animation #{$loading-animation-duration} linear infinite;

      &:nth-child(1) {
        animation-delay: math.div($loading-animation-duration, 3 * -1);
      }

      &:nth-child(2) {
        animation-delay: math.div($loading-animation-duration, 3 * -2);
      }
    }
  }
</style>
