<template>
  <div :class="b()">
    <small><pre>{{ getTestData }} </pre></small>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'c-test',
    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('test', [
        'getTestData',
      ]),
    },
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
  .c-test {
  }
</style>
