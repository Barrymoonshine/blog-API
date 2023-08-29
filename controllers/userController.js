import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const user_register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Membership status initially false, as users must become members via the join-us view
    const user = new User({
      ...req.body,
      password: hashedPassword,
      isAdmin: false,
    });
    await user.save();
    res.json('Success, thank you for creating an account!');
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
    res.json('user logged in');
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
