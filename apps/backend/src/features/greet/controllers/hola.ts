import { Request, Response } from 'express';

export const hola = async (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send('Hola, Mundo!');
};
