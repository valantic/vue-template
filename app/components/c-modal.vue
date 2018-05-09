<template>
  <div :class="b()">
    <div :class="b('trigger')" @click="showModal()">
      <!-- @slot This slot will trigger the "showModal()" function -->
      <slot name="handler"></slot>
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
      }
    },
    // data() {
    //   return {};
    // },

    // watch: {},

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
        const contentSlot = this.$slots.content;
        const className = this.$props.noPadding ? 'c-modal__content c-modal__content--no-spacing' : 'c-modal__content';

        VuedalsBus.$emit('new', {
          name: className,
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
          escapable: true
        });
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
      margin: 0;
      width: 768px;
      max-width: 100%;
      min-height: 100vh;
      padding: $spacing--20;
      background-color: $color-grayscale--1000;
      opacity: 1;

      @include media(sm) {
        min-height: auto;
        margin: $spacing--100 0;
        padding: $spacing--20 $spacing--50;
        box-shadow: 0 0 15px 0 $color-grayscale--500;
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
  }

  /* stylelint-disable */
  // Background
  .vuedals {
    background-color: rgba($color-grayscale--600, 0.9);
    transition: unset;
  }
</style>
