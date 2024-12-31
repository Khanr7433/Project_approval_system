import { Router } from "express";
import {
  registerStudent,
  loginStudent,
  logoutStudent,
  changePassword,
  forgotPassword,
  resetPassword,
  getStudentProfile,
} from "../controllers/student.controllers.js";
import { authenticateStudent } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerStudent);
router.route("/login").post(loginStudent);
router.route("/logout").post(authenticateStudent, logoutStudent);
router.route("/changePassword").post(authenticateStudent, changePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:passwordResetToken").post(resetPassword);
router.route("/profile").get(authenticateStudent, getStudentProfile);

export default router;
