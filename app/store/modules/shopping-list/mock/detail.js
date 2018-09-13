import product from '../../../../styleguide/mock-data/product';
import totalPrice from '../../../../styleguide/mock-data/totalPrice';

export default {
  shoppingList: {
    idShoppingList: 1,
    customerReference: 'FF00112',
    name: 'Meine Shoppingliste',
    // eslint-disable-next-line max-len
    description: 'Bemerkungstext, der gegebenenfalls auch etwas länger ausfallen kann. Deshalb ist es nötig, mehrzeilige Texte zu Unterstützen.',
    updatedAt: '2018-08-28',
    numberOfItems: 3,
    owner: 'Max Muster',
    textReference: 'Referenz',
    requesterId: 12,
    isShared: true,
    totals: {
      ...totalPrice
    }
  },
  items: [
    {
      ...product,
      groupKey: '01',
      sku: '706128',
      idShoppingListItem: 1,
    },
    {
      ...product,
      groupKey: '02',
      sku: '706129',
      idShoppingListItem: 2,
    },
    {
      ...product,
      groupKey: '03',
      sku: '706130',
      idShoppingListItem: 3,
    },
  ]
};
