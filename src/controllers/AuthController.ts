import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserService } from "../services/UserService";
import { RegisterUserRequestDTO, LoginUserRequestDTO } from "../dto/UserDTO";
import { AppException } from "../utils/AppException";
import app from "../constant/app";

export class AuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response) {
    try {
      const body = req.body as RegisterUserRequestDTO;

      // Check if the user already exists
      const existingUser = await this.userService.getUserByEmail(body.email);

      if (existingUser) {
        throw new AppException(400, "User already exists");
      }

      // Create a new user
      const newUser = await this.userService.createUser(body);

      // Generate a JWT token
      const token = jwt.sign({ userId: newUser.id }, app.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.json({ user: newUser, token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const body = req.body as LoginUserRequestDTO;

      // Check if the user exists
      const user = await this.userService.getUserByEmail(body.email);

      if (!user) {
        throw new AppException(401, "Invalid credentials");
      }

      // Validate the password
      const isValidPassword = await this.userService.validatePassword(
        user,
        body.password
      );

      if (!isValidPassword) {
        throw new AppException(401, "Invalid credentials");
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.id, roleId: user.role.id },
        app.SECRET_KEY
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
