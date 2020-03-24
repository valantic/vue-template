<template>
  <div :class="b({ titleSpacing })">
    <div :class="b('notifications')">
      <c-notification-container display-type="modal" />
    </div>
    <div :class="b('inner', { mobile: isMobile })">
      <a v-if="closable"
         :class="b('close', { mobile: true })"
         :title="$t('c-modal-header-01.closeTitle')"
         href="#"
         @click="close">
        <span class="invisible">
          {{ $t('c-modal-header-01.closeTitle') }}
        </span>
      </a>
      <div :class="b('close-icon-mobile')">
        <e-icon
          icon="i-arrow--left--info"
          width="18"
          height="18"
        />
      </div>
      <div :class="b('title')">
        <e-heading v-if="title" :underline="!isMobile" tag-name="h1">
          {{ title }}
        </e-heading>
      </div>
      <a v-if="closable"
         :class="b('close')"
         :title="$t('c-modal-header-01.closeTitle')"
         href="#"
         @click="close">
        <e-icon
          icon="i-close"
          width="25"
          height="25"
          inline
        />
        <span class="invisible">
          {{ $t('c-modal-header-01.closeTitle') }}
        </span>
      </a>
    </div>
  </div>
</template>

<script>
  import propScale from '@/helpers/prop.scale';
  import cNotificationContainer from '@/components/c-notification-container';

  /**
   * Component is used to render the default header in the modal
   */
  export default {
    name: 'c-modal-header-01',
    status: 0,

    components: {
      cNotificationContainer,
    },
    // mixins: [],

    props: {
      /**
       * Optional title which will rendered with the underline heading (h1)
       */
      title: {
        type: String,
        default: '',
      },

      /**
       * Sets a modifier class for title spacing options
       *
       * Valid values: `[0, 300, 500]`
       */
      titleSpacing: propScale(500, [
        0,
        300,
        500
      ]),

      /**
       * Header option with closable icon
       */
      closable: {
        type: Boolean,
        default: true,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Checks if current viewport is mobile (<= md).
       *
       * @returns {Boolean}
       */
      isMobile() {
        return !this.$viewport.isSm;
      },
    },
    // watch: {},

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
       * Event handler for the close event of the modal plugin.
       */
      close() {
        /**
         * Sends close event.
         *
         * @event close
         */
        this.$emit('close');
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-modal-header-01 {
    position: relative;
    border-top: 2px solid $color-primary--1;
    border-bottom: 2px solid $color-grayscale--600;

    @include media(sm) {
      border-top: 0;
      border-bottom: 0;
    }

    &__inner {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0;
      margin-top: $spacing--20;
      margin-bottom: $spacing--20;

      @include media(sm) {
        margin-bottom: 0;
      }
    }

    &__inner--mobile {
      padding: 0 $spacing--20;
    }

    &__title {
      flex: 1 0;

      .e-heading {
        @include media($down: sm) {
          margin-bottom: 0;
          font-weight: $font-weight--bold;
        }
      }

      .e-heading--underline .e-heading__inner {
        padding-top: 0;
        margin-bottom: 0;

        @include media(sm) {
          padding-left: $spacing--50;
          font-weight: $font-weight--regular;
        }
      }
    }

    &__close {
      cursor: pointer;
      margin-right: $spacing--20;

      @include media($down: xs) {
        display: none;
      }

      path {
        fill: $color-primary--1;
      }
    }

    &__close--mobile {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      @include media(sm) {
        display: none;
      }
    }

    &__close-icon-mobile {
      display: flex;
      padding-right: $spacing--20;
      line-height: 18px;

      @include media(sm) {
        display: none;
      }
    }

    &--title-spacing-300 {
      .e-heading .e-heading__inner {
        padding-left: $spacing--25;
      }
    }
  }
</style>
