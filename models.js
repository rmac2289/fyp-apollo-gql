const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_name: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    comment: String,
    subject: String,
    park_name: String,
    date: String,
    user: userSchema,
  },
  { timestamps: true }
);

const suggestionSchema = new Schema(
  {
    park_name: String,
    location: String,
    description: String,
    user: userSchema,
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("suggestion", suggestionSchema);

const User = mongoose.model("user", userSchema);

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  User,
  Comment,
  Suggestion,
};
