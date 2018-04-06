<template>
  <div :class="b('grid-item')">
    <div :class="b('color-wrapper')">
      <div :class="b('color')" :style="backgroundColor"></div>
    </div>
    <div :class="b('name')" v-html="name"></div>
    <div :class="b('value')">{{ value }}</div>
  </div>
</template>

<script>
  export default {
    name: 's-color-item',
    // components: {},
    // mixins: [],

    props: {
      color: {
        type: Object,
        default: null,
        required: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      name() {
        return this.color.name.split(' - ').join('<br>');
      },
      value() {
        return this.color.value.join(' - ');
      },
      backgroundColor() {
        let [color1, color2] = this.color.value;

        if (!color2) {
          color2 = color1;
        }

        return `background: linear-gradient(to right, ${color1} , ${color2};`;
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
      border: 1px solid #000000;
      margin: 5px;
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
      width: 240px;
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
