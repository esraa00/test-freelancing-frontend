import { ApiError } from "../response-handler/api-error";
import { prisma } from "../../prisma/client";
import { User } from "@prisma/client";

export const create = async ({
  firstName,
  lastName,
  email,
  password,
  otpAscii,
  otpAuthUrl,
  otpBase32,
  otpHex,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otpAscii: string;
  otpBase32: string;
  otpAuthUrl: string;
  otpHex: string;
}) => {
  const createdMessage = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      otpAscii,
      otpBase32,
      otpAuthUrl,
      otpHex,
    },
  });
  if (!createdMessage)
    throw ApiError.Internal("user couldn't be created for some reason");
  return createdMessage;
};

export const updateUser = async (user: Partial<User>, userId: number) => {
  const userUpdated = await prisma.user.update({
    where: { id: userId },
    data: user,
  });
  if (!userUpdated) throw ApiError.NotFound("no user found to update");
  return userUpdated;
};

export const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ApiError.NotFound("user not found");
  return user;
};

export const findById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw ApiError.NotFound("user not found");
  return user;
};
