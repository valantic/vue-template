import { faker } from '@faker-js/faker';
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
