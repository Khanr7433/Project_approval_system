import { Router } from "express";
import {
  uploadProject,
  getProjects,
} from "../controllers/project.controllers.js";
import { authenticateStudent } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/upload-project")
  .post(authenticateStudent, upload.single("synopsis"), uploadProject);
router.route("/get-projects").get(authenticateStudent, getProjects);

export default router;
