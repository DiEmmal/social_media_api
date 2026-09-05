import { Router } from "express";
import { PostsController } from "./controller.js";
import { PostRepositoryImpl } from "../../infrastructure/repositories/post.repository.impl.js";
import { PostDatasourceImpl } from "../../infrastructure/datasources/post.datasource.impl.js";

export class PostsRoutes {
  static get routes(): Router {

    const router = Router();

    const datasource = new PostDatasourceImpl();
    const repository = new PostRepositoryImpl(datasource);

    const controller = new PostsController(repository);

    router.get('/', controller.getPosts);
    router.post('/', controller.createPost)

    return router;
  };
};