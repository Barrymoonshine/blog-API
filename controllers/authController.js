import User from '../models/user.js';
import { createToken, hashPassword } from '../helpers/helpers.js';

export const create = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ token });
  } catch {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};

export const authenticate = async (req, res) => {
  try {
    res.status(200).json('User authenticated');
  } catch {
    res
      .status(500)
      .json(
        'An internal server error occurred when processing your request, please try again or report the issue to site maintainer.'
      );
  }
};
