<template>
  <div :class="b()">
    <div
      :class="b('color')"
      :style="backgroundColor"
    ></div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-html="displayName"
      :class="b('name')"
    ></div>
    <!-- eslint-enable vue/no-v-html -->
    <div :class="b('value')">
      {{ displayValue }}
    </div>
  </div>
</template>

<script lang="ts">
  import { PropType, StyleValue, defineComponent } from 'vue';

  /**
   * Renders a color specimen tile.
   *
   * **WARNING: uses 'v-html' for the 'displayName'. Make sure, that the source for this data is trustworthy.**
   */

  export default defineComponent({
    name: 's-color-specimen',

    // components: {},

    props: {
      /**
       * Human readable name of the color
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Array of color values provided in hex format (#ff0000).
       * If 2 values are given it will be treated as gradient.
       */
      value: {
        type: Array as PropType<string[]>,
        required: true,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns the name HTML of the color.
       */
      displayName(): string {
        return this.name.split(' - ').join('<br />');
      },

      /**
       * Returns the value HTML of the color.
       */
      displayValue(): string {
        return this.value.join(' - ');
      },

      /**
       * Returns the background style for the color.
       */
      backgroundColor(): StyleValue {
        const [color1, color2] = this.value;

        return {
          background: `linear-gradient(to right, ${color1} , ${color2 || color1})`,
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  .s-color-specimen {
    border: 1px solid variables.$color-secondary--1;

    &__color {
      padding-top: 100%;
    }

    &__name {
      font-size: 14px;
      font-weight: bold;
      line-height: 24px;
      text-align: center;
      white-space: nowrap;
    }

    &__value {
      font-size: 12px;
      line-height: 22px;
      text-align: center;
    }
  }
</style>
