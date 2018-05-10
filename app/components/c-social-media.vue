<template>
  <div :class="b()">
    <!-- TODO - translate -->
    <div :class="b('follow-us')">Folgen Sie uns auf:</div>
    <a :class="b('facebook')" href="https://www.facebook.com/winterhalterfenner/" target="_blank"><e-icon :class="b('icon')" inline icon="i-facebook"/></a>
    <a :class="b('linkedin')" href="https://www.linkedin.com/m/login/" target="_blank"><e-icon :class="b('icon')" inline icon="i-in"/></a>
    <a :class="b('xing')" href="https://www.xing.com/companies/winterhalter+fennerag?sc_o=da980_e" target="_blank"><e-icon :class="b('icon')" inline icon="i-xing"/></a>
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
    justify-content: space-between;

    &__follow-us {
      margin-right: auto;
    }

    &__facebook,
    &__linkedin,
    &__xing {
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

    &__facebook,
    &__facebook:hover,
    &__facebook:active,
    &__facebook:focus,
    &__linkedin,
    &__linkedin:hover,
    &__linkedin:active,
    &__linkedin:focus,
    &__xing,
    &__xing:hover,
    &__xing:active,
    &__xing:focus {
      border: none;
      color: $color-grayscale--1000;
      padding: 0;
    }
  }
</style>
