<template>
  <div :class="b()">
    <c-header/>
    <c-content/>
    <c-footer/>
  </div>
</template>

<script>

  import sNavigation from '@/styleguide/components/s-navigation';
  import cHeader from '@/components/c-header';
  import cContent from '@/components/c-content';
  import cFooter from '@/components/c-footer';

  export default {
    name: 'layout',
    components: {
      sNavigation,
      cHeader,
      cContent,
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

  body {
    display: block;
  }

  .layout {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
