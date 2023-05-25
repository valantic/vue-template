<template>
  <div :class="b()">
    <div :class="b('content')">
      <div :class="b('inner')">
        <c-notification-container />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cNotificationContainer from '@/components/c-notification-container.vue';
  import notificationStore, { TNotificationStore } from '@/stores/notification';

  interface ISetup {
    notificationStore: TNotificationStore
  }

  export default defineComponent({
    name: 'l-default',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cNotificationContainer,
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
    // created() {},
    // beforeMount() {},
    mounted() {
      this.getNotificationsFromStorage();
    },
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
      getNotificationsFromStorage() {
        try {
          const messages = window.localStorage.getItem('vueNotification');
          const messagesParsed = messages ? JSON.parse(messages) : null;

          if (Array.isArray(messagesParsed) && messagesParsed.length) {
            messagesParsed.forEach(this.notificationStore.showNotification);

            // Clears the localStorage notifications.
            window.localStorage.removeItem('vueNotification');
          }
        } catch (error) {
          throw new Error('An error occurred why retrieving messages from the localStorage.');
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

  .l-default {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &__content {
      flex: 1 0 auto;
      background: variables.$color-grayscale--600;
    }

    &__inner {
      position: relative;
      max-width: #{map-get(variables.$breakpoints, xl) - 20px};
      margin: 0 auto;
      background: variables.$color-grayscale--1000;
      box-shadow: 0 4px 10px 1px rgba(variables.$color-grayscale--400, 0.3);
    }

    .c-notification-container {
      @include mixins.z-index(globalNotification);

      position: absolute;
    }
  }
</style>
