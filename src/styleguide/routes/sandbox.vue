<template>
  <div :class="b()">
    <h1>Sandbox</h1>
    <div>
      <c-collapse>Foo</c-collapse>
    </div>
  </div>
</template>

<script>
  import CCollapse from '@/components/c-collapse';
  export default {
    name: 'sandbox',
    components: { CCollapse },
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
  .sandbox {
    // Add specific styles.
  }
</style>
