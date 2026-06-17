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
      <e-vas-toggle v-model="isLoggedIn"> Logged In </e-vas-toggle>
    </template>
  </c-vas-sidebar>
</template>

<script lang="ts">
  import { cVasSidebar } from '@valantic/vue-styleguide';
  import { eVasSelect, eVasToggle } from '@valantic/vue-styleguide/elements';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
  import useNotificationStore from '@/stores/notification';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
    route: ReturnType<typeof useRoute>;
  };

  // type Data = {};

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
    // data(): Data {
    //   return {
    //   };
    // },

    computed: {
      layoutPage(): string {
        return (this.route?.meta?.layout as string) ?? 'l-default';
      },

      isLoggedIn: {
        get() {
          return Math.random() > 0.5;
        },
        set(value: boolean) {
          // eslint-disable-next-line no-console
          console.log('Setting isLoggedIn to:', value);
        },
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
    },
    // render() {},
  });
</script>
