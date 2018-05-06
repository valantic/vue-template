<template>
  <div :class="b({ active: isActive })"
    @click="onClick"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
  >
    <div :class="b('count')">99</div>
    <!-- TODO - icon size not correct -->
    <div :class="b('icon')">
      <e-icon inline icon="i-cart--blue"/>
    </div>
    <div :class="b('total')">100'000 CHF</div>
  </div>
</template>

<script>
  export default {
    name: 'c-cart',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Forces the active state
       */
      active: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isActive: this.$props.active,
      };
    },

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
      onClick(event) {
        /**
         * Click event.
         *
         * @event click
         * @type {object}
         */
        this.$emit('click', event);
      },
      onMouseOver(event) {
        /**
         * Mouseover event.
         *
         * @event mouseover
         * @type {object}
         */
        this.$emit('mouseover', event);
      },
      onMouseOut(event) {
        /**
         * Mouseout event.
         *
         * @event mouseout
         * @type {object}
         */
        this.$emit('mouseout', event);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-cart {
    position: relative;
    padding: 10px;
    cursor: pointer;

    &--active,
    &:active,
    &:hover {
      path {
        fill: $color-primary--1;
      }
    }

    &__count {
      @include font($font-size--10, 10px, $font-weight--regular);

      position: absolute;
      left: 50%;
      top: -5px;
      margin-left: -25px;
      display: none;
      color: $color-secondary--2;
      padding: 1px 2px;
      background-color: $color-grayscale--1000;
      border-radius: 2px;
      min-width: 13px;
      text-align: center;

      @include media(sm) {
        display: inline-block;
      }
    }

    &__icon {
      width: 22px;
      height: 24px;

      path {
        fill: $color-grayscale--1000;
      }

      @include media(sm) {
        margin: 15px auto 0 auto;
      }
    }

    &__total {
      @include font($font-size--10, 10px, $font-weight--regular);

      display: none;
      margin-top: 0;
      padding: 3px 0 7px 0;
      text-align: center;

      @include media(sm) {
        display: block;
      }
    }

    @include media(sm) {
      padding: 0;
    }
  }
</style>
