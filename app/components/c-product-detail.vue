<template>
  <div :class="b()">

    <!-- top area -->
    <section :class="b('top')">

      <!-- left area -->
      <div :class="b('main', {area: 'top' })">

        <div :class="b('gallery')">
          gallery
        </div>

        <div :class="b('specs')">
          <c-attribute-grid :attributes="product.attributes" headline shrink-on-mobile />
        </div>

      </div>

      <aside :class="b('sidebar', {area: 'top' })">
        <div :class="b('add-to-cart')">availability / price / qty / add to cart</div>
      </aside>

    </section>

    <!-- bottom area -->
    <section :class="b('bottom')">

      <div :class="b('main', { area: 'bottom' })">
        <div :class="b('details')"> details</div>
        <div :class="b('related')"> related</div>
        <div :class="b('accessories')"> accessories</div>
      </div>

      <aside :class="b('sidebar', {area: 'bottom' })">
        <div :class="b('recommendation')"> recommendation</div>
      </aside>

    </section>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex';
  import cAttributeGrid from '@/components/c-attribute-grid';

  export default {
    name: 'c-product-detail',

    components: {
      cAttributeGrid,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters({
        /**
         * Gets a product
         *
         * @returns  {Object}  product - Single product from the store
         */
        product: 'product/getProduct'
      })
    }
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
    height: 100%;

    &__top {
      width: 100%;

      @include media(sm) {
        border-bottom: 4px solid $color-grayscale--600;
        display: flex;
      }
    }

    &__bottom {
      @include media(sm) {
        display: flex;
      }
    }

    &__main {
      @include media(sm) {
        flex: 1;
      }
    }

    &__main--area-top {
      @include media(sm) {
        display: flex;
      }
    }

    &__main--area-bottom {
      flex-direction: column;

      @include media(sm) {
        padding-bottom: $spacing--60;
      }
    }

    &__sidebar {
      @include media(sm) {
        flex-basis: percentage(3 / 12);
      }
    }

    &__sidebar--area-bottom {
      padding-bottom: $spacing--60;

      @include media(sm) {
        border-left: 4px solid $color-grayscale--600;
      }
    }

    &__gallery,
    &__specs {
      flex: 1;

      @include media(sm) {
        flex-basis: percentage(6 / 12);
      }
    }

    &__gallery {
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border: none;
      }
    }

    &__specs {
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border: none;
      }
    }

    &__add-to-cart {
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border: none;
      }
    }

    &__details,
    &__related {
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border-bottom: 4px solid $color-grayscale--600;
      }
    }

    &__accessories {
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border: none;
      }
    }
  }
</style>
