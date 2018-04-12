<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <div :class="b('logo')">Logo</div>
      <div :class="b('menu')">Menu</div>
      <div :class="b('search')">Search</div>
      <div :class="b('icons')">Icons</div>
    </div>
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
    position: sticky;
    top: 0;
    background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
    border-bottom: 2px solid $color-primary--1;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

    &__wrapper {
      @include media(xxs, xs) {
        flex-direction: row;
        height: auto;
      }

      min-height: 60px;
      max-width: map-get($grid-breakpoints, xl);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    &__logo {
      @include media(xxs, xs) {
        order: 1;
        flex: 0 1 50%;
      }

      line-height: 60px;
      flex: 0 1 auto;
      align-self: flex-start;
    }

    &__menu {
      @include media(sm) {
        display: none;
      }

      @include media(xxs, xs) {
        order: 3;
        flex: 0 1 20%;
      }

      line-height: 60px;
      flex: 0 1 auto;
      align-self: flex-start;
    }

    &__search {
      @include media(xxs, xs) {
        order: 4;
        flex: 0 1 80%;
      }

      line-height: 60px;
      flex: 0 1 584px;
      align-self: flex-start;
    }

    &__icons {
      @include media(xxs, xs) {
        order: 2;
        flex: 0 1 50%;
      }

      line-height: 60px;
      flex: 0 1 auto;
      align-self: flex-start;
    }
  }
</style>
