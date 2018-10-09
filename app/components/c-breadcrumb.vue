<template>
  <div :class="b()">
    <ul :class="b('list')">
      <li v-for="(item, index) in items"
          :key="`breadcrumb--${index}`"
          :class="b('item')">
        <a :class="b('link')"
           :href="item.url"
           :title="$t('c-breadcrumb.linkTitle', { name: item.name })">{{ item.name }}</a>
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
    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('breadcrumb', [
        'items',
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
  .c-breadcrumb {
    @include font($font-size--12, 20px);

    color: $color-grayscale--400;

    &__list {
      @extend %list-reset;
    }

    &__item {
      display: inline-block;

      &::after {
        content: '|';
        padding: 0 $spacing--5;
      }
    }

    &__item:last-child {
      color: $color-grayscale--200;

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
      color: $color-secondary--1;
    }
  }
</style>
