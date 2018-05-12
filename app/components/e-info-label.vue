<template>
  <div :class="b({ design })">
    <div :class="b('inner', { design, hasHover })">
      <span :class="b('label')">{{ label }}</span>
      <span :class="b('info', { hasInfo })"><span :class="b('separator')"></span>{{ info }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'e-info-label',
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
    data() {
      return {
        hasInfo: !!this.$props.priceTypeEndDate,
        hasHover: this.$props.hover && !!this.$props.priceTypeEndDate
          || 'ontouchstart' in document.documentElement
          || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
      };
    },

    computed: {
      design() {
        return this.$props.priceType === 2 ? 'new' : 'promo';
      },
      label() {
        return this.$t(`e-info-label.priceType${this.$props.priceType}`);
      },
      info() {
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .e-info-label {
    &--design-new::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid $color-primary--1;
    }

    &__inner {
      @include font($font-size: $font-size--14, $line-height: 14px, $font-weight: $font-weight--semi-bold);

      text-transform: uppercase;
      letter-spacing: 0.05em;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      cursor: pointer;

      &--design-new {
        background-color: $color-primary--1;
        color: $color-secondary--1;

        &__separator {
          background-color: $color-secondary--1;
        }
      }

      &--design-promo {
        background-color: $color-secondary--2;
        color: $color-grayscale--1000;

        &__separator {
          background-color: $color-grayscale--1000;
        }
      }
    }

    &__label {
      display: inline-block;
      vertical-align: middle;
      padding: 2px 3px 2px 8px;
    }

    &__separator {
      display: inline-block;
      height: 10px;
      width: 1px;
      margin-right: 8px;
    }

    &--design-new &__separator {
      background-color: $color-secondary--1;
    }

    &--design-promo &__separator {
      background-color: $color-grayscale--1000;
    }

    &__info {
      @include font($font-size: $font-size--14, $line-height: 14px, $font-weight: $font-weight--regular);

      display: inline-block;
      vertical-align: middle;
      padding: 1px $spacing--0 2px $spacing--0;
      opacity: 0;
      max-width: 0;
      transition: 0.25s ease-out;
    }

    &--has-hover &__info--has-info,
    &:hover &__info--has-info {
      opacity: 1;
      padding-right: 8px;
      max-width: 100px;
      transition: 0.25s ease-out;
    }
  }
</style>
