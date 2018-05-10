<template>
  <div :class="b()">
    <dl :class="b('price-definition')">
      <dt :class="b('price-label')">{{ $t('c-prices.grossLabel') }}</dt>
      <dd :class="b('price-value')">{{ $n(grossPrice / 100, 'currency', 'de-DE') }}</dd> <!-- TODO - remove hardcoded locale -->
    </dl>
    <dl :class="b('price-definition')">
      <dt :class="b('price-label')">{{ $t('c-prices.netLabel') }}</dt>
      <dd :class="b('price-value')">{{ $n(netPrice / 100, 'currency', 'de-DE') }}</dd> <!-- TODO - remove hardcoded locale -->
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'c-prices',
    // components: {},
    // mixins: [],

    props: {
      /**
       * The gross price to display
       */
      grossPrice: {
        type: Number,
        required: true,
      },

      /**
       * The net price to display
       */
      netPrice: {
        type: Number,
        required: true,
      },
    },
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
  .c-prices {
    padding: $spacing--10;

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
