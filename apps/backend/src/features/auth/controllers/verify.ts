import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '@/shared/repositories';

export const verify = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
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
