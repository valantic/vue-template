<template>
  <div :class="b()">
    <div :class="b('breadcrumbs')">
      Sortiment / Licht
    </div>
    <div :class="b('title')">
      {{ $tc('c-productlist-wrapper.prductlistArticles', productlist.length, {count: productlist.length}) }}
    </div>
    <ul :class="b('list')">
      <li v-for="(value, index) in productlist" :class="b('product')" :key="index">
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'c-productlist-wrapper',
    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters({
        /**
         * Gets a productlist
         *
         * @returns  {Object}  productlist - List of products from the store.
         */
        productlist: 'catalog/productlist',
      }),
    },
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

  .c-productlist-wrapper {
    &__breadcrumbs {
      @include font($font-size--12, 20px);

      background-color: $color-grayscale--1000;
      margin-bottom: $spacing--2;
      padding: $spacing--0 $spacing--5;
      color: $color-grayscale--400;
      box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);
    }

    &__title {
      @include font($font-size--18, 36px, $font-weight--bold);

      display: flex;
      align-items: center;
      height: $spacing--60;
      padding: $spacing--0 $spacing--10;
      background-color: $color-grayscale--1000;
      margin-bottom: $spacing--2;
      box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);
      color: $color-secondary--1;
    }

    &__list {
      list-style-type: none;
      margin-bottom: $spacing--0;
      padding: $spacing--0;
    }

    &__product {
      width: 100%;
      min-height: 100px;
      background-color: $color-grayscale--1000;
      margin-bottom: $spacing--2;
      box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);

      &:last-child {
        margin-bottom: $spacing--0;
      }
    }
  }

</style>
