const { gql } = require("apollo-server");

const typeDefs = gql`
  type Comment {
    _id: ID!
    comment: String!
    subject: String!
    park_name: String!
    date: Date!
    user: User
  }
`;

module.exports = { typeDefs };
