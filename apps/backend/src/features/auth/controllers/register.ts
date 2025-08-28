import { Request, Response } from 'express';
import User from '../../../shared/models/User';
import { generateToken } from '../utils/generateToken';
import Profile from '../../../shared/models/Profile';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'The user already exists',
      });
    }

    const newUser = await User.create({
      fullname,
      username,
      email,
      password,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullname)}&background=random&size=128`,
    });

    if (!newUser) {
      throw new Error('User not created');
    }

    const token = generateToken(newUser._id);

    await Profile.create({
      userId: newUser._id,
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
        id: newUser._id,
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
