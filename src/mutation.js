const { gql } = require("apollo-server");
const { validatePassword, validateEmail, APP_SECRET } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Comment, Suggestion } = require("../models");

const typeDefs = gql`
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

const resolvers = {
  Mutation: {
    login: async (_, userInput) => {
      const userExists = await User.exists({ user_name: userInput.user_name });
      if (userExists)
        throw new Error(`User ${userInput.user_name} doesn't exist.`);
      if (userInput.password !== password)
        throw new Error(`Incorrect password.`);
      const token = jwt.sign({ _id: userInput._id }, APP_SECRET);
      return {
        token,
        user,
      };
    },
    addSuggestion: async (_, suggestionInput) => {
      if (!suggestionInput.user) {
        throw new Error("Login or sign up to add suggestions.");
      }
      try {
        let response = await Suggestion.create(suggestionInput);
        return response;
      } catch (error) {
        return error.message;
      }
    },
    addUser: async (_, userInput) => {
      const userExists = await User.exists({ user_name: userInput.user_name });
      const emailExists = await User.exists({ email: userInput.email });
      if (emailExists) {
        throw new Error(
          `Account with email ${userInput.email} already exists.`
        );
      }
      if (userExists) {
        throw new Error(`Username ${userInput.user_name} is already in use.`);
      }
      validatePassword(userInput.password);
      validateEmail(userInput.email);
      const passwordEncrypted = await bcrypt.hash(userInput.password, 10);

      try {
        let user = await User.create({
          ...userInput,
          password: passwordEncrypted,
        });
        return { user };
      } catch (error) {
        return error.message;
      }
    },
    addComment: async (_, comment) => {
      if (!comment.user) {
        throw new Error("Login or sign up to add comments.");
      }
      try {
        let response = await Comment.create(comment);
        return response;
      } catch (error) {
        return error.message;
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        const userExists = await User.exists({ _id: _id });
        if (userExists) {
          await User.findByIdAndDelete(_id);
          return `User with id: ${_id} successfully deleted`;
        } else {
          return `No user found with id: ${_id}.`;
        }
      } catch (error) {
        return error.message;
      }
    },
    deleteComment: async (_, { _id }) => {
      try {
        const commentExists = await Comment.exists({ _id: _id });
        if (commentExists) {
          await Comment.findByIdAndDelete(_id);
          return `Comment with id: ${_id} successfully deleted`;
        } else {
          return `No comment found with id: ${_id}`;
        }
      } catch (error) {
        return error.message;
      }
    },
    deleteSuggestion: async (_, { _id }) => {
      try {
        const suggestionExists = await Suggestion.exists({ _id: _id });
        if (suggestionExists) {
          await Suggestion.findByIdAndDelete(_id);
          return `Comment with id: ${_id} successfully deleted`;
        } else {
          return `No comment found with id: ${_id}`;
        }
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
