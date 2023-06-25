import express from "express";
import { RoleController } from "../controllers/RoleController";
import { RoleService } from "../services/RoleService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { roleMiddleware } from "../middlewares/RoleMiddleware";

const roleRouter = express.Router();

const roleService = new RoleService();
const roleController = new RoleController(roleService);

roleRouter.post(
  "/",
  authMiddleware,
  roleMiddleware([1], ["create:role"]),
  roleController.createRole.bind(roleController)
);

roleRouter.get(
  "/",
  authMiddleware,
  roleMiddleware([1], ["read:role"]),
  roleController.getAllRoles.bind(roleController)
);

roleRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware([1], ["read:role"]),
  roleController.getRoleById.bind(roleController)
);

roleRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([1], ["update:role"]),
  roleController.updateRole.bind(roleController)
);

roleRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([1], ["delete:role"]),
  roleController.deleteRole.bind(roleController)
);

export default roleRouter;
