<template>
  <div :class="b({ type })" @mouseover="onMouseOver" @mouseout="onMouseOut">
    <div :class="b('label', { type })">
      {{ $t(`e-info.${type}`) }}
      <div ref="detail" :class="b('detail')">
        | {{ detail }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'e-info',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the type of the label
       *
       * Valid values: `new`, `promo`
       */
      type: {
        type: [String],
        required: true,
        validator(value) {
          return ['new', 'promo'].includes(value);
        },
      },

      /**
       * Defines the detail of the label which shows up no hover
       *
       * Valid values: `new`, `promo`
       */
      detail: {
        type: [String],
        default: '',
      },
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
      onMouseOver() {
        this.$refs.detail.classList.add('e-info__detail--hover');
      },
      onMouseOut() {
        this.$refs.detail.classList.remove('e-info__detail--hover');
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-info {

    &__label {
    @include font($font-size: $font-size--14, $line-height: 14, $font-weight: $font-weight--semi-bold);

      padding: 2px $spacing--5 2px $spacing--5;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-block;

      &--type-new {
        background-color: $color-primary--1;
        color: $color-secondary--1;
        vertical-align: bottom;
        padding-right: $spacing--10;
      }

      &--type-promo {
        background-color: $color-secondary--2;
        color: $color-grayscale--1000;
        vertical-align: bottom;
      }
    }

    &--type-new::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-left: 12px solid $color-primary--1;
      vertical-align: bottom;
    }

    &__detail {
      @include font($font-size: $font-size--14, $line-height: 14, $font-weight: $font-weight--regular);

      display: none;

      &--hover {
        display: inline-block;
      }
    }
  }
</style>
