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
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch (error) {
        return error.message;
      }
    },
    addComment: async (_, args) => {
      try {
        let response = await Comment.create(args);
        return response;
      } catch (error) {
        return error.message;
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        await User.findByIdAndDelete(_id);
        console.log("successful deletion");
        return true;
      } catch (error) {
        console.log(`No User with _id: ${_id}`);
        return false;
      }
    },
  },
};

module.exports = resolvers;
