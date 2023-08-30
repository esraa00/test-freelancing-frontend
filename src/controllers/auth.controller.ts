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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = await authService.login(req.body);
    res
      .cookie("accessToken", accessToken, {
        maxAge: 30 * 60 * 1000,
      })
      .status(200)
      .json({ status: 200 });
  } catch (error) {
    next(error);
  }
};
