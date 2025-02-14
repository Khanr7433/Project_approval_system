import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["BCA", "BBA-CA"],
    },
    designation: {
      type: String,
      required: true,
      enum: ["HOD", "Assistant Professor", "Associate Professor", "Professor"],
    },
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

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateJWTToken = function () {
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

adminSchema.methods.generatePasswordResetToken = function () {
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

export const Admin = mongoose.model("Admin", adminSchema);
