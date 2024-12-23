import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import { User } from "../models/user.models.js";
import { cookieOptions } from "../constants.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required and cannot be empty");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new apiError(400, "User already exists");
  }

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new apiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid credentials");
  }

  const token = user.generateJWTToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new apiResponse(
        200,
        {
          loggedInUser,
          token,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!(oldPassword && newPassword)) {
    throw new apiError(400, "All fields are required");
  }

  if (oldPassword === newPassword) {
    throw new apiError(400, "New password cannot be the same as old password");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid credentials");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const passwordResetToken = user.generatePasswordResetToken().slice(0, 40);
  const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  user.passwordResetToken = passwordResetToken;
  user.passwordResetTokenExpires = passwordResetTokenExpires;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`;

  const message = `You can reset your password here: ${resetUrl}`;

  const mailDeatils = await sendEmail(user.email, "Reset Password", message);

  if (!mailDeatils) {
    throw new apiError(500, "Something went wrong while sending email");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, { mailDeatils }, "Password reset link sent to email")
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { passwordResetToken } = req.params;
  const { password, confirmPassword } = req.body;

  if (!passwordResetToken) {
    throw new apiError(400, "Password Reset Token is required");
  }
  if (!password) {
    throw new apiError(400, "Password is required");
  }
  if (!confirmPassword) {
    throw new apiError(400, "Confirm password is required");
  }

  const token = passwordResetToken.split("=")[1];

  const user = await User.findOne({
    passwordResetToken: token,
  });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (user.passwordResetToken !== token) {
    throw new apiError(400, "Invalid token");
  }

  if (user.passwordResetTokenExpires < Date.now()) {
    throw new apiError(400, "Token expired");
  }

  if (password !== confirmPassword) {
    throw new apiError(400, "Passwords do not match");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password reset successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
