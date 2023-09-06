import { Request, Response } from "express";
import { verify } from "../services/jwt.service";
import { updateUser } from "../services/user.service";
import * as env from "env-var";
const EMAIL_SECRET_TOKEN = env.get("EMAIL_SECRET_TOKEN").required().asString();
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { userId } = verify("token", req.params.token, EMAIL_SECRET_TOKEN);
    await updateUser({ isEmailConfirmed: true }, userId);

    return res.redirect("http://localhost:5173/login");
  } catch (error) {
    throw error;
  }
};
