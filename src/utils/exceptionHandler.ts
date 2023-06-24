import { Request, Response, NextFunction } from "express";
import { AppException } from "./AppException";

// Exception handling middleware
export const exceptionHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging purposes

  // Handle AppException errors
  if (err instanceof AppException) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Generic error response
  res.status(500).json({ error: "Internal server error" });
};
