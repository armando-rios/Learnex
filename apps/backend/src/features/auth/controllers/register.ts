import { Request, Response } from 'express';
import User from '../../../shared/models/User';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: 'The user already exists',
      });
      throw new Error('The user already exists');
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    if (!user) {
      throw new Error('User not created');
    }

    return res.status(201).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
      },
      token: generateToken(user._id),
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
