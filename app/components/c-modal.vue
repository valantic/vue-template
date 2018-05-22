<template>
  <div :class="b()">
    <div :class="b('trigger')">
      <!-- @slot The default slot will render the modal content -->
    </div>
  </div>
</template>

<script>
  import { Bus as VuedalsBus } from 'vuedals';
  import cModalHeaderDefault from '@/components/c-modal-header-default';

  /**
   * The «c-modal» component uses the vuedals plugin (https://github.com/javisperez/vuedals).
   * It needs the component <vuedal/> integrated somewhere on the page once.
   * There is a second slot <slot name="content"></slot> where you can put the modal content.
   * The slot isn't visible in the template because it's directly used in the JS via «this.$slots.content».
   */
  export default {
    name: 'c-modal',
    components: {
      cModalHeaderDefault
    },
    // mixins: [],

    props: {
      /**
       * Displayed title property
       */
      title: {
        type: String,
        default: ''
      },

      /**
       * Hides the close icon in the header
       */
      noCloseIcon: {
        type: Boolean,
        default: false
      },

      /**
       * Set's the inner spacing to 0
       */
      noPadding: {
        type: Boolean,
        default: false
      },

      /**
       * Custom header component
       */
      headerComponent: {
        type: String,
        default: 'c-modal-header-default'
      },

      /**
       * Defines size for modal («small» or «large»)
       */
      size: {
        type: String,
        default: 'small',
        validator(value) {
          return [
            'small',
            'large',
          ].includes(value);
        }
      },

      open: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classNames() {
        const classes = [];

        classes.push('c-modal__content');
        classes.push(this.$props.noPadding ? 'c-modal__content--no-spacing' : '');
        classes.push(`c-modal__content--${this.$props.size}`);

        return classes.filter(Boolean).join(' ');
      }
    },
    watch: {
      open: {
        immediate: true,
        handler() {
          if (this.open) {
            this.showModal();
          } else {
            this.closeModal();
          }
        }
      }
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},

    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      showModal() {
        const contentSlot = this.$slots.default;
        const _that = this;

        VuedalsBus.$emit('new', {
          name: this.classNames,
          component: {
            name: this.title.replace(/\s/g, ''),

            render(createElement) {
              return createElement('div', [contentSlot]);
            }
          },
          header: this.headerComponent && (!this.noCloseIcon || this.title) ? {
            component: this.headerComponent,
            props: {
              title: this.$props.title,
              noCloseIcon: this.$props.noCloseIcon
            }
          } : null,
          dismissable: false,
          escapable: true,
          onClose() {
            /**
             * Close Event
             *
             * @event close
             */
            _that.$emit('close');
          },
          onDismiss() {
            _that.$emit('close');
          }
        });
      },
      closeModal() {
        VuedalsBus.$emit('close');
      }
    }
    // render() {},
  };
</script>

<style lang="scss">
  .c-modal {
    &__trigger {
      display: inline-block;
    }

    &__content {
      width: 100%;
      min-height: 100vh;
      padding: $spacing--20;
      background-color: $color-grayscale--1000;
      opacity: 1;
      margin: 0;

      @include media(sm) {
        min-height: auto;
        margin: $spacing--100 auto;
        padding: $spacing--20 $spacing--50;
        box-shadow: 0 0 15px 0 $color-grayscale--500;
        min-width: 500px;
      }

      header {
        border-bottom: 0;
        min-height: 0;
      }

      &::after {
        @include media(sm) {
          content: '';
          height: 100px;
          position: absolute;
          width: 1px;
        }
      }
    }

    &__content--no-spacing {
      padding: 0;
    }

    &__content--small {
      @include media(sm) {
        width: 50%;
        max-width: calc(#{map-get($grid-breakpoints, xl)} * 0.5);
      }
    }

    &__content--large {
      @include media(sm) {
        width: 80%;
        max-width: calc(#{map-get($grid-breakpoints, xl)} * 0.8);
      }
    }
  }

  /* stylelint-disable */
  // Background
  .vuedals {
    background-color: rgba($color-grayscale--600, 0.9);
    transition: unset;
  }
</style>
