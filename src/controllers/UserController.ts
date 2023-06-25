import { Request, Response } from "express";

import { UserService } from "../services/UserService";
import { UpdateUserRequestDTO, UserResponseDTO } from "../dto/UserDTO";
import { User } from "../entities/User";
import { AppException } from "../utils/AppException";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      const userResponses = users.map((user) =>
        this.mapToUserResponseDTO(user)
      );
      res.json(userResponses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new AppException(404, "User not found");
      }

      const userResponse = this.mapToUserResponseDTO(user);

      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name, email, password, role } = req.body as UpdateUserRequestDTO;
      const updatedUser = await this.userService.updateUser(
        id,
        name,
        email,
        password,
        role
      );

      if (!updatedUser) {
        throw new AppException(404, "User not found");
      }

      const userResponse = this.mapToUserResponseDTO(updatedUser);
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const isDeleted = await this.userService.deleteUser(id);

      if (isDeleted) {
        throw new AppException(404, "User not found");
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private mapToUserResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
