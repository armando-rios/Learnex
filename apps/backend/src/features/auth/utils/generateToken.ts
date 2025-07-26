import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const generateToken = (id: ObjectId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
