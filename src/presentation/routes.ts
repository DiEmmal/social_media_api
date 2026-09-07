import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";
import { PostsRoutes } from "./posts/routes.js";


export class AppRoutes {

    get routes() {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/posts', PostsRoutes.routes);

        return router;
    };

};