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
       * Defines whether the grid should shrink on mobile or not.
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
          shrinkOnMobile: this.shrinkOnMobile,
        };
      },
      maxHeight() {
        if (!this.shrinkOnMobile) {
          return 'inherit';
        }

        if (this.isOpen) {
          return this.openHeight;
        }

        return this.closedHeight;
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
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
      recalculateOpenHeight() {
        const openHeight = this.$el.querySelector('dl').clientHeight;

        this.openHeight = `${openHeight}px`;
      },
      recalculateClosedHeight() {
        const dtHeight = this.$el.querySelector('dt').clientHeight;
        const ddHeight = this.$el.querySelector('dd').clientHeight;
        const closedHeight = dtHeight >= ddHeight ? dtHeight : ddHeight;

        this.closedHeight = `${closedHeight}px`;
      },
    },

    // render(createElement) {},
  };
</script>

<style lang="scss">
  .c-attribute-grid {
    $toggle-animation-duration: 0.7s;

    &__toggle {
      display: none;
      margin: $spacing--0 $spacing--10;
      text-align: center;
      border-top: thin solid $color-grayscale--600;
    }

    &--shrink-on-mobile &__toggle {
      display: block;
      padding-top: $spacing--5;

      @include media(xs) {
        display: none;
      }
    }

    &__arrow {
      transition: transform $toggle-animation-duration;
      height: 22px;

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
