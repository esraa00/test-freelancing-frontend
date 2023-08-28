import { NextFunction, Request, Response } from "express";
import { verify } from "../services/jwt.service";
import { updateUser } from "../services/user.service";
export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = verify(req.params.token, process.env.EMAIL_SECRET_TOKEN);
    await updateUser({ isEmailConfirmed: true }, userId);
  } catch (error) {
    next(error);
  }

  return res.redirect("http://localhost:5173/login");
};
