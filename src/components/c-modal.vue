<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen"
           :class="b(modifiers)"
           :style="{ '--c-modal__footer-height': `${footerHeight}px` }"
      >
        <div ref="container" :class="b('container')">
          <div ref="inner" :class="b('inner')">
            <div v-if="$slots.head || title || hasCloseButton" :class="b('header')">
              <div :class="b('header-inner')">
                <slot v-if="$slots.head" name="head"></slot>
                <h2 v-else-if="title" :class="b('title')">
                  {{ title }}
                </h2>
                <button v-if="isClosable && hasCloseButton"
                        :aria-title="$t('c-modal.buttonClose')"
                        :class="b('button-close')"
                        type="button"
                        @click="close"
                >
                  <e-icon icon="close" size="30" />
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
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import propScale from '@/helpers/prop.scale';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface IData {
    footerHeight: number;
  }
  interface ISetup {
    container: Ref<HTMLDivElement | null | undefined>;
    inner: Ref<HTMLDivElement | null | undefined>;
  }

  /**
   * Renders a modal.
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
        default: '',
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
       * Valid values: `[600, 800]`
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
      return {
        container: ref(),
        inner: ref(),
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
        immediate: true,
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
        this.$emit('update:isOpen', true);

        setTimeout(() => {
          this.bindEventListener();
        }, 100);

        this.$nextTick(() => {
          // this.$bodyscroll.disable(this.container as HTMLElement);
          this.updateFooterHeight();
          this.$emit('open');
        });
      },

      /**
       * Closes the modal.
       */
      close(): void {
        if (this.container) {
          // this.$bodyscroll.enable(this.container as HTMLElement);
        }

        if (!this.isClosable || !this.isOpen) {
          return;
        }

        this.$emit('update:isOpen', false);
        this.bindEventListener(false);
        this.$emit('close');
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
    &::after {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }

    &::after {
      @include z-index(back);

      content: '';
      opacity: 0.75;
      background-color: variables.$color-primary--2;
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
