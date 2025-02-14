import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import { Admin } from "../models/admin.models.js";
import { cookieOptions } from "../constants.js";

const registerAdmin = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, department, designation } = req.body;

    if (
      [fullName, email, password, department, designation].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new apiError(400, "All fields are required and cannot be empty");
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      throw new apiError(400, "Admin with this email already exists");
    }

    const admin = await Admin.create({
      fullName,
      email: email.toLowerCase(),
      password,
      department,
      designation,
    });

    const createdAdmin = await Admin.findById(admin._id).select("-password");

    if (!createdAdmin) {
      throw new apiError(500, "Something went wrong while registering admin");
    }

    return res
      .status(201)
      .json(
        new apiResponse(201, createdAdmin, "Admin registered successfully")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new apiError(400, "All fields are required");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new apiError(404, "Admin not found");
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new apiError(401, "Invalid credentials");
    }

    const token = admin.generateJWTToken();

    const loggedInAdmin = await Admin.findById(admin._id).select("-password");

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(
        new apiResponse(
          200,
          {
            admin: loggedInAdmin,
            token,
          },
          "Admin logged in successfully"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new apiResponse(200, {}, "Admin logged out successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      throw new apiError(400, "All fields are required");
    }

    if (oldPassword === newPassword) {
      throw new apiError(
        400,
        "New password cannot be the same as old password"
      );
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      throw new apiError(404, "Admin not found");
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new apiError(401, "Invalid credentials");
    }

    admin.password = newPassword;
    await admin.save();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new apiError(400, "Email is required");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new apiError(404, "Admin not found");
    }

    const passwordResetToken = admin.generatePasswordResetToken().slice(0, 60);
    const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    admin.passwordResetToken = passwordResetToken;
    admin.passwordResetTokenExpires = passwordResetTokenExpires;
    await admin.save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${passwordResetToken}`;

    const message = `You can reset your password here: ${resetUrl}`;

    const mailDeatils = await sendEmail(admin.email, "Reset Password", message);

    if (!mailDeatils) {
      throw new apiError(500, "Something went wrong while sending email");
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { mailDeatils },
          "Password reset link sent to email"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { passwordResetToken } = req.params;
    const { password, confirmPassword } = req.body;

    if (!passwordResetToken) {
      throw new apiError(400, "Password Reset Token is required");
    }

    if (!(password && confirmPassword)) {
      throw new apiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
      throw new apiError(400, "Passwords do not match");
    }

    const token = passwordResetToken.split("=")[1];

    const admin = await Admin.findOne({
      passwordResetToken: token,
    });

    if (!admin) {
      throw new apiError(404, "Admin not found");
    }

    if (admin.passwordResetToken !== token) {
      throw new apiError(400, "Invalid token");
    }

    if (admin.passwordResetTokenExpires < Date.now()) {
      throw new apiError(400, "Token expired");
    }

    admin.password = password;
    admin.passwordResetToken = undefined;
    admin.passwordResetTokenExpires = undefined;
    await admin.save();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password reset successfully"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getAdminProfile = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");

    if (!admin) {
      throw new apiError(404, "Admin not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        {
          admin: admin,
        },
        "Admin profile fetched successfully"
      )
    );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

export {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  changePassword,
  forgotPassword,
  resetPassword,
  getAdminProfile,
};
