<template>
  <div :class="b()">
    <div :class="b('quantity', { hasSteps })">
      <e-input
        v-model.number="quantity"
        :min="step"
        :step="step"
        type="number"
        inputmode="numeric"
        name="quantity"
        pattern="\d*"
        @input="onQuantityInput"
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
        quantityPrev: this.$props.step,
        hasLabel: !!this.$props.label,
        progress: false,
      };
    },

    computed: {
      hasSteps() {
        return this.step > 1 ? 'steps' : 'no-steps';
      }
    },
    // watch: {},

    // beforeCreate() {},

    created() {
      window.addEventListener('keyup', this.onKeyupHandler);
    },

    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},

    destroyed() {
      window.removeEventListener('keyup', this.onKeyupHandler);
    },

    methods: {
      ...mapActions('cart', [
        'addToCart'
      ]),
      onClick() {
        const quantity = this.quantity.toString().match(/[0-9]/g);

        let quantityTemp = quantity && quantity.length ? parseInt(quantity[0], 10) : this.step; // IE 11 / Safari

        this.progress = true;

        this.addToCart(this.sku, quantityTemp)
          .finally(() => { this.progress = false; });
      },
      onKeyupHandler(event) {
        if (typeof event.code !== 'undefined') {
          if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.onClick();
          }
        } else if (event.which !== 'undefined') { // IE 11 doesn´t have the event.code attribute.
          if (event.which === 13) {
            this.onClick();
          }
        }
      },
      onQuantityInput(value) {
        if (value % this.step !== 0) {
          this.quantity = this.quantityPrev;
        } else {
          this.quantityPrev = value;
        }
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
      margin-bottom: $spacing--10;

      input {
        text-align: right;
      }

      &--has-steps-no-steps input {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: 0;
        }
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
    /* stylelint-disable-next-line declaration-no-important */
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 18px;
  }
</style>
