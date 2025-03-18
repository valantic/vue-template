<template>
  <div :class="b()">
    <div
      :class="b('navigation-wrapper', wrapperModifiers)"
      @click="onClick"
    >
      <div :class="b('viewport')">
        {{ $viewport.currentViewport }}
      </div>
      <ul :class="b('navigation')">
        <li :class="b('navigation-item', { logo: true })">
          <a
            :class="b('navigation-link')"
            href="https://www.valantic.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="@/styleguide/assets/valantic.svg"
              alt="valantic"
            />
          </a>
        </li>
        <li
          :class="b('navigation-item', { language: true })"
          @click.stop
        >
          <s-language />
        </li>
        <li
          :class="b('navigation-item', { theme: true })"
          @click.stop
        >
          <s-theme-selector />
        </li>
        <li :class="b('navigation-item', { settings: true })">
          <h2>Settings</h2>
          <s-demo-settings />
        </li>
        <li :class="b('navigation-item')">
          <s-navigation-filter
            v-model="navigationFilter"
            :is-open="isOpen"
          />
          <s-navigation-block :routes="routesFilteredByTitle" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';
  import sDemoSettings from './s-demo-settings.vue';
  import sLanguage from './s-language.vue';
  import sNavigationBlock from './s-navigation-block.vue';
  import sNavigationFilter from './s-navigation-filter.vue';
  import sThemeSelector from './s-theme-selector.vue';

  // type Setup = {};

  type Data = {
    isOpen: boolean;
    navigationFilter: string;
  };

  export default defineComponent({
    name: 's-navigation',

    components: {
      sDemoSettings,
      sLanguage,
      sThemeSelector,
      sNavigationBlock,
      sNavigationFilter,
    },
    props: {
      /**
       * Position of navigation (top-right, top-left, bottom-left, bottom-right)
       */
      navPosition: {
        type: String,
        default: 'top-right',
        validator: (value: string) => ['top-left', 'top-right', 'bottom-right', 'bottom-left'].includes(value),
      },
    },
    // setup(): Setup {
    //   return {
    //   };
    // },
    data(): Data {
      return {
        isOpen: false,
        navigationFilter: '',
      };
    },
    computed: {
      /**
       * Returns all modifiers for the wrapper class.
       */
      wrapperModifiers(): Modifiers {
        return {
          position: this.navPosition,
          open: this.isOpen,
        };
      },
      routesFilteredByTitle(): RouteRecordRaw[] {
        return this.filterRoutesByTitle(this.$router.options.routes, this.navigationFilter);
      },
    },
    methods: {
      /**
       * Click handler for the open button.
       */
      onClick() {
        this.isOpen = !this.isOpen;
      },

      /**
       * Filters the routes by their title.
       *
       * @param routes - Array of type RouteRecordRaw to be filtered
       * @param searchTerm - String (route.meta.title) to filter the routes by
       * @returns - Array of type RouteRecordRaw filtered by the searchTerm
       */
      filterRoutesByTitle(routes: readonly RouteRecordRaw[], searchTerm: string): RouteRecordRaw[] {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return routes.reduce((filteredRoutes: RouteRecordRaw[], route) => {
          const titleMatch = route.meta?.title?.toLowerCase().includes(lowerCaseSearchTerm);

          if (titleMatch) {
            // the route matches the search term
            filteredRoutes.push(route);
          } else if (route.children) {
            // the parent route does not match the search term, but its children might
            const matchingChildren = this.filterRoutesByTitle(route.children, searchTerm);

            if (matchingChildren.length > 0) {
              // a child route matches, add the parent route with the matching child routes
              filteredRoutes.push({
                ...route,
                children: matchingChildren,
              });
            }
          }

          return filteredRoutes;
        }, []);
      },
    },
  });
</script>

<style lang="scss">
  @use '@/setup/scss/variables';

  .s-navigation {
    $this: &;
    $border: variables.$va-spacing--10 solid var(--theme-color-grayscale--400);
    $trigger-size: 40px;

    z-index: 1;

    &__navigation-wrapper {
      position: fixed;
      min-width: variables.$va-spacing--40;
      height: 100%;
      margin: auto;
      background-color: var(--theme-color-grayscale--1000);
      font-family: variables.$va-font-family--text;

      &::after {
        // Toggle
        position: absolute;
        content: '';
        width: $trigger-size;
        height: $trigger-size;
        opacity: 0.2;
        border-top: 1px solid var(--theme-color-grayscale--400);
        border-left: 1px solid var(--theme-color-grayscale--400);
        background-color: var(--theme-color-grayscale--1000);
        background-image: url('../assets/menu-button.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: $trigger-size - 15px;
        cursor: pointer;
      }

      > * {
        display: none;
      }

      &--open {
        &::after {
          opacity: 1;
        }

        > * {
          display: block;
        }
      }

      &--position-top-right,
      &--position-bottom-right {
        top: 0;
        right: 0;
        bottom: 0;
        min-width: 0;
        border-bottom: 0;

        &::after {
          top: 0;
          left: -$trigger-size;
        }

        &.s-navigation__navigation-wrapper--open {
          border-left: $border;
        }
      }

      &--position-bottom-right {
        &::after {
          top: auto;
          bottom: 0;
        }
      }

      &--position-top-left,
      &--position-bottom-left {
        top: 0;
        min-width: 0;
        border-bottom: 0;

        &::after {
          top: 0;
          left: 100%;
        }

        &.s-navigation__navigation-wrapper--open {
          border-right: $border;
        }
      }

      &--position-bottom-left {
        &::after {
          top: auto;
          bottom: 0;
        }
      }
    }

    &__viewport {
      position: absolute;
      left: 0;
      display: block;
      padding-right: variables.$va-spacing--10;
      transform: translateX(-100%);
      color: var(--theme-color-grayscale--1000);
      text-shadow: 1px 1px 5px var(--theme-color-grayscale--0);

      #{$this}__navigation-wrapper--open & {
        padding-right: variables.$va-spacing--20;
      }
    }

    &__navigation {
      min-width: 200px;
      max-height: 100vh;
      overflow: auto;
    }

    &__navigation-item {
      &--components {
        border-top: 1px solid var(--theme-color-grayscale--400);
      }

      &--language,
      &--theme,
      &--settings {
        padding: variables.$va-spacing--10 variables.$va-spacing--20;
        border-bottom: 1px solid var(--theme-color-grayscale--400);
      }

      &--active,
      &--active-path {
        font-weight: 700;
      }
    }

    &__navigation-link {
      display: block;
      padding: variables.$va-spacing--10 variables.$va-spacing--20;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__navigation-item--logo {
      padding: 0 variables.$va-spacing--15;
      border-bottom: 1px solid var(--theme-color-grayscale--400);

      img {
        max-width: 150px;
      }

      .s-navigation__navigation-link {
        padding: variables.$va-spacing--10 variables.$va-spacing--5;
      }
    }
  }
</style>
