<template>
  <div :class="b()">
    <div :class="b('navigation-wrapper', wrapperModifiers)" @click="onClick">
      <div :class="b('viewport')">
        {{ $viewport.currentViewport }}<sup>{{ $viewport.viewport }}</sup>
      </div>
      <ul :class="b('navigation')">
        <li :class="b('navigation-item', { logo: true })">
          <a :class="b('navigation-link')"
             href="http://www.valantic.com"
             target="_blank"
          >
            <img src="@/assets/valantic.svg" alt="valantic">
          </a>
        </li>
        <li :class="b('navigation-item', { language: true })" @click.stop>
          <s-language />
        </li>
        <li :class="b('navigation-item', { theme: true })" @click.stop>
          <s-theme-selector />
        </li>
        <li :class="b('navigation-item', { settings: true })">
          <h2>Settings</h2>
          <s-demo-settings />
        </li>
        <li :class="b('navigation-item')">
          <s-navigation-block :routes="$router.options.routes" />
        </li>
        <li :class="b('navigation-item', { components: true })">
          <a :class="b('navigation-link')"
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
  import sNavigationBlock from './s-navigation-block';

  export default {
    name: 's-navigation',
    status: 0,

    components: {
      sDemoSettings,
      sLanguage,
      sThemeSelector,
      sNavigationBlock,
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
      /**
       * Returns the styleguidest url, based on the current environment.
       *
       * @returns {String}
       */
      styleguidistUrl() {
        return process.env.IS_STYLEGUIDE_BUILD
          ? './styleguidist'
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
      /**
       * Click handler for the open button.
       */
      onClick() {
        this.isOpen = !this.isOpen;
      }
    }
  };
</script>

<style lang="scss">
  .s-navigation {
    $this: &;
    $border: $spacing--10 solid $color-grayscale--400;
    $trigger-size: 40px;

    &__navigation-wrapper {
      font-family: $font-family--primary;
      margin: auto;
      position: fixed;
      opacity: 0.2;
      min-width: $spacing--40;
      background-color: $color-grayscale--1000;
      z-index: 10000;
      height: 100%;

      &::after { // Toggle
        content: '';
        position: absolute;
        width: $trigger-size;
        height: $trigger-size;
        background-color: $color-grayscale--1000;
        border-top: 1px solid $color-grayscale--400;
        border-left: 1px solid $color-grayscale--400;
        background-image: url('../assets/menu-button.svg');
        background-repeat: no-repeat;
        background-size: $trigger-size - 15px;
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
        border-bottom: 0;
        min-width: 0;
        top: 0;

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
      display: block;
      position: absolute;
      left: 0;
      transform: translateX(-100%);
      padding-right: $spacing--10;
      text-shadow: 0 0 3px $color-grayscale--1000;

      #{$this}__navigation-wrapper--open & {
        padding-right: $spacing--20;
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

      &--active,
      &--active-path {
        font-weight: 700;
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
      padding: 0 $spacing--15;

      img {
        max-width: 150px;
      }

      .s-navigation__navigation-link {
        padding: $spacing--10 $spacing--5;
      }
    }
  }
</style>
