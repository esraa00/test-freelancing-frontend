import { ApiError } from "../response-handler/api-error";
import { prisma } from "../../prisma/client";

export const create = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const createdMessage = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  if (!createdMessage)
    throw ApiError.Internal("user couldn't be created for some reason");
  return createdMessage;
};
