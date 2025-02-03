import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  rollNo: z.string().nonempty("Roll No is required"),
  year: z.enum(["FY", "SY", "TY"], "Year must be one of FY, SY, TY"),
  department: z.enum(
    ["BCA", "BBA-CA"],
    "Department must be one of BCA, BBA-CA"
  ),
  email: z.string().email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});
