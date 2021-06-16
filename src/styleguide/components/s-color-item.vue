<template>
  <div :class="b()">
    <h4 :class="b('headline')">
      {{ headline }}
    </h4>
    <ul :class="b('grid')">
      <li v-for="(color) in colors"
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
  import sColorSpecimen from './s-color-specimen.vue';

  export default {
    name: 's-color-item',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sColorSpecimen
    },
    // mixins: [],

    props: {

      /**
       * Palette name to be rendered. See keys in src/setup/js/color.js
       */
      palette: {
        type: String,
        default: null,
        required: true
      },

      /**
       * Array of color objects to be rendered. See src/setup/js/color.js
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
      /**
       * Returns the headline for the component.
       *
       * @returns {String}
       */
      headline(): string {
        return `${this.palette} colors`;
      }
    },
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  };
</script>

<style lang="scss">
  .s-color-item {
    &__grid {
      @extend %list-reset;

      display: flex;
      flex-wrap: wrap;
      margin: $spacing--0 (-$spacing--5);
    }

    &__grid-item {
      padding: $spacing--5;
      flex: 0 1 percentage(6 / 12);
      max-width: 200px;

      @include media(sm) {
        flex-basis: percentage(4 / 12);
      }

      @include media(md) {
        flex-basis: percentage(2 / 12);
      }
    }

    &__headline {
      text-transform: capitalize;
    }
  }
</style>
