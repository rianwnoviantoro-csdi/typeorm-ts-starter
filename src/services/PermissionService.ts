import { getManager } from "typeorm";
import { Permission, IPermission } from "../entities/Permission";
import { CreatePermissionRequestDTO } from "../dto/PermissionDTO";

export class PermissionService {
  async getAllPermissions(): Promise<Permission[]> {
    const entityManager = getManager();
    return entityManager.find(Permission);
  }

  async getPermissionById(id: number): Promise<Permission | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(Permission, {
      where: { id },
      relations: ["permissions"],
    });
  }

  async createPermission(
    body: CreatePermissionRequestDTO
  ): Promise<Permission> {
    const entityManager = getManager();
    const permission = new Permission();

    permission.name = body.name;

    return entityManager.save(permission);
  }

  async updatePermission(
    id: number,
    name: string
  ): Promise<Permission | undefined> {
    const entityManager = getManager();
    const permission = await entityManager.findOne(Permission, {
      where: { id },
    });
    if (permission) {
      permission.name = name || permission.name;
      return entityManager.save(permission);
    }
    return undefined;
  }

  async deletePermission(id: number): Promise<boolean> {
    const entityManager = getManager();
    const permission = await entityManager.findOne(Permission, {
      where: { id },
    });
    if (permission) {
      await entityManager.remove(permission);
      return true;
    }
    return false;
  }

  async getPermissionByName(name: string): Promise<Permission | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(Permission, { where: { name } });
  }
}
