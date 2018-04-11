<template>
  <div :class="b()">
    <h4 :class="b('headline')">{{ headline }}</h4>
    <div :class="b('grid')">
      <s-color-item
        v-for="(color, index) in colors"
        :name="color.name"
        :value="color.value"
        :key="index"/>
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

      /**
       * Palette name to be rendered. See keys in app/setup/js/color.js
       */
      palette: {
        type: String,
        default: null,
        required: true
      },

      /**
       * Array of color objects to be rendered. See app/setup/js/color.js
       */
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
    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: $spacing--0 -$spacing--5;
    }

    &__headline {
      text-transform: capitalize;
    }
  }
</style>
