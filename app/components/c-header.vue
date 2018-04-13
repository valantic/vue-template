<template>
  <div :class="b()">
    <div :class="b('left')"></div>
    <div :class="b('inner')">
      <div :class="b('logo')">Logo</div>
      <div :class="b('icons')">Icons</div>
      <div :class="b('menu')">Menu</div>
      <div :class="b('search')">Search</div>
    </div>
    <div :class="b('right')"></div>
  </div>
</template>

<script>
  export default {
    name: 'c-header',
    // components: {},
    // mixins: [],

    // props: {},
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
  .c-header {
    display: flex;
    justify-content: center;

    &__left,
    &__right,
    &__inner {
      border-bottom: 2px solid $color-primary--1;
      box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.1);
      min-height: $spacing--60;
    }

    &__left {
      flex: 1 1 auto;
      background-color: $color-secondary--1;
    }

    &__right {
      flex: 1 1 auto;
      background-color: $color-secondary--2;
    }

    &__inner {
      background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
      max-width: map-get($grid-breakpoints, xl);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    &__logo {
      flex: 0 1 percentage(5 / 12);
      align-self: flex-start;

      @include media(sm) {
        flex: 0 1 percentage(3 / 12);
        order: 1;
      }
    }

    &__menu {
      flex: 0 1 percentage(3 / 12);
      align-self: flex-start;

      @include media(sm) {
        display: none;
        order: 2;
      }
    }

    &__search {
      flex: 0 1 percentage(9 / 12);
      align-self: flex-start;

      @include media(sm) {
        flex: 0 1 percentage(6 / 12);
        order: 3;
      }
    }

    &__icons {
      flex: 0 1 percentage(7 / 12);
      align-self: flex-start;

      @include media(sm) {
        flex: 0 1 percentage(3 / 12);
        order: 4;
      }
    }
  }
</style>
