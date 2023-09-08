import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogLikesSchema = new mongoose.Schema({
  blogID: {
    type: String,
  },
});

const commentLikesSchema = new mongoose.Schema({
  commentID: {
    type: String,
  },
});

const likeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  blogLikes: [blogLikesSchema],
  commentLikes: [commentLikesSchema],
});

const Like = mongoose.model('Likes', likeSchema);

export default Like;
