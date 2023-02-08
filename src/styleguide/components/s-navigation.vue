<template>
  <div :class="b()">
    <div :class="b('navigation-wrapper', wrapperModifiers)" @click="onClick">
      <div :class="b('viewport')">
        {{ $viewport.currentViewport }}
      </div>
      <ul :class="b('navigation')">
        <li :class="b('navigation-item', { logo: true })">
          <a :class="b('navigation-link')"
             href="https://www.valantic.com"
             target="_blank"
             rel="noopener noreferrer"
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
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';
  import sLanguage from './s-language.vue';
  import sThemeSelector from './s-theme-selector.vue';
  import sDemoSettings from './s-demo-settings.vue';
  import sNavigationBlock from './s-navigation-block.vue';

  interface IData {
    isOpen: boolean;
  }

  export default defineComponent({
    name: 's-navigation',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sDemoSettings,
      sLanguage,
      sThemeSelector,
      sNavigationBlock,
    },
    props: {
      /**
       * Position of navigation (top-right, top-left, bottom-left, bottom-right)
       */
      navPosition: {
        type: String,
        default: 'top-right',
        validator: (value: string) => [
          'top-left',
          'top-right',
          'bottom-right',
          'bottom-left',
        ].includes(value),
      },
    },
    data(): IData {
      return {
        isOpen: false,
      };
    },
    computed: {
      /**
       * Returns all modifiers for the wrapper class.
       */
      wrapperModifiers(): IModifiers {
        return {
          position: this.navPosition,
          open: this.isOpen,
        };
      },
    },
    methods: {
      /**
       * Click handler for the open button.
       */
      onClick() {
        this.isOpen = !this.isOpen;
      },
    },
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  .s-navigation {
    $this: &;
    $border: variables.$spacing--10 solid variables.$color-grayscale--400;
    $trigger-size: 40px;

    z-index: 1;

    &__navigation-wrapper {
      position: fixed;
      min-width: variables.$spacing--40;
      height: 100%;
      margin: auto;
      background-color: variables.$color-grayscale--1000;
      font-family: variables.$font-family--primary;

      &::after { // Toggle
        position: absolute;
        content: '';
        width: $trigger-size;
        height: $trigger-size;
        opacity: 0.2;
        border-top: 1px solid variables.$color-grayscale--400;
        border-left: 1px solid variables.$color-grayscale--400;
        background-color: variables.$color-grayscale--1000;
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
      padding-right: variables.$spacing--10;
      transform: translateX(-100%);
      color: variables.$color-grayscale--1000;
      text-shadow: 1px 1px 5px variables.$color-grayscale--0;

      #{$this}__navigation-wrapper--open & {
        padding-right: variables.$spacing--20;
      }
    }

    &__navigation {
      min-width: 200px;
      max-height: 100vh;
      overflow: auto;
    }

    &__navigation-item {
      &--components {
        border-top: 1px solid variables.$color-grayscale--400;
      }

      &--language,
      &--theme,
      &--settings {
        padding: variables.$spacing--10 variables.$spacing--20;
        border-bottom: 1px solid variables.$color-grayscale--400;
      }

      &--active,
      &--active-path {
        font-weight: 700;
      }
    }

    &__navigation-link {
      display: block;
      padding: variables.$spacing--10 variables.$spacing--20;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__navigation-item--logo {
      padding: 0 variables.$spacing--15;
      border-bottom: 1px solid variables.$color-grayscale--400;

      img {
        max-width: 150px;
      }

      .s-navigation__navigation-link {
        padding: variables.$spacing--10 variables.$spacing--5;
      }
    }
  }
</style>
