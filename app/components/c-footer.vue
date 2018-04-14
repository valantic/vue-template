<!-- TODO - This component is supposed to be functional -->
<template>
  <div :class="b()">
    <div :class="b('inner')">
      <div :class="b('languages')">Languages</div>
      <hr :class="b('languages-separator')">
      <div :class="b('navigation')">Navigation</div>
      <hr :class="b('navigation-separator')">
      <div :class="b('social')">Folgen Sie uns auf: (F) (L) (X)</div>
      <hr :class="b('social-separator')">
      <div class="__sonepar">A Sonepar Company</div>
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
    display: flex;
    justify-content: center;
    flex-shrink: 0;

    &__inner {
      background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
      color: $color-primary--3;
      margin: $spacing--0 auto;
      padding: $spacing--0 $spacing--5;
      max-width: map-get($grid-breakpoints, xl);
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &::before {
      content: '';
      flex: 1 1 auto;
      background-color: $color-secondary--1;
      display: block; /* IE 11 */
    }

    &::after {
      content: '';
      flex: 1 1 auto;
      background-color: $color-secondary--2;
      display: block; /* IE 11 */
    }

    &__navigation,
    &__navigation-separator,
    &__languages,
    &__languages-separator,
    &__sonepar,
    &__social,
    &__social-separator {
      flex: 0 1 percentage (12 / 12);
    }

    &__navigation-separator,
    &__languages-separator,
    &__social-separator {
      margin: $spacing--0;
      border: none;
      width: 100%;
      height: 1px;
      background-color: $color-primary--3;
    }

    &__languages {
      @include media(xs) {
        flex: 0 1 percentage(6 / 12);
        order: 2;
      }
    }

    &__languages-separator {
      @include media(xs) {
        order: 3;
      }
    }

    &__navigation {
      @include media(xs) {
        flex: 0 1 percentage(6 / 12);
        order: 1;
      }
    }

    &__navigation-separator {
      @include media(xs) {
        display: none;
      }
    }

    &__social {
      @include media(xs) {
        flex: 0 1 percentage(6 / 12);
        order: 5;
      }
    }

    &__social-separator {
      @include media(xs) {
        display: none;
      }
    }
  }

  /* stylelint-disable selector-class-pattern */
  .__sonepar {
    @include font($font-size: $font-size--18, $font-weight: $font-weight--bold);

    padding: $spacing--20 $spacing--0 $spacing--30 $spacing--10;

    @include media(xs) {
      order: 4;
      padding-left: $spacing--20;
    }
  }
</style>
