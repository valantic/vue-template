<template>
  <div :class="b()">
    <c-modal :open="isOpen"
             :title="title"
             :size="$viewport.isMd ? '300' : '600'"
             :click-background-to-close="clickBackgroundToClose"
             portal-target="confirmation-modal"
             @close="onClose"
    >
      <!-- Content -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="text" :class="b('content')"></div>

      <!-- Buttons -->
      <div :class="b('footer')">
        <!-- Confirmation button -->
        <e-button v-if="hasConfirmButton"
                  width="full"
                  primary
                  @click.stop="onConfirm">
          {{ confirmButtonText }}
        </e-button>

        <!-- Cancel Button -->
        <e-button v-if="hasCancelButton"
                  width="full"
                  @click.stop="onCancel"
        >
          {{ cancelButtonText }}
        </e-button>
      </div>
    </c-modal>
  </div>
</template>

<script>
  import cModal from '@/components/c-modal';

  /**
   * Confirmation modal component is used to show the confirmation dialog in a modal.
   *
   * <strong>Warning: sanitizing is disable for htmlText. Make sure the value for this field comes from a secure source!</strong>
   */
  export default {
    name: 'c-confirmation-modal',
    components: {
      cModal,
    },
    // mixins: [],

    // props: {},
    data() {
      return {
        /**
         * @type {Boolean} Flag defines if the modal is currently open.
         */
        isOpen: false,

        /**
         * @type {String} Defines the title of the modal.
         */
        title: '',

        /**
         * @type {String} Defines the content text of the modal.
         */
        text: '',

        /**
         * @type {String} Defines confirmation button text.
         */
        confirmButtonText: '',

        /**
         * @type {String} Defines the cancel button text.
         */
        cancelButtonText: '',

        /**
         * @type {Boolean} Defines if the confirmation can be canceled.
         */
        hasCancelButton: true,

        /**
         * @type {Boolean} Defines if the confirmation can be confirmed.
         */
        hasConfirmButton: true,

        /**
         * @type {Boolean} Defines if the background click closes the modal.
         */
        clickBackgroundToClose: true,
      };
    },

    // computed: {},
    watch: {
      /**
       * Observes "confirmation" attribute in the $confirmation plugin.
       * Set's the data for the modal and opens the modal if it's filled correctly.
       *
       * @param {Object} value - The confirmation object with it's payload.
       */
      '$confirmation.confirmation': function(value) {
        const {
          payload,
        } = value || {};

        if (payload) {
          this.setData(payload);
        }

        this.isOpen = !!payload;
      }
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Sets the data for the modal.
       *
       * @param {Object} options - The confirmation modal instance data.
       * @param {String} options.title - The confirmation modal title.
       * @param {String} [options.text] - The confirmation modal content text.
       * @param {String} options.confirmText - The label for the confirm button.
       * @param {String} [options.cancelText] - The label for the cancel button.
       * @param {Boolean} [options.hasCancelButton = true] - Defines if the modal has a cancel button.
       */
      setData(options = {}) {
        const {
          title,
          text,
          confirmText = this.$t('c-confirmation-modal.confirm'),
          cancelText = this.$t('c-confirmation-modal.cancel'),
          hasCancelButton,
          hasConfirmButton,
          clickBackgroundToClose = true,
        } = options;

        this.title = title;
        this.text = text;
        this.confirmButtonText = confirmText;
        this.cancelButtonText = cancelText;
        this.clickBackgroundToClose = clickBackgroundToClose;
        this.hasCancelButton = hasCancelButton !== false;
        this.hasConfirmButton = hasConfirmButton !== false;
      },

      /**
       * Confirmation event handler.
       */
      onConfirm() {
        if (this.$confirmation.confirmation) {
          this.$confirmation.confirmation.resolve();
        }
      },

      /**
       * Cancel event handler.
       */
      onCancel() {
        if (this.$confirmation.confirmation) {
          this.$confirmation.confirmation.reject();
        }
      },

      /**
       * Callback for the close event of the modal.
       */
      onClose() {
        if (this.hasCancelButton) {
          this.onCancel();
        } else {
          this.onConfirm();
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../../setup/scss/variables';
  @use '../../setup/scss/mixins';

  .c-confirmation-modal {
    &__content {
      @include mixins.font(variables.$font-size--18);

      margin: variables.$spacing--30 0 variables.$spacing--50;
    }

    &__footer {
      @include mixins.media(sm) {
        display: flex;
        justify-content: space-between;
      }

      .e-button {
        margin-bottom: variables.$spacing--15;

        @include mixins.media(sm) {
          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: calc(50% - #{variables.$spacing--10});
          max-width: calc(50% - #{variables.$spacing--10});
          margin-bottom: 0;
        }
      }

      .e-button:first-of-type {
        @include mixins.media(sm) {
          order: 2;
        }
      }
    }
  }
</style>
