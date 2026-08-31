import { Request, Response } from 'express';
import { CreateUserDto } from '../../domain/dtos/auth/register-user.dto.js';
import { getUUID } from '../../config/uuid.adapter.js';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto.js';

const users: { id: string, name: string, email: string, password: string }[] = [];

export class AuthController {
  register = (_req: Request, res: Response) => {
    const { error, dto } = CreateUserDto.create(_req.body);

    if (error) res.status(400).json({ error });

    const { name, email, password } = dto!;

    const newUser = {
      id: getUUID(),
      name: name,
      email: email,
      password: password
    };

    users.push(newUser);

    res.status(200).json({ message: 'User login successful', user: newUser });
  };

  login = (req: Request, res: Response) => {
    const { error, dto } = LoginUserDto.create(req.body);

    if (error) res.status(400).json({ error });

    const { email, password } = dto!;

    const user = users.find(user => user.email === email);

    if(!user) res.status(404).json({ error: 'User not found' });

    if(user?.password === password) {
      res.status(200).json({ message: 'User login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    };

  };
};