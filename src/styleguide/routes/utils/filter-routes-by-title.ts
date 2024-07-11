import { RouteRecordRaw } from 'vue-router';

/**
 *
 * @param routes - Array of type RouteRecordRaw to be filtered
 * @param searchTerm - String (route.meta.title) to filter the routes by
 * @returns - Array of type RouteRecordRaw filtered by the searchTerm
 */
export default function filterRoutesByTitle(routes: readonly RouteRecordRaw[], searchTerm: string): RouteRecordRaw[] {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return routes.reduce((filteredRoutes: RouteRecordRaw[], route) => {
    const titleMatch = route.meta?.title?.toLowerCase().includes(lowerCaseSearchTerm);

    if (titleMatch) {
      // the route matches the search term
      filteredRoutes.push(route);
    } else if (route.children) {
      // the parent route does not match the search term, but its children might
      const matchingChildren = filterRoutesByTitle(route.children, searchTerm);

      if (matchingChildren.length > 0) {
        // a child route matches, add the parent route with the matching child routes
        filteredRoutes.push({
          ...route,
          children: matchingChildren,
        });
      }
    }

    return filteredRoutes;
  }, []);
}
