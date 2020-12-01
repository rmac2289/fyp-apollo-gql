const { gql } = require("apollo-server");

const typeDefs = gql`
  type Park {
    _id: ID!
  }

  type Suggestion {
    _id: ID!
    park_name: String!
    description: String
  }

  type Comment {
    _id: ID!
    comment: String!
    subject: String!
    park_name: String!
    date: String!
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

  type Query {
    getComments: [Comment]
    getUsers: [User]
    getSuggestions: [Suggestion]
    getCommentById(_id: ID!): Comment
  }
  type Mutation {
    addUser(user_name: String!, password: String!, email: String!): User
    addComment(
      comment: String!
      subject: String!
      park_name: String!
      date: String!
      user: UserInput
    ): Comment
    deleteUser(_id: ID!): String
  }
`;

module.exports = typeDefs;
