/* eslint-disable newline-per-chained-call */
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line import/no-extraneous-dependencies
import { axios } from './axios';

// Import mocks
import cSuggestions from '../../styleguide/mock-data/cSuggestions';
import cProductInformation from '../../styleguide/mock-data/cProductInformation';
import cCartGet from '../../styleguide/mock-data/cCartGet';
import cCartPost from '../../styleguide/mock-data/cCartPost';
import cCartPatch from '../../styleguide/mock-data/cCartPatch';

/**
 * By default returns a 500 'no route defined' error.
 * If 'isErrorTest=xxx' is defined in the request params the defined error number is returned.
 *
 * @param   {object}          config                          The request configuration
 * @param   {number|string}   [config.params.isErrorTest]     Number of to be tested error response
 *
 * @returns {array}
 */
function wildcard(config) {
  const errorCode = Number(config.params && config.params.isErrorTest);

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
   * Defines API mocks for development and styleguide build
   */
  install(/* Vue, options */) {
    const mock = new MockAdapter(axios, {
      delayResponse: 400,
    });

    // See https://github.com/ctimmerm/axios-mock-adapter
    mock
      .onGet('/suggestions').reply(200, cSuggestions)
      .onPost('/product/multi-get').reply(200, cProductInformation)

      .onGet('/cart/1').reply(200, cCartGet)
      .onPost('/cart/1').reply(200, cCartPost)
      .onPatch('/cart/1/SKU03').reply(200, cCartPatch)

      .onAny(/\/?static/).passThrough()
      .onAny().reply(wildcard);
  },
};
