<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <div :class="b('navigation')">Navigation</div>
      <div :class="b('navigation-separator')"></div>
      <div :class="b('languages')">Languages</div>
      <div :class="b('languages-separator')"></div>
      <div :class="b('sonepar')">A Sonepar Company</div>
      <div :class="b('social')">Folgen Sie uns auf: (F) (L) (X)</div>
      <div :class="b('social-separator')"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-footer',
    // components: {},
    // mixins: [],

    // props: {},
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .c-footer {
    background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
    color: $color-primary--3;

    &__wrapper {
      margin: $spacing--0 auto;
      padding: $spacing--0 $spacing--10;
      min-height: 150px;
      max-width: map-get($grid-breakpoints, xl);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @include media(xs) {
        flex-direction: row;
      }
    }

    &__navigation,
    &__navigation-separator,
    &__languages,
    &__languages-separator,
    &__sonepar,
    &__social,
    &__social-separator {
      flex: 0 1 auto;
      align-self: flex-start;
    }

    &__navigation-separator,
    &__languages-separator,
    &__social-separator {
      width: 100%;
      height: 1px;
      background-color: $color-primary--3;
    }

    &__navigation {
      @include media(xxs, xxs) {
        order: 3;
      }
    }

    &__navigation-separator {
      @include media(xxs, xxs) {
        order: 4;
      }

      @include media(xs) {
        display: none;
      }
    }

    &__languages {
      @include media(xxs, xxs) {
        order: 1;
      }
    }

    &__languages-separator {
      @include media(xxs, xxs) {
        order: 2;
      }
    }

    &__sonepar {
      @include media(xxs, xxs) {
        order: 7;
      }
    }

    &__social {
      @include media(xxs, xxs) {
        order: 5;
      }
    }

    &__social-separator {
      @include media(xxs, xxs) {
        order: 6;
      }

      @include media(xs) {
        display: none;
      }
    }
  }
</style>
