import nodemailer, { SendMailOptions } from "nodemailer";
import { sign } from "./jwt.service";
import * as env from "env-var";
const GMAIL_EMAIL = env.get("GMAIL_EMAIL").required().asString();
const GMAIL_PASSWORD = env.get("GMAIL_PASSWORD").required().asString();
const EMAIL_SECRET_TOKEN = env.get("EMAIL_SECRET_TOKEN").required().asString();
const EMAIL_SECRET_TOKEN_EXPIRY = env
  .get("EMAIL_SECRET_TOKEN_EXPIRY")
  .required()
  .asString();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
});

export const sendMail = (mailOptions: SendMailOptions) => {
  transporter.sendMail(mailOptions);
};

export const hashEmailVerificationToken = (userId: number) => {
  return sign({ userId }, EMAIL_SECRET_TOKEN, {
    expiresIn: EMAIL_SECRET_TOKEN_EXPIRY,
  });
};
