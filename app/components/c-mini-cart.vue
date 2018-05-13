<template>
  <div :class="b({ active })" @click="onClick">
    <div :class="b('count')">{{ cart.totals.numItemsTotal }}</div>
    <div :class="b('icon')"><e-icon inline icon="i-cart"/></div>
    <div :class="b('total')">{{ displayPrice }}</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'c-mini-cart',
    // components: {},
    // mixins: [],

    props: {
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
      ...mapGetters({
        cart: 'cart/cart',
      }),
      displayPrice() {
        return this.$n(this.cart.totals.netTotal / 100, 'currency', 'de-DE'); // TODO - remove hardcoded locale
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

    methods: {
      onClick(event) {
        /**
         * Click event.
         *
         * @event click
         * @type {object}
         */
        this.$emit('click', event);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-mini-cart {
    position: relative;
    padding: 10px;
    cursor: pointer;

    @include media(sm) {
      padding: 0;
    }

    &__icon {
      width: 22px;
      height: 24px;

      @include media(sm) {
        margin: 15px auto 0 auto;
      }

      path {
        fill: $color-grayscale--1000;
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
      @include font($font-size--10, 10px, $font-weight--regular);

      position: absolute;
      right: 50%;
      top: -5px;
      margin-right: 10px;
      display: none;
      color: $color-secondary--2;
      padding: 1px 2px;
      background-color: $color-grayscale--1000;
      border-radius: 2px;
      min-width: 13px;
      text-align: center;

      @include media(sm) {
        display: inline-block;
      }
    }

    &__total {
      @include font($font-size--10, 10px, $font-weight--regular);

      display: none;
      margin-top: 0;
      padding: 3px 0 7px 0;
      text-align: center;

      @include media(sm) {
        display: block;
      }
    }
  }
</style>
