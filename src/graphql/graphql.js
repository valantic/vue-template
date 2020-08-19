// Polyfill for Jest
import fetch from 'unfetch'; // TODO: could this be replaced by native fetch OR axios?
// HTTP connection to the API
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import VueApollo from 'vue-apollo';
// {__schema{types{kind name possibleTypes{name}}}}
import introspectionQueryResultData from './fragmentTypes.json';

const md5 = require('md5');
// TODO: We should get the graphQL url with api key from the backend.
const apiKey = '123';

let graphQlUri = `http://project.local:8080/pimcore-graphql-webservices/vue-dev?apikey=${apiKey}`;

if (process.env.NODE_ENV !== 'production') {
  graphQlUri = 'http://localhost:4000';
}

const httpLink = createHttpLink({
  uri: graphQlUri,
  fetch,
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
// Cache implementation
const cache = new InMemoryCache({
  fragmentMatcher,
  // Do you want to remove this ugly bit of code?
  // You may, of course. But please know, I spent three hours
  // tracking down this bug: Apollo caches every response (which is fine)
  // and uses the .id of the result for the cache key. Unfortunately, not every
  // response contains such an ID. And then the cache is never evicted.
  // Either:
  //   - set fetchPolicy: 'cache-and-network' on every query
  //   - or use some sort of (better!) logic here
  // dataIdFromObject: object => md5(JSON.stringify(object))
  dataIdFromObject: (object) => {
    /* eslint-disable no-underscore-dangle */
    if (object.id) {
      // return `${object.__typename}_${object.id}`;
    }

    if (object.__typename === 'RedirectNodeType') {
      return `${object.__typename}_${object.source}_${object.target}`;
    }

    if (object.__typename === 'NavigationNodeType') {
      // return `${object.__typename}_${object.href}`;
    }

    if (object.__typename === 'ProductConnection') {
      return `${object.__typename}_${object.edges.length}_${object.edges.map(edge => edge.node.id).join('_')}`;
    }

    if (object.__typename === 'RedirectQueryResultType') {
      return `${object.__typename}_${object.redirects.length}`;
    }

    if (object.__typename === 'NavigationQueryResultType') {
      return `${object.__typename}_${object.navigation.length}`;
    }
    /* eslint-enable no-underscore-dangle */

    // TODO: this is most likely not very performant. Define id alternatives as documented here instead:
    // @see https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
    return md5(JSON.stringify(object));
  },
});

const typeDefs = gql`
  type NavigationNodeType {
    active: Boolean
    activeRecursive: Boolean
    children: [NavigationNodeType]
    hasChildren: Boolean
    href: String
    label: String
    properties: [ElementProperty]
    title: String
  }
`;

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  typeDefs,
  cache,
  resolvers: {},
});

const query = gql`
  query initialData($rootPath: String = "/", $activePath: String = "/") {
    getNavigation(rootPath: $rootPath, activePath: $activePath) {
      navigation {
        active
        activeRecursive
        href
        label
      }
    }
  }
`;

// Write initial data into the apollo cache
apolloClient.writeQuery({
  query,
  data: {
    getNavigation: {
      __typename: 'NavigationQueryResultType',
      navigation: [
        {
          __typename: 'NavigationNodeType',
          id: '123',
          active: true,
          activeRecursive: true,
          href: 'http://www.vol.at',
          label: 'Vol at',
          properties: [
            {
              generated: false,
              id: '5f191492fcb802a1a3fc6c73c9309d15',
              type: 'id',
              typename: 'property_object',
            },
          ],
          title: 'VOl attt',
        },
      ]
    }
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
