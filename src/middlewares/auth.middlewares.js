import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { Student } from "../models/student.models.js";
import jwt from "jsonwebtoken";

const authenticateStudent = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookie?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized");
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
    throw new apiError(401, error?.message || "Invalid access token");
  }
});

export default authenticateStudent;
