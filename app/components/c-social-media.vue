<template>
  <div :class="b()">
    <div :class="b('follow-us')">{{ $t('c-social-media.followUs') }}</div>
    <a :class="b('link')" :href="$t('c-social-media.facebookUrl')" target="_blank">
      <e-icon :class="b('icon')" inline icon="i-facebook"/>
    </a>
    <a :class="b('link')" :href="$t('c-social-media.linkedinUrl')" target="_blank">
      <e-icon :class="b('icon')" inline icon="i-in"/>
    </a>
    <a :class="b('link')" :href="$t('c-social-media.xingUrl')" target="_blank">
      <e-icon :class="b('icon')" inline icon="i-xing"/>
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

    &__follow-us {
      @include media(sm) {
        margin-right: $spacing--30;
      }
    }

    &__follow-us,
    &__link {
      flex: 0 1 auto;
    }

    &__link {
      display: block;
      margin-left: $spacing--10;
    }

    &__icon {
      width: $spacing--30;
      height: $spacing--30;

      svg {
        width: 100%;
        height: 100%;
      }
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
