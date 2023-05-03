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
  import colors, { Colors } from '../../setup/js/color';
  import sColorItem from './s-color-item.vue';

  type Color = keyof Colors;

  export default defineComponent({
    name: 's-color',
    status: 0, // ODO: remove when component was prepared for current project.

    components: {
      sColorItem,
    },

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns an Object of color lists.
       */
      colors(): Colors {
        return colors;
      },

      /**
       * Returns an Array of color palette names.
       */
      palettes(): Color[] {
        return Object.keys(colors) as Array<Color>;
      },
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
  @use '../../setup/scss/variables';

  .s-color {
    font-family: variables.$font-family--primary;
  }
</style>
