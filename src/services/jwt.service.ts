import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ApiError } from "../response-handler/api-error";

export const sign = (
  data: string | object | Buffer,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions | undefined
): string => {
  try {
    return jwt.sign(data, secretOrPrivateKey, options);
  } catch (error) {
    throw ApiError.Internal("something went wrong, please try again later");
  }
};

export const verify = (
  nameOfToken: string,
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions & {
    complete: true;
  }
) => {
  try {
    return jwt.verify(token, secretOrPublicKey, options);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw ApiError.Forbidden(`${nameOfToken} has expired`);
    } else if (error instanceof JsonWebTokenError) {
      throw ApiError.Forbidden(`${nameOfToken} is not valid`);
    } else {
      throw error;
    }
  }
};
