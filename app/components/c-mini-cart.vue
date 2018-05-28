<template>
  <a :class="b({ active, state })" :href="$t('urls.cart')">
    <div :class="b('count', { quantity: !!quantity })">{{ quantity }}</div>
    <div :class="b('icon')"><e-icon inline icon="i-cart"/></div>
    <div :class="b('total', { subtotal: !!subtotal })">{{ displayPrice }}</div>
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
        'quantity',
        'subtotal',
      ]),
      displayPrice() {
        return this.$n(this.subtotal / 100, 'currency', 'de-CH'); // TODO - remove hardcoded locale
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

    &__icon {
      width: 22px;
      height: 24px;
      margin: $spacing--15 auto $spacing--0;

      path {
        fill: $color-grayscale--1000;
      }
    }

    &--state-reduced &__icon {
      margin-top: $spacing--10;
    }

    &:hover,
    &:active {
      border-bottom: none;
      color: $color-grayscale--1000;
    }

    &:hover path {
      filter: "progid:DXImageTransform.Microsoft.Dropshadow()";
      filter: url(#dropshadow);
    }

    &--active &__icon,
    &:active &__icon,
    &:hover &__icon {
      path {
        fill: var(--theme-color-primary-1);
      }
    }

    &__count {
      display: none;
      position: absolute;
      left: 50%;
      line-height: 1em;
      margin-left: -#{$spacing--15};
      transform: translateX(-50%);
      top: $spacing--10;
      color: var(--theme-color-secondary-1);
      padding: 1px 2px;
      background-color: $color-grayscale--1000;
      border-radius: 2px;
      min-width: 1em;
      text-align: center;
    }

    &--state-full &__count {
      @include media(sm) {
        top: $spacing--10;
      }
    }

    &--state-reduced &__count {
      top: 4px;
    }

    &__count--quantity {
      display: block;
    }

    &__total {
      visibility: hidden;
      margin-top: 0;
      padding: 3px 0 6px 0;
      text-align: center;
    }

    &--state-reduced &__total {
      display: none;
    }

    &--state-full &__total--subtotal {
      display: none;

      @include media(sm) {
        display: block;
        visibility: visible;
      }
    }
  }
</style>
