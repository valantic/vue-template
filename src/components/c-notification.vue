<template>
  <div :class="b(componentModifiers)">
    <div :class="b('icon')"></div>
    <div :class="b('inner', innerModifiers)">
      <template v-if="notification.message.type !== 'add-to-cart'">
        <div v-if="notification.title" :class="b('title')">
          {{ notification.title }}
        </div>
        {{ notification.message.message }}
      </template>
      <div v-if="notification.message.type === 'add-to-cart' && hasProductData"
           :class="b('product-tile-wrapper')"></div>
    </div>
    <div v-if="typeof notification.confirm === 'function'" :class="b('actions')">
      <div v-if="typeof notification.decline === 'function'" :class="b('action', { decline: true })">
        <e-button :progress="declineProgress"
                  :disabled="confirmProgress"
                  width="auto"
                  @click="onDecline">
          {{ $t('c-notification.decline') }}
        </e-button>
      </div>
      <div :class="b('action', { confirm: true })">
        <e-button :progress="confirmProgress"
                  :disabled="declineProgress"
                  width="auto"
                  @click="onConfirm">
          {{ $t('c-notification.confirm') }}
        </e-button>
      </div>
    </div>
    <button v-if="!notification.confirm"
            :class="b('close')"
            @click="close">
      <e-icon
        icon="i-close"
        width="15"
        height="15"
        inline
      />&nbsp;
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
    status: 0,

    // components: {},
    // components: {},
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
        validator(value) {
          return [
            'global',
            'modal',
            'field',
            'add-to-cart',
            'selector',
          ].includes(value);
        },
      },

      /**
       * If the selector is set, this container will only render notifications
       * which have the same message.source.selector in the response message.
       */
      selector: {
        type: String,
        default: null,
      },

      /**
       * The notification object consisting of the following properties:
       *
       * @param {Object} notification.message - The actual message data.
       * @param {String} notification.message.type - Type of response.
       * @param {String} notification.message.message - The actual response message from backend.
       * @param {Number} notification.id - Unique id provided by vuex.
       * @param {Object} [notification.message.meta] - Meta data for the message.
       * @param {String} [notification.title] - Adds title to the notification.
       * @param {Function} [notification.confirm] - Adds confirm button and gets called when the confirm button is clicked.
       * @param {Function} [notification.decline] - Adds decline button and gets called when the decline button is clicked.
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
         * @type {Boolean} Handles en-/disabled state of progress animation for confirm button.
         */
        confirmProgress: false,

        /**
         * @type {boolean} Handles en-/disabled state of progress animation for decline button.
         */
        declineProgress: false,
      };
    },

    computed: {
      /**
       * Checks if the current notification has product data.
       *
       * @returns {Boolean}
       */
      hasProductData() {
        return !!(this.notification.message && this.notification.message.meta && this.notification.message.meta.product);
      },

      /**
       * Returns all modifiers for the component main class.
       *
       * @returns {Object}
       */
      componentModifiers() {
        return {
          type: this.notification.message.type,
          confirm: this.notification.confirm,
          displayType: this.displayType,
          visible: this.visible,
        };
      },

      /**
       * Returns all modifiers for the component inner class.
       *
       * @returns {Object}
       */
      innerModifiers() {
        return {
          isProductTile: this.notification.message.type === 'add-to-cart'
        };
      },

    },
    // watch: {},

    // beforeCreate() {},
    created() {
      this.visible = this.$props.selector ? this.$props.selector === this.notification.message.source.selector : true;
    },
    // beforeMount() {},
    mounted() {
      const { expire, delay } = this.$props.notification;

      if (expire) {
        const timeoutDelay = delay
          ? delay * 1000
          : 3000;

        setTimeout(() => {
          this.close();
        }, timeoutDelay);
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
        this.$el.classList.add('c-notification--expire');
        setTimeout(() => { this.popNotification(this.$props.notification.id); }, 500);
      },

      /**
       * Callback for confirm button click.
       */
      onConfirm() {
        const eventPromise = new Promise((resolve, reject) => {
          this.notification.confirm({
            notification: this.$props.notification,
            resolve,
            reject
          });
        });

        this.confirmProgress = true;

        eventPromise
          .then(() => {
            this.close();
          })
          .catch(() => {}); // Makes sure we don't get a console error.
      },

      /**
       * Callback for delcine button click.
       */
      onDecline() {
        const eventPromise = new Promise((resolve, reject) => {
          this.notification.decline({
            notification: this.$props.notification,
            resolve,
            reject
          });
        });

        this.declineProgress = true;

        eventPromise
          .then(() => {
            this.close();
          })
          .catch(() => {}); // Makes sure we don't get a console error.
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @keyframes c-notification-animation-in {
    0% {
      opacity: 0;
      max-height: 0;
    }

    50% {
      opacity: 0;
      max-height: 200px;
    }

    100% {
      opacity: 1;
      max-height: 200px;
    }
  }

  @keyframes c-notification-animation {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 0;
      max-height: 0;
      margin-bottom: $spacing--0;
      border: none;
    }
  }

  .c-notification {
    display: none;
    background-color: rgba($color-grayscale--1000, 0.95);
    margin-bottom: $spacing--10;
    overflow-y: hidden;
    width: 100%;
    max-height: 200px;
    position: relative;
    border-radius: 2px;
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.3);
    animation: c-notification-animation-in 0.5s ease-out 0s forwards;
    animation-fill-mode: forwards;

    &::before {
      flex: 0 1 auto;
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-bottom: 30px solid transparent;
    }

    &::after {
      flex: 0 1 auto;
      justify-content: space-between;
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-top: 30px solid transparent;
      margin-top: auto;
      margin-bottom: 0;
    }

    &__icon {
      flex: 0 0 auto;
      width: 15px;
      height: 15px;
      background-size: 15px;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__inner {
      @include font($font-size--14, 18px);

      flex: 1 1 auto;
      color: $color-grayscale--400;
      padding: $spacing--10 0 $spacing--20 0;

      &--is-product-tile {
        padding: $spacing--10 0;
        margin-left: -$spacing--5;
      }
    }

    &__title {
      @include font($font-size--14, 18px, $font-weight--bold);
    }

    &__heading {
      @include font($font-size--12, 15px);
    }

    &__heading-label {
      color: $color-grayscale--200;
    }

    &__image-wrapper {
      height: 77px;
      width: 77px;
      min-width: 77px;
      padding: $spacing--10;
      border: 1px solid $color-grayscale--600;
      overflow: hidden;
      background-color: $color-grayscale--1000;
    }

    &__content-wrapper {
      padding-left: $spacing--10;
      flex: 3;
    }

    &__product-title-wrapper {
      padding-top: $spacing--5;
      width: 80%;
    }

    &__product-title {
      @include font($font-size--14, 18px);

      color: $color-secondary--1;

      &:hover {
        text-decoration: none;
        color: $color-secondary--1;
      }
    }

    &__checkout-link-wrapper {
      position: absolute;
      top: $spacing--5;
      right: 0;
    }

    &__checkout-link {
      @include font($font-size--12, 15px);
    }

    &__actions {
      display: flex;
      flex: 0 0 auto;
      align-self: center;
      margin-left: $spacing--5;
    }

    &__action + &__action {
      margin-left: $spacing--5;
    }

    &__close {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      padding: $spacing--0;
      cursor: pointer;

      path {
        fill: $color-grayscale--1000;
      }

      .e-icon {
        display: block;
        position: absolute;
        right: 1px;
        bottom: -#{$spacing--5};
      }
    }

    &__close:focus {
      outline: none;
    }

    &--type-success,
    &--type-add-to-cart {
      border: 1px solid $color-status--success;
      border-bottom: 2px solid $color-status--success;

      &::before {
        border-left: 30px solid $color-status--success;
      }

      &::after {
        border-right: 30px solid $color-status--success;
      }
    }

    &--type-success &__icon,
    &--type-add-to-cart &__icon {
      margin-left: -28px;
      margin-right: 13px;
      margin-top: 1px;
      background-image: url('../assets/icons/i-check--negative.svg');
    }

    &--type-warning {
      border: 1px solid $color-status--warning;
      border-bottom: 2px solid $color-status--warning;

      &::before {
        border-left: 30px solid $color-status--warning;
      }

      &::after {
        border-right: 30px solid $color-status--warning;
      }
    }

    &--type-warning &__icon {
      margin-left: -29px;
      margin-right: 14px;
      margin-top: 2px;
      background-image: url('../assets/icons/i-warning--negative.svg');
      background-size: 10px;
    }

    &--type-error {
      border: 1px solid $color-status--danger;
      border-bottom: 2px solid $color-status--danger;

      &::before {
        border-left: 30px solid $color-status--danger;
      }

      &::after {
        border-right: 30px solid $color-status--danger;
      }
    }

    &--type-error &__icon {
      margin-left: -29px;
      margin-right: 14px;
      margin-top: 2px;
      background-image: url('../assets/icons/i-error--negative.svg');
    }

    &--type-info {
      border: 1px solid $color-status--info;
      border-bottom: 2px solid $color-status--info;

      &::before {
        border-left: 30px solid $color-status--info;
      }

      &::after {
        border-right: 30px solid $color-status--info;
      }
    }

    &--type-info &__icon {
      margin-left: -29px;
      margin-right: 14px;
      margin-top: 2px;
      background-image: url('../assets/icons/i-info--negative.svg');
    }

    &--display-type-modal {
      border-top: 0;
      border-right: 0;
      border-left: 0;
      box-shadow: none;
      border-radius: 0;
      margin-bottom: 0;
    }

    &--display-type-field,
    &--display-type-selector {
      border-radius: 0;
      box-shadow: none;
      margin-bottom: 0;
    }

    &--expire {
      animation: c-notification-animation 0.5s ease-out 0s forwards;
      animation-fill-mode: forwards;
    }

    &--visible {
      display: flex;
    }
  }
</style>
