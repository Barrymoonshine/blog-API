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
    type: [String],
    required: true,
  },
  picture: {
    type: String,
  },
  likes: {
    type: Number,
  },
});

const Blog = mongoose.model('Blogs', blogsSchema);

export default Blog;
