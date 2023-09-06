import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    blogID: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
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
