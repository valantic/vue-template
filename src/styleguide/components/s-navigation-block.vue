<template>
  <ul :class="b(componentModifiers)">
    <li v-for="route in filteredRoutes"
        :key="route.name"
        :class="b('navigation-item')"
    >
      <router-link
        :to="{ name: route.name, params: route.meta.params, query: route.meta.query }"
        :class="b('navigation-link')"
        :active-class="b('navigation-link', { activePath: true })"
        :exact-active-class="b('navigation-link', { active: true })"
        exact
      >
        {{ route.meta.title }}
      </router-link>
      <s-navigation-block v-if="route.children && route.children.length"
                          :routes="route.children"
                          has-indent
      />
    </li>
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
      },
    },
    // methods: {},
    // created() {}
  };
</script>

<style lang="scss">
  @use '../../setup/scss/variables';
  // TODO replace @extend by mixin
  // stylelint-disable-next-line no-invalid-position-at-import-rule
  @import '../../setup/scss/extends/list-reset';

  .s-navigation-block {
    min-width: 200px;
    overflow: auto;

    &--has-indent {
      padding-left: 20px;
    }

    &__navigation-link {
      padding: variables.$spacing--5 variables.$spacing--20;
      text-decoration: none;
      display: block;

      &:hover {
        text-decoration: underline;
      }

      &--active,
      &--active-path {
        font-weight: bold;
      }
    }
  }
</style>
