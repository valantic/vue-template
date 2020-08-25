import faker from 'faker';
import breadcrumb from '../data-object/breadcrumb';

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
