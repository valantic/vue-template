<template>
  <div :class="b()">
    <s-color-item
      v-for="palette in palettes"
      :key="palette"
      :palette="palette"
      :colors="colors[palette]"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import colors from '../../setup/js/color';
  import sColorItem from './s-color-item.vue';

  export default defineComponent({
    name: 's-color',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sColorItem
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns an Object of color lists.
       *
       * @returns {Object}
       */
      colors() {
        return colors;
      },

      /**
       * Returns an Array of color palette names.
       *
       * @returns {Array.<String>}
       */
      palettes() {
        return Object.keys(colors);
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .s-color {
    font-family: $font-family--primary;
  }
</style>
