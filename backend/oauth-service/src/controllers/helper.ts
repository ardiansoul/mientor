import { AppError, AuthError } from "../config/error-config";

import { Request, Response, NextFunction } from "express";
import { logError } from "../helpers/log-error";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logError(err, `${req.method} ${req.originalUrl}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ code: err.code, message: err.message });
    return;
  }
  if (err.name === "ZodError") {
    res.status(400).json({ code: "VALIDATION", message: err.errors });
    return;
  }
  console.error(err);
  res.status(500).json({ code: "INTERNAL", message: "Internal server error" });
}

export function responseHandler(
  res: Response,
  data: any,
  message: string,
  statusCode = 200
) {
  res.status(statusCode).json({
    data,
    message,
  });
}

export const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } => {
  const { authorization } = req.headers;
  const { refresh_token } = req.cookies;

  if (!authorization) throw new AuthError("Token not found");
  if (!refresh_token) throw new AuthError("token not found");

  const [_, access_token] = authorization?.split(" ");

  if (!access_token) throw new AuthError("token not found");

  return { access_token, refresh_token };
};
