import { Router } from "express";
import { PostsController } from "./controller.js";

export class PostsRoutes {
  static get routes(): Router {

    const router = Router();

    const controller = new PostsController();

    router.get('/', controller.getPosts);
    router.post('/', controller.createPost)

    return router;
  };
};