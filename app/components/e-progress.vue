<template>
  <div :class="b({ negative, spacing })" :data-message="loadingMessage">
    <div :class="b('inner')">
      <div :class="b('bubble')"></div>
      <div :class="b('bubble')"></div>
      <div :class="b('bubble')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'e-progress',
    // components: {},
    // mixins: [],

    props: {
      negative: {
        type: Boolean,
        default: false
      },

      spacing: {
        type: [String, Number],
        default: 500,
        validator(value) {
          return [
            0,
            500
          ].includes(parseInt(value, 10));
        }
      },
      message: {
        type: String,
        default: null
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      loadingMessage() {
        return this.message || this.$t('e-progress.loading');
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
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  $_e-progress__animation-duration: 2000ms;
  $_e-progress--padding: $spacing--5;

  @keyframes e-progress-rotation-animation {
    0% {
      left: 100%;
      transform: translateX(-50%) scale(0) rotate(0.02deg); // NOTE: the rotation smoothes animation in FF
    }

    50% {
      transform: translateX(-50%) scale(1) rotate(0.02deg);
    }

    100% {
      left: 0;
      transform: translateX(-50%) scale(0) rotate(0.02deg);
    }
  }

  .e-progress {
    font-size: 1rem;
    padding: $_e-progress--padding;
    display: flex;
    align-items: center;

    &::after {
      content: attr(data-message);
      display: block;
      white-space: nowrap;
      float: right;
      width: 0;
      overflow: hidden;
    }

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
      height: 1em;
      width: 1em;
      background-color: $color-secondary--1;
      left: 100%;
      position: absolute;
      margin: 0 auto;
      border-radius: 50%;
      transform: translateX(-50%) scale(0) rotate(0.02deg); // NOTE: the rotation smoothes animation in FF
      animation: e-progress-rotation-animation $_e-progress__animation-duration linear infinite;

      &:nth-child(1) {
        animation-delay: $_e-progress__animation-duration / 3 * -1;
      }

      &:nth-child(2) {
        animation-delay: $_e-progress__animation-duration / 3 * -2;
      }

      &:nth-child(3) {
        animation-delay: $_e-progress__animation-duration / 3 * -3;
      }
    }
  }

  .e-progress--negative {
    .e-progress__bubble {
      background-color: $color-primary--3;
    }
  }
</style>
