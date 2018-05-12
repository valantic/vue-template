<template>
  <div :class="b()">
    <div :class="b('quantity')">
      <e-input
        ref="quantity"
        v-model.number="quantity"
        v-bind="$props"
        :min="step"
        :step="step"
        type="number"
        name="quantity"
      />
    </div>
    <div :class="b('button')">
      <e-button
        ref="button"
        v-bind="$props"
        primary
        @click="onClick"
      >
        <e-icon icon="i-cart" inline/> {{ $t('c-add-to-cart.addToCart') }}
      </e-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'c-add-to-cart',
    // components: {},
    // mixins: [],
    inheritAttrs: false,

    props: {
      /**
       * Sku of the article to be added
       */
      sku: {
        type: String,
        required: true,
      },

      /**
       * Quantity steps, also defines initial value
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
        isLoading: false,
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.$refs.button.hasProgress = true;
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      ...mapActions({
        addToCart: 'cart/addToCart',
      }),
      onClick() {
        this.addToCart(this.sku, this.quantity)
          .then(() => {}, () => {});
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-add-to-cart {
    display: flex;

    &__quantity {
      flex: 0 1 auto;
      margin-right: $spacing--20;
    }

    &__button {
      flex: 0 1 auto;
    }
  }
</style>
