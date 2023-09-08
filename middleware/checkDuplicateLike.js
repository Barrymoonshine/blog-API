import Like from '../models/like.js';

export const checkDuplicateBlogLike = async (req, res, next) => {
  const { username, blogID } = req.body;

  const userLikes = await Like.findOne({ username });

  if (!userLikes) {
    // No existing entry for user, not duplicate
    return next();
  }

  if (!('blogLikes' in userLikes)) {
    // No existing likes, not duplicate
    return next();
  }

  const isDuplicateBlogLike = userLikes.blogLikes.some(
    (like) => like.blogID === blogID
  );

  if (isDuplicateBlogLike) {
    return res.status(400).json({ error: 'You have already liked this blog' });
  }
  // Not duplicate
  next();
};

export const checkDuplicateCommentLike = async (req, res, next) => {
  const { username, commentID } = req.body;
  const userLikes = await Like.findOne({ username });

  if (!userLikes) {
    // No existing entry for user, not duplicate
    return next();
  }

  if (!('commentLikes' in userLikes)) {
    // No existing likes, not duplicate
    return next();
  }

  const isDuplicateCommentLike = userLikes.commentLikes.some(
    (like) => like.commentID === commentID
  );
  if (isDuplicateCommentLike) {
    return res
      .status(400)
      .json({ error: 'You have already liked this comment' });
  }
  next();
};
