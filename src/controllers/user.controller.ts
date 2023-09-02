import { Request, Response } from "express";
import { findById } from "../services/user.service";
import { ApiError } from "../response-handler/api-error";
import { serializeUser } from "../utils/serialize";

export const getUser = async (req: Request, res: Response) => {
  if (!req.userId) throw ApiError.Forbidden("please login first");
  const user = await findById(req.userId);
  res.status(200).json({
    status: 200,
    data: {
      user: serializeUser(user),
    },
  });
};
