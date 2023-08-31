import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' });

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
    if (!req.body.username || !req.body.password) {
      return res.json('Please complete all fields');
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.json('Incorrect username');
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.json('Incorrect password');
    }
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
