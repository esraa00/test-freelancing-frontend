import { create, findByEmail } from "./user.service";
import { sendMail } from "./email.service";
import bcrypt from "bcrypt";
import { serializeUser } from "../utils/serialize";
import { hashEmailVerificationToken } from "./email.service";
import { ApiError } from "../response-handler/api-error";
import speakeasy from "speakeasy";
import { Prisma } from "@prisma/client";
import { sign } from "./jwt.service";

const createAccessToken = (userId: number) => {
  return sign({ userId }, process.env.USER_ACCESS_TOKEN_KEY, {
    expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY_DATE,
  });
};

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
    sendMail({
      to: createdUser.email,
      subject: "Hello store Email Verification",
      from: "em4728644@gmail.com",
      html: `
    <h1>Hello Store</h1>
    <p>Please click the following link to verify your email:</p>
    <a href="http://localhost:3000/api/email/confirmation/${token}">Verify Email</a>
    `,
    });
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

  const accessToken = createAccessToken(userFound.id);
  return {
    accessToken,
    isOtpVerified: userFound.isOtpVerified,
  };
};
