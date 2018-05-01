<template>
  <div :class="b({ headline: headline, shrinkOnMobile: shrinkOnMobile, dontShrinkOnMobile: !shrinkOnMobile })">
    <div :class="b('table', { open: isOpen })" :style="{ 'max-height': tableMaxHeight + 'px' }">
      <div v-for="(attribute, index) in attributes" :key="index" :class="b('row')" :ref="'row_' + index">
        <div :class="b('col')">
          <span :class="b('name')">{{ attribute.name }}</span>
        </div>
        <div :class="b('col')">
          <a v-if="attribute.url" :class="b('link')" :href="attribute.url" :title="attribute.content">{{ attribute.content }}</a>
          <span v-else :class="b('content')">{{ attribute.content }}</span>
        </div>
      </div>
    </div>
    <div :class="b('toggle', { open: isOpen })" @click="toggle()" role="button">
      <img :class="b('arrow')" src="../assets/icons/i-arrow-down.svg">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-attribute-grid',
    // components: {},
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
        isOpen: false,
        tableMaxHeight: 0
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.tableMaxHeight = this.getClosedHeight();
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

        if (this.isOpen) {
          this.tableMaxHeight = this.getExpanedHeight();
        } else {
          this.tableMaxHeight = this.$refs['row_0'][0].clientHeight;
        }
      },

      /**
       * Returns the height of the attribute grid for the closed state.
       * @returns {Number}
       */
      getClosedHeight() {
        let firstColumn = this.$refs['row_0'];
        if (firstColumn) {
          return firstColumn[0].clientHeight;
        }
        return 0;
      },

      /**
       * Returns the height of the attribute grid for the expaned state.
       * @returns {Number}
       */
      getExpanedHeight() {
        let height = 0;
        for (let i = 0; i < this.attributes.length; i++) {
          height += this.$refs['row_' + i][0].clientHeight;
        }
        return height;
      }
    },

    // render(createElement) {},
  };
</script>

<style lang="scss">
  .c-attribute-grid {
    $toggle-animation-duration: 0.7s;

    &__row {
      display: flex;
    }

    &__col {
      @include font($font-size--14, 23, $font-weight--regular);
      font-family: $font-family--primary;
      color: $color-grayscale--200;
      flex-basis: 0;
      flex-grow: 1;
      text-align: left;
    }

    &__name {
      color: $color-grayscale--200;
    }

    &__content {
      color: $color-grayscale--400;
    }

    &__link {
      color: $color-grayscale--400;
      padding: $spacing--0;
      border-color: $color-grayscale--400;
    }

    &--headline &__row:first-child &__col {
      font-weight: $font-weight--bold;
    }

    &__toggle {
      display: none;
    }

    &--dont-shrink-on-mobile &__table {
      max-height: inherit !important;
    }

    &--shrink-on-mobile &__toggle {
      display: block;
      border-top: thin solid $color-grayscale--600;
      margin-top: $spacing--10;
      padding: $spacing--10 $spacing--0;
      
      @include media(xs) {
        display: none;
      }
    }

    &__arrow {
      display: block;
      height: $spacing--15;
      width: auto;
      margin: auto;
      transition: transform $toggle-animation-duration;
    }

    &__toggle--open &__arrow {
      transform: rotate(180deg) !important;
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
        max-height: inherit;
        overflow: visible;
      }
    }

    &__table--open {
      
      @include media(xs) {
        max-height: inherit !important;
      }
    }
  }
</style>
