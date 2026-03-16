<template>
  <header is="vue:c-header" />
  <component
    v-if="layoutPage"
    :is="layoutPage"
  >
    <router-view />
  </component>
  <footer is="vue:c-footer" />
  <c-vas-sidebar :config="styleguideConfig" />
</template>

<script lang="ts">
  import { VasSettingsStore, cVasSidebar, useVasSettingsStore } from '@valantic/vue-styleguide';
  import { StyleguideConfiguration } from '@valantic/vue-styleguide/types';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import i18n, { I18N_FALLBACK, i18nSetLocale } from '@/setup/i18n';
  import useNotificationStore from '@/stores/notification';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
    vasSettingsStore: VasSettingsStore;
    route: ReturnType<typeof useRoute>;
  };

  type Data = {
    styleguideConfig: Partial<StyleguideConfiguration>;
  };

  export default defineComponent({
    name: 'app', // eslint-disable-line vue/match-component-file-name

    components: {
      cVasSidebar,
    },

    // props: {},

    setup(): Setup {
      return {
        notificationStore: useNotificationStore(),
        vasSettingsStore: useVasSettingsStore(),
        route: useRoute(),
      };
    },
    data(): Data {
      return {
        styleguideConfig: {
          options: {
            themes: [
              {
                label: 'theme-01',
                value: 'theme-01',
              },
              {
                label: 'theme-02',
                value: 'theme-02',
              },
            ],
            languages: [
              {
                label: 'English',
                value: 'en',
              },
              {
                label: 'Deutsch',
                value: 'de',
              },
            ],
          },
          settings: {
            isLoggedIn: false,
            // @ts-ignore -- 'locale' is a reactive, not a string. @see https://github.com/intlify/vue-i18n-next/issues/785
            activeLanguage: i18n.global?.locale?.value || I18N_FALLBACK,
            activeTheme: 'theme-02',
          },
        },
      };
    },

    computed: {
      layoutPage(): string {
        return (this.route?.meta?.layout as string) ?? 'l-default';
      },
    },
    watch: {
      'vasSettingsStore.config.settings': {
        handler(newSettings) {
          // eslint-disable-next-line no-console
          console.log('settings have changed', newSettings);

          i18nSetLocale(newSettings.activeLanguage);
        },
        deep: true,
        immediate: false,
      },
    },

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
