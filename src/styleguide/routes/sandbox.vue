<template>
  <div :class="b()">
    <h1>Sandbox</h1>
    <div>
      <c-graphql-demo />
    </div>
  </div>
</template>

<script>
  import CGraphqlDemo from '@/components/c-graphql-demo';

  export default {
    name: 'sandbox',
    components: { CGraphqlDemo },
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
