<template>
  <div :class="b(componentModifiers)">
    <div :class="b('message')">
      {{ notification.message }}
    </div>
    <button :class="b('close-button')"
            type="button"
            @click="close"
    >
      <e-icon icon="i-close" size="20" />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';
  import notificationStore, { INotificationItem, TNotificationStore } from '@/stores/notification';
  import eIcon from '@/elements/e-icon.vue';

  interface ISetup {
    notificationStore: TNotificationStore
  }

  interface IData {
    expireDelay: number;
  }

  /**
   * Notification component to be used within c-notification-container. See /styleguide/notifications for demo.
   */
  export default defineComponent({
    name: 'c-notification',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eIcon,
    },

    props: {
      /**
       * The notification object consisting of the following properties:
       */
      notification: {
        type: Object as PropType<INotificationItem>,
        required: true,
      },
    },

    setup(): ISetup {
      return {
        notificationStore: notificationStore(),
      };
    },
    data(): IData {
      return {
        /**
         * Defines the delay a notification expires in Milliseconds.
         */
        expireDelay: 3000,
      };
    },

    computed: {
      /**
       * Returns all modifiers for the component main class.
       */
      componentModifiers(): IModifiers {
        return {
          type: this.notification.type,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      const { expire } = this.notification || {};

      if (expire) {
        setTimeout(() => {
          this.close();
        }, this.expireDelay);
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Removes current notification from stack.
       */
      close() {
        this.notificationStore.popNotification(this.notification.id);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-notification {
    position: relative;
    min-width: 400px;
    max-width: 100%;
    min-height: 60px;
    padding: variables.$spacing--5;

    &--type-success {
      background-color: variables.$color-status--success;
      color: variables.$color-grayscale--0;
    }

    &--type-info {
      background-color: variables.$color-status--info;
      color: variables.$color-grayscale--0;
    }

    &--type-error {
      background-color: variables.$color-status--error;
      color: variables.$color-grayscale--0;
    }

    &__message {
      width: 100%;
      padding-right: variables.$spacing--30;
    }

    &__close-button {
      position: absolute;
      top: variables.$spacing--5;
      right: variables.$spacing--5;
      color: inherit;
    }
  }
</style>
