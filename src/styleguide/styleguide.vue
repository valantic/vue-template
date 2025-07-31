<template>
  <header is="vue:c-header" />
  <component
    v-if="layoutPage"
    :is="layoutPage"
  >
    <router-view />
  </component>
  <footer is="vue:c-footer" />
  <c-vas-sidebar
    :settings="styleguideSettings"
    @update-theme="onUpdateTheme"
  />
</template>

<script lang="ts">
  import cVasSidebar from '@valantic/vue-styleguide/src/components/c-vas-sidebar.vue';
  import { StyleguideSettings } from '@valantic/vue-styleguide/src/types/settings';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import useNotificationStore from '@/stores/notification';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
    route: ReturnType<typeof useRoute>;
  };

  type Data = {
    styleguideSettings: StyleguideSettings;
  };

  export default defineComponent({
    name: 'app',

    components: {
      cVasSidebar,
    },

    // props: {},

    setup(): Setup {
      return {
        notificationStore: useNotificationStore(),
        route: useRoute(),
      };
    },
    data(): Data {
      return {
        styleguideSettings: {
          themePath: 'src/setup/scss/themes',
          availableThemes: [
            {
              name: 'theme-default',
              id: 'theme-default',
              selected: true,
            },
          ],
        },
      };
    },

    computed: {
      layoutPage(): string {
        return (this.route?.meta?.layout as string) ?? 'l-default';
      },
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

      onUpdateTheme(theme: string) {
        console.log('theme has changed.', theme); // eslint-disable-line no-console
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // Define #app styles in @/setup/scss/_globals.scss
</style>
