import { NextFunction, Request, Response } from "express";
import { ApiError } from "../response-handler/api-error";
import { verifyAuthenticationToken } from "../services/jwt.service";

const isTwoFactorAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw ApiError.Forbidden("please login again");

  const { userId, isTwoFactorAuthenticated } =
    verifyAuthenticationToken(accessToken);
  req.userId = userId;
  if (isTwoFactorAuthenticated) next();
  else res.status(403).json({ message: "please validate the 2fa code first" });
};

export default isTwoFactorAuthenticated;
