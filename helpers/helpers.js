import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' });

export const hashPassword = async (password) => bcrypt.hash(password, 10);
