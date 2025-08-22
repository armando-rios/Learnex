import { Request, Response } from 'express';
import User from '../../../shared/models/User';
import { generateToken } from '../utils/generateToken';
import Profile from '../../../shared/models/Profile';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'The user already exists',
      });
    }

    const newUser = await User.create({
      fullName,
      username,
      email,
      password,
      imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=128`,
    });

    if (!newUser) {
      throw new Error('User not created');
    }

    const token = generateToken(newUser._id);

    await Profile.create({
      userId: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      imageUrl: newUser.imageUrl,
    });

    return res.status(201).json({
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        imageUrl: newUser.imageUrl,
        bio: '',
        location: '',
        ocupation: '',
        experience: '',
        skills: [],
        interests: [],
        socialLinks: { linkedin: '', github: '' },
        contactEmail: '',
        contactPhone: '',
        countryId: '',
        certifications: [],
        password: '',
        achievements: [],
      },
      token,
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
