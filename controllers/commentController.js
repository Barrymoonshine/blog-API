import Comment from '../models/comment.js';

export const create_comment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
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
    const comments = await Comment.find({ blogID: req.params.id });
    res.send(comments);
  } catch (err) {
    console.log(err);
  }
};
