const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('Posts', postSchema);

export default User;
