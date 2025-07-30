import { Request, Response } from 'express';
import User from '../../../shared/models/User';
import { generateToken } from '../utils/generateToken';

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    return res.status(200).json({
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        image: user.image,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
