import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogsSchema = new Schema(
  {
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
    region: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blogs', blogsSchema);

export default Blog;
