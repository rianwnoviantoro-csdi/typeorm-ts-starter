import "dotenv/config";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import Credentials from "./constant/database";

createConnection({
  type: "postgres",
  host: Credentials.DB_HOST,
  port: Credentials.DB_PORT,
  username: Credentials.DB_USERNAME,
  password: Credentials.DB_PASSWORD,
  database: Credentials.DB_NAME,
  entities: [User],
  synchronize: true, // Automatically creates database tables based on entity definitions (for development purposes)
})
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });
