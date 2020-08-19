<template>
  <div :class="b()">
    HERE COMES THE NAVIGATION:
    <ul>
      <li v-for="(page, index) in navigation"
          :key="`page--${index}`"
      >
        NAVI ENTRY {{ page }}
      </li>
    </ul>
  </div>
</template>

<script>
  import getNavigationQuery from '@/graphql/queries/get-navigation.graphql';
  import gql from 'graphql-tag';

  const navigationLocalQuery = gql`
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

  export default {
    name: 'c-graphql-demo',
    // components: {},
    // mixins: [],
    apollo: {
      getNavigation: {
        query: getNavigationQuery,
        variables() {
          return {
            activePath: '/',
            rootPath: '/de',
          };
        },
      },
    },

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      navigation() {
        const clientSideNavigation = this.$apollo.provider.defaultClient.readQuery({ query: navigationLocalQuery });

        console.log('clientNavigation', clientSideNavigation); // eslint-disable-line no-console

        console.log('get fragment', this.$apollo.provider.defaultClient.readFragment({ // eslint-disable-line no-console
          id: '99184aac1a6f8f9ef7559d7245ed2a4b', // => There is no ID on the type, so apollo creates a random one.
          fragment: gql`
            fragment navigation on NavigationNodeType {
              href
            }
          `,
        }));

        console.log('create apollo cache dump', this.$apollo.provider.defaultClient.extract()); // eslint-disable-line no-console

        if (this.getNavigation) {
          return [...clientSideNavigation.getNavigation.navigation, ...this.getNavigation.navigation];
        }

        return clientSideNavigation.getNavigation.navigation;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
.c-graphql-demo {
  // TODO
}
</style>
