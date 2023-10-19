<template>
  <svg v-if="inline"
       :class="b({ [icon]: true })"
       :width="viewBox.width"
       :height="viewBox.height"
       :aria-hidden="!alt"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       focusable="false"
       tabindex="-1"
  >
    <title v-if="alt">
      {{ alt }}
    </title>
    <use :xlink:href="`${spritePath}#${icon}`" />
  </svg>
  <img v-else
       :src="`${spritePath}#${icon}`"
       :alt="alt"
       :width="viewBox.width"
       :height="viewBox.height"
  >
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import spritePath from '@/assets/icons.svg';

  interface SizeLookup {
    [key: string]: number[];
  }

  interface Size {
    width: number;
    height: number;
  }

  const defaultSize = 24; // Keep size in sync with SCSS 'icon' mixin.
  const sizeLookup: SizeLookup = {
    play: [1024, 721],
  };

  /**
   * Places an svg sprite icon.
   */
  export default defineComponent({
    name: 'e-icon',

    // components: {},

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

      /**
       * Switches between inline and image use of the icon.
       */
      inline: {
        type: Boolean,
        default: true,
      },

      /**
       * Allows to set an alt tag to the image.
       */
      alt: {
        type: String,
        default: null,
      },
    },

    data() {
      return {
        /**
         * The local path to the svg sprite.
         */
        spritePath,
      };
    },

    computed: {
      /**
       * Returns a viewBox definition object.
       *
       * @returns {object}
       */
      viewBox(): Size {
        const { icon } = this;
        const size = this.size?.split(' ').map(sizeParameter => parseInt(sizeParameter, 10)) || [];
        const [
          lookupWidth, lookupHeight,
        ] = sizeLookup[icon] || [];
        const width = size[0] || defaultSize;
        let height = size[1];

        // Auto map height for non-square icons.
        if (!height && lookupWidth && lookupHeight) {
          height = (width / lookupWidth) * lookupHeight;
        }

        return {
          width,
          height: height || width,
        };
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
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .e-icon {
    display: block;
    pointer-events: none; // Prevents E11 from swallowing events.
  }
</style>
