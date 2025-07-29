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
    ],
  },
  {
    prefix: "/users",
    handlers: [
      ["get", "/", UserController.getUsers],
      ["get", "/:id", UserController.getUser],
      ["get", "/me", UserController.me],
      ["post", "/", UserController.createUser],
    ],
  },
];

generateRoutes(router, routes);

export default router;
