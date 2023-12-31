import User from '../models/user.js';
import { createToken, hashPassword } from '../helpers/helpers.js';

export const log_in = async (req, res) => {
  try {
    const token = createToken(req.user._id);
    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const update_username = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { username: req.body.newUsername },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const update_password = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.newPassword);
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { password: hashedPassword },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};
