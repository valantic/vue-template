<template>
  <div :class="b()">
    <router-view/>
    <s-navigation :routes="routes" nav-position="top-right"/>
    <vuedal/>
  </div>
</template>

<script>
  import sNavigation from '@/styleguide/components/s-navigation';
  import styleguideRoutes from '@/setup/styleguide.routes';
  import { Component as Vuedal } from 'vuedals';

  export default {
    name: 's-layout',
    components: {
      sNavigation,
      Vuedal
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      routes() {
        return styleguideRoutes;
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
  .s-layout > :first-child {
    height: 100vh;
  }
</style>
