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
        v-bind="$props"
        primary
        spacing="0"
        @click="onClick"
      >
        <span ref="icon" :class="b('icon', iconModifiers)"><e-icon icon="i-cart" inline/></span>
        <span ref="label" :class="b('label', labelModifiers)">{{ $t('c-add-to-cart.addToCart') }}</span>
        <span ref="progress" :class="b('progress', progressModifiers)"><e-progress/></span>
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

      /**
       * Forces the hover state
       */
      hover: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the focus state
       */
      focus: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the active state
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the button
       */
      disabled: {
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

    computed: {
      iconModifiers() {
        return {
          hover: this.$props.hover,
          focus: this.$props.focus,
          active: this.$props.active,
          disabled: this.$props.disabled,
          isLoading: this.isLoading,
        };
      },
      labelModifiers() {
        return {
          isLoading: this.isLoading,
          hasLabel: this.hasLabel,
          hover: this.$props.hover,
          focus: this.$props.focus,
          active: this.$props.active,
          disabled: this.$props.disabled,
        };
      },
      progressModifiers() {
        return {
          isLoading: this.isLoading,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() { },
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
        // TODO - it would be better if i could just use disabled / progress attributes from e-button and e-input
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;

        this.addToCart({
          sku: this.sku,
          quantity: this.quantity,
        }).then(() => { this.isLoading = false; }, () => { this.isLoading = false; });
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-add-to-cart {
    &__quantity {
      display: inline-block;
      width: $spacing--100;
      margin-right: $spacing--10;
    }

    &__button {
      display: inline-block;
    }

    &__icon {
      path {
        fill: $color-secondary--2;
      }
    }

    &__icon--is-loading {
      display: none;
    }

    &__label {
      @include font($font-size: $font-size--14, $line-height: $spacing--30);

      color: $color-secondary--1;
      display: none;
    }

    &__label--has-label {
      display: inline;

      &.c-add-to-cart__label--is-loading {
        display: none;
      }
    }

    &__label--hover,
    &__label--focus,
    &__label--active {
      color: $color-grayscale--1000;
    }

    &__label--disabled {
      color: $color-grayscale--600;
    }

    &__progress {
      display: none;
    }

    &__progress--is-loading {
      display: inline;
    }
  }
</style>
