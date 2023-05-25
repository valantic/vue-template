<template>
  <li :class="b()">
    <slot></slot>
  </li>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // interface ISetup {}
  // interface IData {}

  /**
   * Basic blueprint for slider items that can be placed in `c-slider`.
   */
  export default defineComponent({
    name: 'c-slider-item-x',

    // components: {},

    // props: {},
    // emits: {},

    // setup(): ISetup {},
    // data(): IData {
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:math';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .c-slider-item-x {
    position: relative;
    flex: 0 0 100%;
    border: 5px solid variables.$color-grayscale--0;

    @include mixins.media(xs) {
      flex-basis: percentage(math.div(1, 2));
    }

    @include mixins.media(sm) {
      flex-basis: percentage(math.div(1, 3));
    }

    @include mixins.media(md) {
      flex-basis: percentage(math.div(1, 4));
    }

    @include mixins.media(lg) {
      flex-basis: percentage(math.div(1, 5));
    }

    @include mixins.media(xl) {
      flex-basis: percentage(math.div(1, 6));
    }

    .e-picture img {
      width: auto; // Only defined for overruling width/height from e-picture, should not be needed for real slider items.
      height: auto; // Only defined for overruling width/height from e-picture, should not be needed for real slider items.
    }
  }
</style>
