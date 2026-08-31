import { Request, Response } from 'express';
import { CreateUserDto } from '../../domain/dtos/auth/register-user.dto.js';
import { getUUID } from '../../config/uuid.adapter.js';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto.js';
import { PasswordServiceImpl } from '../../infrastructure/services/password.service.impl.js';

const users: { id: string, name: string, email: string, password: string }[] = [];

export class AuthController {
  register = async (req: Request, res: Response) => {
    const { error, dto } = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const { name, email, password } = dto!;

    const newUser = {
      id: getUUID(),
      name: name,
      email: email,
      password: await PasswordServiceImpl.hash(password),
    };

    users.push(newUser);

    return res.status(200).json({ message: `User registered successful, welcome ${newUser.name}!`, user: newUser });
  };

  login = async (req: Request, res: Response) => {
    const { error, dto } = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const { email, password } = dto!;

    const user = users.find(user => user.email === email);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const passwordVerified = await PasswordServiceImpl.compare(password, user?.password!)

    if (passwordVerified) {
      return res.status(200).json({ message: `User login successful, hi again ${user?.name}!`, user });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    };

  };
};