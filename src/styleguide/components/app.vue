<template>
  <div id="app">
    <header is="vue:c-header" />
    <router-view />
    <footer is="vue:c-footer" />
    <s-navigation nav-position="bottom-right" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import sNavigation from '@/styleguide/components/s-navigation.vue';
  import notificationStore, { TNotificationStore } from '@/stores/notification';

  interface ISetup {
    notificationStore: TNotificationStore
  }

  export default defineComponent({
    name: 'app',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      sNavigation,
    },

    // props: {},

    setup(): ISetup {
      return {
        notificationStore: notificationStore(),
      };
    },
    // data() {
    //   return {};
    // },

    // computed: {},
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Gets localStorage messages and pushes them in the notification store to display.
       */
      getNotificationFromStorage() {
        const notification = IS_STORAGE_AVAILABLE && localStorage.getItem('vueNotification');
        const parsedNotification = notification ? JSON.parse(notification) : null;

        if (parsedNotification) {
          this.notificationStore.showNotification(parsedNotification);

          // Clears the localStorage notifications.
          localStorage.removeItem('vueNotification');
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // Define #app styles in @/setup/scss/_globals.scss
</style>
