import Blog from '../models/blog.js';

export const get_all_blogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.send(blogs);
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred when loading the page.',
        err,
      },
    });
  }
};

export const create_blog = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const blog = new Blog({
      ...req.body,
    });
    await blog.save();
    res.json({
      message: 'Success, blog saved!',
      blog,
    });
  } catch (err) {
    console.log(err);
  }
};
