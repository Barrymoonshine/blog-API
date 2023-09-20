import Comment from '../models/comment.js';

export const create_comment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    const newComments = await Comment.find({ blogID: comment.blogID });
    res.json(newComments);
  } catch {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const get_blog_comments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogID: req.params.id });
    res.json(comments);
  } catch {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const delete_comment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findOneAndDelete({ commentID: id });
    res.json('Success, comment deleted ');
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};
