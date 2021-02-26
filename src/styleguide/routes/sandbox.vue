<template>
  <div :class="b()">
    <h1>Sandbox</h1>
    <div>
      <c-component-1 />
      <c-component-2 />
      <!-- Add any content here -->
    </div>
  </div>
</template>

<script>
  import CComponent1 from '@/components/multi-template-component/c-component-1';
  import CComponent2 from '@/components/multi-template-component/c-component-2';

  export default {
    name: 'sandbox',
    components: { CComponent2, CComponent1 },
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
