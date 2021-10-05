/* eslint-disable newline-per-chained-call */
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line import/no-extraneous-dependencies
import { Plugin } from 'vue';
import { AxiosRequestConfig } from 'axios';
import { axios } from '@/plugins/axios';

// Import mocks
import notificationResponse from '@/styleguide/mock-data/api-response/notification-response';
import notification from '@/styleguide/mock-data/data-object/notification';

/**
 * By default returns a 500 'no route defined' error.
 * If 'isErrorTest=xxx' is defined in the request params the defined error number is returned.
 */
function wildcard(config: AxiosRequestConfig) {
  const errorCode = Number(config?.params?.isErrorTest || 500);

  if (errorCode) {
    // eslint-disable-next-line no-console
    console.info(`AxiosMock: returning mock error for error code ${errorCode}`);

    switch (errorCode) {
      case 200:
        return [200, '<p>This is a forced error response</p>'];

      default:
        return [errorCode];
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(`No mock route found for "${config.url}"`);

    return [500, {}];
  }
}

const plugin: Plugin = {
  /**
   * Defines API mocks for development and styleguide build.
   */
  install(/* app */) {
    const mock = new MockAdapter(axios, {
      delayResponse: 500,
    });

    // See https://github.com/ctimmerm/axios-mock-adapter
    mock
      // EXAMPLE => .onPost('api-url').reply(200, mockDataResponse)
      .onGet('/notifications/global').reply((config) => {
        const {
          selector,
          type,
          redirectUrl,
          expire,
        } = config.params || {};
        const notificationItem = notification.createNotification({
          type,
          selector,
          redirectUrl,
          expire,
        });

        return [200, notificationResponse.createApiResponse(notificationItem)];
      })

      // Global
      .onAny(/\/?static|assets|passtrough/).passThrough()
      .onAny().reply(wildcard);
  },
};

export default plugin;
