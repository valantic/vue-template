<!-- TODO - This component is supposed to be functional -->
<template>
  <div class="c-footer">
    <div class="c-footer__left"></div>
    <div class="c-footer__inner">
      <div class="c-footer__navigation">Navigation</div>
      <div class="c-footer__navigation-separator"></div>
      <div class="c-footer__languages">Languages</div>
      <div class="c-footer__languages-separator"></div>
      <div class="c-footer__sonepar">A Sonepar Company</div>
      <div class="c-footer__social">Folgen Sie uns auf: (F) (L) (X)</div>
      <div class="c-footer__social-separator"></div>
    </div>
    <div class="c-footer__right"></div>
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

    &__left {
      flex: 1 1 auto;
      background-color: $color-secondary--1;
    }

    &__right {
      flex: 1 1 auto;
      background-color: $color-secondary--2;
    }

    &__inner {
      background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
      color: $color-primary--3;
      margin: $spacing--0 auto;
      padding: $spacing--0 $spacing--10;
      min-height: 150px;
      max-width: map-get($grid-breakpoints, xl);
      width: 100%;
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
