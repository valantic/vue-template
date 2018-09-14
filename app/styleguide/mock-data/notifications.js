export default [
  {
    message: {
      type: 'warning',
      message: 'Please confirm this message.',
    },
    id: 1,
    expire: false,
    title: 'A title',
    confirm: ({ notification, resolve }) => {
      // eslint-disable-next-line no-console
      console.info(`Notification ${notification.id} was confirmed.`);

      setTimeout(resolve, 2000);
    },
  },
  {
    message: {
      type: 'warning',
      message: 'Please decline this message.',
    },
    id: 1,
    expire: false,
    title: 'A title',
    confirm: ({ notification, resolve }) => {
      // eslint-disable-next-line no-console
      console.info(`Notification ${notification.id} was confirmed.`);

      setTimeout(resolve, 2000);
    },
    decline: ({ notification, resolve }) => {
      // eslint-disable-next-line no-console
      console.info(`Notification ${notification.id} was declined.`);

      setTimeout(resolve, 2000);
    },
  },
  {
    message: {
      type: 'info',
      message: 'Something changed on backend. Please confirm change.',
      meta: {
        id: '12345',
        confirmationType: 'cartChange',
      }
    },
    id: 1,
    expire: false,
    title: 'A title',
  },
  {
    message: {
      type: 'warning',
      message: 'Product is added to cart successfully',
    },
    id: 2,
    expire: false,
    title: 'A title',
  },
  {
    message: {
      type: 'error',
      message: 'Value is too short',
    },
    id: 3,
    expire: true,
    title: '',
  },
  {
    message: {
      type: 'info',
      message: 'Product is added to cart',
    },
    id: 4,
    expire: true,
    title: '',
  },
  {
    message: {
      type: 'add-to-cart',
      message: 'Product is added to cart',
      id: 5,
      expire: false,
      title: 'Title',
      meta: {
        product: {
          id: 1,
          name: 'Schriftbandkassette TC 9mm×7,7m rot-weiss',
          sku: '706128',
          quantity: 2,
          priceUnit: 100,
          priceGross: 3600,
          price: 6912,
          unitPriceGross: 3600,
          unitPrice: 6912,
          priceType: 1,
          priceTypeEndDate: null,
          relations: {
            consistsProducts: 0,
            productAlternative: 0,
            productNecessaryAccessory: 1,
            productReplacement: 0,
            productAccessory: 2,
            relatedProducts: 0,
          },
          eNumber: '941 151 361',
          url: 'product-detail',
          stocks: [
            {
              warehouseId: 5,
              stock: 3.00,
            },
            {
              warehouseId: 3,
              stock: 0.00,
            },
          ],
          image: {
            idProductImage: 1,
            externalUrlLarge: '/static/mock/dummy_square_1200--v1.jpg',
            externalUrlSmall: '/static/mock/dummy_square_500--v1.jpg',
            thumbs: [
              {
                absolutePath: '/static/mock/dummy_square_240--v1.jpg',
                width: 240,
                height: 240,
              }, {
                absolutePath: '/static/mock/dummy_square_500--v1.jpg',
                width: 500,
                height: 500,
              }, {
                absolutePath: '/static/mock/dummy_square_800--v1.jpg',
                width: 800,
                height: 800,
              }, {
                absolutePath: '/static/mock/dummy_square_1200--v1.jpg',
                width: 1200,
                height: 1200,
              },
            ],
          },
        },
      },
    },
  },
];
