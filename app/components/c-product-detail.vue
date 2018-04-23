<template>
  <div :class="b()">

    <div :class="b('inner')">

      <section :class="b('product')"> product</section>

      <div :class="b('content')">

        <div :class="b('main')">
          <section :class="b('details')"> details</section>
          <section :class="b('related')"> related</section>
          <section :class="b('accessories')"> accessories</section>
        </div>

        <div :class="b('sidebar')">
          <aside :class="b('recommendation')"> recommendation</aside>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: 'c-product-detail',

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
  .c-product-detail {
    &__product {
      width: 100%;
    }

    &__content {
      @include media(sm) {
        display: flex;
      }
    }

    &__main {
      @include media(sm) {
        flex: 1;
      }
    }

    &__sidebar {
      @include media(sm) {
        flex-basis: 25%;
      }
    }
  }

</style>
