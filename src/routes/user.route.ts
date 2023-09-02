import { Router } from "express";
import * as userController from "../controllers/user.controller";
import isAuthenticated from "../middleware/is-authenticated.middleware";
const router = Router();

router.get("/", isAuthenticated, userController.getUser);

export default router;
