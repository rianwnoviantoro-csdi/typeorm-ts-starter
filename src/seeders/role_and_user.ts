import { getRepository, getConnection } from "typeorm";
import bcrypt from "bcrypt";

import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { Permission } from "../entities/Permission";

export const RoleAndUser = async () => {
  const connection = getConnection();

  const permissionEntityMetadata = connection.getMetadata(Permission);
  const roleEntityMetadata = connection.getMetadata(Role);
  const userEntityMetadata = connection.getMetadata(User);

  const permissionRepository = getRepository(Permission);
  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);

  await permissionRepository.delete({});
  await userRepository.delete({});
  await roleRepository.delete({});

  const permissionTable = permissionEntityMetadata.tableName;
  const roleTable = roleEntityMetadata.tableName;
  const userTable = userEntityMetadata.tableName;

  await connection.query(
    `TRUNCATE TABLE ${permissionTable} RESTART IDENTITY CASCADE`
  );
  await connection.query(
    `TRUNCATE TABLE ${roleTable} RESTART IDENTITY CASCADE`
  );
  await connection.query(
    `TRUNCATE TABLE ${userTable} RESTART IDENTITY CASCADE`
  );

  const permissionNameList = [
    "create:role",
    "read:role",
    "update:role",
    "delete:role",
    "create:permission",
    "read:permission",
    "update:permission",
    "delete:permission",
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
  ];

  let permissionId = [];

  for (const permissionName of permissionNameList) {
    const permission = userRepository.create({ name: permissionName });
    const newPermission = await permissionRepository.save(permission);
    permissionId.push(newPermission);
  }

  const role = await roleRepository.save({
    name: "Super admin",
    permissions: permissionId,
  });

  const user = userRepository.create({
    name: "Super admin",
    email: "superadmin@seed.ts",
    password: await bcrypt.hash("Password!123", 10),
    role: role,
  });

  await userRepository.save(user);

  console.log("Seeded database tables");
};
