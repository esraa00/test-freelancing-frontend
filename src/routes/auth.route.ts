import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import isAuthenticated from "../middleware/is-authenticated.middleware";
import { signupSchema } from "./validation/auth.validation";

const router = Router();

router.get("/isAuthenticated", authController.isAuthenticated);
router.get(
  "/isTwoFactorAuthenticated",
  authController.isTwoFactorAuthenticated
);
router.post("/signup", signupSchema, authController.signup);
router.post("/login", authController.login);
router.get("/otp/generate", isAuthenticated, authController.generate);
router.post("/otp/validate", isAuthenticated, authController.validate);

export default router;
