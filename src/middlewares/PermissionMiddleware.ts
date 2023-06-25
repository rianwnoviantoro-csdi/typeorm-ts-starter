import { Response, NextFunction } from "express";
import { AppException } from "../utils/AppException";
import { AuthenticatedRequest } from "./AuthMiddleware";
import { RoleService } from "../services/RoleService";

export const permissionMiddleware = (allowedPermissions: string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userRole = req.roleId; // Assuming the user role is stored in the `role` property of the `user` object in the request

    const roleService = new RoleService();

    const role = await roleService.getRoleById(userRole);

    let userPermissions = [];

    for (const permission of role.permissions) {
      userPermissions.push(permission.name);
    }

    const hasPermission = allowedPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new AppException(403, "Insufficient permissions");
    }

    next();
  };
};
