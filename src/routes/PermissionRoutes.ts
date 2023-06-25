import express from "express";
import { PermissionController } from "../controllers/PermissionController";
import { PermissionService } from "../services/PermissionService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { roleMiddleware } from "../middlewares/RoleMiddleware";

const permissionRouter = express.Router();

const permissionService = new PermissionService();
const permissionController = new PermissionController(permissionService);

permissionRouter.post(
  "/",
  authMiddleware,
  roleMiddleware([1], ["create:permission"]),
  permissionController.createPermission.bind(PermissionController)
);

permissionRouter.get(
  "/",
  authMiddleware,
  roleMiddleware([1], ["read:permission"]),
  permissionController.getAllPermissions.bind(PermissionController)
);

permissionRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware([1], ["read:permission"]),
  permissionController.getPermissionById.bind(PermissionController)
);

permissionRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([1], ["update:permission"]),
  permissionController.updatePermission.bind(PermissionController)
);

permissionRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([1], ["delete:permission"]),
  permissionController.deletePermission.bind(PermissionController)
);

export default permissionRouter;
