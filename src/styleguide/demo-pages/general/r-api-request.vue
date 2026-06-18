<template>
  <l-vas-layout :class="b()">
    <p :class="b('description')">
      Interactive demo for the native-fetch based <code>$api</code> wrapper. All requests go through MSW — open DevTools
      to inspect headers and payloads.
    </p>

    <div :class="b('split')">
      <div :class="b('controls')">
        <!-- GET with params -->
        <section :class="b('section')">
          <h2 :class="b('section-title')">GET with params</h2>
          <e-button
            variant="secondary"
            @click="sendGet"
          >
            Send GET /api-request/get?name=World
          </e-button>
        </section>

        <!-- POST with body -->
        <section :class="b('section')">
          <h2 :class="b('section-title')">POST with body</h2>
          <e-button
            variant="secondary"
            @click="sendPost"
          >
            Send POST /api-request/post
          </e-button>
        </section>

        <!-- PATCH / PUT / DELETE -->
        <section :class="b('section')">
          <h2 :class="b('section-title')">PATCH / PUT / DELETE</h2>
          <e-button
            variant="secondary"
            @click="sendPatch"
          >
            PATCH
          </e-button>
          <e-button
            variant="secondary"
            @click="sendPut"
          >
            PUT
          </e-button>
          <e-button
            variant="secondary"
            @click="sendDelete"
          >
            DELETE
          </e-button>
        </section>

        <!-- Custom headers -->
        <section :class="b('section')">
          <h2 :class="b('section-title')">Custom headers</h2>
          <div :class="b('row')">
            <label
              :class="b('label')"
              for="custom-header-value"
            >
              x-custom-header value:
            </label>
            <input
              v-model="customHeaderValue"
              id="custom-header-value"
              :class="b('input')"
              type="text"
              placeholder="my-value"
            />
          </div>
          <e-button
            variant="secondary"
            @click="sendWithCustomHeader"
          >
            Send GET with custom header
          </e-button>
        </section>

        <!-- Request abort -->
        <section :class="b('section')">
          <h2 :class="b('section-title')">Request abort (uniqueId)</h2>
          <p :class="b('hint')">
            The slow endpoint waits 3 s. Clicking "Start" twice aborts the first request — no error notification should
            appear.
          </p>
          <e-button
            variant="secondary"
            @click="startSlowRequest"
          >
            Start slow request
          </e-button>
          <span
            v-if="slowPending"
            :class="b('badge', { pending: true })"
            >pending…</span
          >
        </section>

        <!-- Error responses -->
        <section :class="b('section')">
          <h2 :class="b('section-title')">Error responses</h2>
          <e-button
            variant="secondary"
            @click="sendError(400)"
          >
            400 Bad Request
          </e-button>
          <e-button
            variant="secondary"
            @click="sendError(404)"
          >
            404 Not Found
          </e-button>
          <e-button
            variant="secondary"
            @click="sendError(500)"
          >
            500 Server Error
          </e-button>
        </section>
      </div>

      <div :class="b('sidebar')">
        <h2 :class="b('sidebar-title')">Response</h2>
        <pre :class="b('response')">{{ apiDemoResponse }}</pre>
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { lVasLayout } from '@valantic/vue-styleguide/layouts';
  import { defineComponent } from 'vue';
  import useNotificationStore from '@/stores/notification';
  import eButton from '@/elements/e-button.vue';

  type Setup = {
    notificationStore: ReturnType<typeof useNotificationStore>;
  };

  type Data = {
    lastResponse: unknown;
    customHeaderValue: string;
    slowPending: boolean;
  };

  /**
   * Interactive demo for the native-fetch based $api wrapper.
   */
  export default defineComponent({
    name: 'r-api-request',

    components: {
      lVasLayout,
      eButton,
    },

    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        notificationStore: useNotificationStore(),
      };
    },

    data(): Data {
      return {
        lastResponse: null,
        customHeaderValue: 'my-value',
        slowPending: false,
      };
    },

    computed: {
      apiDemoResponse(): string {
        if (this.lastResponse) {
          return JSON.stringify(this.lastResponse, null, 2);
        }

        return 'No response yet.';
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      sendGet(): void {
        this.notificationStore.$api
          .get('/api-request/get', { params: { name: 'World', timestamp: Date.now() } })
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },

      sendPost(): void {
        this.notificationStore.$api
          .post('/api-request/post', { hello: 'world', count: 42 })
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },

      sendPatch(): void {
        this.notificationStore.$api
          .patch('/api-request/patch', { field: 'updated' })
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },

      sendPut(): void {
        this.notificationStore.$api
          .put('/api-request/put', { field: 'replaced' })
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },

      sendDelete(): void {
        this.notificationStore.$api
          .delete('/api-request/delete')
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },

      sendWithCustomHeader(): void {
        this.notificationStore.$api
          .get('/api-request/headers', { headers: { 'x-custom-header': this.customHeaderValue } })
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },

      startSlowRequest(): void {
        this.slowPending = true;
        this.notificationStore.$api
          .get('/api-request/slow', {}, 'slow-demo')
          .then((response) => {
            this.slowPending = false;
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.slowPending = false;
          });
      },

      sendError(status: number): void {
        this.notificationStore.$api
          .get(`/api-request/error/${status}`)
          .then((response) => {
            this.lastResponse = { status: response.status, data: response.data };
          })
          .catch(() => {
            this.lastResponse = null;
          });
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '@/setup/scss/variables';

  .r-api-request {
    &__description {
      margin-bottom: variables.$va-spacing--30;
      color: variables.$va-color-grayscale--400;
    }

    &__split {
      display: flex;
      gap: variables.$va-spacing--20;
      align-items: flex-start;
    }

    &__controls {
      flex: 0 0 70%;
      min-width: 0;
    }

    &__sidebar {
      position: sticky;
      top: variables.$va-spacing--20;
      flex: 0 0 calc(30% - #{variables.$va-spacing--20});
    }

    &__sidebar-title {
      margin-bottom: variables.$va-spacing--10;
      font-size: variables.$va-font-size--18;
    }

    &__section {
      margin-bottom: variables.$va-spacing--30;

      .e-button:not(:last-of-type) {
        margin-right: variables.$va-spacing--10;
      }
    }

    &__section-title {
      margin-bottom: variables.$va-spacing--10;
      font-size: variables.$va-font-size--18;
    }

    &__hint {
      margin-bottom: variables.$va-spacing--10;
      color: variables.$va-color-grayscale--400;
      font-size: variables.$va-font-size--14;
    }

    &__row {
      display: flex;
      gap: variables.$va-spacing--10;
      align-items: center;
      margin-bottom: variables.$va-spacing--10;
    }

    &__label {
      font-size: variables.$va-font-size--14;
      white-space: nowrap;
    }

    &__input {
      padding: variables.$va-spacing--5 variables.$va-spacing--10;
      border: 1px solid variables.$va-color-grayscale--600;
      border-radius: 4px;
      font-size: variables.$va-font-size--14;
    }

    &__badge {
      margin-left: variables.$va-spacing--10;
      color: variables.$va-color-grayscale--400;
      font-size: variables.$va-font-size--12;

      &--pending {
        color: variables.$va-color-status--danger;
      }
    }

    &__response {
      min-height: 120px;
      padding: variables.$va-spacing--15;
      overflow-x: auto;
      border-radius: 4px;
      background: variables.$va-color-grayscale--700;
      font-size: variables.$va-font-size--12;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    &__response-empty {
      color: variables.$va-color-grayscale--400;
      font-style: italic;
    }
  }
</style>
