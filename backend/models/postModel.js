const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: { type: String },
});
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  comments: [commentSchema],
});

const PostModel = mongoose.model("PostModel", postSchema);

module.exports = PostModel;
