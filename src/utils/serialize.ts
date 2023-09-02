import { User } from "@prisma/client";

export const serializeUser = (user: User) => {
  const { password, otpHex, otpAscii, otpBase32, ...serializedUser } = user;
  return serializedUser;
};
