import product from './product';
import address from './address';

const removeItem = {
  data: {
    items: [
      {
        ...product,
        name: 'remove-product-response-name',
        groupKey: '01',
      }, {
        ...product,
        id: 2,
        groupKey: '02',
      },
    ],
    totals: {
      subtotal: 1500,
      grandTotal: 1500,
      netTotal: 1500
    },
  },
  messages: [{
    type: 'success',
    message: 'Produkt erfolgreich gelöscht',
  }],
};

const updateItems = {
  data: {
    items: [
      {
        ...product,
        name: 'update-product-response-name',
        groupKey: '01',
        quantity: 11,
      },
      {
        ...product,
        id: 2,
        groupKey: '02',
        quantity: 22,
      },
      {
        ...product,
        id: 3,
        groupKey: '03',
        quantity: 333,
      },
    ],
    totals: {
      subtotal: 1500,
      grandTotal: 1500,
      netTotal: 1500
    },
  },
  messages: [{
    type: 'info',
    message: 'Produkt erfolgreich aktualisiert',
  }],
};

const updateMetaData = {
  data: {
    items: [
      {
        ...product,
        name: 'update-product-response-name',
        groupKey: '01',
        quantity: 11,
      },
      {
        ...product,
        id: 2,
        groupKey: '02',
        quantity: 22,
      },
      {
        ...product,
        id: 3,
        groupKey: '03',
        quantity: 333,
      },
    ],
    totals: {
      subtotal: 1500,
      grandTotal: 1500,
      netTotal: 1500,
    },
    contractId: 1,
    selectedShipmentMethodId: 1,
    addressId: 2,
    pickupLocationErpId: 1,
    shippingAddress: {
      ...address,
    },
  },
  messages: [{
    type: 'info',
    message: 'Warenkorb erflogreich aktualisiert',
  }],
};

const quickAddToCart = {
  data: {
    items: [
      {
        ...product,
        name: 'quick-add-response-name',
        groupKey: '01',
        quantity: 11,
      },
      {
        ...product,
        id: 2,
        groupKey: '02',
        quantity: 22,
      },
      {
        ...product,
        id: 3,
        groupKey: '03',
        quantity: 333,
      },
      {
        ...product,
        id: 4,
        groupKey: '04',
        quantity: 40,
      },
    ],
    totals: {
      subtotal: 1500,
      grandTotal: 1500,
      netTotal: 1500,
    },
  },
  messages: [{
    type: 'success',
    message: 'Produkt erfolgreich hinzugefügt',
  }],
};

const replaceItems = {
  data: {
    items: [
      {
        ...product,
        id: 1211,
        groupKey: '01',
        sku: '706128',
        relations: {
          productNecessaryAccessory: 1,
        },
      },
      {
        ...product,
        id: 121234213,
        groupKey: '01',
        sku: '555555555',
        name: 'Replacement product',
        relations: {},
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
      subtotal: 1500,
      grandTotal: 1500,
      netTotal: 1500,
    },
  },
  messages: [{
    type: 'info',
    message: 'Produkt erfolgreich ersetzt',
  }],
};

const replaceAlternativeItems = {
  data: {
    items: [
      {
        ...product,
        groupKey: '01',
        sku: '706128',
        relations: {
          productNecessaryAccessory: 1,
        },
      },
      {
        ...product,
        groupKey: '02',
        sku: '706129',
      },
      {
        ...product,
        id: 35,
        groupKey: '03',
        name: 'Alternative product',
        sku: '666666666',
        relations: {},
      },
    ],
    totals: {
      subtotal: 1500,
      grandTotal: 1500,
      netTotal: 1500,
    },
  },
  messages: [{
    type: 'info',
    message: 'Produkt erfolgreich ersetzt',
  }],
};

export default {
  removeItem,
  updateItems,
  updateMetaData,
  replaceItems,
  replaceAlternativeItems,
  quickAddToCart,
};
