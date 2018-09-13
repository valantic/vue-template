import product from '../../../../styleguide/mock-data/product';
import totalPrice from '../../../../styleguide/mock-data/totalPrice';
import address from '../../../../styleguide/mock-data/address';

export default {
  items: [
    {
      ...product,
      groupKey: '01',
      sku: '706128',
      relations: {
        productNecessaryAccessory: 1,
      },
      quantity: 3,
      quantityInterval: 1.5,
      quantityMin: 3,
    }, {
      ...product,
      id: 2,
      groupKey: '02',
      sku: '706129',
      quantity: 1.5,
      quantityInterval: 0.75,
      quantityMin: 0.75,
    },
    {
      ...product,
      id: 3,
      groupKey: '03',
      sku: '706130',
      relations: {
        productAlternative: 1,
      },
    },
  ],
  totals: {
    ...totalPrice,
  },
  contractId: 1,
  isPartDelivery: false,
  deliveryDate: '',
  customerCommission: 'Kommission',
  textReference: '',
  contactName: 'Progra Mierer',
  orderText: '',
  messageToSales: '',
  selectedShipmentMethodId: 2,
  addressId: 1,
  pickupLocationErpId: 1,
  shippingAddress: {
    ...address,
  },
  salesNotificationType: 'email',
  mandatoryFields: [
    'customerCommission',
    'contactName',
    'messageToSales',
  ]
};
