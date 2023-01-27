<template>
  <Transition name="modal-fade">
    <dialog v-show="isOpen" :class="b(modifiers)" :style="{ '--c-modal__footer-height': `${footerHeight}px` }">
      <div ref="container" :class="b('container')">
        <div ref="inner" :class="b('inner')">
          <div v-if="$slots.head || title || hasCloseButton" :class="b('header')">
            <div :class="b('header-inner')">
              <slot name="head">
                <h2 v-if="title" :class="b('title')">
                  {{ title }}
                </h2>
              </slot>
              <button v-if="isClosable && hasCloseButton"
                      :aria-title="$t('c-modal.buttonClose')"
                      :class="b('button-close')"
                      type="button"
                      @click="close"
              >
                <e-icon icon="i-close" size="30" />
              </button>
            </div>
          </div>
          <div :class="b('content')">
            <slot></slot>
          </div>
          <div v-if="$slots.footer"
               ref="footer"
               :class="b('footer')"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import propScale from '@/helpers/prop.scale';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface IData {
    footerHeight: number;
  }
  interface ISetup {
    container: Ref<HTMLDivElement>;
    inner: Ref<HTMLDivElement>;
  }

  /**
   * Renders a modal.
   *
   * Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
   */
  export default defineComponent({
    name: 'c-modal',

    // components: {},

    props: {
      /**
       * Toggles the visibility of the modal.
       */
      isOpen: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows defining a title.
       */
      title: {
        type: String,
        default: null,
      },

      /**
       * Allows defining whether the modal is closable.
       */
      isClosable: {
        type: Boolean,
        default: true,
      },

      /**
       * Allows enabling/disabling the close button.
       */
      hasCloseButton: {
        type: Boolean,
        default: true,
      },

      /**
       * Allows enabling/disabling close on outside click.
       */
      closeOnOutsideClick: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows modifying the size of the modal.
       *
       * Valid values: `[600, 700, 800]`
       */
      size: propScale(600, [
        600,
        700,
        800,
      ]),

      /**
       * Allows modifying the inner spacing of the modal.
       *
       * Valid values: `[0, 300, 500]`
       */
      spacing: propScale(500, [
        0,
        300,
        500,
      ]),
    },
    emits: [
      'update:isOpen',
      'open',
      'close',
    ],

    setup(): ISetup {
      const container = ref();
      const inner = ref();

      return {
        container,
        inner,
      };
    },
    data(): IData {
      return {
        footerHeight: 0,
      };
    },

    computed: {
      /**
       * Returns modifier classes.
       */
      modifiers(): IModifiers {
        return {
          hasCloseButton: this.isClosable && this.hasCloseButton,
          size: this.size,
          spacing: this.spacing,
        };
      },
    },
    watch: {
      isOpen: {
        handler(state): void {
          if (state) {
            this.open();
          } else {
            this.close();
          }
        },
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Opens the modal.
       */
      open(): void {
        const dialog = this.$el as HTMLDialogElement;

        if (!dialog) {
          return;
        }

        this.$emit('update:isOpen', true);

        dialog.showModal(); // Native function of `HTMLDialogElement`

        this.bindEventListener();

        this.$nextTick(() => {
          this.$bodyscroll.disable(this.container as HTMLElement);
          this.updateFooterHeight();
          this.$emit('open');
        });
      },

      /**
       * Closes the modal.
       */
      close(): void {
        if (this.container) {
          this.$bodyscroll.enable(this.container as HTMLElement);
        }

        if (!this.isClosable || !this.isOpen) {
          return;
        }

        const dialog = this.$el as HTMLDialogElement;

        this.$emit('update:isOpen', false);
        this.bindEventListener(false);
        this.$emit('close');
        dialog.close();
      },

      /**
       * Updates footer height.
       */
      updateFooterHeight(): void {
        const { footer } = this.$refs;

        if (footer) {
          const { offsetHeight } = footer as HTMLElement || {};

          this.footerHeight = offsetHeight || 0;
        }
      },

      /**
       * Binds/unbinds event listeners.
       */
      bindEventListener(bind = true): void {
        if (bind) {
          window.addEventListener('resizeend', this.updateFooterHeight);
          document.addEventListener('mousedown', this.onClick);
          document.addEventListener('keydown', this.onKeyDown);

          return;
        }

        window.removeEventListener('resizeend', this.updateFooterHeight);
        document.removeEventListener('mousedown', this.onClick);
        document.removeEventListener('keydown', this.onKeyDown);
      },

      /**
       * Handler for keypress events.
       */
      onKeyDown(event: KeyboardEvent): void {
        if (this.isOpen && event.code === 'Escape') {
          this.close();
        }
      },

      /**
       * Handler for click events.
       */
      onClick(event: Event): void {
        const { inner } = this;

        if (!this.closeOnOutsideClick || !this.isOpen || !inner) {
          return;
        }

        if (!inner.contains(event.target as Node)) {
          this.close();
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // @use 'sass:math';
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins' as *;
  // @use '../setup/scss/extends' as *;
  // @use '../setup/scss/functions' as *;

  .c-modal {
    $this: &;

    @include z-index(modal);

    &,
    &::backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }

    &::backdrop {
      @include z-index(back);

      content: '';
      opacity: 0.75;
      background-color: variables.$color-grayscale--0;
    }

    &__container {
      display: grid;
      grid-template-columns: 1fr;
      height: 100%;
      overflow-y: auto;

      @include media(md) {
        padding: 5vh 0;
      }
    }

    &__inner {
      width: 100%;
      background-color: variables.$color-grayscale--1000;
      justify-self: center;

      @include media(md) {
        align-self: center;
        max-width: 75vw;
      }

      @include media(lg) {
        max-width: 66vw;
      }

      @include media(xl) {
        max-width: 66vw;
      }
    }

    &__header,
    &__footer {
      padding: variables.$spacing--25;
      border-bottom: 1px solid variables.$color-grayscale--600;

      @include media(md) {
        padding: variables.$spacing--25 variables.$spacing--50;
      }
    }

    &__header {
      border-bottom: 1px solid variables.$color-grayscale--600;
    }

    &__header-inner {
      position: relative;
    }

    &__content, {
      padding: variables.$spacing--25;

      @include media(md) {
        padding: variables.$spacing--50;
      }

      &::after {
        display: block;
        content: '';
        padding-bottom: var(--c-modal__footer-height);
      }
    }

    &__footer {
      border-top: 1px solid variables.$color-grayscale--600;

      @include media($down: sm) {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: variables.$color-grayscale--1000;
      }
    }

    &__title {
      margin: 0;
    }

    &__button-close {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    &--has-close-button &__header-inner {
      padding-right: variables.$spacing--50;
    }

    &--size-600 &__inner {
      @include media(md) {
        width: 600px;
      }
    }

    &--size-700 &__inner {
      @include media(md) {
        width: 800px;
      }
    }

    &--spacing-0 &__content {
      padding: 0;
    }

    &--spacing-300 {
      #{$this}__header,
      #{$this}__footer,
      #{$this}__content {
        padding: variables.$spacing--25;

        @include media(md) {
          padding: variables.$spacing--30;
        }
      }
    }
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity variables.$transition-duration--300 ease-in-out;
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
</style>
