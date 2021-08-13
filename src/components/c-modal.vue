<template>
  <portal :order="parseInt(uuid, 10)" :to="teleport">
    <modal :name="uuid"
           :classes="b({ size })"
           :width="width"
           :max-width="maxWidth"
           :pivot-y="0.1"
           :transition="isMobile ? mobileTransition : 'false'"
           height="auto"
           adaptive
           scrollable
           @closed="closedModal"
           @before-close="onModalBeforeClose">
      <!--
        @slot Allows to use a customized header.
          @binding {String} title - The modal title.
          @binding {String} spacing - The given title spacing.
          @binding {Boolean} closeable - A flag that determines if the modal should be closeable.
          @binding {Function} close - The close callback, that should be executed when a close button is clicked.
      -->
      <div :class="b('notifications')">
        <c-notification-container display-type="modal" />
      </div>
      <slot name="header"
            :title="title"
            :spacing="spacing"
            :closeable="closeable"
            :close="closeModal"
      >
        <div :class="b('header', { spacing })">
          <div :class="b('header-inner', { mobile: isMobile })">
            <button v-if="closeable"
                    :class="b('header-close', { mobile: true })"
                    :aria-label="$t('c-modal.closeTitle')"
                    @click="closeModal"
            >
              <e-icon
                icon="i-arrow--left--info"
                width="18"
                height="18"
              />
            </button>
            <div :class="b('title-wrapper')">
              <h4 v-if="title" :class="b('title')">
                {{ title }}
              </h4>
            </div>
            <button v-if="closeable"
                    :class="b('header-close')"
                    :aria-label="$t('c-modal.closeTitle')"
                    @click="closeModal"
            >
              <e-icon
                icon="i-close"
                width="25"
                height="25"
                inline
              />
            </button>
          </div>
        </div>
      </slot>
      <div :class="b('content', { spacing })">
        <!-- @slot The modals main content. -->
        <slot></slot>
      </div>
    </modal>
  </portal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BREAKPOINTS } from '@/setup/globals';
  import avoidContentResizing from '@/helpers/avoid-content-resizing';
  import propScale from '@/helpers/prop.scale';
  import uuid from '@/mixins/uuid';
  import cNotificationContainer from '@/components/c-notification-container.vue';

  /**
   * Components wraps the plugin https://github.com/euvl/vue-js-modal, it's output is rendered through vue-portal.
   * You can give the component a custom header component. The scope content will be placed in the main
   * slot which represents the modal content.
   */
  export default defineComponent({
    name: 'c-modal',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cNotificationContainer,
    },
    mixins: [
      uuid,
    ],

    props: {
      /**
       * Describes the name of the portal-target to render the modal.
       */
      teleport: {
        type: String,
        default: 'teleport--modal',
      },

      /**
       * Set's the inner spacing of the modal [0, 500].
       */
      spacing: propScale(500, [
        0,
        500
      ]),

      /**
       * Defines size for modal [300, 600].
       */
      size: propScale(300, [
        300,
        600,
      ]),

      /**
       * Optional title for the header.
       */
      title: {
        type: String,
        default: '',
      },

      /**
       * If 'true' adds a close icon to the header.
       */
      closeable: {
        type: Boolean,
        default: true
      },

      /**
       * Toggles the visibility of the modal.
       */
      open: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines the transition on mobile (default is slide in from right to left).
       */
      mobileTransition: {
        type: String,
        default: 'slide',
        validator: (value: string) => [
          'slide',
          'fade',
        ].includes(value)
      },
    },
    data() {
      return {
        scrollPositionY: 0,
      };
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Flag that shows if the current viewport is < sm.
       *
       * @returns {Boolean}
       */
      isMobile(): boolean {
        return !this.$viewport.isSm;
      },

      /**
       * Calculates the width as a percentage value based on the size property.
       * Important: The "width" property of the modal plugin isn't reactive!
       *
       * @returns {String}
       */
      width() {
        if (this.isMobile) {
          return '100%';
        }

        switch (this.size) {
          case '300':
            return '50%';

          case '600':
            return '80%';

          default:
            return '100%';
        }
      },

      /**
       * Calculates the max-width for the modal based on the size property. The max-width has the same value
       * Value like on the width property of the biggest break point.
       *
       * @returns {Number}
       */
      maxWidth() {
        switch (this.size) {
          case '300':
            return 0.5 * BREAKPOINTS.xl;

          case '600':
            return 0.8 * BREAKPOINTS.xl;

          default:
            return BREAKPOINTS.xl;
        }
      }
    },
    watch: {
      open() {
        if (this.open) {
          this.scrollPositionY = window.scrollY;
          avoidContentResizing(true);
          // @ts-ignore
          this.$modal.show(this.uuid);
          // @ts-ignore
          this.$modalStack.add(this.uuid);
        } else {
          // @ts-ignore
          this.$modal.hide(this.uuid);
        }
      }
    },

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    beforeUnmount(): void {
      // @ts-ignore
      this.$modalStack.remove(this.uuid);
    },
    // unmounted(): void {},

    methods: {
      /**
       * Hides the modal.
       *
       * @param {Object} event - The event object.
       */
      closeModal(event: Event) {
        if (event) {
          event.preventDefault();
        }

        // @ts-ignore
        this.$modal.hide(this.uuid);
      },

      /**
       * Event gets fired after modal is closed.
       */
      closedModal() {
        /**
         * Close event after modal is closed
         *
         * @event close
         */
        this.$emit('close');

        /**
         * Updates the 'open' prop to allow the usage of '.sync' on the open prop.
         *
         * @event update:open
         */
        this.$emit('update:open', false);

        // @ts-ignore
        this.$modalStack.remove(this.uuid);
        window.scrollTo(0, this.scrollPositionY);
      },

      /**
       * Event handler for vue-js-modal beforeClose event.
       *
       * @param {Object} modal - The current modal instance.
       */
      onModalBeforeClose(modal: any) {
        if (!this.closeable) {
          modal.stop();
        }

        avoidContentResizing(false);
      },
    },
    // render(): void {},
  });
