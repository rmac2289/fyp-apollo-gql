const { gql } = require("apollo-server");
const { User, Comment, Suggestion, Park } = require("../models");

const typeDefs = gql`
  type Query {
    getComments: [Comment]
    getUsers: [User]
    getSuggestions: [Suggestion]
    getCommentById(_id: ID!): Comment
    getPark(fullName: String): [Park]
    getParkByName(fullName: String!): Park
  }
`;

const resolvers = {
  Query: {
    getCommentById: async (_, { _id }) => await Comment.findById(_id).exec(),
    getComments: async () => await Comment.find({}).exec(),
    getUsers: async () => await User.find({}).exec(),
    getSuggestions: async () => await Suggestion.find({}).exec(),
    getPark: async () => await Park.find({}).exec(),
    getParkByName: async (_, parks) =>
      await Park.findOne({ fullName: parks.fullName }).exec(),
  },
};
module.exports = { typeDefs, resolvers };
