import { create, findByEmail } from "./user.service";
import { sendMail } from "./email.service";
import bcrypt from "bcrypt";
import { serializeUser } from "../utils/serialize";
import { hashEmailVerificationToken } from "./email.service";
import { ApiError } from "../response-handler/api-error";
import jwt from "jsonwebtoken";

const createAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.USER_ACCESS_TOKEN_KEY, {
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
  const hashedPassword = bcrypt.hashSync(password, 10);
  const createdUser = await create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
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

  const accessToken = createAccessToken(userFound.id);
  return accessToken;
};
