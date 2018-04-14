<template>
  <div :class="b()">
    <l-default/>
  </div>
</template>

<script>
  import lDefault from '@/styleguide/components/l-default';

  export default {
    name: 'layout',
    components: {
      lDefault
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

  .layout {
    height: 100%;
  }

</style>
