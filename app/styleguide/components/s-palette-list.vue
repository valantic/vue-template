<template>
  <div :class="b()">
    <s-palette-item
      v-for="palette in palettes"
      :palette="palette"
      :colors="colors[palette]"
      :key="palette"/>
  </div>
</template>

<script>

  import _colors from '../../setup/js/_color';
  import sPaletteItem from './s-palette-item';

  export default {

    name: 's-palette-list',
    components: {
      's-palette-item': sPaletteItem
    },
    // mixins: [],

    props: {
      palette: {
        type: String,
        default: null,
        required: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      colors() {
        return _colors;
      },
      palettes() {
        return Object.keys(_colors);
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
  .s-palette-list {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
