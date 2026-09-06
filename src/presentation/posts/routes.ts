import { Router } from "express";
import { PostsController } from "./controller.js";
import { PostRepositoryImpl } from "../../infrastructure/repositories/post.repository.impl.js";
import { PostDatasourceImpl } from "../../infrastructure/datasources/post.datasource.impl.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl.js";
import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl.js";
import { AuthServiceImpl } from "../../infrastructure/services/auth.service.impl.js";
import { EmailServiceImpl } from "../../infrastructure/services/email.service.impl.js";

export class PostsRoutes {

  static get routes(): Router {

    const router = Router();

    const authMiddleware = new AuthMiddleware(new UserRepositoryImpl(new UserDatasourceImpl()), new AuthServiceImpl(new EmailServiceImpl()));

    const datasource = new PostDatasourceImpl();
    const repository = new PostRepositoryImpl(datasource);

    const controller = new PostsController(repository);

    router.get('/', controller.getPosts);
    router.post('/', [authMiddleware.validateJWT], controller.createPost)

    return router;
  };
};