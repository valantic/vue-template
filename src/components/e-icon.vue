<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :class="b({ [icon]: true} )"
       :width="width || size"
       :height="height || size"
       focusable="false"
       tabindex="-1"
  >
    <use :xlink:href="`${filePath}#${icon}`" />
  </svg>
</template>

<script>
  const filePath = require.context('../assets/', false, /\.svg/)('./icons.svg');
  const defaultSize = 24;

  /**
   * Places an svg sprite icon.
   *
   * TODO: gradients in SVG files break.
   * TODO: add color picker for icon grid.
   */
  export default {
    name: 'e-icon',
    status: 0,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Name of the svg icon
       */
      icon: {
        type: String,
        required: true,
      },

      /**
       * Sets width and height at once.
       */
      size: {
        type: [String, Number],
        default: defaultSize,
      },

      /**
       * Custom width value
       */
      width: {
        type: [String, Number],
        default: null,
      },

      /**
       * Custom height value
       */
      height: {
        type: [String, Number],
        default: null,
      },
    },

    data() {
      return {
        filePath,
      };
    },

    // computed: {},
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
.e-icon {
  display: block;
  pointer-events: none; // Prevents IE11 from swallowing events.
}
</style>
