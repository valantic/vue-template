<template>
  <div id="app">
    <header is="vue:c-header" />
    <router-view />
    <footer is="vue:c-footer" />
    <c-vas-sidebar
      :settings="styleguideSettings"
      @update-theme="onUpdateTheme"
      @update-language="onUpdateLanguage"
    />
  </div>
</template>

<script lang="ts">
  import cVasSidebar from '@valantic/vue-styleguide/src/components/c-vas-sidebar.vue';
  import { StyleguideSettings } from '@valantic/vue-styleguide/src/types/settings';
  import { defineComponent } from 'vue';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import { i18nSetLocale } from '@/setup/i18n';
  import useNotificationStore from '@/stores/notification';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
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

      onUpdateTheme(theme: string) {
        console.log('theme has changed.', theme); // eslint-disable-line no-console
      },

      onUpdateLanguage(language: string) {
        i18nSetLocale(language);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // Define #app styles in @/setup/scss/_globals.scss
</style>
