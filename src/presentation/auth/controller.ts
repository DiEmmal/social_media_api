import { Request, Response } from 'express';
import { CreateUserDto } from '../../domain/dtos/auth/register-user.dto.js';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto.js';
import { RegisterUserUseCase } from '../../domain/use-cases/auth/register-user.use-case.js';
import { UserRepository } from '../../domain/repositories/user.repository.js';
import { AuthService } from '../../domain/index.js';
import { LoginUserUseCase } from '../../domain/use-cases/auth/login-user.use-case.js';
import { CustomHttpError } from '../../domain/errors/custom-http.error.js';

export class AuthController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    this.userRepository = userRepository;
  };

  private handleError(error: unknown, res: Response) {

    if (error instanceof CustomHttpError) return res.status(error.httpCode).json({ error: error.message });

    return res.status(500).json({ error: 'Internal server error' });

  };

  register = async (req: Request, res: Response) => {
    const { error, dto } = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const registerUserUseCase = new RegisterUserUseCase(
      this.userRepository,
      this.authService
    );

    await registerUserUseCase.execute(dto!)
      .then(user => res.status(200).json({ message: `User registered successful, welcome ${user.name}!`, user }))
      .catch(error => this.handleError(error, res));

  };

  login = async (req: Request, res: Response) => {
    const { error, dto } = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.authService
    );

    await loginUserUseCase.execute(dto!)
      .then(user => res.status(200).json({ message: `User logged in successful, welcome ${user.name}!` }))
      .catch(error => this.handleError(error, res));

  };
};