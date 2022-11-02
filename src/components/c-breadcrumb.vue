<template>
  <div :class="b()">
    <ul :class="b('list')">
      <li v-for="(item, index) in getItems"
          :key="`breadcrumb--${index}`"
          :class="b('item')"
      >
        <a :class="b('link')"
           :href="item.url"
           :title="$t('c-breadcrumb.linkTitle', { name: item.name })"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import breadcrumb, { TBreadcrumbStore, IBreadcrumbItem } from '@/stores/breadcrumb';

  interface ISetup {
    breadcrumbStore: TBreadcrumbStore
  }

  /**
   * Renders a list of breadcrumbs items from the store module.
   */
  export default defineComponent({
    name: 'c-breadcrumb',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},

    // props: {},
    // emits: {},

    setup(): ISetup {
      return {
        breadcrumbStore: breadcrumb(),
      };
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Returns an Array of breadcrumb items.
       */
      getItems(): readonly IBreadcrumbItem[] {
        return this.breadcrumbStore.getItems;
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
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .c-breadcrumb {
    @include mixins.font(variables.$font-size--12, 20px);

    color: variables.$color-grayscale--400;

    &__item {
      display: inline-block;

      &::after {
        content: '|';
        padding: 0 variables.$spacing--5;
      }
    }

    &__item:last-child {
      color: variables.$color-grayscale--200;

      &::after {
        content: '';
      }
    }

    &__link,
    &__link:hover,
    &__link:active {
      color: inherit;
      text-decoration: none;
    }

    &__link:hover {
      color: variables.$color-secondary--1;
    }
  }
</style>
