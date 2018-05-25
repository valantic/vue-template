<template>
  <div :class="b()">
    <div :class="b('navigation-wrapper', { position: navPosition, open: isOpen })" @click="onClick">
      <ul :class="b('navigation')">
        <li :class="b('navigation-item', { logo: true })">
          <a :class="b('navigation-link')"
             href="http://www.valantic.com"
             target="_blank"
          >
            <img src="../assets/valantic.svg" alt="valantic">
          </a>
        </li>
        <li :class="b('navigation-item', { language: true })" @click.stop>
          <s-language/>
        </li>
        <li :class="b('navigation-item', { theme: true })" @click.stop>
          <s-theme-selector/>
        </li>
        <router-link
          v-for="route in routes"
          v-if="route.meta"
          :key="route.name"
          :to="{ name: route.name }"
          :class="b('navigation-item')"
          :active-class="`${$options.name}-item--active-path`"
          :exact-active-class="`${$options.name}-item--active`"
          tag="li"
          exact>
          <a :class="b('navigation-link')">{{ route.meta.title }}</a>
        </router-link>
        <li :class="b('navigation-item', { components: true })">
          <a :class="b('navigation-link')"
             :href="styleguidistUrl"
             target="_blank"
          >Components</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import SLanguage from './s-language';
  import SThemeSelector from './s-theme-selector';

  export default {
    name: 's-navigation',
    components: {
      SLanguage,
      SThemeSelector
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
    },
    methods: {
      onClick() {
        this.isOpen = !this.isOpen;
      }
    }
  };
</script>

<style lang="scss">
  $s-navigation--border: $spacing--10 solid $color-status--danger;
  $s-navigation--trigger-size: 40px;

  .s-navigation {
    &__navigation-wrapper {
      font-family: $font-family--primary;
      margin: auto;
      position: fixed;
      opacity: 0.2;
      min-width: $spacing--40;
      background: $color-primary--3;
      z-index: 10000;
      height: 100%;

      &::before {
        content: '';
        position: absolute;
        width: $s-navigation--trigger-size;
        height: $s-navigation--trigger-size;
        background-color: $color-status--danger;
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
      padding: 0;
      list-style: none;
      margin: 0;
      min-width: 200px;
    }

    &__navigation-item {
      &--components {
        border-top: 1px solid $color-grayscale--400;
      }

      &--language,
      &--theme {
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
