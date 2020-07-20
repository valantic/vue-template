<template>
  <div :class="b()">
    Content of the custom element: {{ $t('foo') }}, {{ theme }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  /**
   * A custom element based component.
   */
  export default {
    name: 'c-custom-element',

    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('session', [
        'theme'
      ])
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
  .c-custom-element {
    // ...
  }
</style>
