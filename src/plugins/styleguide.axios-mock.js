/* eslint-disable newline-per-chained-call */
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line import/no-extraneous-dependencies
import { axios } from '@/plugins/axios';

// Import mocks
import notification from '@/styleguide/mock-data/api-response/notifications';

/**
 * By default returns a 500 'no route defined' error.
 * If 'isErrorTest=xxx' is defined in the request params the defined error number is returned.
 *
 * @param   {Object}          config                          The request configuration
 * @param   {Number|String}   [config.params.isErrorTest]     Number of to be tested error response
 *
 * @returns {Array}
 */
function wildcard(config) {
  const errorCode = Number(config?.params?.isErrorTest);

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

export default {
  /**
   * Defines API mocks for development and styleguide build.
   */
  install(/* Vue, options */) {
    const mock = new MockAdapter(axios, {
      delayResponse: 2000,
    });

    // See https://github.com/ctimmerm/axios-mock-adapter
    mock
      // EXAMPLE => .onPost('api-url').reply(200, mockDataResponse)
      .onPost('/notifications/global/success').reply(200, notification.success)
      .onPost('/notifications/global/warning').reply(200, notification.warning)
      .onPost('/notifications/global/error').reply(500, notification.error)
      .onPost('/notifications/global/info').reply(200, notification.info)
      .onPost('/notifications/field/error').reply(500, notification.fieldError)
      .onPost('/notifications/selector/info1').reply(200, notification.selectorInfo1)

      // Global
      .onAny(/\/?static|assets|passtrough/).passThrough()
      .onAny().reply(wildcard);
  },
};
