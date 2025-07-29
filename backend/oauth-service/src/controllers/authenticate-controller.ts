import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { authService } from "../services";
import { AuthError, InternalServerError } from "../config/error-config";
import { extractToken, responseHandler } from "./helper";
import { googleAuthSchema } from "../dto/auth-google-dto";

export class AuthController {
  static authenticateGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate("google", {
        scope: ["profile", "email"],
      })(req, res);
    } catch (error) {
      next(error);
    }
  }

  static callbackGoogle(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "google",
      async (error: any, user: any, info: any) => {
        try {
          if (error) {
            throw new InternalServerError("Authentication failed");
          }
          if (!user) {
            throw new AuthError("User not authenticated");
          }

          const body = googleAuthSchema.parse(user);

          const { accessToken, refreshToken } =
            await authService.authenticateWithGoogle(body);

          res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
            signed: true,
          });

          res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback#access_token=${accessToken}`
          );
        } catch (error) {
          next(error);
        }
      }
    )(req, res, next);
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token } = req.cookies;

      await authService.logout(refresh_token);

      res.clearCookie("refresh_token", {
        path: "/",
      });

      responseHandler(res, null, "Account successfully logged out");
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token, access_token } = extractToken(req);

      await authService.me(refresh_token, access_token);

      responseHandler(res, null, "User successfully loaded");
    } catch (error) {
      next(error);
    }
  }
}
