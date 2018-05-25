<template>
  <div :class="b()">
    <div :class="b('breadcrumbs--wrapper')">
      <span :class="b('breadcrumbs')">Sortiment / Licht</span>
    </div>
    <e-heading tag-name="h1" font-weight="bold">{{ productlist.length }} Artikel</e-heading>
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
    background-color: $color-grayscale--600;
    box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);

    &__breadcrumbs--wrapper {
      background-color: $color-grayscale--1000;
      margin-bottom: $spacing--5;
      padding: $spacing--0 $spacing--10;
    }

    &__breadcrumbs {
      @include font(12, 24);

      color: $color-grayscale--400;
    }

    &__list {
      list-style-type: none;
      padding: $spacing--0;
    }

    &__product {
      width: percentage(1);
      height: $spacing--100;
      background-color: $color-grayscale--1000;
      border-bottom: 2px solid $color-grayscale--600;
    }

    .e-heading {
      display: flex;
      align-items: center;
      height: $spacing--60;
      padding: $spacing--0 $spacing--10;
      background-color: $color-grayscale--1000;
      margin-bottom: $spacing--5;
    }
  }
</style>
