import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../shared/models/User';

export const verify = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
