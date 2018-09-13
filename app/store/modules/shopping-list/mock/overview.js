import totalPrice from '../../../../styleguide/mock-data/totalPrice';

const listOverviewItem = {
  idShoppingList: 1,
  customerReference: 'Max Muster',
  name: 'Merliste XY',
  description: 'Just a description for a shopping list.',
  updatedAt: new Date(),
  numberOfItems: 3,
  owner: 'John Doe',
  requesterId: 123,
  totals: {
    ...totalPrice,
  },
  isShared: false,
};
const dynamicList = [];

for (let i = 0; i < 40; i += 1) {
  dynamicList.push({
    ...listOverviewItem,
    name: `Merkliste XY-${i}`,
    idShoppingList: i,
    isShared: i === 5,
  });
}

export default {
  shoppingLists: dynamicList,
};
