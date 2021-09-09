<template>
  <div :class="b(componentModifiers)">
    <div :class="b('message')">
      {{ notification.message }}
    </div>
    <button :class="b('close-button')" @click="close">
      <e-icon icon="i-close"
              width="20"
              height="20"
              inline
      />
    </button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  /**
   * Notification component to be used within c-notification-container. See /styleguide/notifications for demo.
   */
  export default {
    name: 'c-notification',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // components: {},
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
         * @type {Boolean} Defines if notification should be visible.
         */
        visible: true,

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
          visible: this.visible,
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
        this.visible = false;

        setTimeout(() => this.popNotification(this.notification.id), 500);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-notification {
    width: 400px;
    max-width: 100%;
    min-height: 60px;
    position: relative;
    padding: $spacing--5;
    opacity: 0;
    transition: opacity $transition-duration-200 linear;

    &--type-success {
      background-color: $color-status--success;
      color: $color-grayscale--1000;
    }

    &--type-info {
      background-color: $color-status--info;
      color: $color-grayscale--0;
    }

    &--type-error {
      background-color: $color-status--error;
      color: $color-grayscale--1000;
    }

    &__message {
      width: 100%;
      padding-right: $spacing--30;
    }

    &__close-button {
      @extend %button-reset;

      position: absolute;
      top: $spacing--5;
      right: $spacing--5;
      color: inherit;
    }

    &--visible {
      opacity: 1;
    }
  }
</style>
