import express from "express";
import { PermissionController } from "../controllers/PermissionController";
import { PermissionService } from "../services/PermissionService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { permissionMiddleware } from "../middlewares/PermissionMiddleware";

const permissionRouter = express.Router();

const permissionService = new PermissionService();
const permissionController = new PermissionController(permissionService);

permissionRouter.post(
  "/",
  authMiddleware,
  permissionMiddleware(["create:permission"]),
  permissionController.createPermission.bind(PermissionController)
);

permissionRouter.get(
  "/",
  authMiddleware,
  permissionMiddleware(["read:permission"]),
  permissionController.getAllPermissions.bind(PermissionController)
);

permissionRouter.get(
  "/:id",
  authMiddleware,
  permissionMiddleware(["read:permission"]),
  permissionController.getPermissionById.bind(PermissionController)
);

permissionRouter.put(
  "/:id",
  authMiddleware,
  permissionMiddleware(["update:permission"]),
  permissionController.updatePermission.bind(PermissionController)
);

permissionRouter.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware(["delete:permission"]),
  permissionController.deletePermission.bind(PermissionController)
);

export default permissionRouter;
