import { sendMail } from "./email.service";

export const sendEmailVerification = (email: string, token: string) => {
  return sendMail({
    to: email,
    subject: "Hello store Email Verification",
    from: "em4728644@gmail.com",
    html: `
    <h1>Hello Store</h1>
    <p>Please click the following link to verify your email:</p>
    <a href="http://localhost:3000/api/email/confirmation/${token}">Verify Email</a>
    `,
  });
};
