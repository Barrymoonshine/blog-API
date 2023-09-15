import User from '../models/user.js';

const checkDuplicateUsername = async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    // No existing entry for user, not duplicate
    return next();
  }
  return res
    .status(400)
    .json('This username is already taken, please provide another username');
};

export default checkDuplicateUsername;
