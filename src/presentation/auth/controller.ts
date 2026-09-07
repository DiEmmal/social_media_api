import { AuthService, CreateUserDto, LoginUserDto, RegisterUserUseCase, UserRepository, LoginUserUseCase, ValidateEmailUseCase, CustomHttpError } from '../../domain/index.js';
import type { Request, Response } from 'express';

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

    registerUserUseCase.execute(dto!)
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

    loginUserUseCase.execute(dto!)
      .then(({ user, token }) => res.status(200).json({ message: `User logged in successful, welcome again ${user.name}!`, token }))
      .catch(error => this.handleError(error, res));

  };

  validateEmail = async (req: Request, res: Response) => {
    let { token } = req.params;
    token = Array.isArray(token) ? token[0] : token;

    if (!token) return res.status(400).json({ error: 'Token is required' });

    const validateEmailUseCase = new ValidateEmailUseCase(
      this.userRepository,
      this.authService
    );

    validateEmailUseCase.execute(token)
      .then(validated => res.status(200).json({ message: 'Email validated successfully', validated }))
      .catch(error => this.handleError(error, res));

  };
  
};