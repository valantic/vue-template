<template>
  <div :class="b()">

    <!-- top area -->
    <section :class="b('top')">

      <!-- left area -->
      <div :class="b('main', {area: 'top' })">

        <div :class="b('gallery')">
          <e-info-label v-if="erp.priceType" :price-type="erp.priceType" :price-type-end-date="erp.priceTypeEndDate"/>
          gallery
          <pre>{{ product }}</pre>
          <pre>{{ erp }}</pre>
        </div>

        <div :class="b('specs')">specs</div>

      </div>

      <aside :class="b('sidebar', {area: 'top' })">
        <div :class="b('add-to-cart')">
          availability /
          <div :class="b('prices')">
            <c-prices :price-gross="erp.priceGross" :price="erp.price"/>
          </div>
          / qty / add to cart
        </div>
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
  import { mapGetters, mapActions } from 'vuex';
  import cPrices from '@/components/c-prices';

  export default {
    name: 'c-product-detail',
    components: {
      cPrices,
    },
    // mixins: [],

    props: {
      /**
       * The sku of the product
       */
      sku: {
        type: String,
        required: true,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters({
        product: 'product/product',
        erp: 'product/erp',
      })
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      this.fetchErp(this.$props.sku, 1); // TODO - what's the quantity initially?
    },
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      ...mapActions({
        fetchErp: 'product/fetchErp',
      })
    },
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
