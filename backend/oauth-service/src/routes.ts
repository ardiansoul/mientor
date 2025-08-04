import { Router } from "express";
import { generateRoutes, Routes } from "./helpers/generate";
import UserController from "./controllers/user-controller";
import { AuthController } from "./controllers/authenticate-controller";

const router = Router();

const routes: Routes[] = [
  {
    prefix: "/auth",
    handlers: [
      ["get", "/google", AuthController.authenticateGoogle],
      ["get", "/google/callback", AuthController.callbackGoogle],
      ["post", "/logout", AuthController.logout],
      ["post", "/refresh_token", AuthController.refreshToken],
    ],
  },
  {
    prefix: "/users",
    handlers: [
      ["get", "/", UserController.getUsers],
      ["get", "/me", UserController.me],
      ["get", "/:id", UserController.getUser],
      ["post", "/", UserController.createUser],
      ["patch", "/:id", UserController.updateUser],
      ["delete", "/:id", UserController.deleteUser],
    ],
  },
];

generateRoutes(router, routes);

export default router;
