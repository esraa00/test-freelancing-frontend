import { NextFunction, Request, Response } from "express";
import { ApiError } from "../response-handler/api-error";
import { verify } from "../services/jwt.service";
import * as env from "env-var";
const USER_ACCESS_TOKEN_KEY = env
  .get("USER_ACCESS_TOKEN_KEY")
  .required()
  .asString();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw ApiError.Forbidden("please login again");

  const { userId } = verify("your session", accessToken, USER_ACCESS_TOKEN_KEY);
  req.userId = userId;
  next();
};

export default isAuthenticated;
