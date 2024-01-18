import { Store } from '@/setup/globals';
import breadcrumbs from '@/styleguide/mock-data/initial-data/breadcrumbs';

window.initialData = window.initialData || {};

window.initialData[Store.Breadcrumb] = breadcrumbs;
