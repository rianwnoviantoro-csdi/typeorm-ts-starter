import { getManager } from "typeorm";
import { Role, IRole } from "../entities/Role";
import { CreateRoleRequestDTO } from "../dto/RoleDTO";
import { Permission } from "../entities/Permission";

export class RoleService {
  async getAllRoles(): Promise<Role[]> {
    const entityManager = getManager();
    return entityManager.find(Role);
  }

  async getRoleById(id: number): Promise<Role | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(Role, {
      where: { id },
      relations: ["permissions"],
    });
  }

  async createRole(body: CreateRoleRequestDTO): Promise<Role> {
    const entityManager = getManager();
    const role = new Role();

    let permissions = [];

    if (typeof body.permission != "undefined") {
      for await (let permissionId of body.permission) {
        let permission = await entityManager.findOne(Permission, {
          where: { id: permissionId },
        });
        permissions.push(permission);
      }
      role.permissions = permissions;
    }

    role.name = body.name;

    return entityManager.save(role);
  }

  async updateRole(
    id: number,
    name: string,
    permissionsId: number[]
  ): Promise<Role | undefined> {
    const entityManager = getManager();
    const role = await entityManager.findOne(Role, { where: { id } });
    if (role) {
      let permissions = [];

      if (typeof permissionsId != "undefined") {
        for await (let permissionId of permissionsId) {
          let permission = await entityManager.findOne(Permission, {
            where: { id: permissionId },
          });
          permissions.push(permission);
        }
      }

      role.name = name || role.name;
      role.permissions = permissions || role.permissions;
      return entityManager.save(role);
    }
    return undefined;
  }

  async deleteRole(id: number): Promise<boolean> {
    const entityManager = getManager();
    const role = await entityManager.findOne(Role, { where: { id } });
    if (role) {
      await entityManager.remove(role);
      return true;
    }
    return false;
  }

  async getRoleByName(name: string): Promise<Role | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(Role, { where: { name } });
  }
}
