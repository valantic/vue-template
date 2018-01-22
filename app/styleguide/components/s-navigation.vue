<template>
  <div :class="b()">
    <div :class="b('navigation-wrapper', {position: navPosition})">
      <ul :class="b('navigation')">
        <li :class="b('navigation-item', {logo: true})">
          <a :class="b('navigation-link')" href="http://www.derverstaerker.ch" target="_blank">
            <img src="../assets/logo.png" alt="Verstärker">
          </a>
        </li>
        <router-link
            v-for="route in routes"
            v-if="route.meta"
            tag="li"
            :key="route.name"
            :to="{name: route.name}"
            :class="b('navigation-item')"
            :active-class="`${$options.name}-item--active-path`"
            :exact-active-class="`${$options.name}-item--active`"
            exact>
          <a :class="b('navigation-link')">{{route.meta.title}}</a>
        </router-link>
        <li :class="b('navigation-item', {components: true})">
          <a :class="b('navigation-link')" :href="styleguidistUrl" target="_blank">Components</a>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 's-navigation',
    props: {
      /**
       * An array of styleguide routes
       */
      routes: {
        type: Array,
      },
      /**
       * Position of navigation (top, right, bottom, left, top-right, top-left, ...)
       */
      navPosition: {
        type: String,
        default: 'top',
        validator: value => ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-right', 'bottom-left'].indexOf(value) >= 0,
      },
    },
    computed: {
      styleguidistUrl() {
        return WP_PRODUCTION
          ? '/styleguidist'
          : '//localhost:6060';
      },
    },
  };
</script>

<style lang="scss">
  $s-navigation--border: 10px solid red;

  .s-navigation {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    max-width: 1200px;
    margin: auto;

    &__navigation-wrapper {
      position: fixed;
      opacity: 0.2;
      border-bottom: $s-navigation--border;
      min-width: 40px;
      background: white;

      > * {
        display: none;
      }

      &:hover {
        opacity: 1;

        > * {
          display: block;
        }
      }

      &--position-top-left,
      &--position-top {
        top: 0;
        left: 0;
      }

      &--position-top-right,
      &--position-right {
        top: 0;
        right: 0;
      }

      &--position-bottom-right,
      &--position-bottom {
        bottom: 0;
        right: 0;
      }

      &--position-bottom-left,
      &--position-left {
        bottom: 0;
        left: 0;
      }

      &--position-top {
        right: 0;
      }

      &--position-right {
        border-left: $s-navigation--border;
        border-bottom: 0;
        min-width: 0;
        bottom: 0;
      }

      &--position-bottom {
        left: 0;
      }

      &--position-left {
        border-right: $s-navigation--border;
        border-bottom: 0;
        min-width: 0;
        top: 0;
      }
    }

    &__navigation {
      padding: 0;
      list-style: none;
      margin: 0;
    }

    &__navigation-item {
      &--components {
        border-top: 1px solid #333;
      }

      &--logo {
        border-bottom: 1px solid #333;
      }
    }

    &__navigation-link {
      padding: 10px 20px;
      text-decoration: none;
      display: block;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
