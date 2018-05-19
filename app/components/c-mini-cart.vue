<template>
  <a :class="b({ active, state })" :href="$t('urls.cart')">
    <div v-if="miniCartHasItems" :class="b('count')">{{ miniCart.cartQuantity }}</div>
    <div :class="b('icon')"><e-icon inline icon="i-cart"/></div>
    <div v-if="miniCartHasPrice" :class="b('total')">{{ displayPrice }}</div>
  </a>
</template>

<script>
  import { mapGetters } from 'vuex';

  /**
   *
   * This component renders the mini cart.
   * It takes the amount of items and total price from state.miniCart from vuex cart store.
   *
   */
  export default {
    name: 'c-mini-cart',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Sets the display state of the minicart
       *
       * Valid values: `full, reduced`
       */
      state: {
        type: String,
        default: 'full',
        validator(value) {
          return [
            'full',
            'reduced'
          ].includes(value);
        }
      },

      /**
       * Forces the active state
       */
      active: {
        type: Boolean,
        default: false,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('cart', [
        'miniCart',
        'miniCartHasItems',
        'miniCartHasPrice',
      ]),
      displayPrice() {
        return this.$n(this.miniCart.netTotal / 100, 'currency', 'de-CH'); // TODO - remove hardcoded locale
      },
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
  .c-mini-cart {
    @include font($font-size--10, 10px);

    display: inline-block;
    position: relative;
    color: $color-grayscale--1000;
    border-bottom: none;
    padding: $spacing--0;

    &:hover,
    &:active {
      border-bottom: none;
      color: $color-grayscale--1000;
    }

    &__icon {
      width: 22px;
      height: 24px;
      margin: $spacing--15 auto $spacing--0;

      path {
        fill: $color-grayscale--1000;
      }
    }

    &--state-reduced &__icon {
      @include media(sm) {
        margin: $spacing--10 auto $spacing--0 auto;
      }
    }

    &--active &__icon,
    &:active &__icon,
    &:hover &__icon {
      path {
        fill: $color-primary--1;
      }
    }

    &__count {
      position: absolute;
      right: 50%;
      top: $spacing--10;
      margin-right: $spacing--10;
      display: inline-block;
      color: $color-secondary--2;
      padding: 1px 2px;
      background-color: $color-grayscale--1000;
      border-radius: 2px;
      min-width: 1em;
      text-align: center;
    }

    &--state-reduced &__count {
      @include media(sm) {
        top: 6px;
      }
    }

    &__total {
      margin-top: 0;
      padding: 3px 0 6px 0;
      text-align: center;
    }

    &--state-full &__total {
      display: none;

      @include media(sm) {
        display: block;
      }
    }

    &--state-reduced &__total {
      display: none;
    }
  }
</style>
