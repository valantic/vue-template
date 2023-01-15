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

  interface ISizeLookup {
    [key: string]: number[];
  }

  interface ISize {
    width: number;
    height: number;
  }

  const defaultSize = 24; // Keep size in sync with SCSS 'icon' mixin.
  const sizeLookup: ISizeLookup = {
    play: [1024, 721],
  };

  /**
   * Places an svg sprite icon.
   */
  export default defineComponent({
    name: 'e-icon',
    status: 0,

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
      viewBox(): ISize {
        const { icon } = this;
        const lookup = sizeLookup[icon];
        const size = this.size?.split(' ').map(sizeParameter => parseInt(sizeParameter, 10)) || [defaultSize];

        // Auto map height for non square icons.
        if (size.length === 1 && lookup) {
          size[1] = (size[0] / lookup[0]) * lookup[1];
        }

        return {
          width: size[0],
          height: size[1] || size[0],
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
    pointer-events: none; // Prevents IE11 from swallowing events.
  }
</style>
