import Like from '../models/like.js';

const checkDuplicateLike = async (req, res, next) => {
  const { docID, username } = req.body;

  const isDocLiked = await Like.findOne({ docID, username });

  if (isDocLiked) {
    try {
      await Like.deleteOne({ docID, username });
      const likes = await Like.find();
      res.json(likes);
    } catch (err) {
      res
        .status(500)
        .json({ error: 'Internal Server Error', errorDetails: err });
    }
  } else {
    next();
  }
};

export default checkDuplicateLike;
