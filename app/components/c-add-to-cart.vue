<template>
  <div :class="b()">
    <div :class="b('quantity')">
      <e-input
        v-model.number="quantity"
        :min="step"
        :step="step"
        type="number"
        name="quantity"
      />
    </div>
    <div :class="b('button')">
      <e-button
        :progress="progress"
        primary
        width="full"
        @click="onClick"
      >
        <e-icon :class="b('icon')" icon="i-cart" inline/><span v-if="hasLabel"> {{ $t('c-add-to-cart.addToCart') }}</span>
      </e-button>
    </div>
    <!-- TODO - remove -->
    <div ref="debug">{{ debug }}</div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

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
      ...mapActions({
        addToCart: 'cart/addToCart',
      }),
      onClick() {
        this.progress = true;

        this.addToCart(this.sku, this.quantity)
          .then((response) => {
            this.progress = false;
            this.debug = response; // TODO - remove
          }, (error) => {
            this.progress = false;
            this.debug = error; // TODO - remove
        });
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-add-to-cart {
    display: flex;
    flex-direction: column;
    padding: $spacing--15 $spacing--10 $spacing--30 $spacing--10;

    @include media(xs) {
      padding: $spacing--0 $spacing--20 $spacing--30 $spacing--20;
    }

    &__quantity {
      flex: 0 1 auto;
      width: 100%;
      margin-bottom: $spacing--10;
    }

    &__button {
      flex: 0 1 auto;
    }

    &__icon {
      vertical-align: text-top;
      height: 21px; /* TODO - this is probably not how to do it */
    }
  }
</style>
