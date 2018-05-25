<template>
  <div :class="b()">
    <div :class="b('title')">
      <e-heading v-if="title" tag-name="h1" underline>{{ title }}</e-heading>
    </div>
    <div v-if="closable" :class="b('close')" @click="close">
      <e-icon
        :inline="true"
        icon="i-close"
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
    name: 'c-modal-header-01',
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
       * Header option with closable icon
       */
      closable: {
        type: Boolean,
        default: true
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
         *
         * @event close
         */
        VuedalsBus.$emit('close');
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-modal-header-01 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin-top: $spacing--20;

    &__title {
      flex: 1 0;

      .e-heading--underline .e-heading__inner {
        padding-top: 0;
        margin-bottom: 0;

        @include media(sm) {
          padding-left: $spacing--50;
        }
      }
    }

    &__close {
      cursor: pointer;
      margin-right: $spacing--20;

      path {
        fill: $color-primary--1;
      }
    }
  }
</style>
