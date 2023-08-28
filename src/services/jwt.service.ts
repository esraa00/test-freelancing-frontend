import jwt from "jsonwebtoken";

export const sign = (
  data: string | object | Buffer,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions | undefined
): string => {
  //TODO: handle error
  return jwt.sign(data, secretOrPrivateKey, options);
};

export const verify = (
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions & {
    complete: true;
  }
) => {
  return jwt.verify(token, secretOrPublicKey, options);
};
