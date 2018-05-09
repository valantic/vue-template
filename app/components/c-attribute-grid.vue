<template>
  <div :class="b(modifiers)">
    <div ref="table" :class="b('table', { open: isOpen })" :style="{ 'max-height': maxHeight }">
      <c-attribute-grid-items :items="attributes"/>
    </div>
    <div :class="b('toggle', { open: isOpen })" role="button" @click="toggle()">
      <e-icon :class="b('arrow')" inline icon="i-arrow-down"/>
    </div>
  </div>
</template>

<script>
  import cAttributeGridItems from '@/components/c-attribute-grid-items';

  export default {
    name: 'c-attribute-grid',
    components: {
      cAttributeGridItems,
    },
    // mixins: [],

    props: {
      /**
       * Defines the items displayed in the attribute grid.
       */
      attributes: {
        type: Array,
        required: true,
      },

      /**
       * Defines weather the first row is a headline or not.
       */
      headline: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines weather the grid should shrink on mobile or not.
       */
      shrinkOnMobile: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        isOpen: true,
        openHeight: 0,
        closedHeight: 0,
      };
    },

    computed: {
      modifiers() {
        return {
          headline: this.headline,
          shrinkOnMobile: this.shrinkOnMobile,
          dontShrinkOnMobile: !this.shrinkOnMobile
        };
      },
      maxHeight() {

        if (!this.shrinkOnMobile) {
          return 'inherit';
        }

        if (this.isOpen) {
          return this.openHeight;
        }

        if (!this.isOpen) {
          return this.closedHeight;
        }
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},

    mounted() {
      this.recalculateOpenHeight();
      window.addEventListener('resize', this.recalculateOpenHeight);

      this.recalculateClosedHeight();
      window.addEventListener('resize', this.recalculateClosedHeight);

      this.isOpen = false;

      console.log(this.openHeight);
      console.log(this.closedHeight);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Toggles the open state of the attribute grid.
       */
      toggle() {
        this.isOpen = !this.isOpen;
      },

      /**
       * Recalculates the height of the definition list when open.
       */
      recalculateOpenHeight() {
        let openHeight = this.$el.querySelector('dl').clientHeight;

        if (openHeight > 0)
          openHeight = `${openHeight}px`;

        this.openHeight = openHeight;
      },

      /**
       * Recalculates the height of the definition list when closed.
       */
      recalculateClosedHeight() {
        let dtHeight = this.$el.querySelector('dt').clientHeight;
        let ddHeight = this.$el.querySelector('dd').clientHeight;
        let closedHeight = dtHeight >= ddHeight ? dtHeight : ddHeight;

        if (closedHeight > 0)
          closedHeight = `${closedHeight}px`;

        this.closedHeight = closedHeight;
      },
    },

    // render(createElement) {},
  };
</script>

<style lang="scss">
  .c-attribute-grid {
    $toggle-animation-duration: 0.7s;

    &--headline &__row:first-child &__col {
      font-weight: $font-weight--bold;
    }

    &__toggle {
      display: none;
      margin: 0 auto;
      text-align: center;
      border-top: thin solid $color-grayscale--600;
    }

    &--shrink-on-mobile &__toggle {
      display: block;
      padding: $spacing--5 $spacing--0;

      @include media(xs) {
        display: none;
      }
    }

    &__arrow {
      transition: transform $toggle-animation-duration;

      path {
        fill: $color-grayscale--500;
      }
    }

    &__toggle--open &__arrow {
      transform: rotate(180deg);
    }

    &__table {
      transition: none;
      max-height: inherit;
      overflow: visible;
    }

    &--shrink-on-mobile &__table {
      transition: max-height $toggle-animation-duration;
      overflow: hidden;

      @include media(xs) {
        transition: none;
        // stylelint-disable-next-line declaration-no-important
        max-height: inherit !important;
        overflow: visible;
      }
    }

    &__table--open {
      @include media(xs) {
        max-height: inherit;
      }
    }
  }
</style>
