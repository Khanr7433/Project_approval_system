import asyncHandler from "../utils/asynchandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Project } from "../models/project.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import { Student } from "../models/student.models.js";

const uploadProject = asyncHandler(async (req, res) => {
  try {
    if (!req.student) {
      throw new apiError(401, "Unauthorized!");
    }

    const { title, description, teamMembers } = req.body;

    if (!(title && description)) {
      throw new apiError(400, "Title and description are required!");
    }

    const synopsisLocalPath = req.file?.path;

    if (!synopsisLocalPath) {
      throw new apiError(400, "Synopsis is required!");
    }

    const projects = await Project.find({ byStudent: req.student._id });

    if (projects.length >= 2) {
      fs.unlinkSync(synopsisLocalPath);
      throw new apiError(400, "You have already uploaded two projects!");
    }

    const synopsis = await uploadOnCloudinary(synopsisLocalPath);

    if (!synopsis) {
      throw new apiError(500, "Failed to upload synopsis!");
    }

    const teamMembersArray = JSON.parse(teamMembers);
    const studentIds = [req.student._id];
    const teamMemberIds = await Promise.all(
      teamMembersArray.map(async (email) => {
        const student = await Student.findOne({ email });
        if (!student) {
          throw new apiError(400, `Provide registered email!`);
        }
        return student._id;
      })
    );
    studentIds.push(...teamMemberIds);

    const project = await Project.create({
      title,
      description,
      byStudent: studentIds,
      synopsis: synopsis?.url || "",
    });

    const uploadedProject = await Project.findById(project._id);

    if (!uploadedProject) {
      throw new apiError(500, "Failed to upload project!");
    }

    return res.status(201).json(
      new apiResponse(
        201,
        {
          project: uploadedProject,
          synopsis,
        },
        "Project uploaded successfully!"
      )
    );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({
      status: { $nin: ["approved", "rejected"] },
    }).populate("byStudent");

    if (!projects) {
      throw new apiError(404, "No projects found!");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, { projects }, "Projects fetched successfully!")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getProjectByStudentId = asyncHandler(async (req, res) => {
  try {
    const studentId = req.student._id;

    const projects = await Project.find({ byStudent: studentId });

    if (!projects) {
      throw new apiError(404, "No projects found for this student!");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, { projects }, "Projects fetched successfully!")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getAssignedProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({
      status: "approved",
      guide: req.faculty._id,
    }).populate("byStudent");

    if (!projects) {
      throw new apiError(404, "No projects found!");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, { projects }, "Projects fetched successfully!")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const approveProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new apiError(400, "Project ID is required!");
    }

    const _id = projectId.replace("projectId=", "");

    const project = await Project.findById(_id);

    if (!project) {
      throw new apiError(404, "Project not found!");
    }

    project.status = "approved";
    await project.save();

    return res
      .status(200)
      .json(
        new apiResponse(200, { project }, "Project approved successfully!")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getApprovedProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({ status: "approved" })
      .populate("byStudent")
      .populate("guide");

    if (!projects) {
      throw new apiError(404, "No projects found!");
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { projects },
          "Approved Projects fetched successfully!"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const rejectProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new apiError(400, "Project ID is required!");
    }

    const _id = projectId.replace("projectId=", "");

    const project = await Project.findById(_id);

    if (!project) {
      throw new apiError(404, "Project not found!");
    }

    project.status = "rejected";
    await project.save();

    return res
      .status(200)
      .json(
        new apiResponse(200, { project }, "Project rejected successfully!")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new apiError(400, "Project ID is required!");
    }

    const _id = projectId.replace("projectId=", "");

    const project = await Project.findById(_id);

    if (!project) {
      throw new apiError(404, "Project not found!");
    }

    await project.deleteOne();

    return res
      .status(200)
      .json(new apiResponse(200, null, "Project deleted successfully!"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

export {
  uploadProject,
  getAllProjects,
  getProjectByStudentId,
  getAssignedProjects,
  approveProject,
  getApprovedProjects,
  rejectProject,
  deleteProject,
};
