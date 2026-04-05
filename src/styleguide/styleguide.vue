<template>
  <header is="vue:c-header" />
  <component
    v-if="layoutPage"
    :is="layoutPage"
  >
    <router-view />
  </component>
  <footer is="vue:c-footer" />
  <c-vas-sidebar>
    <template #customSettings>
      <e-vas-toggle v-model="settings.isLoggedIn"> Logged In </e-vas-toggle>

      <label>
        Language:
        <e-vas-select
          :model-value="settings.activeLanguage"
          :options="options.languages"
          @change="onChangeLanguage"
        />
      </label>
      <label>
        Theme:
        <e-vas-select
          :model-value="settings.activeTheme"
          :options="options.themes"
          @change="onChangeTheme"
        />
      </label>
    </template>
  </c-vas-sidebar>
</template>

<script lang="ts">
  import { cVasSidebar } from '@valantic/vue-styleguide';
  import { eVasSelect, eVasToggle } from '@valantic/vue-styleguide/elements';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import i18n, { I18N_FALLBACK } from '@/setup/i18n';
  import useNotificationStore from '@/stores/notification';

  type SelectOption = {
    label: string;
    value: string;
  };

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
    route: ReturnType<typeof useRoute>;
  };

  type Data = {
    options: {
      themes: SelectOption[];
      languages: SelectOption[];
    };
    settings: {
      isLoggedIn: boolean;
      activeLanguage: string;
      activeTheme: string;
    };
  };

  export default defineComponent({
    name: 'app', // eslint-disable-line vue/match-component-file-name

    components: {
      cVasSidebar,
      eVasSelect,
      eVasToggle,
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

      onChangeLanguage() {
        // eslint-disable-next-line no-console
        console.log('Language changed');
      },

      onChangeTheme() {
        // eslint-disable-next-line no-console
        console.log('Theme changed');
      },
    },
    // render() {},
  });
</script>
