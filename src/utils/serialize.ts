import { User } from "@prisma/client";

export const serializeUser = (user: User) => {
  const { password, ...serializedUser } = user;
  return serializedUser;
};
