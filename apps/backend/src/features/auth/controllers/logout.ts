import { Request, Response } from 'express';

export const logout = (_req: Request, res: Response) => {
  res.cookie('authToken', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};
