const { gql } = require("apollo-server");

const typeDefs = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type User {
    _id: ID!
    user_name: String!
    password: String!
    email: String!
  }
  input UserInput {
    _id: ID!
    user_name: String!
  }
`;

module.exports = { typeDefs };
