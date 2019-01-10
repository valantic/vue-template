import breadcrumb from '../data-object/breadcrumb';

const faker = require('faker');

export default [
  {
    ...breadcrumb,
    name: faker.commerce.productName(),
  },
  {
    ...breadcrumb,
    name: faker.commerce.productName(),
  },
  {
    ...breadcrumb,
    name: faker.commerce.productName(),
  },
];
