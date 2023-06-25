import { getManager } from "typeorm";
import { User, IUser } from "../entities/User";
import bcrypt from "bcrypt";
import { RegisterUserRequestDTO } from "../dto/UserDTO";
import { Role } from "../entities/Role";
import { AppException } from "../utils/AppException";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const entityManager = getManager();
    return entityManager.find(User, {
      relations: ["role"],
      select: {
        role: {
          id: true,
        },
      },
    });
  }

  async getUserById(id: number): Promise<User | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(User, {
      where: { id },
      relations: ["role"],
      select: {
        role: {
          id: true,
        },
      },
    });
  }

  async createUser(body: RegisterUserRequestDTO): Promise<User> {
    const entityManager = getManager();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const roleId = body.role || 3;

    const existingRole = await entityManager.findOne(Role, {
      where: { id: roleId },
    });

    if (!existingRole) {
      throw new AppException(404, "Role not found.");
    }

    const user = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = hashedPassword;
    user.role = existingRole;

    return entityManager.save(user);
  }

  async updateUser(
    id: number,
    name: string,
    email: string,
    password: string,
    role: number
  ): Promise<User | undefined> {
    const entityManager = getManager();
    const user = await entityManager.findOne(User, {
      where: { id },
      relations: ["role"],
      select: {
        role: {
          id: true,
        },
      },
    });

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (role) {
      const existingRole = await entityManager.findOne(Role, {
        where: { id: role },
      });

      if (!existingRole) {
        throw new AppException(404, "Role not found.");
      }

      user.role = existingRole;
    }

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      return entityManager.save(user);
    }
    return undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    const entityManager = getManager();
    const user = await entityManager.findOne(User, {
      where: { id },
      relations: ["role"],
      select: {
        role: {
          id: true,
        },
      },
    });
    if (user) {
      await entityManager.remove(user);
      return true;
    }
    return false;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(User, {
      where: { email },
      relations: ["role"],
      select: {
        role: {
          id: true,
        },
      },
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
