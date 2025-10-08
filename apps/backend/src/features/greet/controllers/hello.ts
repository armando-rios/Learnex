import type { Request, Response } from 'express';

export const hello = async (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send('Hello, World!');
};
