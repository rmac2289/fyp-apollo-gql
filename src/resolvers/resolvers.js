const [comments, users] = require("../../fakeData");
const { User, Comment } = require("../../models");

const resolvers = {
  Query: {
    getCommentById: async (_, { _id }) => {
      return await Comment.findById(_id).exec();
    },
    getComments: async (_) => {
      return await Comment.find({}).exec();
    },
    getUsers: async () => await User.find({}).exec(),
    getSuggestions: () => console.log("suggestion"),
  },
  Mutation: {
    addUser: async (_, user) => {
      try {
        let response = await User.create(user);
        return response;
      } catch (error) {
        return error.message;
      }
    },
    addComment: async (_, comment) => {
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
  },
};

module.exports = resolvers;
