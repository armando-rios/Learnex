import type { Request, Response } from 'express';
import { userRepository, profileRepository } from '@/shared/repositories';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const existingUser = await userRepository.existsByEmailOrUsername(email, username);

    if (existingUser) {
      return res.status(400).json({
        message: 'The user already exists',
      });
    }

    const newUser = await userRepository.create({
      fullname,
      username,
      email,
      password,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullname)}&background=random&size=128`,
    });

    if (!newUser) {
      throw new Error('User not created');
    }

    const token = generateToken(newUser.id);

    await profileRepository.create({
      userId: newUser.id,
      fullname: newUser.fullname,
      username: newUser.username,
      image: newUser.image,
    });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
      },
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
};
