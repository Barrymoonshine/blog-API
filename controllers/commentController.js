import Comment from '../models/blog.js';

export const create_comment = async (req, res) => {
  try {
    // Get the author from the JWT?
    const comment = new Comment({
      ...req.body,
    });
    await comment.save();
    res.json('Success, comment saved!');
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

export const get_blog_comments = async (req, res) => {
  try {
    const comments = await Comment.find(req.params.id);
    res.send(comments);
  } catch (err) {
    console.log(err);
  }
};
