import { commerce } from 'faker/locale/en';
import breadcrumb from '../data-object/breadcrumb';

export default [
  {
    ...breadcrumb,
    name: commerce.productName(),
  },
  {
    ...breadcrumb,
    name: commerce.productName(),
  },
  {
    ...breadcrumb,
    name: commerce.productName(),
  },
];
