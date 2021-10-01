<template>
  <div id="app">
    <header is="c-header" />
    <router-view />
    <footer is="c-footer" />
    <s-navigation :routes="routes" nav-position="bottom-right" />
  </div>
</template>

<script>
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import { mapMutations } from 'vuex';
  import sNavigation from '@/styleguide/components/s-navigation';
  import styleguideRoutes from '@/setup/styleguide.routes';

  export default {
    name: 'app',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sNavigation,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * An Array of available routes.
       *
       * @returns {Array.<Object>}
       */
      routes() {
        return styleguideRoutes;
      }
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      this.getNotificationFromStorage();
    },
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      ...mapMutations('notification', [
        'pushNotification',
      ]),

      /**
       * Gets localStorage messages and pushes them in the notification store to display.
       */
      getNotificationFromStorage() {
        const notification = IS_STORAGE_AVAILABLE && localStorage.getItem('notification');
        const parsedNotification = notification ? JSON.parse(notification) : null;

        if (parsedNotification) {
          this.pushNotification(parsedNotification);

          // Clears the localStorage notifications.
          localStorage.removeItem('notification');
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  // Define #app styles in @/setup/scss/_globals.scss
</style>
