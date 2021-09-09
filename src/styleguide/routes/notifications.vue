<template>
  <l-default>
    <div :class="b()">
      <div>
        <!-- Default API Messages -->
        <h2 :class="b('label')">
          Default global Messages:
        </h2>
        <e-button @click="getApiResponseMessage('success')">
          Success
        </e-button>
        <e-button @click="getApiResponseMessage('info')">
          Info
        </e-button>
        <e-button @click="getApiResponseMessage('error')">
          Error
        </e-button>

        <!-- Custom Container Messages -->
        <h2 :class="b('label')">
          Custom Container Message
        </h2>
        <e-button @click="getApiResponseMessage('success', 'footer')">
          Success
        </e-button>
        <e-button @click="getApiResponseMessage('info', 'footer')">
          Info
        </e-button>
        <e-button @click="getApiResponseMessage('error', 'footer')">
          Error
        </e-button>

        <!-- Redirect handling -->
        <h2 :class="b('label')">
          Redirect
        </h2>
        <e-button @click="getApiResponseMessage('success', '', '/styleguide/sandbox/layout')">
          Success
        </e-button>
        <e-button @click="getApiResponseMessage('info', '', '/styleguide/sandbox/layout')">
          Info
        </e-button>
        <e-button @click="getApiResponseMessage('error', '', '/styleguide/sandbox/layout')">
          Error
        </e-button>

        <hr>

        <!-- Options -->
        <h2 :class="b('label')">
          Options
        </h2>
        <e-button @click="modalIsOpen = true">
          Open Modal
        </e-button>
      </div>
    </div>

    <hr>

    <div :class="b('second-container')">
      Custom Container:
      <c-notification-container selector="footer" />
    </div>

    <!-- Modal -->
    <c-modal
      :open.sync="modalIsOpen"
      :header-component="null"
    >
      Example Modal
    </c-modal>
  </l-default>
</template>

<script>
  import api from '@/helpers/api';
  import lDefault from '@/components/l-default';
  import cModal from '@/components/c-modal';
  import cNotificationContainer from '@/components/c-notification-container';

  export default {
    name: 'notifications',
    components: {
      cNotificationContainer,
      lDefault,
      cModal,
    },
    data() {
      return {
        modalIsOpen: false,
      };
    },
    // computed: {},
    // mounted() {},
    methods: {
      getApiResponseMessage(type, selector, redirectUrl) {
        api.get('/notifications/global', {
          params: {
            type,
            selector,
            redirectUrl,
          },
        });
      },
    }
  };
</script>

<style lang="scss">
  .notifications {
    display: flex;
    justify-content: flex-end;

    &__label {
      display: block;
      margin: $spacing--15 0 $spacing--5;
    }

    &__second-container {
      min-height: 400px;
    }

    .e-button:not(:last-of-type) {
      margin-right: $spacing--20;
    }
  }
</style>
