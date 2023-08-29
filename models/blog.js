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
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model('Blogs', blogsSchema);

export default Blog;
