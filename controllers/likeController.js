import Like from '../models/like.js';

export const get_all_likes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.json(likes);
  } catch {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const like_doc = async (req, res) => {
  try {
    const like = new Like(req.body);
    await like.save();
    const likes = await Like.find();
    res.json(likes);
  } catch {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};
