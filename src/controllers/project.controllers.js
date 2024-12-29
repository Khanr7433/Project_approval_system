import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Project } from "../models/project.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadProject = asyncHandler(async (req, res) => {
  try {
    if (!req.student) {
      throw new apiError(401, "Unauthorized!");
    }

    const projects = await Project.find({ byStudent: req.student._id });

    if (projects.length >= 2) {
      throw new apiError(400, "You have already uploaded two projects!");
    }

    const { title, description } = req.body;

    if (!(title && description)) {
      throw new apiError(400, "Title and description are required!");
    }

    const synopsisLocalPath = req.file.path;

    if (!synopsisLocalPath) {
      throw new apiError(400, "Synopsis is required!");
    }

    const synopsis = await uploadOnCloudinary(synopsisLocalPath);

    if (!synopsis) {
      throw new apiError(500, "Failed to upload synopsis!");
    }

    const project = await Project.create({
      title,
      description,
      byStudent: req.student._id,
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

const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({ byStudent: req.user._id });

    if (!projects.length) {
      throw new apiError(404, "No projects found!");
    }

    return res
      .status(200)
      .json(apiResponse(200, { projects }, "Projects fetched successfully!"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const approveProject = asyncHandler(async (req, res) => {});

const deleteProject = asyncHandler(async (req, res) => {});

export { uploadProject, getProjects, approveProject, deleteProject };
