<template>
  <a :class="b({ spacing })">
    <slot></slot>
  </a>
</template>

<script>
  import propScale from '@/helpers/prop.scale';

  /**
   * Creates a styled text link.
   */
  export default {
    name: 'e-link',
    status: 0,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Sets a predefined inner spacing for the link.
       *
       * Available values: [0, 500]
       */
      spacing: propScale(500, [
        0,
        500
      ])
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
  .e-link {
    outline: none;
    border-bottom: 1px solid $color-grayscale--600;
    color: $color-grayscale--400;
    font-family: $font-family--primary;
    text-decoration: none;

    &:focus,
    &--focus,
    &:hover,
    &--hover {
      color: $color-secondary--1;
      border-bottom: 1px solid $color-primary--1;
      text-decoration: none;
    }

    &:active {
      border-bottom-color: $color-secondary--2;
    }

    &--spacing-500 {
      padding: 0 $spacing--10;
    }
  }
</style>
