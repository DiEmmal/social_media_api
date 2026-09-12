import mongoose from "mongoose";

const postCommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  postID: {
    type: String,
    required: true,
  },
  author: {
    id: { type: String, required: true},
    name: { type: String, required: true},
  },
  content: {
    type: String,
    required: true
  }
});

export const PostCommentModel = mongoose.model('PostComment', postCommentSchema);