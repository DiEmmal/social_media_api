import { envs } from "./config/envs.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

(() => {
  main();
})();

async function main() {
  const appRoutes = new AppRoutes();

  const server = new Server({
    port: envs.PORT,
    routes: appRoutes.routes,
    public_path: envs.PUBLIC_PATH,
  });

  server.start();

};