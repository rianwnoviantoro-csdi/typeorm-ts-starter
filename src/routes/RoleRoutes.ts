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
  roleMiddleware([1]),
  roleController.createRole.bind(roleController)
);

roleRouter.get(
  "/",
  authMiddleware,
  roleMiddleware([1]),
  roleController.getAllRoles.bind(roleController)
);

roleRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware([1]),
  roleController.getRoleById.bind(roleController)
);

roleRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([1]),
  roleController.updateRole.bind(roleController)
);

roleRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([1]),
  roleController.deleteRole.bind(roleController)
);

export default roleRouter;
