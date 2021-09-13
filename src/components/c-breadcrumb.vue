<template>
  <div :class="b()">
    <ul :class="b('list')">
      <li v-for="(item, index) in getItems"
          :key="`breadcrumb--${index}`"
          :class="b('item')">
        <a :class="b('link')"
           :href="item.url"
           :title="$t('c-breadcrumb.linkTitle', { name: item.name })">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  /**
   * Renders a list of breadcrumbs items from the store module.
   */
  export default {
    name: 'c-breadcrumb',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('breadcrumb', [
        'getItems',
      ]),
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
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';
  // TODO replace @extend my mixin
  // stylelint-disable-next-line no-invalid-position-at-import-rule
  @import '../setup/scss/extends/list-reset';

  .c-breadcrumb {
    @include mixins.font(variables.$font-size--12, 20px);

    color: variables.$color-grayscale--400;

    &__list {
      @extend %list-reset;
    }

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
