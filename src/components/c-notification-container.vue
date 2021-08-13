<template>
  <div :class="b({ state, displayType })">
    <div :class="b('inner')">
      <c-notification
        v-for="notification in notifications"
        :key="notification.id"
        :selector="selector"
        :notification="notification"
        :display-type="displayType" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters } from 'vuex';
  import cNotification from '@/components/c-notification.vue';

  /**
   * Container for rendering notifications. See /styleguide/notifications for demo.
   */
  export default defineComponent({
    name: 'c-notification-container',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cNotification,
    },
    // mixins: [],

    props: {
      /**
       * Sets the display type which defines how the notifications are being rendered.
       *
       * Valid values: `[global, modal, field, add-to-cart, selector]`
       */
      displayType: {
        type: String,
        default: 'global',
        validator: (value: string) => [
          'global',
          'modal',
          'field',
          'add-to-cart',
          'selector'
        ].includes(value)
      },

      /**
       * Sets the display state of the container.
       *
       * Valid values: `[full, reduced]`.
       */
      state: {
        type: String,
        default: 'full',
        validator: (value: string) => [
          'full',
          'reduced'
        ].includes(value)
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
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('notification', [
        'getGlobalNotifications',
        'getAddToCartNotifications',
        'getNonSelectorNotifications',
        'getSelectorNotifications',
        'getFieldNotifications',
      ]),

      /**
       * Returns an Array of notifications, which should be displayed by this container.
       *
       * @returns {Array.<Object>}
       */
      notifications() {
        switch (this.displayType) {
          case 'global':
            return this.getGlobalNotifications;

          case 'modal':
            return this.getNonSelectorNotifications;

          case 'add-to-cart':
            return this.getAddToCartNotifications;

          case 'selector':
            return this.getSelectorNotifications;

          case 'field':
            return this.getFieldNotifications;

          default:
            return [];
        }
      }
    },
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
</script>

<style lang="scss">
  .c-notification-container {
    @include z-index(globalNotification);

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
        margin-top: -$spacing--5;
      }

      &.c-notification-container--state-reduced {
        margin-top: -$spacing--15;
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
