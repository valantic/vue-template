/* eslint-disable newline-per-chained-call */
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line import/no-extraneous-dependencies
import { i18n } from '@/setup/i18n';
import { axios } from './axios';

// Import mocks
import cSuggestions from '../../styleguide/mock-data/cSuggestions';
import cProductErp from '../../styleguide/mock-data/cProductErp';
import cCatalog from '../../styleguide/mock-data/cCatalog';
import cProductRelations from '../../styleguide/mock-data/cProductRelations';
import cCartPost from '../../styleguide/mock-data/cCartPost';
import cLogin from '../../styleguide/mock-data/cLogin';
import cNotificationAddToCartSuccess from '../../styleguide/mock-data/cNotificationAddToCartSuccess';
import cNotificationGlobalSuccess from '../../styleguide/mock-data/cNotificationGlobalSuccess';
import cNotificationGlobalWarning from '../../styleguide/mock-data/cNotificationGlobalWarning';
import cNotificationGlobalError from '../../styleguide/mock-data/cNotificationGlobalError';
import cNotificationGlobalInfo from '../../styleguide/mock-data/cNotificationGlobalInfo';
import cSearchSuggestions from '../../styleguide/mock-data/cSearchSuggestions';
import cNotificationFieldError from '../../styleguide/mock-data/cNotificationFieldError';
import cNotificationSelectorInfo1 from '../../styleguide/mock-data/cNotificationSelectorInfo1';
import cNotificationSelectorInfo2 from '../../styleguide/mock-data/cNotificationSelectorInfo2';
import cNotificationSelectorInfo3 from '../../styleguide/mock-data/cNotificationSelectorInfo3';
import cMainNavigation from '../../styleguide/mock-data/cMainNavigation';
import cCart from '../../styleguide/mock-data/cCart';
import cPlaceOrder from '../../styleguide/mock-data/cPlaceOrder';
import shoppingListDetailData from '../../store/modules/shopping-list/mock/detail';
import cShoppingList from '../../styleguide/mock-data/cShoppingList';
import userData from '../../styleguide/mock-data/user';

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
   * Defines API mocks for development and styleguide build.
   */
  install(/* Vue, options */) {
    const mock = new MockAdapter(axios, {
      delayResponse: 2000,
    });
    const statusCodes = {
      success: 200,
      badRequest: 400,
      preconditionFailed: 412,
      internalError: 500,
    };

    // See https://github.com/ctimmerm/axios-mock-adapter
    mock
      .onGet('/suggestions').reply(200, cSuggestions)
      .onGet('/category').reply(200, cMainNavigation)
      .onGet(/\/product-relations\/.+\/consists-products/).reply(200, cProductRelations.consists)
      .onGet(/\/product-relations\/.+\/product-replacement/).reply(200, cProductRelations.replacement)
      .onGet(/\/product-relations\/.+\/product-alternative/).reply(200, cProductRelations.alternative)
      .onGet(/\/product-relations\/.+\/product-accessory/).reply(200, cProductRelations.accessory)
      .onGet(/\/product-relations\/.+\/product-necessary-accessory/).reply(200, cProductRelations.necessaryAccessory)
      .onGet('/category').reply(200, cMainNavigation)
      .onPost('/product/multi-get').reply((config) => {
        const data = JSON.parse(config.data);
        const isRelation = data.reduce((accumulator, currentValue) => { // eslint-disable-line arrow-body-style
          return accumulator
            ? !['12345', '706128', '706127', '706126'].includes(`${currentValue.sku}`)
            : false;
        });

        return [200, isRelation ? cProductErp.relations : cProductErp.start];
      })

      .onPost('/product').reply((config) => {
        const { page, sort } = JSON.parse(config.data);

        switch (page) {
          case 2:
            return [200, cCatalog.page2];

          case 3:
            return [200, cCatalog.page3];

          case 4:
            return [200, cCatalog.page4];

          default:
          // do nothing
        }

        switch (sort) {
          case 'name_asc':
            return [200, cCatalog.asc];

          case 'name_desc':
            return [200, cCatalog.desc];

          default:
          // do nothing
        }

        return [200, cCatalog.asc];
      })

      .onPost('/search').reply((config) => {
        const { page, sort } = JSON.parse(config.data);

        switch (page) {
          case 2:
            return [200, cCatalog.page2];

          case 3:
            return [200, cCatalog.page3];

          case 4:
            return [200, cCatalog.page4];

          default:
          // do nothing
        }

        switch (sort) {
          case 'name_asc':
            return [200, cCatalog.asc];

          case 'name_desc':
            return [200, cCatalog.desc];

          default:
          // do nothing
        }

        return [200, cCatalog.asc];
      })

      .onPost('/cart/1').reply(200, cCartPost)
      .onDelete('/cart/1').reply(200)
      .onDelete(/\/cart\/1\/\.*/).reply(200, cCart.removeItem)
      .onPatch('/cart/1/change-quantity').reply(200, cCart.updateItems)
      .onPatch('/cart/1/706129/02/replace').reply(200, cCart.replaceItems)
      .onPatch('/cart/1/706130/03/replace').reply(200, cCart.replaceAlternativeItems)
      .onPatch(/^\/cart\/1\/..*\/replace$/).reply(200, cCart.replaceItems)
      .onPost('/cart-data/1').reply((config) => {
        const requestData = config.data ? JSON.parse(config.data) : {};
        const mockData = JSON.parse(JSON.stringify(cCart.updateMetaData)); // JSON parse to get a new object without reference.

        if (requestData.addressId) {
          mockData.data.addressId = requestData.addressId;
        }

        if (requestData.selectedShipmentMethodId) {
          mockData.data.selectedShipmentMethodId = requestData.selectedShipmentMethodId;
        }

        if (requestData.pickupLocationErpId) {
          mockData.data.pickupLocationErpId = requestData.pickupLocationErpId;
        }

        if (requestData.shippingAddress) {
          mockData.data.addressId = null;
          mockData.data.shippingAddress = requestData.shippingAddress;
        }

        return [statusCodes.success, mockData];
      })
      .onPost('/cart/1/quick-add').reply(200, cCart.quickAddToCart)
      .onPost('/login').reply(200, cLogin.success)
      .onPost(i18n.t('urls.login')).reply((config) => {
        const data = config.data ? JSON.parse(config.data) : {};

        switch (data.customerIdentifier) {
          case 'info@internal-error.com':
            return [statusCodes.internalError];

          case 'info@unknown.com':
            return [
              statusCodes.badRequest, {
                messages: [
                  {
                    type: 'error',
                    message: 'This combination of username and password was not recognized.',
                  },
                ],
              },
            ];

          default:
            return [statusCodes.success, cLogin.success];
        }
      })
      .onPost(i18n.t('urls.restorePassword')).reply((config) => {
        const data = config.data ? JSON.parse(config.data) : {};

        switch (data.customerIdentifier) {
          case 'info@internal-error.com':
            return [statusCodes.internalError];

          case 'info@multiple-users.com':
            return [statusCodes.preconditionFailed, {
              messages: [{
                type: 'warning',
                message: 'This email is used by multiple accounts. Please use your username to restore your password.',
              }]
            }];

          default:
            return [statusCodes.success, {
              messages: [{
                type: 'success',
                message: 'You will receive an email soon.',
              }]
            }];
        }
      })
      .onPost('/checkout/place-order').reply(200, cPlaceOrder)
      .onPost('/notifications/add-to-cart/success').reply(200, cNotificationAddToCartSuccess)
      .onPost('/notifications/global/success').reply(200, cNotificationGlobalSuccess)
      .onPost('/notifications/global/warning').reply(200, cNotificationGlobalWarning)
      .onPost('/notifications/global/error').reply(500, cNotificationGlobalError)
      .onPost('/notifications/global/info').reply(200, cNotificationGlobalInfo)
      .onGet(/\/search\/suggestion\/\.*/).reply(200, cSearchSuggestions.defaultExample)
      .onPost('/notifications/field/error').reply(500, cNotificationFieldError)
      .onPost('/notifications/selector/info1').reply(200, cNotificationSelectorInfo1)
      .onPost('/notifications/selector/info2').reply(200, cNotificationSelectorInfo2)
      .onPost('/notifications/selector/info3').reply(200, cNotificationSelectorInfo3)
      .onPost(i18n.t('urls.confirmCartChange')).reply(200)
      .onPatch(i18n.t('urls.updateShoppingListDetail', { listId: 1 })).reply((config) => {
        const requestData = config.data ? JSON.parse(config.data) : {};
        const mockData = JSON.parse(JSON.stringify(shoppingListDetailData)); // JSON parse to get a new object without reference.
        const shoppingListData = {
          ...mockData.shoppingList,
          ...requestData,
        };
        const data = {
          ...mockData,
          shoppingList: shoppingListData,
        };

        return [statusCodes.success, { data }];
      })
      .onPost(i18n.t('urls.addShoppingList')).reply(200, cShoppingList.createNewShoppingList)
      // TODO: Use final sharing state URL
      // .onPatch(i18n.t(new RegExp(`${i18n.t('urls.updateSharingState')}.*`))).reply(200, cShoppingList.updateSharingState)
      .onPost(i18n.t('urls.quickAddToShoppingList', { listId: '1' })).reply(200, cShoppingList.quickAddItem)
      .onDelete(i18n.t('urls.removeShoppingLists')).reply(200, cShoppingList.removeShoppingList)
      .onPost(i18n.t('urls.addShoppingListsToCart')).reply(200, cShoppingList.addToCart)
      .onPatch(i18n.t('urls.updateShoppingListQuantities', { listId: '1' })).reply(200, cShoppingList.updateQuantities)
      .onDelete(/\/shopping-list\/\d*\/remove-all/).reply(200, cShoppingList.removeAllItems)
      .onDelete(/\/shopping-list\/1\/\.*/).reply(200, cShoppingList.removeItem)
      .onPost(i18n.t('urls.updateUser')).reply((config) => {
        const requestData = config.data ? JSON.parse(config.data) : {};
        const mockData = JSON.parse(JSON.stringify(userData.profile)); // JSON parse to get a new object without reference.

        return [statusCodes.success, {
          data: {
            ...mockData,
            ...requestData,
          },
          messages: [{
            type: 'success',
            message: 'Angaben erfolgreich geändert.',
          }]
        }];
      })
      .onPost(i18n.t('urls.updatePassword')).reply(200, {
        messages: [{
          type: 'success',
          message: 'Passwort erfolgreich geändert.',
        }]
      })
      .onDelete(/\/account\/remove\/\.*/).reply(200, {
        messages: [{
          type: 'success',
          message: 'User erfolgreich gelöscht.',
        }]
      })
      .onPost(i18n.t('urls.createUser')).reply((config) => {
        const requestData = config.data ? JSON.parse(config.data) : {};
        const mockData = JSON.parse(JSON.stringify(userData)); // JSON parse to get a new object without reference.

        delete requestData.password;
        delete requestData.confirmPassword;

        return [statusCodes.success, {
          data: {
            ...mockData,
            profile: {
              ...mockData.profile,
              ...requestData,
            }
          }
        }];
      })

      .onAny(/\/?static|assets/).passThrough()
      .onAny().reply(wildcard);
  },
};
