import "dotenv/config";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import Credentials from "./constant/database";
import { RoleAndUser } from "./seeders/role_and_user";
import { Role } from "./entities/Role";
import { Permission } from "./entities/Permission";

createConnection({
  type: "postgres",
  host: Credentials.DB_HOST,
  port: Credentials.DB_PORT,
  username: Credentials.DB_USERNAME,
  password: Credentials.DB_PASSWORD,
  database: Credentials.DB_NAME,
  entities: [User, Role, Permission],
  synchronize: true, // Automatically creates database tables based on entity definitions (for development purposes)
})
  .then(async () => {
    console.log("Database connection established");

    // Activate it the first time you start after install or the data in the users and roles table will be lost
    // await RoleAndUser();
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });
