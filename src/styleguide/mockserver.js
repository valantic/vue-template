const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const NavigationNodeType = require('./mock-data/api-response/NavigationNodeType.js');

const schema = fs.readFileSync(path.join(__dirname, '../../schema.graphql'), 'utf8');
const typeDefs = gql(schema);

/*
 * Example Mock data.
 * Here we define mocks for general types or specific defined types.
 */
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
  NavigationNodeType: () => NavigationNodeType,
};

const server = new ApolloServer({
  typeDefs,
  mocks,
});

/* eslint-disable no-console */
server.listen().then(({ url }) => console.log(`Server running on ${url}`));
