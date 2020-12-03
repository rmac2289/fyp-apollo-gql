const { gql } = require("apollo-server");

const typeDefs = gql`
  type Suggestion {
    _id: ID!
    park_name: String!
    location: String!
    description: String
    user: User
  }
`;

module.exports = { typeDefs };
