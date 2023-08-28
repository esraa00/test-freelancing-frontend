import jwt from "jsonwebtoken";

export const sign = (
  data: string | object | Buffer,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions | undefined
): string => {
  //TODO: handle error
  return jwt.sign(data, secretOrPrivateKey, options);
};
