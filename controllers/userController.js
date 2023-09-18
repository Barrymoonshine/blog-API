import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' });

const hashPassword = async (password) => bcrypt.hash(password, 10);

export const user_sign_up = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    // Admin status initially false
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const user = await newUser.save();
    // Does token need to be returned as an object?
    const token = createToken(user._id);

    res.json({ token });
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

export const user_log_in = async (req, res) => {
  try {
    const token = createToken(req.user._id);
    // Does token need to be returned as an object?
    res.json({ token });
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

export const user_authenticate = async (req, res) => {
  try {
    res.status(200).json('User authenticated');
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const user_update_username = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { username: req.body.username },
      { username: req.body.newUsername }
    );
    res.status(200).json('Username updated');
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const user_update_password = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.newPassword);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { password: hashedPassword }
    );
    res.status(200).json('Password updated');
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
  }
};
