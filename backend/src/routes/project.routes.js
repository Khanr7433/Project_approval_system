import { Router } from "express";
import {
  uploadProject,
  getAllProjects,
  getProjectByStudentId,
  getAssignedProjects,
  approveProject,
  getApprovedProjects,
  rejectProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import {
  authenticateFaculty,
  authenticateStudent,
  authenticateAdmin,
} from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// student project routes
router
  .route("/uploadproject")
  .post(authenticateStudent, upload.single("synopsis"), uploadProject);
router
  .route("/getprojectbystudentid")
  .get(authenticateStudent, getProjectByStudentId);
router
  .route("/deleteproject/:projectId")
  .delete(authenticateStudent, deleteProject);

// facukty project routes
router
  .route("/getassignedprojects")
  .get(authenticateFaculty, getAssignedProjects);

// admin project routes
router.route("/getprojects").get(authenticateAdmin, getAllProjects);
router
  .route("/getapprovedprojects")
  .get(authenticateAdmin, getApprovedProjects);
router
  .route("/approveproject/:projectId")
  .patch(authenticateAdmin, approveProject);
router
  .route("/rejectproject/:projectId")
  .patch(authenticateAdmin, rejectProject);

export default router;
