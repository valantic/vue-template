<!-- TODO - This component is supposed to be functional -->
<template>
  <div :class="b()">
    <div :class="b('inner', activeTheme)">
      <div :class="b('languages')">Languages</div>
      <hr :class="b('languages-separator')">
      <div :class="b('navigation')">Navigation</div>
      <hr :class="b('navigation-separator')">
      <div :class="b('social')">
        <div :class="b('social-inner')">
          <c-social-media/>
        </div>
      </div>
      <hr :class="b('social-separator')">
      <div :class="b('sonepar')">
        <div :class="b('sonepar-inner')">
          <a :class="b('sonepar-link')" :href="$t('c-footer.soneparLink')" target="_blank">{{ $t('c-footer.sonepar') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cSocialMedia from '@/components/c-social-media';
  import themes from '@/mixins/themes';

  export default {
    name: 'c-footer',
    components: {
      cSocialMedia,
    },
    mixins: [themes],

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
      @include theme((
        background-gradient: (
          from: color-gradient--2-0,
          to: color-gradient--2-1
        )
      ));

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
      flex: 0 1 percentage(12 / 12);
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
        flex: 0 1 percentage(7 / 12);
        order: 5;
      }
    }

    &__social-inner {
      padding: $spacing--20 $spacing--10 $spacing--30 $spacing--0;

      @include media(sm) {
        padding-right: $spacing--30;
      }
    }

    &__social-separator {
      @include media(xs) {
        display: none;
      }
    }

    &__sonepar {
      @include media(xs) {
        flex: 0 1 percentage(5 / 12);
        order: 4;
      }
    }

    &__sonepar-inner {
      @include font($font-size: $font-size--18, $font-weight: $font-weight--bold);

      padding: $spacing--20 $spacing--0 $spacing--30 $spacing--10;

      @include media(sm) {
        padding-left: $spacing--30;
      }
    }

    &__sonepar-link,
    &__sonepar-link:hover,
    &__sonepar-link:active,
    &__sonepar-link:focus {
      border: none;
      color: $color-grayscale--1000;
      padding: 0;
    }
  }
</style>
