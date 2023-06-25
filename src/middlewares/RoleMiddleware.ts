import { Response, NextFunction } from "express";
import { AppException } from "../utils/AppException";
import { AuthenticatedRequest } from "./AuthMiddleware";

export const roleMiddleware = (allowedRoles: number[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.roleId; // Assuming the user role is stored in the `role` property of the `user` object in the request

    if (!allowedRoles.includes(userRole)) {
      throw new AppException(403, "Access denied");
    }

    next();
  };
};
