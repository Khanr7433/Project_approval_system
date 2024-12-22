import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  forgotPassword,
} from "../controllers/user.controllers.js";
import authenticateUser from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);
router.route("/changePassword").post(authenticateUser, changePassword);
router.route("/forgotPassword").post(forgotPassword);

export default router;
