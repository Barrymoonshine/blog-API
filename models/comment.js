import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    commentID: {
      type: String,
      required: true,
    },
    blogID: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comments', commentsSchema);

export default Comment;
