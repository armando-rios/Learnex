import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '@/shared/interfaces/IUser';
import { userRepository } from '@/shared/repositories';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({
        message: 'Not authorized, no token',
      });
      throw new Error('Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        message: 'User not found',
      });
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: (error as Error).message,
    });
  }
};
