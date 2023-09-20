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
    const blog = new Blog({
      ...req.body,
      image: req.file.path,
    });
    await blog.save();
    const newBlogs = await Blog.find();
    res.json(newBlogs);
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const get_single_blog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

export const delete_blog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json('Blog deleted');
  } catch (err) {
    res
      .status(500)
      .json(
        'There was an error with deleting your blog, please try again or if the issue persists contact the site admin'
      );
  }
};

export const update_published = async (req, res) => {
  try {
    await Blog.findOneAndUpdate(
      { _id: req.body.id },
      { published: req.body.published }
    );
    res.send('Blog published updated');
  } catch (err) {
    res
      .status(500)
      .json(
        'There was an error with updating your blog, please try again or if the issue persists contact the site admin.'
      );
  }
};

export const update_blog = async (req, res) => {
  try {
    const updatedBlog = {
      ...req.body,
      image: req.file.path,
    };

    await Blog.findOneAndUpdate({ author: updatedBlog.author }, updatedBlog);
    const newBlogs = await Blog.find();
    res.json(newBlogs);
  } catch (err) {
    res
      .status(500)
      .json(
        'There was an error with updating your blog, please try again or if the issue persists contact the site admin.'
      );
  }
};
