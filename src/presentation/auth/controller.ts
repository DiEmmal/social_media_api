import { Request, Response } from 'express';

export class AuthController {
  login = (_req: Request, res: Response) => {
    res.status(200).json({ message: 'User login successful' });
  };

  register = (req: Request, res: Response) => {
    res.status(201).json({ message: 'User registered successfully' });
  };
}
