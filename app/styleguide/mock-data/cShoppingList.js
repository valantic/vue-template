import totalPrice from './totalPrice';
import product from './product';
import shoppingListOverview from '../../store/modules/shopping-list/mock/overview';
import shoppingListDetail from '../../store/modules/shopping-list/mock/detail';

const createNewShoppingList = {
  data: {
    shoppingList: {
      idShoppingList: 1,
      customerReference: 'WF-1',
      name: 'Shopping-List-created',
      description: null,
      updatedAt: '2018-08-20 18:15:09.587786',
      numberOfItems: 1,
      owner: 'Roland Müller',
      requesterId: null,
      isShared: false,
      items: [],
      totals: {
        ...totalPrice,
      },
    }
  }
};

const removeShoppingList = {
  data: {
    shoppingLists: [
      {
        idShoppingList: 1,
        customerReference: 'WF-1',
        name: 'Shopping-List-removed',
        description: null,
        updatedAt: '2018-08-20 18:15:09.587786',
        numberOfItems: 1,
        owner: 'Roland Müller',
        requesterId: null,
        isShared: false,
        items: [],
        totals: {
          ...totalPrice,
        },
      },
    ],
  },
};

const addToCart = {
  messages: [
    {
      type: 'success',
      message: 'Artikel erfolgreich hinzugefügt.',
    },
  ],
};

const removeItem = {
  data: {
    ...shoppingListDetail,
    items: [
      {
        ...product,
        groupKey: '02',
        sku: '706129',
      },
      {
        ...product,
        groupKey: '03',
        sku: '706130',
      },
    ],
  },
};

const quickAddItem = {
  data: {
    ...shoppingListDetail,
    shoppingList: {
      ...shoppingListDetail.shoppingList,
      name: 'quick add response',
    },
  },
  messages: [
    {
      type: 'success',
      message: 'Produkt wurde der Merkliste hinzugefügt',
      code: null,
      sources: [],
      meta: null
    }
  ]
};

const updateQuantities = {
  data: {
    ...shoppingListDetail,
    shoppingList: {
      ...shoppingListDetail.shoppingList,
      name: 'update quantity response',
    },
  },
  messages: [
    {
      type: 'success',
      message: 'Einträge erfolgreich aktualisiert',
      code: null,
      sources: [],
      meta: null
    }
  ]
};

const removeAllItems = {
  data: {
    ...shoppingListDetail,
    items: [],
  },
};

export default {
  createNewShoppingList,
  updateSharingState: shoppingListOverview,
  quickAddItem,
  removeShoppingList,
  addToCart,
  removeItem,
  updateQuantities,
  removeAllItems,
};
