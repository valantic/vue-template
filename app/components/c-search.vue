<template>
  <div :class="b()">
    <e-input v-model="demo" name="demo" :placeholder="enter text" title="search"/>
  </div>
</template>

<script>
  export default {
    name: 'c-search',
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
  .c-search {
    height: percentage(1);
    padding: $spacing--10;

    @include media(sm) {
      padding: $spacing--0;
      display: flex;
      align-items: center;

      .e-input {
        width: percentage(1);
      }
    }
  }
</style>
