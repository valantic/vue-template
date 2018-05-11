<template>
  <div :class="b({ design })" @mouseover="onMouseOver" @mouseout="onMouseOut">
    <div :class="b('label', { design })">
      {{ label }}
      <div v-if="detail" ref="detail" :class="b('detail', { hover })">
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
       * The priceType from ERP
       */
      priceType: {
        type: [Number],
        required: true,
      },

      /**
       * The priceTypeEndDate from ERP
       */
      priceTypeEndDate: {
        type: String,
        default: null,
      },

      /**
       * Forces the hover state
       */
      hover: {
        type: Boolean,
        default: false,
      },
    },
    // data() {
    //  return {};
    // },

    computed: {
      design() {
        return this.$props.priceType === 2 ? 'new' : 'promo';
      },
      label() {
        return this.$t(`e-info.priceType${this.$props.priceType}`);
      },
      detail() {
        return this.$props.priceTypeEndDate;
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
      onMouseOver() {
        if (!this.$props.hover) {
          this.$refs.detail.classList.add('e-info__detail--hover');
        }
      },
      onMouseOut() {
        if (!this.$props.hover) {
          this.$refs.detail.classList.remove('e-info__detail--hover');
        }
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

      &--design-new {
        background-color: $color-primary--1;
        color: $color-secondary--1;
        vertical-align: bottom;
        padding-right: $spacing--10;
      }

      &--design-promo {
        background-color: $color-secondary--2;
        color: $color-grayscale--1000;
        vertical-align: bottom;
      }
    }

    &--design-new::after {
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
