<template>
  <div :class="b()">
    <e-input
      ref="quantity"
      :class="b('quantity')"
      @input="onInput"
      name="quantity"
      v-model="quantity"
    />
    <e-button
      :class="b('button')"
      primary
      width="auto"
      @click="onClick"
    ><e-icon icon="i-cart--blue"/></e-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

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
       * To distinguish items with the same sku
       */
      groupKey: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        quantity: "1",
      };
    },

    // computed: {},
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
        'addToCart': 'cart/addToCart',
      }),
      onClick() {
        this.addToCart({
          sku: this.sku,
          groupKey: this.groupKey,
          quantity: this.quantity,
        });
      },
      onInput(value) {
        /* very basic validation so we don't get any problems :) */
        this.quantity = value.replace(/[^0-9]/g,'');
        if (this.quantity === "" || this.quantity === "0")
          this.quantity = "1"
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-add-to-cart {
    &__quantity {
      display: inline-block;
      width: 100px;
      margin-right: $spacing--10;
    }
  }

  .e-button {
    padding-top: 2px;
    padding-bottom: 6px;
  }
</style>
