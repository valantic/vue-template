<template>
  <Transition
    name="c-modal--fade-animation"
    @after-enter="onAfterEnter"
  >
    <dialog
      v-if="isOpen"
      :class="b(modifiers)"
    >
      <div
        v-outside-click="onOutsideClick"
        ref="scrollContainer"
        :class="b('inner')"
      >
        <div
          v-if="$slots.head || title || isClosable"
          :class="b('header')"
        >
          <div :class="b('header-inner')">
            <slot
              name="head"
              :close="close"
            >
              <h2
                v-if="title"
                :class="b('title')"
              >
                {{ title }}
              </h2>
              <button
                v-if="isClosable"
                :aria-label="$t('c-modal.buttonClose')"
                :class="b('button-close')"
                type="button"
                @click="close"
              >
                <e-icon
                  icon="i-close"
                  size="30"
                />
              </button>
            </slot>
          </div>
        </div>
        <div :class="b('content')">
          <slot></slot>
        </div>
        <div
          v-if="$slots.stickyFooter"
          :class="b('sticky-footer')"
        >
          <slot name="stickyFooter"></slot>
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<script lang="ts">
  import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
  import { defineComponent } from 'vue';
  import eIcon from '@/elements/e-icon.vue';
  import propScale from '@/helpers/prop.scale';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  // type Setup = {}

  /**
   * Renders a modal dialog.
   *
   * Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog.
   */
  export default defineComponent({
    name: 'c-modal',

    components: {
      eIcon,
    },

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
      size: propScale(600, [600, 700, 800]),

      /**
       * Allows modifying the inner spacing of the modal.
       *
       * Valid values: `[0, 300, 500]`
       */
      spacing: propScale(500, [0, 300, 500]),
    },
    emits: {
      'update:isOpen': (state: unknown): boolean => typeof state === 'boolean',
      'open': (): boolean => true,
      'close': (): boolean => true,
    },

    // setup(): Setup {},
    // data(): Data {
    //   return {};
    // },

    computed: {
      /**
       * Returns modifier classes.
       */
      modifiers(): Modifiers {
        return {
          size: this.size,
          spacing: this.spacing,
        };
      },
    },
    watch: {
      /**
       * Triggers opening/closing modal.
       */
      isOpen(state: boolean): void {
        if (state) {
          this.open();
        } else {
          this.close();
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      if (this.isOpen) {
        this.open();
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
       * Opens the modal.
       */
      open(): void {
        this.$nextTick(() => {
          this.$el.showModal(); // Native function of `HTMLDialogElement`
          this.$emit('update:isOpen', true);
        });
      },

      /**
       * Closes the modal.
       */
      close(): void {
        if (this.isOpen) {
          this.$emit('update:isOpen', false);
        }

        enableBodyScroll(this.$refs.scrollContainer as HTMLElement);
        document.removeEventListener('keydown', this.onKeyDown);

        this.$emit('close');
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
       * Handler for outside click event.
       */
      onOutsideClick(): void {
        if (this.closeOnOutsideClick && this.isOpen) {
          this.close();
        }
      },

      /**
       * Handler for when the modal open-animation is completed.
       */
      onAfterEnter(): void {
        disableBodyScroll(this.$refs.scrollContainer as HTMLElement, { reserveScrollBarGap: true });

        this.$emit('open');
        document.addEventListener('keydown', this.onKeyDown);
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

    max-width: 100vw;
    padding: 0;
    overflow-x: hidden;
    border: none;
    background: none;

    @include media($down: sm) {
      height: 100vh;
      max-height: none;
    }

    &::backdrop {
      opacity: 0.75;
      background-color: variables.$color-grayscale--0;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      overflow-y: auto;
      background-color: variables.$color-grayscale--1000;
      justify-self: center;

      @include media(md) {
        display: block;
        align-self: center;
        max-width: 75vw;
        height: auto;
        overflow-y: hidden;
      }

      @include media(lg) {
        max-width: 66vw;
      }

      @include media(xl) {
        max-width: 66vw;
      }
    }

    &__header,
    &__sticky-footer {
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
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__content {
      flex: 1 0 auto;
      padding: variables.$spacing--25;

      @include media(md) {
        padding: variables.$spacing--50;
      }
    }

    &__sticky-footer {
      border-top: 1px solid variables.$color-grayscale--600;

      @include media($down: sm) {
        position: sticky;
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
      padding-left: variables.$spacing--20;
      cursor: pointer;
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

  .c-modal--fade-animation-enter-active,
  .c-modal--fade-animation-leave-active {
    &,
    &::backdrop {
      transition: opacity 200ms ease-in-out;
    }
  }

  .c-modal--fade-animation-enter-from,
  .c-modal--fade-animation-leave-to {
    &,
    &::backdrop {
      opacity: 0;
    }
  }
</style>
