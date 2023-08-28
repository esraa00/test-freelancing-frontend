import { create } from "./user.service";
import { sendMail } from "./email.service";
import bcrypt from "bcrypt";
import { serializeUser } from "../utils/serialize";
import { hashEmailVerificationToken } from "./email.service";

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
    subject: "Email Verification",
    from: "em4728644@gmail.com",
    html: `
    <h1>Hello Store</h1>
    <p>Please click the following link to verify your email:</p>
    <a href="https://your-verification-url.com?token=${token}">Verify Email</a>
    `,
  });
  return serializeUser(createdUser);
};
