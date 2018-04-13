<template>
  <div :class="b()">
    <c-header/>
    <!-- TODO - move to c-content -->
    <div class="c-content">
    </div>
    <c-footer/>
  </div>
</template>

<script>
  import sNavigation from '@/styleguide/components/s-navigation';
  import cHeader from '@/components/c-header';
  import cFooter from '@/components/c-footer';

  export default {
    name: 'layout',
    components: {
      sNavigation,
      cHeader,
      cFooter
    },
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
  html,
  body,
  .layout {
    height: 100%;
  }

  .layout {
    display: flex;
    flex-direction: column;
  }

  .c-content {
    flex: 1 0 auto;
  }
</style>
