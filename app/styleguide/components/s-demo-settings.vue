<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-toggle checked>
        Logged in
      </s-toggle>
    </li>
  </ul>
</template>

<script>
  import sToggle from './s-toggle';

  export default {
    name: 's-demo-settings',
    components: {
      sToggle,
    },
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
  .s-demo-settings {
    @extend %list-reset;
  }
</style>
