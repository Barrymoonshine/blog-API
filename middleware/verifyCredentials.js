import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const verifyCredentials = async (req, res, next) => {
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
    if (match) {
      // Attach user to the request object
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default verifyCredentials;