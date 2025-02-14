import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { Student } from "../models/student.models.js";
import { Faculty } from "../models/faculty.models.js";
import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";

const authenticateStudent = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized! Please login");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const student = await Student.findById(decodedToken._id).select(
      "-password"
    );

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    req.student = student;

    next();
  } catch (error) {
    throw new apiError(
      401,
      error?.message + " Something went wrong" || "Invalid access token"
    );
  }
});

const authenticateFaculty = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const faculty = await Faculty.findById(decodedToken._id).select(
      "-password"
    );

    if (!faculty) {
      throw new apiError(404, "Faculty not found");
    }

    req.faculty = faculty;

    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});

const authenticateAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized! Please login");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decodedToken._id).select("-password");

    if (!admin) {
      throw new apiError(404, "Admin not found");
    }

    req.admin = admin;

    next();
  } catch (error) {
    throw new apiError(
      401,
      error?.message + " Something went wrong" || "Invalid access token"
    );
  }
});

export { authenticateStudent, authenticateFaculty, authenticateAdmin };
