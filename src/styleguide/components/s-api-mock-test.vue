<template>
  <div :class="b()">
    <div :class="b('header')">
      <h2 :class="b('title')">Mock API Endpoint Handlers</h2>
      <div :class="b('header-actions')">
        <input
          v-model="search"
          type="text"
          name="search"
          placeholder="Search"
        />
        <e-button @click="reset"> Reset all </e-button>
      </div>
    </div>
    <div v-if="!filteredEndpoints.length">No handlers found.</div>
    <div
      v-else
      :class="b('table-wrapper')"
    >
      <table :class="b('table')">
        <thead>
          <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Debug Mode</th>
            <th>Status</th>
            <th style="width: 100%">Response body (JSON)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(endpoint, index) in filteredEndpoints"
            :key="index"
            :class="b('row', { debugMode: !!configurations[endpoint.header]?.enabled })"
          >
            <td>
              {{ endpoint.method }}
            </td>
            <td>
              {{ endpoint.path }}
            </td>
            <td>
              <!-- eslint-disable-next-line vue/no-extra-parens -->
              <e-checkbox
                v-model="(configurations[endpoint.header] as Record<'enabled', boolean>).enabled"
                name="debug-mode-enabled"
                value
              />
            </td>
            <td>
              <!-- eslint-disable-next-line vue/no-extra-parens -->
              <e-select
                v-model="(configurations[endpoint.header] as Record<'status', string>).status"
                :options="statusOptions"
                name="status"
              />
            </td>
            <td>
              <!-- eslint-disable-next-line vue/no-extra-parens -->
              <input
                v-model="(configurations[endpoint.header] as Record<'response', string>).response"
                type="text"
                name="response"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import { HttpResponse, RequestHandler, ResponseResolver, http } from 'msw';
  import { defineComponent } from 'vue';
  import eButton from '@/elements/e-button.vue';
  import eCheckbox from '@/elements/e-checkbox.vue';
  import eSelect from '@/elements/e-select.vue';
  import mockWorker from '@/styleguide/api/browser';

  type DebugConfiguration = {
    header: string;
    enabled: boolean;
    status: string;
    response: string;
  };

  type Setup = {
    statusOptions: {
      label: string;
      value: string;
    }[];
  };

  type Data = {
    search: string;
    handlers: ReadonlyArray<RequestHandler> | null;
    configurations: {
      [key: string]: DebugConfiguration;
    };
  };

  type Endpoint = {
    header: string;
    method: string;
    path: string;
  };

  const storageKey = 'sApiMockTest';

  /**
   * Lists all active Mock API Endpoint handlers and allows enabling error mode for them.
   */
  export default defineComponent({
    name: 's-api-mock-test',
    components: {
      eSelect,
      eCheckbox,
      eButton,
    },

    // props: {},
    emits: {
      close: () => true,
    },

    setup(): Setup {
      return {
        statusOptions: [
          {
            label: '200 OK',
            value: '200',
          },
          {
            label: '400 Bad Request',
            value: '400',
          },
          {
            label: '403 Forbidden',
            value: '403',
          },
          {
            label: '500 Internal Server Error',
            value: '500',
          },
        ],
      };
    },
    data(): Data {
      return {
        search: '',
        handlers: null,
        configurations: {},
      };
    },

    computed: {
      /**
       * Returns the mapped list of endpoints.
       */
      mappedEndpoints(): Endpoint[] {
        const { handlers } = this;

        if (!handlers) {
          return [];
        }

        return handlers.map((handler) => handler.info) as Endpoint[];
      },

      /**
       * Returns the filtered list of endpoints.
       */
      filteredEndpoints(): Endpoint[] {
        const { search, mappedEndpoints } = this;

        if (!search) {
          return mappedEndpoints;
        }

        return mappedEndpoints.filter((endpoint) => endpoint.header.toLowerCase().includes(search.toLowerCase()));
      },
    },
    watch: {
      /**
       * Updates handler and local storage when configuration changed.
       */
      configurations: {
        handler(configurationsValue: DebugConfiguration): void {
          this.setupHandlers();
          window.localStorage.setItem(storageKey, JSON.stringify(configurationsValue));
        },
        deep: true,
      },
    },

    // beforeCreate() {},
    created() {
      mockWorker.resetHandlers();

      this.handlers = mockWorker.listHandlers();
      this.setDefaultConfigurations();

      try {
        const configurationsFromStorage = JSON.parse(window.localStorage.getItem(storageKey) || '{}');

        if (configurationsFromStorage) {
          this.configurations = {
            ...this.configurations,
            ...configurationsFromStorage,
          };

          this.setupHandlers();
        }
      } catch (e) {
        console.warn('Configuration from storage could not be read'); // eslint-disable-line
      }
    },
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      mockWorker.resetHandlers();
    },
    // unmounted() {},

    methods: {
      /**
       * Sets up the default configurations.
       */
      setDefaultConfigurations(): void {
        this.handlers?.forEach((handler) => {
          const { header } = handler.info;

          this.configurations[header] = {
            header,
            enabled: false,
            status: '200',
            response: '',
          };
        });
      },

      /**
       * Restores the default configurations and resets all handlers.
       */
      reset(): void {
        this.setDefaultConfigurations();
        mockWorker.resetHandlers();
      },

      /**
       * Sets up handlers that are prepended to the mock worker and will have priority over the default handlers.
       */
      setupHandlers(): void {
        const handlers = Object.values(this.configurations)
          .filter((configuration) => configuration.enabled)
          .map((configuration) => {
            const [method, path] = configuration.header.split(' ');

            if (!path || !method) {
              throw Error('Invalid header configuration');
            }

            let response: object = {};

            try {
              response = JSON.parse(configuration.response);
            } catch (e) {
              // Do nothing
            }

            const resolver: ResponseResolver = () =>
              HttpResponse.json(response, {
                status: parseInt(configuration.status, 10),
              });

            switch (method) {
              case 'GET':
                return http.get(path, resolver) as RequestHandler;

              case 'POST':
                return http.post(path, resolver) as RequestHandler;

              case 'PUT':
                return http.put(path, resolver) as RequestHandler;

              case 'PATCH':
                return http.patch(path, resolver) as RequestHandler;

              case 'DELETE':
                return http.delete(path, resolver) as RequestHandler;

              // no default
            }

            return null;
          })
          .filter(Boolean) as RequestHandler[];

        mockWorker.resetHandlers();
        mockWorker.use(...handlers);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';
  @use '../../setup/scss/mixins';

  .s-api-mock-test {
    @include mixins.z-index(front);

    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: variables.$spacing--10;
    border-top: 10px solid variables.$color-grayscale--400;
    background-color: variables.$color-grayscale--1000;

    @include mixins.media(md) {
      @include mixins.z-index(back);

      right: 210px;
      padding: variables.$spacing--20;
    }

    &__title {
      @include mixins.font(variables.$font-size--18, null, variables.$font-weight--bold);

      margin-bottom: variables.$spacing--20;
    }

    &__header {
      margin-bottom: variables.$spacing--20;
      padding-bottom: variables.$spacing--10;
      border-bottom: 1px solid variables.$color-grayscale--500;
    }

    &__header-actions {
      display: flex;
      justify-content: space-between;
    }

    &__table-wrapper {
      max-height: 400px;
      overflow: auto;
    }

    &__table {
      width: 100%;

      th {
        font-weight: variables.$font-weight--bold;
      }

      td,
      th {
        padding: variables.$spacing--10;
        white-space: nowrap;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }

      input {
        width: 100%;
      }
    }

    &__row--debug-mode {
      color: variables.$color-status--error;
    }

    input,
    select {
      height: 30px;
      border: 1px solid variables.$color-grayscale--0;
      border-radius: 0;
    }

    select {
      min-width: 150px;
    }
  }
</style>
