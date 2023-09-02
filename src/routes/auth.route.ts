import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import isAuthenticated from "../middleware/is-authenticated.middleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/otp/generate", isAuthenticated, authController.generate);
router.post("/otp/validate", isAuthenticated, authController.validate);

export default router;
