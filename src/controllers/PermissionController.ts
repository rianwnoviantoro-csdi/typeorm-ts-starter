import { Request, Response } from "express";

import { PermissionService } from "../services/PermissionService";
import {
  UpdatePermissionRequestDTO,
  PermissionResponseDTO,
  CreatePermissionRequestDTO,
} from "../dto/PermissionDTO";
import { Permission } from "../entities/Permission";
import { AppException } from "../utils/AppException";

export class PermissionController {
  private permissionService: PermissionService;

  constructor(permissionService: PermissionService) {
    this.permissionService = permissionService;
  }

  async createPermission(req: Request, res: Response) {
    try {
      const body = req.body as CreatePermissionRequestDTO;

      const existingPermission =
        await this.permissionService.getPermissionByName(body.name);

      if (existingPermission) {
        throw new AppException(400, "Permission already exists");
      }

      const newPermission = await this.permissionService.createPermission(body);

      res.json(newPermission);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllPermissions(req: Request, res: Response) {
    try {
      const permissions = await this.permissionService.getAllPermissions();
      const permissionResponses = permissions.map((permission) =>
        this.mapToPermissionResponseDTO(permission)
      );
      res.json(permissionResponses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPermissionById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const Permission = await this.permissionService.getPermissionById(id);

      if (!Permission) {
        throw new AppException(404, "Permission not found");
      }

      const PermissionResponse = this.mapToPermissionResponseDTO(Permission);

      res.json(PermissionResponse);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatePermission(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body as UpdatePermissionRequestDTO;
      const updatedPermission = await this.permissionService.updatePermission(
        id,
        name
      );

      if (!updatedPermission) {
        throw new AppException(404, "Permission not found");
      }

      const PermissionResponse =
        this.mapToPermissionResponseDTO(updatedPermission);
      res.json(PermissionResponse);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deletePermission(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const isDeleted = await this.permissionService.deletePermission(id);

      if (isDeleted) {
        throw new AppException(404, "Permission not found");
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  private mapToPermissionResponseDTO(
    Permission: Permission
  ): PermissionResponseDTO {
    return {
      id: Permission.id,
      name: Permission.name,
    };
  }
}
