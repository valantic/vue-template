import faker from 'faker/locale/en';
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
