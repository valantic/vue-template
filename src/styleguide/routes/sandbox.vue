<template>
  <div :class="b()">
    <h1>Sandbox</h1>
    <div>
      <e-icon :class="b('icon')" icon="styleguide-heart" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sandbox',
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
    &__icon {
      color: $color-status--danger;
    }
  }
</style>
