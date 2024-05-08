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
  import useNotificationStore from '@/stores/notification';
  import sNavigation from '@/styleguide/components/s-navigation.vue';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
  };

  export default defineComponent({
    name: 'app',

    components: {
      sNavigation,
    },

    // props: {},

    setup(): Setup {
      return {
        notificationStore: useNotificationStore(),
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
