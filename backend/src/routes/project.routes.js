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
  .route("/upload-synopsis")
  .post(authenticateStudent, upload.single("synopsis"), uploadProject);
router.route("/get-projects").get(getProjects);
router.route("/approve-project/:_id").patch(approveProject);
router.route("/reject-project/:_id").patch(rejectProject);
router.route("/delete-project/:_id").delete(deleteProject);

export default router;
