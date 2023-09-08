import Like from '../models/like.js';

const create_blog_like = async (req, res) => {
  try {
    const like = new Like({
      username: req.body.username,
      blogLikes: [{ blogID: req.body.blogID }],
    });
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

export const like_blog = async (req, res) => {
  try {
    const userLikes = await Like.findOne({ username: req.body.username });
    if (!userLikes) {
      await create_blog_like(req, res);
    } else {
      userLikes.blogLikes.push({ blogID: req.body.blogID });
      await userLikes.save();
      res.status(200).json(userLikes);
    }
  } catch (err) {
    console.log(err);
  }
};

const create_comment_like = async (req, res) => {
  try {
    const like = new Like({
      username: req.body.username,
      commentLikes: [req.body.commentID],
    });
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

export const like_comment = async (req, res) => {
  try {
    const userLikes = await Like.findOne({ username: req.body.username });
    if (!userLikes) {
      await create_comment_like(req, res);
    } else {
      userLikes.commentLikes.push({ commentID: req.body.commentID });
      await userLikes.save();
      res.status(200).json(userLikes);
    }
  } catch (err) {
    console.log(err);
  }
};
