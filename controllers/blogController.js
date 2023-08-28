import Blog from '../models/blog.js';

export const get_all_blogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.send(blogs);
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An internal server error occurred when sending your request, please try again or report issue to site maintainer.',
        err,
      },
    });
  }
};

export const create_blog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
    });
    await blog.save();
    res.json('Success, blog saved!');
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'An internal server error occurred when sending your request, please try again or report issue to site maintainer.',
        err,
      },
    });
  }
};

export const get_single_blog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
  } catch (err) {
    console.log(err);
  }
};

export const delete_blog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `Blog ${req.params.id} deleted`,
    });
  } catch (err) {
    console.log(err);
  }
};
