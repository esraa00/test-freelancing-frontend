import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ApiError } from "../response-handler/api-error";
import env from "env-var";

const USER_ACCESS_TOKEN_KEY = env
  .get("USER_ACCESS_TOKEN_KEY")
  .required()
  .asString();

const USER_ACCESS_TOKEN_EXPIRY_DATE = env
  .get("USER_ACCESS_TOKEN_EXPIRY_DATE")
  .required()
  .asString();

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

export const createAuthenticatedAccessToken = (userId: number) => {
  return sign(
    { userId, isAuthenticated: true, isTwoFactorAuthenticated: false },
    USER_ACCESS_TOKEN_KEY,
    {
      expiresIn: USER_ACCESS_TOKEN_EXPIRY_DATE,
    }
  );
};

export const create2FaAuthenticatedAccessToken = (userId: number) => {
  return sign(
    { userId, isAuthenticated: true, isTwoFactorAuthenticated: true },
    USER_ACCESS_TOKEN_KEY,
    {
      expiresIn: USER_ACCESS_TOKEN_EXPIRY_DATE,
    }
  );
};

export const verifyAuthenticationToken = (token: string) => {
  return verify("your session", token, USER_ACCESS_TOKEN_KEY);
};
