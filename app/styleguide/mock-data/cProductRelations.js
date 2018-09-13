import exampleProduct from './product';

export default {
  accessory: {
    data: [
      {
        ...exampleProduct,
        sku: '1231231',
        id: 11,
      },
      {
        ...exampleProduct,
        sku: '1231232',
        id: 12,
      },
    ],
  },
  necessaryAccessory: {
    data: [
      {
        ...exampleProduct,
        sku: '1231233',
        id: 13,
      },
    ],
  },
  consists: {
    data: [
      {
        ...exampleProduct,
        sku: '1231122',
        id: 14,
      },
    ],
  },
  replacement: {
    data: [
      {
        ...exampleProduct,
        name: 'Replacement product',
        sku: '1111244',
        id: 15,
      },
    ],
  },
  alternative: {
    data: [
      {
        ...exampleProduct,
        name: 'Alternative product',
        sku: '706129',
        id: 16,
      },
    ],
  },
};
