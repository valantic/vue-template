<template>
  <l-default>
    <div :class="b()">
      <div>
        <!-- Default API Messages -->
        <h2 :class="b('label')">Default global Messages:</h2>
        <e-button @click="getApiResponseMessage('success')"> Success </e-button>
        <e-button @click="getApiResponseMessage('info')"> Info </e-button>
        <e-button @click="getApiResponseMessage('error')"> Error </e-button>

        <!-- Custom Container Messages -->
        <h2 :class="b('label')">Custom Container Message</h2>
        <e-button @click="getApiResponseMessage('success', 'footer')"> Success </e-button>
        <e-button @click="getApiResponseMessage('info', 'footer')"> Info </e-button>
        <e-button @click="getApiResponseMessage('error', 'footer')"> Error </e-button>

        <!-- Redirect handling -->
        <h2 :class="b('label')">Redirect</h2>
        <e-button @click="getApiResponseMessage('success', '', '/styleguide/sandbox/layout')"> Success </e-button>
        <e-button @click="getApiResponseMessage('info', '', '/styleguide/sandbox/layout')"> Info </e-button>
        <e-button @click="getApiResponseMessage('error', '', '/styleguide/sandbox/layout')"> Error </e-button>

        <!-- Static Not expiring Messages -->
        <h2 :class="b('label')">Static (don't expire) Messages</h2>
        <e-button @click="getApiResponseMessage('success', '', '', false)"> Success </e-button>
        <e-button @click="getApiResponseMessage('info', '', '', false)"> Info </e-button>
        <e-button @click="getApiResponseMessage('error', '', '', false)"> Error </e-button>
      </div>
    </div>

    <hr />

    <div :class="b('second-container')">
      Custom Container:
      <c-notification-container selector="footer" />
    </div>
  </l-default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useNotificationStore from '@/stores/notification';
  import cNotificationContainer from '@/components/c-notification-container.vue';
  import eButton from '@/elements/e-button.vue';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
  };

  export default defineComponent({
    name: 'r-notifications',
    components: {
      cNotificationContainer,
      eButton,
    },

    setup(): Setup {
      return {
        notificationStore: useNotificationStore(),
      };
    },
    // data() {},

    // computed: {},
    // mounted() {},
    methods: {
      /**
       * Triggers an API call to get a response message.
       */
      // eslint-disable-next-line max-params
      getApiResponseMessage(type: string, selector?: string, redirectUrl?: string, expire?: boolean): void {
        this.notificationStore.$api.get('/notifications/global', {
          params: {
            type,
            selector,
            redirectUrl,
            expire,
          },
        });
      },
    },
  });
</script>

<style lang="scss">
  @use '../../../setup/scss/mixins';
  @use '../../../setup/scss/variables';

  .r-notifications {
    display: flex;
    justify-content: flex-end;

    &__label {
      display: block;
      margin: variables.$spacing--15 0 variables.$spacing--5;
    }

    &__second-container {
      min-height: 400px;
    }

    .e-button:not(:last-of-type) {
      margin-right: variables.$spacing--20;
    }
  }
</style>
