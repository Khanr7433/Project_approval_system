import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controllers.js";
import authenticateUser from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);
router.route("/changePassword").post(authenticateUser, changePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:passwordResetToken").post(resetPassword);

export default router;
