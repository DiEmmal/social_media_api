import { Router } from 'express';
import { AuthController } from './controller.js';
import { UserDatasourceImpl } from '../../infrastructure/datasources/user.datasource.impl.js';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl.js';
import { AuthServiceImpl } from '../../infrastructure/services/index.js';
import { EmailServiceImpl } from '../../infrastructure/services/email.service.impl.js';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailServiceImpl();
    const authService = new AuthServiceImpl(emailService);

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const controller = new AuthController(userRepository, authService);

    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/validate-email/:token', controller.validateEmail );

    return router;
  };
};
