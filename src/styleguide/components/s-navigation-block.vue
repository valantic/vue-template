<template>
  <ul :class="b(componentModifiers)">
    <router-link
      v-for="route in filteredRoutes"
      :key="route.name"
      :class="b('navigation-item')"
      :to="{ name: route.name, params: { id: '123' } }"
      :active-class="b('navigation-item', { activePath: true })"
      :exact-active-class="b('navigation-item', { active: true })"
      tag="li"
      exact
    >
      <a :class="b('navigation-link')">
        {{ route.meta.title }}
      </a>
      <s-navigation-block v-if="route.children && route.children.length"
                          :routes="route.children"
                          has-indent
      />
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: 's-navigation-block',
    // components: {},
    props: {
      /**
       * An array of styleguide routes.
       */
      routes: {
        type: Array,
        default: () => [],
      },

      /**
       * Defines if the component should have an extra indentation.
       */
      hasIndent: {
        type: Boolean,
        default: false,
      },
    },
    // data() {},
    computed: {
      /**
       * Returns all modifiers for the component main class.
       *
       * @returns {Object}
       */
      componentModifiers() {
        return {
          hasIndent: this.hasIndent,
        };
      },

      /**
       * Returns an array of routes, that should be visible on the navigation.
       *
       * @returns {Array.<Object>}
       */
      filteredRoutes() {
        return this.routes.filter(route => route.meta && !route.meta.hideInStyleguide);
      }
    },
    // methods: {},
    // created() {}
  };
</script>

<style lang="scss">
  .s-navigation-block {
    @extend %list-reset;

    min-width: 200px;
    overflow: auto;

    &--has-indent {
      padding-left: 20px;
    }

    &__navigation-item {
      &--components {
        border-top: 1px solid $color-grayscale--400;
      }

      &--language,
      &--theme,
      &--settings {
        padding: $spacing--10 $spacing--20;
        border-bottom: 1px solid $color-grayscale--400;
      }

      &--active,
      &--active-path {
        font-weight: bold;
      }
    }

    &__navigation-link {
      padding: $spacing--5 $spacing--20;
      text-decoration: none;
      display: block;

      &:hover {
        text-decoration: underline;
      }
    }

    &__navigation-item--logo {
      border-bottom: 1px solid $color-grayscale--400;

      img {
        max-width: 150px;
      }

      .s-navigation__navigation-link {
        padding: $spacing--10 $spacing--5;
      }
    }
  }
</style>
