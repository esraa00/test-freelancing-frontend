import nodemailer, { SendMailOptions } from "nodemailer";
import { sign } from "./jwt.service";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendMail = (mailOptions: SendMailOptions) => {
  transporter.sendMail(mailOptions);
};

export const hashEmailVerificationToken = (userId: number) => {
  return sign({ userId }, process.env.EMAIL_SECRET_TOKEN, {
    expiresIn: "4h",
  });
};
