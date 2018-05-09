<template>
  <div v-if="title || !noCloseIcon" :class="b()">
    <div :class="b('title')">
      <e-heading v-if="title" tag-name="h1" underline>{{ title }}</e-heading>
    </div>
    <div v-if="!noCloseIcon" :class="b('close')" @click="close">
      <!-- TODO: Replace dummy icon with close icon-->
      <e-icon
        :inline="true"
        icon="styleguide-heart"
        width="25"
        height="25"
      />
    </div>
  </div>
</template>

<script>
  import { Bus as VuedalsBus } from 'vuedals';

  /**
   * Component is used to render the default header in the modal
   */
  export default {
    name: 'c-modal-header-default',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Optional title which will rendered with the underline heading (h1)
       */
      title: {
        type: String,
        default: ''
      },

      /**
       * Header without close icon in the right-top corner
       */
      noCloseIcon: {
        type: Boolean,
        default: false
      }
    },
    // data() {
    //   return {};
    // },

    // computed: {},
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
      close() {
        /**
         * Global close event for the modal
         * @event close
         */
        VuedalsBus.$emit('close');
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-modal-header-default {
    display: flex;
    justify-content: space-between;
    margin-left: -$spacing--20;
    width: calc(100% + (2 * #{$spacing--20}));
    padding: 0 $spacing--20;

    @include media(sm) {
      margin-left: -$spacing--50;
      width: calc(100% + (2 * #{$spacing--50}));
    }

    &__title {
      flex: 1 0;
      margin-left: -$spacing--20;

      .e-heading--underline .e-heading__inner {
        padding-top: 0;

        @include media(sm) {
          padding-left: $spacing--50;
        }
      }
    }

    &__close {
      cursor: pointer;
    }
  }
</style>
