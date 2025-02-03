import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import sendEmail from "../utils/sendEmail.js";
import { Student } from "../models/student.models.js";
import { cookieOptions } from "../constants.js";

const registerStudent = asyncHandler(async (req, res) => {
  try {
    const { fullName, rollNo, year, department, email, password } = req.body;

    if (
      [fullName, rollNo, year, department, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new apiError(400, "All fields are required and cannot be empty");
    }

    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      throw new apiError(400, "Student with this email already exists");
    }

    const rollNoExists = await Student.findOne({ rollNo });
    if (rollNoExists) {
      throw new apiError(400, "Student with this roll number already exists");
    }

    const student = await Student.create({
      fullName,
      rollNo,
      year,
      department,
      email: email.toLowerCase(),
      password,
    });

    const createdStudent = await Student.findById(student._id).select(
      "-password"
    );

    if (!createdStudent) {
      throw new apiError(500, "Something went wrong while registering student");
    }

    return res
      .status(201)
      .json(
        new apiResponse(201, createdStudent, "Student registered successfully")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const loginStudent = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new apiError(400, "All fields are required");
    }

    const student = await Student.findOne({ email });

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    const isPasswordCorrect = await student.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new apiError(401, "Invalid credentials");
    }

    const token = student.generateJWTToken();

    const loggedInStudent = await Student.findById(student._id).select(
      "-password"
    );

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(
        new apiResponse(
          200,
          {
            student: loggedInStudent,
            token,
          },
          "Student logged in successfully"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const logoutStudent = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new apiResponse(200, {}, "Student logged out successfully"));
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

    const student = await Student.findById(req.student?._id);

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    const isPasswordCorrect = await student.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new apiError(401, "Invalid credentials");
    }

    student.password = newPassword;
    await student.save();

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

    const student = await Student.findOne({ email });

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    const passwordResetToken = student
      .generatePasswordResetToken()
      .slice(0, 40);
    const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    student.passwordResetToken = passwordResetToken;
    student.passwordResetTokenExpires = passwordResetTokenExpires;
    await student.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`;

    const message = `You can reset your password here: ${resetUrl}`;

    const mailDeatils = await sendEmail(
      student.email,
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

    const student = await Student.findOne({
      passwordResetToken: token,
    });

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    if (student.passwordResetToken !== token) {
      throw new apiError(400, "Invalid token");
    }

    if (student.passwordResetTokenExpires < Date.now()) {
      throw new apiError(400, "Token expired");
    }

    student.password = password;
    student.passwordResetToken = undefined;
    student.passwordResetTokenExpires = undefined;
    await student.save();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password reset successfully"));
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

const getStudentProfile = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.student?._id).select(
      "-password"
    );

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, student, "Student profile fetched successfully")
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Something went wrong!");
  }
});

export {
  registerStudent,
  loginStudent,
  logoutStudent,
  changePassword,
  forgotPassword,
  resetPassword,
  getStudentProfile,
};
