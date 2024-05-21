<template>
  <ul :class="b(componentModifiers)">
    <li
      v-for="route in filteredRoutes"
      :key="route.name"
      :class="b('navigation-item')"
    >
      <router-link
        :to="{ name: route.name, params: route.meta?.params, query: route.meta?.query }"
        :class="b('navigation-link')"
        :active-class="b('navigation-link', { activePath: true })"
        :exact-active-class="b('navigation-link', { active: true })"
        exact
      >
        {{ route.meta?.title }}
      </router-link>
      <s-navigation-block
        v-if="route.children && route.children.length"
        :routes="route.children"
        has-indent
      />
    </li>
  </ul>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  export default defineComponent({
    name: 's-navigation-block',
    // components: {},
    props: {
      /**
       * An array of styleguide routes.
       */
      routes: {
        type: Array as PropType<readonly RouteRecordRaw[]>,
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
       */
      componentModifiers(): Modifiers {
        return {
          hasIndent: this.hasIndent,
        };
      },

      /**
       * Returns an array of routes, that should be visible on the navigation.
       */
      filteredRoutes(): RouteRecordRaw[] {
        const filteredRoutes = this.routes.filter((route) => route.meta && !route.meta.hideInStyleguide);

        return filteredRoutes.sort((first, second) => {
          if (!first.meta || !second.meta) {
            return 0;
          }

          if (first.meta.title < second.meta.title) {
            return -1;
          }

          return second.meta.title < first.meta.title ? 1 : 0;
        });
      },
    },
    // methods: {},
    // created() {}
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  .s-navigation-block {
    min-width: 200px;
    overflow: auto;

    &--has-indent {
      padding-left: 20px;
    }

    &__navigation-link {
      display: block;
      padding: variables.$spacing--5 variables.$spacing--20;
      text-decoration: none;

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
