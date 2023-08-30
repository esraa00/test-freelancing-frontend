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
        maxAge: +process.env.USER_ACCESS_TOKEN_COOKIE_EXPIRY_DATE,
      })
      .json({ status: 200 });
  } catch (error) {
    next(error);
  }
};
