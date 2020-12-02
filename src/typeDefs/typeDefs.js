const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  type EntranceFee {
    cost: String
    title: String
  }

  type Image {
    altText: String!
    title: String
    url: String!
  }

  type Park {
    _id: ID!
    fullName: String!
    state: String
    map: String!
    latLng: [String]
    activities: [String]
    entranceFees: [EntranceFee]
    url: String!
    weatherInfo: String
    hours: String
    description: String
    images: [Image]
    address: String
  }

  type Suggestion {
    _id: ID!
    park_name: String!
    location: String!
    description: String
    user: User
  }

  type Comment {
    _id: ID!
    comment: String!
    subject: String!
    park_name: String!
    date: Date!
    user: User
  }

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

  type Query {
    getComments: [Comment]
    getUsers: [User]
    getSuggestions: [Suggestion]
    getCommentById(_id: ID!): Comment
    getPark: [Park]
    getParkByName(fullName: String!): Park
  }

  type Mutation {
    addSuggestion(
      park_name: String!
      location: String!
      description: String!
      user: UserInput
    ): Suggestion
    addComment(
      comment: String!
      subject: String!
      park_name: String!
      date: Date!
      user: UserInput
    ): Comment
    deleteUser(_id: ID!): String
    deleteComment(_id: ID!): String
    deleteSuggestion(_id: ID!): String
    login(user_name: String!, password: String!): AuthPayload
    addUser(email: String!, user_name: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
