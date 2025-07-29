import crypto from "crypto";
import { RequestHandler, Router } from "express";
import jwt from "jsonwebtoken";

export type TokenPayload = {
  id: string;
  userId: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  isActive: boolean;
};

export type ApiMethod = "get" | "post" | "patch" | "put" | "delete";

export type Routes = {
  prefix: string;
  middlewares?: Array<RequestHandler>;
  handlers: Array<
    [
      method: ApiMethod,
      path: string,
      handler: RequestHandler,
      handlerMiddleware?: Array<RequestHandler>
    ]
  >;
};

export const generateId = (): string => {
  const id = crypto.randomUUID();
  return id;
};

export const generateToken = (record: TokenPayload) => {
  const accessToken = jwt.sign(record, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
  return { accessToken };
};

export const verifyToken = (access_token: string): TokenPayload => {
  return jwt.verify(
    access_token,
    process.env.ACCESS_TOKEN_SECRET!
  ) as TokenPayload;
};

export const generateRoutes = (router: Router, routes: Routes[]): Router => {
  routes.forEach(({ prefix, middlewares = [], handlers }) => {
    handlers.forEach(([method, path, handler, handlerMiddlewares = []]) => {
      router[method](
        prefix + path,
        ...middlewares,
        ...handlerMiddlewares,
        handler
      );

      console.log("Api Registered", `[${method}]:${prefix + path}`);
    });
  });
  return router;
};
