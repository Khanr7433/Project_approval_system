import { Router } from "express";
import {
  uploadProject,
  getAllProjects,
  getProjectByStudentId,
  approveProject,
  rejectProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import {
  authenticateFaculty,
  authenticateStudent,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/uploadproject")
  .post(authenticateStudent, upload.single("synopsis"), uploadProject);
router.route("/getprojects").get(getAllProjects);
router
  .route("/getprojectbystudentid")
  .get(authenticateStudent, getProjectByStudentId);
router.route("/approveproject/:_id").patch(authenticateFaculty, approveProject);
router.route("/rejectproject/:_id").patch(authenticateFaculty, rejectProject);
router.route("/deleteproject/:_id").delete(deleteProject);

export default router;
