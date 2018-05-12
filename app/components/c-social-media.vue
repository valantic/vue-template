<template>
  <div :class="b()">
    <span :class="b('title')">{{ $t('c-social-media.followUs') }}</span>
    <a :class="b('link')" :href="$t('c-social-media.facebookUrl')" target="_blank" title="">
      <e-icon :class="b('icon')" inline icon="i-facebook--negative"/>
    </a>
    <a :class="b('link')" :href="$t('c-social-media.linkedinUrl')" target="_blank" title="">
      <e-icon :class="b('icon')" inline icon="i-in--negative"/>
    </a>
    <a :class="b('link')" :href="$t('c-social-media.xingUrl')" target="_blank" title="">
      <e-icon :class="b('icon')" inline icon="i-xing--negative"/>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'c-social-media',
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
  .c-social-media {
    @include font($font-size: $font-size--18);

    display: flex;
    justify-content: flex-end;

    &__title {
      margin-right: auto;

      @include media(xs) {
        margin-right: $spacing--10;
      }

      @include media(sm) {
        margin-right: $spacing--30;
      }
    }

    &__title,
    &__link {
      flex: 0 1 auto;
    }

    &__link {
      display: block;
      margin-left: $spacing--10;

      @include media(sm) {
        margin-left: $spacing--20;
      }
    }

    &__link:first-of-type {
      margin-left: $spacing--0;
    }

    &__icon {
      width: 30px;
      height: 30px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__link &__icon {
      display: block;
    }

    &__link,
    &__link:hover,
    &__link:active,
    &__link:focus {
      border: none;
      color: $color-grayscale--1000;
      padding: $spacing--0;
    }
  }
</style>
