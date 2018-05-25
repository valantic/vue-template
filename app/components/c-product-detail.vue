<template>
  <div :class="b()">

    <!-- top area -->
    <section :class="b('top')">

      <!-- left area -->
      <div :class="b('main', {area: 'top' })">
        <div :class="b('info')">
          <e-info-label
            v-if="erp.priceType"
            :price-type="erp.priceType"
            :price-type-end-date="erp.priceTypeEndDate"
          />
        </div>
        <div :class="b('gallery')">
          <c-swiper :images="images"/>
        </div>

        <div :class="b('specs')">
          <div :class="b('technical-data')">
            <c-attribute-grid :attributes="product.main_attributes"/>
          </div>
          <div :class="b('attributes')">
            <c-attribute-grid :attributes="product.attributes" shrink-on-mobile />
          </div>
        </div>

      </div>

      <aside :class="b('sidebar', {area: 'top' })">
        <div :class="b('add-to-cart')">
          <c-prices :price-gross="erp.priceGross" :price="erp.price"/>
          <c-add-to-cart :sku="product.sku" label/>
        </div>
      </aside>

    </section>

    <!-- bottom area -->
    <section :class="b('bottom')">

      <div :class="b('main', { area: 'bottom' })">
        <div :class="b('details')">
          <div v-if="product.description" :class="b('description')">
            <e-heading underline tag-name="h2" color="gray">{{ $t('c-product-detail.productDescriptionTitle') }}</e-heading>
            <div :class="b('description-text')" v-html="product.description"></div>
          </div>
        </div>
        <div :class="b('details')">
          <c-collapse-group>
            <c-collapse v-if="product.tech_attributes" :title="$t('c-product-detail.technicalDataTitle')">
              <c-attribute-grid :attributes="product.tech_attributes"/>
            </c-collapse>
          </c-collapse-group>
        </div>
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
  import cAddToCart from '@/components/c-add-to-cart';
  import cPrices from '@/components/c-prices';
  import cAttributeGrid from '@/components/c-attribute-grid';
  import cCollapseGroup from '@/components/c-collapse-group';
  import cCollapse from '@/components/c-collapse';
  import cSwiper from '@/components/c-swiper';

  export default {
    name: 'c-product-detail',
    components: {
      cAddToCart,
      cPrices,
      cAttributeGrid,
      cCollapseGroup,
      cCollapse,
      cSwiper,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters({
        /**
         * Product detail getters
         */
        collapsible: 'product/collapsible',
        erp: 'product/erp',
        images: 'product/images',
        product: 'product/product',
      })
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      this.fetchErp();
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
      position: relative;

      @include media(sm) {
        display: flex;
        max-width: 75%;
      }
    }

    &__main--area-bottom {
      flex-direction: column;

      @include media(sm) {
        padding-bottom: $spacing--60;
      }
    }

    &__info {
      position: absolute;
      top: $spacing--15;
      left: $spacing--0;

      @include media(sm) {
        top: $spacing--30;
      }
    }

    &__sidebar {
      padding: $spacing--0 $spacing--10 $spacing--30 $spacing--10;

      @include media(md) {
        padding: $spacing--0 $spacing--30 $spacing--30 $spacing--30;
      }

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

    &__technical-data {
      margin-bottom: $spacing--15;

      @include media(sm) {
        margin-bottom: $spacing--10;
      }
    }

    &__gallery {
      border-bottom: 2px solid $color-grayscale--600;
      padding: 0 $spacing--10;

      @include media(sm) {
        border: none;
        max-width: 50%;
        padding: 0 $spacing--60 0 $spacing--30;
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

    &__details {
      .e-heading--underline .e-heading__inner {
        padding-left: $spacing--20;

        @include media(sm) {
          padding-left: $spacing--30;
        }
      }
    }

    &__description-text {
      @include font($font-size--14, $line-height: 18px);

      color: $color-grayscale--200;
      padding: $spacing--10 $spacing--20;

      @include media(sm) {
        padding: $spacing--10 $spacing--30 $spacing--40 $spacing--30;
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
