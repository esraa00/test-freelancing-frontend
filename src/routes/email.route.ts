import { Router } from "express";
import * as emailController from "../controllers/email.controller";
const router = Router();

router.get("/confirmation/:token", emailController.confirmEmail);

export default router;
