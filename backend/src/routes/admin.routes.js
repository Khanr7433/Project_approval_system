import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  changePassword,
  forgotPassword,
  resetPassword,
  getAdminProfile,
  getGuides,
  assignGuide,
} from "../controllers/admin.controllers.js";
import { authenticateAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").post(authenticateAdmin, logoutAdmin);
router.route("/changepassword").post(authenticateAdmin, changePassword);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetPassword/:passwordResetToken").post(resetPassword);
router.route("/profile").get(authenticateAdmin, getAdminProfile);
router.route("/getguides").get(authenticateAdmin, getGuides);
router.route("/assignguide").patch(authenticateAdmin, assignGuide);

export default router;
