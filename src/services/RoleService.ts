import { getManager } from "typeorm";
import { Role, IRole } from "../entities/Role";
import { CreateRoleRequestDTO } from "../dto/RoleDTO";

export class RoleService {
  async getAllRoles(): Promise<Role[]> {
    const entityManager = getManager();
    return entityManager.find(Role);
  }

  async getRoleById(id: number): Promise<Role | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(Role, { where: { id } });
  }

  async createRole(body: CreateRoleRequestDTO): Promise<Role> {
    const entityManager = getManager();
    const role = new Role();

    role.name = body.name;

    return entityManager.save(role);
  }

  async updateRole(id: number, name: string): Promise<Role | undefined> {
    const entityManager = getManager();
    const role = await entityManager.findOne(Role, { where: { id } });
    if (role) {
      role.name = name || role.name;
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
