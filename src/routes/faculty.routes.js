import { Router } from "express";
import {
  registerFaculty,
  loginFaculty,
  logoutFaculty,
  changePassword,
  forgetPassword,
  resetPassword,
  getFacultyProfile,
} from "../controllers/faculty.controllers.js";
import { authenticateFaculty } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerFaculty);
router.route("/login").post(loginFaculty);
router.route("/logout").post(authenticateFaculty, logoutFaculty);
router.route("/changePassword").post(authenticateFaculty, changePassword);
router.route("/forgotPassword").post(forgetPassword);
router.route("/resetPassword/:passwordResetToken").post(resetPassword);
router.route("/profile").get(authenticateFaculty, getFacultyProfile);

export default router;
