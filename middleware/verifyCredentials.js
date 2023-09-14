import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const verifyCredentials = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json('Please complete all fields');
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json('Username not valid');
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json('Password not valid');
    }
    if (match) {
      // Attach user to the request object for use in userController to save another call to the DB
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default verifyCredentials;
