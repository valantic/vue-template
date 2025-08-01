<template>
  <l-vas-layout :class="b()">
    <div :class="b('color-grid')">
      <div
        v-for="variant in colorVariants"
        :key="variant.name"
        :class="b('section')"
      >
        <h3>{{ variant.name }}</h3>
        <div :class="b('color-wrapper')">
          <div
            v-for="color in variant.colors"
            :key="color"
            :class="b('color-sample')"
            :style="{ background: `var(${color}, #ffffff)` }"
          >
            <span :class="b('color-name')">
              {{ color }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';

  export default {
    name: 'r-colors',

    components: {
      lVasLayout,
    },
    // mixins: [ ],

    // props: {},
    // data() {
    //   return {
    //   };
    // },

    computed: {
      colorVariants() {
        return [
          {
            name: 'grayscale',
            colors: [
              '--theme-color-grayscale--0',
              '--theme-color-grayscale--100',
              '--theme-color-grayscale--200',
              '--theme-color-grayscale--300',
              '--theme-color-grayscale--400',
              '--theme-color-grayscale--500',
              '--theme-color-grayscale--600',
              '--theme-color-grayscale--700',
              '--theme-color-grayscale--800',
              '--theme-color-grayscale--900',
              '--theme-color-grayscale--950',
              '--theme-color-grayscale--1000',
            ],
          },
          {
            name: 'primary colors',
            colors: ['--theme-color-primary--1', '--theme-color-primary--2', '--theme-color-primary--3'],
          },
          {
            name: 'secondary colors',
            colors: [
              '--theme-color-secondary--1',
              '--theme-color-secondary--2',
              '--theme-color-secondary--3',
              '--theme-color-secondary--4',
              '--theme-color-secondary--5',
            ],
          },
          {
            name: 'special colors',
            colors: [
              '--theme-color-status--success',
              '--theme-color-status--danger',
              '--theme-color-status--error',
              '--theme-color-status--info',
            ],
          },
        ];
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() { },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .r-colors {
    &__color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    }

    &__color-wrapper {
      display: flex;
      flex-direction: column;
      max-width: 20rem;
      border: 1px solid var(--theme-color-grayscale--0);
    }

    &__color-sample {
      position: relative;
      height: 4rem;
      border-bottom: 1px solid var(--theme-color-grayscale--0);

      &:last-child {
        border-bottom: 0;
      }
    }

    &__color-name {
      position: absolute;
      top: 0;
      right: 0;
      padding: 3px;
      background-color: var(--theme-color-grayscale--1000);
      color: var(--theme-color-grayscale--100);
      font-size: 0.75rem;
    }
  }
</style>
