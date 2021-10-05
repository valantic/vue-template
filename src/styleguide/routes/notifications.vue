<template>
  <l-default>
    <div :class="b()">
      <div>
        <!-- Default API Messages -->
        <h2 :class="b('label')">
          Default global Messages:
        </h2>
        <e-button @click="getApiNotificationResponse('success')">
          Success
        </e-button>
        <e-button @click="getApiNotificationResponse('info')">
          Info
        </e-button>
        <e-button @click="getApiNotificationResponse('error')">
          Error
        </e-button>

        <!-- Custom Container Messages -->
        <h2 :class="b('label')">
          Custom Container Message
        </h2>
        <e-button @click="getApiNotificationResponse('success', 'footer')">
          Success
        </e-button>
        <e-button @click="getApiNotificationResponse('info', 'footer')">
          Info
        </e-button>
        <e-button @click="getApiNotificationResponse('error', 'footer')">
          Error
        </e-button>

        <!-- Redirect handling -->
        <h2 :class="b('label')">
          Redirect
        </h2>
        <e-button @click="getApiNotificationResponse('success', '', '/styleguide/sandbox/layout')">
          Success
        </e-button>
        <e-button @click="getApiNotificationResponse('info', '', '/styleguide/sandbox/layout')">
          Info
        </e-button>
        <e-button @click="getApiNotificationResponse('error', '', '/styleguide/sandbox/layout')">
          Error
        </e-button>

        <!-- Static Not expiring Messages -->
        <h2 :class="b('label')">
          Static (don't expire) Messages
        </h2>
        <e-button @click="getApiNotificationResponse('success', '', '', false)">
          Success
        </e-button>
        <e-button @click="getApiNotificationResponse('info', '', '', false)">
          Info
        </e-button>
        <e-button @click="getApiNotificationResponse('error', '', '', false)">
          Error
        </e-button>
      </div>
    </div>

    <hr>

    <div :class="b('second-container')">
      Custom Container:
      <c-notification-container selector="footer" />
    </div>
  </l-default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters, mapMutations } from 'vuex';
  import api from '@/helpers/api';
  import lDefault from '@/components/l-default';
  import cNotificationContainer from '@/components/c-notification-container';
  import notificationData from '@/styleguide/mock-data/api-response/notifications';

  import store from '@/store';

  interface IError {
    state: string;
    notification: string;
  }

  interface IErrors {
    'first-name': IError;
    'last-name': IError;
    email: IError;
  }

  export default defineComponent({
    name: 'notifications',
    components: {
      cNotificationContainer,
      lDefault,
    },
    // data() {},
    // computed: {},
    // mounted() {},
    methods: {
      /**
       * Triggers an API call to get a response message.
       *
       * @param {String} type - The message type.
       * @param {String} [selector] - The optional container selector.
       * @param {String} [redirectUrl] - The optional redirect url.
       * @param {Boolean} [expire] - Defines if the message should auto expire.
       */
      getApiNotificationResponse(type, selector, redirectUrl, expire = true) { // eslint-disable-line max-params
        api.get('/notifications/global', {
          params: {
            type,
            selector,
            redirectUrl,
            expire,
          },
        });
      },
    }
  });
</script>

<style lang="scss">
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .notifications {
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
