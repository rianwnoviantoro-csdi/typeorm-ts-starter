import express from "express";
import { RoleController } from "../controllers/RoleController";
import { RoleService } from "../services/RoleService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { permissionMiddleware } from "../middlewares/PermissionMiddleware";

const roleRouter = express.Router();

const roleService = new RoleService();
const roleController = new RoleController(roleService);

roleRouter.post(
  "/",
  authMiddleware,
  permissionMiddleware(["create:role"]),
  roleController.createRole.bind(roleController)
);

roleRouter.get(
  "/",
  authMiddleware,
  permissionMiddleware(["read:role"]),
  roleController.getAllRoles.bind(roleController)
);

roleRouter.get(
  "/:id",
  authMiddleware,
  permissionMiddleware(["read:role"]),
  roleController.getRoleById.bind(roleController)
);

roleRouter.put(
  "/:id",
  authMiddleware,
  permissionMiddleware(["update:role"]),
  roleController.updateRole.bind(roleController)
);

roleRouter.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware(["delete:role"]),
  roleController.deleteRole.bind(roleController)
);

export default roleRouter;
