import { Request, Response } from "express";

import { RoleService } from "../services/RoleService";
import {
  UpdateRoleRequestDTO,
  RoleResponseDTO,
  CreateRoleRequestDTO,
} from "../dto/RoleDTO";
import { Role } from "../entities/Role";
import { AppException } from "../utils/AppException";

export class RoleController {
  private roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async createRole(req: Request, res: Response) {
    try {
      const body = req.body as CreateRoleRequestDTO;

      const existingRole = await this.roleService.getRoleByName(body.name);

      if (existingRole) {
        throw new AppException(400, "Role already exists");
      }

      const newRole = await this.roleService.createRole(body);

      res.json(newRole);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await this.roleService.getAllRoles();
      const roleResponses = roles.map((role) =>
        this.mapToRoleResponseDTO(role)
      );
      res.json(roleResponses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRoleById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const role = await this.roleService.getRoleById(id);

      if (!role) {
        throw new AppException(404, "Role not found");
      }

      const roleResponse = this.mapToRoleResponseDTO(role);

      res.json(roleResponse);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body as UpdateRoleRequestDTO;
      const updatedrole = await this.roleService.updateRole(id, name);

      if (!updatedrole) {
        throw new AppException(404, "Role not found");
      }

      const roleResponse = this.mapToRoleResponseDTO(updatedrole);
      res.json(roleResponse);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const isDeleted = await this.roleService.deleteRole(id);

      if (isDeleted) {
        throw new AppException(404, "Role not found");
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private mapToRoleResponseDTO(role: Role): RoleResponseDTO {
    return {
      id: role.id,
      name: role.name,
    };
  }
}
