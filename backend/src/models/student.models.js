import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
      enum: ["FY", "SY", "TY"],
    },
    department: {
      type: String,
      required: true,
      enum: ["BCA", "BBA-CA"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    passwordResetToken: {
      type: String,
      default: undefined,
    },
    passwordResetTokenExpires: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({ rollNo: 1, year: 1, department: 1 }, { unique: true });

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
};

studentSchema.methods.generatePasswordResetToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
};

export const Student = mongoose.model("Student", studentSchema);
