<template>
  <div :class="b({ negative, spacing })">
    <div :class="b('inner')">
      <div :class="b('bubble')"></div>
      <div :class="b('bubble')"></div>
      <div :class="b('bubble')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'e-progress', // TODO: update name according to filename
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
      }
    },
    // data() {
    //   return {};
    // },

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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  $_e-progress__animation-duration: 2000ms;
  $_e-progress__bubble--width: 1rem;
  $_e-progress--padding: $spacing--5;

  .e-progress {
    padding: $_e-progress--padding;

    &--spacing-0 {
      padding: 0;
    }

    &__inner {
      position: relative;
      width: calc(#{$_e-progress__bubble--width} * 4);
      height: $_e-progress__bubble--width;
    }

    &__bubble {
      height: $_e-progress__bubble--width;
      width: $_e-progress__bubble--width;
      background-color: $color-secondary--1;
      left: 100%;
      position: absolute;
      margin: 0 auto;
      border-radius: 50%;
      transform: scale(0.1);
      animation: e-progress-rotation-animation $_e-progress__animation-duration linear infinite;

      &:nth-child(1) {
        animation-delay: calc(#{$_e-progress__animation-duration} * 1 / -1.5);
      }

      &:nth-child(2) {
        animation-delay: calc(#{$_e-progress__animation-duration} * 2 / -1.5);
      }

      &:nth-child(3) {
        animation-delay: calc(#{$_e-progress__animation-duration} * 3 / -1.5);
      }
    }
  }

  .e-progress--negative {
    .e-progress__bubble {
      background-color: $color-primary--3;
    }
  }

  @keyframes e-progress-rotation-animation {
    0% {
      transform: translateX(-30%) scale(0);
    }

    50% {
      transform: translateX(-253%) scale(1);
    }

    100% {
      transform: translateX(-466%) scale(0);
    }
  }
</style>
