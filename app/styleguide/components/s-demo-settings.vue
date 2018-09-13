<template>
  <ul :class="b()">
    <li :class="b('item')">
      <s-toggle v-model="isLoggedIn">
        Logged in
      </s-toggle>
    </li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex';
  import userData from '@/store/modules/session/mock/user';
  import SToggle from './s-toggle';

  export default {
    name: 's-demo-settings',
    components: {
      SToggle,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('session', [
        'isLoggedInUser'
      ]),
      isLoggedIn: {
        get() {
          return this.isLoggedInUser;
        },
        set(isLoggedIn) {
          this.$store.commit('session/data', isLoggedIn ? userData : null);
        }
      }
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
  .s-demo-settings {
    @extend %list-reset;
  }
</style>
