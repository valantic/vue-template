<template>
  <div :class="b()">
    <h4 :class="b('headline')">
      {{ headline }}
    </h4>
    <ul :class="b('grid')">
      <li v-for="color in colors"
          :key="color.name"
          :class="b('grid-item')"
      >
        <s-color-specimen
          :name="color.name"
          :value="color.value"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import sColorSpecimen from './s-color-specimen.vue';

  interface IColor {
    name: string;
    value: string[];
  }

  export default defineComponent({
    name: 's-color-item',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sColorSpecimen,
    },

    props: {

      /**
       * Palette name to be rendered. See keys in src/setup/js/color.js
       */
      palette: {
        type: String,
        default: null,
        required: true,
      },

      /**
       * Array of color objects to be rendered. See src/setup/js/color.js
       */
      colors: {
        type: Array as PropType<IColor[]>,
        default: null,
        required: true,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns the headline for the component.
       */
      headline(): string {
        return `${this.palette} colors`;
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
  @use 'sass:math';
  @use '../../setup/scss/variables';
  @use '../../setup/scss/mixins';

  .s-color-item {
    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: variables.$spacing--0 (-(variables.$spacing--5));
    }

    &__grid-item {
      flex: 0 1 percentage(math.div(6, 12));
      max-width: 200px;
      padding: variables.$spacing--5;

      @include mixins.media(sm) {
        flex-basis: percentage(math.div(4, 12));
      }

      @include mixins.media(md) {
        flex-basis: percentage(math.div(2, 12));
      }
    }

    &__headline {
      text-transform: capitalize;
    }
  }
</style>
