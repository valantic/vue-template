<template>
  <div :class="b()">
    <c-header/>
  </div>
</template>

<script>
  import sNavigation from '@/styleguide/components/s-navigation';
  import cHeader from '@/components/c-header';

  export default {
    name: 'layout',
    components: {
      cHeader,
      sNavigation
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
