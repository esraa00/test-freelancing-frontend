import { NextFunction, Request, Response } from "express";
import { ApiError } from "../response-handler/api-error";
import { verify } from "../services/jwt.service";
import * as env from "env-var";
const USER_ACCESS_TOKEN_KEY = env
  .get("USER_ACCESS_TOKEN_KEY")
  .required()
  .asString();

const isFAAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw ApiError.Forbidden("please login again");

  const { userId, is2FaAuthenticated } = verify(
    "your session",
    accessToken,
    USER_ACCESS_TOKEN_KEY
  );
  req.userId = userId;
  if (is2FaAuthenticated) next();
  else
    return res
      .status(403)
      .json({ message: "please validate the 2fa code first" });
};

export default isFAAuthenticated;
