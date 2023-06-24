import { getManager } from "typeorm";
import { User, IUser } from "../entities/User";
import bcrypt from "bcrypt";
import { RegisterUserRequestDTO } from "../dto/UserDTO";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const entityManager = getManager();
    return entityManager.find(User);
  }

  async getUserById(id: number): Promise<User | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(User, { where: { id } });
  }

  async createUser(body: RegisterUserRequestDTO): Promise<User> {
    const entityManager = getManager();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = hashedPassword;

    return entityManager.save(user);
  }

  async updateUser(
    id: number,
    name: string,
    email: string
  ): Promise<User | undefined> {
    const entityManager = getManager();
    const user = await entityManager.findOne(User, { where: { id } });
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      return entityManager.save(user);
    }
    return undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    const entityManager = getManager();
    const user = await entityManager.findOne(User, { where: { id } });
    if (user) {
      await entityManager.remove(user);
      return true;
    }
    return false;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const entityManager = getManager();
    return entityManager.findOne(User, { where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
