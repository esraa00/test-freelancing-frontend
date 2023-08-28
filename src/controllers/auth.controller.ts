import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.signup(req.body);
    res.json({ status: 200 });
  } catch (error) {
    next(error);
  }
};
