import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' });

export const user_sign_up = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Admin status initially false
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      isAdmin: false,
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
    const user = await User.find({ _id: req.user._id });
    // MDB returns the user data in an array
    const { username } = user[0];
    res.json(username);
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
  }
};
