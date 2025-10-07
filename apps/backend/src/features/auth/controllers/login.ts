import type { Request, Response } from 'express';
import { userRepository } from '@/shared/repositories';
import { generateToken } from '../utils/generateToken';

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    console.log({ login, password });

    const user = await userRepository.findByEmailOrUsername(login);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await userRepository.verifyPassword(user, password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user.id);

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log('User logged in:', user.username);

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
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
