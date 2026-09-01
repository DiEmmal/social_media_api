import { Request, Response } from 'express';
import { CreateUserDto } from '../../domain/dtos/auth/register-user.dto.js';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto.js';
import { RegisterUserUseCase } from '../../domain/use-cases/auth/register-user.use-case.js';
import { UserRepository } from '../../domain/repositories/user.repository.js';
import { AuthService } from '../../domain/index.js';
import { LoginUserUseCase } from '../../domain/use-cases/auth/login-user.use-case.js';

export class AuthController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    this.userRepository = userRepository;
  }

  register = async (req: Request, res: Response) => {
    const { error, dto } = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const registerUserUseCase = new RegisterUserUseCase(
      this.userRepository,
      this.authService
    );

    const newUser = await registerUserUseCase.execute(dto!);

    return res.status(200).json({ message: `User registered successful, welcome ${newUser.name}!`, user: newUser });
  };

  login = async (req: Request, res: Response) => {
    const { error, dto } = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.authService
    );

    const user = await loginUserUseCase.execute(dto!);

    return res.status(200).json({ message: `User logged in successful, welcome ${user.name}!` });

  };
};