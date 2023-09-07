import { ValidationError } from "joi";
import { ApiError } from "../response-handler/api-error";
import { Request, Response, NextFunction } from "express";
const errorHandling = (
  err: ErrorCallback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

export default errorHandling;
