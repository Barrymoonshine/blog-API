import Comment from '../models/comment.js';

export const create_comment = async (req, res) => {
  try {
    const comment = new Comment(req.body);

    await comment.save();

    const newComments = await Comment.find({ blogID: comment.blogID });

    res.json(newComments);
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'This is an error, please fix error messages across the back-end!',
        err,
      },
    });
  }
};

export const get_blog_comments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogID: req.params.id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'This is an error, please fix error messages across the back-end!',
        err,
      },
    });
  }
};

export const delete_comment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(200).json('Success, comment deleted ');
  } catch (err) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'This is an error, please fix error messages across the back-end!',
        err,
      },
    });
  }
};
