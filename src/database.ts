import "dotenv/config";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import Credentials from "./constant/database";
import { RoleAndUser } from "./seeders/role_and_user";
import { Role } from "./entities/Role";

createConnection({
  type: "postgres",
  host: Credentials.DB_HOST,
  port: Credentials.DB_PORT,
  username: Credentials.DB_USERNAME,
  password: Credentials.DB_PASSWORD,
  database: Credentials.DB_NAME,
  entities: [User, Role],
  synchronize: true, // Automatically creates database tables based on entity definitions (for development purposes)
})
  .then(async () => {
    console.log("Database connection established");

    // Only activate on first startup
    await RoleAndUser();

    console.log("Seeded database tables");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });
