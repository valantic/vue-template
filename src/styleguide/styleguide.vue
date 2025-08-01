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
    @update-language="onUpdateLanguage"
  />
</template>

<script lang="ts">
  import cVasSidebar from '@valantic/vue-styleguide/src/components/c-vas-sidebar.vue';
  import { StyleguideSettings } from '@valantic/vue-styleguide/src/types/settings';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import i18n, { i18nSetLocale } from '@/setup/i18n';
  import useNotificationStore from '@/stores/notification';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
    route: ReturnType<typeof useRoute>;
  };

  // type Data = {};

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
    // data(): Data {
    //   return {};
    // },

    computed: {
      layoutPage(): string {
        return (this.route?.meta?.layout as string) ?? 'l-default';
      },

      styleguideSettings(): StyleguideSettings {
        // TODO: Use i18n languages for available languages instead of hardcoded values.

        return {
          themePath: 'src/setup/scss/themes',
          availableThemes: [
            {
              name: 'theme-default',
              id: 'theme-default',
              selected: true,
            },
          ],
          availableLanguages: [
            {
              label: 'English',
              value: 'en',
            },
            {
              label: 'Deutsch',
              value: 'de',
            },
          ],
          // @ts-ignore -- 'locale' is a reactive, not a string. @see https://github.com/intlify/vue-i18n-next/issues/785
          selectedLanguage: i18n.global?.locale?.value || 'en',
        };
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
