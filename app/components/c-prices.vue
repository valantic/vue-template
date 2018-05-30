<template>
  <div :class="b()">
    <dl v-if="displayPriceGross" :class="b('price-definition')">
      <dt :class="b('price-label')">{{ $t('c-prices.grossLabel') }} CHF.</dt><!-- TODO: replace hardcoded currency -->
      <dd :class="b('price-value')">{{ displayPriceGross }}</dd>
    </dl>
    <dl v-if="displayNetPrice" :class="b('price-definition')">
      <dt :class="b('price-label')">{{ $t('c-prices.netLabel') }} CHF.</dt><!-- TODO: replace hardcoded currency -->
      <dd :class="b('price-value')">{{ displayNetPrice }}</dd>
    </dl>
  </div>
</template>

<script>

  /**
   *
   * This component does not fetch any data from ERP, it just displays
   * the prices provided to it as attributes and formats them according to the
   * currently used language.
   * This means that the parent component is responsible for fetching the data from ERP.
   * If there should be no prices shown, just hide the whole component by using v-if.
   *
   */
  export default {
    name: 'c-prices',
    // components: {},
    // mixins: [],

    props: {
      /**
       * The gross price as delivered by ERP
       */
      priceGross: {
        type: Number,
        required: true,
      },

      /**
       * The net price as delivered by ERP.
       */
      price: {
        type: Number,
        required: true,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      displayPriceGross() {
        return this.$n(this.$props.priceGross / 100); // TODO - remove hardcoded locale
      },
      displayNetPrice() {
        return this.$n(this.$props.price / 100); // TODO - remove hardcoded locale ()
      }
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
  .c-prices {
    &__price-definition {
      display: flex;
      margin-bottom: $spacing--0;
    }

    &__price-label {
      @include font($font-size: $font-size--16, $font-weight: $font-weight--regular);

      flex: 0 1 50%;
      color: $color-grayscale--400;
    }

    &__price-value {
      @include font($font-size: $font-size--16, $font-weight: $font-weight--bold);

      flex: 0 1 50%;
      text-align: right;
      color: $color-secondary--1;
      margin-bottom: $spacing--0;
    }
  }
</style>
