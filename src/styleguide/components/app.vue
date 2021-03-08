<template>
  <div id="app">
    <header is="c-header" />
    <router-view />
    <footer is="c-footer" />
    <s-navigation :routes="routes" nav-position="bottom-right" />
  </div>
</template>

<script>
  import sNavigation from '@/styleguide/components/s-navigation';
  import styleguideRoutes from '@/setup/styleguide.routes';

  export default {
    name: 'app',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sNavigation,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * An Array of available routes.
       *
       * @returns {Array.<Object>}
       */
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  // Define #app styles in @/setup/scss/_globals.scss
</style>
