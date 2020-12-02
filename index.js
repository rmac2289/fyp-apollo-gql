const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/typeDefs/typeDefs");
const resolvers = require("./src/resolvers/resolvers");
require("dotenv").config();
require("./config");
const express = require("express");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => req.req,
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
});
