import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { findById, updateUser } from "../services/user.service";
import qrcode from "qrcode";
import speakeasy from "speakeasy";
import { ApiError } from "../response-handler/api-error";
import {
  create2FaAuthenticatedAccessToken,
  verifyAuthenticationToken,
} from "../services/jwt.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.signup(req.body);
    res.json({ status: 200 });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, isOtpVerified } = await authService.login(req.body);
    res
      .cookie("accessToken", accessToken, {
        maxAge: 30 * 60 * 1000,
      })
      .status(200)
      .json({ status: 200, data: { isOtpVerified } });
  } catch (error) {
    next(error);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const payload = verifyAuthenticationToken(accessToken);
    if (!payload.isAuthenticated)
      throw ApiError.Forbidden("please login first");
    res.status(200).json({ isAuthenticated: true });
  } catch (error) {
    next(error);
  }
};

export const isTwoFactorAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const payload = verifyAuthenticationToken(accessToken);
    if (!payload.isTwoFactorAuthenticated)
      throw ApiError.Forbidden("please complete the 2fa step");
    res.status(200).json({ isTwoFactorAuthenticated: true });
  } catch (error) {
    next(error);
  }
};

export const generate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findById(req.userId);
    const qrCodeDataURL = await qrcode.toDataURL(user.otpAuthUrl);
    res.status(200).json({ data: qrCodeDataURL });
  } catch (error) {
    next(error);
  }
};

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findById(req.userId);
    const otpValue = req.body.otpValue;

    const isOtpValid = speakeasy.totp.verify({
      secret: user.otpBase32,
      encoding: "base32",
      token: otpValue,
    });

    if (!isOtpValid) throw ApiError.Forbidden("this otp is not correct");
    if (!user.isOtpVerified) {
      user.isOtpVerified = true;
      await updateUser(user, user.id);
    }
    const accessToken = create2FaAuthenticatedAccessToken(user.id);
    res
      .status(200)
      .cookie("accessToken", accessToken, {
        maxAge: 30 * 60 * 1000,
      })
      .json({ status: 200, data: { isOtpValid } });
  } catch (error) {
    next(error);
  }
};
