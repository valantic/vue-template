<!-- TODO - This component is supposed to be functional -->
<template>
  <div :class="b()">
    Footer
  </div>
</template>

<script>
  import cSocialMedia from '@/components/c-social-media';

  export default {
    name: 'c-footer',
    components: {
      cSocialMedia,
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
  .c-footer {
    // ...
  }
</style>
