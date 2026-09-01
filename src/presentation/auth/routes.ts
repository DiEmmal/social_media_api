import { Router } from 'express';
import { AuthController } from './controller.js';
import { UserDatasourceImpl } from '../../infrastructure/datasources/user.datasource.impl.js';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl.js';
import { AuthServiceImpl } from '../../infrastructure/services/index.js';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authService = new AuthServiceImpl();

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const controller = new AuthController(userRepository, authService);

    router.post('/login', controller.login);
    router.post('/register', controller.register);

    return router;
  };
};
