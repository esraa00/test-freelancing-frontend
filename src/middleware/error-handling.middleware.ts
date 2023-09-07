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
    const error = err.details.body[0].message;
    return res.status(err.statusCode).json({ message: error });
  }
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

export default errorHandling;
