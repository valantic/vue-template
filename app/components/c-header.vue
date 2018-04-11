<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <div :class="b('logo')">Logo</div>
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
    background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
    border-bottom: 2px solid $color-primary--1;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

    &__wrapper {
      max-width: map-get($grid-breakpoints, xl);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }

    &__logo {
      line-height: 60px;
      flex: 0 1 200px;
      text-align: center;
      border: 1px solid;
    }

    &__search {
      line-height: 60px;
      flex: 0 1 200px;
      text-align: center;
      border: 1px solid;
    }

    &__icons {
      line-height: 60px;
      flex: 0 1 200px;
      text-align: center;
      border: 1px solid;
    }
  }
</style>
