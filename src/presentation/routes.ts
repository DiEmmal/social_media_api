import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";


export class AppRoutes {

    get routes() {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);

        return router;
    };

}