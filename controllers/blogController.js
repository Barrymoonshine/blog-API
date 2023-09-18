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
          'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.',
        err,
      },
    });
  }
};

export const create_blog = async (req, res) => {
  try {
    // Get the author from the JWT?
    const blog = new Blog({
      ...req.body,
      image: req.file.path,
    });
    await blog.save();
    const newBlogs = await Blog.find();
    res.json(newBlogs);
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Adsdfsdfsdfsdfsdfsdsdfsdfsdfsdfdsfr.',
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
    res.status(200).json('Blog deleted');
  } catch (err) {
    res
      .status(500)
      .json(
        'There was an error with deleting your blog, please try again or if the issue persists contact the site admin',
      );
  }
};
