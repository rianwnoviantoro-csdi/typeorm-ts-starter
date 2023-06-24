import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppException } from "../utils/AppException";
import app from "../constant/app";

// Define a new interface to extend the existing Request type
interface AuthenticatedRequest extends Request {
  userId?: number;
}

// Middleware function to verify the JWT token
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

    if (!token) {
      throw new AppException(401, "Unauthorized");
    }

    // Verify the token and extract the payload (user data)
    const decodedToken = jwt.verify(token, app.SECRET_KEY) as {
      userId: number;
    };

    // Attach the user ID to the request object for further use in the controller
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(401).json({ error: "Unauthorized" });
  }
};
