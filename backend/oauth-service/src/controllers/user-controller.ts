import { NextFunction, Request, Response } from "express";
import { extractToken, responseHandler } from "./helper";
import UserService from "../services/user-service";
import { userSchema } from "../dto/user-dto";

export default class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await UserService.getUser(id);

      responseHandler(res, result, "User successfully loaded");
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.getUsers();
      responseHandler(res, result, "Users successfully loaded");
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token } = extractToken(req);

      const data = userSchema.parse(req.body);

      const result = await UserService.createUser(data);

      responseHandler(res, result, "User successfully created");
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = userSchema.parse(req.body);

      const result = await UserService.updateUser(id, data);

      responseHandler(res, result, "User successfully updated");
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await UserService.deleteUser(id);

      responseHandler(res, null, "User successfully deleted");
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token, access_token } = extractToken(req);
      const result = await UserService.me(refresh_token, access_token);

      responseHandler(res, result, "Current user successfully loaded");
    } catch (error) {
      next(error);
    }
  }
}
