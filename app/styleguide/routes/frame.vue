<template>
  <div :class="b()">
    <router-view/>
    <s-navigation :routes="routes" nav-position="right"/>
  </div>
</template>

<script>
  import sNavigation from '@/styleguide/components/s-navigation';
  import styleguideRoutes from '@/setup/styleguide.routes';

  export default {
    name: 'frame',
    components: {
      sNavigation
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

  .frame {
    height: 100%;
  }

</style>
