import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const authenticateUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookie?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new apiError(404, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});

export default authenticateUser;
