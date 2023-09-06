import { create, findByEmail } from "./user.service";
import bcrypt from "bcrypt";
import { serializeUser } from "../utils/serialize";
import { hashEmailVerificationToken } from "./email.service";
import { ApiError } from "../response-handler/api-error";
import speakeasy from "speakeasy";
import { Prisma } from "@prisma/client";
import { sendEmailVerificationEmail } from "./email-templates";
import { createAuthenticatedAccessToken } from "./jwt.service";

export const signup = async ({
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
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    var secret = speakeasy.generateSecret({ name: "Your Store Name" });
    const createdUser = await create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otpAscii: secret.ascii,
      otpHex: secret.hex,
      otpBase32: secret.base32,
      otpAuthUrl: secret.otpauth_url,
    });
    const token = hashEmailVerificationToken(createdUser.id);
    sendEmailVerificationEmail(createdUser.email, token);
    return serializeUser(createdUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw ApiError.BadRequest(
        "email already exist, please choose another one"
      );
    } else {
      throw error;
    }
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userFound = await findByEmail(email);

  const doesPasswordMatches = bcrypt.compareSync(password, userFound.password);
  if (!doesPasswordMatches)
    throw ApiError.UnAuthorized("password is incorrect");

  if (!userFound.isEmailConfirmed)
    throw ApiError.UnAuthorized("please confirm your email first");

  const accessToken = createAuthenticatedAccessToken(userFound.id);
  return {
    accessToken,
    isOtpVerified: userFound.isOtpVerified,
  };
};
