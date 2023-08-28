import Joi from "joi";
import customizeErrors from "./customize-errors";

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .error((errors) => {
      return customizeErrors(errors);
    }),
  lastName: Joi.string()
    .required()
    .error((errors) => {
      return customizeErrors(errors);
    }),
  email: Joi.string()
    .email()
    .required()
    .error((errors) => {
      return customizeErrors(errors);
    }),
  password: Joi.string()
    .required()
    .min(8)
    .regex(/[ -~]*[a-z][ -~]*/)
    .regex(/[ -~]*[A-Z][ -~]*/)
    .regex(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/)
    .regex(/[ -~]*[0-9][ -~]*/)
    .error((errors) => {
      return customizeErrors(errors);
    }),
});
