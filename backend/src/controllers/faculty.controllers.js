import asyncHandler from "../utils/asynchandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import { Faculty } from "../models/faculty.models.js";
import { cookieOptions } from "../constants.js";

const registerFaculty = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, department, designation, password } = req.body;

    if (
      [fullName, email, department, designation, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new apiError(400, "All fields are required and cannot be empty");
    }

    const facultyExists = await Faculty.findOne({ email, department });

    if (facultyExists) {
      throw new apiError(400, "Faculty already exists");
    }

    const faculty = await Faculty.create({
      fullName,
      email: email.toLowerCase(),
      department,
      designation,
      password,
    });

    const createdFaculty = await Faculty.findById(faculty._id).select(
      "-password"
    );

    if (!createdFaculty) {
      throw new apiError(500, "Something went wrong while registering faculty");
    }

    return res
      .status(201)
      .json(
        new apiResponse(201, createdFaculty, "Faculty registered successfully")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const loginFaculty = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new apiError(400, "All fields are required");
    }

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      throw new apiError(404, "Faculty not found");
    }

    const isPasswordCorrect = await faculty.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new apiError(401, "Invalid credentials");
    }

    const token = faculty.generateJWTToken();

    const loggedInFaculty = await Faculty.findById(faculty._id).select(
      "-password"
    );

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(
        new apiResponse(
          200,
          {
            faculty: loggedInFaculty,
            token,
          },
          "Faculty logged in successfully"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const logoutFaculty = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", cookieOptions)
      .json(new apiResponse(200, {}, "Faculty logged out successfully"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
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
        "Old password and new password cannot be the same"
      );
    }

    const faculty = await Faculty.findById(req.faculty?._id);

    if (!faculty) {
      throw new apiError(404, "Faculty not found");
    }

    const isPasswordCorrect = await faculty.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new apiError(401, "Invalid credentials");
    }

    faculty.password = newPassword;
    await faculty.save();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new apiError(400, "Email is required");
    }

    const faculty = await Faculty.findOne({
      email,
    });

    if (!faculty) {
      throw new apiError(404, "Faculty not found");
    }

    const passwordResetToken = faculty
      .generatePasswordResetToken()
      .slice(0, 40);
    const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    faculty.passwordResetToken = passwordResetToken;
    faculty.passwordResetTokenExpires = passwordResetTokenExpires;
    await faculty.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`;

    const message = `You can reset your password here: ${resetUrl}`;

    const mailDeatils = await sendEmail(
      faculty.email,
      "Reset Password",
      message
    );

    if (!mailDeatils) {
      throw new apiError(500, "Something went wrong while sending email");
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { mailDeatils },
          "Password reset link has been sent to your email"
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

    const faculty = await Faculty.findOne({
      passwordResetToken: token,
    });

    if (!faculty) {
      throw new apiError(404, "Faculty not found");
    }

    if (faculty.passwordResetToken !== token) {
      throw new apiError(400, "Invalid token");
    }

    if (faculty.passwordResetTokenExpires < Date.now()) {
      throw new apiError(400, "Token expired");
    }

    faculty.password = password;
    faculty.passwordResetToken = undefined;
    faculty.passwordResetTokenExpires = undefined;
    await faculty.save();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password reset successfully"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getFacultyProfile = asyncHandler(async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty?._id).select(
      "-password"
    );

    if (!faculty) {
      throw new apiError(404, "Faculty not found");
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { faculty },
          "Faculty profile fetched successfully"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

export {
  registerFaculty,
  loginFaculty,
  logoutFaculty,
  changePassword,
  forgetPassword,
  resetPassword,
  getFacultyProfile,
};
