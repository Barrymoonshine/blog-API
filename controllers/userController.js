import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' });

const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

export const user_sign_up = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Admin status initially false, as users must become members via the join-us view
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      isAdmin: false,
    });
    const user = await newUser.save();

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
    res.status(200).json('Success, user token verified');
  } catch (err) {
    res
      .status(500)
      .json(
        'An internal server error occurred when sending your request, please try again or report the issue to site maintainer.'
      );
  }
};
