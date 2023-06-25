import "reflect-metadata";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/UserRoutes";
import authRouter from "./routes/AuthRoutes";
import roleRouter from "./routes/RoleRoutes";
import { exceptionHandler } from "./utils/exceptionHandler";
import constant from "./constant/app";

const app: Application = express();
const port: number = Number(constant.APP_PORT) || 3000; // Choose your desired port

app.use(bodyParser.json());
app.use(cors());

// Database connection
import "./database";

// User routes
app.use("/users", userRouter);
// Auth routes
app.use("/auth", authRouter);
// Role routes
app.use("/roles", roleRouter);

app.use(exceptionHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
