<template>
  <div :class="b()">
    <div :class="b('header')">
      <h2 :class="b('title')">
        Mock API Endpoint Handlers
      </h2>
      <input v-model="search"
             type="text"
             name="search"
             placeholder="Search"
      >
    </div>
    <div v-if="!filteredEndpoints.length">
      No handlers found.
    </div>
    <table v-else :class="b('table')">
      <thead>
        <tr>
          <th>
            Method
          </th>
          <th>
            Path
          </th>
          <th>
            Debug Mode
          </th>
          <th>
            Status
          </th>
          <th v-if="$viewport.isMd">
            Response body (JSON)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(endpoint, index) in filteredEndpoints"
            :key="index"
            :class="b('row')"
        >
          <td>
            {{ endpoint.method }}
          </td>
          <td>
            {{ endpoint.path }}
          </td>
          <td>
            <e-checkbox v-model="configurations[endpoint.header].enabled"
                        name="debug-mode-enabled"
                        value
            />
          </td>
          <td>
            <e-select v-model="configurations[endpoint.header].status"
                      :options="statusOptions"
                      name="status"
            />
          </td>
          <td v-if="$viewport.isMd">
            <input v-model="configurations[endpoint.header].response"
                   type="text"
                   name="response"
            >
          </td>
        </tr>
      </tbody>
    </table>

    {{ configurations }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { RequestHandler, ResponseResolver, rest } from 'msw';
  import mockWorker from '@/styleguide/api/browser';
  import eCheckbox from '@/components/e-checkbox.vue';
  import eSelect from '@/components/e-select.vue';

  interface IDebugConfiguration {
    header: string;
    enabled: boolean;
    status: string;
    response: string;
  }

  interface ISetup {
    statusOptions: {
      label: string;
      value: string;
    }[]
  }
  interface IData {
    search: string;
    handlers: ReadonlyArray<RequestHandler> | null;
    configurations: {
      [key: string]: IDebugConfiguration;
    },
  }

  /**
   * Lists all active Mock API Endpoint handlers and allows enabling error mode for them.
   */
  export default defineComponent({
    name: 's-api-mocks',
    components: { eSelect, eCheckbox },

    // props: {},
    emits: {
      close: null,
    },

    setup(): ISetup {
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
          }
        ]
      };
    },
    data(): IData {
      return {
        search: '',
        handlers: null,
        configurations: {},
      };
    },

    computed: {
      filteredEndpoints() {
        const { search, handlers } = this;

        if (!handlers) {
          return null;
        }

        const mappedHandlers = handlers.map(handler => handler.info);

        if (!search) {
          return mappedHandlers;
        }

        return mappedHandlers.filter(endpoint => endpoint.header.toLowerCase().includes(search));
      }
    },
    watch: {
      configurations: {
        handler() {
          this.setupHandlers();
        },
        deep: true,
      }
    },

    // beforeCreate() {},
    created() {
      mockWorker.resetHandlers();

      this.handlers = mockWorker.listHandlers();

      this.handlers.forEach((handler) => {
        const { header } = handler.info;

        this.configurations[header] = {
          header,
          enabled: false,
          status: '200',
          response: '',
        };
      });

      const configurationsFromStorage = JSON.parse(window.localStorage.getItem('sApiMocksConfigurations') || '{}');

      if (configurationsFromStorage) {
        this.configurations = {
          ...this.configurations,
          ...configurationsFromStorage,
        };

        this.setupHandlers();
      }
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
       * Sets up handlers that are prepended to the mock worker and will have priority over the other handlers.
       */
      setupHandlers(): void {
        const handlers = Object.values(this.configurations)
          .filter(configuration => configuration.enabled)
          .map((configuration) => {
            const [method, path] = configuration.header.split(' ');
            const resolver: ResponseResolver = (req, res, ctx) => res(
              ctx.status(404),
            );

            switch (method) {
              case 'GET':
                return rest.get(path, resolver) as RequestHandler;

              case 'POST':
                return rest.post(path, resolver) as RequestHandler;

              case 'PUT':
                return rest.put(path, resolver) as RequestHandler;

              case 'PATCH':
                return rest.patch(path, resolver) as RequestHandler;

              case 'DELETE':
                return rest.delete(path, resolver) as RequestHandler;

              // no default
            }

            return null;
          }).filter(Boolean) as RequestHandler[];

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

  .s-api-mocks {
    @include mixins.z-index(front);

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 500px;
    border-top: 10px solid variables.$color-grayscale--400;
    overflow: auto;
    padding: variables.$spacing--10;
    background-color: variables.$color-grayscale--1000;

    @include mixins.media(md) {
      padding: variables.$spacing--20;
    }

    &__title {
      @include mixins.font(variables.$font-size--18, null, variables.$font-weight--bold);

      margin-bottom: variables.$spacing--20;
    }

    &__header {
      margin-bottom: variables.$spacing--20;
    }

    &__table {
      width: 100%;

      td, th {
        padding: variables.$spacing--10;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }
    }

    &__row--debug-mode {
      color: variables.$color-status--error;
    }

    input, select {
      border: 1px solid variables.$color-grayscale--0;
      border-radius: 0;
      height: 30px;
    }

    select {
      min-width: 150px;
    }
  }
</style>
