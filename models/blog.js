import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogsSchema = new Schema({
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

const Blog = mongoose.model('Posts', blogsSchema);

export default Blog;
