<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :class="b({ [icon]: true } )"
       :viewBox="`0 0 ${viewBox.width} ${viewBox.height}`"
       :width="viewBox.width"
       :height="viewBox.height"
       focusable="false"
       tabindex="-1"
  >
    <use :xlink:href="`${filePath}#${icon}`" />
  </svg>
</template>

<script>
  const filePath = require.context('../assets/', false, /icons\.svg/)('./icons.svg');
  const defaultSize = 24; // Keep size in sync with SCSS 'icon' mixin.
  const sizeLookup = {
    valantic: [160, 36]
  };

  /**
   * Places an svg sprite icon.
   *
   * TODO: Resizing tests.
   * TODO: test icon replace.
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
       * Sets the width and height of the svg icon.
       */
      size: {
        type: String,
        default: null,
      },
    },

    data() {
      return {
        /**
         * The local path to the svg sprite.
         */
        filePath,
      };
    },

    computed: {
      /**
       * Returns a viewBox definition object.
       *
       * @returns {Object}
       */
      viewBox() {
        const size = this.size?.split(' ') || sizeLookup[this.icon] || [defaultSize, defaultSize];

        return {
          width: size[0],
          height: size[1] || size[0],
        };
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
.e-icon {
  display: block;
  pointer-events: none; // Prevents IE11 from swallowing events.
}
</style>
