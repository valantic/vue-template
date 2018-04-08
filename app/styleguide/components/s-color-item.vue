<template>
  <div :class="b('grid-item')">
    <div :class="b('color-wrapper')">
      <div :class="b('color')" :style="backgroundColor"></div>
    </div>
    <div :class="b('name')" v-html="display_name"></div>
    <div :class="b('value')">{{ display_value }}</div>
  </div>
</template>

<script>
  export default {
    name: 's-color-item',
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
      display_name() {
        return this.name.split(' - ').join('<br>');
      },
      display_value() {
        return this.value.join(' - ');
      },
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
  .s-color-item {
    display: inline-block;

    &__grid-item {
      overflow: hidden;
      border: 1px solid $color-primary--2;
      margin: $spacing--5;
      flex: 0 1 18%;

      &::before {
        display: block;
        content: "";
        float: left;
        width: 0;
        padding-top: 100%;
      }
    }

    &__color-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
    }

    &__color {
      min-width: 240px;
      height: 180px;
    }

    &__name {
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
