<template>
  <portal :order="uuidInt" :to="portalTarget">
    <modal :name="uuid"
           :classes="b({ size })"
           :width="width"
           :max-width="maxWidth"
           :pivot-y="0.1"
           :transition="isMobile ? mobileTransition : 'false'"
           :click-to-close="false"
           height="auto"
           adaptive
           scrollable
           @closed="closedModal"
           @before-close="onModalBeforeClose"
           @opened="onModalOpened">
      <component :is="headerComponent"
                 :title="title"
                 :title-spacing="titleSpacing"
                 :closable="closeIcon"
                 @close="closeModal"/>
      <div :class="b('content', { innerSpacing })">
        <!-- @slot Used for the modal content. -->
        <slot></slot>
      </div>
    </modal>
  </portal>
</template>

<script>
  import cModalHeader01 from '@/components/c-modal-header-01';
  import uuid from '@/mixins/uuid';
  import { BREAKPOINTS } from '@/setup/globals';
  import avoidContentResizing from '@/helpers/avoid-content-resizing';

  /**
   * Components wraps the plugin https://github.com/euvl/vue-js-modal, it's output is rendered through vue-portal.
   * You can give the component a custom header component. The scope content will be placed in the main
   * slot which represents the modal content.
   */
  export default {
    name: 'c-modal',
    components: {
      cModalHeader01,
    },
    mixins: [
      uuid,
    ],

    props: {
      /**
       * Describes the name of the portal-target to render the modal.
       */
      portalTarget: {
        type: String,
        default: 'modal-container',
      },

      /**
       * Set's the inner spacing of the modal [0, 500].
       */
      innerSpacing: {
        type: String,
        default: '500',
        validator(value) {
          return [
            '0',
            '500'
          ].includes(value);
        },
      },

      /**
       * Defines size for modal [300, 600].
       */
      size: {
        type: String,
        default: '300',
        validator(value) {
          return [
            '300',
            '600',
          ].includes(value);
        }
      },

      /**
       * Custom header component name.
       */
      headerComponent: {
        type: String,
        default: 'c-modal-header-01',
        validator(value) {
          return [
            'c-modal-header-01',
            '',
          ].includes(value);
        }
      },

      /**
       * Optional title for the header.
       */
      title: {
        type: String,
        default: '',
      },

      /**
       * Sets a modifier class for title spacing.
       */
      titleSpacing: {
        type: String,
        default: '500',
        validator(value) {
          return [
            '0',
            '300',
            '500'
          ].includes(value);
        },
      },

      /**
       * If 'true' adds a close icon to the header.
       */
      closeIcon: {
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
        validator(value) {
          return [
            'slide',
            'fade',
          ].includes(value);
        }
      }
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
      isMobile() {
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
          this.$modal.show(this.uuid);
          this.$globalModal.addToArray(this.uuid);
        } else {
          this.$modal.hide(this.uuid);
        }
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
       * Event gets fired after modal is opened.
       */
      onModalOpened() {
        const background = window.document.querySelectorAll('.v--modal-background-click');

        background[background.length - 1].addEventListener('mousedown', this.closeModal);
        background[background.length - 1].addEventListener('touchstart', this.closeModal);
      },
      
      /**
       * Hides the modal.
       */
      closeModal() {
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
        this.$globalModal.removeFromArray(this.uuid);
        window.scrollTo(0, this.scrollPositionY);
      },

      /**
       * Event handler for vue-js-modal beforeClose event.
       */
      onModalBeforeClose() {
        avoidContentResizing(false);
      },
    },
    // render() {},
  };
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

    &__content {
      &--inner-spacing-0 {
        padding: 0;
      }

      &--inner-spacing-500 {
        padding: $spacing--20;

        @include media(sm) {
          padding: $spacing--20 $spacing--50;
        }
      }
    }
  }

  // Is needed because the plugin will add the class to the html what scrolls the viewport to top.
  html.v--modal-block-scroll {
    // stylelint-disable-next-line declaration-no-important
    overflow: visible !important;
  }

  .v--modal-overlay {
    // stylelint-disable-next-line declaration-no-important
    background: rgba($color-grayscale--700, 0.9) !important;

    .v--modal-background-click {
      // stylelint-disable-next-line declaration-no-important
      padding: 0 !important;

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
