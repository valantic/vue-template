<template>
  <div v-bem="modifiers">
    <span v-bem:inner>
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 's-status',
    status: 1,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Accepts a state modifier for the component.
       *
       * Valid values: ['ready']
       */
      modifier: {
        type: String,
        default: null,
        validator(value) {
          return [
            'ready',
          ].includes(value);
        }
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      modifiers() {
        return {
          [this.modifier]: true
        };
      }
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .s-status { // NOTE: this style is also used by the vue-styleguidist plugin!
    /* stylelint-disable color-hex-length, color-named */

    @include font(12);

    top: 30px;
    z-index: 1;
    padding-right: $spacing--30;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);

    &__inner {
      display: inline-block;
      align-self: flex-end;
      color: $color-grayscale--1000;
      border-radius: 3px;
      padding: 0 $spacing--10 0 0;
      background: crimson;
      font-weight: bold;

      &::before {
        content: 'Status ';
        display: inline-block;
        padding: $spacing--5 $spacing--10;
        background: #333;
        border-radius: 3px 0 0 3px;
        margin-right: 10px;
      }
    }

    &--sticky {
      position: sticky;
      display: flex;
      flex-direction: column;
    }

    &--ready &__inner {
      background: limegreen;
    }
  }
</style>
