import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";

const authRouter = express.Router();

const userService = new UserService();
const authController = new AuthController(userService);

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));

export default authRouter;