</script>

<style lang="scss">
  /* stylelint-disable selector-class-pattern */
  .c-modal {
    background-color: $color-grayscale--1000;
    text-align: left;
    box-shadow: 0 0 15px 0 $color-grayscale--500;
    padding: 0;

    @include media($down: xs) {
      /* stylelint-disable declaration-no-important */
      // Important rules are needed to overwrite the inline styles of the plugin
      width: 100% !important;
      left: 0 !important;
      top: 0 !important;
      min-height: 100vh !important;
      /* stylelint-enable declaration-no-important */
    }

    &__content,
    &__header {
      &--spacing-0 {
        padding: 0;
      }

      &--spacing-500 {
        padding: $spacing--20;

        @include media(sm) {
          padding: $spacing--20 $spacing--50;
        }
      }
    }

    &__header {
      position: relative;
      border-top: 2px solid $color-primary--1;
      border-bottom: 2px solid $color-grayscale--600;

      @include media(sm) {
        border-top: 0;
        border-bottom: 0;
      }
    }

    &__header-inner {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0;

      @include media(sm) {
        margin-bottom: 0;
      }

      &--mobile {
        padding: 0 $spacing--20;
      }
    }

    &__title-wrapper {
      flex: 1 0;
    }

    &__title {
      @include media($down: sm) {
        margin-bottom: 0;
        font-weight: $font-weight--bold;
      }
    }

    &__header-close {
      @extend %button-reset;

      cursor: pointer;
      margin-right: $spacing--20;

      @include media($down: xs) {
        display: none;
      }

      path {
        fill: $color-primary--1;
      }

      &--mobile {
        display: flex;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        @include media(sm) {
          display: none;
        }
      }
    }
  }

  .v--modal-overlay {
    // stylelint-disable-next-line declaration-no-important
    background: rgba($color-grayscale--700, 0.9) !important;

    .v--modal-background-click {
      width: 100%;
      // stylelint-disable declaration-no-important
      padding: 0 !important;
      height: auto !important;
      min-height: 100% !important;
      // stylelint-enable declaration-no-important

      @include media(sm) {
        // stylelint-disable-next-line declaration-no-important
        padding: $spacing--100 0 !important;
      }
    }
  }

  .v--modal-overlay.scrollable .v--modal-box {
    // stylelint-disable-next-line declaration-no-important
    margin-bottom: 0 !important;
    padding-bottom: $spacing--100;

    @include media(sm) {
      padding-bottom: 0;
    }
  }

  .slide-enter-active {
    transition: all $transition-duration-300 ease;
  }

  .slide-leave-active {
    transition: all $transition-duration-300 ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
