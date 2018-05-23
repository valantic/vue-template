<script>
  import { Bus as VuedalsBus } from 'vuedals';
  import cModalHeader01 from '@/components/c-modal-header-01';

  /**
   * The «c-modal» component uses the vuedals plugin (https://github.com/javisperez/vuedals).
   * It needs the component <vuedal/> integrated somewhere on the page once.
   * There is a slot for inject the modal content. You can define a custom header component for the
   * modal header. The component emits an event if it's closed. But can also beeing closed by set the "open" attribute
   * to false.
   */
  export default {
    name: 'c-modal',
    components: {
      cModalHeader01
    },
    // mixins: [],

    props: {
      /**
       * Displayed title property
       */
      title: {
        type: String,
        default: null
      },

      /**
       * Hides the close icon in the header
       */
      noCloseIcon: {
        type: Boolean,
        default: false
      },

      /**
       * Set's the inner spacing of the modal [0, 500]
       */
      innerSpacing: {
        type: String,
        default: '500',
        validator(value) {
          return [
            '0',
            '500'
          ].includes(value);
        }
      },

      /**
       * Custom header component
       */
      headerComponent: {
        type: String,
        default: 'c-modal-header-01',
        validator(value) {
          return [
            'c-modal-header-01'
          ].includes(value);
        }
      },

      /**
       * Defines size for modal [300, 600]
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
       * State of the modal (can be toggled)
       */
      open: {
        type: Boolean,
        default: false
      },

      /**
       * Prevents modal from closing by Esc and outside-click
       * (close action have to get prevent separate in the header component)
       */
      closable: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      /**
       * Checks if the header can be rendered
       *
       * @returns {Boolean}   state if header should be visible
       */
      showHeader() {
        const componentName = this.$props.headerComponent;
        const hasCloseIcon = !this.$props.noCloseIcon;
        const hasTitle = this.$props.title;

        return componentName && (hasCloseIcon || hasTitle);
      }
    },

    watch: {
      /**
       * Watches the open state and close/ opens the modal if the property changes from outside
       */
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
          name: this.b({
            size: this.$props.size
          }),
          component: {
            name: this.title ? this.title.replace(/\s/g, '') : '',

            render(createElement) {
              return createElement('div', { class: _that.b('content', { innerSpacing: _that.$props.innerSpacing }) }, [contentSlot]);
            }
          },
          header: this.showHeader ? {
            component: this.headerComponent,
            props: {
              title: this.$props.title,
              noCloseIcon: this.$props.noCloseIcon,
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
            if (_that.$props.closable) {
              _that.$emit('close');

              return true;
            }

            // prevents closing modal
            return false;
          }
        });
      },
      closeModal() {
        VuedalsBus.$emit('close');
      }
    },

    /**
     * Empty render function because this don't have to render something initial
     *
     * @returns {null}
     */
    render() {
      return null;
    }
  };
</script>

<style lang="scss">
  .c-modal {
    width: 100%;
    min-height: 100vh;
    background-color: $color-grayscale--1000;
    opacity: 1;
    margin: 0;
    padding: 0;

    @include media(sm) {
      min-height: auto;
      margin: $spacing--100 auto;
      box-shadow: 0 0 15px 0 $color-grayscale--500;
    }

    header {
      border-bottom: 0;
      min-height: 0;
      margin: 0;
    }

    &--size-300 {
      @include media(sm) {
        width: 50%;
        max-width: #{map-get($grid-breakpoints, xl) * 0.5};
      }
    }

    &--size-600 {
      @include media(sm) {
        width: 80%;
        max-width: #{map-get($grid-breakpoints, xl) * 0.8};
      }
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

  /* stylelint-disable */
  // Background
  .vuedals {
    background-color: rgba($color-grayscale--600, 0.9);
    transition: unset;
  }
</style>
