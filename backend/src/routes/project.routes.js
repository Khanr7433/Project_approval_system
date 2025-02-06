import { Router } from "express";
import {
  uploadProject,
  getProjects,
  approveProject,
  rejectProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { authenticateStudent } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/uploadproject")
  .post(authenticateStudent, upload.single("synopsis"), uploadProject);
router.route("/getprojects").get(getProjects);
router.route("/approveproject/:_id").patch(approveProject);
router.route("/rejectproject/:_id").patch(rejectProject);
router.route("/deleteproject/:_id").delete(deleteProject);

export default router;
