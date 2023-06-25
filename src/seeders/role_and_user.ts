import { getRepository, getConnection } from "typeorm";
import bcrypt from "bcrypt";

import { Role } from "../entities/Role";
import { User } from "../entities/User";

export const RoleAndUser = async () => {
  const connection = getConnection();

  const roleEntityMetadata = connection.getMetadata(Role);
  const userEntityMetadata = connection.getMetadata(User);

  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);

  await userRepository.delete({});
  await roleRepository.delete({});

  const roleTable = roleEntityMetadata.tableName;
  const userTable = userEntityMetadata.tableName;

  await connection.query(
    `TRUNCATE TABLE ${roleTable} RESTART IDENTITY CASCADE`
  );
  await connection.query(
    `TRUNCATE TABLE ${userTable} RESTART IDENTITY CASCADE`
  );

  const role = await roleRepository.save({ name: "Super admin" });

  const user = userRepository.create({
    name: "Super admin",
    email: "superadmin@seed.ts",
    password: await bcrypt.hash("Password!123", 10),
    role: role,
  });

  await userRepository.save(user);
};
