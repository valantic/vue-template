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
          <c-swiper-gallery :images="product.images"/>
        </div>

        <div :class="b('specs')">
          <e-heading tag-name="h1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod dwddwedwdwd</e-heading>
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
          <div :class="b('prices-wrapper')">
            <c-prices :price-gross="erp.priceGross" :price="erp.price"/>
          </div>
          <div :class="b('add-to-cart-wrapper')">
            <c-add-to-cart :sku="product.sku" label/>
          </div>
        </div>
      </aside>

    </section>

    <!-- bottom area -->
    <section :class="b('bottom')">

      <div :class="b('main', { area: 'bottom' })">
        <div :class="b('details')">
          <div v-if="product.description" :class="b('description')">
            <e-heading underline tag-name="h2" color="gray">{{ productDescriptionTitle }}</e-heading>
            <div :class="b('description-text')" v-html="product.description"></div>
          </div>
        </div>
        <div :class="b('details')">
          <c-collapse-group>
            <c-collapse v-if="product.tech_attributes" :title="technicalDataTitle">
              <c-attribute-grid :attributes="product.tech_attributes"/>
            </c-collapse>
            <c-collapse v-if="hasMedia" :title="$t('c-product-detail.productDocumentsTitle')">
              <e-heading v-if="hasPdfDocuments" tag-name="h3" color="gray">{{ productPdfsTitle }}</e-heading>
              <c-linklist v-if="hasPdfDocuments" :items="product.media_attributes.productDataSheet"/>
              <e-heading v-if="hasVideos" tag-name="h3" color="gray">{{ productVideosTitle }}</e-heading>
              <c-linklist v-if="hasVideos" :items="product.media_attributes.video"/>
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
  import cLinklist from '@/components/c-linklist';
  import cCollapseGroup from '@/components/c-collapse-group';
  import cCollapse from '@/components/c-collapse';
  import cSwiperGallery from '@/components/c-swiper-gallery';

  export default {
    name: 'c-product-detail',
    components: {
      cLinklist,
      cAddToCart,
      cPrices,
      cAttributeGrid,
      cCollapseGroup,
      cCollapse,
      cSwiperGallery,
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
      }),

      /**
       * Checks if this product has PDF documents (attribute of the "media-attributes"-Object)
       *
       * @returns {boolean}
       */
      hasPdfDocuments() {
        if (Object.keys(this.product.media_attributes).length === 0) return false;

        if (this.product.media_attributes.productDataSheet == null) return false;

        if (Object.keys(this.product.media_attributes.productDataSheet).length === 0) return false;

        return true;
      },

      /**
       * Checks if this product has Videos (attribute of the "media-attributes"-Object)
       *
       * @returns {boolean}
       */
      hasVideos() {
        if (Object.keys(this.product.media_attributes).length === 0) return false;

        if (this.product.media_attributes.video == null) return false;

        if (Object.keys(this.product.media_attributes.video).length === 0) return false;

        return true;
      },
      hasMedia() {
        return this.hasPdfDocuments || this.hasVideos;
      },
      productDescriptionTitle() {
        return this.$t('c-product-detail.productDescriptionTitle');
      },
      technicalDataTitle() {
        return this.$t('c-product-detail.technicalDataTitle');
      },
      productDocumentsTitle() {
        return this.$t('c-product-detail.productDocumentsTitle');
      },
      productPdfsTitle() {
        return this.$t('c-product-detail.productPdfsTitle');
      },
      productVideosTitle() {
        return this.$t('c-product-detail.productVideosTitle');
      },
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
        flex-wrap: wrap;
      }
    }

    &__bottom {
      @include media(md) {
        display: flex;
      }
    }

    &__main {
      padding-bottom: $spacing--20;

      @include media(sm) {
        flex: 1;
        border-bottom: 1px solid $color-grayscale--600;
      }

      @include media(md) {
        border-bottom: none;
      }
    }

    &__main--area-top {
      position: relative;
      max-width: 100%;

      @include media(sm) {
        display: flex;
        max-width: 100%;
      }

      @include media(md) {
        max-width: percentage(9 / 12);
      }
    }

    &__main--area-bottom {
      flex-direction: column;

      @include media(md) {
        padding-bottom: $spacing--60;
      }
    }

    &__info {
      @include z-index('info-label');

      position: absolute;
      top: $spacing--15;
      left: $spacing--0;

      @include media(sm) {
        top: $spacing--30;
      }
    }

    &__sidebar {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: $spacing--0 $spacing--10 $spacing--30 $spacing--10;

      @include media(sm) {
        flex-basis: 100%;
        padding-top: $spacing--20;
      }

      @include media(md) {
        flex-basis: percentage(3 / 12);
        padding: $spacing--0 $spacing--30 $spacing--30 $spacing--30;
      }
    }

    &__sidebar--area-top {
      &::before {
        @include media(md) {
          position: absolute;
          content: '';
          height: calc(100% - 45px);
          width: 1px;
          top: $spacing--25;
          left: $spacing--0;
          border-left: 1px solid $color-grayscale--600;
        }
      }
    }

    &__sidebar--area-bottom {
      padding-bottom: $spacing--60;

      @include media(md) {
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
        margin-bottom: $spacing--25;
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
      padding: $spacing--25 $spacing--10 $spacing--0;

      @include media(sm) {
        border: none;
      }

      .e-heading {
        margin-bottom: $spacing--20;
      }
    }

    &__add-to-cart {
      display: flex;
      flex-direction: column;
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        flex-direction: row;
        justify-content: flex-end;
        border: none;
      }

      @include media(md) {
        flex-direction: column;
      }
    }

    &__prices-wrapper {
      @include media(sm) {
        width: percentage(4 / 12);
        padding-right: $spacing--40;
      }

      @include media(md) {
        width: 100%;
        padding-right: $spacing--0;
        margin-bottom: $spacing--40;
      }
    }

    &__add-to-cart-wrapper {
      @include media(sm) {
        width: percentage(4 / 12);
      }

      @include media(md) {
        width: auto;
      }
    }

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
      @include font($font-size--14, 18px);

      color: $color-grayscale--200;
      padding: $spacing--10 $spacing--20 $spacing--30 $spacing--20;
    }

    &__accessories {
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border: none;
      }
    }
  }
</style>
