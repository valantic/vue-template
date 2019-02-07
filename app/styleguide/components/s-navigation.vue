<template>
  <div v-bem>
    <div v-bem:navigation-wrapper="wrapperModifiers" @click="onClick">
      <ul v-bem:navigation>
        <li v-bem:navigation-item.logo>
          <a v-bem:navigation-link
             href="http://www.valantic.com"
             target="_blank"
          >
            <img src="../assets/valantic.svg" alt="valantic">
          </a>
        </li>
        <li v-bem:navigation-item.language @click.stop>
          <s-language />
        </li>
        <li v-bem:navigation-item.theme @click.stop>
          <s-theme-selector />
        </li>
        <li v-bem:navigation-item.settings>
          <h2>Settings</h2>
          <s-demo-settings />
        </li>
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <router-link
          v-if="route.meta"
          v-for="route in routes"
          v-bem:navigation-item
          :key="route.name"
          :to="{ name: route.name }"
          :active-class="`${$options.name}-item--active-path`"
          :exact-active-class="`${$options.name}-item--active`"
          tag="li"
          exact>
          <a v-bem:navigation-link>
            {{ route.meta.title }}
          </a>
        </router-link>
        <li v-bem:navigation-item.components>
          <a v-bem:navigation-link
             :href="styleguidistUrl"
             target="_blank"
          >
            Components
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import sLanguage from './s-language';
  import sThemeSelector from './s-theme-selector';
  import sDemoSettings from './s-demo-settings';

  export default {
    name: 's-navigation',
    components: {
      sDemoSettings,
      sLanguage,
      sThemeSelector
    },
    props: {
      /**
       * An array of styleguide routes
       */
      routes: {
        type: Array,
        default: () => [],
      },

      /**
       * Position of navigation (top-right, top-left, bottom-left, bottom-right)
       */
      navPosition: {
        type: String,
        default: 'top-right',
        validator(value) {
          return [
            'top-left',
            'top-right',
            'bottom-right',
            'bottom-left',
          ].includes(value);
        },
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      styleguidistUrl() {
        return process.env.NODE_ENV === 'production'
          ? '/styleguidist'
          : '//localhost:6060';
      },

      /**
       * Returns all modifiers for the wrapper class.
       *
       * @returns {Object}
       */
      wrapperModifiers() {
        return {
          position: this.navPosition,
          open: this.isOpen,
        };
      }
    },
    methods: {
      onClick() {
        this.isOpen = !this.isOpen;
      }
    }
  };
</script>

<style lang="scss">
  $s-navigation--border: $spacing--10 solid $color-grayscale--400;
  $s-navigation--trigger-size: 40px;

  .s-navigation {
    &__navigation-wrapper {
      font-family: $font-family--primary;
      margin: auto;
      position: fixed;
      opacity: 0.2;
      min-width: $spacing--40;
      background-color: $color-grayscale--1000;
      z-index: 10000;
      height: 100%;

      &::before {
        content: '';
        position: absolute;
        width: $s-navigation--trigger-size;
        height: $s-navigation--trigger-size;
        background-color: $color-grayscale--1000;
        border-top: 1px solid $color-grayscale--400;
        border-left: 1px solid $color-grayscale--400;
        background-image: url('../assets/menu-button.svg');
        background-repeat: no-repeat;
        background-size: $s-navigation--trigger-size - 15px;
        background-position: center;
        cursor: pointer;
      }

      > * {
        display: none;
      }

      &--open {
        opacity: 1;

        > * {
          display: block;
        }
      }

      &--position-top-right,
      &--position-bottom-right {
        border-bottom: 0;
        min-width: 0;
        top: 0;
        right: 0;
        bottom: 0;

        &::before {
          top: 0;
          left: -$s-navigation--trigger-size;
        }

        &.s-navigation__navigation-wrapper--open {
          border-left: $s-navigation--border;
        }
      }

      &--position-bottom-right {
        &::before {
          top: auto;
          bottom: 0;
        }
      }

      &--position-top-left,
      &--position-bottom-left {
        border-bottom: 0;
        min-width: 0;
        top: 0;

        &::before {
          top: 0;
          left: 100%;
        }

        &.s-navigation__navigation-wrapper--open {
          border-right: $s-navigation--border;
        }
      }

      &--position-bottom-left {
        &::before {
          top: auto;
          bottom: 0;
        }
      }
    }

    &__navigation {
      @extend %list-reset;

      min-width: 200px;
      max-height: 100vh;
      overflow: auto;
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
    }

    &__navigation-link {
      padding: $spacing--10 $spacing--20;
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
