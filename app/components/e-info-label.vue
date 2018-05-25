<template>
  <div :class="b({ design })">
    <button
      :class="b('inner', { design, hasInfo })"
      @click="onClick"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
    >
      <span :class="b('label')">{{ label }}</span>
      <span ref="info" :class="b('info')"><span :class="b('separator')"></span>{{ info }}</span>
    </button>
  </div>
</template>

<script>

  /**
   *
   * This component does not fetch any data from ERP, it just displays
   * the information provided to it as attributes.
   * This means that the parent component is responsible for fetching the data.
   * It's also the parent components responsibility to check if priceType is available or not.
   * On touch devices the infos show when touching the label.
   *
   */
  export default {
    name: 'e-info-label',
    // components: {},
    // mixins: [],

    props: {
      /**
       * The priceType from ERP
       *
       * Valid values: `1, 2, 3, 4, 5`
       */
      priceType: {
        type: [Number],
        required: true,
        validator(value) {
          return [1, 2, 3, 4, 5].includes(value);
        },
      },

      /**
       * The priceTypeEndDate from ERP
       */
      priceTypeEndDate: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        hasInfo: !!this.$props.priceTypeEndDate,
        hasTouch: 'ontouchstart' in document.documentElement
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

    methods: {
      onClick() {
        if (this.hasTouch) {
          this.$refs.info.classList.toggle('e-info-label__info--active');
        }
      },
      onMouseOver() {
        if (!this.hasTouch) {
          this.$refs.info.classList.add('e-info-label__info--active');
        }
      },
      onMouseOut() {
        if (!this.hasTouch) {
          this.$refs.info.classList.remove('e-info-label__info--active');
        }
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-info-label {
    @include font($font-size--14, 14px, $font-weight--semi-bold);

    &--design-new::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid $color-primary--1;
    }

    &__separator {
      display: inline-block;
      height: 10px;
      width: 1px;
      margin-right: 8px;
    }

    &__inner {
      display: inline-block;
      vertical-align: top;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      overflow: hidden;
      white-space: nowrap;
      cursor: default;
      border: 0;

      &:active,
      &:focus {
        border: 0;
        outline: 0;
      }

      &--design-new {
        background-color: $color-primary--1;
        color: $color-secondary--1;
      }

      &--design-promo {
        background-color: $color-secondary--2;
        color: $color-grayscale--1000;
      }
    }

    &--design-new &__separator {
      background-color: $color-secondary--1;
    }

    &--design-promo &__separator {
      background-color: $color-grayscale--1000;
    }

    &__label {
      display: inline-block;
      vertical-align: middle;
      padding: 2px 3px 2px 8px;
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

    &__inner--has-info &__info--active {
      opacity: 1;
      padding-right: 8px;
      max-width: 100px;
      transition: 0.25s ease-out;
    }
  }
</style>
