import Like from '../models/like.js';

const checkDuplicateLike = async (req, res, next) => {
  const { docID } = req.body;

  const isDocLiked = await Like.findOne({ docID });

  if (isDocLiked) {
    return res.status(400).json({ error: 'Already liked' });
  }

  next();
};

export default checkDuplicateLike;
