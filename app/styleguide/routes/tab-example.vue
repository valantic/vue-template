<template>
  <div :class="b()">
    <tabs>
      <tab name="First tab">
        foo
      </tab>
      <tab name="Second tab">
        baa
      </tab>
      <tab name="Third tab">
        Third tab content
      </tab>
    </tabs>
  </div>
</template>

<script>
  export default {
    name: 'tab-example',
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
  .tab-example {
    // add custom styles
  }
</style>
