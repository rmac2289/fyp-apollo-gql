const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./src/typeDefs/typeDefs");
const resolvers = require("./src/resolvers/resolvers");
require("dotenv").config();
require("./config");
const { User } = require("./models");
const express = require("express");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
});
