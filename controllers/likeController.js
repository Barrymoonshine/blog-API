import Like from '../models/like.js';

export const get_all_likes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.send(likes);
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

export const like_doc = async (req, res) => {
  try {
    const like = new Like(req.body);
    await like.save();
    res.json(like);
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
