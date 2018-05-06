<template>
  <div :class="b()">
    <!-- TODO - translate -->
    <span :class="b('follow-us')">Folgen Sie uns auf:</span>
    <span :class="b('icons')">
      <a :class="b('facebook')" href="#" target="_blank">[f]</a>
      <a :class="b('linkedin')" href="#" target="_blank">[in]</a>
      <a :class="b('xing')" href="#" target="_blank">[X]</a>
    </span>
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

    padding: 20px 0 30px 10px;
    display: flex;
    justify-content: space-between;

    &__follow-us {
      flex: 0 1 percentage(8/12);
    }

    &__icons {
      text-align: right;
      flex: 0 1 percentage(4/12);
    }

    a {
      border: none;
      color: $color-grayscale--1000;
      padding: 0;
    }
  }
</style>
