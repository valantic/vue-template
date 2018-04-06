<template>
  <div :class="b()">
    <h4 :class="b('headline')">{{ headline }}</h4>
    <div :class="b('grid')">
      <s-color-item v-for="(color, index) in colors" :color="color" :key="index"/>
    </div>
  </div>
</template>

<script>

  import sColorItem from './s-color-item';

  export default {
    name: 's-palette-item',
    components: {
      's-color-item': sColorItem
    },
    // mixins: [],

    props: {
      palette: {
        type: String,
        default: null,
        required: true
      },
      colors: {
        type: Array,
        default: null,
        required: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      headline() {
        return `${this.palette} colors`;
      }
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .s-palette-item {
    display: inline-block;
    width: 100%;

    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
    }

    &__headline {
      text-transform: capitalize;
    }
  }
</style>
