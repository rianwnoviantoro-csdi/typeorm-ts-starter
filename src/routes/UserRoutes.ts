import express from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const userRouter = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.put(
  "/:id",
  authMiddleware,
  userController.updateUser.bind(userController)
);
userRouter.delete(
  "/:id",
  authMiddleware,
  userController.deleteUser.bind(userController)
);

export default userRouter;
