<template>
  <div :class="b()">
    <div :class="b('quantity')">
      <e-input
        v-model.number="quantity"
        :min="step"
        :step="step"
        type="number"
        name="quantity"
        pattern="\d*"
      />
    </div>
    <div :class="b('button')">
      <e-button
        :progress="progress"
        primary
        width="full"
        @click="onClick"
      >
        <e-icon :class="b('icon')" icon="i-cart" inline/>
        <span v-if="hasLabel" :class="b('label')"> {{ $t('c-add-to-cart.addToCart') }}</span>
      </e-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  /**
   * Renders add to cart component
   */
  export default {
    name: 'c-add-to-cart',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Sku of the article to be added
       */
      sku: {
        type: String,
        required: true,
      },

      /**
       * Increment steps. Also defines initial value
       */
      step: {
        type: Number,
        default: 1,
      },

      /**
       * Show label or not
       */
      label: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        quantity: this.$props.step,
        hasLabel: !!this.$props.label,
        progress: false,
        debug: '', // TODO - remove
      };
    },

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

    methods: {
      ...mapActions('cart', [
        'addToCart'
      ]),
      onClick() {
        let quantity = this.quantity.toString().match(/[0-9]/g);

        this.quantity = quantity && quantity.length ? parseInt(quantity[0], 10) : 1; // IE 11 / Safari

        this.progress = true;

        this.addToCart(this.sku, this.quantity)
          .finally(() => { this.progress = false; });
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-add-to-cart {
    display: flex;
    flex-direction: column;

    &__quantity {
      flex: 0 1 auto;
      width: 100%;
      margin-bottom: $spacing--15;

      input {
        text-align: right;
      }
    }

    &__button {
      flex: 0 1 auto;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__label {
      margin-left: $spacing--10;
      color: $color-secondary--1;
    }

    &__button:hover &__label,
    &__button:focus &__label,
    &__button:active &__label {
      color: $color-grayscale--1000;
    }
  }

  .e-button__inner {
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 18px;
  }
</style>
