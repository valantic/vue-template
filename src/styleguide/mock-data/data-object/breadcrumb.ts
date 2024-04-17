import { faker } from '@faker-js/faker/locale/en';
import { BreadcrumbItem } from '@/stores/breadcrumb';

const { commerce, internet } = faker;

/**
 * Creates a randomized breadcrumb link object.
 */
export default function createBreadcrumbItem(): BreadcrumbItem {
  return {
    name: commerce.productName(),
    url: internet.url(),
  };
}
