<template>
  <div :class="b({ state, displayType })">
    <div :class="b('inner')">
      <c-notification
        v-for="notification in notifications"
        :selector="selector"
        :key="notification.id"
        :notification="notification"
        :display-type="displayType"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import cNotification from '@/components/c-notification';

  /**
   * Container for rendering notifications. See /styleguide/notifications for demo.
   */
  export default {
    name: 'c-notification-container',
    components: {
      cNotification,
    },
    // mixins: [],

    props: {
      /**
       * Sets the display type which defines how the notifications are being rendered.
       *
       * Valid values: `global`, `modal`, `field`, `add-to-cart`, `selector`.
       */
      displayType: {
        type: String,
        default: 'global',
        validator(value) {
          return [
            'global',
            'modal',
            'field',
            'add-to-cart',
            'selector'
          ].includes(value);
        }
      },

      /**
       * Sets the display state of the container.
       *
       * Valid values: `full, reduced`.
       */
      state: {
        type: String,
        default: 'full',
        validator(value) {
          return [
            'full',
            'reduced'
          ].includes(value);
        }
      },

      /**
       * If the selector is set, this container will only render notifications
       * which have the same message.source.selector in the response message.
       */
      selector: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        addToCartLeft: false,
      };
    },

    computed: {
      ...mapGetters('notification', [
        'globalNotifications',
        'addToCartNotifications',
        'nonSelectorNotifications',
        'selectorNotifications',
        'fieldNotifications',
        'globalAndAddToCartNotifications',
      ]),

      notifications() {
        switch (this.displayType) {
          case 'global':
            return this.addToCartLeft ? this.globalAndAddToCartNotifications : this.globalNotifications;

          case 'modal':
            return this.nonSelectorNotifications;

          case 'add-to-cart':
            return this.addToCartNotifications;

          case 'selector':
            return this.selectorNotifications;

          case 'field':
            return this.fieldNotifications;

          default:
            return [];
        }
      }
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      window.addEventListener('resizeend', this.onResize);

      this.onResize();
    },
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('resizeend', this.onResize);
    },

    methods: {
      onResize() {
        this.addToCartLeft = window.innerWidth < 1024;
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-notification-container {
    @include z-index(global-notification);

    &--display-type-global {
      position: absolute;
      width: 100%;
      margin-top: -$spacing--20;

      @include media(xs) {
        margin-top: -$spacing--5;
      }
    }

    &--display-type-add-to-cart {
      position: absolute;
      width: 100%;
      right: $spacing--0;
      display: none;

      @include media(xs) {
        width: 385px;
      }

      @include media(md) {
        display: block;
      }

      &.c-notification-container--state-full {
        margin-top: -#{$spacing--5};
      }

      &.c-notification-container--state-reduced {
        margin-top: -#{$spacing--15};
      }
    }

    &--modal-open {
      display: none;
    }

    &--display-type-global &__inner {
      position: fixed;
      width: 100%;
      padding: $spacing--10;

      @include media(xs) {
        padding: $spacing--0;
        width: 385px;
      }
    }

    &--display-type-add-to-cart &__inner {
      position: fixed;
      width: 100%;

      @include media(xs) {
        width: 385px;
      }
    }
  }
</style>
