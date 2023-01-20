<template>
  <div :class="b(componentModifiers)">
    <div :class="b('message')">
      {{ notification.message }}
    </div>
    <button :class="b('close-button')" @click="close">
      <e-icon icon="close" size="20" />
    </button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import eIcon from '@/elements/e-icon';

  /**
   * Notification component to be used within c-notification-container. See /styleguide/notifications for demo.
   */
  export default {
    name: 'c-notification',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eIcon
    },
    // mixins: [],

    props: {
      /**
       * The notification object consisting of the following properties:
       *
       * @param {String} notification.message - The message to display.
       * @param {String} notification.type - Type of the notification.
       * @param {Number} notification.id - Unique id of the notification.
       * @param {Boolean} notification.expire - Defines if the notification should auto expire.
       *
       */
      notification: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        /**
         * @type {Number} Defines the delay a notification expires in Milliseconds.
         */
        expireDelay: 3000,
      };
    },

    computed: {
      /**
       * Returns all modifiers for the component main class.
       *
       * @returns {Object}
       */
      componentModifiers() {
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      ...mapMutations('notification', [
        'popNotification',
      ]),

      /**
       * Removes current notification from stack.
       */
      close() {
        this.popNotification(this.notification.id);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-notification {
    min-width: 400px;
    max-width: 100%;
    min-height: 60px;
    position: relative;
    padding: variables.$spacing--5;

    &--type-success {
      background-color: variables.$color-status--success;
      color: variables.$color-grayscale--1000;
    }

    &--type-info {
      background-color: variables.$color-status--info;
      color: variables.$color-grayscale--0;
    }

    &--type-error {
      background-color: variables.$color-status--error;
      color: variables.$color-grayscale--1000;
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
