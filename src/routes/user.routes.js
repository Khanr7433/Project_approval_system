import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
} from "../controllers/user.controllers.js";
import authenticateUser from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);
router.route("/changePassword").post(authenticateUser, changePassword);

export default router;
