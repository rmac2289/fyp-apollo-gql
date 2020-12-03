const { ApolloServer } = require("apollo-server-express");
const { merge } = require("lodash");
require("dotenv").config();
require("./config");
const express = require("express");
const { typeDefs: user } = require("./src/user");
const { typeDefs: suggestion } = require("./src/suggestion");
const { typeDefs: query, resolvers: queries } = require("./src/query");
const { typeDefs: park } = require("./src/park");
const { typeDefs: mutation, resolvers: mutations } = require("./src/mutation");
const { typeDefs: date, resolvers: dates } = require("./src/date");
const { typeDefs: comment } = require("./src/comment");

const app = express();

const server = new ApolloServer({
  typeDefs: [user, suggestion, query, park, mutation, date, comment],
  resolvers: merge(queries, mutations, dates),
  context: (req) => req.req,
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
});
