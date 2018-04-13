<!-- TODO - This component is supposed to be functional -->
<template>
  <div class="c-content">
    <div class="c-content__inner">
      foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>
      foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>
      foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>bar<br>foo<br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-content',
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
  .c-content {
    flex: 1 0 auto;
    margin-top: $spacing--60;

    &__inner {
      max-width: map-get($grid-breakpoints, xl);
      margin: 0 auto;
    }
  }
</style>
