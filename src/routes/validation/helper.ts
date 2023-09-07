import { NextFunction, Request } from "express";
import Joi from "joi";

export function validateRequest(
  req: Request,
  next: NextFunction,
  schema: Joi.Schema
) {
  try {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      throw error;
    } else {
      req.body = value;
      next();
    }
  } catch (error) {
    next(error);
  }
}
