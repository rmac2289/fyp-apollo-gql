const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  user_name: String,
  password: String,
  email: String,
});

const commentSchema = new Schema({
  comment: String,
  subject: String,
  park_name: String,
  date: Date,
  user: userSchema,
});

const suggestionSchema = new Schema({
  park_name: String,
  location: String,
  description: String,
  user: userSchema,
});

const imageSchema = new Schema({
  altText: String,
  title: String,
  url: String,
});

const entranceFeeSchema = new Schema({
  cost: String,
  title: String,
});

const parkSchema = new Schema({
  fullName: String,
  state: String,
  map: String,
  latLng: [String],
  activities: [String],
  entranceFees: [entranceFeeSchema],
  url: String,
  weatherInfo: String,
  hours: String,
  description: String,
  images: [imageSchema],
  address: String,
});

const Suggestion = mongoose.model("suggestion", suggestionSchema);

const User = mongoose.model("user", userSchema);

const Park = mongoose.model("park", parkSchema);

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  User,
  Comment,
  Suggestion,
  Park,
};
