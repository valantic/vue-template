<!-- TODO - This component is supposed to be functional -->
<template>
  <div :class="b()">
    Header
  </div>
</template>

<script>
  import cHeaderLinks from '@/components/c-header-links';
  import cSearch from '@/components/c-search';
  import cMiniCart from '@/components/c-mini-cart';
  import { mapGetters } from 'vuex';

  export default {
    name: 'c-header',
    components: {
      cHeaderLinks,
      cSearch,
      cMiniCart,
    },
    // mixins: [],

    props: {
      /**
       * Sets the display state of the header
       *
       * Valid values: `full, reduced`
       */
      state: {
        type: String,
        default: 'full',
        validator(value) {
          return [
            'full',
            'reduced'
          ].includes(value);
        }
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('session', [
        'user',
        'isLoggedInUser',
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
  .c-header {
    // ...
  }
</style>
