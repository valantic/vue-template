<template>
  <div :class="b()">
    <div :class="b('color')" :style="backgroundColor"></div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="displayName" :class="b('name')"></div>
    <div :class="b('value')">
      {{ displayValue }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-color-specimen',
    status: 0,

    // components: {},
    // mixins: [],

    props: {

      /**
       * Human readable name of the color
       */
      name: {
        type: String,
        default: null,
        required: true
      },

      /**
       * Array of color values provided in hex format (#ff0000).
       * If 2 values are given it will be treated as gradient.
       */
      value: {
        type: Array,
        default: null,
        required: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns the name HTML of the color.
       *
       * @returns {String}
       */
      displayName() {
        return this.name.split(' - ').join('<br />');
      },

      /**
       * Returns the value HTML of the color.
       *
       * @returns {String}
       */
      displayValue() {
        return this.value.join(' - ');
      },

      /**
       * Returns the background style for the color.
       *
       * @returns {String}
       */
      backgroundColor() {
        const [color1, color2] = this.value;

        return {
          background: `linear-gradient(to right, ${color1} , ${color2 || color1})`
        };
      }
    }
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
  .s-color-specimen {
    border: 1px solid $color-secondary--1;

    &__color {
      padding-top: 100%;
    }

    &__name {
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      line-height: 24px;
      font-weight: bold;
    }

    &__value {
      text-align: center;
      font-size: 12px;
      line-height: 22px;
    }
  }
</style>
