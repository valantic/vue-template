<template>
  <div :class="b({ headline: headline })">
    <div :class="b('grid', { toggled: toggled })">
      <div v-for="(attribute, index) in attributes" :key="index" :class="b('row')">
        <div :class="b('col')">
          <span :class="b('name')">{{ attribute.name }}</span>
        </div>
        <div :class="b('col')">
          <a v-if="attribute.url" :class="b('link')" :href="attribute.url">{{ attribute.content }}</a>
          <span v-else :class="b('content')">{{ attribute.content }}</span>
        </div>
      </div>
    </div>
    <div :class="b('toggle', { toggled: toggled })" @click="toggle()">
      <img :class="b('arrow')" src="../assets/icons/arrow.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-attributegrid',
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
    },

    data() {
      return {
        toggled: false
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
      toggle() {
        this.toggled = !this.toggled;
      }
    },

    // render(createElement) {},
  };
</script>

<style lang="scss">
  .c-attributegrid {
    $toggle-animation-duration: 0.7s;

    &__row {
      display: flex;
    }

    &__col {
      font-family: $font-family--primary;
      font-weight: $font-weight--regular;
      color: $color-grayscale--200;
      font-size: $font-size--14;
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
      border-top: thin solid $color-grayscale--600;
      margin-top: $spacing--10;
      padding: $spacing--10 $spacing--0;

      @include media(xxs, xs) {
        display: block;
      }
    }

    &__arrow {
      display: block;
      height: $spacing--15;
      width: auto;
      margin: auto;
      transition: transform $toggle-animation-duration;
    }

    &__toggle--toggled &__arrow {
      transform: rotate(180deg);
    }
    
    &__grid {
      @include media(xxs, xs) {
        max-height: $spacing--20;
        transition: max-height $toggle-animation-duration;
        overflow: hidden;
      }
    }

    &__grid--toggled {
      @include media(xxs, xs) {
        max-height: 500px;
      }
    }
  }
</style>
